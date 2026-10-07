# Lot 3 — SEO local : Décines-Charpieu & Est lyonnais

> Réalisé le 7 octobre 2026. Suite de [`seo-technical-foundation.md`](./seo-technical-foundation.md).
> Backlog des prochaines communes : [`local-seo-map.md`](./local-seo-map.md).
> Rien n'a été commité ni poussé.

## 1. État de départ vérifié

Avant de commencer : ESLint propre, TypeScript propre, domaine `www.jrenov.com` (aucune occurrence de `jrenov.fr`), et tous les fichiers du Lot 2 présents (non commités). Aucune régression constatée, donc aucune correction du Lot 2 n'a été reprise.

---

## 2. Nouvelles URL

| URL | Mot-clé principal | Intention | Réalisation locale (data/realisations.json) | Angle éditorial |
|---|---|---|---|---|
| `/zones-intervention` | couvreur Est lyonnais / zone d'intervention | Hub géographique | Toutes, regroupées par commune et secteur | Siège, rayon ~50 km, secteurs |
| `/couvreur-decines-charpieu` | couvreur Décines-Charpieu | Local transactionnel (siège) | `remplacement-velux-ancien-decines` | Entreprise de la commune, adresse, raccords et fenêtres de toit |
| `/couvreur-meyzieu` | couvreur Meyzieu | Local transactionnel | `habillage-bandeaux-rive-alu-meyzieu` | Bas de toit : rives, bandeaux, gouttières |
| `/couvreur-villeurbanne` | couvreur Villeurbanne | Local transactionnel | `renovation-couverture-tuiles-villeurbanne` | Maisons de ville, couvertures anciennes, chantier en ville |
| `/couvreur-genas` | couvreur Genas | Local transactionnel | `demoussage-toiture-ecologique-genas` | Entretien, démoussage, puis couverture |
| `/couvreur-chassieu` | couvreur Chassieu | Local transactionnel | `isolation-combles-perdus-laine-roche-chassieu` | Isolation des combles + couverture |
| `/couvreur-saint-priest` | couvreur Saint-Priest | Local transactionnel | `traitement-charpente-bois-saint-priest` | Sous la toiture : charpente, puis couverture |

Variantes visées naturellement dans les contenus : « artisan couvreur », « entreprise de couverture », « toiture », « rénovation / réparation de toiture » + commune. Elles ne sont pas répétées mécaniquement.

### Titles et H1

| URL | Title (suffixe « \| Jrenov » ajouté) | H1 |
|---|---|---|
| `/` | Couvreur à Décines-Charpieu & dans l'Est lyonnais \| Jrenov | Couvreur à Décines-Charpieu et dans l'Est lyonnais |
| `/zones-intervention` | Zones d'intervention autour de Décines-Charpieu | Nos zones d'intervention autour de Décines-Charpieu |
| `/couvreur-decines-charpieu` | Couvreur à Décines-Charpieu, artisan installé dans la commune | Couvreur à Décines-Charpieu |
| `/couvreur-meyzieu` | Couvreur à Meyzieu – Toiture, rives & zinguerie | Couvreur à Meyzieu : toiture, rives et zinguerie |
| `/couvreur-villeurbanne` | Couvreur à Villeurbanne – Rénover une maison de ville | Couvreur à Villeurbanne : rénover les toitures de maisons de ville |
| `/couvreur-genas` | Couvreur à Genas – Démoussage & entretien de toiture | Couvreur à Genas : entretien, démoussage et couverture |
| `/couvreur-chassieu` | Couvreur à Chassieu – Toiture & isolation des combles | Couvreur à Chassieu : couverture et isolation de toiture |
| `/couvreur-saint-priest` | Couvreur à Saint-Priest – Toiture & charpente | Couvreur à Saint-Priest : toiture, combles et charpente |

---

## 3. Architecture technique

Next.js ne permet pas de segment partiel du type `app/couvreur-[ville]`. Les pages locales utilisent donc :

- **`app/[localSlug]/page.tsx`** : une route racine unique, avec `generateStaticParams()` sur `LOCAL_AREAS` et **`dynamicParams = false`**. Seuls les 6 slugs déclarés existent ; tout autre chemin racine inconnu (ex. `/couvreur-lyon`) renvoie une **vraie 404**. Les routes statiques existantes (`/services`, `/blog`…) restent prioritaires.
- **`data/local-areas.ts`** : contenu éditorial typé (`LocalArea`) rédigé commune par commune (intro, contexte, problèmes, prestations, réalisations, FAQ, communes voisines) et **ordre des sections propre à chaque page** (`sectionOrder`). Il contient aussi les secteurs du hub (`ZONE_SECTORS`).
- **`data/local-area-index.ts`** : index léger (slug, commune) pour les Client Components (page contact) et le footer, afin de ne pas envoyer le contenu éditorial au navigateur.
- **`lib/local-areas.ts`** : accès aux données et **`validateLocalAreas()`, exécutée au build**, qui échoue si :
  - une réalisation « locale » n'est pas située dans la commune de la page ;
  - une réalisation citée n'existe pas ;
  - une réalisation « voisine » est en réalité locale ;
  - un lien vise une page locale non publiée ;
  - l'index léger n'est pas synchronisé ;
  - un slug, title, description ou H1 est dupliqué.
