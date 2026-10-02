"""Corrections relues à la main, chapitre par chapitre (tome 1).
Chaque entrée : métadonnées + remplacements exacts appliqués au brouillon de gen.py."""
import json
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from finalise import finalise, nbsp_pattern  # noqa: E402
import re  # noqa: E402


def rep(s, old, new):
    """Remplacement exact unique (espaces insécables indifférentes), sinon erreur."""
    found = re.findall(nbsp_pattern(old), s)
    if len(found) != 1:
        sys.exit('rep : %d occurrence(s) de %r' % (len(found), old[:100]))
    return re.sub(nbsp_pattern(old), lambda m: new, s)

N = ' '
DRAFTS = 'out/drafts1/'
DEST = '../../src/data/tomes/tome1/'


def j(s):
    return json.dumps(s, ensure_ascii=False)


CH = {}

DEF_RE = re.compile(
    r'^(?P<ind> *)<p>(?:<strong>)?Définition\s*(?:</strong>)?[\u00a0 ]*:[\u00a0 ]*(?:<strong>)?(?P<terme>[^<:]+?)(?:</strong>)?[\u00a0 ]*:[\u00a0 ]*(?P<reste>.*)</p>$',
    re.M)


def definitions(s):
    """« Définition : terme : texte » -> carte de définition (texte inchangé)."""
    def r(m):
        i = m.group('ind')
        return '%s<Definition terme=%s>\n%s  <p>%s</p>\n%s</Definition>' % (
            i, json.dumps(m.group('terme').strip(), ensure_ascii=False), i, m.group('reste'), i)
    return DEF_RE.sub(r, s)

# ------------------------------------------------------------------ Incipit
CH[0] = dict(
    fichier='ch00-incipit.jsx',
    meta=dict(ID='tome-1-incipit', SLUG='incipit', NUM='0',
              TITRE=j("Incipit" + N + ": la porte d'entrée du texte"),
              RESUME=j("Travail à réaliser à la fin de la lecture de la première page du récit. "
                       "A retenir en priorité" + N + ": les notions de champ lexical et de hiérarchie des informations" + N + "!")),
    repl=[
        # Le titre souligné « La hiérarchie des informations » ouvre une nouvelle piste.
        ("""<em>informations cinq étoiles.</em></p>
          <p><strong><Cle>La hiérarchie des informations :</Cle></strong></p>""",
         """<em>informations cinq étoiles.</em></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        titre: 'La hiérarchie des informations :',
        contenu: (
          <>"""),
        ("""<p><strong><Fl /></strong> Souvent les élèves""",
         """<Etoiles n={5} />
          <p><strong><Fl /></strong> Souvent les élèves"""),
        ("""<p><Cle>Voici une autre information cinq étoile de ce dossier :</Cle></p>""",
         """<Etoiles n={5} />
          <p><Cle>Voici une autre information cinq étoile de ce dossier :</Cle></p>"""),
        ("""(en général, pas forcément dans le texte) : <Blanc /></p>""",
         """(en général, pas forcément dans le texte) :</p>
          <Ligne n={3} />"""),
        ("""<p>Je lis le chapitre n°1 et je complète le tableau avec des informations « 5 étoiles ».</p>""",
         """<p>Je lis le chapitre n°1 et je complète le tableau avec des informations « 5 étoiles ».</p>
          <FichePersonnage
            personnage={<>Personnage{'\\u00a0'}: M. Dursley</>}
            colonnes={['Caractéristiques physiques', 'Caractéristiques morales et psychologiques (= caractère)', 'Habitudes']}
            exemples={[
              ['Grand et massif', 'Pas très courageux car…', 'Va tous les jours au travail en voiture'],
              ['…', '…', ''],
            ]}
            lignesVides={5}
          />"""),
        ("""      /* REVOIR TABLEAU (11 cellules remplies) */
      /* [["", "Caractéristiques physiques", "Caractéristiques morales et psychologiques / (= caractère)", "Habitudes"], ["", "Grand et massif", "Pas très courageux car…", "Va tous les jours au travail en voiture"], ["", "…", "…", ""], ["", "", "", ""], ["Personnage : / M. Dursley", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]] */
""", ""),
    ],
)

