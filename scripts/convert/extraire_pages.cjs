// Script jetable : rend chaque page de chapitre (vite preview sur :4173) et en extrait
// le texte complet, les citations et les comptages de blocs, au format JSON.
// Usage : node extraire_pages.cjs <slug-tome> <slug-chapitre>... > sortie.json
const { execSync } = require('child_process');
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const [tome, ...chapitres] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage();
  const out = {};
  for (const c of chapitres) {
    await p.goto(`http://localhost:4173/tome/${tome}/${c}`);
    await p.waitForSelector('.chapitre');
    // tout déplier pour que le texte des pistes repliées soit présent
    await p.evaluate(() => document.querySelectorAll('.piste-corps[hidden]').forEach((e) => e.removeAttribute('hidden')));
    out[c] = await p.evaluate(() => ({
      texte: (() => {
        // texte du contenu seul : on retire les éléments d'interface
        const clone = document.querySelector('.chapitre').cloneNode(true);
        clone.querySelectorAll('.piste-label, .piste-hint, .exercice-label, .exercice-entete button, .citation-source, .marque-page, .guillemet, .definition-label, .pastille-page, .chapitre-outils, .chapitre-nav, .chapitre-tete, .sr-only').forEach((e) => e.remove());
        document.body.appendChild(clone);
        const t = clone.innerText;
        clone.remove();
        return t;
      })(),
      citations: [...document.querySelectorAll('.citation-corps')].map((e) => e.innerText),
      arrets: document.querySelectorAll('.arret').length,
      verte: document.querySelectorAll('.piste-verte').length,
      rouge: document.querySelectorAll('.piste-rouge').length,
      noire: document.querySelectorAll('.piste-noire').length,
      exercices: document.querySelectorAll('.exercice').length,
      motsCles: [...document.querySelectorAll('.rune')].map((e) => e.innerText),
    }));
  }
  console.log(JSON.stringify(out));
  await b.close();
})();
