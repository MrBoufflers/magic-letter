"""Applique au brouillon d'un chapitre les corrections relues à la main
(remplacements exacts, chacun vérifié) et écrit le fichier de données final."""
import re
import sys

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from gen import typo  # noqa: E402


def typo_jsx(s):
    """Typographie française sur les seuls textes JSX (entre deux balises)."""
    parts = re.split(r"(<[^>]*>)", s)
    out = []
    for i, p in enumerate(parts):
        inner = 0 < i < len(parts) - 1 and not p.startswith("<")
        out.append(typo(p) if inner and "{" not in p else p)
    return "".join(out)


def nbsp_pattern(old):
    return "".join("[ \u00a0]" if ch in " \u00a0" else re.escape(ch) for ch in old)


def finalise(src, dst, meta, repl, post=None):
    s = open(src).read()
    s = s.split('// RAPPORT')[0]
    s = re.sub(r'^// (TITRE WORD|MOTS-CLÉS).*\n', '', s, flags=re.M)
    for k, v in meta.items():
        s = s.replace('__%s__' % k, v)
    for old, new in repl:
        # correspondance insensible à la différence espace / espace insécable
        pat = nbsp_pattern(old)
        found = re.findall(pat, s)
        if len(found) != 1:
            sys.exit('Remplacement introuvable ou ambigu (%d) : %r' % (len(found), old[:120]))
        s = re.sub(pat, lambda m: typo_jsx(new), s)
    if post:
        s = post(s)
    # imports recalculés d'après les composants réellement utilisés
    comps = ['Cle', 'Fl', 'Lien', 'Blanc', 'Ligne', 'Tableau', 'FichePersonnage', 'Definition', 'Etoiles', 'Mots']
    used = [c for c in comps if re.search(r'<%s[\s/>]' % c, s)]
    s = re.sub(r"^import \{[^}]*\} from '../../../components/contenu';\n", '', s, flags=re.M)
    if used:
        s = "import { %s } from '../../../components/contenu';\n\n" % ', '.join(used) + s.lstrip('\n')
    # indentation de `arrets`
    s = s.replace('\narrets: [', '\n  arrets: [')
    open(dst, 'w').write(s)
