// Tome 4 : métadonnées propres au tome, introduction et liste ordonnée des chapitres.
import intro from './intro';
import chapitre1 from './ch01';
import { decouper } from './tome4.chapitres';

export default {
  sousTitre: "Ou l'art de porter le lecteur (au loin)",
  motsCles: [],
  introduction: intro.arrets.flatMap((a) => a.blocs),
  chapitres: decouper(chapitre1),
};