# ------------------------------------------------------------------ Chapitre 1
CH[1] = dict(
    fichier='ch01.jsx',
    meta=dict(ID='tome-1-chapitre-1', SLUG='chapitre-1', NUM='1',
              TITRE=j("Les caractéristiques essentielles de Mister Dursley, Mrs Dursley et de Dudley"),
              RESUME=j("Ce document concerne le premier chapitre. Retenez bien qu'en général les portraits sont composés avec trois types d'information, les caractéristiques morales et les habitudes" + N + "! (piste rouge" + N + ": on trouve aussi souvent des explications sur la place des personnages dans l'histoire).")),
    repl=[
        ('''          <p><strong><Fl /></strong> Définition : <strong>caractéristique</strong> : signe qui permet de reconnaître un individu d’un autre.</p>
          <p>Ex : Choisis des fraises <Cle>bien mûres</Cle> pour préparer ton gâteau !</p>
          <p>caractéristiques</p>''',
         '''          <Definition terme="caractéristique">
            <p>signe qui permet de reconnaître un individu d’un autre.</p>
            <p>Ex : Choisis des fraises <Cle>bien mûres</Cle> pour préparer ton gâteau !</p>
            <p className="annotation">caractéristiques</p>
          </Definition>'''),
        ('''      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong><Fl /> Hagrid</strong> : <strong>p.21</strong> en bas : « il était''',
         '''    ],
  },
  {
    page: 21,
    repere: 'Hagrid\u00a0: p.21 en bas',
    blocs: [
      {
        type: 'citation',
        page: 21,
        texte: (
          <>
          <p>« il était'''),
        ('''qui avaient l'air de bébés dauphin. »</p>
          <p>À la fin de la page 22''',
         '''qui avaient l'air de bébés dauphin. »</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        contenu: (
          <>
          <p>À la fin de la page 22'''),
        # « Piste bleue/rouge » : classée rouge par gen.py, à valider (rapport) ; « ... » décoratif après l'étiquette.
        ('''          <p>...</p>
''', ''),
    ],
)

# ------------------------------------------------------------------ Chapitre 2
NOUVEL_ARRET = '''          </>
        ),
      },
    ],
  },
  {
    %s
    repere: %s,
    blocs: [
      {
        type: 'piste',
        niveau: 'verte',
        contenu: (
          <>'''


def arret(repere, page=None):
    return NOUVEL_ARRET % ('page: %d,' % page if page else '', j(repere))


CH[2] = dict(
    fichier='ch02.jsx',
    meta=dict(ID='tome-1-chapitre-2', SLUG='chapitre-2', NUM='2',
              TITRE=j("Un portrait croisé"),
              RESUME=j("Où l'on trouve le portraits d'autres personnages, et notamment celui de Harry. Piste rouge" + N + ": quand on fait un portrait croisé (ici, Harry et Dudley), cela donne très envie au lecteur de comparer les deux" + N + "!")),
    repl=[
        ('''          <p><strong><Fl /> Portrait de Harry p. 26:</strong></p>''',
         arret('Portrait de Harry p. 26', 26)),
        ('''          <ul className="chevrons">
            <li><strong>&gt;&gt;Portrait de Dudley</strong> (les informations''',
         arret('Portrait de Dudley') + '''
          <ul className="chevrons">
            <li>(les informations'''),
    ],
)

# ------------------------------------------------------------------ Chapitre 3
CITATION_DEBUT = '''          </>
        ),
      },
      {
        type: 'citation',
        page: %d,
        texte: (
          <>'''
PISTE_REPRISE = '''          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        contenu: (
          <>'''

CH[3] = dict(
    fichier='ch03.jsx',
    meta=dict(ID='tome-1-chapitre-3', SLUG='chapitre-3', NUM='3',
              TITRE=j("L’événement déclencheur qui ne déclenche pas du tout"),
              RESUME=j("On trouvera ici une série de commentaires sur les ingrédients que l'auteur utilise pour fabriquer son texte" + N + ": il faut en connaître les principaux" + N + "! (en plus des portraits). On parlera notamment ici de titre, de dialogue, de mise en page, de figure de style et de suspense.")),
    repl=[
        ('''          <p>« -Va chercher le courrier''', CITATION_DEBUT % 41 + '''
          <p>« -Va chercher le courrier'''),
        ('''          <p>Définition : <strong>figure de style</strong> : procédé par lequel l'auteur appuie sur un point précis du texte en s'écartant de l'usage ordinaire de la langue.</p>''',
         '''          <Definition terme="figure de style">
            <p>procédé par lequel l'auteur appuie sur un point précis du texte en s'écartant de l'usage ordinaire de la langue.</p>
          </Definition>'''),
        ('''          <p><strong>Définition : <Cle>Suspense</Cle></strong> : moment d'attente angoissée durant lequel le narrateur ralentit le déroulement de l'action.</p>''',
         '''          <Definition terme={<Cle>Suspense</Cle>}>
            <p>moment d'attente angoissée durant lequel le narrateur ralentit le déroulement de l'action.</p>
          </Definition>'''),
    ],
)

