import { Cle, Fl, Ligne, Definition } from '../../../components/contenu';

export default {
  id: 'tome-1-chapitre-1',
  slug: 'chapitre-1',
  numero: 1,
  titre: "Les caractéristiques essentielles de Mister Dursley, Mrs Dursley et de Dudley",
  motsCles: ["portrait", "caractéristiques", "merveilleux", "dialogue"],
  resume: "Ce document concerne le premier chapitre. Retenez bien qu'en général les portraits sont composés avec trois types d'information, les caractéristiques morales et les habitudes ! (piste rouge : on trouve aussi souvent des explications sur la place des personnages dans l'histoire).",
  arrets: [
  {
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><em>Ne vous inquiétez pas, dans ce chapitre il y a beaucoup de choses à dire, mais c’est parce qu’il nous faut installer un certain nombre de connaissances de base ! Les autres iront (un peu) plus vite et les commentaires seront moins nombreux dans les autres volumes.</em></p>
          <p><em>Comme vous l’aurez remarqué, ce premier chapitre permet à l’auteur de nous présenter les personnages du livre. Le</em> <strong><em>portrait</em></strong> <em>est un thème très important en littérature ! Nous allons donc regarder un petit peu comment est-ce qu’elle s’y prend.</em></p>
          <p><em>La première chose à remarquer, c’est qu’après avoir fait le portrait des moldus de l’histoire, J.K. Rowling <Cle>glisse progressivement vers le portrait des sorciers</Cle>. Ceux-ci sont en réalité bien plus étonnants, et l’histoire devient donc de plus en plus intrigante ! Mais cela permet aussi de faire des</em> <strong><em>comparaisons</em></strong> <em>(c'est-à-dire de faire des parallèles) entre ces deux types de personnages très différents… Voyons comment l’auteur fabrique ses portraits de personnage !</em></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <Definition terme="caractéristique">
            <p>signe qui permet de reconnaître un individu d’un autre.</p>
            <p>Ex : Choisis des fraises <Cle>bien mûres</Cle> pour préparer ton gâteau !</p>
            <p className="annotation">caractéristiques</p>
          </Definition>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong><Fl /></strong> Nous allons commencer par corriger ensemble le tableau des caractéristiques de <strong>M. Dursley</strong>. Vous allez corriger votre tableau au stylo vert si vous avez oublié quelque chose d’important !</p>
          <p>Pour ceux qui veulent aller plus loin,, je vous note ci-dessous en pistes rouge et noire quelques remarques à propos des caractéristiques cachées que vous n’aurez peut-être pas vues ! ( et que je n'aurai peut-être pas le temps d'expliquer en classe).<br /></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>Mr. Dursley est un lâche et il n'a aucune autorité sur son fils : il trouve que son enfant est un « sacré petit bonhomme » alors que celui-ci est en train de lancer sa purée sur les murs du salon ! On sent que dans cette action quelque chose ne va pas : Monsieur Dursley ne devrait pas laisser son fils faire ce genre de bêtises…</p>
          <p>Peut-être Mr Dursley est simplement idiot mais on peut peut-être aussi penser qu'il a tellement peur des colères de son fils <Cle>qu'il fait semblant de ne pas voir de problème</Cle> pour pouvoir s'enfuir…</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>peut-être aussi que Mister Dursley ne veut pas toucher à l'enfant chéri de sa femme, le petit chouchou-pourri-gâté de sa Maman (qui est encore plus horrible et dangereuse que Dudley, en tout cas c'est probablement le point de vue de Mr Dursley) et qu'il préfère sagement <em>battre en retraite</em>.</p>
          <p><em>Note : le texte dit « c'était à leurs yeux le plus bel enfant du monde » fin du 2e paragraphe page 7 mais il est tout à fait possible que Mr Dursley répète les propos de sa femme pour être d'accord avec elle.</em></p>
          </>
        ),
      },
    ],
  },
  {
    page: 15,
    repere: "p.15 - Mrs Dursley",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Nous trouvons dans un second temps le portrait de Mrs Dursley, je note ci-dessous les caractéristiques essentielles de son personnage qu’il ne fallait pas rater ! Les avez-vous toutes vues ?</p>
          <p><strong>1) Portrait physique</strong></p>
          <ul className="chevrons">
            <li>Mince et blonde.</li>
            <li>Possède un cou deux fois plus long que la moyenne (ce qui est très utile pour espionner les voisins).</li>
          </ul>
          <p><strong>2) Caractère</strong> :</p>
          <ul className="chevrons">
            <li>superficiel. Mrs Dursley se préoccupe de choses qui n'ont pas beaucoup d'importance (ce que diront les voisins) mais ne s'occupe pas de l'essentiel ( garder de bonnes relations avec sa sœur, son beau-frère et son neveu, être une bonne personne, avoir de l’esprit)</li>
            <li>S'appelle Pétunia, un nom de fleur qui donne en effet assez ridicule et prétentieux à celui qui le porte.</li>
            <li>A « des petits yeux de fouine » page 15 : cette caractéristique est particulièrement négative, pour ne pas dire dégradante ! (<Fl /> Piste noire<Fl /> : on parle de « <strong>connotation négative</strong> » quand on suggère quelque chose de mauvais à propos d’un objet ou d’un personnage).</li>
          </ul>
          <p><strong>3) Habitudes</strong> : aime espionner les voisins (ce qui en dit long sur son personnage ! Apparemment, elle n'a rien d'autre à faire et le narrateur ne trouve rien d'autre à dire sur elle…).</p>
          </>
        ),
      },
      /* encadré */
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><Cle>Je retiens</Cle> : Comme nous le voyons ici avec Mrs. Dursley, une recette classique et efficace pour composer un portrait est de préciser l’aspect physique, le caractère et les habitudes d’un personnage !</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>on pourrait penser ici que Mrs Dursley n'aime pas seulement espionner les voisins mais aussi raconter à qui veut l'entendre des ragots et des commérages en persiflant comme une vipère… c'est d'ailleurs ce qu'elle fait avec son mari en installant le petit Dudley sur sa chaise…</p>
          </>
        ),
      },
    ],
  },
  {
    page: 15,
    repere: "p.15 Albus Dumbledore",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <ul className="chevrons">
            <li><strong>Portrait physique</strong> : grand, mince et très vieux, cheveux argentés et barbe qui lui descendaient jusqu'à la taille</li>
            <li>Longue robe, cape violette et bottes à haut talon munis de boucles.</li>
            <li>Des yeux bleus et brillants derrière des lunettes en demi-lune</li>
            <li>Un long nez crochu</li>
            <li><strong>Caractère :</strong></li>
            <li>Est plein de sagesse : il garde le sourire tandis qu'on le bouscule.</li>
            <li>Aime les Esquimaux au citron… ce qui veut dire que Dumbledore est <Cle>attentif au sens de la vie</Cle> et qu’il tient à ce que dans le travail on s’autorise des petits plaisirs !, Il est, de loin, le moins rigide des professeurs de Poudlard.</li>
            <li>Peut néanmoins se montrer assez farfelu comme à la page 22 où il dit que les cicatrices peuvent être utiles et que lui-même en a une en forme de plan de métro au-dessus du genou.</li>
          </ul>
          </>
        ),
      },
    ],
  },
  {
    page: 20,
    repere: "p.20 Dudley",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>enfant colérique, mal éduqué et qui fait beaucoup de bruit.</p>
          <p>Donne des coups de pied à sa mère pour obtenir des bonbons (page 20)</p>
          </>
        ),
      },
    ],
  },
  {
    page: 21,
    repere: 'Hagrid : p.21 en bas',
    blocs: [
      {
        type: 'citation',
        page: 21,
        texte: (
          <>
          <p>« il était à peu près deux fois plus grand que la moyenne et au moins cinq fois plus large : il était même tellement grand qu'on avait peine à le croire. On aurait dit un sauvage, avec ses longs cheveux noirs en broussailles, sa barbe qui cache presque entièrement son visage, ses mains de la taille d'un couvercle de poubelle et ses pieds chaussés de bottes en cuir, qui avaient l'air de bébés dauphin. »</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: 'verte',
        contenu: (
          <>
          <p>À la fin de la page 22, on constate que Hagrid est très sensible et émotif, puisqu'il semble souffrir de la mort de James et Lili, ainsi que du départ de Harry du monde des sorciers… au milieu de la page 23 on apprend même que ses yeux sont “ruisselants de larmes”.</p>
          <p>On comprend également qu'il était assez proche, comme Dumbledore et McGonagall, des parents de Harry.</p>
          </>
        ),
      },
      /* encadré */
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong>&gt;&gt; Conclusion à propos des portraits :</strong></p>
          <p><strong>1) On remarque que le portrait d'Albus Dumbledore est bien plus précis que celui des époux Dursley ! C’est bien-sûr parce que c’est un personnage beaucoup plus important dans le livre. N’hésitez pas à garder cette logique dans vos propres rédactions.</strong></p>
          <p><strong>2) A l’évidence l’auteur a écrit ce chapitre avec l’idée de bien présenter ses personnages, j’espère que vous vous en êtes rendu compte !</strong></p>
          </>
        ),
      },
    ],
  },
  {
    page: 17,
    repere: "Page 17",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Une dernière chose dans ce chapitre pour introduire l’histoire : après avoir présenté les personnages, le narrateur <Cle>veut faire comprendre d’autres éléments de la</Cle> <strong><Cle>situation initiale</Cle></strong> <Cle>!</Cle> <Cle>C'est-à-dire qu’il va faire raconter par certains personnages ce que le lecteur a besoin de savoir pour pouvoir suivre l’histoire</Cle>. Au théâtre, cela s’appelle une <strong>scène d’exposition</strong>, mais l’on peut utiliser ce terme dans un roman aussi…</p>
          <p>Par exemple, il est évident que le <strong>dialogue</strong> qui prend place entre Dumbledore et McGonagall a clairement pour fonction d'informer <Cle>le lecteur sur un certain nombre de faits qui vont être importants dans l'histoire</Cle>. Ainsi, nous apprenons que :</p>
          <ul>
            <li>Voici onze ans que les sorciers n'ont rien eu à fêter.</li>
            <li>Les sorciers doivent s'habiller comme des Moldus quand ils veulent se promener dans le monde « normal ».</li>
            <li>« Vous-savez-qui » semble avoir disparu.</li>
            <li>Voldemort fait tellement peur à McGonagall qu'elle n'ose même pas prononcer son nom et ne l'entend pas sans grimacer… mais ce même personnage de Voldemort n'a pourtant pas réussi à éliminer Harry :« il n'a pas réussi à supprimer ce bambin » page 19. Ceci est très intrigant ! On comprend tout de suite que Harry est un être extraordinaire dont on a envie de connaître l’histoire.</li>
            <li>Dumbledore est, d'après McGonagall, le seul à avoir jamais fait peur à Voldemort.</li>
            <li>Dumbledore de son côté affirme que Voldemort dispose de pouvoir que lui-même n'a jamais eus. (lesquels ? Encore un mystère).</li>
            <li>Voldemort a déjà tué beaucoup de personnes et la survie de <Cle>Harry est d’autant plus inexplicable !</Cle></li>
            <li>McGonagall croit énormément en Harry :« il va devenir célèbre, une véritable légende vivante, je ne serai pas étonnée que la date d'aujourd'hui devienne dans l'avenir la fête de Harry Potter. On écrira des livres sur lui. Tous les enfants de notre monde connaîtront son nom ! ».</li>
            <li>Hagrid est parfois négligent.</li>
            <li>Harry a sur le front une cicatrice en forme d'éclair page 22.</li>
          </ul>
          <p>Cela nous amènera à conclure que <Cle>ce</Cle> <strong><Cle>dialogue</Cle></strong> <Cle>est particulièrement important</Cle> : il met <Cle>en place des règles qui auront cours durant toute la saga,</Cle> puisqu'il parle de la situation des dix dernières années du personnage de et de sa disparition, du destin de Harry… <Cle>dans ce dialogue l'auteur est en train de montrer où sont les grands piliers de l'histoire !</Cle></p>
          </>
        ),
      },
      /* encadré */
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Vocabulaire : saga : Histoire d'une même famille à travers plusieurs générations et qui présente un aspect plus ou moins légendaire.</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>Techniquement on dirait que JK Rowling travaille dans ce passage sur la <strong>macrostructure</strong> du récit (= sur les grands piliers de l’histoire), ce n'est pas au programme mais c'est un mot qui peut vous servir à réfléchir lors de vos prochaines lectures !</p>
          </>
        ),
      },
    ],
  },
  {
    page: 24,
    repere: "p24",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Avez vous remarqué ce passage très <em>cinématographique</em> (cela veut dire que le texte est écrit comme s’il fallait ensuite le filmer et le monter au cinéma) de la fin du chapitre 1 ?</p>
          <p>C’est à mon avis l’un des plus beaux passages de l’ensemble de la série, c'est-à-dire que <Cle>dans ces quelques lignes circulent beaucoup de très belles idées...</Cle></p>
          </>
        ),
      },
      {
        type: 'citation',
        page: 24,
        texte: (
          <>
          <p>« Une brise agitait les haies bien taillées de Privet Drive. La rue était propre et silencieuse sous le ciel d’encre. Jamais on aurait imaginé que des événements extraordinaires puissent se dérouler dans un tel endroit. Harry Potter se retourna sous les couvertures sans se réveiller. Sa petite main se referma sur la lettre posée à côté de lui et il continua de dormir sans savoir qu’il était déjà célèbre, sans savoir non plus que dans quelques heures il serait réveillé par le cri de Mrs. Dursley qui ouvrirait la porte pour sortir les bouteilles de lait et que, pendant des semaines, il serait piqué et pincé par son cousin Dudley… Il ne savait pas davantage qu’en ce moment même, des gens s’étaient rassemblés en secret dans tout le pays et qu’ils levaient leur verre en murmurant “A la santé de Harry Potter ! Le survivant ! »</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <ul className="chevrons">
            <li>D’une part, on dirait que la caméra glisse, depuis l’extérieur, dans la chambre de Harry (par la fenêtre), qu’elle le filme en train de dormir et qu’ensuite elle descend lentement vers sa main (en faisant un <strong>zoom</strong>), puis qu’elle vole à travers le pays en filmant de très haut des célébrations joyeuses de personnes contentes de la défaite de Voldemort.</li>
            <li>D’autre part on sent que déjà, alors qu’il est encore tout bébé, <Cle>Harry inspire aux gens l’espoir, la joie et la solidarité</Cle> ! L’histoire de Harry Potter est donc à lire en gardant ceci à l’esprit, on pourrait dire que dès le premier chapitre l’auteur définit pour le lecteur quelques grandes directions de son histoire… Ce qui à quelque chose à voir avec l’extraordinaire destin de ce personnage !</li>
          </ul>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>relisez le passage ci-dessus en étant attentif à ces “mouvements de caméra” cachés dans le texte.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 24,
    repere: "P24.  CONCLUSION",
    blocs: [
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>On voit clairement dans ce chapitre que JK Rowling a voulu installer une atmosphère teintée de magie : elle nous installe dès les premières lignes de son histoire dans le <strong>registre littéraire du merveilleux</strong> : c'est le genre de livres <Cle>dans lesquels le lecteur admet comme logique et normal l'apparition de phénomènes qui sont pourtant tout à fait étranges ou impossibles</Cle>. L’auteur est habile : elle nous entraîne progressivement <Cle>en faisant arriver dans le texte une série d'événements qui titillent notre curiosité et nous donnent envie d'en savoir plus</Cle> :</p>
          <ul>
            <li>D’abord les doutes de Mr Dursley ( le chat qui lit une carte routière, les plaques d'immatriculation….) Mais à ce moment-là du récit, on peut encore penser que Mister Dursley est malade ou qu'il a des visions !</li>
            <li>Ensuite un bonhomme <em>avec une cape violette</em> le percute au passage de la porte.</li>
            <li>Ensuite encore nous voyons Dumbledore qui éteint les réverbères en agitant un étrange briquet bas de la page 15.</li>
            <li>Pour finir Dumbledore parle au chat qui se transforme en professeur McGonagall ( ici, il n'y a vraiment plus de doute, une métamorphose dans ce genre relève vraiment de la magie et donc du registre littéraire du merveilleux !)</li>
          </ul>
          <p>=&gt; Aviez-vous remarqué que ces événènements étaient <Cle>de plus en plus</Cle> mystérieux ???</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>cette apparition progressive de la magie dans le texte, de façon toujours plus évidente, s'appelle une <strong>gradation</strong>. C'est un procédé <Cle>en escalier qui montre un aspect intéressant par degrés successifs</Cle> : ici, au début, le lecteur découvre un chat a un comportement suspect, ensuite on voit des personnages bizarrement habillés qui circulent dans la rue (c'est encore plus bizarre) , ensuite Dumbledore éteint les lumières en actionnant un briquet magique (ciel ! mais c’est diablement bizarre !), et tout d'un coup le chat se transforme en une personne humaine..... <Cle>chaque étape est plus magique que la précédente</Cle>, comme un dégradé mais dans « l'autre sens » c'est pourquoi on parle de <strong>gradation</strong> : on pourra donc dire qu'<Cle>il y a une gradation qui marque l'apparition de la magie dans ce premier chapitre !</Cle></p>
          </>
        ),
      },
      {
        type: 'exercice',
        contenu: (
          <>
          <p>Mots de vocabulaire (chercher leur définition sur Larousse.fr) : extravagant, impudence, courroucé, olibrius, pétarade.</p>
          <p>Note : Je peux recopier quelques définitions dans mon carnet de lecture pour enrichir mon travail sur ce livre !</p>
          <Ligne n={5} />
          </>
        ),
      },
    ],
  },
],
};
