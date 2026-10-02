#!/usr/bin/env python3
"""Script jetable (non déployé) : produit un BROUILLON de fichier de données JSX
à partir d'un .docx, à relire et corriger à la main ensuite.

Découpage heuristique :
  - repère d'arrêt (« >>> Page N », « P. N », « p.N », « Page N : »)  -> nouvel arrêt
  - étiquette « Piste rouge / noire » (》》》 ou >>>)                     -> bloc piste du niveau
  - paragraphe entièrement entre « »                                    -> citation
  - « EXERCICE », lignes ____, tableau vide, vocabulaire à chercher       -> exercice
  - le reste                                                            -> piste verte
Chaque bloc porte un commentaire /* REVOIR */ quand la classification est incertaine.

Usage : python3 gen.py fichier.docx --export nom > brouillon.jsx
"""
import re
import sys
import json
import argparse

sys.path.insert(0, __file__.rsplit('/', 1)[0])
import dump  # noqa: E402

NBSP = ' '
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿️]')
LABEL = re.compile(r'^\s*\(?\s*(?:》|>)+\s*_*\s*(?:\*\*)?(?:[Pp]istes?\s+(?:très\s+)?(rouge|noire|verte|bleue/rouge|bleue|Rouge|Noire)s?|(Complètement hors-piste))\s*(?:\*\*)?_*\s*(?:》|>)+\s*(?:[:;][\s\u00a0]*)*')


def niveau_label(m):
    """Niveau d'après l'étiquette ; les cas non standard sont signalés dans le rapport."""
    if m.group(2):
        report.setdefault('etiquettes_non_standard', []).append(m.group(0).strip())
        return 'noire'
    c = m.group(1).lower()
    if 'très' in m.group(0) or c not in ('rouge', 'noire', 'verte'):
        report.setdefault('etiquettes_non_standard', []).append(m.group(0).strip())
    return {'bleue/rouge': 'rouge', 'bleue': 'rouge'}.get(c, c)
MARK = re.compile(r'^\s*(?:>\s*)*(?:EXERCICE\s*)?(?:>\s*)*(?:Page|PAGE|page|P\.|p\.|P|p)\s*(\d+)\b(?:\s*\([^)]{1,20}\))?')
EXO = re.compile(r'^[\s>]*(?:EXERCICE|Exercice)\b[\s\u00a0]*:?[\s\u00a0]*')
KEYW = re.compile(r'^\s*(Mots-clés|Mots-clé|Mots clés|mots-clés|Notions?\s*[- ]\s*clés?|Notion clé|Notions étudiées|Notions)\s*:\s*(.*)$', re.I)

report = {'emoji': [], 'images': [], 'hr': 0, 'liens': []}


# ---------------------------------------------------------------- typographie

def typo(t):
    """Espaces insécables françaises."""
    t = re.sub(r'[ \t]+([:;!?»])', NBSP + r'\1', t)
    t = re.sub(r'«[ \t]+', '«' + NBSP, t)
    t = re.sub(r'(?<=[^\s !?;:(«\[/])([;!?])', NBSP + r'\1', t)
    t = re.sub(r'(?<=[^\s («\[/])»', NBSP + '»', t)
    t = re.sub(r'«(?=[^\s ])', '«' + NBSP, t)
    t = re.sub(r'(?<=[A-Za-zÀ-ÿ)»*])(:)(?=\s|$)', NBSP + r'\1', t)
    return t


def jsx_text(t):
    t = t.replace('{', "{'{'}").replace('}', "{'}'}")
    t = t.replace('<', '&lt;').replace('>', '&gt;')
    return t


