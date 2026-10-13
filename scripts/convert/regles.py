"""Règles éditoriales communes à tous les tomes, validées par Oni (2026-10-13),
appliquées à la finalisation de chaque fichier de données :

- flèches : les « >>> » qui servent de marqueur (début de paragraphe ou de capsule,
  devant une citation, autour d'une étiquette de piste, collées à un mot) sont retirées ;
  seules restent celles placées au milieu d'une phrase, au sens de « donc ».
- introductions : en tête de chapitre (arrêt sans page), les paragraphes en italique
  deviennent un bloc `introduction`.
- majuscules : chaque capsule (piste, exercice, introduction) commence par une majuscule.

Chaque modification est consignée dans `JOURNAL` pour le rapport de conversion.
"""
import re

JOURNAL = {'fleches': 0, 'majuscules': [], 'introductions': []}

BLOC = re.compile(r"      \{\n        type: '(\w+)',\n(.*?)\n      \},\n", re.S)
OUVRANTES = r'(?:\s|<(?:strong|em|Cle)>)*'


def fleches(s):
    avant = s.count('<Fl />')
    # début de paragraphe / élément de liste (après d'éventuelles balises ouvrantes)
    s = re.sub(r'(<(?:p|li)>' + OUVRANTES + r')<Fl />\s*', r'\1', s)
    for _ in range(3):
        s = re.sub(r'(<(?:p|li)>' + OUVRANTES + r')<Fl />\s*', r'\1', s)
    # devant une citation ou une étiquette de piste
    s = re.sub(r'<Fl />\s*(?=' + OUVRANTES + r'[«“]|' + OUVRANTES + r'[Pp]istes?\b)', '', s)
    # après une étiquette de piste (« piste noire>>> »)
    s = re.sub(r'([Pp]istes? (?:rouges?|noires?|vertes?)(?:</[a-zA-Z]+>)*)\s*<Fl />', r'\1', s)
    # collée à un mot (pas d'espace d'un côté)
    s = re.sub(r'(?<=[\w»)])<Fl />', '', s)
    s = re.sub(r'<Fl />(?=[\w«(])', '', s)
    # chevrons isolés restés du Word (« >> Conclusion », « >pistes »)
    s = re.sub(r'(<(?:p|li)>' + OUVRANTES + r')(?:&gt;)+\s*', r'\1', s)
    s = re.sub(r'(?<![=\w])&gt;(?=\w)', '', s)
    # balises vidées
    for _ in range(3):
        s = re.sub(r'<(strong|em|Cle)>\s*</\1>', '', s)
    s = re.sub(r'<p>\s+', '<p>', s)
    s = re.sub(r'<li>\s+', '<li>', s)
    JOURNAL['fleches'] += avant - s.count('<Fl />')
    return s


def _texte(jsx):
    return re.sub(r'<[^>]+>', '', jsx)


def _italique(p):
    """Paragraphe entièrement en italique (hors espaces et ponctuation) ?"""
    hors_em = re.sub(r'<em>.*?</em>', '', p, flags=re.S)
    return bool(re.search(r'<em>', p)) and not re.search(r'[\w«»]', _texte(hors_em))


def introductions(s, fichier):
    i = s.index('arrets: [')
    m = re.search(r'\n  \{\n    (.*?)\n  \},\n', s[i:], re.S)
    if not m or m.group(1).startswith('page:'):
        return s
    debut, fin = i + m.start(1), i + m.end(1)
    arret = s[debut:fin]

    def bloc(b):
        if b.group(1) != 'piste' or not re.search(r"niveau: [\"']verte[\"']", b.group(2)):
            return b.group(0)
        corps = re.search(r'contenu: \(\n          <>\n(.*)\n          </>\n        \),', b.group(2), re.S)
        if not corps:
            return b.group(0)
        lignes = corps.group(1).split('\n')
        k = 0
        while k < len(lignes) and lignes[k].strip().startswith('<p>') and _italique(lignes[k]):
            k += 1
        if k == 0:
            return b.group(0)
        JOURNAL['introductions'].append('%s : %d paragraphe(s)' % (fichier, k))
        intro = ("      {\n        type: 'introduction',\n        contenu: (\n          <>\n"
                 + '\n'.join(lignes[:k]) + "\n          </>\n        ),\n      },\n")
        if k == len(lignes):
            return intro
        reste = b.group(0).replace(corps.group(1), '\n'.join(lignes[k:]))
        return intro + reste

    arret = BLOC.sub(bloc, arret)
    return s[:debut] + arret + s[fin:]


def majuscules(s, fichier):
    def bloc(b):
        if b.group(1) not in ('piste', 'exercice', 'introduction'):
            return b.group(0)
        corps = b.group(2)
        k = corps.find('<>')
        if k < 0:
            return b.group(0)
        # premier caractère de texte après le fragment, balises et espaces ignorés
        j = k + 2
        while j < len(corps):
            if corps[j] == '<':
                j = corps.index('>', j) + 1
            elif corps[j] in ' \n ':
                j += 1
            else:
                break
        if j < len(corps) and corps[j].isalpha() and corps[j].islower():
            JOURNAL['majuscules'].append('%s : « %s »' % (fichier, _texte(corps[j:j + 50]).split('\n')[0]))
            corps = corps[:j] + corps[j].upper() + corps[j + 1:]
            return b.group(0).replace(b.group(2), corps, 1)
        return b.group(0)

    return BLOC.sub(bloc, s)


def appliquer(s, fichier):
    s = fleches(fleches(s))
    s = introductions(s, fichier)
    s = majuscules(s, fichier)
    return s