- Composants partagés : `components/RealisationCard.tsx` (carte détaillée et carte compacte), `components/ContactCta.tsx`, `components/ServiceLocalLinks.tsx`.

---

## 4. Contenu et garde-fous

- **Aucune** adresse autre que le siège de Décines-Charpieu, aucun avis, aucune certification, aucun prix nouveau, aucune statistique locale.
- Les faits locaux utilisés sont des repères géographiques notoires : Grand Large et canal de Jonage (Décines / Meyzieu), quartiers de Villeurbanne, appartenance de Genas à la Communauté de communes de l'Est lyonnais, Eurexpo et aéroport de Lyon-Bron (Chassieu), Manissieux (Saint-Priest).
- Les faits de chantier (durées, matériaux, épaisseurs, dates) sont **tous repris de `data/realisations.json`**.
- Villeurbanne : la page indique explicitement que Jrenov **n'a pas d'établissement** à Villeurbanne et intervient depuis Décines-Charpieu.
- Saint-Priest : le chantier de charpente est expliqué, **sans** créer de page `/services/charpente`.
- Les réalisations des communes voisines sont toujours présentées avec leur commune (« Dans les communes voisines », « Chantiers à proximité »…) et sous forme de cartes compactes (titre + commune).

---

## 5. Pages modifiées

| Fichier | Modification |
|---|---|
| `lib/site.ts` | Title et description de l'accueil recentrés sur Décines-Charpieu et l'Est lyonnais |
| `components/Banner.tsx` | H1 : « Couvreur à Décines-Charpieu et dans l'Est lyonnais » ; badge « Artisan couvreur · Lyon & métropole » (rendu visuel inchangé) |
| `app/page.tsx` | Engagement « Basé à Décines-Charpieu » ; H2 services ; **nouvelle section « Qui sommes-nous ? »** (entreprise, siège, prestations, zone ~50 km, 3 derniers chantiers, liens vers les 6 pages locales, `/zones-intervention` et `/realisations`). Les titres d'engagements passent de `h3` à `p` (hiérarchie de titres) |
| `components/Header.tsx` | Barre supérieure : « Décines-Charpieu · Lyon & métropole » |
| `components/Footer.tsx` | Présentation recentrée (Décines-Charpieu, métropole, ~50 km) ; colonne Zone d'intervention = 6 pages locales + lien vers le hub (la liste textuelle non cliquable de 8 villes est supprimée) |
| `app/contact/page.tsx` | En-tête et encart d'appel recentrés ; encart « Zone d'intervention » harmonisé (message + 6 liens + hub), à la place de l'ancienne liste |
| `app/devis/page.tsx` | Sous-titre harmonisé |
| `app/services/{couverture,zinguerie,isolation,demoussage}/page.tsx` | **JSON-LD `Service`** et bloc de liens vers les pages locales pertinentes (sélection propre à chaque service) ; couverture : « Lyon et 30 km aux alentours » remplacé par le message de zone harmonisé |
| `lib/services.ts` | Clé et nom Schema.org par service ; correspondance catégorie de réalisation → service ; description du démoussage sans « haute pression » (contradictoire avec la page démoussage, qui parle de basse/moyenne pression) |
| `app/realisations/[slug]/page.tsx` | **Bloc « Points clés » supprimé** (identique sur 22 pages, « certifiés NF » non vérifié). Il est remplacé par des liens vers le service correspondant et la page locale correspondante, uniquement lorsqu'ils existent |
| `app/blog/[slug]/page.tsx` | **JSON-LD `BlogPosting`** |
| `lib/breadcrumb.ts`, `components/Breadcrumb.tsx`, `app/layout.tsx` | Fils d'Ariane complets calculés côté serveur ; pages locales rattachées à « Zones d'intervention » |
| `lib/structured-data.ts` | `serviceJsonLd`, `localPageJsonLd`, `blogPostingJsonLd`, `servedCities` exportée |
| `lib/content.ts` | `getRealisation`, `communeName`, types `Realisation` / `Post` |
| `app/sitemap.ts` | `/zones-intervention` + 6 pages locales (sans `lastModified`) |
| `app/plan-du-site/page.tsx` | Section « Zones d'intervention » (hub + 6 pages) |
| `package.json` | Script `check:local-duplication` |

### Pages créées
`app/[localSlug]/page.tsx` (6 URL), `app/zones-intervention/page.tsx`, `app/not-found.tsx`.

---

## 6. Données structurées

