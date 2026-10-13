// Tome 2 : métadonnées propres au tome, introduction et liste ordonnée des chapitres.
import intro from './intro';
import chapitre1 from './ch01';
import chapitre2 from './ch02';
import chapitre3 from './ch03';
import chapitre4 from './ch04';
import chapitre5 from './ch05';
import chapitre6 from './ch06';
import chapitre7 from './ch07';
import chapitre8 from './ch08';
import chapitre9 from './ch09';
import chapitre10 from './ch10';
import chapitre11 from './ch11';
import chapitre12 from './ch12';
import chapitre13 from './ch13';
import chapitre14 from './ch14';
import chapitre15 from './ch15';
import chapitre16 from './ch16';
import chapitre17 from './ch17';

export default {
  sousTitre: "… (ou la magie de la littérature.)",
  motsCles: ["schéma actantiel", "rapports entre les personnages", "registre", "intrigue", "la question de la politique", "les valeurs de l’auteur", "le dégoût du lecteur", "la quête secondaire", "polysémique", "interprétation", "justification paroxysme", "roman policier"],
  introduction: intro.arrets.flatMap((a) => a.blocs),
  chapitres: [
    chapitre1,
    chapitre2,
    chapitre3,
    chapitre4,
    chapitre5,
    chapitre6,
    chapitre7,
    chapitre8,
    chapitre9,
    chapitre10,
    chapitre11,
    chapitre12,
    chapitre13,
    chapitre14,
    chapitre15,
    chapitre16,
    chapitre17,
  ],
};
