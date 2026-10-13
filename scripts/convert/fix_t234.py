"""Finalisation des tomes 2 à 4 : métadonnées, corrections relues à la main,
fichiers de données écrits dans src/data/tomes/tomeN/."""
import json
import os
import re
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from finalise import finalise, nbsp_pattern  # noqa: E402
from fix_t1 import definitions, rep  # noqa: E402

N = ' '


def j(s):
    return json.dumps(s, ensure_ascii=False)


# ------------------------------------------------------------------ outils

def citation_lignes(s, debut, fin, page=None, coupe=None):
    """Les lignes de `debut` à `fin` (dans une piste) deviennent un bloc citation.
    `coupe` : texte à partir duquel la première ligne bascule dans la citation."""
    lignes = s.split('\n')
    pat = re.compile(nbsp_pattern(debut))
    idx = [k for k, l in enumerate(lignes) if pat.search(l)]
    if len(idx) != 1:
        sys.exit('citation_lignes : %d ligne(s) pour %r' % (len(idx), debut))
    i = idx[0]
    pf = re.compile(nbsp_pattern(fin))
    jf = next(k for k in range(i, len(lignes)) if pf.search(lignes[k]))
    avant_ligne = None
    if coupe:
        l = lignes[i]
        c = re.search(nbsp_pattern(coupe), l).start()
        indent = l[:len(l) - len(l.lstrip())]
        avant_ligne = l[:c].rstrip() + '</p>'
        lignes[i] = indent + '<p>' + l[c:]
    if lignes[i - 1].strip() == '<ul>' and lignes[i].strip().startswith('<li>'):
        i -= 1
    if jf + 1 < len(lignes) and lignes[jf + 1].strip() == '</ul>':
        jf += 1
    # niveau de la piste englobante
    k = i
    while 'niveau:' not in lignes[k]:
        k -= 1
    niveau = re.search(r"niveau: [\"'](\w+)", lignes[k]).group(1)
    cit = lignes[i:jf + 1]
    if lignes[i].strip().startswith('<li>'):
        cit = ['          <ul>'] + cit
    if cit[-1].strip().startswith('<li>'):
        cit = cit + ['          </ul>']
    fermer = ['          </>', '        ),', '      },']
    ouvrir_piste = ['      {', "        type: 'piste',", "        niveau: '%s'," % niveau,
                    '        contenu: (', '          <>']
    ouvrir_cit = ['      {', "        type: 'citation',"] + (['        page: %d,' % page] if page else []) + \
                 ['        texte: (', '          <>']
    milieu = ([avant_ligne] if avant_ligne else []) + fermer + ouvrir_cit + cit + fermer + ouvrir_piste
    nouveau = lignes[:i] + milieu + lignes[jf + 1:]
    s = '\n'.join(nouveau)
    # pistes vidées par le découpage
    s = re.sub(r"      \{\n        type: 'piste',\n        niveau: '\w+',\n        contenu: \(\n          <>\n"
               r"          </>\n        \),\n      \},\n", '', s)
    return s


def page_citation(s, debut, page):
    """Ajoute la page à la citation dont le texte (balises retirées) commence par `debut`."""
    entete = "type: 'citation',\n        texte: (\n          <>\n"
    pat = re.compile(nbsp_pattern(debut))
    for m in re.finditer(re.escape(entete), s):
        fin = s.index('\n', s.index('\n', m.end()) + 1)
        ligne = s[m.end():fin]
        if pat.search(re.sub(r'<[^>]+>', '', ligne)):
            return s[:m.start()] + "type: 'citation',\n        page: %d,\n" % page + s[m.start() + len("type: 'citation',\n"):]
    sys.exit('page_citation : %r' % debut)


EXO_P = re.compile(r"(type: 'exercice',\n)(        contenu: \(\n          <>\n)          <p>(.*?)</p>\n")


def titres_exercices(s):
    """« EXERCICE n°2 : rédaction : … » -> titre « n°2 : rédaction ».
    Le titre va jusqu'au premier « : » situé hors de toute balise ; le reste reste dans l'exercice."""
    def r(m):
        p = m.group(3)
        if not re.match(r'^(?:<[^/][^>]*>)*n°', p):
            return m.group(0)
        prof, coupe = 0, None
        for t in re.finditer(r'<(/?)[^>]*?(/?)>|:', p):
            if t.group(0) == ':':
                if prof == 0:
                    coupe = t.start()
                    break
            elif not t.group(2):
                prof += -1 if t.group(1) else 1
        titre = re.sub(r'<[^>]+>', '', p if coupe is None else p[:coupe]).strip(' :\u00a0')
        reste = '' if coupe is None else p[coupe + 1:].strip(' \u00a0')
        corps = '          <p>%s</p>\n' % reste if reste else ''
        return m.group(1) + '        titre: %s,\n' % j(titre) + m.group(2) + corps
    return EXO_P.sub(r, s)