def clean_runs(runs):
    out = []
    for r in runs:
        r = dict(r)
        if EMOJI.search(r['text']):
            report['emoji'].append(r['text'].strip())
            r['text'] = EMOJI.sub('', r['text'])
        if '{IMG:' in r['text']:
            report['images'].extend(re.findall(r'\{IMG:([^}]*)\}', r['text']))
            r['text'] = re.sub(r'\{IMG:[^}]*\}', '', r['text'])
        if '{HR}' in r['text']:
            report['hr'] += 1
            r['text'] = r['text'].replace('{HR}', '')
        if r['text']:
            out.append(r)
    # typographie par run, puis aux frontières entre runs
    for r in out:
        r['text'] = typo(r['text'])
    for k in range(1, len(out)):
        prev, r = out[k - 1], out[k]
        if r['text'][:1] in ':;!?»' and prev['text']:
            if prev['text'][-1] in ' \t':
                prev['text'] = prev['text'][:-1] + NBSP
            elif prev['text'][-1] not in NBSP + '!?(«' and not (r['text'][:1] == ':' and len(r['text']) > 1 and r['text'][1] not in ' \t' + NBSP):
                prev['text'] += NBSP
        if prev['text'].endswith('«') and r['text'][:1] not in ' \t' + NBSP:
            prev['text'] += NBSP
        if prev['text'].endswith('« ') :
            prev['text'] = prev['text'][:-1] + NBSP
    return out


def plain(runs):
    return ''.join(r['text'] for r in runs)


def runs_to_jsx(runs):
    out = []
    for s in runs:
        t = s['text']
        if not t:
            continue
        lead = re.match(r'^[\s ]*', t).group(0)
        trail = re.search(r'[\s ]*$', t).group(0)
        core = t[len(lead):len(t) - len(trail)] if trail else t[len(lead):]
        if not core:
            out.append(t)
            continue
        c = jsx_text(core)
        c = c.replace('&gt;&gt;&gt;', '<Fl />').replace('》》》', '<Fl />')
        if s['u'] and not s['href']:
            c = '<Cle>' + c + '</Cle>'
        if s['i']:
            c = '<em>' + c + '</em>'
        if s['b']:
            c = '<strong>' + c + '</strong>'
        if s['href']:
            c = '<Lien href="%s">%s</Lien>' % (s['href'], c)
            report['liens'].append(s['href'])
        out.append(lead + c + trail)
    j = ''.join(out)
    j = re.sub(r'</strong>(\s*)<strong>', r'\1', j)
    j = re.sub(r'</em>(\s*)<em>', r'\1', j)
    j = j.replace('\t', ' ')
    j = re.sub(r'  +', ' ', j)
    j = j.replace('\n', '<br />')
    return j.strip()


def strip_chevron(runs):
    """Retire le « > » initial (puce du Word), où qu'il soit dans les premiers runs."""
    out = [dict(r) for r in runs]
    for r in out:
        if not r['text'].strip():
            continue
        m = re.match(r'^(\s*)>\s*', r['text'])
        if m:
            r['text'] = r['text'][m.end():]
        break
    return [r for r in out if r['text']]


def strip_prefix(runs, n):
    """Retire n caractères de texte brut au début des runs."""
    out = []
    for r in runs:
        r = dict(r)
        if n <= 0:
            out.append(r)
            continue
        if len(r['text']) <= n:
            n -= len(r['text'])
            continue
        r['text'] = r['text'][n:]
        n = 0
        out.append(r)
    return out


# ---------------------------------------------------------------- découpage

def flatten(items):
    """Paragraphes à plat ; un tableau devient un élément 'table'."""
    out = []
    for it in items:
        if it['kind'] == 'p':
            raw = ''.join(r['text'] for r in it['runs'])
            hr = '{HR}' in raw
            runs = clean_runs(it['runs'])
            out.append({'kind': 'p', 'runs': runs, 'plain': plain(runs), 'list': it['num'], 'hr': hr, 'style': it['style'], 'align': it['align']})
        else:
            out.append({'kind': 'table', 'rows': it['rows']})
    return out


def table_cells(t):
    return [[flatten(cell) for cell in row] for row in t['rows']]


def table_is_box(t):
    return len(t['rows']) == 1 and len(t['rows'][0]) == 1


