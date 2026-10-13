"""Contrôles des tomes 2 à 4 : couverture des paragraphes Word et fidélité des citations."""
import json
import re
import subprocess
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from verifier import norm, word_paras  # noqa: E402
from t234 import SOURCES  # noqa: E402

SLUGS = {2: 'chambre-des-secrets', 3: 'prisonnier-d-azkaban', 4: 'coupe-de-feu'}


def chapitres(n):
    src = open('../../src/data/tomes/tome%d/index.js' % n).read()
    out = []
    for f in re.findall(r"from './(ch\d+)'", src):
        m = re.search(r"slug: '([^']+)'", open('../../src/data/tomes/tome%d/%s.jsx' % (n, f)).read())
        out.append(m.group(1))
    return out


for n in (2, 3, 4):
    slugs = ['_tome'] + chapitres(n)
    pages = json.loads(subprocess.check_output(['node', 'extraire_pages.cjs', SLUGS[n]] + slugs))
    json.dump(pages, open('out/pages_t%d.json' % n, 'w'), ensure_ascii=False)
    tout = norm(''.join(p['texte'] for p in pages.values()))
    paras = word_paras(SOURCES[n])
    wt = norm(''.join(paras))
    manq = [t.strip() for t in paras if len(norm(t)) >= 3 and norm(t) not in tout]
    cits = [c for p in pages.values() for c in p['citations']]
    ko = [c for c in cits if norm(c) not in wt]
    tot = {k: sum(p[k] for p in pages.values()) for k in ('arrets', 'introductions', 'verte', 'rouge', 'noire', 'exercices')}
    print('## Tome %d : %d chapitres, %s, %d citations (%d non identiques), %d paragraphes non retrouvés'
          % (n, len(slugs) - 1, tot, len(cits), len(ko), len(manq)))
    for m in manq:
        print('   - PARA', m[:170].replace('\n', ' '))
    for c in ko:
        print('   - CIT ', c[:170].replace('\n', ' '))