# ------------------------------------------------------------------ Chapitre 4
CH[4] = dict(
    fichier='ch04.jsx',
    meta=dict(ID='tome-1-chapitre-4', SLUG='chapitre-4', NUM='4',
              TITRE=j("La révélation"),
              RESUME=j("A retenir" + N + ": il faut toujours bien regarder comment les narrateurs mettent en scène les événements principaux" + N + "!")),
    repl=[
        ('''<p>« Bouge-toi un peu, gros tas, dit-il » p. 56</p>''', '''<p>« Bouge-toi un peu, gros tas, dit-il »</p>'''),
        ('''    repere: "P. 59",''', '''    repere: "P. 59 - « Harry… tu es un sorcier »",'''),
        ('''          <p>- « Harry… tu es un sorcier »</p>
''', ''),
        ('''Encadrement - Vacarme - Faribole</p>
          <Ligne n={1} />''', '''Encadrement - Vacarme - Faribole</p>'''),
    ],
)

# ------------------------------------------------------------------ Chapitre 5
def ch05_post(s):
    """Exercice des caractéristiques essentielles : blancs rendus en lignes."""
    s = rep(s, """            <li>D’après moi, la caractéristique essentielle la plus importante de Poudlard est <Blanc /></li>
          </ul>
          <Ligne n={1} />
          <p>parce que <Blanc /></p>
          <Ligne n={2} />""", """          </ul>
          <p>D’après moi, la caractéristique essentielle la plus importante de Poudlard est <Blanc /></p>
          <Ligne n={1} />
          <p>parce que <Blanc /></p>
          <Ligne n={2} />""")
    s = rep(s, """            <li>D’après moi, la caractéristique essentielle la plus surprenante du monde politique des</li>
          </ul>
          <p>sorciers est : <Blanc /></p>
          <p>parce que <Blanc /></p>
          <Ligne n={3} />""", """          </ul>
          <p>D’après moi, la caractéristique essentielle la plus surprenante du monde politique des sorciers est\u00a0: <Blanc /></p>
          <p>parce que <Blanc /></p>
          <Ligne n={3} />""")
    return s


CH[5] = dict(
    fichier='ch05.jsx',
    meta=dict(ID='tome-1-chapitre-5', SLUG='chapitre-5', NUM='5',
              TITRE=j("La situation initiale du récit" + N + ": géographie du monde des sorciers"),
              RESUME=j("Dans ce chapitre le narrateur met en place un grand nombre de règles qui auront cours dans l'ensemble de l'histoire" + N + "! Pour nous en rendre compte nous allons travailler sur les caractéristiques essentielles de Poudlard et du monde des sorciers.")),
    repl=[
        ("""Les réponses figurent au dos de la page quand vous aurez terminé</p>""",
         """Les réponses figurent au dos de la page quand vous aurez terminé</p>
          <Ligne n={11} />"""),
    ],
    post=ch05_post,
)

# ------------------------------------------------------------------ Chapitre 6
CH[6] = dict(
    fichier='ch06.jsx',
    meta=dict(ID='tome-1-chapitre-6', SLUG='chapitre-6', NUM='6',
              TITRE=j("Psychologie des personnages"),
              RESUME=j("Dans ce chapitre on passe à la vitesse supérieure" + N + ": on entre un petit peu plus en détail dans le portrait des personnages principaux (on découvre leur fonctionnement intérieur que l'on appelle psychologie) et on commence à apprendre certaines informations sur les ennemis de Harry" + N + "!")),
    repl=[
        # paragraphe « . » isolé du Word, sans contenu
        ('''les sentiments d’un personnage.</p>
          <p>.</p>''', '''les sentiments d’un personnage.</p>'''),
    ],
)

