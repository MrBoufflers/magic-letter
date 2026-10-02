import { Cle, Fl, Ligne, FichePersonnage, Etoiles } from '../../../components/contenu';

export default {
  id: 'tome-1-incipit',
  slug: 'incipit',
  numero: 0,
  titre: "Incipit : la porte d'entrée du texte",
  motsCles: ["incipit", "hiérarchie", "portrait", "indice spatio-temporel", "caractéristiques", "psychologie du personnage", "procédé littéraire", "péripéties"],
  resume: "Travail à réaliser à la fin de la lecture de la première page du récit. A retenir en priorité : les notions de champ lexical et de hiérarchie des informations !",
  arrets: [
  {
    page: 7,
    repere: "Page 7 - Incipit",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Un <strong>incipit</strong> est <Cle>la porte d'entrée du texte</Cle>, ce sont les premières lignes ou les premiers paragraphes d'une histoire, mais cela est aussi valable pour bien d’autres types de texte. Parler de l'incipit d'un texte, <Cle>c'est commenter la première impression que l'on peut avoir quand on entre dedans</Cle>. Un peu comme quand on prend la température de l’eau avant de plonger ! Voyons donc comment commence la série de livres <em>Harry Potter</em>.</p>
          <p><Cle>L’incipit de</Cle> <em><Cle>Harry Potter à l’école des sorciers</Cle></em> <Cle>:</Cle></p>
          </>
        ),
      },
      {
        type: 'citation',
        page: 7,
        texte: (
          <>
          <p>« Monsieur et Mrs Dursley qui habitaient au 4, Privet Drive, avaient toujours affirmé avec la plus grande fierté qu'ils étaient parfaitement normaux, merci pour eux. <strong>Jamais quiconque n’aurait imaginé</strong> qu'ils puissent se trouver impliqués dans quoi que ce soit <strong>d'étrange ou de mystérieux</strong>. Ils n'avaient pas de temps à perdre avec des sornettes. »</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>On peut remarquer d’entrée que J.K. Rowling est une auteure très précise, elle construit ses phrases avec beaucoup de soin ! Voyons deux petits exemples…</p>
          <p><em><Fl /> Jamais quiconque n’aurait imaginé</em>… <Fl /> Cette tournure de phrase montre que les Dursley sont très soucieux du <em>qu’en-dira-t-on</em>, c'est-à-dire des histoires que se racontent les voisins sur leur compte. Ils tiennent à leur réputation qu'ils veulent PARFAITE. Les Dursley sont des gens orgueilleux.</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>Cette formulation est reprise dans le dernier paragraphe du chapitre où l’on trouve « Jamais on aurait imaginé que des événements extraordinaires puissent se dérouler dans un tel endroit ». C’est peut-être un hasard, mais peut-être aussi que cette <strong>construction parallèle</strong> est volontaire pour donner un style un petit peu particulier au texte !</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong><em><Fl /></em></strong><em>….d’étrange et le mystérieux</em> <Fl /> ces deux mots sont associés au monde de la sorcellerie, même si le lecteur ne le sait pas encore ! L'incipit de ce livre pose d’emblée la problématique de départ : <Cle>les parents Dursley détestent tout ce qui attire Harry, et même tout ce qu’il est</Cle>, on peut donc s’attendre à ce qu’ils lui créent des problèmes ! Comme nous le verrons plus tard, les parents Dursley sont des <strong>opposants</strong>.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 7,
    repere: "Page 7 (encore)",
    blocs: [
      {
        type: 'exercice',
        contenu: (
          <>
          <p>le <strong>Champ lexical</strong> de la sorcellerie : <Cle>Ce sont tous les mots qui ont quelque chose à voir avec la sorcellerie !</Cle></p>
          <p><em>Baguette-sort- lune - balai - formule - sort - potion - étrange - mystérieux</em>…sont dans le champ lexical de la sorcellerie, et certains sont dans le texte !</p>
          <p>Je trouve quatre autres mots du champ lexical de la sorcellerie (en général, pas forcément dans le texte) :</p>
          <Ligne n={3} />
          </>
        ),
      },
    ],
  },
  {
    page: 7,
    repere: "Page 7 (toujours) : Portrait de Mr. Dursley",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>En littérature, un des ingrédients (qu’on appelle <strong><Cle>procédés littéraires</Cle></strong>) d’une bonne histoire est <strong>le portrait.</strong> <Cle>Voyons pour commencer comment JK Rowling dessine ses premiers personnages.</Cle></p>
          <p>Mais exceptionnellement, avant de plonger dans le texte nous allons fixer les règles du jeu. Pour savoir de quoi on parle, il faut d’abord que l’on aborde ces fameuses <em>informations cinq étoiles.</em></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        titre: 'La hiérarchie des informations :',
        contenu: (
          <>
          <p>Depuis de longues années, un des premiers mots de vocabulaire que mes élèves étudient en cours est celui de <strong>hiérarchie</strong>. C'est un <em><Cle>classement par ordre d'importance</Cle></em>, comme dans l'armée, dans laquelle le général est supérieur au colonel qui est le supérieur du capitaine qui supervise le lieutenant et cetera…</p>
          <p><Cle>Dans tous les textes que vous lisez il faut hiérarchiser les informations</Cle>, c'est-à-dire <Cle>déterminer quelles sont les informations auxquelles attribueriez la note de 5 étoiles</Cle> (ex.Harry est orphelin), quelles sont les informations qu'on pourrait évaluer 4 étoiles et ainsi de suite jusqu'aux toute petites petites petites informations sans importance qui n'auraient droit qu'à une étoile (ex. Mrs Dursley est blonde… ce qui ne change vraiment pas grand chose à l'histoire).</p>
          <p><strong><Cle>Dans ce dossier comme ailleurs on va s'appliquer à traiter en priorité les informations “5 étoiles”</Cle> et éventuellement l'une ou l'autre de quatre étoiles s'il reste de la place !</strong></p>
          <p>Attention, voici une information cinq étoiles de ce dossier :</p>
          </>
        ),
      },
      /* encadré */
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <Etoiles n={5} />
          <p><strong><Fl /></strong> Souvent les élèves, en cours de français, oublient cette règle fondamentale et ne comprennent pas pourquoi leur réponse ne leur rapporte pas beaucoup de points ! (c’est ce qu’ils disent). DANS VOS RÉPONSES, <strong>NE PARLEZ QUE DES INFORMATIONS CINQ ÉTOILES, LES AUTRES NE NOUS INTÉRESSENT PAS.</strong></p>
          </>
        ),
      },
      /* encadré */
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <Etoiles n={5} />
          <p><Cle>Voici une autre information cinq étoile de ce dossier :</Cle></p>
          <p><strong>VOICI <Cle>LES INFORMATIONS DONT IL FAUT PARLER EN LITTÉRATURE ET EN ÉVALUATION DE FRANÇAIS :</Cle></strong></p>
          <p><strong><Cle>En littérature, certaines informations vont</Cle> <em><Cle>presque toujours</Cle></em> <Cle>avoir la valeur de 5 étoiles…</Cle></strong></p>
          <p><strong><Cle>Quand je prends des notes de lecture j’essaye d’être particulièrement attentif aux points suivants :</Cle></strong></p>
          <p>1/ Ce qui parle d'un changement de <strong>lieu</strong> ou d'un changement de <strong>temps</strong> dans l'histoire (ces informations sont tellement importantes qu'elles ont un nom spécial : ce sont <strong>les indices spatio-temporels</strong>).</p>
          <p>2/ La rencontre de <strong>personnages</strong> importants qui vont aider le héros (les adjuvants) ou de ceux qui vont empêcher le héros (les opposants) de faire ce qu’il a à faire.</p>
          <p>3/ Ce qui parle du <strong>destin</strong> d'un personnage important, c'est-à-dire les événements qui bouleversent sa vie.</p>
          <p>4/ Tout ce qui concerne les <strong>objets</strong> les plus importants, qui vont eux aussi avoir un rôle dans la suite de l'histoire : par exemple on se doute bien que si Harry Potter casse sa baguette magique il va être en grande difficulté ! Ce qui a un rapport avec la baguette magique d'Harry Potter doit probablement être considéré comme une information 5 étoiles (enfin, seulement si cela change la direction de l'histoire ! Ne notez pas qu'il la pose sur sa table de nuit quand il va prendre sa douche).</p>
          <p>5/ Les principaux <strong>événements</strong> de l'histoire qui vont avoir une influence sur la quête du héros. (la <strong>quête du héros</strong> correspond à l'objectif qu'il doit attendre <Cle>pour retrouver en état de bonheur stable</Cle>). Dans le <strong>schéma narratif</strong> ces événements sont appelés <strong>péripéties</strong>.</p>
          <p>6/ Tout ce qui est <strong>surprenant pour le lecteur</strong> : retournement de situation, trahison d'un personnage, événement imprévisible, coup de pouce du destin ou punition divine… les auteurs écrivent des textes <Cle>mais fabriquent aussi des</Cle> <strong><Cle>expériences de lecture</Cle></strong><Cle>, il faut y penser !</Cle></p>
          <p>7/ Tout ce qui marque la transformation d'un personnage et notamment ce qui lui fait franchir un <strong>niveau (</strong>nous reviendrons sur ce point importantissime).</p>
          </>
        ),
      },
    ],
  },
  {
    page: 7,
    repere: "Page 7, disions-nous  - Le portrait de M. Dursley",
    blocs: [
      {
        type: 'exercice',
        contenu: (
          <>
          <p>Je lis le chapitre n°1 et je complète le tableau avec des informations « 5 étoiles ».</p>
          <FichePersonnage
            personnage={<>Personnage{'\u00a0'}: M. Dursley</>}
            colonnes={['Caractéristiques physiques', 'Caractéristiques morales et psychologiques (= caractère)', 'Habitudes']}
            exemples={[
              ['Grand et massif', 'Pas très courageux car…', 'Va tous les jours au travail en voiture'],
              ['…', '…', ''],
            ]}
            lignesVides={5}
          />
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><Cle>Conseil lecture</Cle> : Soyez attentifs aux portraits des autres personnages dans la suite du texte !</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>la <strong>psychologie d'un personnage</strong> est <Cle>l'ensemble des éléments qui expliquent le comportement d'un personnage dans l'histoire</Cle>. Souvent, les accidents de la vie laissent des traces et peuvent changer les sentiments d’une personne ! Harry, par exemple, n’a jamais connu ses parents et se sent donc toujours un peu seul… Il va lui falloir du temps pour retrouver confiance en lui ! Je vous invite à être attentif au développement de cet aspect dans l’histoire, mais nous en reparlerons surtout dans Harry Potter et le Prisonnier d’Azkaban.</p>
          </>
        ),
      },
    ],
  },
],
};
