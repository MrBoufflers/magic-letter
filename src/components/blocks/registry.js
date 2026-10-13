import Citation from './Citation';
import Piste from './Piste';
import Exercice from './Exercice';

// Les trois seuls types de blocs du site (cahier, section 4.2).
const registry = {
  citation: Citation,
  piste: Piste,
  exercice: Exercice,
};

export default registry;
