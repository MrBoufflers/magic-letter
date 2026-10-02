# Rapport de conversion — Magic Letter

Document de travail, **non déployé**, destiné à la validation d'Oni.
État : **phase 1 terminée (tome 1)**. Tomes 2 à 4 : phase 2, après validation.

Rien n'a été corrigé ni reformulé en silence. Tout ce qui a été retiré, déplacé ou classé avec un doute est listé ci-dessous ; chaque point peut être inversé facilement.

## Méthode

1. `scripts/convert/dump.py` lit le XML des Word (gras, italique, souligné, liens, tableaux, filets, images).
2. `scripts/convert/gen.py` produit un brouillon de fichier de données par chapitre : repères d'arrêt, étiquettes de pistes, citations, exercices.
3. `scripts/convert/fix_t1.py` applique les corrections de structure relues à la main, chapitre par chapitre. Chaque remplacement est vérifié et le script s'arrête s'il ne trouve pas exactement un endroit à remplacer. Le résultat est écrit dans `src/data/tomes/tome1/`.
4. Contrôles automatiques (`extraire_pages.cjs` et `verifier.py`) sur le site construit :
   - Couverture : chaque paragraphe et chaque cellule de tableau des Word retenus est recherché dans le texte affiché de la page, sans tenir compte des espaces, des flèches `>>>` ni des étiquettes de piste.
   - Fidélité : chaque citation affichée est recherchée telle quelle dans le Word, hors espaces.

Règles appliquées partout :
- Le souligné du Word devient une mise en évidence (surlignage) ; le gras et l'italique sont conservés.
- Espaces insécables françaises ajoutées avant `: ; ! ?` et à l'intérieur des guillemets « ». Les doubles espaces sont réduites à une seule.
- Les étiquettes « Piste rouge » et « Piste noire » sont retirées du texte et donnent le niveau de la piste. Le texte non étiqueté est en piste verte.
- L'étiquette « EXERCICE » est retirée du texte et donne le type de bloc.
- Les repères (« >>> Page N », « P. N », « p.N ») deviennent le titre de l'arrêt, avec leur texte d'origine, `>>>` en moins.

---

## Tome 1 — *Harry Potter à l'école des sorciers*

### Fichiers lus

**Retenus (18 chapitres)** :
- `3 - Incipit` : chapitre 0.
- `4 - Chapitre 1  élève`, `5 - Chapitre 2`, `6 - Chapitre 3`, `7 - Chapitre 4`, `8- Chapitre 5 ELEVES`, `9 - Chapitre 6`, `10 -Chapitre 7 Eleves`, `11 - Chapitre 8 -`, `12 - Chapitre 9- élèves`, `13 - Chapitre 10`, `14 -Chapitre 11 - élève`, `15 - Chapitre 12` à `20 - Chapitre 17`.
- `Commentaires présentation classroom` : résumés seulement (voir plus bas).
- `1 - Introduction_` et `2 - Instructions -` : lus, réservés à la page « Comment utiliser le site » (phase 3). Seul le sous-titre du tome (« Ou : comment progresser en français sans trop se fatiguer. ») est déjà repris.

**Exclus** : `4 - Chapitre 1 prof`, `8 - Chapitre 5 prof`, `10-Chapitre 7 prof`, `12 - Chapitre 9- prof`, `14 -Chapitre 11 - prof`, `Correction chapitre 7`, `0 - Notes diverses`.

### Comptages (site construit)

