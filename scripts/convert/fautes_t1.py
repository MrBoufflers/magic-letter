"""Fautes suspectées relevées à la relecture (tome 1). Chaque extrait est vérifié
dans les Word retenus ; le script indique le fichier où il apparaît."""
import sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from verifier import word_paras  # noqa: E402
from t1_files import D, CHAPITRES  # noqa: E402

FAUTES = [
    ("d’étrange et le mystérieux", "la citation p. 7 dit « d'étrange ou de mystérieux »"),
    ("information cinq étoile de", "étoiles ?"),
    ("auxquelles attribueriez", "« vous attribueriez » ?"),
    ("qu'il doit attendre pour retrouver en état", "atteindre / un état ?"),
    ("plus loin,,", "virgule doublée"),
    ("qui donne en effet assez ridicule", "mot manquant ? (« un air assez ridicule »)"),
    ("bottes à haut talon munis", "munies ?"),
    ("de pouvoir que lui-même", "pouvoirs ?"),
    ("événènements", "événements"),
    ("Ce qui à quelque chose", "a"),
    ("du personnage de et de sa disparition", "nom manquant (Voldemort ?)"),
    ("le lecteur découvre un chat a un comportement", "« un chat qui a » ?"),
    ("JK Rownling", "Rowling"),
    ("petit yeux bleus humide", "petits yeux bleus humides"),
    ("cheveux noir et", "noirs"),
    ("ne lui dis pas bonjour", "dit"),
    ("quand le héros à des frères", "a"),
    ("On va bien dans ce dialogue", "voit ?"),
    ("ce qu'elle cela deviendra", "mot en trop"),
    ("peut-être assez efficace", "peut être"),
    ("le temps ralenti", "ralentit"),
    ("Les Potter ont dormi à l'hôtel", "les Dursley ?"),
    ("et certes juste", "est"),
    ("quand qui doit décider", "mot en trop"),
    ("si Hagrid réussi", "réussit"),
    ("d'affreuse répétition", "d'affreuses répétitions"),
    ("jetta", "jeta (dans un exemple inventé, piste rouge)"),
    ("comme si de rien était", "« comme si de rien n'était »"),
    ("Il existe encore de défense contre les forces du mal", "mot manquant (« un cours de défense » ?)"),
    ("portent tous en uniforme", "« un uniforme » ?"),
    ("qu'à ce qui appartiennent", "ceux qui"),
    ("à une mère qui vient", "a"),
    ("boutiques de ballet volant", "balais volants"),
    ("sorcier en sport", "sorciers un sport"),
    ("les mornings", "mornilles"),
    ("Tant qu'on est pas", "n'est pas"),
    ("Sinistre: :", "deux-points doublés (vocabulaire)"),
    ("chaque maison à sa propre", "a"),
    ("l'on en choisira pas", "n'en choisira"),
    ("c'est la seule être capable", "la seule à être"),
    ("s'est réjouit", "réjoui"),
    ("Hermione est devenu un", "devenue"),
    ("piquet de 15 m", "piqué"),
    ("dire c'est véritables", "ses"),
    ("Paris reçoit un pull", "Harry"),
    ("Malefoy à un certain génie", "a"),
    ("semble tâché de sang", "taché (citation ? vérifier dans le livre)"),
    ("peut-être en détail de pure", "un détail"),
    ("il ne le comprirent", "ils ne le comprirent (citation : vérifier dans le livre)"),
    ("c'est toi qui devrait", "devrais (citation : vérifier dans le livre)"),
    ("la plus plus longue", "« plus » doublé (citation : vérifier dans le livre)"),
    ("Quirell", "orthographe variable : Quirell / Quirrel / Quirrell"),
]

if __name__ == '__main__':
    textes = {f: '\n'.join(word_paras(D + f)) for _, f in CHAPITRES}
    for ext, com in FAUTES:
        ou = [f for f, t in textes.items() if ext in t.replace(' ', ' ')]
        print('%s\t%s\t%s' % (ext, com, ', '.join(ou) or 'INTROUVABLE'))
