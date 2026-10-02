#!/usr/bin/env python3
"""Script jetable (non déployé) : lit un .docx en XML brut et produit un texte
annoté fidèle au Word, pour relecture et préparation des fichiers de données.

Annotations :
  **gras**  *italique*  __souligné__  [texte](url)  {IMG:nom}  {NBSP} non converti
  Paragraphes : une ligne par paragraphe, préfixée de « ¶[style] ».
  Tableaux : « TABLE{ » … « }TABLE », cellules « | ».
Usage : python3 dump.py fichier.docx > sortie.txt   (ou --json)
"""
import json
import sys
import zipfile
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
WP = '{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}'


def load(path):
    z = zipfile.ZipFile(path)
    doc = ET.fromstring(z.read('word/document.xml'))
    rels = {}
    try:
        rx = ET.fromstring(z.read('word/_rels/document.xml.rels'))
        for r in rx:
            rels[r.get('Id')] = r.get('Target')
    except KeyError:
        pass
    numbering = {}
    return doc, rels, numbering


def on(el, tag):
    """Propriété booléenne de run (b, i, u...)."""
    if el is None:
        return False
    x = el.find(W + tag)
    if x is None:
        return False
    v = x.get(W + 'val')
    if tag == 'u':
        return v not in ('none', None) or v is None
    return v not in ('0', 'false', 'none')


def run_props(r):
    rpr = r.find(W + 'rPr')
    u = False
    if rpr is not None:
        ux = rpr.find(W + 'u')
        u = ux is not None and ux.get(W + 'val') not in ('none',)
    return {
        'b': on(rpr, 'b'),
        'i': on(rpr, 'i'),
        'u': u,
        'strike': on(rpr, 'strike'),
        'hl': (rpr.find(W + 'highlight').get(W + 'val') if rpr is not None and rpr.find(W + 'highlight') is not None else None),
        'color': (rpr.find(W + 'color').get(W + 'val') if rpr is not None and rpr.find(W + 'color') is not None else None),
    }


def run_text(r):
    out = []
    for c in r:
        t = c.tag
        if t == W + 't':
            out.append(c.text or '')
        elif t == W + 'tab':
            out.append('\t')
        elif t in (W + 'br', W + 'cr'):
            out.append('\n')
        elif t == W + 'noBreakHyphen':
            out.append('‑')
        elif t == W + 'sym':
            out.append('{SYM:%s:%s}' % (c.get(W + 'font'), c.get(W + 'char')))
        elif t == W + 'pict' and any(
                (v.get('{urn:schemas-microsoft-com:office:office}hr') == 't') for v in c.iter()):
            out.append('{HR}')
        elif t == W + 'drawing' or t == W + 'pict' or t == W + 'object':
            names = [d.get('descr') or d.get('name') for d in c.iter(WP + 'docPr')]
            embeds = [b.get(R + 'embed') for b in c.iter(A + 'blip')]
            out.append('{IMG:%s|%s}' % (','.join(n or '' for n in names), ','.join(e or '' for e in embeds)))
    return ''.join(out)


def para_runs(p, rels):
    """Liste de segments {text, b, i, u, href}."""
    segs = []

    def walk(node, href=None):
        for c in node:
            if c.tag == W + 'r':
                props = run_props(c)
                txt = run_text(c)
                if txt:
                    segs.append(dict(text=txt, href=href, **props))
            elif c.tag == W + 'hyperlink':
                rid = c.get(R + 'id')
                h = rels.get(rid) if rid else ('#' + (c.get(W + 'anchor') or ''))
                walk(c, h)
            elif c.tag in (W + 'smartTag', W + 'ins', W + 'sdt', W + 'sdtContent', W + 'fldSimple', W + 'customXml'):
                walk(c, href)
            elif c.tag == W + 'del':
                pass
    walk(p)
    # fusion des segments contigus de même format
    merged = []
    for s in segs:
        if merged and all(merged[-1][k] == s[k] for k in ('b', 'i', 'u', 'href', 'strike', 'hl', 'color')):
            merged[-1]['text'] += s['text']
        else:
            merged.append(dict(s))
    return merged


def para_info(p):
    ppr = p.find(W + 'pPr')
    style = None
    num = None
    align = None
    if ppr is not None:
        st = ppr.find(W + 'pStyle')
        style = st.get(W + 'val') if st is not None else None
        np_ = ppr.find(W + 'numPr')
        if np_ is not None:
            ilvl = np_.find(W + 'ilvl')
            nid = np_.find(W + 'numId')
            num = (nid.get(W + 'val') if nid is not None else None, ilvl.get(W + 'val') if ilvl is not None else '0')
        jc = ppr.find(W + 'jc')
        align = jc.get(W + 'val') if jc is not None else None
    return style, num, align


def walk_body(body, rels):
    items = []
    for c in body:
        if c.tag == W + 'p':
            style, num, align = para_info(c)
            items.append({'kind': 'p', 'style': style, 'num': num, 'align': align, 'runs': para_runs(c, rels)})
        elif c.tag == W + 'tbl':
            rows = []
            for tr in c.findall(W + 'tr'):
                cells = []
                for tc in tr.findall(W + 'tc'):
                    cells.append(walk_body(tc, rels))
                rows.append(cells)
            items.append({'kind': 'table', 'rows': rows})
        elif c.tag == W + 'sdt':
            sc = c.find(W + 'sdtContent')
            if sc is not None:
                items.extend(walk_body(sc, rels))
    return items


def fmt_runs(runs):
    out = []
    for s in runs:
        t = s['text'].replace(' ', '{NBSP}').replace(' ', '{NNBSP}')
        if not t.strip():
            out.append(t)
            continue
        if s['u']:
            t = '__' + t + '__'
        if s['i']:
            t = '*' + t + '*'
        if s['b']:
            t = '**' + t + '**'
        if s['strike']:
            t = '~~' + t + '~~'
        if s['hl']:
            t = '{HL:%s}%s{/HL}' % (s['hl'], t)
        if s['href']:
            t = '[%s](%s)' % (t, s['href'])
        out.append(t)
    return ''.join(out)


def render(items, indent=''):
    lines = []
    for it in items:
        if it['kind'] == 'p':
            tag = it['style'] or ''
            if it['num']:
                tag += ' LIST%s.%s' % it['num']
            if it['align'] in ('center', 'right'):
                tag += ' ' + it['align']
            lines.append('%s¶[%s] %s' % (indent, tag.strip(), fmt_runs(it['runs'])))
        else:
            lines.append(indent + 'TABLE{')
            for ri, row in enumerate(it['rows']):
                for ci, cell in enumerate(row):
                    lines.append('%s  | r%d c%d' % (indent, ri, ci))
                    lines.extend(render(cell, indent + '    '))
            lines.append(indent + '}TABLE')
    return lines


if __name__ == '__main__':
    path = sys.argv[1]
    doc, rels, _ = load(path)
    body = doc.find(W + 'body')
    items = walk_body(body, rels)
    if '--json' in sys.argv:
        json.dump(items, sys.stdout, ensure_ascii=False, indent=1)
    else:
        print('\n'.join(render(items)))