| Chapitre | Arrêts | Citations | Pistes vertes | Pistes rouges | Pistes noires | Exercices |
|---|---|---|---|---|---|---|
| incipit | 4 | 1 | 8 | 1 | 1 | 2 |
| chapitre-1 | 8 | 2 | 13 | 4 | 3 | 1 |
| chapitre-2 | 5 | 0 | 7 | 1 | 1 | 0 |
| chapitre-3 | 8 | 2 | 10 | 3 | 4 | 2 |
| chapitre-4 | 4 | 2 | 4 | 1 | 2 | 2 |
| chapitre-5 | 4 | 0 | 3 | 2 | 3 | 3 |
| chapitre-6 | 12 | 2 | 14 | 1 | 2 | 1 |
| chapitre-7 | 20 | 2 | 21 | 2 | 3 | 3 |
| chapitre-8 | 15 | 2 | 16 | 4 | 2 | 2 |
| chapitre-9 | 15 | 1 | 16 | 1 | 3 | 1 |
| chapitre-10 | 17 | 11 | 17 | 4 | 3 | 3 |
| chapitre-11 | 11 | 5 | 10 | 3 | 2 | 2 |
| chapitre-12 | 18 | 4 | 18 | 4 | 5 | 2 |
| chapitre-13 | 9 | 5 | 8 | 1 | 2 | 1 |
| chapitre-14 | 7 | 3 | 6 | 2 | 1 | 1 |
| chapitre-15 | 13 | 8 | 12 | 6 | 2 | 1 |
| chapitre-16 | 8 | 5 | 8 | 0 | 0 | 0 |
| chapitre-17 | 10 | 5 | 9 | 2 | 3 | 1 |
| **Total** | **188** | **60** | **200** | **42** | **42** | **28** |

**Rapprochement avec les repères des Word** : 171 repères de page détectés dans les Word, contre 188 arrêts sur le site. Les 17 arrêts en plus sont :
- les 14 introductions de chapitre (texte placé avant le premier repère, arrêt sans page) ;
- « Portrait de Dudley » (chapitre 2), repère `>>>` sans numéro de page ;
- « Hagrid : p.21 en bas » (chapitre 1) et « Portrait de Harry p. 26 » (chapitre 2) : deux repères dont le numéro de page n'est pas en tête de ligne, non détectés automatiquement mais recréés à la main.

Quand plusieurs repères se suivent sur la même page (« Page 7 », « Page 7 (encore) »…), chacun reste un arrêt distinct. Le marque-page « Prochain arrêt : page N » ne s'affiche que si la page suivante est différente.

Les étiquettes rouges et noires des Word correspondent aux pistes du site, aux exceptions suivantes près :
- les étiquettes placées juste après un repère (« Page 227 : 》》》piste rouge》》》 ») ne sont pas comptées par la détection mais sont bien appliquées ;
- les cas particuliers du point 2 ci-dessous.

### Contrôles

- **Citations** : 60 sur 60 identiques au Word, caractère pour caractère (hors espaces).
- **Couverture** : 18 paragraphes du Word ne se retrouvent pas tels quels sur le site. Tous les écarts sont voulus :
  - le titre de l'incipit (voir point 1) ;
  - les 7 définitions mises en carte : le mot « Définition : » devient l'étiquette de la carte ;
  - les étiquettes de piste laissées dans le texte (point 4) ;
  - la note de correction du chapitre 7 (point 7) ;
  - la ponctuation des repères et les « p. 56 » / « ... » (point 12).
- `npm run build`, `npm run lint`, recherche d'emoji dans `src/` : sans erreur, sans résultat.

### Points à valider par Oni

**1. Titres de chapitre.**
Ce sont les titres des Word, sans le préfixe « Chapitre N : » et sans le point final (chapitres 10, 11, 12 et 3 notamment). Cas particuliers :
- Incipit : le Word dit « Chapitre 1 - INCIPIT : la Porte d’entrée du texte ». J'ai repris le titre du cahier, « Incipit : la porte d'entrée du texte ».
- Chapitre 1 : « Chapitre 1 SUITE : Les caractéristiques… ». « SUITE » est retiré.
- Chapitre 4 : « 6 - Chapitre 4 : La révélation ». Le « 6 - » (numéro du fichier) est retiré.

