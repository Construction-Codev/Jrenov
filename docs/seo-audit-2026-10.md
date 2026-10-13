# Audit SEO et conversion — jrenov.com (13 octobre 2026)

> Audit réalisé le 13 octobre 2026 sur `master` (commit `9935013`, PR #1 fusionnée) et sur la branche du changement de numéro (PR #3). La PR #2 (conversion Google Ads des clics téléphone) était ouverte et non fusionnée ; elle n'a pas été modifiée.
>
> Il remplace la partie « État actuel » de [`seo-audit.md`](./seo-audit.md) (7 octobre), devenue obsolète après les lots 2 à 6 : robots.txt, sitemap, canonicals, Open Graph, 404, JSON-LD et pages locales existent désormais.
>
> **Aucune page n'a été modifiée pour cet audit.** Seul le changement de numéro a été appliqué (PR #3). Toutes les affirmations renvoient au code, à une mesure locale ou à une vérification du site en ligne. Ce qui demande des données Search Console ou une information de l'entreprise est marqué **[GSC]** ou **[ENTREPRISE]**.

## Sommaire

1. [Méthode et limites](#1-méthode-et-limites)
2. [Synthèse](#2-synthèse)
3. [Problèmes confirmés, par gravité](#3-problèmes-confirmés-par-gravité)
4. [A. Technique](#4-a-technique)
5. [B. SEO local](#5-b-seo-local)
6. [C. Pages prestations](#6-c-pages-prestations)
7. [D. Réalisations](#7-d-réalisations)
8. [E. Acquisition et conversion](#8-e-acquisition-et-conversion)
9. [État de chaque page importante](#9-état-de-chaque-page-importante)
10. [Plan d'action 30 / 60 / 90 jours](#10-plan-daction-30--60--90-jours)
11. [Fichiers concernés](#11-fichiers-concernés)
12. [Données à fournir](#12-données-à-fournir)

---

## 1. Méthode et limites

| Vérification | Outil | Résultat |
|---|---|---|
| Crawl complet | Script Node sur `next start` (build de production local), à partir du sitemap puis de tous les liens internes | 52 URL, toutes en 200, 0 lien interne cassé, 0 redirection interne. Seule `/mentions-legales` (noindex) est hors sitemap, ce qui est voulu |
| Balises | Même crawl : title, description, canonical, robots, H1/H2/H3, JSON-LD, images, mots dans `<main>` | Tableau [§ 9](#9-état-de-chaque-page-importante) |
| Performance | Lighthouse 12 (mobile simulé, throttling par défaut) sur 5 pages types, build local | [§ 4.6](#46-performance-et-core-web-vitals) |
| Anti-duplication des pages locales | `npm run check:local-duplication` | ✅ similarité max 0,56 (titles) et 0,54 (descriptions), aucun bloc ≥ 100 caractères dupliqué |
| Parcours d'appel | Playwright desktop 1440 px et iPhone 13 | [§ 8.1](#81-appels-à-laction) |
| Site en ligne | Lecture de `https://www.jrenov.com/` | Affiche encore le 04 65 84 88 85 (normal tant que la PR #3 n'est pas déployée) ; flux Facebook visible avec 3 publications |

**Limites.** Les mesures Lighthouse sont des mesures de laboratoire sur un serveur local : elles indiquent des tendances, pas les Core Web Vitals réels. Les données terrain sont dans Vercel Speed Insights et dans le rapport « Signaux Web essentiels » de Search Console **[GSC]**. Aucune donnée de positions, d'impressions ou de clics n'était disponible : les priorités éditoriales ci-dessous sont à confirmer avec Search Console.

---

## 2. Synthèse

Le socle technique est sain : pages statiques, canonicals et Open Graph sur toutes les pages, sitemap complet, robots.txt correct, un seul H1 partout, JSON-LD cohérent (`RoofingContractor`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`), score SEO Lighthouse de 100 sur les 5 pages testées. Les 7 pages locales sont réellement différenciées et adossées à des chantiers réels.

Les gains restants sont surtout **hors du socle** :

1. **Le changement de numéro** doit être cohérent partout hors du site (fiche Google Business Profile, annuaires, Facebook, Instagram, extensions d'appel Google Ads), sinon la cohérence NAP (nom, adresse, téléphone) du SEO local se dégrade.
2. **La conversion mobile** : aucun bouton d'appel visible dans le header mobile, et le bouton « Appeler » du menu mobile est inaccessible (hors de l'écran).
3. **L'accueil sur mobile** est la page la plus lente (Lighthouse perf 68, LCP 3,4 s, CLS 0,17, TBT 660 ms), alors que les autres pages sont à 96-97.
4. **Les réalisations et le blog sont minces** : 106 à 186 mots et une seule photo par chantier ; 192 à 319 mots, aucune image et presque aucun lien entrant pour les articles.
5. **Le formulaire de devis ne propose pas les 7 prestations** : les fenêtres de toit n'y figurent pas, ce qui fausse la mesure des demandes par prestation.

---

## 3. Problèmes confirmés, par gravité

### Critique

| # | Problème | Preuve | Impact | Type |
|---|---|---|---|---|
| C1 | Nouveau numéro pas encore en ligne, et pas encore propagé hors du site | Site en ligne : `tel:0465848885`. PR #3 prête, non fusionnée | Les appels partent vers l'ancien numéro ; incohérence NAP entre site, fiche Google et annuaires | Technique (PR #3) + **[ENTREPRISE]** |
| C2 | Bouton « Appeler » du menu mobile inaccessible | Playwright iPhone 13 : le lien est à y = 699 px pour un écran de 664 px. Le header est `sticky top-0` (`components/Header.tsx:31`) et le menu ouvert dépasse l'écran, sans défilement interne : le bas du menu ne peut jamais être atteint | Le principal bouton d'appel mobile ne peut pas être cliqué | Technique |

### Majeur

| # | Problème | Preuve | Impact | Type |
|---|---|---|---|---|
| M1 | Aucun numéro visible dans le header sous 768 px | Le bloc téléphone du header est `hidden md:flex` (`components/Header.tsx`) ; le bandeau supérieur n'a pas de lien d'appel | Sur mobile, l'appel n'est possible qu'en ouvrant le menu (cassé, C2) ou en descendant jusqu'à un CTA de contenu | Technique |
| M2 | Accueil lent sur mobile | Lighthouse mobile : perf 68, LCP 3,4 s (élément LCP : la vidéo `banner1.mp4` avec son poster), CLS 0,174 (décalage du bloc texte du Hero), TBT 660 ms. Les autres pages testées : perf 96-97, CLS 0 | La page d'arrivée des campagnes et de la marque est la moins performante | Technique |
| M3 | Formulaire de devis incomplet | `app/devis/page.tsx` : 5 choix (couverture, zinguerie, isolation, démoussage, urgence). Pas de « fenêtres de toit » ; la recherche de fuite n'existe que sous « urgence ». `lib/analytics.ts` n'accepte que ces 5 valeurs + `autre` | Demandes de fenêtres de toit mal classées ; impossible de mesurer les devis par prestation pour 2 des 7 pages services | Technique |
| M4 | Fiches réalisations minces | 22 fiches de 106 à 186 mots, une seule photo, même gabarit ; H1 sans la commune (elle n'est que dans le title et la ligne d'infos) | Faible potentiel de positionnement propre, preuve de savoir-faire sous-exploitée | Éditorial + **[ENTREPRISE]** |
| M5 | Blog isolé et mince | 8 articles, 192 à 319 mots, aucune image ; chaque article n'a que 2 liens entrants (`/blog` et `/plan-du-site`) : les articles renvoient vers les services (`ArticleServiceLinks`), mais aucune page service ni locale ne renvoie vers eux. Dernier article : 10 juin 2026 | Articles peu crawlés et peu utiles au silo | Technique (maillage) + éditorial |

### Moyen

| # | Problème | Preuve | Type |
|---|---|---|---|
| D1 | Titles trop longs | 9 des 22 pages principales dépassent 65 caractères (suffixe « \| Jrenov » compris), 18 réalisations sur 22 et les 8 articles aussi ; Google tronque vers 580 px (~60 caractères) | Éditorial |
| D2 | Meta descriptions trop longues | 12 pages principales et 16 réalisations au-dessus de 165 caractères (jusqu'à 211) | Éditorial |
| D3 | Carte Google Maps chargée sans consentement | `app/contact/page.tsx:301` : iframe `google.com/maps` (en `loading="lazy"`) chargée dès que la carte approche de l'écran, que les cookies aient été acceptés ou non | Technique (conformité) |
| D4 | Contraste et taille des cibles tactiles | Lighthouse accessibilité 92 : texte `text-amber-600` sur blanc (accroches et liens « En savoir plus »), liens communes du footer trop rapprochés | Technique |
| D5 | Image LCP en lazy-load sur `/realisations` | Lighthouse : première carte en `loading="lazy"`, LCP 2,6 s | Technique |
| D6 | Photo de la fiche Corbas à vérifier | `renovation-toiture-garages-corbas` (« bac acier sur dépendance ») utilise `acier.jpg`, qui montre une sous-face et un mur en pierre, pas de bac acier visible | **[ENTREPRISE]** |
| D7 | Flux Facebook sur toutes les pages | `components/FacebookFeed.tsx` est un Server Component : **aucun JavaScript côté client**, impact Core Web Vitals négligeable (sous le pied de contenu, images en lazy-load via `next/image`). En revanche il impose une revalidation ISR de 2 h à tout le site (`lib/facebook.ts:46`), affiche du contenu non maîtrisé sous chaque page (y compris mentions légales), consomme le quota d'optimisation d'images Vercel pour les images fbcdn, et disparaît silencieusement si le token Meta expire | Décision **[ENTREPRISE]** |

### Mineur

| # | Problème | Preuve |
|---|---|---|
| m1 | `public/logo.png` (5 Mo, 6000×6000) toujours publié à `/logo.png` | Non référencé par le code |
| m2 | 3 photos de chantier inutilisées | `3velux.jpg`, `isolation.jpg`, `verriere.jpg` dans `public/images/realisations/` : galeries possibles pour Décines, Chassieu (isolation) et Lyon 3e (verrière), **[ENTREPRISE]** à confirmer |
| m3 | H1 génériques sur les hubs | `/realisations` « Nos dernières réalisations », `/blog` « Le Blog Toiture & Zinguerie », `/contact` « Contactez Jrenov » : sans prestation ni localité |
| m4 | `seo-audit.md` décrit un état périmé | Remplacé par ce document |
| m5 | Scripts `/_vercel/insights` et `/_vercel/speed-insights` en 404 en local | Normal hors Vercel ; aucun impact en production |

---

## 4. A. Technique

### 4.1 Indexation, robots.txt, sitemap

- `app/robots.ts` : `Allow: /`, `Disallow: /api/`, lien vers le sitemap. ✅
- `app/sitemap.ts` : 51 URL générées depuis les données (services, pages locales, réalisations, articles). Dates issues des données réelles uniquement ; les pages sans date n'ont pas de `lastModified`. ✅
- Toutes les pages indexables sont dans le sitemap et toutes les URL du sitemap répondent 200. `/mentions-legales` est en `noindex, follow` et exclue du sitemap. ✅
- **[GSC]** À vérifier : rapport *Pages* (pages « Détectée, non indexée » ou « Explorée, non indexée », surtout réalisations et articles), sitemap soumis sur la bonne propriété, absence d'ancien sitemap `jrenov.fr`.

### 4.2 Canonical et redirections

- Canonical présent sur 52/52 pages, toujours égal à l'URL de la page, sur `https://www.jrenov.com`. ✅
- `next.config.ts` : redirections 308 des deux anciens slugs accentués de réalisations. ✅
- `jrenov.com` → `www.jrenov.com` géré par Vercel (constaté au Lot 2).
- Aucune redirection interne ni chaîne de redirection rencontrée pendant le crawl. ✅

### 4.3 Métadonnées et Open Graph

- Title, description, canonical, `og:*` et `twitter:*` produits par `pageMetadata()` (`lib/site.ts`) sur toutes les pages. ✅
- Une seule image Open Graph (`/og-image.jpg`) pour tout le site. Acceptable ; une image par service et par réalisation améliorerait les partages (Facebook, WhatsApp).
- Longueurs : voir D1 et D2 et le tableau du § 9.

### 4.4 Hiérarchie des titres

- Un seul H1 sur chacune des 52 pages. ✅
- Pages services et locales : 6 à 10 H2, structure claire. ✅
- Fiches réalisations : 1 H2 et 4-5 H3, gabarit identique ; voir § 7.

### 4.5 Données structurées

| Type | Où | État |
|---|---|---|
| `RoofingContractor` | Toutes les pages (layout) | ✅ nom, raison sociale, adresse de Décines-Charpieu, horaires, `areaServed`, `sameAs`, logo ; téléphone `+33761242793` avec la PR #3 |
| `WebSite` | Toutes les pages | ✅ |
| `BreadcrumbList` | Toutes sauf l'accueil | ✅ |
| `Service` + `FAQPage` | 6 pages services | ✅ FAQ générée depuis le contenu visible |
| `WebPage` + `Service` | 7 pages locales | ✅ |
| `BlogPosting` | 8 articles | ✅ |
| Réalisations | — | Aucun type propre. Gain faible ; pas prioritaire |

Pas d'avis, de note ni de `priceRange` : c'est voulu, rien ne doit être inventé. Les avis ne pourront être balisés que s'ils sont réellement collectés et affichés sur le site **[ENTREPRISE]**.

Ajouts possibles, uniquement avec des données confirmées : `geo` (coordonnées du siège) et `hasMap` (lien de la fiche Google Business Profile) **[ENTREPRISE]**.

### 4.6 Performance et Core Web Vitals

Lighthouse 12, mobile simulé, build de production local :

| Page | Perf | LCP | CLS | TBT | Poids | Élément LCP |
|---|---|---|---|---|---|---|
| `/` | **68** | **3,4 s** | **0,174** | **660 ms** | 401 Ko | vidéo Hero (`banner1.mp4`, poster) |
| `/services/couverture` | 97 | 2,4 s | 0 | 120 ms | 255 Ko | paragraphe d'intro |
| `/couvreur-decines-charpieu` | 97 | 2,3 s | 0 | 110 ms | 397 Ko | paragraphe d'intro |
| `/realisations` | 96 | 2,6 s | 0 | 90 ms | 851 Ko | 1re image (en lazy-load, D5) |
| `/devis` | 96 | 2,6 s | 0 | 110 ms | 239 Ko | H1 |

SEO Lighthouse : 100 partout. Accessibilité : 92 partout (D4). Bonnes pratiques : 96.

**Accueil (M2).** Pistes, à valider une par une avec une mesure avant/après :

- **LCP** : le poster est découvert tard (attribut `poster` d'une `<video>` rendue côté client). Afficher le poster dans une `next/image` avec `priority` sous la vidéo, ou le précharger.
- **CLS 0,174** : décalage du bloc texte du Hero (`components/Banner.tsx`, `div.relative.z-20`). Causes probables : hauteur `aspect-[16/10]` + `min-h-[550px]` qui change quand le contenu dépasse sur petit écran, ou bascule de police. À diagnostiquer avant correction.
- **TBT 660 ms** : surtout l'exécution du plus gros chunk JS (718 ms de scripting) et le décodage vidéo. Envisager de ne pas lancer la vidéo sur mobile (poster seul, ce qui économise aussi ~2,6 Mo de données par vidéo) ; le rendu desktop resterait identique.
- **[GSC]** / Vercel Speed Insights : vérifier les valeurs terrain (LCP, INP, CLS) de l'accueil avant et après.

**Autres pages** : très bonnes. INP n'est pas mesurable en laboratoire ; le site a peu d'interactions lourdes (menu, formulaire de devis en 3 étapes), risque faible.

**JavaScript.** Composants client : Header, Banner, Breadcrumb, AnalyticsEvents, GoogleTag, ConsentBanner, ManageCookiesButton, pages contact et devis. Le reste est rendu côté serveur. Lighthouse estime 26 Ko de JS inutilisé et 13 Ko de polyfills : gains faibles.

### 4.7 Images et ressources

- Photos de chantier : 25 JPEG de 1200×1600 à 2048×1536, 350 Ko à 1 Mo chacun ; servies via `next/image` (redimensionnées et converties à la volée). ✅
- Vidéos Hero : 3 × ~2,6 Mo ; seule la première est chargée au départ (Lot 2). ✅ mais coûteux sur mobile (voir M2).
- Toutes les images ont un `alt`. ✅
- m1 : `logo.png` de 5 Mo à retirer de `public/`.

### 4.8 404, doublons, liens cassés

- `app/not-found.tsx` existe ; `/page-inexistante` répond 404 avec la page personnalisée. ✅
- 0 lien interne cassé sur 52 pages. ✅
- Doublons : pages locales contrôlées par le script anti-duplication ✅ ; pas de contenu dupliqué constaté entre services.

### 4.9 Facebook Feed

Voir D7. Recommandation : le garder sur l'accueil et `/realisations` uniquement (preuve sociale là où elle sert), et le retirer du layout global. Cela rendrait les autres pages entièrement statiques et réduirait les appels à l'API Meta. Décision **[ENTREPRISE]**.

### 4.10 Formulaires et sécurité

État documenté dans [`form-security.md`](./form-security.md) et vérifié par les tests (`tests/form-security/`, 128 tests au total au vert) : jeton de formulaire, honeypot, limitation de débit, validation stricte, Turnstile, échappement HTML dans les e-mails, aucune donnée personnelle envoyée aux outils d'analyse. Conversion Google Ads uniquement après succès confirmé par le serveur (`submissionId`) et consentement. Rien de bloquant constaté. D3 (carte Google Maps sans consentement) est le seul point de conformité ouvert.

---

## 5. B. SEO local

### 5.1 Pages existantes

| Commune | Page | Mots | Réalisation réelle | Angle | Verdict |
|---|---|---|---|---|---|
| Décines-Charpieu | `/couvreur-decines-charpieu` | 900 | Remplacement Velux | Siège, proximité | ✅ À renforcer : c'est la commune du siège, elle doit porter le plus de preuves (photos, chantiers, avis) |
| Lyon | `/couvreur-lyon` | 1007 | Lyon 3e, 5e, 6e | Bâti urbain : toits-terrasses, solins, verrières | ✅ La plus complète |
| Meyzieu | `/couvreur-meyzieu` | 869 | Bandeaux et rives alu | Bas de toit, zinguerie | ✅ |
| Villeurbanne | `/couvreur-villeurbanne` | 873 | Réfection tuiles | Maisons de ville | ✅ |
| Genas | `/couvreur-genas` | 816 | Démoussage | Entretien | ✅ |
| Chassieu | `/couvreur-chassieu` | 801 | Isolation combles | Isolation + couverture | ✅ |
| Saint-Priest | `/couvreur-saint-priest` | 845 | Traitement charpente | Charpente + couverture | ✅ |

Les 7 pages sont uniques (contrôle automatique), chacune adossée à au moins un chantier réel de la commune, avec un angle propre. **Aucune nouvelle page géographique n'est recommandée sans nouveau chantier réel.**

Point faible commun : chaque page ne s'appuie que sur **une** réalisation. Le moyen le plus sûr de les renforcer est d'ajouter des chantiers réels dans ces communes **[ENTREPRISE]**, pas d'allonger le texte.

### 5.2 Autres communes

Le backlog [`local-seo-map.md`](./local-seo-map.md) reste valable. Seules deux communes ont un potentiel justifié à court terme, **sous condition d'un chantier réel** :

- **Vaulx-en-Velin** et **Bron** : limitrophes, population importante, aucune page ni réalisation.
- **Vénissieux** (urgence après orage) et **Caluire-et-Cuire** (Sarking) ont déjà une réalisation chacune : une page est possible avec un angle propre, mais une seule réalisation reste mince. À décider avec les données Search Console (impressions sur « couvreur Vénissieux », etc.) **[GSC]**.

### 5.3 Signaux hors site

| Action | Pourquoi | Qui |
|---|---|---|
| Mettre à jour le numéro sur la fiche Google Business Profile | Cohérence NAP, appels depuis Maps | **[ENTREPRISE]** |
| Idem Facebook, Instagram, Pages Jaunes, annuaires artisans, devis en ligne | Cohérence NAP | **[ENTREPRISE]** |
| Vérifier que la fiche GBP indique Décines-Charpieu, les mêmes horaires (lun.-sam. 8 h-19 h), la zone desservie et le lien `https://www.jrenov.com` | Cohérence avec le JSON-LD | **[ENTREPRISE]** |
| Collecter des avis Google réels après chaque chantier | Premier facteur de visibilité locale dans Maps | **[ENTREPRISE]** |
| Publier les photos de chantier sur la fiche GBP | Activité de la fiche | **[ENTREPRISE]** |

---

## 6. C. Pages prestations

| Prestation | Page | Mots | Réalisations liées | FAQ | État | À enrichir |
|---|---|---|---|---|---|---|
| Couverture et rénovation de toiture | `/services/couverture` | 644 | ✅ plusieurs | 3 | Bon | Matériaux réellement posés (tuile, ardoise, bac acier) avec photos ; étapes d'un chantier ; title à raccourcir (69 car.) |
| Réparation de toiture | — (dans couverture et recherche de fuite) | — | — | — | **Manque** | Voir ci-dessous |
| Recherche de fuite et urgences | `/services/recherche-de-fuite` | 1021 | ✅ Brignais, Vénissieux | ✅ | Très bon | Déroulé d'une intervention d'urgence (mise hors d'eau, bâchage) uniquement avec les pratiques réelles **[ENTREPRISE]** |
| Zinguerie et gouttières | `/services/zinguerie` | 662 | ✅ Écully, Dagneux, Francheville, Meyzieu | 3 | Bon | Matériaux (zinc, alu, PVC) déjà traités dans un article : ajouter le lien |
| Démoussage | `/services/demoussage` | 633 | ✅ Genas, Tassin | 4 | Bon | Produits et méthode réellement utilisés **[ENTREPRISE]** ; lien vers l'article Val de Saône |
| Isolation | `/services/isolation` | 744 | ✅ Caluire, Chassieu | 3 | Bon | Lien vers l'article aides ; mention RGE uniquement si la certification existe **[ENTREPRISE]** |
| Fenêtres de toit | `/services/fenetres-de-toit` | 811 | ✅ Craponne, Décines, Lyon 3e | ✅ | Bon | Absente du formulaire de devis (M3) |

**Manque éditorial : « réparation de toiture ».** C'est une intention de recherche distincte (tuiles cassées, faîtage, solins) aujourd'hui répartie entre `/services/couverture` (qui parle surtout de réfection) et `/services/recherche-de-fuite`. Avant de créer une page, vérifier dans Search Console quelles requêtes « réparation toiture » apparaissent et sur quelle page **[GSC]**. Deux options :

1. Renforcer une section « Réparation » dans `/services/couverture` (sans nouvelle URL) : option par défaut, sans risque de cannibalisation.
2. Créer `/services/reparation-toiture` seulement si les impressions le justifient, avec les réalisations Vénissieux (tuiles cassées), Fontaines-sur-Saône (faîtage), Lyon 5e (solins).

**Charpente** : 2 réalisations (Saint-Priest, Oullins) mais aucune page. Décision commerciale déjà notée au Lot 4 **[ENTREPRISE]**.

**Maillage services → blog** : aucune page service ne renvoie vers les articles (M5). Ajouter un bloc « Pour aller plus loin » sur chaque service avec 1-2 articles liés, à partir de la correspondance qui existe déjà dans `lib/service-content.ts` (articles → services).

---

## 7. D. Réalisations

### État actuel

- 22 fiches dans `data/realisations.json` : titre, commune avec code postal, date (mois et année), catégorie, résumé, description (~3 phrases), une image, durée.
- Photos : vraisemblablement réelles (photos de smartphone, chantiers identifiables) **[ENTREPRISE]** à confirmer.
- Chaque fiche renvoie déjà vers ses services (`servicesForRealisation`) et vers la page locale de la commune quand elle existe (`localAreaForCity`). ✅
- Liens entrants : 3 à 9 par fiche. Les moins liées : Dagneux, Champagne-au-Mont-d'Or, Oullins (3).
- Badge « Garantie Décennale 10 ans » conditionné aux prestations couvertes (`showsDecennialBadge`). ✅

### Améliorations proposées (uniquement avec des informations réelles)

| Amélioration | Fichiers | Données nécessaires |
|---|---|---|
| Galerie de 3 à 6 photos (avant / pendant / après) au lieu d'une seule | `data/realisations.json` (champ `images`), `app/realisations/[slug]/page.tsx` | Photos **[ENTREPRISE]** |
| Structure « Situation de départ → Travaux réalisés → Résultat » | Idem | Description vérifiée **[ENTREPRISE]** |
| Bloc « Détails techniques » : matériaux, marques, surfaces, contraintes d'accès | Idem | Uniquement si connu et vérifié ; **ne jamais estimer** une surface ou une durée **[ENTREPRISE]** |
| Commune dans le H1 (« … à Villeurbanne ») | `app/realisations/[slug]/page.tsx` | Aucune (déjà dans les données) |
| Titles ≤ 60 caractères et descriptions ≤ 155 | `app/realisations/[slug]/page.tsx` (`generateMetadata`) ou champ dédié | Aucune |
| Lien « Autres chantiers à {commune} / dans le secteur » | `app/realisations/[slug]/page.tsx`, `lib/local-areas.ts` | Aucune |
| Vérifier la photo de la fiche Corbas (D6) | `data/realisations.json` | **[ENTREPRISE]** |
| Utiliser les 3 photos inutilisées (m2) | `data/realisations.json` | Confirmer à quel chantier elles appartiennent **[ENTREPRISE]** |
| Nouvelles fiches pour les chantiers récents (la plus récente date de septembre 2026) | `data/realisations.json` | Chantiers réels **[ENTREPRISE]** |

Règle : aucun chantier, surface, délai, certification ou avis client inventé. Un champ inconnu reste vide et n'est pas affiché.

---

## 8. E. Acquisition et conversion

### 8.1 Appels à l'action

| Emplacement | Desktop | Mobile |
|---|---|---|
| Header | ✅ « Urgence / Devis » + numéro, bouton « Devis Gratuit » | ❌ rien sans ouvrir le menu (M1) |
| Menu mobile | — | ❌ bouton « Appeler » hors écran, inaccessible (C2) |
| Hero accueil | ✅ Devis + Appeler | ✅ |
| Pages services / locales | ✅ CTA en haut et en bas | ✅ |
| Fiches réalisations | ✅ bouton d'appel | ✅ |
| Footer | ✅ numéro | ✅ |

Vérifié avec la PR #3 : les 159 liens `tel:` des 53 pages pointent vers `tel:+33761242793` ; un clic dans le header desktop n'est jamais bloqué (`defaultPrevented` faux).

**Correction proposée (C2 + M1), sans changer le design desktop** : ajouter une icône téléphone cliquable à côté du bouton menu sous 768 px, et rendre le menu mobile défilable (`max-h-[calc(100dvh-…)] overflow-y-auto`) ou placer « Appeler / Devis » en haut du menu. Une barre d'appel fixe en bas d'écran est une alternative, à arbitrer avec le bandeau cookies qui occupe déjà le bas.

### 8.2 Parcours de devis mobile

`/devis` : 3 étapes (prestation → détails du bien → coordonnées), Lighthouse 96, H1 visible en premier écran. Points d'amélioration :

- M3 : ajouter « Fenêtres de toit » et distinguer « Recherche de fuite » de « Urgence » si l'entreprise le souhaite, puis étendre la liste fermée de `lib/analytics.ts`. Les IDs de conversion Google Ads ne changent pas.
- Pré-sélectionner la prestation quand on arrive depuis une page service (`/devis?service=isolation`), pour raccourcir le parcours.
- Afficher le numéro d'appel pendant le formulaire : aujourd'hui il n'apparaît que sur l'écran de confirmation, après envoi (`app/devis/page.tsx`).

### 8.3 Mesure des conversions

| Événement | Vercel Analytics | Google Ads | État |
|---|---|---|---|
| Envoi devis / contact réussi | `quote_form_submit`, `contact_form_submit` | `AW-18401022050/3zwjCM7KnZcdEOKgpcZE` après consentement et `submissionId` | ✅ en production |
| Clic téléphone | `phone_click` avec `placement` | `AW-18401022050/xlbwCOjuo5sdEOKgpcZE` | PR #2 ouverte. Compatible avec la PR #3 (aucun fichier commun, fusion testée sans conflit) |
| Début de devis | `quote_form_start` | — | ✅ |

Après fusion des PR #2 et #3 : vérifier avec Google Tag Assistant qu'un clic sur le nouveau numéro déclenche bien la conversion téléphone (après acceptation des cookies). Les appels réellement aboutis ne sont pas mesurables par le site : seul un numéro de suivi Google ou l'extension d'appel le permettrait **[ENTREPRISE]**.

### 8.4 Cohérence site / SEO local / Google Ads

Les campagnes ne sont pas modifiées. Points à vérifier par l'entreprise **[ENTREPRISE]** :

- Le numéro des **extensions d'appel / composants Appel** de Google Ads doit passer au 07 61 24 27 93 en même temps que le site.
- Les URL finales des annonces devraient viser la page la plus proche de l'intention (service ou page locale) plutôt que l'accueil, qui est la page la plus lente sur mobile (M2).
- Cohérence des zones ciblées dans Ads avec les communes réellement servies (`/zones-intervention`).

---

## 9. État de chaque page importante

Mesures du crawl local (avec la PR #3). Les longueurs de title incluent le suffixe « | Jrenov ». ⚠️ = title > 65 ou description > 165 caractères. « Liens entrants » = nombre de pages qui lient la page (52 = lien présent dans le header ou le footer).

| URL | Title (car.) | Description (car.) | H1 | H2/H3 | Mots (main) | JSON-LD propre à la page | Liens entrants |
|---|---|---|---|---|---|---|---|
| `/` | 69 ⚠️ | 163 | Couvreur à Décines-Charpieu et dans l'Est lyonnais | 3/11 | 444 | — | 52 |
| `/services` | 49 | 171 ⚠️ | Nos prestations de couverture et de toiture | 3/9 | 394 | BreadcrumbList | 52 |
| `/services/couverture` | 69 ⚠️ | 169 ⚠️ | Rénovation & Réfection de Toiture autour de Décines-Charpieu | 6/12 | 644 | BreadcrumbList+Service+FAQPage | 52 |
| `/services/zinguerie` | 66 ⚠️ | 162 | Travaux de Zinguerie & Gouttières dans l'Est lyonnais | 6/12 | 662 | BreadcrumbList+Service+FAQPage | 52 |
| `/services/isolation` | 62 | 168 ⚠️ | Isolation de Toiture & Combles, de Décines-Charpieu à Lyon | 7/14 | 744 | BreadcrumbList+Service+FAQPage | 52 |
| `/services/demoussage` | 69 ⚠️ | 164 | Nettoyage & Démoussage de Toiture dans la métropole lyonnaise | 6/12 | 633 | BreadcrumbList+Service+FAQPage | 52 |
| `/services/recherche-de-fuite` | 64 | 170 ⚠️ | Recherche de fuite et urgence toiture | 10/17 | 1021 | BreadcrumbList+Service+FAQPage | 52 |
| `/services/fenetres-de-toit` | 62 | 146 | Fenêtres de toit : création, pose et remplacement | 8/8 | 811 | BreadcrumbList+Service+FAQPage | 52 |
| `/zones-intervention` | 61 | 158 | Nos zones d'intervention autour de Décines-Charpieu | 4/8 | 617 | BreadcrumbList | 52 |
| `/couvreur-decines-charpieu` | 70 ⚠️ | 168 ⚠️ | Couvreur à Décines-Charpieu | 9/18 | 900 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-meyzieu` | 60 | 176 ⚠️ | Couvreur à Meyzieu : toiture, rives et zinguerie | 9/17 | 869 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-villeurbanne` | 62 | 173 ⚠️ | Couvreur à Villeurbanne : rénover les toitures de maisons de ville | 9/17 | 873 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-lyon` | 66 ⚠️ | 148 | Couvreur à Lyon : immeubles, toits-terrasses et maisons de ville | 9/19 | 1007 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-genas` | 65 | 173 ⚠️ | Couvreur à Genas : entretien, démoussage et couverture | 9/16 | 816 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-chassieu` | 66 ⚠️ | 176 ⚠️ | Couvreur à Chassieu : couverture et isolation de toiture | 9/17 | 801 | BreadcrumbList+WebPage+Service | 52 |
| `/couvreur-saint-priest` | 58 | 179 ⚠️ | Couvreur à Saint-Priest : toiture, combles et charpente | 9/17 | 845 | BreadcrumbList+WebPage+Service | 52 |
| `/contact` | 54 | 167 ⚠️ | Contactez Jrenov | 1/6 | 162 | BreadcrumbList | 52 |
| `/devis` | 53 | 156 | Demande de devis en ligne | 1/8 | 93 | BreadcrumbList | 52 |
| `/plan-du-site` | 21 | 152 | Plan du site | 3/3 | 87 | BreadcrumbList | 52 |
| `/realisations` | 68 ⚠️ | 168 ⚠️ | Nos dernières réalisations | 22/3 | 742 | BreadcrumbList | 52 |
| `/blog` | 74 ⚠️ | 161 | Le Blog Toiture & Zinguerie | 8/3 | 392 | BreadcrumbList | 52 |
| `/mentions-legales` | 25 | 137 | Mentions Légales | 7/3 | 387 | BreadcrumbList (noindex) | 52 |
| 22 × `/realisations/*` | 62-89 (18 ⚠️) | 152-211 (16 ⚠️) | Titre du chantier, sans commune | 1/4-5 | 106-186 | BreadcrumbList | 3-9 |
| 8 × `/blog/*` | 71-90 (8 ⚠️) | 130-163 | Titre de l'article | 3-4/3 | 192-319 | BreadcrumbList+BlogPosting | 2 |

Toutes les pages : 1 seul H1, canonical correct, `index, follow` (sauf mentions légales), `og:image` présente, tous les `alt` renseignés, `RoofingContractor` + `WebSite` du layout.

---

## 10. Plan d'action 30 / 60 / 90 jours

Chaque lot technique fera l'objet d'une PR séparée, testée (TypeScript, lint, tests, build, contrôle navigateur) et non fusionnée automatiquement. Les modifications éditoriales passent par une validation de l'entreprise avant publication.

### 0-30 jours : conversion et cohérence

| # | Action | Type | Dépend de |
|---|---|---|---|
| 1 | Fusionner et déployer la PR #3 (numéro) | Technique | Validation |
| 2 | Mettre à jour le numéro sur GBP, Facebook, Instagram, annuaires, extensions d'appel Google Ads | Hors site | **[ENTREPRISE]** |
| 3 | Fusionner la PR #2, valider la conversion téléphone dans Tag Assistant avec le nouveau numéro | Technique | Validation |
| 4 | Corriger le menu mobile (C2) et ajouter un accès d'appel visible dans le header mobile (M1) | Technique | — |
| 5 | Ajouter « Fenêtres de toit » au formulaire de devis et à la liste d'analytics (M3) ; pré-sélection depuis les pages services | Technique | Choix des libellés **[ENTREPRISE]** |
| 6 | Carte Google Maps en clic pour charger (D3) | Technique | — |
| 7 | Search Console : export des requêtes et pages (16 derniers mois), rapport Pages, Signaux Web essentiels | Données | **[GSC]** |

### 30-60 jours : performance et maillage

| # | Action | Type |
|---|---|---|
| 8 | Accueil mobile : poster en image prioritaire, diagnostic et correction du CLS du Hero, vidéo désactivée sous 768 px si le gain est confirmé (M2) | Technique |
| 9 | Liens services et pages locales → articles (M5) | Technique |
| 10 | Titles ≤ 60 et descriptions ≤ 155 sur les pages signalées ⚠️, en priorisant celles qui ont des impressions dans GSC (D1, D2) | Éditorial |
| 11 | Commune dans le H1 des réalisations ; titles et descriptions des réalisations raccourcis | Technique |
| 12 | Contraste `amber-600` et cibles tactiles du footer (D4) ; `priority` sur la 1re image de `/realisations` (D5) | Technique |
| 13 | Décision sur le flux Facebook (accueil + réalisations uniquement ?) (D7) | **[ENTREPRISE]** |
| 14 | Retirer `public/logo.png` (m1) | Technique |

### 60-90 jours : contenu à forte valeur

| # | Action | Type |
|---|---|---|
| 15 | Galeries et détails techniques réels sur les réalisations (§ 7), en commençant par les communes des pages locales | Éditorial **[ENTREPRISE]** |
| 16 | Nouvelles réalisations depuis septembre 2026, en priorité dans les 7 communes et à Vaulx-en-Velin / Bron | Éditorial **[ENTREPRISE]** |
| 17 | Section ou page « Réparation de toiture » selon les données GSC (§ 6) | Éditorial **[GSC]** |
| 18 | Enrichir les articles existants qui ont des impressions (images réelles, liens, mise à jour des aides 2026) avant d'en écrire de nouveaux | Éditorial **[GSC]** |
| 19 | Page Vaulx-en-Velin ou Bron seulement si un chantier réel existe | Éditorial **[ENTREPRISE]** |
| 20 | Programme d'avis Google après chantier ; affichage sur le site seulement s'ils sont réels | **[ENTREPRISE]** |

---

## 11. Fichiers concernés

### Modifications techniques

| Fichier | Actions |
|---|---|
| `components/Header.tsx` | C2, M1 : menu mobile défilable, accès d'appel mobile |
| `components/Banner.tsx` | M2 : poster prioritaire, CLS, vidéo mobile |
| `app/devis/page.tsx` | M3 : prestations, pré-sélection, rappel du numéro |
| `lib/analytics.ts` | M3 : liste fermée des prestations |
| `app/contact/page.tsx` | D3 : carte en clic pour charger |
| `app/layout.tsx`, `components/FacebookFeed.tsx`, `app/page.tsx`, `app/realisations/page.tsx` | D7 : déplacement éventuel du flux Facebook |
| `app/realisations/[slug]/page.tsx` | H1 avec commune, métadonnées, galerie, liens de secteur |
| `app/realisations/page.tsx` | D5 : `priority` sur la première image |
| `app/services/*/page.tsx`, `lib/service-content.ts` | M5 : bloc d'articles liés |
| `app/blog/[slug]/page.tsx` | M5 : lien vers la page locale quand l'article cible un secteur |
| `app/globals.css` ou classes Tailwind des composants concernés | D4 : contraste |
| `public/logo.png` | m1 : suppression |
| `lib/structured-data.ts` | `geo`, `hasMap` si données fournies |

### Modifications éditoriales

| Fichier | Actions |
|---|---|
| `data/realisations.json` | Galeries, descriptions structurées, détails vérifiés, nouvelles fiches, photo Corbas |
| `data/post.json` | Enrichissement des articles, images, mise à jour annuelle des aides |
| `data/local-areas.ts` | Nouvelles réalisations par commune, futures communes |
| `app/services/couverture/page.tsx` | Section réparation |
| Metadata des pages ⚠️ (`app/**/page.tsx`, `data/local-areas.ts`) | Titles et descriptions |

### Déjà modifié (PR #3)

`lib/site.ts` (source unique du numéro et de `PHONE_HREF`) et les 22 fichiers qui l'utilisent.

---

## 12. Données à fournir

### Search Console **[GSC]**

- Requêtes et pages (impressions, clics, position) sur 16 mois, filtrées par page services, pages locales, réalisations, blog.
- Rapport *Pages* : URL non indexées et raisons.
- Rapport *Signaux Web essentiels* mobile (et Vercel Speed Insights).
- Requêtes « réparation toiture », « fuite toiture », « couvreur + commune » pour décider des pages à créer ou renforcer.

### Entreprise **[ENTREPRISE]**

- Confirmation que le 04 65 84 88 85 n'est plus utilisé, et liste des endroits hors site où il apparaît.
- Accès ou confirmation de la fiche Google Business Profile (adresse, horaires, zone, lien du site, numéro).
- Photos supplémentaires et détails techniques réels des chantiers publiés ; nouveaux chantiers depuis septembre 2026.
- Photo correcte du chantier de Corbas ; attribution des 3 photos inutilisées.
- Certifications réelles (RGE, Qualibat…) : à ne mentionner que si elles existent.
- Libellés souhaités pour le formulaire de devis (fenêtres de toit, recherche de fuite).
- Décision sur le flux Facebook et sur la charpente.
- Avis clients réels (Google) et accord pour les afficher.