def introduction_tome(s):
    """En tête de tome, les pistes vertes qui précèdent tout autre bloc sont l'introduction."""
    i = s.index('blocs: [')
    while True:
        m = re.compile(r"      \{\n        type: 'piste',\n        niveau: \"verte\",\n").match(s, i + len('blocs: [\n'))
        if not m:
            break
        s = s[:m.start()] + "      {\n        type: 'introduction',\n" + s[m.end():]
        i = s.index('\n      },\n', m.start()) - len('blocs: [')
    return s


def ecrire(tome, nom, meta, repl=(), post=None):
    src = 'out/drafts%d/%s.jsx' % (tome, nom)
    dst = '../../src/data/tomes/tome%d/%s.jsx' % (tome, nom)
    os.makedirs(os.path.dirname(dst), exist_ok=True)

    def p(x):
        x = re.sub(r'^// TITRE : .*\n', '', x)
        if post:
            x = post(x)
        return titres_exercices(definitions(x))
    finalise(src, dst, meta, list(repl), p)
    return dst


def meta_chap(tome, n, titre, slug=None):
    return dict(ID='tome-%d-chapitre-%d' % (tome, n), SLUG=slug or 'chapitre-%d' % n, NUM=str(n),
                TITRE=j(titre), RESUME='null')


# ------------------------------------------------------------------ tome 2

def tome2():
    ecrire(2, 'intro', dict(ID='tome-2-introduction', SLUG='introduction', NUM='0', TITRE='null', RESUME='null'),
           post=introduction_tome)
    post = {
        17: lambda s: citation_lignes(s, "<p>« TOM ELVIS JEDUSOR.</p>", "JE SUIS VOLDEMORT. »", 327),
    }
    nums = sorted(int(f[2:4]) for f in os.listdir('out/drafts2') if f.startswith('ch'))
    for n in nums:
        ecrire(2, 'ch%02d' % n, meta_chap(2, n, None), post=post.get(n))
    return nums


# ------------------------------------------------------------------ tome 3

def tome3():
    ecrire(3, 'intro', dict(ID='tome-3-introduction', SLUG='introduction', NUM='0', TITRE='null', RESUME='null'),
           post=introduction_tome)
    titres = {c[0]: c[1] for c in json.load(open('out/drafts3/rapport.json'))['chapitres']}
    post = {
        8: lambda s: citation_lignes(s, "« - Qu'est-ce qui se passe, Lavande", "J'aurais dû m'en douter", 157),
        12: lambda s: citation_lignes(s, "Nous le voyons dans ce passage", "dernier morceau de chocolat", 253, coupe='«'),
        16: lambda s: page_citation(s, "« Mais le professeur ne semblait pas l'entendre", 334),
        19: lambda s: page_citation(citation_lignes(s, "C'est tout le contraire de Peter Pettigrow",
                                                    "Pettigrow s’essuya le visage", 379, coupe='«'),
                                    "« … C'est comme si je les avais tué", 360),
        22: lambda s: page_citation(s, "« Je ne sais pas si quelqu'un te l'a jamais dit", 389),
    }
    for n, t in sorted(titres.items()):
        t = t.rstrip('.') if t else t
        ecrire(3, 'ch%02d' % n, meta_chap(3, n, t[:1].upper() + t[1:] if t else None), post=post.get(n))
    return sorted(titres)


# ------------------------------------------------------------------ tome 4

def tome4():
    ecrire(4, 'intro', dict(ID='tome-4-introduction', SLUG='introduction', NUM='0', TITRE='null', RESUME='null'),
           post=introduction_tome)

    def post(s):
        s = citation_lignes(s, "« il n'y a que deux possibilités, dis Hermione", "C'est sûrement Croupton, affirma Ron", 599)
        s = citation_lignes(s, "Je suis ton fils ! Criait celui-ci", "La petite sorcière, à côté de lui", 632)
        return s
    ecrire(4, 'ch01', dict(ID='tome-4-provisoire', SLUG='pages-22-a-755', NUM='1',
                           TITRE=j('Commentaires page par page (p.' + N + '22 à 755)'), RESUME='null'),
           repl=[('    repere: "Page 22.",', '    repere: "Page 22",'),
                 ('  numero: 1,', "  numero: 1,\n  libelle: 'Tome entier (chapitres à venir)',")], post=post)


if __name__ == '__main__':
    print('tome 2', tome2())
    print('tome 3', tome3())
    tome4()
    print('tome 4 ok')
