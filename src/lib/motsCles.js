// Mots-clés -> capsule qui en parle, cherchée dans le texte rendu de la page.
// Ordre de préférence : piste verte (mot en gras ou surligné, puis texte),
// puis pistes rouges et noires, exercices et introduction. Citations exclues.

const ORDRE = [
  '.ancre[data-type="piste"] .piste-verte',
  '.ancre[data-type="piste"]',
  '.ancre[data-type="exercice"]',
  '.ancre[data-type="introduction"]',
];

const normaliser = (t) => t.toLowerCase().replace(/[\u00a0\u202f\s]+/g, ' ').replace(/[’]/g, "'").trim();

const echapper = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Chaque mot peut porter une marque de pluriel (s, x) ; tiret et espace équivalents.
function motif(expr) {
  const corps = normaliser(expr)
    .split(/[\s-]+/)
    .map((w) => `${echapper(w.replace(/[sx]$/, ''))}[sx]?`)
    .join('[- ]?');
  return new RegExp(`(^|[^\\p{L}])${corps}(?=$|[^\\p{L}])`, 'u');
}

// Expression complète d'abord, puis (repli) son premier mot s'il est assez significatif.
function motifs(mot) {
  // article initial ignoré (« la quête secondaire » -> « quête secondaire »)
  const sansArticle = normaliser(mot).replace(/^(?:(?:les|le|la)\s+|l')/, '');
  const premiers = sansArticle.split(/[\s']+/);
  const res = [[motif(sansArticle)]];
  if (premiers.length > 1 && premiers[0].length >= 5) res.push([motif(premiers[0])]);
  return res;
}

export function trouverCibles(racine, mots) {
  const cibles = {};
  if (!racine) return cibles;
  for (const mot of mots) {
    let trouve = null;
    for (const res of motifs(mot)) {
      const contient = (el) => res.some((r) => r.test(normaliser(el.textContent)));
      for (const sel of ORDRE) {
        const blocs = [...racine.querySelectorAll(sel)].map((e) => e.closest('.ancre'));
        // d'abord un mot en gras ou surligné, puis n'importe où dans la capsule
        trouve =
          blocs.find((b) => [...b.querySelectorAll('strong, mark, .definition-terme')].some(contient)) ||
          blocs.find(contient);
        if (trouve) break;
      }
      if (trouve) break;
    }
    if (trouve) cibles[mot] = trouve.id;
  }
  return cibles;
}

export function allerA(id) {
  const ancre = document.getElementById(id);
  if (!ancre) return;
  const repliee = ancre.querySelector('.repliee > .piste-entete');
  if (repliee) repliee.click();
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  ancre.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' });
  ancre.classList.remove('cible');
  // relancer la mise en évidence
  void ancre.offsetWidth;
  ancre.classList.add('cible');
  window.setTimeout(() => ancre.classList.remove('cible'), 2200);
}