**2. Étiquettes de piste non standard.**
- Chapitre 1, « P24. CONCLUSION 》》》Piste bleue/rouge》》》... » : classée **rouge**. Les « ... » qui suivent l'étiquette sont retirés.
- Chapitre 12, « 》》》Complètement hors-piste 》》》 » (commentaire « d'un niveau plus élevé ») : classée **noire**.
- Chapitre 12, « 》》》Piste très noire》》》 » : classée **noire**.

**3. Étiquette seule suivie d'une citation.**
L'étiquette de piste est seule sur sa ligne et la citation suit (chapitre 11 en tête, « >>>Piste rouge>>> : » ; chapitre 15, page 264). Le commentaire qui suit la citation est classé dans la piste annoncée (rouge). La citation elle-même reste toujours affichée, car les citations ne sont pas filtrées.

**4. Étiquettes de piste au milieu d'un paragraphe**, laissées telles quelles dans le texte, donc non repliables :
- chapitre 1 : « ( 》》》 Piste noire》》》 : on parle de « connotation négative »… ) », à la page 15 ;
- chapitre 5 : « Les 》》》pistes noires》》》, vous pouvez… » ;
- chapitre 10 : « Piste noire (encore) : » et « (suite 》》》piste noire》》》) » ; ces deux paragraphes sont déjà dans la piste noire ;
- chapitre 11 : « pour les >>>>pistes noires>>> et les fanatiques… », dans une piste verte. Faut-il en faire une piste noire ?

**5. Classement citation / texte entre guillemets.**
Règle appliquée :
- un paragraphe qui commence par « et contient un passage du livre d'au moins 30 caractères devient un bloc `citation` ;
- si un commentaire suit dans le même paragraphe, il est séparé dans une piste. 11 paragraphes sont concernés : chapitres 7 (p. 129 et 135), 8 (p. 145), 9 (p. 154), 11 (p. 188 et 199), 12 (p. 215), 13 (p. 221 et 226), 15 (p. 249), 17 (p. 296). Au chapitre 15 (p. 249), le « : » qui reliait la citation au commentaire est retiré.

Les dialogues sur plusieurs paragraphes des pages 41 (chapitre 3), 273 et 278 (chapitre 16) ont été passés en citation à la main.

Passages du livre **laissés à l'intérieur des pistes**, parce qu'ils sont intégrés à la phrase du commentaire. À dire si certains doivent devenir des blocs :
- incipit : « Jamais on aurait imaginé… » (piste noire) ;
- chapitre 1 : « sacré petit bonhomme », « c'était à leurs yeux le plus bel enfant du monde » ;
- chapitre 2 : citations des p. 25, 26, 29 et 31 ;
- chapitre 3 : l'adresse de l'enveloppe, p. 42, recopiée sans guillemets ;
- chapitre 6 : réplique de Ron, p. 107 (piste noire) ;
- chapitre 8 : « Mais pire encore que Peeves… », p. 140 ;
- chapitre 12 : p. 211 (piste rouge) et p. 219 (piste noire) ;
- chapitre 13 : p. 227 (piste rouge) ;
- chapitre 14 : p. 245 (piste rouge) ;
- chapitre 15 : p. 252 (piste rouge) ;
- chapitre 17 : p. 303 (piste noire).

Citations **qui ne viennent pas du livre**, laissées en piste verte parce que la ligne de source automatique serait fausse :
- l'extrait d'entretien du traducteur J.-F. Ménard (chapitre 7) ;
- la notice ancienne sur Nicolas Flamel (chapitre 11) ;
- la référence à *Pottermore* (chapitre 17, piste noire).

**6. Citation sans page.** Chapitre 11, « En tout cas, l'amitié d'Hermione avait été utile à Harry… » : le Word ne donne pas de page. La ligne de source s'affiche sans « p. ».

**7. Suppressions de texte.**
- Chapitre 7 : toute la note « >>> Note : La correction complémentaire vous sera imprimée à la suite de votre travail ! Vous intégrerez à votre dossier. ». Le cahier demandait la suppression de la première phrase. La seconde, restée seule, n'avait plus de sens et a été retirée aussi. À confirmer.
- Chapitre 6 : un paragraphe ne contenant qu'un « . », après la définition de « Psychologie ».

**8. Renvoi à une correction non publiée.** Chapitre 5, piste noire : « Caractéristiques essentielles du monde des sorciers (pistes noires) >>> Les réponses figurent au dos de la page quand vous aurez terminé ». Il n'y a pas de réponses sur le site. Faut-il garder, retirer ou reformuler cette phrase ? (Je l'ai laissée telle quelle.)

