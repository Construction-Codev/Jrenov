# Lot 2 — Socle technique SEO, Analytics et performance

> Réalisé le 7 octobre 2026. Suite de [`docs/seo-audit.md`](./seo-audit.md).
> Domaine canonique : **https://www.jrenov.com**. `jrenov.fr` n'appartient pas à Jrenov ; il n'est plus référencé nulle part dans le code.
> Rien n'a été commité ni poussé.

---

## 1. Résultat des vérifications

| Vérification | Commande | Résultat |
|---|---|---|
| Lint | `npx eslint .` | ✅ **0 erreur, 0 avertissement** (au départ : 48 erreurs, 9 avertissements) |
| Types | `npx tsc --noEmit` | ✅ **OK** (au départ : erreur TS2724 dans `FacebookFeed.tsx`) |
| Build | `npm run build` | ✅ **OK** : 51 pages générées (au départ : build en échec) |
| Domaine | `grep -rn "jrenov.fr"` (hors `node_modules`, `.next`, `.git`, `docs/`) | ✅ **0 occurrence**. Le seul fichier qui le mentionne encore est `docs/seo-audit.md`, qui documente justement le problème |
| Liens internes | Crawl de toutes les pages en production locale | ✅ 42 pages parcourues, **0 lien cassé** |

**Note sur le build** : le token Meta est expiré (erreur `190/463`). Chaque page générée affiche désormais un avertissement `Flux Facebook indisponible … section masquée.`, sans exception. Le build n'est pas affecté.

**Note sur TypeScript** : un ancien dossier `.next/types`, généré par un build en échec pendant l'audit, contenait des types de routes obsolètes. `npm run build` l'a régénéré. Un `next dev` tournait aussi pendant le lot ; il n'a pas été arrêté.

---

## 2. Routes vérifiées en HTTP (`next start` local)

| Route | Statut | Title | Canonical | Robots | JSON-LD |
|---|---|---|---|---|---|
| `/` | 200 | Jrenov - Couvreur Zingueur à Lyon (69) \| Rénovation & Urgence Toiture | `https://www.jrenov.com` | index, follow | RoofingContractor, WebSite |
| `/robots.txt` | 200 | — | — | — | — |
| `/sitemap.xml` | 200 | 41 URL | — | — | — |
| `/services` (nouveau) | 200 | Nos prestations de couverture et toiture \| Jrenov | `/services` | index, follow | + BreadcrumbList |
| `/services/couverture` | 200 | Rénovation & Réparation de Couverture à Lyon (69) \| Jrenov | `/services/couverture` | index, follow | + BreadcrumbList |
| `/contact` | 200 | Contacter Jrenov, couvreur à Décines-Charpieu \| Jrenov | `/contact` | index, follow | + BreadcrumbList |
| `/devis` | 200 | Devis toiture et couverture gratuit en ligne \| Jrenov | `/devis` | index, follow | + BreadcrumbList |
| `/realisations` | 200 | Nos Réalisations & Chantiers de Toiture à Lyon \| Jrenov | `/realisations` | index, follow | + BreadcrumbList |
| `/blog` | 200 | Blog & Conseils Toiture Lyon \| Jrenov | `/blog` | index, follow | + BreadcrumbList |
| `/realisations/remplacement-tuiles-cassees-orage-venissieux` | **200** (404 avant) | Mise hors d'eau et réfection suite aux intempéries à Vénissieux \| Jrenov | identique à la route | index, follow | + BreadcrumbList |
| `/realisations/creation-verriere-toit-lyon-3` | **200** (404 avant) | Pose d'une verrière d'atelier en toiture à Lyon 3e \| Jrenov | identique à la route | index, follow | + BreadcrumbList |
| `/mentions-legales` | 200 | Mentions légales \| Jrenov | `/mentions-legales` | **noindex, follow** | + BreadcrumbList |
| `/plan-du-site` | 200 | Plan du site \| Jrenov | `/plan-du-site` | index, follow | + BreadcrumbList |
| Ancienne URL `…cass%C3%A9es…` (NFC et NFD) | **308** → slug ASCII | — | — | — | — |
| Ancienne URL `…verri%C3%A8re…` | **308** → slug ASCII | — | — | — | — |
| `/page-inexistante` | 404 | — | — | — | aucun breadcrumb |

