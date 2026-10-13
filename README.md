# Magic Harry

Site de cours de français autour des romans *Harry Potter* : commentaires de lecture, pistes verte / rouge / noire et exercices, chapitre par chapitre. Site **non référencé** (voir `CAHIER-DES-CHARGES.md`, section 9).

## Lancer le site

```sh
npm install
npm run dev      # développement
npm run build    # version publiée (dossier dist/, déployée par Netlify)
npm run lint
```

## Où se trouve quoi

| Dossier / fichier | Rôle |
|---|---|
| `src/data/config.js` | Nom du site, titres des tomes, ligne de source des citations (éditeur et année à fournir). |
| `src/data/tomes/tomeN/` | Contenu de chaque tome : un fichier par chapitre, `intro.jsx` (introduction du tome), `index.js` (ordre des chapitres, sous-titre, mots-clés). |
| `src/data/tomes/tome4/tome4.chapitres.js` | Sommaire du tome 4 : remplir `SOMMAIRE` (numéro, titre facultatif, page de début) pour découper le chapitre provisoire en vrais chapitres. |
| `src/data/commentUtiliser.jsx` | Texte de la page « Comment utiliser le site ». |
| `src/components/blocks/` | Les capsules : citation, piste, exercice, introduction. |
| `src/components/contenu/` | Petits composants du contenu : mise en évidence (`Cle`), lignes à compléter, fiche personnage, définition, étoiles… |
| `scripts/convert/` | Scripts de conversion des Word (non déployés) et contrôles. |
| `sources/` | Les Word d'origine (non déployés). |
| `CONVERSION-REPORT.md` | Rapport de conversion : comptages, cas ambigus, fautes suspectées. |

## Modifier un texte

Ouvrir le fichier du chapitre dans `src/data/tomes/`, modifier le texte entre les balises, puis `npm run build`. Chaque capsule est un objet :

```jsx
{ type: 'piste', niveau: 'rouge', contenu: (<><p>…</p></>) }
{ type: 'citation', page: 121, texte: (<><p>« … »</p></>) }
{ type: 'exercice', titre: 'n°2 : rédaction', contenu: (<><p>…</p><Ligne n={3} /></>) }
{ type: 'introduction', contenu: (<><p><em>…</em></p></>) }
```

Attention : les fichiers de `src/data/tomes/` sont régénérés par `scripts/convert/fix_t1.py` et `fix_t234.py`. Une modification faite à la main dans ces fichiers est donc perdue si ces scripts sont relancés. Soit on modifie les fichiers à la main et on ne relance plus les scripts, soit on ajoute la correction dans le script.

## Ajouter un tome (5 à 7)

1. Déposer le Word dans `sources/`.
2. Dans `src/data/config.js`, passer le tome à `disponible: true`.
3. Convertir avec `scripts/convert/t234.py` (ajouter le fichier à `SOURCES`) puis `fix_t234.py` ; les règles communes (`regles.py`) s'appliquent d'elles-mêmes.
4. Relire le brouillon, puis vérifier avec `verif_t234.py` (couverture et citations).