**9. Exercices pour les pistes noires.** Ce même exercice du chapitre 5 est rangé dans une piste noire, donc replié par défaut, et non dans un bloc exercice. Il n'a donc pas de bouton « Imprimer » propre.

**10. Lignes de réponse.**
- Dans un exercice, les lignes `____` et les filets horizontaux du Word deviennent des lignes d'écriture, à raison d'une ligne par filet.
- Hors exercice, ce sont des séparateurs : ils sont retirés.
- Seule exception : la longue ligne de soulignés de l'incipit (« Je trouve quatre autres mots… ») devient 3 lignes.

**11. Choix de présentation** (le texte ne change pas, seule la mise en forme change) :
- les flèches `>>>` du texte deviennent un pictogramme de flèche ;
- les puces `>` en début de ligne deviennent une liste à chevrons ;
- les « Définition : terme : … » deviennent une carte de définition ;
- le tableau « Portrait de M. Dursley » de l'incipit devient une fiche personnage à trois colonnes ;
- le vocabulaire des chapitres 5 et 6 est rendu avec des lignes ;
- **ajout décoratif** : 5 étoiles (SVG original) en tête des deux encadrés « information cinq étoiles » de l'incipit. À retirer si non souhaité.

**12. Ponctuation des repères**, retirée parce qu'elle ne faisait que relier le repère au texte :
- le « . » de « >>> Page 112. » et « Page 142. » ;
- le « - » de « p24 - » ;
- le « : » doublé de « Page 303 》》》Piste noire》》》 : : » ;
- le « p. 56 » répété après la citation de la page 56, puisque la page est affichée sur la citation ;
- « Piste rouge ; » (chapitre 6) : le point-virgule est traité comme le séparateur de l'étiquette.

Au chapitre 4, « - « Harry… tu es un sorcier » » et au chapitre 17, « - « C'était Quirell ». » sont intégrés au titre de l'arrêt.

**13. Mots-clés.**
- Repris de la ligne « Mots-clés / Notions clés » de chaque chapitre, avec la casse d'origine (« Comparaison », « Portrait physique »).
- Au chapitre 15, cette ligne se trouve après l'introduction (« Notions- clé : … ») ; elle a bien été reprise.
- Pas de mots-clés au niveau du tome 1, d'après le cahier.

**14. Résumés (fichier Classroom).**
- Textes repris mot pour mot, avec les espaces insécables. Le nom et la date qui apparaissent dans la section « 3 - Chapitre 3 » ne sont pas repris.
- L'incipit utilise la section « 0B - Incipit ». Les sections « 0 - Introduction » et « 0A - Mode d'emploi » ne sont pas utilisées.
- Plusieurs résumés font plus de deux phrases (chapitres 3, 8, 9, 10) : les garder en entier ou les couper ?
- Chapitre 1 : « trois types d'information, les caractéristiques morales et les habitudes ». Il manque probablement « physiques ».
- Chapitre 2 : « le portraits ».

**15. Images.** Aucune image n'est importée (voir plus bas).

### Fautes suspectées (non corrigées)

Relevé fait à la relecture, **non exhaustif** : aucun correcteur orthographique n'était disponible dans l'environnement. Les fautes situées dans une citation sont à vérifier dans le livre, car elles peuvent venir de l'édition elle-même.

