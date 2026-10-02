# Magic Letter — Cahier des charges (v1)

Site de cours de français autour des romans *Harry Potter*, destiné aux élèves d'un collègue de Oni.
Domaine cible : `magic-letter.netlify.app` (disponibilité à vérifier à la création du site Netlify). Dépôt GitHub : `magic-letter`.

Statut : conception validée avec Oni le 2026-10-01. Les points marqués **[À FOURNIR]** ou **[PAR DÉFAUT]** sont détaillés en section 12.

---

## 1. Objectif et public

- Support de cours en ligne : commentaires de lecture, pistes de difficulté et exercices, chapitre par chapitre, pour les 7 tomes (4 fournis pour l'instant).
- Public : élèves du collègue. Usage en classe (vidéoprojecteur) et à la maison, **sur tablette en priorité**, mais aussi ordinateur et téléphone.
- Consultation uniquement : pas de comptes, pas de saisie sauvegardée, pas de recherche, pas de back-office. Le contenu est modifié par Oni dans le code.
- Site **non référencé** (voir section 9).

## 2. Stack (identique au site CIEL, dépôt de référence `MrBoufflers/module-1-ciel`, dossier `pro-ciel/`)

- Vite 7, React 19, Tailwind 4 (`@tailwindcss/vite`), react-router-dom 7, `@tabler/icons-react`.
- Déploiement Netlify : `npm run build`, publication `dist`, redirection SPA `/* -> /index.html (200)`.
- Thème clair/sombre via attribut `data-theme` sur la racine (voir `src/lib/ThemeProvider` du dépôt CIEL).
- Mode dyslexie via attribut `data-dys="on"` et police OpenDyslexic (fichiers dans `pro-ciel/src/polices/` du dépôt CIEL), bouton « Aa » dans l'en-tête, préférence mémorisée dans `localStorage`.
- Contenu en fichiers de données JSX rendus par un `BlockRenderer` et un registre de blocs (même principe que `src/components/blocks/` du dépôt CIEL).
- Aucun service tiers au chargement : polices auto-hébergées (paquets `@fontsource/*` ou fichiers locaux), pas d'analytics, pas de cookies, pas de CDN.

## 3. Sources et périmètre du contenu

Les fichiers Word sont dans `sources/` (non publiés). **Seules les versions élèves sont utilisées. Aucune correction n'est publiée.**

| Tome | Fichiers retenus | Fichiers exclus |
|---|---|---|
| 1 | `1 - Introduction_`, `2 - Instructions -`, `3 - Incipit`, chapitres 1 à 17 (versions élèves quand deux versions existent : chapitres 1, 5, 7, 9, 11) | tous les fichiers `prof`, `Correction chapitre 7`, `0 - Notes diverses` |
| 2 | `Harry Potter et la chambre des secrets.docx` | — |
| 3 | `Harry Potter et le prisonnier d'Azkaban.docx` | — |
| 4 | `Harry Potter et la Coupe de Feu.docx` | — |
| 5 à 7 | pas encore fournis : cartes « bientôt » sur la page de garde | — |

Cas particulier : `Commentaires présentation classroom.docx` sert uniquement à extraire un résumé d'une ou deux phrases par chapitre du tome 1 (affiché dans le sommaire du tome). Le nom de personne et la date qu'il contient ne doivent **pas** être repris.

## 4. Modèle de contenu

### 4.1 Hiérarchie

`Tome` -> `Chapitres` -> `Arrêts` -> `Blocs`.

- **Arrêt** : un point de commentaire repéré par une page du livre (« Page 121 ») ou par une fin de chapitre. Il reflète la pédagogie du dossier : « je lis jusqu'à la page X, puis je lis le commentaire ».
- Tous les tomes sont organisés en **une page par chapitre**.
- Seuls les chapitres qui ont du contenu sont affichés (voir 12, point D3).

### 4.2 Les trois blocs

| Bloc | Contenu | Règles |
|---|---|---|
| `citation` | Extrait du livre | Texte reproduit **à l'identique** depuis le Word. Page affichée. Ligne de source générée automatiquement depuis la configuration (section 6.2). |
| `piste` | Toute explication ou analyse du prof. `niveau` = `verte`, `rouge` ou `noire`. | Les analyses de base sans étiquette sont de niveau **verte**. Les étiquettes « Piste rouge » et « Piste noire » du Word donnent leur niveau. |
| `exercice` | Tout ce que l'élève doit compléter : lignes à trous, tableaux, rédactions, argumentations, listes de vocabulaire à chercher | Affichage statique, aucune saisie sauvegardée, impression possible. |

### 4.3 Éléments d'interface (pas des blocs)

- **Mots-clés** : pastilles dans l'en-tête de page, à côté du nom du livre. Niveau chapitre pour le tome 1 (lignes « Mots-clés » / « Notions clés »), niveau tome pour les tomes 2 et 3 (lignes « Notions étudiées » / « Notions »). Le tome 4 n'a pas de ligne de ce type.
- **Marque-page « Prochain arrêt : page N »** en fin d'arrêt, calculé automatiquement depuis la page de l'arrêt suivant quand elle existe. Supprimable si cela alourdit.

### 4.4 Schéma de données (exemple)

```jsx
// src/data/tomes/tome1.jsx
export const tome1 = {
  id: 'tome-1',
  numero: 1,
  slug: 'ecole-des-sorciers',
  titre: "Harry Potter à l'école des sorciers",
  sousTitre: "Ou : comment progresser en français sans trop se fatiguer.",
  disponible: true,
  motsCles: [],
  chapitres: [
    {
      id: 'tome-1-incipit',
      slug: 'incipit',
      numero: 0,                       // l'incipit est traité comme chapitre 0
      titre: "Incipit : la porte d'entrée du texte",
      motsCles: ['incipit', 'hiérarchie', 'portrait'],
      resume: null,                    // sinon une ou deux phrases (fichier Classroom)
      arrets: [
        {
          page: 7,                     // optionnel ; absent = fin de chapitre
          blocs: [
            { type: 'citation', page: 7, texte: <>« Monsieur et Mrs Dursley… »</> },
            { type: 'piste', niveau: 'verte', contenu: <>…</> },
            { type: 'piste', niveau: 'noire', titre: 'Construction parallèle', contenu: <>…</> },
            { type: 'exercice', titre: 'Le champ lexical de la sorcellerie', contenu: <>…</> },
          ],
        },
      ],
    },
  ],
};
```

Composants utilitaires pour les exercices : ligne de réponse, case à compléter, tableau à compléter, liste de mots (vocabulaire). Les blancs `____` du Word deviennent des lignes visuelles, jamais des champs de saisie.

### 4.5 Règles de conversion du texte

- Fidélité : le texte du prof n'est **jamais** reformulé ni corrigé en silence. Les fautes suspectées sont listées dans un rapport, pas corrigées.
- Mises en forme : le gras reste du gras, l'italique de l'italique, le **souligné** du Word marque une idée clé et devient une mise en évidence (surlignage) sémantique.
- Typographie française : espaces insécables avant `: ; ! ?` et à l'intérieur des guillemets « ».
- Les 4 emoji présents dans les fichiers retenus sont **supprimés** : 🙂 aux chapitres 1, 5 et 7 du tome 1, 😀 dans le tome 2.
- Les images des Word ne sont **pas** importées (certaines pourraient être des visuels officiels). Elles sont listées dans le rapport.
- Liens externes conservés : larousse.fr (introduction du tome 1), vikidia.fr (chapitre 11 du tome 1), ouverts dans un nouvel onglet.
- Le texte « La correction complémentaire vous sera imprimée à la suite de votre travail » du chapitre 7 (tome 1) est supprimé.
- Distinction citation / mot entre guillemets : les guillemets « » servent aussi à isoler des termes (« psychologie »). Toute classification ambiguë est listée dans le rapport pour validation, jamais tranchée en silence.

## 5. Pages et navigation

| Route | Contenu |
|---|---|
| `/` | Page de garde : grille des 7 tomes (4 actifs, 3 grisés « bientôt », non cliquables) + bandeau voyant « Comment utiliser le site » |
| `/comment-utiliser` | Page « Comment utiliser le site » (design distinct, plus voyant) |
| `/tome/:tome` | Sommaire du tome : titre, sous-titre, mots-clés, liste des chapitres avec résumé quand il existe |
| `/tome/:tome/:chapitre` | Page de chapitre |

- Navigation chapitre précédent / suivant. Sommaire latéral (tiroir sur tablette et téléphone).
- « Comment utiliser le site » : reprend l'Introduction et le Mode d'emploi (fichiers 1 et 2 du tome 1) mis en page de façon attractive, plus une **légende** des trois blocs (citation, pistes verte / rouge / noire, exercice) et du bouton « Aa ».
- Page 404 simple avec retour à l'accueil.

## 6. Comportements

### 6.1 Filtre des pistes

- Contrôle à trois états : **Verte**, **+ Rouge**, **+ Noire** (cumulatifs), mémorisé dans `localStorage`. Défaut : **Verte**.
- Les pistes de niveau inférieur ou égal au niveau choisi sont **dépliées**. Les pistes de niveau supérieur sont **repliées** avec un titre cliquable (« Piste rouge — toucher pour ouvrir »). Aucun contenu n'est jamais caché sans possibilité de l'ouvrir.
- Le contrôle est visible en haut de chaque page de chapitre.

### 6.2 Source des citations

- Fichier `src/data/config.js` : auteur « J. K. Rowling », édition « édition poche », éditeur et année **[À FOURNIR]**, et le titre de chaque tome.
- Ligne affichée sous chaque citation : `J. K. Rowling, <titre du tome>, <édition>, p. <page>.` La pagination des commentaires correspond à l'édition poche.

### 6.3 Impression

- Feuille de style `@media print` : en-tête, navigation et filtres masqués ; les exercices s'impriment avec leurs lignes. Bouton « Imprimer » sur chaque exercice et sur la page de chapitre.

### 6.4 Texte pour vidéoprojecteur (optionnel, si simple)

- Réglage de taille du texte (3 niveaux) à côté du bouton « Aa ».

## 7. Design

### 7.1 Direction

Univers sorcier moderne : sobre, lisible, pas de carnaval. Thèmes **sombre** (nuit profonde) et **clair** (parchemin clair), commutateur clair / sombre et bouton « Aa » dans l'en-tête, comme sur le site CIEL. Thème initial : préférence système.

### 7.2 Interdits

- Aucun emoji ni émoticône dans l'interface (icônes Tabler et SVG originaux uniquement).
- Aucun logo, blason de maison, visuel, affiche ou typographie officiels ou reconnaissables de la franchise (pas la police du logo, pas la cicatrice, pas les blasons, pas de silhouettes de film). Ornements originaux : étoiles, runes inventées, sceau de cire, lueur de chandelle.

### 7.3 Typographie

- Texte courant : sans-serif humaniste lisible (ou `system-ui`).
- Titres de page : une capitale classique à empattements, uniquement sur les titres courts (h1, h2). Auto-hébergée.
- Mode dyslexie : OpenDyslexic sur **tout** le site, titres inclus, interlignage et espacement augmentés comme dans `index.css` du site CIEL.

### 7.4 Couleurs

- Une couleur d'accent par tome, à valider visuellement : T1 doré, T2 violet profond, T3 bleu nuit argenté, T4 cuivre. Tomes 5 à 7 : même principe, plus tard.
- **Pistes** : verte, rouge et noire, avec une **forme distincte** en plus de la couleur (cercle, carré, losange) pour ne pas dépendre de la couleur seule. En thème sombre, la piste noire passe en contour clair pour rester visible.
- Les accents de tome ne doivent pas se confondre avec les couleurs des pistes.
- Contraste conforme WCAG AA dans les deux thèmes.

### 7.5 Formats visuels des blocs

| Bloc | Format |
|---|---|
| Citation | Bloc « extrait » : grands guillemets typographiques, pastille « p. 121 », ligne de source en pied |
| Piste verte / rouge / noire | Encadrés distincts par couleur et forme ; rouge et noire repliables |
| Exercice | « Parchemin à compléter » : lignes, cases, tableaux, bouton Imprimer |
| Mots-clés | Pastilles (« runes ») dans l'en-tête de page |
| Marque-page | Ruban « Prochain arrêt : page N » |
| Variantes dans une piste ou un exercice | Carte de définition, étoiles « 5 étoiles » (SVG), fiche personnage à trois colonnes (physique / caractère / habitudes) qui passe en cartes empilées en largeur étroite |

### 7.6 Page de garde et « Comment utiliser le site »

- Cartes de tomes : numéro, titre, sous-titre, nombre de chapitres, accent du tome. Les tomes « bientôt » sont grisés.
- Bandeau « Comment utiliser le site » : pleine largeur, contrasté, motif d'étoiles et de runes, très visible dès l'arrivée.

## 8. Accessibilité et tablette

- Cibles tactiles d'au moins 44 px, aucun survol obligatoire, navigation au clavier, focus visible, `aria-*` sur les contrôles repliables, `prefers-reduced-motion` respecté, aucun défilement horizontal de page.
- Tester en tablette portrait et paysage, téléphone, et projection (grand écran).

## 9. Non-référencement

- `<meta name="robots" content="noindex, nofollow, noarchive">`, `public/robots.txt` avec `Disallow: /`, en-tête `X-Robots-Tag: noindex, nofollow, noarchive` dans `netlify.toml`, pas de sitemap, pas de balises Open Graph.
- Ce n'est pas une protection : toute personne ayant l'URL peut ouvrir le site.
- Recommandation : dépôt GitHub **privé** (Netlify sait déployer un dépôt privé), car le dépôt contiendra des citations du livre.

## 10. Livrables et phases

1. **Phase 0 — Socle** : scaffolding, thèmes, dyslexie, en-tête, page de garde, routes, configuration, `noindex`, déploiement Netlify.
2. **Phase 1 — Tome 1** : composants (`citation`, `piste`, `exercice`, mots-clés, marque-page), filtre des pistes, conversion du tome 1, **rapport de conversion**. Arrêt pour validation d'Oni.
3. **Phase 2 — Tomes 2 à 4** : conversion et pages. Le tome 4 dépend du sommaire fourni (section 12, D2).
4. **Phase 3 — Finitions** : « Comment utiliser le site », impression, accessibilité, vérifications finales.

Chaque phase se termine par un arrêt et un compte rendu court.

## 11. Critères d'acceptation

- `npm run build` et `npm run lint` passent sans erreur.
- Chaque arrêt de chaque Word retenu est présent dans les données (contrôle par comptage, détaillé dans le rapport).
- Aucune correction, aucun fichier prof, aucun emoji, aucune image du Word dans le site publié.
- Les citations sont identiques à celles des Word, caractère pour caractère (hors espaces insécables).
- `noindex` présent dans le HTML, le fichier `robots.txt` et les en-têtes Netlify.
- Les deux thèmes et le mode dyslexie fonctionnent sur toutes les pages ; contrastes AA vérifiés.
- Le filtre des pistes se comporte comme décrit en 6.1 et survit au rechargement.

## 12. Points ouverts

| # | Point | Statut |
|---|---|---|
| D1 | Éditeur et année de l'édition poche (ligne de source des citations) | **[À FOURNIR]** par Oni. Placeholder dans `config.js` en attendant. |
| D2 | Sommaire de l'édition poche (chapitres du tome 4 avec page de début) | **[À FOURNIR]**. Le Word du tome 4 ne contient que des repères de page (22, 157, 198, … 755), aucun repère de chapitre. En attendant, le tome 4 est affiché sous un chapitre provisoire unique et la correspondance page vers chapitre est isolée dans `src/data/tomes/tome4.chapitres.js`. |
| D3 | Chapitres sans contenu : tome 2 chapitre 18 ; tome 3 chapitres 1, 2, 15, 18, 20, 21 (absents du Word) | **[PAR DÉFAUT]** non affichés. |
| D4 | Incipit du tome 1 | **[PAR DÉFAUT]** chapitre 0 « Incipit », avant le chapitre 1. |
| D5 | Tome 4 : pas de ligne « Notions » | **[PAR DÉFAUT]** pas de mots-clés au niveau du tome. |
| D6 | Couleurs d'accent des tomes et choix de la police de titres | À valider sur maquette après la phase 0. |
