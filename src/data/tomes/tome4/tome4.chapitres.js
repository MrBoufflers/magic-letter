// Tome 4 : correspondance page -> chapitre (cahier des charges, point D2).
//
// Le Word du tome 4 ne contient que des repères de page. Tant que le sommaire de
// l'édition poche n'est pas fourni (À FOURNIR par Oni), tous les arrêts sont
// regroupés dans un chapitre provisoire unique.
//
// Pour découper : remplir SOMMAIRE avec, pour chaque chapitre, son numéro, son titre
// (facultatif) et sa première page dans l'édition poche, par ordre croissant :
//   { numero: 1, titre: null, debut: 9 },
//   { numero: 2, titre: null, debut: 25 },
export const SOMMAIRE = [];

// Introduit les arrêts du chapitre provisoire dans les chapitres du sommaire.
// Un arrêt va au dernier chapitre dont la page de début est inférieure ou égale à la sienne.
export function decouper(provisoire) {
  if (SOMMAIRE.length === 0) return [provisoire];
  const chapitres = SOMMAIRE.map((c) => ({
    id: `tome-4-chapitre-${c.numero}`,
    slug: `chapitre-${c.numero}`,
    numero: c.numero,
    titre: c.titre ?? null,
    motsCles: [],
    resume: null,
    arrets: [],
  }));
  for (const arret of provisoire.arrets) {
    let k = 0;
    while (k + 1 < SOMMAIRE.length && SOMMAIRE[k + 1].debut <= arret.page) k += 1;
    chapitres[k].arrets.push(arret);
  }
  return chapitres.filter((c) => c.arrets.length > 0);
}