| Extrait (Word) | Remarque | Fichier |
|---|---|---|
| `d’étrange et le mystérieux` | la citation p. 7 dit « d'étrange ou de mystérieux » | 3 - Incipit.docx |
| `information cinq étoile de` | étoiles ? | 3 - Incipit.docx |
| `auxquelles attribueriez` | « vous attribueriez » ? | 3 - Incipit.docx |
| `qu'il doit attendre pour retrouver en état` | atteindre / un état ? | 3 - Incipit.docx |
| `plus loin,,` | virgule doublée | 4 - Chapitre 1  élève.docx |
| `qui donne en effet assez ridicule` | mot manquant ? (« un air assez ridicule ») | 4 - Chapitre 1  élève.docx |
| `bottes à haut talon munis` | munies ? | 4 - Chapitre 1  élève.docx |
| `de pouvoir que lui-même` | pouvoirs ? | 4 - Chapitre 1  élève.docx |
| `événènements` | événements | 4 - Chapitre 1  élève.docx |
| `Ce qui à quelque chose` | a | 4 - Chapitre 1  élève.docx |
| `du personnage de et de sa disparition` | nom manquant (Voldemort ?) | 4 - Chapitre 1  élève.docx |
| `le lecteur découvre un chat a un comportement` | « un chat qui a » ? | 4 - Chapitre 1  élève.docx |
| `JK Rownling` | Rowling | 5 - Chapitre 2.docx |
| `petit yeux bleus humide` | petits yeux bleus humides | 5 - Chapitre 2.docx |
| `cheveux noir et` | noirs | 5 - Chapitre 2.docx |
| `ne lui dis pas bonjour` | dit | 5 - Chapitre 2.docx |
| `quand le héros à des frères` | a | 5 - Chapitre 2.docx |
| `On va bien dans ce dialogue` | voit ? | 6 - Chapitre 3.docx |
| `ce qu'elle cela deviendra` | mot en trop | 6 - Chapitre 3.docx |
| `peut-être assez efficace` | peut être | 6 - Chapitre 3.docx |
| `le temps ralenti` | ralentit | 6 - Chapitre 3.docx |
| `Les Potter ont dormi à l'hôtel` | les Dursley ? | 6 - Chapitre 3.docx |
| `et certes juste` | est | 7 - Chapitre 4.docx |
| `quand qui doit décider` | mot en trop | 7 - Chapitre 4.docx |
| `si Hagrid réussi` | réussit | 7 - Chapitre 4.docx |
| `d'affreuse répétition` | d'affreuses répétitions | 7 - Chapitre 4.docx |
| `jetta` | jeta (dans un exemple inventé, piste rouge) | 8- Chapitre 5 ELEVES.docx |
| `comme si de rien était` | « comme si de rien n'était » | 8- Chapitre 5 ELEVES.docx |
| `Il existe encore de défense contre les forces du mal` | mot manquant (« un cours de défense » ?) | 8- Chapitre 5 ELEVES.docx |
| `portent tous en uniforme` | « un uniforme » ? | 8- Chapitre 5 ELEVES.docx |
| `qu'à ce qui appartiennent` | ceux qui | 8- Chapitre 5 ELEVES.docx |
| `à une mère qui vient` | a | 8- Chapitre 5 ELEVES.docx |
| `boutiques de ballet volant` | balais volants | 8- Chapitre 5 ELEVES.docx |
| `sorcier en sport` | sorciers un sport | 8- Chapitre 5 ELEVES.docx |
| `les mornings` | mornilles | 8- Chapitre 5 ELEVES.docx |
| `Tant qu'on est pas` | n'est pas | 8- Chapitre 5 ELEVES.docx |
| `Sinistre: :` | deux-points doublés (vocabulaire) | 9 - Chapitre 6.docx |
| `chaque maison à sa propre` | a | 10 -Chapitre 7 Eleves.docx |
| `l'on en choisira pas` | n'en choisira | 10 -Chapitre 7 Eleves.docx |
| `c'est la seule être capable` | la seule à être | 11 - Chapitre 8 -.docx |
| `s'est réjouit` | réjoui | 13 - Chapitre 10.docx |
| `Hermione est devenu un` | devenue | 14 -Chapitre 11 - élève.docx |
| `piquet de 15 m` | piqué | 14 -Chapitre 11 - élève.docx |
| `dire c'est véritables` | ses | 14 -Chapitre 11 - élève.docx |
| `Paris reçoit un pull` | Harry | 15 - Chapitre 12.docx |
| `Malefoy à un certain génie` | a | 15 - Chapitre 12.docx |
| `semble tâché de sang` | taché (citation ? vérifier dans le livre) | 15 - Chapitre 12.docx |
| `peut-être en détail de pure` | un détail | 15 - Chapitre 12.docx |
| `il ne le comprirent` | ils ne le comprirent (citation : vérifier dans le livre) | 17 - Chapitre 14.docx |
| `c'est toi qui devrait` | devrais (citation : vérifier dans le livre) | 19 - Chapitre 16.docx |
| `la plus plus longue` | « plus » doublé (citation : vérifier dans le livre) | 10 -Chapitre 7 Eleves.docx |
| `Quirell` | orthographe variable : Quirell / Quirrel / Quirrell | 8- Chapitre 5 ELEVES.docx, 20 - Chapitre 17.docx |

