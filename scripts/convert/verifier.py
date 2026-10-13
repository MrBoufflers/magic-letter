#!/usr/bin/env python3
"""Script jetable : contrôle de couverture et de fidélité d'un tome.

1. Chaque paragraphe (et cellule de tableau) des Word retenus doit se retrouver dans
   le texte rendu de la page (comparaison sans espaces, sans flèches/étiquettes).
2. Chaque citation rendue doit figurer à l'identique dans le Word (hors espaces).
Usage : python3 verifier.py pages.json   (avec t1_files.CHAPITRES)
"""
import json
import re
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
import dump  # noqa: E402

EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿️]')


def norm(t):
    t = EMOJI.sub('', t)
    t = re.sub(r'\{(HR|IMG:[^}]*)\}', '', t)
    t = re.sub(r'(》|>)+\s*_*\s*(\*\*)?(Pistes?\s+(très\s+)?(rouge|noire|verte|bleue/rouge|bleue)s?|Complètement hors-piste)\s*(\*\*)?_*\s*(》|>)+', '', t, flags=re.I)
    t = re.sub(r'(?i)^\s*(>\s*)*EXERCICE\b', '', t)
    t = t.replace('》', '').replace('>', '').replace('_', '').replace('*', '')
    t = re.sub(r'[:;]', '', t)
    return re.sub(r'[\s  ]+', '', t)


def paragraphs(items):
    for it in items:
        if it['kind'] == 'p':
            yield ''.join(r['text'] for r in it['runs'])
        else:
            for row in it['rows']:
                for cell in row:
                    yield from paragraphs(cell)


def word_paras(path):
    doc, rels, _ = dump.load(path)
    return list(paragraphs(dump.walk_body(doc.find(dump.W + 'body'), rels)))


def main(pages_json, chapitres, slugs):
    pages = json.load(open(pages_json))
    total_manq = 0
    for (n, path), slug in zip(chapitres, slugs):
        page = pages[slug]
        ptexte = norm(page['texte'])
        paras = word_paras(path)
        wtexte = norm(''.join(paras))
        manquants = []
        for t in paras:
            k = norm(t)
            if len(k) < 3:
                continue
            if re.match(r'(?i)^\W*(mots[- ]clés?|notions?\W*clés?|notions étudiées|notions)\s*:', t) or re.match(r'^\W*(\d+ - )?Chapitre \d+', t.strip(' _*')):
                continue  # titre et mots-clés : contrôlés à part
            if k not in ptexte:
                manquants.append(t.strip())
        cit_ko = [c for c in page['citations'] if norm(c) not in wtexte]
        total_manq += len(manquants)
        print('## %s : %d paragraphes Word non retrouvés tels quels, %d/%d citations non identiques'
              % (slug, len(manquants), len(cit_ko), len(page['citations'])))
        for m in manquants:
            print('   - PARA  ', m[:160].replace('\n', ' '))
        for c in cit_ko:
            print('   - CIT   ', c[:160].replace('\n', ' '))
    return total_manq


if __name__ == '__main__':
    from t1_files import D, CHAPITRES
    slugs = ['incipit'] + ['chapitre-%d' % i for i in range(1, 18)]
    main(sys.argv[1], [(n, D + f) for n, f in CHAPITRES], slugs)
