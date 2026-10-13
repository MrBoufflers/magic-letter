import { Cle, Ligne } from '../../../components/contenu';

export default {
  id: 'tome-3-chapitre-13',
  slug: 'chapitre-13',
  numero: 13,
  titre: "Du sang sur les draps",
  motsCles: [],
  resume: null,
  arrets: [
  {
    repere: "(Fin du) Chapitre 13",
    blocs: [
      {
        type: 'citation',
        texte: (
          <>
          <ul>
            <li><em>« Regarde ! hurla- t-il en se ruant vers Hermione. Regarde ! répéta-t-il en lui agitant le drap sous le nez.</em></li>
            <li><em>Ron, qu'est ce que…</em></li>
            <li><em>CROUTARD ! Regarde ! CROUTARD !</em></li>
          </ul>
          <p><em>Hermione, penchée en arrière, essayait de s'éloigner de Ron, fou de rage. Harry regarda le drap. Il y avait une tâche rouge au milieu. Quelque chose qui ressemblait à ….</em></p>
          <ul>
            <li><em>Du SANG ! S'écria Ron. Et tu sais ce qu'il y avait par terre ?</em></li>
            <li><em>N… non, balbutia Hermione d'une voix tremblante.</em></li>
          </ul>
          <p><em>Ron jeta quelque chose sur le livre ouvert devant elle. Harry et Hermione se penchèrent sur la table et virent de longs poils de chat d'une couleur orangée. »</em></p>
          </>
        ),
      },
      {
        type: 'piste',
        niveau: "verte",
        contenu: (
          <>
          <p>Dans l'ambiance générale du récit dans lequel l'ombre de Sirius Black plane comme une menace, et après la disparition du lapin de Lavande, <Cle>la mort de Croûtard prend une dimension macabre… surtout qu’il y a du sang dans le lit de Ron, alors que le lit est supposé être un endroit plein de douceur ou rien ne peut nous arriver</Cle> !</p>
          <p>Avant d'en finir avec ce chapitre 13, il faudra quand même relever que c'est ici que Harry a réussi son premier Patronus, ce qui lui a valu les félicitations de Lupin. Au fil des pages, notre héros grandit et il commence à être capable, semble-t-il, à faire face à ses peurs !</p>
          </>
        ),
      },
      {
        type: 'exercice',
        titre: "n°5 Vocabulaire/ Rédaction",
        contenu: (
          <>
          <p>Je cherche l'étymologie du mot Patronus ( c'est-à-dire du mot patron). Pourquoi l'auteur a-t-elle choisi ce mot-là pour signifier la lueur argentée qui protège les gens des Détraqueurs ? Donnez votre avis en 5 ou 6 lignes en justifiant votre point de vue (en utilisant un car ou un parce que).</p>
          <Ligne n={1} />
          </>
        ),
      },
    ],
  },
],
};
