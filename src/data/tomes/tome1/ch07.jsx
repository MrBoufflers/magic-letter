import { Cle, Fl, Blanc, Ligne } from '../../../components/contenu';

export default {
  id: 'tome-1-chapitre-7',
  slug: 'chapitre-7',
  numero: 7,
  titre: "Qu’est-ce que Poudlard, au juste ?",
  motsCles: ["point de vue", "méthode", "construire une réponse en français", "argument", "caractéristique", "portrait psychologique"],
  resume: "A la découverte de Poudlard, un lieu si spécial que l'on pourrait presque dire que c'est un personnage de l'histoire !",
  arrets: [
  {
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><Cle>A propos (pour commencer) :</Cle></p>
          <p>Extrait de l’interview de Jean-François Ménard, traducteur de <em>Harry Potter :</em></p>
          <p><strong><Cle>Poudlard ("Hogwarts” en anglais)</Cle></strong> : A l'origine, c<em>'est une inversion de 'warthog', qui veut dire 'le phacochère', littéralement 'le cochon avec des verrues'. Hogwarts jouait sur ce mot. J'ai essayé d'approcher de quelque chose de pas très ragoûtant pour évoquer les verrues. Je suis arrivé à 'pou' et le cochon s'est transformé en 'lard'.</em>"</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong><em><Fl /></em></strong> <em>Ce chapitre s’appelle « Le chapeau magique » mais, comme nous allons le voir, ce n’est pas vraiment le chapeau qui va réserver des surprises dans cette partie du texte !</em></p>
          <p><em>Le narrateur a plutôt l’intention de nous raconter la <Cle>première exploration de Poudlard</Cle> par les élèves, <Cle>c'est-à-dire qu’il installe un certain nombre de règles qui concernent les lieux principaux de cette histoire</Cle>. C’est tellement important dans les histoires que l’on a un nom pour tous les renseignements qui parlent du lieu ou du déroulement du temps : cela s’appelle les</em> <strong><em>indices spatio-temporels</em></strong><em>.</em></p>
          <p><em>Dans ce chapitre nous allons voir <Cle>comment J.K. Rowling met en place le décor de son histoire et comment elle nous fait découvrir Poudlard</Cle>, un lieu qui réserve bien des surprises aux nouveaux élèves… et au lecteur moldu ! Relevons donc les points les plus importants qui font l’identité unique de ce château.</em></p>
          </>
        ),
      },
    ],
  },
  {
    page: 121,
    repere: "P121",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Poudlard est si grand que la maison des Dursley pourrait tenir dans son hall et si haute qu'on n'en voit pas le plafond. Le narrateur ne le dit pas, mais c'est ici le <strong>point de vue</strong> de Harry qui est utilisé pour décrire le château de Poudlard, c'est évident car personne à part lui ne connaît la maison des Dursley !</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>Vous apprendrez bientôt qu'en littérature on peut utiliser trois types de point de vue, et nous en avons ici un bon exemple…. Le point de vue est en quelque sorte <Cle>l'endroit où le narrateur décide de mettre la caméra quand il raconte son histoire..</Cle></p>
          <p>Ici les personnages arrivent devant Poudlard, et le lecteur n'aurait pas la même impression de vertige si on lui avait simplement dit que le hall d'entrée faisait au moins 20 m de long sur 20 m de large… Dire que « la maison des Dursley aurait pu y tenir tout entière » est bien plus efficace ! Le narrateur (celui qui raconte l'histoire) choisit donc de mettre la caméra sur la tête de Harry ( un petit peu comme une GoPro) pour que <Cle>le lecteur ait aussi l'impression d'être tout petit devant l'immense château de Poudlard.</Cle></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>le <strong>point de vue subjectif</strong> consiste à épouser, pour une raison ou pour une autre, <Cle>le point de vue d'un personnage</Cle>. Cela implique également que pour cette même scène l'<Cle>on en choisira pas d'autre</Cle> ! Il serait par exemple étonnant de raconter le même épisode en prenant le point de vue de Hagrid qui voit autour de lui des élèves apeurés et silencieux comme un troupeau de moutons perdus !</p>
          </>
        ),
      },
      {
        type: 'exercice',
        titre: 'd’argumentation',
        contenu: (
          <>
          <p>D'ailleurs, à ton avis, que pense Drago Malefoy dans la même situation ? Écris ta réponse en suivant la structure proposée ci-après :</p>
          <p><em>Note : attention, il n'y a pas de bonne réponse à cette question ! L'auteure ne donne aucune indication précise dans ce passage car elle ne parle pas de ce personnage à ce moment-là ! On peut donc répondre ce que l'on souhaite tant que cela respecte <Cle>la logique du texte</Cle>. On ne pourra pas dire par exemple que Malfoy pense au dernier épisode de One Piece ou de Superman qui n'existent pas dans le monde des sorciers !</em></p>
          <p>À mon avis, en arrivant à Poudlard, Drago Malefoy pense que (mon <em>idée de réponse</em> n°1)</p>
          <Ligne n={2} />
          <p>Il pense probablement cela <Cle>car</Cle></p>
          <p>(<strong>argument</strong> n°1) <Blanc />.</p>
          <p>Peut-être pense-t-il aussi que ( idée de réponse numéro 2) <Blanc /></p>
          <Ligne n={1} />
          <p>Nous pouvons avoir cette impression <Cle>car</Cle> ( argument numéro 2)</p>
          <Ligne n={2} />
          </>
        ),
      },
    ],
  },
  {
    page: 121,
    repere: "P.121",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>A propos de Poudlard : beaucoup d’informations ici !</p>
          <ul className="chevrons">
            <li>Poudlard est éclairé par des torches</li>
            <li>Nous découvrons La question des “maisons” à Poudlard : chaque maison à sa propre histoire, sa « propre noblesse ».</li>
            <li>Les bons résultats des élèves rapportent des points à leur maison et à l’heure des comptes l'une des maisons gagne la Coupe des Quatre Maisons.</li>
            <li>Les élèves vont participer à la « Cérémonie de la Répartition », une tradition qui se répète chaque année.</li>
          </ul>
          </>
        ),
      },
    ],
  },
  {
    page: 123,
    repere: "Page 123",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>La pire journée de la vie de Harry était celle où il a dû ramener un carnet de correspondance dans lequel était écrit qu'on le soupçonnait d'avoir envoûté la perruque de l'un de ses professeurs. Ceci ne parle pas de Poudlard… mais de l’importance que peuvent avoir les professeurs dans la vie d’un élève… c’est donc un petit peu la même chose !</p>
          </>
        ),
      },
    ],
  },
  {
    page: 123,
    repere: "Page 123",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>une vingtaine de fantômes hantent Poudlard et Peeves, l'un d'entre eux, (mais il n'est pas vraiment un fantôme), semble faire plus de bêtises que les autres.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 124,
    repere: "Page 124",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p><strong>description</strong> de la Grande Salle.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 124,
    repere: "Page 124",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Hermione a lu une histoire de Poudlard. Elle sait donc où elle met les pieds, cela pourra probablement être utile par la suite !</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "rouge",
        contenu: (
          <>
          <p>p124 :</p>
          <p>Le plafond de la Grande Salle (qui est centrale dans la vie d'un élève à Poudlard) représente le ciel étoilé, c'est une belle idée qui signifie que de venir comme élève à Poudlard c'est plus ou moins <Cle>avoir accès à un lieu rempli d'étoiles</Cle> ! (c’est aussi l’idée que vous devriez avoir de votre collège ).</p>
          <p>On dira ici que le ciel ici est un <strong>symbole,</strong> c'est-à-dire <Cle>qu'il sert de code pour une autre idée</Cle>. C'est la même chose que quand on fait voler quelque part une série de colombes quelque part pour montrer que la paix habite dans ce lieu.</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>Il existe à vrai dire deux catégories de symboles, ceux qui sont <Cle>universels</Cle> ( qui sont compris par un grand nombre de personnes parce qu'ils font partie de la culture d'un peuple) et les symboles <Cle>qui sont construits par l'auteur</Cle> dans l'œuvre qu'ils élaborent et ainsi on pourra dire que la cicatrice en forme d'éclair symbolise le personnage (et le destin) de Harry Potter.</p>
          <p>Soyez attentifs, souvent les auteurs développent leurs histoires en mettant des symboles en jeu ! La banque de Gringotts, par exemple, <Cle>symbolise l'histoire, la sécurité et la tradition dans le monde des sorciers</Cle>… Quand cette banque sera mise en difficulté c'est tout le monde des sorciers qui sera en péril ! <Cle>Le jeu avec les symboles, s'il est correctement exploité, est toujours d'une efficacité redoutable</Cle>. Rien ne vous empêche d'essayer d'utiliser un symbole dans vos rédactions !</p>
          </>
        ),
      },
    ],
  },
  {
    page: 125,
    repere: "Page 125",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>c'est le Choixpeau lui-même qui va donner la règle de répartition des différentes maisons de Poudlard, les Gryffondor sont les courageux, les hardis et les plus forts, Poufsouffle et la Maison de la Justice et de la loyauté, de la patience et du travail, Serdaigle et la maison des érudits et de la connaissance et Serpentard celle de la roublardise.</p>
          <p>On pourra remarquer que cette distribution correspond à peu près à certaines catégories de la <strong>société</strong> : les Poufsouffles sont les artisans qui travaillent minutieusement et avec patience, les Serpentards sont les commerçants qui savent toujours tirer parti des choses (et souvent pour eux-mêmes), les Serdaigle sont les intellectuels qui sont pleins de sagesse et les Gryffondor représente les hommes d'action qui sont capables de prendre des risques quand la situation l'exige.</p>
          </>
        ),
      },
      {
        type: 'exercice',
        contenu: (
          <>
          <p>À votre avis, dans quelle maison de Poudlard le Choixpeau vous placerait-il si vous aussi vous receviez une lettre l'année prochaine pour commencer vos études de magie ? Remplissez les espaces en suivant les indications données.</p>
          <p>Je pense que le chapeau me placerait dans la maison<Blanc /> <Cle>car</Cle> (je parle ici d'une de mes <strong>caractéristiques</strong>).</p>
          <Ligne n={1} />
          <p>Cette caractéristique se voit chez moi car par exemple je</p>
          <Ligne n={2} />
          </>
        ),
      },
    ],
  },
  {
    page: 128,
    repere: "Page 128",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>ici on trouve un passage très intéressant : Harry connaît un accès de panique en imaginant que personne ne voudrait de lui… c'est-à-dire qu'il imagine quelque chose qui ne s'est tout simplement jamais produit (le Choixpeau choisit toujours une maison).. c'est tout de même très exagéré ! Il n'y a donc aucune chance pour que cela lui arrive, mais cette pensée le perturbe profondément. C'est <Cle>le premier passage de son aventure dans lequel on voit qu'il existe véritablement une faille en lui, c'est une forme de manque de confiance en soi et de peur panique d'être une fois de plus abandonné</Cle>. On pourra dire bien sûr que cet élément fait partie du portrait <strong>psychologique du personnage</strong>…</p>
          </>
        ),
      },
    ],
  },
  {
    page: 129,
    repere: "Page 129",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Harry est finalement envoyé à Gryffondor parce qu'il est sûr de son choix, c'est-à-dire que finalement c'est lui qui choisit son destin, alors que Serpentard l'aiderait « singulièrement sur le chemin de la grandeur ». <Cle>Harry est courageux et ne choisit pas la voix la plus facile mais celle qui lui semble la plus juste</Cle>. D’une certaine façon, on pourrait dire aussi que Harry cumule les qualités d’un Gryffondor et celles d’un Serpentard, ce qui fait de lui un héros hors du commun !</p>
          </>
        ),
      },
    ],
  },
  {
    page: 129,
    repere: "P129",
    blocs: [
      {
        type: 'citation',
        page: 129,
        texte: (
          <>
          <p>« il remarqua à peine qu'on lui réservait la plus plus longue et la plus bruyante ovation de la soirée »…</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>à chaque problème sa solution, Harry a peur d'être abandonné mais il pourra toujours compter sur le soutien de sa maison Gryffondor et de ses amis (ce qui est plus ou moins la même chose, et c'est peut-être cette solidarité fraternelle qui fait le prestige de la maison Gryffondor !).</p>
          </>
        ),
      },
    ],
  },
  {
    page: 129,
    repere: "Page 129",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>toucher un fantôme donne l'impression de plonger sa main dans un seau d'eau glacée.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 131,
    repere: "Page 131",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>présentation de Nick-quasi-sans-tête, fantôme-résident à la tour des Gryffondor.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 131,
    repere: "Page 131",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>informations d'importance, les Serpentards ont remporté la Coupe des Quatre Maisons six fois de suite (!).</p>
          </>
        ),
      },
    ],
  },
  {
    page: 133,
    repere: "Page 133",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>« tout se passe en un éclair » au bas de la page…. Voici un moment que les choses étaient trop tranquilles ! C'est dans ses circonstances particulières que Harry se retrouve pour la première fois au contact du professeur Rogue, et c’est donc dans le récit le retour de l’<strong>action</strong> (même s’il est très bref).</p>
          </>
        ),
      },
    ],
  },
  {
    page: 134,
    repere: "Page 134",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>interdiction d'aller dans la forêt et interdiction formule de se rendre dans le couloir de l'aile droite du troisième étage. Harry remarque que pour une fois on évite de donner la raison de cette interdiction. De notre côté, l’auteur installe aussi des repères aux limites du territoire des enfants ! Du côté extérieur, et du côté intérieur…</p>
          </>
        ),
      },
    ],
  },
  {
    page: 135,
    repere: "Page 135",
    blocs: [
      {
        type: 'citation',
        page: 135,
        texte: (
          <>
          <p>« ah, la musique, dit-il en s'essuyant les yeux. Elle est plus magique que tout ce que nous pourrons jamais faire dans cette école ».</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Cette phrase n’a rien à voir avec les indices spatio-temporels précédents mais je ne pouvais pas laisser passer ce moment où le grand Dumbledore lui-même se met à pleurer ! Lui qui garde toujours son sourire et sa bonne humeur ! Et devant quoi se met-il à pleurer ? Devant la musique.</p>
          <p>À mon avis, <Cle>derrière le commentaire de Dumbledore c'est l'auteur JK Rowling qui parle et qui a envie de dire aux enfants</Cle> ( ou au lecteur de façon générale) qu'il faut étudier la musique, comme instrumentiste tout comme mélomane, <Cle>car pour nous les moldus c'est une façon de faire de la magie !.</Cle></p>
          </>
        ),
      },
    ],
  },
  {
    page: 137,
    repere: "Page 137",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>il faut faire attention à Peeves, dit Percy en poursuivant son chemin. Nous voilà prévenus !</p>
          </>
        ),
      },
    ],
  },
  {
    page: 137,
    repere: "Page 137",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>les dortoirs sont gardés par un tableau magique qui demande un mot de passe ( <em>caput draconis</em> signifie en latin <em>tête de dragon</em>). Avant chaque dortoir se trouve la salle commune des élèves, un petit peu comme la Grande Salle mais pour chaque maison… c'est-à-dire une dimension en dessous…</p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "noire",
        contenu: (
          <>
          <p>je cherche la définition de <em>fractale</em> et l'ajoute à mes mots de vocabulaire…JK Rowling construit Poudlard en forme de fractale, cela permet au lecteur de <Cle>toujours savoir exactement où est-ce que les personnages sont placés dans l'établissement</Cle>, puisque tout est construit de façon <strong>logique.</strong> Il n'y a qu'en littérature que l'on peut retrouver ce genre de procédé !</p>
          <p>Ici quatre tours pour quatre maisons, quatre tableaux-gardiens, quatre salles communes, huit dortoirs… Mais à vrai dire l’action se situe essentiellement à Gryffondor, les autres endroits existent en marge de l’histoire, les personnages principaux ne s’y rendent qu’exceptionnellement.</p>
          </>
        ),
      },
    ],
  },
  {
    page: 138,
    repere: "Page 138",
    blocs: [
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Harry rêve de Drago Malefoy qui se transforme en professeur Rogue, qui lui-même fait surgir une lumière verte qui rappelle l'apparition de Voldemort… Ce dernier passage ne concerne pas non plus le fonctionnement de Poudlard, c’est plutôt qu’il annonce le prochain chapitre !</p>
          </>
        ),
      },
      {
        type: 'exercice',
        contenu: (
          <>
          <p><strong>Vocabulaire :</strong></p>
          <p>Nacré, spectre, fraise (le vêtement), panache, somptueux, plantureux, caquètement, hardi, roublard, métamorphose, fulgurant.</p>
          <Ligne n={11} />
          </>
        ),
      },
    ],
  },
],
};
