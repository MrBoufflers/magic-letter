// Tome 3 : métadonnées propres au tome, introduction et liste ordonnée des chapitres.
import intro from './intro';
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
import chapitre16 from './ch16';
import chapitre17 from './ch17';
import chapitre19 from './ch19';
import chapitre22 from './ch22';

export default {
  sousTitre: "Ou… une introduction à la psychologie.",
  motsCles: ["psychologie", "psychologie du personnage", "situation initiale", "deus ex machina", "introspection", "point de vue subjectif", "quête intérieure"],
  introduction: intro.arrets.flatMap((a) => a.blocs),
  chapitres: [
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
    chapitre16,
    chapitre17,
    chapitre19,
    chapitre22,
  ],
};