def emit_paras(paras, ind):
    """Paragraphes -> JSX (listes regroupées)."""
    lines = []
    i = 0
    while i < len(paras):
        p = paras[i]
        if p.get('kind') == 'ligne':
            n = 0
            while i < len(paras) and (paras[i].get('kind') == 'ligne' or not paras[i]['plain'].strip()):
                n += paras[i].get('kind') == 'ligne'
                i += 1
            lines.append(ind + '<Ligne n={%d} />' % n)
            continue
        if not p['plain'].strip():
            i += 1
            continue
        if p['list']:
            lines.append(ind + '<ul>')
            while i < len(paras) and paras[i]['list'] and paras[i]['plain'].strip():
                lines.append(ind + '  <li>' + re.sub(r'_{4,}', '<Blanc />', runs_to_jsx(paras[i]['runs'])) + '</li>')
                i += 1
            lines.append(ind + '</ul>')
            continue
        if re.match(r'^\s*\**\s*>(?!>)', p['plain']):
            lines.append(ind + '<ul className="chevrons">')
            while i < len(paras) and re.match(r'^\s*\**\s*>(?!>)', paras[i]['plain']):
                q = paras[i]
                n = len(re.match(r'^\s*>\s*', q['plain'].replace('*', ' ')).group(0)) if not q['plain'].lstrip().startswith('*') else 0
                runs = strip_chevron(q['runs'])
                lines.append(ind + '  <li>' + runs_to_jsx(runs) + '</li>')
                i += 1
            lines.append(ind + '</ul>')
            continue
        j = runs_to_jsx(p['runs'])
        if '____' in p['plain']:
            j = re.sub(r'_{4,}', '<Blanc />', j)
        lines.append(ind + '<p>' + j + '</p>')
        i += 1
    return lines


def block(kind, paras, ind, **kw):
    lines = [ind + '{']
    lines.append(ind + "  type: '%s'," % kind)
    for k, v in kw.items():
        if v is None:
            continue
        if isinstance(v, str) and not v.startswith('<'):
            lines.append(ind + '  %s: %s,' % (k, json.dumps(v, ensure_ascii=False)))
        else:
            lines.append(ind + '  %s: %s,' % (k, v))
    key = 'texte' if kind == 'citation' else 'contenu'
    lines.append(ind + '  %s: (' % key)
    lines.append(ind + '    <>')
    lines.extend(paras)
    lines.append(ind + '    </>')
    lines.append(ind + '  ),')
    lines.append(ind + '},')
    return lines


def is_citation(p):
    t = p['plain'].strip()
    return len(t) > 30 and t[:1] in '«“' and re.search(r'[»”][\s\u00a0]*(p\.?\s*\d+)?[.…]*$', t)


def split_quote(p):
    """Paragraphe « citation » suivie d'un commentaire -> (citation, commentaire) ou None."""
    t = p['plain']
    lead = len(t) - len(t.lstrip())
    if t[lead:lead + 1] != '«':
        return None
    end = t.find('»', lead)
    if end < 0 or end - lead < 40:
        return None
    k = end + 1
    while k < len(t) and t[k] in '.…':
        k += 1
    if not t[k:].strip():
        return None
    a = [dict(r) for r in p['runs']]
    first, second, pos = [], [], 0
    for r in a:
        n = len(r['text'])
        if pos + n <= k:
            first.append(r)
        elif pos >= k:
            second.append(r)
        else:
            first.append(dict(r, text=r['text'][:k - pos]))
            second.append(dict(r, text=r['text'][k - pos:]))
        pos += n
    m = len(re.match(r'^[\s\u00a0:]*', plain(second)).group(0))
    second = strip_prefix(second, m)
    return (dict(p, runs=first, plain=plain(first)), dict(p, runs=second, plain=plain(second)))


def is_exercise(p):
    t = p['plain']
    return ('____' in t or re.match(r'^\s*\**\s*(EXERCICE|Exercice)', t) or re.match(r'^\s*(Mots de vocabulaire|Vocabulaire)', t))