# ------------------------------------------------------------------ Chapitre 7
FIN_PISTE_DEBUT_EXO = '''          </>
        ),
      },
      {
        type: 'exercice',
        contenu: (
          <>'''


def ch07_post(s):
    s = rep(s, """        type: 'exercice',
        contenu: (
          <>
          <p><strong>d’argumentation</strong> :</p>""", """        type: 'exercice',
        titre: 'd’argumentation',
        contenu: (
          <>""")
    # Phrase supprimée à la demande du cahier des charges (4.5) ; le filet qui suit est un séparateur.
    s = rep(s, """          <p><Fl /> <em>Note : La correction complémentaire vous sera imprimée à la suite de votre travail ! Vous intégrerez à votre dossier</em>.</p>
          <Ligne n={1} />
""", "")
    return s


CH[7] = dict(
    fichier='ch07.jsx',
    meta=dict(ID='tome-1-chapitre-7', SLUG='chapitre-7', NUM='7',
              TITRE=j("Qu’est-ce que Poudlard, au juste" + N + "?"),
              RESUME=j("A la découverte de Poudlard, un lieu si spécial que l'on pourrait presque dire que c'est un personnage de l'histoire" + N + "!")),
    repl=[],
    post=ch07_post,
)

# ------------------------------------------------------------------ Chapitre 8
CH[8] = dict(
    fichier='ch08.jsx',
    meta=dict(ID='tome-1-chapitre-8', SLUG='chapitre-8', NUM='8',
              TITRE=j("Résister au professeur" + N + "!"),
              RESUME=j("Ici, la narration accélère et le danger se précise" + N + "! Harry se trouve face à certains mystères que le lecteur voudra résoudre avec lui... On dit que l'intrigue se noue" + N + "! (= elle fait un nœud).")),
    repl=[],
)

# ------------------------------------------------------------------ Chapitres 9 à 11
CH[9] = dict(
    fichier='ch09.jsx',
    meta=dict(ID='tome-1-chapitre-9', SLUG='chapitre-9', NUM='9',
              TITRE=j("Dans la mécanique du texte"),
              RESUME=j("Cette fois, l'histoire de Harry a bel et bien démarré" + N + "! Nous sommes sortis de la situation initiale et nous commençons à nous confronter avec lui à certains mystères.. Ce sera l'occasion pour nous d'entrer un petit peu dans les détails pour voir quels sont les trucs qu'utilise le narrateur pour nous embarquer avec lui" + N + "!")),
    repl=[],
)
CH[10] = dict(
    fichier='ch10.jsx',
    meta=dict(ID='tome-1-chapitre-10', SLUG='chapitre-10', NUM='10',
              TITRE=j("De l’art du Quidditch et de la chasse au Troll"),
              RESUME=j("Maintenant que l’histoire est lancée, JK Rowling passe à un nouveau stade" + N + ": elle multiplie les allusions et les sous-entendus" + N + "! Nous allons apprendre progressivement à faire ce petit travail de détective qui consiste à trouver des indices dans le texte qui permettent de comprendre ce qui est caché" + N + "! C’est ce qu’on appelle l’implicite du texte.")),
    repl=[],
)
CH[11] = dict(
    fichier='ch11.jsx',
    meta=dict(ID='tome-1-chapitre-11', SLUG='chapitre-11', NUM='11',
              TITRE=j("Du plomb en or"),
              RESUME=j("Nous poursuivons notre petit travail de détective pour observer les indices qui sont cachés dans le texte mais que nous pouvons comprendre" + N + ": je rappelle que cela s’appelle l’implicite du texte" + N + "!")),
    repl=[
        # L'étiquette « Piste rouge » seule précède la citation : le commentaire qui suit est en piste rouge.
        ('''      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Hermione est devenu un''', '''      {
        type: 'piste',
        niveau: 'rouge',
        contenu: (
          <>
          <p>Hermione est devenu un'''),
    ],
)

