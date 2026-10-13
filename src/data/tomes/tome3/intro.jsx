import { Cle } from '../../../components/contenu';

export default {
  id: 'tome-3-introduction',
  slug: 'introduction',
  numero: 0,
  titre: null,
  motsCles: ["psychologie", "psychologie du personnage", "situation initiale", "deus ex machina", "introspection", "point de vue subjectif", "quête intérieure"],
  resume: null,
  arrets: [
  {
    blocs: [
      {
        type: 'introduction',
        contenu: (
          <>
          <p><em>Dans ce troisième volume, je voulais d’abord proclamer simplement « et maintenant, place à la lecture » ! Car, avec tout ce que nous avons vu jusqu'ici, vous devez désormais être en mesure d'être un peu plus <Cle>autonomes</Cle>… Et il est bon de ne pas oublier que l'une des grandes qualités de la saga Harry Potter est que <Cle>chaque livre apporte une dimension en plus à la série, par rapport au précédent !</Cle> Il y a donc un certain nombre d'étapes à franchir pour que l'histoire grandisse…</em></p>
          <p><em>Mais finalement, au fur et à mesure de la rédaction de ce dossier je me suis dit que la question de la</em> <strong><em>psychologie</em></strong><em>, centrale dans Le prisonnier d'Azkaban, mérite certainement d'être expliquée un peu plus en détail… Les élèves ne savent pas toujours très bien de quoi on parle quand on évoque ce mot compliqué ! Nous nous retrouverons donc, plus ou moins, à la fin de chaque chapitre pour un petit commentaire qui pourra probablement éclairer votre lecture.</em></p>
          <p><em>Bien-sûr, certaines explications sont un peu plus compliquées que d’habitude ! Courage ! Et n’hésitez pas à relire l’explication deux fois, à demander de l’aide, ou à me poser une question en classe, si vous n’avez pas compris…</em></p>
          <p><em>Je vous conseille d'utiliser un marque-page pour noter notre prochain point de rendez-vous, parce que ce n'est pas tout à fait régulier !</em></p>
          </>
        ),
      },
      {
        type: 'exercice',
        titre: "n°1 Vocabulaire/Rédaction",
        contenu: (
          <>
          <ul>
            <li>Vous allez commencer par chercher le mot « psychologie » dans le dictionnaire Larousse, mais attention, il y a ici deux sens qui nous intéressent ! (car le mot « psychologie » est <strong>polysémique</strong>, il a plusieurs sens…)</li>
            <li>Vous noterez d'une part la définition du mot « psychologie « au sens large » et d'autre part la définition du mot « psychologie » dans le cadre de la narration, c'est-à-dire la « psychologie du personnage ».</li>
            <li>Donnez votre avis en quelques lignes (au moins cinq ou six !) : que sait-on de la psychologie de Harry après la lecture des deux premiers bouquins ? Donnez quelques adjectifs qui le caractérisent (en essayant d’utiliser des “car” et des “parce-que” !).</li>
          </ul>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>(si cela peut vous aider)</p>
          <p><Cle>Modèle de réponse possible :</Cle></p>
          <p><em>Je pense que Harry est (adjectif n°1) … car…. … Nous le voyons par exemple quand…</em></p>
          <p><em>Je pense aussi que l’on peut dire que Harry est (adjectif n°2) car/parce que… … Nous le voyons par exemple quand…</em></p>
          <p>Et maintenant, bonne lecture !</p>
          </>
        ),
      },
    ],
  },
],
};