def convert(path):
    doc, rels, _ = dump.load(path)
    items = dump.walk_body(doc.find(dump.W + 'body'), rels)
    flat = flatten(items)

    motscles = None
    head = []
    arrets = [{'page': None, 'repere': None, 'blocs': []}]
    cur = {'kind': None, 'paras': [], 'niveau': None, 'note': None}

    attente = {'niveau': None}

    def flush():
        if cur['kind'] and any(x.get('kind') == 'p' and x['plain'].strip() for x in cur['paras']):
            arrets[-1]['blocs'].append(dict(cur))
        elif cur['kind'] == 'piste' and cur['niveau'] in ('rouge', 'noire'):
            # étiquette seule (suivie d'une citation) : le commentaire qui suit garde ce niveau
            attente['niveau'] = cur['niveau']
        cur.update(kind=None, paras=[], niveau=None, note=None)

    def start(kind, niveau=None, note=None):
        flush()
        if kind == 'piste' and niveau == 'verte' and attente['niveau']:
            niveau = attente['niveau']
            report.setdefault('niveau_herite', []).append(niveau)
        if kind != 'citation':
            attente['niveau'] = None
        cur.update(kind=kind, niveau=niveau, note=note, paras=[])

    seen_body = False
    for el in flat:
        if el['kind'] == 'table':
            flush()
            cells = table_cells(el)
            allp = [p for row in cells for c in row for p in c]
            if table_is_box(el):
                # encadré : piste(s) selon étiquettes internes
                for p in cells[0][0]:
                    m = LABEL.match(p['plain'])
                    if m:
                        start('piste', niveau_label(m))
                        p = dict(p, runs=strip_prefix(p['runs'], m.end()))
                        p['plain'] = plain(p['runs'])
                    elif cur['kind'] is None:
                        start('piste', 'verte', note='encadré')
                    cur['paras'].append(p)
                flush()
            else:
                filled = sum(1 for p in allp if p['plain'].strip())
                arrets[-1]['blocs'].append({'kind': 'tableau', 'cells': cells, 'filled': filled})
            continue

        p = el
        t = p['plain']
        if el['hr'] and cur['kind'] == 'exercice':
            # filet horizontal dans un exercice : ligne d'écriture
            if t.strip():
                cur['paras'].append(p)
            cur['paras'].append({'kind': 'ligne', 'plain': '', 'runs': [], 'list': None})
            continue
        if el['hr']:
            flush()
            arrets[-1].setdefault('hr', 0)
            arrets[-1]['hr'] = arrets[-1].get('hr', 0) + 1
        if not t.strip():
            continue
        if re.fullmatch(r'[\s_]+', t):
            # ligne de soulignés seule : séparateur visuel du Word
            report['separateurs'] = report.get('separateurs', 0) + 1
            if cur['kind'] != 'exercice':
                flush()
            else:
                cur['paras'].append({'kind': 'ligne', 'plain': '', 'runs': [], 'list': None})
            continue
        km = KEYW.match(t.replace('*', ''))
        if km and motscles is None:
            motscles = (km.group(1), km.group(2))
            seen_body = True
            continue
        if not seen_body and (p['align'] == 'center' or p['style'] == 'Heading1' or re.match(r'^\s*_*\**\s*(\d+ - )?Chapitre', t)) and len(head) < 3:
            head.append(t.strip())
            continue
        seen_body = True
        mm = MARK.match(t)
        if mm:
            flush()
            # repère = partie en gras initiale (ou tout jusqu'à « : »)
            bold = ''
            for r in p['runs']:
                if r['b'] or not r['text'].strip():
                    bold += r['text']
                else:
                    break
            if not bold.strip() or not MARK.match(bold):
                bold = mm.group(0)
            if bold.rstrip().endswith('«'):
                bold = bold[:bold.rindex('«')]
            rep = bold.strip()
            rep = re.sub(r'^[\s>]*(EXERCICE)?[\s>]*', '', rep)
            rep = re.sub(r'[\s:>\-]*$', '', rep)
            if 'EXERCICE' in bold:
                rep = 'EXERCICE ' + rep
            arrets.append({'page': int(mm.group(1)), 'repere': rep, 'blocs': []})
            rest = strip_prefix(p['runs'], len(bold))
            if rep.startswith('EXERCICE '):
                rep = rep[9:]
                arrets[-1]['repere'] = rep
                start('exercice')
            if rest:
                k = len(re.match(r'^[\s:;.\u00a0]*', plain(rest)).group(0))
                rest = strip_prefix(rest, k)
            if rest and plain(rest).strip():
                lm = LABEL.match(plain(rest))
                if lm:
                    start('piste', niveau_label(lm))
                    rest = strip_prefix(rest, lm.end())
                np_ = dict(p, runs=rest, plain=plain(rest))
                sq = split_quote(np_) if cur['kind'] is None else None
                if sq:
                    start('citation')
                    cur['paras'].append(sq[0])
                    flush()
                    report.setdefault('citations_separees', []).append(sq[0]['plain'][:60])
                    start('piste', 'verte')
                    cur['paras'].append(sq[1])
                    continue
                if cur['kind'] is None:
                    start('citation' if is_citation(np_) else 'piste', 'verte')
                cur['paras'].append(np_)
            continue
        m = LABEL.match(t)
        if m:
            start('piste', niveau_label(m))
            rest = strip_prefix(p['runs'], m.end())
            p = dict(p, runs=rest, plain=plain(rest))
            cur['paras'].append(p)
            continue
        sq = split_quote(p)
        if sq:
            start('citation')
            cur['paras'].append(sq[0])
            flush()
            report.setdefault('citations_separees', []).append(sq[0]['plain'][:60])
            start('piste', 'verte')
            cur['paras'].append(sq[1])
            continue
        if is_citation(p):
            start('citation')
            cur['paras'].append(p)
            flush()
            continue
        em = EXO.match(t)
        if em:
            # étiquette « >>> EXERCICE » : devient le type du bloc
            start('exercice')
            rest = strip_prefix(p['runs'], em.end())
            if plain(rest).strip():
                cur['paras'].append(dict(p, runs=rest, plain=plain(rest)))
            continue
        if is_exercise(p):
            if cur['kind'] != 'exercice':
                start('exercice')
            cur['paras'].append(p)
            continue
        if cur['kind'] is None or cur['kind'] == 'citation':
            start('piste', 'verte')
        cur['paras'].append(p)
    flush()
    return head, motscles, arrets