# ------------------------------------------------------------------ Chapitres 12 et 13
CH[12] = dict(
    fichier='ch12.jsx',
    meta=dict(ID='tome-1-chapitre-12', SLUG='chapitre-12', NUM='12',
              TITRE=j("Le point de vue de Harry"),
              RESUME=j("Dans ce chapitre, nous allons enfin faire la connaissance de Harry, un héros qui jusqu’ici s’est montré très discret" + N + "! Tellement discret que le lecteur lui-même ne le connaît pas…")),
    repl=[
        # guillemet ouvrant en gras dans le repère du Word : gras purement accidentel
        ('''<p><strong>«</strong> L'un des livres''', '''<p>« L'un des livres'''),
    ],
)
CH[13] = dict(
    fichier='ch13.jsx',
    meta=dict(ID='tome-1-chapitre-13', SLUG='chapitre-13', NUM='13',
              TITRE=j("Grandir et faire grandir"),
              RESUME=j("Comme nous l’avons souvent répété, les histoires racontent souvent comment les héros franchissent différents niveaux. Ici, Harry est encore débutant mais nous voyons déjà se dessiner une série de progrès…")),
    repl=[],
)

# ------------------------------------------------------------------ Chapitres 14 à 17
def dialogue_cite(s, premier, dernier, page):
    """Le dialogue (paragraphes de `premier` à `dernier`) en tête d'une piste verte devient une citation."""
    tete = '''      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>''' + premier
    i = re.search(nbsp_pattern(tete), s)
    if not i:
        sys.exit('dialogue_cite : début introuvable %r' % premier)
    k = s.index(dernier, i.end()) + len(dernier)
    k = s.index('</p>', k) + len('</p>')
    bloc = s[i.start():k].replace('''        type: 'piste',
        niveau: "verte",
        contenu: (''', '''        type: 'citation',
        page: %d,
        texte: (''' % page, 1)
    return s[:i.start()] + bloc + '''
          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        contenu: (
          <>''' + s[k:]


CH[14] = dict(
    fichier='ch14.jsx',
    meta=dict(ID='tome-1-chapitre-14', SLUG='chapitre-14', NUM='14',
              TITRE=j("La naissance d'un dragon"),
              RESUME=j("C’est le début de la fin, les premiers mystères de l’histoire commencent à s’éclaircir" + N + "! Comme dans un roman policier, les fils de l’intrigue vont être démêlés un à un…")),
    repl=[],
)
CH[15] = dict(
    fichier='ch15.jsx',
    meta=dict(ID='tome-1-chapitre-15', SLUG='chapitre-15', NUM='15',
              TITRE=j("Dans l'obscurité de la forêt interdite"),
              RESUME=j("Dans ce chapitre nous apprendrons pourquoi est ce qu’il y a tant de mystères dans la vie de Harry.")),
    repl=[],
)
CH[16] = dict(
    fichier='ch16.jsx',
    meta=dict(ID='tome-1-chapitre-16', SLUG='chapitre-16', NUM='16',
              TITRE=j("L'union fait la force"),
              RESUME=j("Dans ce chapitre nous verrons comment Harry, Ron et Hermione vont former une véritable équipe… presque indivisible" + N + "!")),
    repl=[],
    post=lambda s: dialogue_cite(
        dialogue_cite(s, "« Hermione, c'est toi qui devrait t'en charger.", "- C'est évident, dit Ron.", 273),
        "« Si vous préférez ne pas aller plus loin", "- Bien sûr qu'on est avec toi, dit Hermione", 278),
)
CH[17] = dict(
    fichier='ch17.jsx',
    meta=dict(ID='tome-1-chapitre-17', SLUG='chapitre-17', NUM='17',
              TITRE=j("La figure du Mal"),
              RESUME=j("Où l’on voit que la vie récompense celui qui fait ses devoirs.")),
    repl=[
        ('''    page: 291,
    repere: "Page 291",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>- « C'était Quirell ».</p>''', '''    page: 291,
    repere: "Page 291 -\u00a0« C'était Quirell\u00a0».",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>'''),
    ],
)

if __name__ == '__main__':
    todo = [int(a) for a in sys.argv[1:]] or sorted(CH)
    for n in todo:
        c = CH[n]
        post = c.get('post')
        finalise(DRAFTS + 'ch%02d.jsx' % n, DEST + c['fichier'], c['meta'], c['repl'],
                 (lambda x, p=post: definitions(p(x) if p else x)))
        print('ok', n, c['fichier'])