Toutes les pages ont aussi `og:url`, `og:image` (`https://www.jrenov.com/og-image.jpg`) et `twitter:card = summary_large_image`.

Les liens du fil d'Ariane ne pointent que vers des routes existantes. Par exemple, sur `/services/couverture` : `/`, puis `/services` (désormais en 200).

---

## 3. Fichiers modifiés et créés

### Créés
| Fichier | Rôle |
|---|---|
| `lib/site.ts` | Source de vérité : `SITE_URL`, identité, coordonnées, horaires, réseaux, `pageMetadata()`, `serializeJsonLd()` |
| `lib/content.ts` | Accès aux données, conversion des dates françaises en ISO sans inventer de précision |
| `lib/structured-data.ts` | JSON-LD `RoofingContractor` et `WebSite` |
| `lib/breadcrumb.ts` | Libellés du fil d'Ariane (titres réels des réalisations et articles) |
| `lib/services.ts` | Liste des 4 services existants (partagée par l'accueil et `/services`) |
| `lib/analytics.ts` | `trackEvent()` centralisé, avec propriétés filtrées par liste blanche |
| `components/AnalyticsEvents.tsx` | Suivi délégué des clics `tel:` et `mailto:` sur tout le site |
| `components/JsonLd.tsx` | Rendu sécurisé d'un bloc JSON-LD |
| `components/ArticleContent.tsx` | Rendu léger des articles (titres, listes, gras), sans HTML injecté |
| `app/robots.ts` | `robots.txt` |
| `app/services/page.tsx` | Hub `/services` |
| `app/contact/layout.tsx`, `app/devis/layout.tsx` | Metadata des pages client |
| `app/icon.png` (192 px), `app/apple-icon.png` (180 px) | Icônes |
| `public/logo-512.png` | Logo web 512×512 avec transparence (120 Ko) |
| `public/banner1-poster.jpg` | Première image exacte de `banner1.mp4` (93 Ko) |
| `public/og-image.jpg` | Image de partage 1200×630, issue de la photo de réalisation `tuiles.jpg` (250 Ko) |

### Modifiés
`app/layout.tsx`, `app/page.tsx`, `app/sitemap.ts`, `app/favicon.ico`, `app/globals.css`, `app/services/{couverture,zinguerie,isolation,demoussage}/page.tsx`, `app/realisations/page.tsx`, `app/realisations/[slug]/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/contact/page.tsx`, `app/devis/page.tsx`, `app/mentions-legales/page.tsx`, `app/plan-du-site/page.tsx`, `components/{Banner,Breadcrumb,FacebookFeed,Footer,Header}.tsx`, `lib/facebook.ts`, `data/realisations.json`, `data/post.json`, `next.config.ts`, `package.json`, `package-lock.json`.

### Travail existant préservé
- **`components/FacebookFeed.tsx`** : la refonte visuelle non commitée a été conservée. Seuls l'import de type, l'alt et le passage à `next/image` ont été modifiés.
- **`app/mentions-legales/page.tsx`** : le reformatage non commité a été conservé. Il collait des mots (« site**Jrenov** », « à**contact@** ») : c'est corrigé avec `{" "}`. Les imports inutilisés ont été retirés.

---

## 4. Corrections SEO

1. **Domaine** : `SITE_URL = "https://www.jrenov.com"` est utilisé partout (sitemap, robots, JSON-LD, breadcrumb, `metadataBase`, Open Graph).
2. **Metadata globales** (`app/layout.tsx`) : `metadataBase`, template `%s | Jrenov`, description par défaut, `robots` (index/follow, `max-image-preview: large`), Open Graph (`fr_FR`, `siteName`, image), Twitter (`summary_large_image`), `authors` (Jason Robba, exploitant cité dans les mentions légales), `publisher`, `applicationName`. La vérification Search Console existante est conservée.
3. **Canonicals** : chaque route a un canonical identique à sa route, via `pageMetadata()`. Il n'y a volontairement pas de canonical dans le layout racine, sinon toutes les pages en hériteraient.
4. **Titles** : le suffixe « | Jrenov » est maintenant ajouté par le template (le texte des titles n'a pas changé). Les réalisations n'ont plus le code postal dans le title.
5. **`/contact` et `/devis`** : metadata propres via des layouts de segment ; les Client Components n'ont pas été transformés.
6. **`robots.txt`** : `Allow: /`, `Disallow: /api/`, `Host` et `Sitemap: https://www.jrenov.com/sitemap.xml`.
7. **Sitemap** : 41 URL (9 pages fixes, `/realisations` + 22 chantiers, `/blog` + 8 articles). `/mentions-legales` est exclue (noindex).
   - Dates : celles des données uniquement. Article : `2026-02-15`. Réalisation : précision au mois, `2026-01`, format W3C valide sans jour inventé. Listes : date du contenu le plus récent. Pages fixes : pas de date.
   - `changeFrequency` et `priority` ont été retirés (Google les ignore).
8. **Slugs** : `remplacement-tuiles-cassees-orage-venissieux` et `creation-verriere-toit-lyon-3`, avec redirections permanentes (308) depuis les anciennes URL, en encodage NFC et NFD.
9. **Hub `/services`** : présentation des 4 services existants, avec liens vers chaque page, les réalisations et le devis. Ajouté au menu (« Toutes nos prestations ») et au plan du site.
10. **Fil d'Ariane** : libellés réels (titre de la réalisation ou de l'article), liste `<ol>`/`<li>`, `aria-current`, icônes `aria-hidden`, domaine canonique, pas de rendu sur une route inconnue (donc aucun lien vers une 404).
11. **JSON-LD `RoofingContractor`** (`@id: https://www.jrenov.com/#business`), sur toutes les pages via le layout :
    - nom, raison sociale, URL, logo 512 px, `telephone: +33465848885`, e-mail, adresse complète de Décines-Charpieu, horaires du lundi au samedi de 08:00 à 19:00, `sameAs` Facebook et Instagram ;
    - `foundingDate: 2018-05-07` : date d'immatriculation des mentions légales ;
    - `areaServed` : Décines-Charpieu et les communes des réalisations publiées (calculées depuis `data/realisations.json`) ;
    - **supprimés ou absents** : `priceRange "$$"`, `aggregateRating`, `review`, `geo`, `hasMap`, toute certification ;
    - sérialisation `JSON.stringify(...).replace(/</g, "\\u003c")`.
12. **JSON-LD `WebSite`** relié à l'entité (`publisher`).
13. **NAP visible** : l'adresse du siège est affichée sur `/contact` (à la place de « Métropole de Lyon & Rhône (69) ») et dans le footer de toutes les pages. La carte de `/contact` est centrée sur le siège.
14. **Plan du site** : ajout des liens vers Réalisations, Blog et le hub Services.

## 5. Corrections techniques

| Sujet | Correction |
|---|---|
| Build | `FacebookPost` est importé depuis `@/types/facebook` |
| Facebook | `getFacebookPosts()` ne lève plus jamais d'exception ; en cas d'erreur API, token expiré ou variables absentes, la liste est vide et la section reste masquée. L'alt « Protection Nuisibles » devient « Publication Facebook Jrenov ». `next/image` est utilisé, et `remotePatterns` passe de `*.fbcdn.net` à `**.fbcdn.net`, car les images Facebook ont plusieurs niveaux de sous-domaine |
| Blog | Rendu de `**gras**` et des listes `- ` (`components/ArticleContent.tsx`), sans `dangerouslySetInnerHTML`. Les 6 articles concernés n'affichent plus d'astérisques |
| Article sur les aides | Les deux passages qui laissaient entendre que Jrenov est RGE ont été reformulés en conditions générales, avec le renvoi vers France Rénov'. La faute « rembourseable » est corrigée. Le reste de l'article n'a pas été modifié |
| ESLint | 47 apostrophes JSX remplacées par `&apos;` aux positions exactes signalées (rendu identique) ; imports inutilisés supprimés (`couverture`, `mentions-legales`) ; variables `err` inutilisées supprimées ; `<img>` remplacé par `next/image`. Aucune règle n'a été désactivée |
| Accessibilité | Menu mobile : `aria-label` en français et `aria-expanded`. Menu Services : bouton `type="button"`, `aria-expanded`, ouverture au clic et au clavier en plus du survol. Alt du logo : « Logo Jrenov » |
| Config | `next.config.ts` passe en TypeScript typé (`NextConfig`, `export default`) |
| Police | Geist Mono, chargée mais inutilisée, est retirée |

## 6. Performance

| Élément | Avant | Après |
|---|---|---|
| Hero vidéo | 3 vidéos en `preload="auto"` (~7,8 Mo dès l'arrivée), sans poster | Vidéo 1 : `preload="metadata"` + poster de 93 Ko. Vidéos 2 et 3 : **aucun `src`, donc aucune requête**, jusqu'à leur préchargement 2 s après le démarrage de la vidéo précédente. La bascule n'a lieu que si la vidéo suivante peut être lue ; sinon la vidéo courante continue de boucler, sans écran noir. `prefers-reduced-motion` : aucune lecture ni rotation, le poster reste affiché |
| Logo header | `logo.png` 6000×6000 (5 Mo) via `next/image` | `logo-512.png` (120 Ko, transparence conservée), avec `sizes="64px"` |
| **Favicon** | `app/favicon.ico` = **le PNG 6000×6000 de 5 Mo renommé**, téléchargé par chaque navigateur | 48×48 (4,4 Ko), plus `icon.png` 192 px et `apple-icon.png` 180 px |
| Logo JSON-LD | Fichier de 5 Mo sur un domaine tiers | `https://www.jrenov.com/logo-512.png` |

Le rendu visuel du Hero est inchangé : mêmes classes, même fondu, même rotation de 8 s. Le poster est la première image exacte de `banner1.mp4`, extraite avec AVFoundation.

`public/logo.png` (l'original 6000×6000) est **conservé** comme fichier source ; il n'est plus référencé par le code.

## 7. Analytics et Speed Insights

| Paquet | Version | Intégration |
|---|---|---|
| `@vercel/analytics` | 2.0.1 | `<Analytics />` depuis `@vercel/analytics/next` dans le layout racine (qui reste un Server Component) |
| `@vercel/speed-insights` | 2.0.0 | `<SpeedInsights />` depuis `@vercel/speed-insights/next` dans le layout racine |

Aucun tracking existant (gtag, Google Ads, GTM) n'a été trouvé dans le projet : rien n'a été remplacé.

### Événements suivis

| Événement | Déclencheur | Propriétés envoyées |
|---|---|---|
| `phone_click` | Clic sur n'importe quel lien `tel:` du site | `placement` : `header` / `footer` / `content` |
| `email_click` | Clic sur n'importe quel lien `mailto:` | `placement` |
| `quote_form_start` | Premier choix d'une prestation dans `/devis` (une fois par visite du formulaire) | `service` |
| `quote_form_submit` | Envoi réussi du formulaire de devis | `service` |
| `contact_form_submit` | Envoi réussi du formulaire de contact | `service` (type de demande) |

**Aucune donnée personnelle n'est transmise.** `trackEvent()` n'accepte que `placement` et `service`, et `service` n'est retenu que s'il appartient à la liste fermée `couverture | zinguerie | isolation | demoussage | urgence | autre`. Le nom, l'e-mail, le téléphone, l'adresse, le code postal et le message ne passent jamais par l'analytics. Les clics `tel:` et `mailto:` sont suivis par délégation (`components/AnalyticsEvents.tsx`) : aucun composant CTA n'a été modifié pour cela.

Les événements ne sont pas envoyés en développement : c'est le comportement du paquet.

---

## 8. Actions manuelles dans Vercel

1. **Activer Web Analytics** : projet → onglet *Analytics* → *Enable*.
2. **Activer Speed Insights** : projet → onglet *Speed Insights* → *Enable*.
3. **Redéployer** après activation.
4. **Événements personnalisés** : selon la documentation Vercel, les custom events sont réservés à certains plans (Pro / Enterprise). Vérifiez votre plan ; sans lui, les pages vues fonctionnent mais les 5 événements ne s'affichent pas.
5. **Domaines** : `www.jrenov.com` doit rester le domaine principal, et `jrenov.com` doit continuer à rediriger vers lui (308 déjà constaté).
6. **Token Meta** : renouveler `META_ACCESS_TOKEN` (de préférence un token longue durée ou un token d'utilisateur système), puis redéployer. Sans cela, le flux Facebook reste masqué.

## 9. Actions dans Google Search Console

1. Vérifier que la propriété couvre `https://www.jrenov.com` (idéalement une propriété *Domaine* `jrenov.com`).
2. **Sitemaps** : soumettre `https://www.jrenov.com/sitemap.xml`, et supprimer tout sitemap déjà soumis qui pointerait vers `jrenov.fr`.
3. **Inspection d'URL**, puis *Demander l'indexation* pour :
   - `/services`
   - `/realisations/remplacement-tuiles-cassees-orage-venissieux`
   - `/realisations/creation-verriere-toit-lyon-3`
   - `/contact`, `/devis` (nouveaux titles)
4. Rapport *Pages* : surveiller la disparition des 404 sur les anciennes URL accentuées (désormais redirigées).
5. Tester l'accueil avec le *Test des résultats enrichis* : `RoofingContractor` / `LocalBusiness` et `BreadcrumbList` doivent être détectés.

---

## 10. Points restants avant le Lot 3

| Point | Commentaire |
|---|---|
| Positionnement de l'accueil | Le title et le H1 visent encore « Lyon ». Recentrage sur Décines-Charpieu et l'Est lyonnais prévu au Lot 3, en même temps que les pages locales |
| Listes de communes | Header, footer et contact restent hétérogènes ; à harmoniser avec le futur hub `/zones-intervention` |
| Bloc « Points clés » des réalisations | Identique sur les 22 pages, avec « Matériaux certifiés NF » non vérifié : à rendre spécifique ou à retirer |
| Contenus à valider | Fourchettes de prix des articles « prix au m² » et « démoussage » ; détail des aides (MaPrimeRénov', CEE, Éco-PTZ), dont les règles évoluent chaque année |
| Fiche Google Business Profile | Existence et cohérence avec l'adresse du site à confirmer |
| JSON-LD complémentaires | `Service` (pages services), `BlogPosting` (articles) |
| Image Open Graph | Une seule image pour tout le site ; à décliner par page au besoin |
| Page 404 | La 404 par défaut de Next.js est toujours utilisée ; une 404 personnalisée avec liens serait utile |
| `public/logo.png` | L'original de 5 Mo est conservé, mais toujours publié dans `public/`. Il pourra être déplacé hors de `public/` une fois la conservation validée |
| Mesures réelles | Après déploiement : PageSpeed Insights (mobile) et données Speed Insights pour confirmer les gains du Hero |
