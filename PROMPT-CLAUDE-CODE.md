# Prompt à coller dans Claude Code (dépôt `magic-letter`)

> Avant de le lancer, dans le dépôt :
> 1. `CAHIER-DES-CHARGES.md` est à la racine.
> 2. Les Word sont dans `sources/` : `sources/tome-1/`, `sources/tome-2/`, `sources/tome-3/`, `sources/tome-4/` (noms de fichiers d'origine conservés).
> 3. Le dépôt CIEL est consultable pour référence : `https://github.com/MrBoufflers/module-1-ciel` (dossier `pro-ciel/`), à cloner en lecture seule hors du dépôt, par exemple dans `../module-1-ciel`.

---

Tu vas construire **Magic Letter**, un site de cours de français sur les romans *Harry Potter*, pour les élèves d'un collègue d'Oni. Tu travailles dans le dépôt `magic-letter`, déjà créé.

## Ce que tu dois faire en premier

1. Lis **intégralement** `CAHIER-DES-CHARGES.md`. C'est la source de vérité : stack, modèle de contenu, pages, comportements, design, critères d'acceptation, phases.
2. Lis, dans le dépôt CIEL de référence (`pro-ciel/`) : `package.json`, `netlify.toml`, `vite.config.js`, `src/index.css` (tokens, thèmes, section dyslexie), `src/lib/ThemeProvider*`, `src/components/organisms/HeaderV2.jsx`, `src/components/blocks/BlockRenderer.jsx` et `registry.js`. Reprends ces patrons, mais **ne copie pas** le design glassmorphisme bleu-violet : Magic Letter a sa propre identité (cahier, section 7).
3. Pose un plan en quelques lignes, puis exécute la **phase 0**.

## Règles non négociables

- **Ne reformule jamais, ne corrige jamais en silence** le texte des Word. Tout doute (faute suspectée, classification ambiguë citation ou terme, bloc de type incertain) va dans `CONVERSION-REPORT.md` pour validation d'Oni. Tu ne tranches pas à sa place.
- **Versions élèves uniquement, aucune correction publiée.** Fichiers à utiliser et à exclure : cahier, section 3.
- **Aucun emoji** dans l'interface comme dans le contenu. Icônes Tabler ou SVG originaux.
- **Aucun logo, blason, visuel ou police officiels ou reconnaissables** de la franchise. N'importe aucune image des Word, liste-les dans le rapport.
- **Rien de tiers au chargement** : polices auto-hébergées, pas d'analytics, pas de cookies, pas de CDN.
- **Site non référencé** : `noindex` dans le HTML, `robots.txt` et les en-têtes Netlify (cahier, section 9). Ne crée pas de sitemap.
- Contenu en **fichiers de données JSX** (`src/data/tomes/`), rendu par un `BlockRenderer` et un registre de blocs. Trois blocs seulement : `citation`, `piste`, `exercice` (cahier, section 4).
- Aucun contenu de Word ne reste en dehors de ces trois blocs, des mots-clés, des résumés et de la page « Comment utiliser le site ».
- **Pas d'invention de contenu** : si une information manque (éditeur, année, sommaire du tome 4), mets un placeholder explicite dans `src/data/config.js` ou le fichier de mapping prévu et signale-le.

## Conversion des Word

- Utilise `pandoc` (`-t markdown --wrap=none` ou `-t json`) ou `mammoth`, via un script jetable dans `scripts/convert/` (non déployé). Tu peux t'en servir pour produire des **brouillons** de fichiers de données, que tu relis ensuite à la main.
- Repères dans les Word : les arrêts commencent par `>>> Page N`, `>>> (Fin) Chapitre N`, `Page N :` ou `P. N`. Les pistes sont étiquetées « Piste rouge » ou « Piste noire », parfois dans une cellule de tableau. Les analyses sans étiquette sont de niveau **verte**. Les exercices sont signalés par « EXERCICE », des tableaux vides, des lignes `____` ou des listes de vocabulaire à chercher.
- Le souligné du Word marque une idée clé : rends-le par une mise en évidence sémantique, pas par un soulignement de lien.
- Conserve gras, italique, liens (larousse.fr, vikidia.fr, nouvel onglet) et espaces insécables françaises.
- Aucun nom de personne ni date issus du fichier Classroom dans le site.
- Tome 1 : « Incipit » devient le chapitre 0. Tomes 2 et 3 : un chapitre par repère de chapitre ; certains arrêts à l'intérieur d'un chapitre sont repérés par page. Tome 4 : uniquement des repères de page, aucun repère de chapitre dans le Word. Applique le défaut D2 du cahier (chapitre provisoire unique, correspondance isolée dans `tome4.chapitres.js`) tant qu'Oni n'a pas fourni le sommaire de l'édition poche.

## Rapport de conversion (`CONVERSION-REPORT.md`, à la racine, non déployé)

Pour chaque tome : liste des fichiers lus, nombre de chapitres, d'arrêts, de citations, de pistes (par niveau) et d'exercices produits ; liste de tous les cas ambigus ; fautes suspectées (avec fichier et extrait court) ; images non importées ; emoji supprimés ; blocs d'un type incertain. Ce rapport sert à Oni pour valider avant de continuer.

## Phases, avec arrêt à chaque fin

- **Phase 0 — Socle** : scaffolding Vite/React/Tailwind, thèmes clair/sombre (préférence système par défaut), mode dyslexie (OpenDyslexic copié depuis le dépôt CIEL, bouton « Aa »), en-tête, page de garde (7 tomes dont 3 « bientôt », bandeau voyant « Comment utiliser le site »), routes, `config.js`, non-référencement, `netlify.toml`. Termine par `npm run build` et `npm run lint`, puis arrête-toi et fais un compte rendu de 5 lignes.
- **Phase 1 — Tome 1** : composants des trois blocs, mots-clés, marque-page, filtre des pistes (cahier 6.1), conversion complète du tome 1 y compris l'incipit, puis `CONVERSION-REPORT.md`. **Arrête-toi** et attends la validation d'Oni.
- **Phase 2 — Tomes 2 à 4**, après validation de la phase 1.
- **Phase 3 — Finitions** : page « Comment utiliser le site », impression, accessibilité, vérifications des critères d'acceptation (cahier, section 11).

Ne passe jamais à la phase suivante sans accord explicite d'Oni.

## Qualité et vérification

- Tablette d'abord : teste en portrait et paysage (Playwright est disponible dans l'environnement si besoin), puis téléphone et grand écran. Cibles tactiles d'au moins 44 px, aucun défilement horizontal de page, focus visible, `prefers-reduced-motion` respecté, contrastes AA dans les deux thèmes.
- Compare par comptage le contenu des données avec les Word, et vérifie que les citations sont identiques à la source caractère pour caractère (hors espaces insécables).
- Avant chaque compte rendu : `npm run build`, `npm run lint`, et recherche d'emoji dans `src/` (aucun résultat attendu).
- Commits petits et clairs, un par étape logique. Ne pousse pas sans qu'Oni l'ait demandé.

## Ton compte rendu

À la fin de chaque phase, en quelques lignes : ce qui est fait, ce qui a été vérifié et comment, ce qui reste ambigu ou bloqué (avec ce dont tu as besoin d'Oni). Pas de récit détaillé des étapes.
