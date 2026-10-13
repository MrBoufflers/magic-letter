"""Tomes 2 à 4 : brouillons par chapitre (tomes 2 et 3) ou d'un seul tenant (tome 4)."""
import json
import sys
import importlib

sys.path.insert(0, __file__.rsplit('/', 1)[0])
import gen  # noqa: E402

SOURCES = {
    2: "../../sources/2 - Harry Potter et la chambre des secrets/Harry Potter et la chambre des secrets.docx",
    3: "../../sources/3 - Harry Potter et le prisonnier d_Azkaban/Harry Potter et le prisonnier d’Azkaban.docx",
    4: "../../sources/4 - Harry Potter et la Coupe de Feu/Harry Potter et la Coupe de Feu.docx",
}


def brouillons(n):
    importlib.reload(gen)
    out = 'out/drafts%d/' % n
    import os
    os.makedirs(out, exist_ok=True)
    if n in (2, 3):
        head, mc, intro, chaps = gen.convert(SOURCES[n], chapitres=True, groupes=True)
    else:
        head, mc, intro = gen.convert(SOURCES[n], groupes=True)
        chaps = [{'numero': 1, 'titre': None, 'arrets': intro[1:]}]
        intro = intro[:1]
    open(out + 'intro.jsx', 'w').write('\n'.join(gen.render(head, mc, intro)) + '\n')
    for c in chaps:
        open(out + 'ch%02d.jsx' % c['numero'], 'w').write(
            '// TITRE : %s\n' % c['titre'] + '\n'.join(gen.render(head, None, c['arrets'])) + '\n')
    open(out + 'rapport.json', 'w').write(json.dumps(
        {'head': head, 'motscles': mc, 'chapitres': [(c['numero'], c['titre']) for c in chaps], 'rapport': gen.report},
        ensure_ascii=False, indent=1))
    return head, mc, chaps


if __name__ == '__main__':
    for n in [int(a) for a in sys.argv[1:]] or [2, 3, 4]:
        head, mc, chaps = brouillons(n)
        print('Tome', n, head, mc and mc[0], [(c['numero'], c['titre'], len([a for a in c['arrets'] if a['blocs']])) for c in chaps])
