// Point d'entrée des données de contenu.
// Chaque tome disponible aura son fichier de données (tome1.jsx, …) ajouté à `contenus`
// au fil des phases. Les métadonnées (titre, slug, disponibilité) viennent de config.js.
import { tomes as tomesConfig } from '../config';

const contenus = {};

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
