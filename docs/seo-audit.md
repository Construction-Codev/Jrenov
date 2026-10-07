# Audit SEO — jrenov.com

> Audit réalisé le 7 octobre 2026 sur le dépôt local (branche `master`, commit `c1d9e9e`, avec deux fichiers modifiés non commités : `app/mentions-legales/page.tsx` et `components/FacebookFeed.tsx`), ainsi que sur le site en ligne `https://www.jrenov.com` (lecture seule).
>
> Aucune page du site n'a été modifiée. Toutes les affirmations ci-dessous renvoient au code, aux données du dépôt ou à une vérification HTTP. Les éléments à confirmer par l'entreprise sont marqués **[À CONFIRMER]**.

---

## Sommaire

1. [État actuel](#état-actuel)
2. [Problèmes critiques](#problèmes-critiques)
3. [Quick wins](#quick-wins)
4. [Architecture SEO recommandée](#architecture-seo-recommandée)
5. [Services détectés](#services-détectés)
6. [Architecture géographique](#architecture-géographique)
7. [Pages existantes à améliorer](#pages-existantes-à-améliorer)
8. [Pages à créer](#pages-à-créer)
9. [Données structurées recommandées](#données-structurées-recommandées)
10. [Maillage interne recommandé](#maillage-interne-recommandé)
11. [Performance](#performance)
12. [Plan SEO 30 jours](#plan-seo-30-jours)
13. [Plan SEO 90 jours](#plan-seo-90-jours)
14. [Annexe : vérifications exécutées](#annexe--vérifications-exécutées)

---

# État actuel

## Socle technique

| Élément | Constat |
|---|---|
| Framework | Next.js **16.3.3** (Turbopack), React 19.2.8, TypeScript, Tailwind CSS 4 |
| Routeur | **App Router** (`app/`), aucun dossier `pages/` |
| Hébergement | Vercel (mentions légales) ; `jrenov.com` redirige en 308 vers `https://www.jrenov.com/` |
| Layout | Un seul layout racine `app/layout.tsx` : `Header` → `Breadcrumb` → `<main>` → `FacebookFeed` → `Footer` |
| Rendu | Toutes les pages sont statiques (SSG) avec revalidation 2 h, imposée par le `fetch` Facebook présent dans le layout |
| Données | `data/realisations.json` (22 chantiers), `data/post.json` (8 articles) |
| Formulaires | `/api/contact` et `/api/devis` (envoi via Resend) |
| Polices | `next/font/google` : Geist et Geist Mono (auto-hébergées, aucun appel bloquant à Google Fonts) |
| Langue | `<html lang="fr">` ✅ |
| Redirections | Aucune dans `next.config.ts` |
| Page 404 | Pas de `app/not-found.tsx` : c'est la 404 par défaut de Next.js qui s'affiche |

## Pages indexables (30 URL produites par le build)

| URL | Title rendu | H1 | Remarque |
|---|---|---|---|
| `/` | Jrenov - Couvreur Zingueur à Lyon (69) \| Rénovation & Urgence Toiture | « Votre Toiture, Notre Expertise Signée Jrenov » | H1 sans mot-clé ni localité |
| `/services/couverture` | Rénovation & Réparation de Couverture à Lyon (69) \| Jrenov | Rénovation & Réfection de Toiture à Lyon | OK |
| `/services/zinguerie` | Zinguerie & Pose de Gouttières à Lyon (69) \| Jrenov | Travaux de Zinguerie & Gouttières à Lyon | OK |
| `/services/isolation` | Isolation Toiture & Combles à Lyon (69) \| Jrenov | Isolation de Toiture & Combles à Lyon | OK |
| `/services/demoussage` | Nettoyage & Démoussage Toiture à Lyon (69) \| Jrenov | Nettoyage & Démoussage de Toiture à Lyon | OK |
| `/realisations` | Nos Réalisations & Chantiers de Toiture à Lyon \| Jrenov | Nos dernières réalisations | OK |
| `/realisations/[slug]` ×22 | `{titre} à {ville} \| Jrenov Lyon` | Titre du chantier | 2 URL renvoient une 404 (voir problèmes critiques) |
| `/blog` | Blog & Conseils Toiture Lyon \| Jrenov | Le Blog Toiture & Zinguerie | OK |
| `/blog/[slug]` ×8 | `{titre} \| Blog Jrenov` | Titre de l'article | OK |
| `/contact` | **Identique à l'accueil** | Contactez Jrenov | Page `"use client"`, donc aucune metadata propre |
| `/devis` | **Identique à l'accueil** | — | Page `"use client"`, donc aucune metadata propre |
| `/plan-du-site` | Plan du site \| Jrenov - Couvreur Lyon | Plan du site | Ne liste ni les réalisations ni le blog |
| `/mentions-legales` | Mentions Légales \| … | Mentions Légales | `noindex, follow` ✅ |

## Metadata

| Élément | État |
|---|---|
| `title` / `description` | Présents sur la plupart des pages ; absents sur `/contact` et `/devis` (ces pages héritent de ceux de l'accueil) |
| `metadataBase` | ❌ Absent |
| Canonical | ❌ Aucun, sur aucune page |
| Open Graph | ❌ Aucun (pas d'`og:title`, `og:image`, `og:locale`…) |
| Twitter Cards | ❌ Aucune |
| `robots.txt` | ❌ **404** en local comme en production (`https://www.jrenov.com/robots.txt`) |
| `sitemap.xml` | ⚠️ Présent mais **pointe vers le mauvais domaine** et ne liste que 8 URL sur 30 |
| Google Search Console | Balise de vérification présente dans le layout ✅ |
| Favicon | `app/favicon.ico` ✅ ; pas d'`icon.png`, d'`apple-icon` ni de manifest |

## Données structurées existantes

- **Accueil** : un bloc `RoofingContractor`. Mauvais domaine (`jrenov.fr`), propriété mal orthographiée (`telePhone` au lieu de `telephone`), `addressLocality: "Lyon"` alors que le siège est à Décines-Charpieu, pas d'adresse postale complète, pas de `geo`, pas d'horaires, `priceRange: "$$"` non justifié, `image` qui pointe vers un PNG de 5 Mo.
- **Toutes les pages sauf l'accueil** : un `BreadcrumbList` généré côté client depuis l'URL. Mauvais domaine, libellés bruts issus des slugs (« realisations », « remplacement velux ancien decines »).
- **Aucun** `Service`, `Article`/`BlogPosting`, `FAQPage`, `WebSite` ni `Organization` séparé.

## Contenu géographique existant

- Le site est positionné sur **« Lyon »**, dans tous les titles, H1 et descriptions.
- **Décines-Charpieu** n'apparaît que dans les mentions légales (non indexées) et dans une réalisation (`remplacement-velux-ancien-decines`).
- Zones citées, de façon incohérente selon l'endroit :
  - Footer : Lyon, Villeurbanne, Caluire-et-Cuire, Écully, Tassin-la-Demi-Lune, Oullins, Bron, « Mions & Est Lyonnais » (texte non cliquable).
  - Contact : Lyon, Villeurbanne, Caluire, Écully, Tassin, Sainte-Foy-lès-Lyon, Oullins-Pierre-Bénite, « Saint-Priest & Bron ».
  - Page couverture : « Lyon et 30 km aux alentours ».
  - Topbar : « Lyon & métropole (69) », alors qu'une réalisation a eu lieu à Dagneux (01).
- Les 22 réalisations couvrent 22 communes ou arrondissements : Villeurbanne, Écully, Tassin, Caluire, Craponne, Lyon 3e/5e/6e, Sainte-Foy, Brignais, Meyzieu, Saint-Priest, Vénissieux, Fontaines-sur-Saône, Dagneux, Chassieu, Champagne-au-Mont-d'Or, Francheville, Genas, Oullins, Décines-Charpieu, Corbas. **C'est le principal atout de preuve locale du site.**
- La carte Google Maps de `/contact` est centrée sur Lyon, pas sur Décines-Charpieu.

## Informations d'entreprise vérifiables dans le projet

Ce sont les seules informations utilisables dans les contenus et le balisage :

| Donnée | Source |
|---|---|
| Dénomination : JRENOV, EI, exploitant Jason William ROBBA | `app/mentions-legales/page.tsx` |
| SIREN 841 721 236, SIRET 841 721 236 00013, NAF 43.91B (couverture par éléments) | idem |
| Immatriculation : 07/05/2018 | idem |
| Adresse : 48 Ancien Chemin des Marais, 69150 Décines-Charpieu | idem |
| Téléphone : 04 65 84 88 85 ; e-mail : contact@jrenov.com | idem, header, footer |
| Assurance RC pro + garantie décennale (couverture, zinguerie, charpente), Auvergne-Rhône-Alpes | idem |
| Horaires : lundi–samedi 8h00–19h00, urgence fuite 7j/7 | `app/contact/page.tsx` |
| Réseaux : Facebook (`profile.php?id=61593675344403`), Instagram `@jrenov69` | `components/Footer.tsx` |

**Non vérifiables dans le projet, à ne pas utiliser sans confirmation** : certification RGE ou Qualibat, avis clients, nombre de chantiers, existence d'une fiche Google Business Profile, matériaux « certifiés NF » (affirmé de façon générique sur chaque réalisation).

---

# Problèmes critiques

### C1. Le site déclare un domaine qui appartient à une autre entreprise 🔴

Le sitemap (`app/sitemap.ts:4`), le JSON-LD de l'accueil (`app/page.tsx:73-75`) et le fil d'Ariane (`components/Breadcrumb.tsx:40,46`) utilisent tous `https://jrenov.fr`.

Vérification HTTP : **`https://www.jrenov.fr` est le site d'une autre société** (title « Salle de bains Pornic - Création, Rénovation, Aménagement sur mesure », serveur Apache). Le domaine réel du site est `https://www.jrenov.com`.

Conséquences :
- toutes les URL du sitemap sont hors domaine, donc ignorées par Google ;
- le `RoofingContractor` et les `BreadcrumbList` associent l'entité Jrenov au site d'un tiers ;
- l'image déclarée (`https://jrenov.fr/logo.png`) n'existe pas.

### C2. Le build de production échoue (déploiement bloqué) 🔴

La modification non commitée de `components/FacebookFeed.tsx:3` importe `FacebookPost` depuis `@/lib/facebook`, qui ne l'exporte pas (le type est dans `@/types/facebook`). `next build` s'arrête sur `TS2724`. Tant que cette erreur n'est pas corrigée, aucun déploiement n'est possible. Ce n'est pas un problème SEO en soi, mais cela bloque toute correction SEO.

### C3. Deux réalisations sont en 404 alors qu'elles sont liées depuis `/realisations` 🔴

Les slugs `remplacement-tuiles-cassées-orage-venissieux` et `creation-verrière-toit-lyon-3` contiennent des caractères accentués. Ils renvoient une **404 en production** (vérifié sur `www.jrenov.com`) comme en local, quelle que soit la normalisation Unicode testée (NFC ou NFD). Ce sont deux liens internes cassés, dont la seule page « Urgence » du site.

### C4. Pas de `robots.txt` et un sitemap incomplet 🔴

- `/robots.txt` renvoie une 404.
- Le sitemap ne contient que 8 URL. Il manque `/realisations`, `/blog`, les 22 réalisations et les 8 articles, soit **30 URL indexables sur 38 absentes**.
- `lastModified: new Date()` change à chaque build, ce qui envoie à Google un faux signal de fraîcheur.

### C5. Positionnement géographique décalé par rapport à l'objectif 🟠

L'entreprise est à Décines-Charpieu, mais le site ne cible que « Lyon ». Le mot « Décines » n'apparaît dans aucun title, H1 ni contenu indexable (hors une réalisation). Le JSON-LD donne `addressLocality: "Lyon"`. Pour le pack local Google (Maps), la proximité avec l'adresse de la fiche Google Business Profile et la cohérence NAP (nom, adresse, téléphone) sont déterminantes. Le site actuel ne renforce pas Décines-Charpieu ni l'Est lyonnais, c'est-à-dire la zone où Jrenov peut le plus facilement se classer.

### C6. `/contact` et `/devis` sans metadata propres (titles dupliqués) 🟠

Ces deux pages sont entièrement `"use client"`. Elles ne peuvent donc pas exporter `metadata` et héritent du title et de la description de l'accueil. Trois pages partagent ainsi le même title.

### C7. Aucun canonical ni `metadataBase` 🟠

Il n'y a aucun canonical alors que deux domaines (`jrenov.com` / `www`) et des variantes d'URL (paramètres, slash final) existent. Sans `metadataBase`, il est impossible d'ajouter proprement des Open Graph images ou des canonicals relatifs (la documentation Next 16 indique qu'une URL relative sans `metadataBase` provoque une erreur de build).

### C8. Fil d'Ariane défaillant 🟠

`components/Breadcrumb.tsx` :
- l'élément « Nos Services » pointe vers **`/services`, qui renvoie une 404** : c'est un lien cassé sur les 4 pages services ;
- sur les réalisations et articles, les libellés sont les slugs bruts (« realisations », « remplacement velux ancien decines ») ;
- le composant est client, mais il est rendu côté serveur, donc le JSON-LD est bien présent dans le HTML : ce point est correct.

### C9. Articles de blog : syntaxe Markdown affichée brute 🟠

`app/blog/[slug]/page.tsx:51-56` ne transforme que les lignes `### `. Les `**gras**` et les listes `- ` présents dans 6 articles sur 8 s'affichent tels quels (astérisques visibles). C'est un signal de qualité faible pour l'utilisateur comme pour Google.

### C10. Affirmations non vérifiables dans le contenu 🟠

- L'article `aide-financiere-isolation-toiture-renovation-rhone` laisse entendre que Jrenov est **RGE** (« Un couvreur qualifié RGE vous accompagne… ») alors qu'aucune certification n'apparaît dans le projet. **[À CONFIRMER]**
- `app/realisations/[slug]/page.tsx:120-136` affiche sur chacune des 22 réalisations le même bloc « Matériaux haute qualité certifiés NF / Respect strict des normes DTU / Contrôle d'étanchéité ». Ce texte est générique et dupliqué, et la mention « certifiés NF » n'est pas vérifiable.
- Les articles « prix au m² » et « démoussage » donnent des fourchettes de prix (70–200 €/m², 15–35 €/m²). Ces chiffres figurent déjà dans le projet, mais **[À CONFIRMER]** qu'ils correspondent à la réalité de Jrenov.

---

# Quick wins

Classés par rapport impact/effort décroissant.

| # | Action | Fichier(s) | Effort |
|---|---|---|---|
| 1 | Créer une constante unique `SITE_URL = "https://www.jrenov.com"` et l'utiliser partout (sitemap, JSON-LD, breadcrumb, `metadataBase`) | `lib/site.ts` (nouveau), `app/sitemap.ts`, `app/page.tsx`, `components/Breadcrumb.tsx`, `app/layout.tsx` | 30 min |
| 2 | Corriger l'import de type dans `FacebookFeed.tsx` pour débloquer le build | `components/FacebookFeed.tsx` | 2 min |
| 3 | Ajouter `app/robots.ts` (allow all, lien vers le sitemap, `disallow: /api/`) | `app/robots.ts` | 10 min |
| 4 | Générer le sitemap depuis les données JSON (réalisations + blog) avec des dates réelles | `app/sitemap.ts` | 30 min |
| 5 | Renommer les 2 slugs accentués en ASCII et ajouter des redirections 301 depuis les anciennes URL | `data/realisations.json`, `next.config.ts` | 15 min |
| 6 | Ajouter `metadataBase`, `alternates.canonical` par page, `openGraph` et `twitter` par défaut dans le layout | `app/layout.tsx`, chaque page | 1 h |
| 7 | Donner des metadata à `/contact` et `/devis` via un `layout.tsx` de segment (sans toucher au composant client) | `app/contact/layout.tsx`, `app/devis/layout.tsx` | 15 min |
| 8 | Corriger le JSON-LD `RoofingContractor` : `telephone`, adresse complète de Décines, `areaServed` en liste de villes, `sameAs`, `openingHoursSpecification`, `@id` | `app/page.tsx` (ou layout) | 30 min |
| 9 | Corriger le breadcrumb : libellés depuis les données (titre réel), suppression ou correction du lien `/services` | `components/Breadcrumb.tsx` | 45 min |
| 10 | Rendre le gras et les listes dans les articles (mini-parseur ou rendu Markdown) | `app/blog/[slug]/page.tsx` | 45 min |
| 11 | Corriger `alt="Logo RENOV"` en « Jrenov » et l'alt Facebook « Protection Nuisibles » (copier-coller d'un autre projet) | `components/Header.tsx:55`, `components/FacebookFeed.tsx:58` | 5 min |
| 12 | Renouveler le token Meta (erreur 190/463, token expiré) : le flux Facebook est actuellement masqué | `.env` / Vercel | 15 min |
| 13 | Compresser `public/logo.png` (6000×6000 px, 5 Mo) en un PNG/WebP 512 px | `public/logo.png` | 10 min |

---

# Architecture SEO recommandée

## Principes

1. **Conserver toutes les URL existantes** : `/services/couverture`, etc. ont un historique d'indexation. Aucune migration d'URL n'est nécessaire, sauf pour les 2 slugs accentués.
2. **Une intention = une page.** Pas de pages ville × service en masse.
3. **Pages locales uniquement si le contenu est réellement unique** : réalisations dans la commune, distance et délai depuis Décines, typologies de toitures locales, articles liés. Pas de remplacement automatique d'un nom de ville dans un gabarit.
4. **Recentrer l'entité sur Décines-Charpieu et l'Est lyonnais**, avec Lyon et la métropole comme zone élargie.
5. **Les réalisations servent de preuve locale** : chaque page locale s'appuie sur des chantiers réels.

## Arborescence cible

```
/                                   Couvreur à Décines-Charpieu & Est lyonnais (marque + local principal)
│
├── /services                        [À CRÉER] Hub des prestations (corrige aussi la 404 du breadcrumb)
│   ├── /services/couverture         Couvreur / rénovation et réparation toiture        (existant)
│   ├── /services/zinguerie          Zinguerie, gouttières, chéneaux, noues, solins     (existant)
│   ├── /services/demoussage         Nettoyage, démoussage, hydrofuge                   (existant)
│   ├── /services/isolation          Isolation toiture : sarking, combles               (existant)
│   ├── /services/recherche-de-fuite [À CRÉER] Fuite toiture, urgence, bâchage, mise hors d'eau
│   ├── /services/fenetres-de-toit   [À CRÉER] Velux, verrières : pose et remplacement
│   ├── /services/charpente          [À CRÉER — phase 2] Traitement et renforcement de charpente
│   └── /services/etancheite-toit-terrasse [PHASE 3, si confirmé] Étanchéité toit plat
│
├── /zones-intervention              [À CRÉER] Hub géographique : carte, liste des communes, réalisations par secteur
│   ├── /couvreur-decines-charpieu   [À CRÉER — priorité 1]
│   ├── /couvreur-meyzieu            [À CRÉER — A]
│   ├── /couvreur-villeurbanne       [À CRÉER — A]
│   ├── /couvreur-vaulx-en-velin     [À CRÉER — A]
│   ├── /couvreur-bron               [À CRÉER — A]
│   ├── /couvreur-genas              [À CRÉER — A]
│   ├── /couvreur-chassieu           [À CRÉER — A]
│   ├── /couvreur-saint-priest       [À CRÉER — A]
│   └── /couvreur-lyon               [À CRÉER — A, page dédiée à Lyon intra-muros]
│
├── /realisations                    (existant) + filtres par service et par commune
│   └── /realisations/[slug]         (existant) liens vers le service et la page ville
│
├── /blog                            (existant)
│   └── /blog/[slug]                 (existant) liens contextuels vers les services
│
├── /contact   /devis                (existants)
└── /plan-du-site  /mentions-legales (existants)
```

**Choix d'URL locale : `/couvreur-[ville]`** (et non `/zones-intervention/[ville]`). L'URL correspond exactement à la requête dominante (« couvreur meyzieu »), reste courte et ne dépend pas du nom du hub. Le hub `/zones-intervention` relie toutes ces pages. Les deux options sont valables ; l'important est de ne pas changer d'avis après mise en ligne.

---

# Services détectés

Seules les prestations **attestées par le contenu du projet** sont retenues.

| Service | Preuves dans le projet | Page actuelle | Statut |
|---|---|---|---|
| Couverture (tuiles terre cuite/béton, ardoise, bac acier, faîtage) | Page dédiée, 5 réalisations (Villeurbanne, Sainte-Foy, Fontaines, Champagne, Corbas), article prix | `/services/couverture` | ✅ Existant |
| Zinguerie (gouttières zinc/alu/PVC/cuivre, chéneaux, noues, abergements, solins, bandeaux et rives) | Page dédiée, 6 réalisations, article gouttières | `/services/zinguerie` | ✅ Existant |
| Nettoyage, démoussage, hydrofuge | Page dédiée, 2 réalisations (Tassin, Genas), article Val de Saône | `/services/demoussage` | ✅ Existant |
| Isolation toiture (sarking, combles perdus et aménagés) | Page dédiée, 2 réalisations (Caluire, Chassieu), 2 articles | `/services/isolation` | ✅ Existant |
| Recherche de fuite, urgence, bâchage, mise hors d'eau | Encart de la page couverture, title du layout, formulaires (« Urgence fuite »), 2 réalisations (Brignais, Vénissieux), 2 articles | ❌ Aucune page dédiée | 🆕 À créer (priorité haute) |
| Fenêtres de toit, Velux, verrières | 3 réalisations (Craponne, Lyon 3e, Décines), 1 article, mention dans zinguerie (abergements) | ❌ Aucune | 🆕 À créer |
| Charpente (traitement insecticide, renforcement, chevrons, moisage) | 2 réalisations (Saint-Priest, Oullins), assurance décennale couvrant la charpente | ❌ Aucune | 🆕 Phase 2 **[À CONFIRMER : activité régulière ?]** |
| Étanchéité toit-terrasse (bicouche élastomère) | 1 réalisation (Lyon 6e), mention « toitures plates » sur la page couverture | ❌ Aucune | ⏸ Phase 3 **[À CONFIRMER]** |

**Non retenus** (aucune preuve dans le projet) : désamiantage, ravalement de façade, couverture de bâtiments industriels en volume, pose de panneaux solaires, peinture de toiture.

## Architecture de mots-clés par service

Volumes non mesurés ici : à valider avec Google Search Console, Keyword Planner ou un outil tiers. Les intentions sont qualitatives.

### Couverture → `/services/couverture`
- **Intention principale** : « couvreur » + ville / « entreprise de couverture » + ville
- **Secondaires** : rénovation toiture, réfection toiture, réparation toiture, remplacement tuiles, couvreur tuile, toiture ardoise, faîtage, prix rénovation toiture m²
- **Cannibalisation** : avec l'accueil (title « Couvreur Zingueur à Lyon ») et l'article `prix-renovation-toiture-m2-lyon-devis`. **Recommandation** : l'accueil vise « couvreur Décines / Est lyonnais » (marque + local), la page service vise « rénovation / réparation toiture », l'article vise « prix ».
- **Locaux** : couvreur Décines-Charpieu, couvreur Meyzieu, rénovation toiture Villeurbanne, réparation toiture Bron…

### Zinguerie → `/services/zinguerie`
- **Principale** : couvreur zingueur / zinguerie + ville
- **Secondaires** : pose gouttière, remplacement gouttière zinc, gouttière alu, chéneau zinc, noue zinc, abergement cheminée, solin, habillage bandeau de rive
- **Cannibalisation** : légère avec l'article `quand-remplacer-gouttieres-zinc-pvc-alu` (intention informationnelle : à conserver, avec un lien vers le service). Un sous-sujet « fuite de cheminée » sera à arbitrer avec la future page « recherche de fuite » : l'abergement reste dans zinguerie, le diagnostic de fuite va dans recherche de fuite.
- **Locaux** : zingueur Décines, gouttière Meyzieu, gouttières Est lyonnais

### Nettoyage / démoussage → `/services/demoussage`
- **Principale** : démoussage toiture + ville
- **Secondaires** : nettoyage toiture, traitement hydrofuge toiture, traitement anti-mousse, entretien toiture, prix démoussage m²
- **Cannibalisation** : avec l'article Val de Saône (titre « Quand et comment faire démousser sa toiture… ») : article informationnel, à garder en lien vers la page service.
- **Locaux** : démoussage toiture Genas, nettoyage toiture Décines, démoussage Meyzieu

### Isolation → `/services/isolation`
- **Principale** : isolation toiture + ville
- **Secondaires** : sarking, isolation par l'extérieur toiture, isolation combles perdus, isolation rampants, soufflage
- **Cannibalisation** : avec l'article sarking. Le service porte la conversion, l'article porte l'explication.
- ⚠️ Les aides (MaPrimeRénov', CEE) exigent une certification RGE. Ne pas positionner la page sur les aides tant que la certification n'est pas confirmée.
- **Locaux** : isolation toiture Lyon Est, isolation combles Chassieu

### Recherche de fuite / urgence → `/services/recherche-de-fuite` (à créer)
- **Principale** : fuite toiture + ville / recherche de fuite toiture
- **Secondaires** : couvreur urgence, réparation fuite toit, infiltration toiture, bâchage toiture urgence, dégâts toiture orage ou grêle, mise hors d'eau
- **Opportunité forte** : intention transactionnelle et urgente, CTA téléphone, clients prêts à appeler. L'offre est déjà affichée partout (« urgence 7j/7 ») mais aucune page ne la porte.
- **Cannibalisation** : avec l'article `comment-detecter-fuite-toiture-lyon` (informationnel) et l'article « urgence Ouest Lyonnais ». Repositionner ce dernier ou le relier fortement à la page service.

### Fenêtres de toit → `/services/fenetres-de-toit` (à créer)
- **Principale** : pose velux + ville / remplacement velux
- **Secondaires** : fenêtre de toit, verrière toit, installation velux combles
- **Attention marque** : « Velux » est une marque déposée. L'utiliser comme mot-clé descriptif est courant, mais il ne faut pas laisser penser à un partenariat officiel **[À CONFIRMER : installateur agréé ?]**.

### Charpente → `/services/charpente` (phase 2)
- **Principale** : traitement charpente + ville / réparation charpente
- **Secondaires** : capricornes, vrillettes, renforcement charpente, remplacement chevrons
- À créer seulement si l'activité est confirmée comme régulière.

---

# Architecture géographique

## Méthode

Centre : **Décines-Charpieu (69150)**, siège déclaré. Rayon d'environ 50 km. Les distances sont approximatives (à vol d'oiseau, à vérifier) et les populations des ordres de grandeur INSEE récents. La priorité combine la proximité, la population, la pertinence commerciale (habitat individuel à toiture, présence de réalisations), le potentiel de recherche et le risque de cannibalisation.

**Constat clé** : Décines est au cœur de l'Est lyonnais. Les communes limitrophes (Meyzieu, Vaulx-en-Velin, Chassieu, Genas, Jonage) sont denses, avec beaucoup de pavillons, et sont **bien moins disputées que « couvreur Lyon »**. C'est là que Jrenov a le meilleur rapport potentiel/difficulté.

## Priorité A — prioritaires (pages dédiées dans les 90 jours)

| Commune | Distance approx. | Pop. approx. | Réalisation(s) existante(s) | Justification |
|---|---|---|---|---|
| **Décines-Charpieu** | 0 km | ~29 000 | ✅ Velux | Siège, cœur de la fiche Google Business Profile, priorité absolue |
| **Meyzieu** | ~4 km | ~35 000 | ✅ Bandeaux alu | Limitrophe, très pavillonnaire |
| **Vaulx-en-Velin** | ~5 km | ~52 000 | — | Limitrophe, forte population |
| **Chassieu** | ~5 km | ~10 500 | ✅ Isolation combles | Limitrophe, pavillonnaire |
| **Genas** | ~6 km | ~13 000 | ✅ Démoussage | Limitrophe, pavillonnaire aisé |
| **Bron** | ~7 km | ~43 000 | — (cité au footer) | Proche, forte population |
| **Villeurbanne** | ~8 km | ~155 000 | ✅ Couverture tuiles | 2e ville du département, forte demande |
| **Saint-Priest** | ~10 km | ~48 000 | ✅ Charpente | Grande commune de l'Est |
| **Lyon** | ~10–12 km | ~520 000 | ✅ Lyon 3e, 5e, 6e | Volume maximal mais forte concurrence : **une seule page Lyon** au départ, pas de pages par arrondissement |

## Priorité B — secondaires (pages après validation des A, ou section du hub)

| Commune | Distance approx. | Réalisation | Remarque |
|---|---|---|---|
| Jonage | ~8 km | — | Limitrophe, petite commune : section du hub d'abord |
| Rillieux-la-Pape | ~10 km | — | ~31 000 hab. |
| Caluire-et-Cuire | ~11 km | ✅ Sarking | ~43 000 hab. |
| Vénissieux | ~12 km | ✅ Urgence orage | ~66 000 hab. |
| Miribel / Beynost / Saint-Maurice-de-Beynost (01) | ~10–14 km | — | Côtière de l'Ain, pavillonnaire : vérifier que l'Ain est bien dans la zone |
| Saint-Bonnet-de-Mure / Saint-Laurent-de-Mure | ~12–15 km | — | Pavillonnaire |
| Mions | ~13 km | — | Cité au footer |
| Corbas | ~14 km | ✅ Bac acier | |
| Saint-Fons | ~13 km | — | |
| Pusignan | ~12 km | — | |

## Priorité C — longue traîne / plus tard

- **Ouest et nord lyonnais** (~15–25 km, de l'autre côté de Lyon) : Écully ✅, Tassin ✅, Sainte-Foy ✅, Francheville ✅, Craponne ✅, Oullins-Pierre-Bénite ✅, Brignais ✅, Champagne-au-Mont-d'Or ✅, Fontaines-sur-Saône ✅, Neuville-sur-Saône. Ces communes ont des réalisations, mais elles sont plus loin de Décines et chacune fait face à des couvreurs locaux. Elles restent valorisées via les réalisations et les articles (« Ouest lyonnais », « Val de Saône »), sans page dédiée au départ.
- **Ain** (~15–35 km) : Montluel, Dagneux ✅, Neyron, Meximieux.
- **Nord-Isère** (~15–40 km) : Pont-de-Chéruy, Tignieu-Jameyzieu, Charvieu-Chavagneux, Crémieu, Heyrieux, Saint-Quentin-Fallavier, Villefontaine, L'Isle-d'Abeau, Bourgoin-Jallieu.
- **Limites du rayon** (~30–45 km) : Vienne, Givors, Villefranche-sur-Saône. Faible pertinence : déplacements longs, concurrence locale établie.
- Autres : Feyzin, Jons, Colombier-Saugnieu.

**[À CONFIRMER]** jusqu'où Jrenov se déplace réellement : la page couverture dit « 30 km ». Ne pas publier de pages locales pour des communes où l'entreprise ne veut pas intervenir.

## Risque de cannibalisation géographique

- L'accueil, `/couvreur-decines-charpieu` et `/couvreur-lyon` ne doivent pas viser la même requête :
  - **Accueil** : marque + « couvreur Est lyonnais / Décines-Charpieu et alentours » (requête large).
  - **`/couvreur-decines-charpieu`** : page locale détaillée (quartiers, Charpieu, Grand Large, proximité du stade, typologie pavillonnaire).
  - **`/couvreur-lyon`** : Lyon intra-muros (immeubles, toitures de canuts, arrondissements desservis).
- Si l'accueil reste centré sur Décines, la page Décines peut éventuellement être supprimée au profit de l'accueil. À arbitrer selon le contenu disponible ; par défaut, conserver les deux avec des angles distincts.

---

# Pages existantes à améliorer

### Accueil `/`
- H1 sans mot-clé : « Votre Toiture, Notre Expertise Signée Jrenov ». Proposition : « Couvreur à Décines-Charpieu et dans l'Est lyonnais » (en conservant le design et le sous-titre).
- Très peu de texte indexable : un bandeau d'engagements, 4 cartes, un CTA. Ajouter, sans casser le design, une section de présentation (entreprise individuelle depuis 2018, siège à Décines, zone), un bloc « dernières réalisations » (3 cartes issues du JSON) et un bloc « zones d'intervention » avec liens.
- Les engagements sont en `<h3>` avant le premier `<h2>` : hiérarchie inversée.
- Pas de lien vers `/realisations` ni `/blog` dans le corps de la page.
- Title à faire évoluer : `Couvreur à Décines-Charpieu & Lyon Est | Jrenov — Toiture, Zinguerie`.

### Pages services (×4)
- Ajouter une **FAQ** réelle par service (questions issues des appels clients **[À CONFIRMER]**).
- Ajouter un bloc **« Réalisations de ce type »** (filtrer `realisations.json` par catégorie).
- Ajouter des liens vers les articles liés et vers les autres services (couverture ↔ zinguerie ↔ démoussage).
- Ajouter une mention de zone avec liens vers les pages villes A.
- Ajouter un JSON-LD `Service`.
- Les titres de bandeau CTA sont en `<h3>` après des `<h2>` de section : acceptable, mais ils peuvent passer en `<p>` stylé pour une hiérarchie plus propre.
- Couverture : « Pose de l'Écran & Liteonnage » → faute : « Litonnage ».
- Zinguerie : la mention Velux (abergements) devra renvoyer à la future page fenêtres de toit.
- Isolation : « Jusqu'à 30 % d'économies » est une affirmation générique (ordre de grandeur ADEME) ; à nuancer ou sourcer.

### `/realisations` et `/realisations/[slug]`
- Renommer les 2 slugs accentués (avec redirections 301).
- Descriptions courtes (170 à 300 caractères) : enrichir chaque chantier (contexte, problème, solution, matériaux, photos avant/après si disponibles **[À CONFIRMER]**).
- Remplacer le bloc « Points clés » identique sur 22 pages par des points spécifiques au chantier (champ `highlights` dans le JSON), ou le supprimer.
- Ajouter un lien vers la page service correspondant à la catégorie et vers la page ville quand elle existe.
- Titles du type « … à Villeurbanne (69100) | Jrenov Lyon » : retirer le code postal du title (gain de longueur) et garder « Jrenov ».
- Le H1 ne contient pas la ville ; il pourrait l'intégrer naturellement.
- Ajouter une galerie quand plusieurs photos existent (`3velux.jpg` / `3velux2.jpg`, `verriere.jpg` / `verriere2.jpg`, `isolation.jpg` / `isolation2.jpg` : 3 images ne sont pas utilisées).
- `/realisations` : ajouter un filtrage ou un regroupement par service et par secteur (Est lyonnais, Lyon, Ouest…).

### `/blog` et `/blog/[slug]`
- Corriger le rendu Markdown (gras, listes).
- Ajouter des liens contextuels vers les services dans chaque article.
- Ajouter un JSON-LD `BlogPosting` (auteur Jason Robba, dates en ISO).
- Stocker les dates en ISO (`2026-02-15`) et les formater à l'affichage.
- Ajouter une image principale par article (des images de réalisations existent).
- Corriger les fautes : « rembourseable » → « remboursable », « cumulo-compatibles » → « cumulables ».
- Valider ou retirer l'allusion RGE et les fourchettes de prix **[À CONFIRMER]**.
- `/blog` n'a pas de paragraphe d'introduction.

### `/contact`
- Ajouter des metadata via `app/contact/layout.tsx`.
- La fiche « Siège social : Métropole de Lyon & Rhône (69) » est vague : afficher l'adresse réelle de Décines (elle est déjà publique dans les mentions légales) **[À CONFIRMER : souhait d'affichage]**.
- Harmoniser la liste des communes avec le footer et le futur hub.
- Centrer l'iframe Maps sur Décines-Charpieu, ou mieux, sur la fiche Google Business Profile si elle existe.

### `/devis`
- Ajouter des metadata via `app/devis/layout.tsx`.
- Code postal pré-rempli à `69000` : envisager `69150` ou un champ vide.

### `/plan-du-site`
- Ajouter réalisations, blog et futures pages locales (ou générer la page depuis les mêmes données que le sitemap).

### Composants globaux
- **Header** : `alt="Logo RENOV"` → « Jrenov » ; topbar « Lyon & métropole (69) » → « Décines-Charpieu, Lyon & Est lyonnais ». Le menu déroulant ne fonctionne qu'au survol et le bouton n'a pas `aria-expanded` (accessibilité au clavier).
- **Footer** : rendre les communes cliquables vers les pages locales une fois créées ; remplacer « Lyon et dans tout le Rhône » par la zone réelle.
- **Breadcrumb** : voir C8.
- **FacebookFeed** : alt « Publication Protection Nuisibles » (reliquat d'un autre projet), `<img>` non optimisé, token Meta expiré.

---

# Pages à créer

Par ordre de priorité. Chaque page doit avoir un contenu original, des preuves (réalisations) et un CTA.

| Priorité | URL | Intention | Contenu minimal requis |
|---|---|---|---|
| 1 | `/services` | Hub prestations | Présentation des 4 à 6 services, liens. Corrige la 404 du breadcrumb |
| 2 | `/services/recherche-de-fuite` | Fuite / urgence toiture | Signes, diagnostic, bâchage, délais (les engagements déjà affichés : 24 h, 7j/7), réalisations Brignais et Vénissieux, liens vers 2 articles |
| 3 | `/zones-intervention` | Hub géographique | Carte, communes A/B/C, réalisations regroupées par secteur |
| 4 | `/couvreur-decines-charpieu` | Local siège | Ancrage local réel, réalisation Décines, chantiers voisins (Meyzieu, Chassieu, Genas) |
| 5 | `/couvreur-meyzieu`, `/couvreur-villeurbanne`, `/couvreur-genas`, `/couvreur-chassieu`, `/couvreur-saint-priest` | Local A avec réalisation | Réalisation locale mise en avant + contenu propre à la commune |
| 6 | `/services/fenetres-de-toit` | Velux, verrière | 3 réalisations, 1 article |
| 7 | `/couvreur-vaulx-en-velin`, `/couvreur-bron`, `/couvreur-lyon` | Local A sans réalisation (sauf Lyon) | À publier quand au moins une réalisation ou un contenu local réel est disponible |
| 8 | `/services/charpente` | Charpente | Si l'activité est confirmée |
| 9 | `app/not-found.tsx` | UX / maillage | 404 personnalisée avec liens vers services, réalisations et contact |

**À ne pas créer** : pages ville × service (« démoussage-genas », « zinguerie-bron »…) au départ ; pages pour des communes C ; pages sans contenu distinct.

---

# Données structurées recommandées

Toutes les valeurs ci-dessous proviennent du projet. Les champs **[À CONFIRMER]** ne doivent pas être publiés avant validation.

### 1. `RoofingContractor` (entité unique, dans le layout racine)

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.jrenov.com/#business",
  "name": "Jrenov",
  "legalName": "JRENOV",
  "url": "https://www.jrenov.com",
  "logo": "https://www.jrenov.com/logo.png",
  "image": "https://www.jrenov.com/logo.png",
  "telephone": "+33465848885",
  "email": "contact@jrenov.com",
  "foundingDate": "2018-05-07",
  "founder": { "@type": "Person", "name": "Jason Robba" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "48 Ancien Chemin des Marais",
    "postalCode": "69150",
    "addressLocality": "Décines-Charpieu",
    "addressRegion": "Auvergne-Rhône-Alpes",
    "addressCountry": "FR"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00", "closes": "19:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "Décines-Charpieu" },
    { "@type": "City", "name": "Meyzieu" },
    { "@type": "City", "name": "Villeurbanne" },
    { "@type": "City", "name": "Lyon" }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61593675344403",
    "https://instagram.com/jrenov69"
  ],
  "identifier": { "@type": "PropertyValue", "propertyID": "SIRET", "value": "84172123600013" }
}
```

- `geo` (latitude/longitude) : **[À CONFIRMER]** depuis la fiche Google Business Profile.
- `hasMap` : URL de la fiche Google Business Profile **[À CONFIRMER : existe-t-elle ?]**.
- `aggregateRating` / `review` : **interdit** tant qu'aucun avis réel n'est affiché sur la page (règles Google et consigne de non-invention).
- `priceRange` : supprimer le « $$ » actuel ou le remplacer par une valeur validée.
- Sérialiser avec `.replace(/</g, "\\u003c")`, comme le recommande la documentation Next 16 (`node_modules/next/dist/docs/01-app/02-guides/json-ld.md`).

### 2. `WebSite` (layout racine)
`name`, `url`, `publisher: { "@id": "https://www.jrenov.com/#business" }`.

### 3. `Service` (chaque page service)
`serviceType`, `name`, `description`, `provider: { "@id": "…#business" }`, `areaServed` (communes A).

### 4. `BreadcrumbList` (composant existant, corrigé)
Bon domaine, libellés lisibles, aucun lien vers une URL en 404.

### 5. `BlogPosting` (articles)
`headline`, `datePublished` (ISO), `author: { "@type": "Person", "name": "Jason Robba" }`, `publisher` → `#business`, `image`, `mainEntityOfPage`.

### 6. `FAQPage`
Seulement si une FAQ visible est ajoutée aux pages services. Google n'affiche plus les rich results FAQ pour la plupart des sites, mais le balisage reste utile à la compréhension du contenu, y compris par les moteurs IA.

### 7. Réalisations
Pas de type Schema.org parfaitement adapté. Option : `CreativeWork` ou `Article` léger avec `locationCreated` (Place, ville), `image` et `about` → `Service`. Priorité basse.

---

# Maillage interne recommandé

## Schéma

```
                         ┌──────────── Accueil ────────────┐
                         │                                 │
                    /services (hub)               /zones-intervention (hub)
                    │   │   │   │                      │    │    │
           couverture zinguerie démoussage …    couvreur-decines  couvreur-meyzieu …
                 ▲   ▲        ▲                        ▲            ▲
                 │   └─ réalisations (catégorie) ──────┘ (ville) ───┘
                 └────── articles de blog (liens contextuels)
```

## Règles

1. **Service → réalisations** : chaque page service affiche 3 à 6 réalisations de sa catégorie (mapping : Couverture → couverture ; Zinguerie → zinguerie ; Entretien → démoussage ; Isolation → isolation ; Urgence → recherche de fuite ; Fenêtre de toit → fenêtres de toit ; Charpente → charpente ; Étanchéité → couverture puis étanchéité).
2. **Réalisation → service + ville** : lien « Découvrir notre service {service} » et « Couvreur à {ville} » quand la page existe.
3. **Ville → services + réalisations proches** : chaque page locale renvoie vers les services et vers les chantiers de la commune et des communes voisines.
4. **Article → service** : 1 à 2 liens contextuels par article, avec des ancres descriptives et variées (pas toujours « couvreur Lyon »).
   - `comment-detecter-fuite-toiture-lyon` → `/services/recherche-de-fuite`
   - `isolation-toiture-par-exterieur-sarking` → `/services/isolation`
   - `quand-remplacer-gouttieres-zinc-pvc-alu` → `/services/zinguerie`
   - `velux-fenetre-toit-luminosite-combles` → `/services/fenetres-de-toit`
   - `prix-renovation-toiture-m2-lyon-devis` → `/services/couverture` + `/devis`
   - `artisan-couvreur-urgence-fuite-toiture-lyon-ouest-lyonnais` → `/services/recherche-de-fuite`
   - `nettoyage-demoussage-toiture-entreprise-lyon-val-saone` → `/services/demoussage`
   - `aide-financiere-isolation-toiture-renovation-rhone` → `/services/isolation`
5. **Service → article** : bloc « Nos conseils » en bas de chaque service.
6. **Footer** : communes A cliquables vers leurs pages, plus un lien « Toutes nos zones d'intervention ».
7. **Header** : ajouter « Zones d'intervention » au menu (ou dans le menu déroulant Services).
8. **Plan du site** : généré depuis les mêmes sources que le sitemap.
9. **Aucun lien vers une URL en 404** : `/services` à créer, slugs accentués à corriger.

---

# Performance

## Constats (analyse du code ; aucune mesure Lighthouse ou CrUX n'a été faite dans cet audit)

| Point | Impact potentiel | Détail |
|---|---|---|
| **3 vidéos hero en `preload="auto"`** | LCP, bande passante mobile | `public/banner1-3.mp4` ≈ 2,6 Mo chacune, soit **~7,8 Mo** préchargés sur l'accueil, sans `poster`. Le texte (H1) s'affiche, mais le fond reste noir jusqu'au chargement |
| `logo.png` de 6000×6000 px, 5 Mo | Temps de génération des images, JSON-LD | Servi via `next/image`, donc redimensionné, mais l'optimiseur traite 5 Mo à froid ; le JSON-LD expose le fichier brut |
| Images de réalisations de 355 Ko à 1,1 Mo | Faible (optimisées par `next/image`) | 3 images non utilisées : `3velux.jpg`, `verriere.jpg`, `isolation.jpg` |
| `FacebookFeed` dans le layout | Rendu, robustesse | `fetch` vers le Graph API sur toutes les pages ; actuellement en erreur (token expiré), donc section masquée. `<img>` non optimisé (avertissement ESLint) |
| Pages `"use client"` complètes | JS envoyé | `/contact` et `/devis` sont entièrement client : correct pour des formulaires, mais cela empêche les metadata |
| Header client | Faible | Nécessaire pour le menu mobile |
| Polices | ✅ | `next/font` (auto-hébergées, `display: swap` par défaut). Geist Mono est chargée mais semble inutilisée |
| Iframe Google Maps | ✅ | `loading="lazy"` |
| Rendu statique | ✅ | Toutes les pages sont prérendues |

## Recommandations
1. Vidéos : `preload="none"` sur les vidéos 2 et 3, `preload="metadata"` ou `auto` sur la première, ajout d'un `poster` (image WebP légère), envisager de désactiver la rotation sur mobile ou `prefers-reduced-motion`.
2. Recompresser `logo.png` en 512×512 (PNG ou WebP, quelques dizaines de Ko).
3. Supprimer Geist Mono si elle est inutilisée.
4. Passer `FacebookFeed` en `next/image` (les domaines `fbcdn.net` sont déjà autorisés) ou en `<img>` avec dimensions explicites.
5. Après mise en ligne : mesurer avec PageSpeed Insights (mobile) et suivre le rapport Core Web Vitals de Search Console.

## Accessibilité utile au SEO
- Un seul H1 par page ✅.
- Le bouton de menu mobile a `aria-label="Toggle menu"` (en anglais) → « Ouvrir le menu ».
- Le menu déroulant Services est inaccessible au clavier (survol seulement, pas d'`aria-expanded`).
- Les liens de réseaux sociaux ont un `aria-label` ✅. Les icônes Lucide sont décoratives (pas de texte alternatif nécessaire).
- Contrastes : `text-slate-400` / `text-slate-500` sur fond clair, en petite taille, est à vérifier.

---

# Plan SEO 30 jours

### Semaine 1 — Débloquer et assainir (technique pur, aucun changement visuel)
- [ ] Corriger l'import TS de `FacebookFeed.tsx` → build vert
- [ ] Constante `SITE_URL = https://www.jrenov.com` utilisée partout
- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts` dynamique (toutes les URL, dates réelles)
- [ ] Slugs accentués → ASCII + redirections 301 dans `next.config.ts`
- [ ] `metadataBase`, canonical, Open Graph et Twitter par défaut dans le layout ; canonical par page
- [ ] Metadata `/contact` et `/devis` via des `layout.tsx` de segment
- [ ] JSON-LD `RoofingContractor` corrigé (adresse de Décines, `telephone`, `sameAs`, horaires) et déplacé dans le layout
- [ ] Breadcrumb : libellés corrects, plus de lien en 404
- [ ] Soumettre le nouveau sitemap dans Search Console ; demander l'indexation des 2 réalisations corrigées

### Semaine 2 — Entité locale et Google Business Profile
- [ ] **[À CONFIRMER]** Existence et état de la fiche Google Business Profile : catégorie principale « Couvreur », adresse identique au site, zone desservie, horaires, photos des réalisations, lien vers le site
- [ ] Harmoniser le NAP sur le site, Google Business Profile, Facebook, Instagram et les annuaires (PagesJaunes, etc.)
- [ ] Recentrer le title, la description et le H1 de l'accueil sur Décines-Charpieu et l'Est lyonnais
- [ ] Harmoniser les listes de communes (header, footer, contact)
- [ ] Corriger les alt (logo, Facebook) ; renouveler le token Meta

### Semaine 3 — Contenus de conversion
- [ ] Créer `/services` (hub)
- [ ] Créer `/services/recherche-de-fuite`
- [ ] Ajouter les blocs « Réalisations de ce type » et « Nos conseils » sur les 4 pages services
- [ ] Corriger le rendu Markdown du blog, ajouter les liens contextuels vers les services

### Semaine 4 — Premières pages locales
- [ ] Créer `/zones-intervention`
- [ ] Créer `/couvreur-decines-charpieu`
- [ ] Créer `/couvreur-meyzieu` (réalisation existante)
- [ ] Rendre les communes du footer cliquables vers ces pages
- [ ] Mettre en place le suivi : Search Console (requêtes par page), appels (si un suivi existe) et formulaires

---

# Plan SEO 90 jours

### Mois 2
- [ ] Pages locales A avec réalisation : Villeurbanne, Genas, Chassieu, Saint-Priest
- [ ] `/services/fenetres-de-toit`
- [ ] Enrichir les 22 réalisations (description détaillée, points clés spécifiques, liens service et ville) ; utiliser les 3 photos inutilisées
- [ ] JSON-LD `Service` (pages services) et `BlogPosting` (articles, dates ISO)
- [ ] Performance : poster et preload des vidéos, logo compressé ; mesure PageSpeed avant/après
- [ ] `app/not-found.tsx` personnalisée
- [ ] Demander des avis Google aux clients récents (processus réel, aucun avis fabriqué)

### Mois 3
- [ ] Pages locales A restantes (Vaulx-en-Velin, Bron, Lyon) dès qu'un contenu local réel existe
- [ ] `/services/charpente` si l'activité est confirmée
- [ ] 3 à 4 articles orientés Est lyonnais, fondés sur des chantiers réels (par ex. un retour d'expérience grêle ou orage à partir du chantier de Vénissieux)
- [ ] Analyse Search Console : pages en positions 5 à 20 → optimisation ciblée ; requêtes cannibalisées → arbitrage
- [ ] Évaluer les communes B : section enrichie dans le hub, ou page dédiée si une demande apparaît dans Search Console
- [ ] Netlinking local propre : annuaires d'artisans, chambre de métiers, fournisseurs, associations locales de Décines et alentours (pas d'achat de liens)

### Indicateurs à suivre
- Impressions et clics Search Console sur « couvreur + [commune A] »
- Positions dans le pack local (Google Maps) à Décines, Meyzieu et Villeurbanne
- Appels et demandes de devis (formulaires)
- Pages indexées / pages soumises (sitemap)

---

# Annexe : vérifications exécutées

| Vérification | Commande | Résultat |
|---|---|---|
| Lint | `npx eslint .` | ❌ **57 problèmes (48 erreurs, 9 avertissements)**. 48 erreurs `react/no-unescaped-entities` (apostrophes dans le JSX, sans effet sur le rendu) ; avertissements : imports inutilisés (`couverture`, `mentions-legales`), variables `err` inutilisées, `<img>` dans `FacebookFeed` |
| Types | `npx tsc --noEmit` | ❌ 1 erreur : `components/FacebookFeed.tsx(3,28) TS2724 '"@/lib/facebook"' has no exported member named 'FacebookPost'` (modification non commitée) |
| Build | `npx next build` | ❌ **Échec** sur l'erreur TypeScript ci-dessus |
| Build sur une copie temporaire (import corrigé, hors du projet) | `next build` | ✅ 47 pages générées. Avertissement : API Meta en erreur `code 190 / subcode 463` (token d'accès expiré) |
| HTML rendu (serveur local sur la copie) | `curl` + `grep` | Titles et descriptions relevés (voir État actuel) ; aucun canonical, Open Graph ni Twitter ; `/contact` et `/devis` avec le title de l'accueil |
| `robots.txt` | local et `https://www.jrenov.com/robots.txt` | ❌ 404 |
| `sitemap.xml` | local et production | ⚠️ 200, 8 URL, domaine `jrenov.fr` |
| Slugs accentués | local (NFC/NFD) et production | ❌ 404 |
| `/services` (lien du breadcrumb) | local | ❌ 404 |
| Domaines | `curl` | `jrenov.com` → 308 → `www.jrenov.com` (site Jrenov) ; **`www.jrenov.fr` = site d'une autre entreprise** (salle de bains, Pornic) |
| Logo | `sips` | 6000×6000 px, 5 034 787 octets |
