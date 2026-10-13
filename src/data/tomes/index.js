// Point d'entrée des données de contenu.
// Les métadonnées (titre, slug, disponibilité) viennent de config.js ;
// le contenu de chaque tome disponible vient de son dossier de données.
import { tomes as tomesConfig } from '../config';
import tome1 from './tome1';

const contenus = {
  1: tome1,
};

export const tomes = tomesConfig.map((t) => ({
  sousTitre: null,
  motsCles: [],
  chapitres: [],
  ...t,
  ...(contenus[t.numero] ?? {}),
}));

export function getTome(slug) {
  return tomes.find((t) => t.slug === slug && t.disponible) ?? null;
}

export function libelleChapitre(chapitre) {
  if (chapitre.libelle) return chapitre.libelle;
  return chapitre.numero === 0 ? 'Incipit' : `Chapitre ${chapitre.numero}`;
}

export function getChapitre(tome, slug) {
  if (!tome) return null;
  const index = tome.chapitres.findIndex((c) => c.slug === slug);
  if (index === -1) return null;
  return {
    chapitre: tome.chapitres[index],
    precedent: tome.chapitres[index - 1] ?? null,
    suivant: tome.chapitres[index + 1] ?? null,
  };
}
