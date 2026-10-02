// Configuration générale de Magic Letter.
// Les valeurs marquées À FOURNIR attendent une information d'Oni (cahier, section 12).

export const A_FOURNIR = 'À FOURNIR';

export const site = {
  nom: 'Magic Letter',
  accroche: 'Lire Harry Potter, chapitre par chapitre, et progresser en français.',
};

// Ligne de source des citations (cahier, 6.2) :
// « J. K. Rowling, <titre du tome>, <édition>, p. <page>. »
export const source = {
  auteur: 'J. K. Rowling',
  edition: 'édition poche',
  editeur: A_FOURNIR, // D1
  annee: A_FOURNIR, // D1
};

// Les sept tomes. `disponible: false` = carte « bientôt » sur la page de garde.
// La couleur d'accent de chaque tome est définie dans index.css ([data-tome="N"]).
export const tomes = [
  {
    numero: 1,
    slug: 'ecole-des-sorciers',
    titre: "Harry Potter à l'école des sorciers",
    disponible: true,
  },
  {
    numero: 2,
    slug: 'chambre-des-secrets',
    titre: 'Harry Potter et la Chambre des secrets',
    disponible: true,
  },
  {
    numero: 3,
    slug: 'prisonnier-d-azkaban',
    titre: "Harry Potter et le Prisonnier d'Azkaban",
    disponible: true,
  },
  {
    numero: 4,
    slug: 'coupe-de-feu',
    titre: 'Harry Potter et la Coupe de feu',
    disponible: true,
  },
  {
    numero: 5,
    slug: 'ordre-du-phenix',
    titre: "Harry Potter et l'Ordre du phénix",
    disponible: false,
  },
  {
    numero: 6,
    slug: 'prince-de-sang-mele',
    titre: 'Harry Potter et le Prince de sang-mêlé',
    disponible: false,
  },
  {
    numero: 7,
    slug: 'reliques-de-la-mort',
    titre: 'Harry Potter et les Reliques de la Mort',
    disponible: false,
  },
];

export function ligneSource(numeroTome, page) {
  const tome = tomes.find((t) => t.numero === numeroTome);
  const titre = tome ? tome.titre : '';
  return `${source.auteur}, ${titre}, ${source.edition}, p. ${page}.`;
}
