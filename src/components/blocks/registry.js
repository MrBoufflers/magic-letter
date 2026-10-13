import Citation from './Citation';
import Piste from './Piste';
import Exercice from './Exercice';
import Introduction from './Introduction';

// Types de blocs du site : les trois du cahier (4.2) et l'introduction de chapitre
// (ajoutée à la demande d'Oni, 2026-10-13).
const registry = {
  citation: Citation,
  piste: Piste,
  exercice: Exercice,
  introduction: Introduction,
};

export default registry;