| Page | JSON-LD |
|---|---|
| Toutes | `RoofingContractor` (`#business`, siège de Décines-Charpieu) + `WebSite` (layout, inchangés) |
| Toutes sauf l'accueil et la 404 | `BreadcrumbList` |
| Pages locales | `WebPage` (`isPartOf` → `#website`, `about` → service) + `Service` (`provider` → `#business`, `areaServed` → la commune). **Aucune** entreprise ni adresse locale supplémentaire |
| `/services/*` (4) | `Service` : nom, description issue du site, `provider` → `#business`, `areaServed` = communes desservies, URL canonique. Ni prix, ni avis, ni note |
| `/blog/*` (8) | `BlogPosting` : `headline`, `description`, `datePublished` (date de `data/post.json` convertie en ISO), `author` (Jason Robba), `publisher` → `#business`, `mainEntityOfPage`. Pas d'image (aucune image d'article n'existe) |

## 7. Maillage interne

| De | Vers |
|---|---|
| Accueil | `/zones-intervention`, 6 pages locales, `/realisations`, 3 derniers chantiers |
| Footer (toutes les pages) | 6 pages locales + `/zones-intervention` |
| `/zones-intervention` | 6 pages locales + toutes les réalisations, par commune |
| Pages locales | 4 services, réalisation(s) locale(s), réalisations voisines, pages locales voisines, hub, `/realisations`, `/devis` |
| Réalisations | Page locale de la commune (si publiée) et service correspondant (si la correspondance est évidente) |
| Services | 3 ou 4 pages locales pertinentes + hub |
| 404 | Accueil, services, zones, réalisations, contact |
| Plan du site | Hub + 6 pages locales |

## 8. Sitemap

48 URL (41 avant). Ajouts : `/zones-intervention`, `/couvreur-decines-charpieu`, `/couvreur-meyzieu`, `/couvreur-villeurbanne`, `/couvreur-genas`, `/couvreur-chassieu`, `/couvreur-saint-priest`, **sans `lastModified`** (aucune date de contenu exploitable).

---

## 9. Vérifications

| Vérification | Résultat |
|---|---|
| `npx eslint .` | ✅ 0 erreur, 0 avertissement |
| `npx tsc --noEmit` | ✅ OK |
| `npm run build` | ✅ 58 pages générées (validation `validateLocalAreas()` passée) |
| HTTP 200 | `/`, `/zones-intervention`, les 6 pages locales, `/services`, `/realisations`, `/blog`, `/robots.txt`, `/sitemap.xml` |
| HTTP 404 | `/page-inexistante` et `/couvreur-lyon` (non publiée), avec `noindex` |
| Canonical | Identique à la route sur chaque page |
| H1 | Un seul H1 par page, unique |
| JSON-LD | Contenus validés (JSON valide, `@id` cohérents) |
| Breadcrumb | Pages locales : Accueil › Zones d'intervention › Couvreur à {commune} ; aucun lien vers une 404 |
| Crawl local | **49 URL internes, 0 lien cassé** ; toutes les URL du sitemap sont atteignables par les liens ; seule `/mentions-legales` (noindex) est hors sitemap, volontairement |
| Anti-duplication | ✅ Aucun bloc ni passage identique ≥ 100 caractères entre les 6 pages ; FAQ sans répétition ; similarité maximale des titles 0,56 et des descriptions 0,54 (seuil 0,6) |
| `jrenov.fr` | 0 occurrence dans le code |

### Contrôle anti-duplication

`scripts/check-local-duplication.mjs` (`npm run check:local-duplication`, avec `BASE_URL` pour cibler un serveur) :
- lit le sitemap, récupère les pages `/couvreur-*` rendues et compare uniquement le contenu de `<main>` ;
- signale les blocs identiques et les passages communs ≥ 100 caractères (nom de commune neutralisé), les titles et descriptions trop proches (Jaccard > 0,6) et les questions de FAQ répétées ;
- renvoie un code de sortie 1 en cas de problème.

Premier passage : **2 alertes** sur les titles (Décines-Charpieu ↔ Meyzieu à 0,75, Villeurbanne ↔ Genas à 0,67). Elles sont corrigées en réécrivant les titles de Décines-Charpieu et de Villeurbanne. Le badge du hero de Chassieu, identique à celui de Genas, a aussi été différencié.

Test de sensibilité : avec `MIN_CHARS=40`, le script détecte bien les éléments communs attendus (étapes de prise en charge, CTA, titres des réalisations voisines). Il est donc fonctionnel, et ces éléments restent sous le seuil de 100 caractères.

---

## 10. Prochaines zones à développer

Voir [`local-seo-map.md`](./local-seo-map.md). En résumé :
1. **Lyon** : trois réalisations réelles, une page unique.
2. **Vaulx-en-Velin** et **Bron** : dès qu'une réalisation ou un angle propre existe.
3. **Caluire-et-Cuire** (Sarking) et **Vénissieux** (urgence) : réalisations existantes, angles distincts.

Actions hors code recommandées :
- soumettre à nouveau le sitemap dans Search Console et demander l'indexation de `/zones-intervention` et des 6 pages locales ;
- vérifier que la fiche Google Business Profile utilise la même adresse et indique la zone desservie ;
- ajouter de nouveaux chantiers réels dans `data/realisations.json` : c'est ce qui débloque les pages suivantes.