def render(head, motscles, arrets, ind='      '):
    out = []
    out.append('// TITRE WORD : ' + ' / '.join(head))
    out.append('// MOTS-CLÉS : ' + (motscles[0] + ' : ' + motscles[1] if motscles else '—'))
    out.append('__IMPORTS__')
    out.append('')
    out.append('export default {')
    out.append("  id: '__ID__',")
    out.append("  slug: '__SLUG__',")
    out.append('  numero: __NUM__,')
    out.append('  titre: __TITRE__,')
    mots = []
    if motscles:
        mots = [m.strip(' .') for m in re.split(r',| - ', motscles[1]) if m.strip(' .')]
    out.append('  motsCles: %s,' % json.dumps(mots, ensure_ascii=False))
    out.append('  resume: __RESUME__,')
    out.append('arrets: [')
    for a in arrets:
        if not a['blocs']:
            continue
        out.append('  {')
        if a['page'] is not None:
            out.append('    page: %d,' % a['page'])
        if a['repere']:
            out.append('    repere: %s,' % json.dumps(a['repere'], ensure_ascii=False))
        out.append('    blocs: [')
        for b in a['blocs']:
            if b['kind'] == 'tableau':
                out.append('      /* REVOIR TABLEAU (%d cellules remplies) */' % b['filled'])
                rows = []
                for row in b['cells']:
                    rows.append([' / '.join(runs_to_jsx(p['runs']) for p in c if p['plain'].strip()) for c in row])
                out.append('      /* ' + json.dumps(rows, ensure_ascii=False) + ' */')
                continue
            paras = emit_paras(b['paras'], '          ')
            if b['kind'] == 'citation':
                out.extend(block('citation', paras, '      ', page=a['page']))
            elif b['kind'] == 'exercice':
                out.extend(block('exercice', paras, '      '))
            else:
                if b.get('note'):
                    out.append('      /* %s */' % b['note'])
                out.extend(block('piste', paras, '      ', niveau=b['niveau'] or 'verte'))
        out.append('    ],')
        out.append('  },')
    out.append('],')
    out.append('};')
    body = '\n'.join(out)
    used = [c for c in ['Cle', 'Fl', 'Lien', 'Blanc', 'Ligne'] if '<' + c in body]
    body = body.replace('__IMPORTS__', "import { %s } from '../../../components/contenu';" % ', '.join(used) if used else '')
    return body.split('\n')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('docx')
    a = ap.parse_args()
    head, mc, arrets = convert(a.docx)
    print('\n'.join(render(head, mc, arrets)))
    print('// RAPPORT : ' + json.dumps(report, ensure_ascii=False))
