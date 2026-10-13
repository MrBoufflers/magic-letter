"""Fautes suspectées relevées à la relecture (tomes 2 à 4), vérifiées dans les Word."""
import sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from verifier import word_paras  # noqa: E402
from t234 import SOURCES  # noqa: E402

FAUTES = [
    (2, "justification paroxysme", "virgule manquante dans les notions (deux notions ?)"),
    (2, "Lucius Malefoy à des informations", "a"),
    (2, "Nous assistant ensuite", "assistons"),
    (2, "Hary a eu", "Harry"),
    (2, "détail à une immense importance", "a"),
    (2, "dans les dialogue", "dialogues"),
    (2, "exclusion l'école", "exclusion de l'école"),
    (2, "la terreur que répond la magie noire", "répand"),
    (2, "le Phoenix plonge à soudain point", "citation dictée : « point » pour « . », mots erronés — à reprendre dans le livre"),
    (2, "un anagramme", "une anagramme"),
    (3, "Il il y a", "mot doublé"),
    (3, "et elle touchent", "elles"),
    (3, "ressemble étrangement à Neuville", "Neville"),
    (3, "demande à Hermione d'une voix inquiète", "citation : « demanda Hermione » ? (vérifier dans le livre)"),
    (3, "qu'elle n'arrive plus à se contrôler", "qu'il (Harry)"),
    (3, "en créant un personnage en porte", "qui porte ?"),
    (3, "Pettigrow à des faiblesses", "a"),
    (3, "Askaban", "Azkaban"),
    (3, "les avais tué", "citation : tués ? (vérifier dans le livre)"),
    (3, "s'était levé d'un bon", "bond (citation : vérifier dans le livre)"),
    (3, "une tâche rouge", "tache (citation : vérifier dans le livre)"),
    (4, "tu le sais bien point d'accord", "citation dictée : « point » pour « . » — à reprendre dans le livre"),
    (4, "dis Hermione en se frottant", "dit (citation : vérifier dans le livre)"),
    (4, "Ce dialogue entre Paris, Ron et Hermione", "Harry"),
    (4, "ce qui ĺ’attend", "caractère parasite"),
    (4, "est d'autant plus surprenante", "« L'apparition sonore… » (article manquant en début de phrase)"),
    (4, "et donc très importante", "est"),
    (4, "et la première réelle apparition", "est"),
    (4, "ce que vous n'êtes plus tout à fait piste verte", "« c'est que » ?"),
]

if __name__ == '__main__':
    textes = {n: '\n'.join(word_paras(p)).replace(' ', ' ') for n, p in SOURCES.items()}
    for n, ext, com in FAUTES:
        print('%d\t%s\t%s\t%s' % (n, ext, com, 'ok' if ext in textes[n] else 'INTROUVABLE'))