### Images non importées

| Fichier Word | Image | Contenu |
|---|---|---|
| `3 - Incipit` | `image1.png` | Panneau triangulaire rouge « ! » (danger), avant « La hiérarchie des informations » |
| `3 - Incipit` | `image2.png` | Image vide (70 octets) |
| `1 - Introduction_` | `image1.jpg` | Phare dans la nuit (à côté de « Lumos ! ») — phase 3 |
| `1 - Introduction_` | `image2.jpg` | Pochoirs de citrouilles d'Halloween — phase 3 |
| `1 - Introduction_` | `image3.jpg` | Chat dessiné avec un chapeau de sorcier — phase 3 |

Aucune de ces images n'est un visuel officiel de la franchise. Elles ne sont pas importées, comme le cahier le demande. Le panneau de l'incipit pourrait être remplacé par une icône Tabler si Oni le souhaite.

### Emoji supprimés

- Chapitre 1 : 🙂 (« Les autres iront (un peu) plus vite 🙂 et… »)
- Chapitre 5 : 🙂 (« …quand vous aurez terminé 🙂 »)
- Chapitre 7 : 🙂 (« …de votre collège 🙂). »)

### Liens

- Chapitre 11 : `vikidia.fr`, conservé et ouvert dans un nouvel onglet.
- Les mentions « Larousse.fr » des chapitres 1 et 3 sont du texte simple dans le Word ; elles restent sans lien.
- Le lien larousse.fr de l'introduction sera repris en phase 3.

### Blocs d'un type incertain

- Chapitre 12 : « Exercice : comment le réalisateur a-t-il transcrit cette scène au cinéma ? » est une question ouverte sans ligne de réponse. Elle est classée en exercice et n'a pas de ligne ajoutée.
- Chapitre 4, page 69 : la consigne « Vous allez relire ce chapitre 4… notez la liste… » est classée en exercice, sans ligne de réponse dans le Word, donc sans ligne ajoutée.
- Incipit, « Conseil lecture : … », et chapitre 1, encadré « Je retiens : … » : classés en piste verte.
- Chapitre 8 : « Protéiforme : qui peut prendre plusieurs formes… » est une définition dans une piste rouge. Elle est laissée en texte, sans carte, car elle n'est pas introduite par « Définition ».
- Chapitre 7, « Page 125 » : la consigne de l'exercice sur le Choixpeau, qui faisait partie du commentaire dans le Word, est placée dans le bloc exercice.

---

## Informations manquantes (placeholders)

- **D1** : éditeur et année de l'édition poche → `src/data/config.js` (`À FOURNIR`). La ligne de source suit pour l'instant le format du cahier : « J. K. Rowling, <titre>, édition poche, p. N. ».
- **D2** : sommaire du tome 4 (phase 2).
