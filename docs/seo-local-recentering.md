# Lot 5 — Recentrage local des services existants et des hubs éditoriaux

> Réalisé le 7 octobre 2026. Suite de [`seo-services-silo.md`](./seo-services-silo.md).
> Positionnement : **Jrenov est basé à Décines-Charpieu** (48 Ancien Chemin des Marais, 69150). Cible principale : Décines-Charpieu et l'Est lyonnais ; Lyon et la métropole restent des zones desservies importantes, sans être présentées comme le siège.
> Rien n'a été commité ni poussé. Facebook, Analytics, Speed Insights, le tracking des conversions et les `.env` n'ont pas été touchés. Aucune page, commune, service ou article n'a été créé. Aucune URL n'a changé.

## 1. État initial

- `git log` : `c1d9e9e` (dernier commit) ; Lots 2 à 4 présents dans le working tree (63 entrées `git status`).
- `npx eslint .` ✅ et `npx tsc --noEmit` ✅ avant modification.
- Lot 4 présent : `/services/recherche-de-fuite`, `/services/fenetres-de-toit`, `/zones-intervention`, 6 pages locales.

---

## 2. Titles (suffixe « | Jrenov » inclus)

| Page | Avant | Après |
|---|---|---|
| `/` | Couvreur à Décines-Charpieu & dans l'Est lyonnais \| Jrenov | **Jrenov \| Couvreur zingueur de l'Est lyonnais, à Décines-Charpieu** |
| `/services` | Nos prestations de couverture et toiture | inchangé |
| `/services/couverture` | Rénovation & Réparation de Couverture à Lyon (69) | **Rénovation et réparation de toiture dans l'Est lyonnais** |
| `/services/zinguerie` | Zinguerie & Pose de Gouttières à Lyon (69) | **Zingueur à Décines-Charpieu – Gouttières, chéneaux, noues** |
| `/services/isolation` | Isolation Toiture & Combles à Lyon (69) | **Isolation de toiture et Sarking – métropole lyonnaise** |
| `/services/demoussage` | Nettoyage & Démoussage Toiture à Lyon (69) | **Démoussage et nettoyage de toiture – Est lyonnais & Lyon** |
| `/services/recherche-de-fuite` | Recherche de fuite toiture – Décines & Est lyonnais | inchangé |
| `/services/fenetres-de-toit` | Fenêtres de toit type Velux – Pose & remplacement | inchangé |
| `/realisations` | Nos Réalisations & Chantiers de Toiture à Lyon | **Nos chantiers de toiture dans l'Est lyonnais et à Lyon** |
| `/blog` | Blog & Conseils Toiture Lyon | **Blog toiture : conseils d'un couvreur de l'Est lyonnais** |
| `/zones-intervention` | Zones d'intervention autour de Décines-Charpieu | inchangé |
| `/couvreur-decines-charpieu` | Couvreur à Décines-Charpieu, artisan installé dans la commune | inchangé |

L'ancrage géographique est volontairement **varié** : « Est lyonnais », « Décines-Charpieu », « métropole lyonnaise », « Lyon », jamais à la même position. Seule l'accueil commence par la marque. Similarité maximale entre titles des 6 services : 0,46 (seuil 0,6).

## 3. H1

| Page | Avant | Après |
|---|---|---|
| `/services/couverture` | Rénovation & Réfection de Toiture à **Lyon** | Rénovation & Réfection de Toiture autour de **Décines-Charpieu** |
| `/services/zinguerie` | Travaux de Zinguerie & Gouttières à **Lyon** | Travaux de Zinguerie & Gouttières dans l'**Est lyonnais** |
| `/services/isolation` | Isolation de Toiture & Combles à **Lyon** | Isolation de Toiture & Combles, de Décines-Charpieu à **Lyon** |
| `/services/demoussage` | Nettoyage & Démoussage de Toiture à **Lyon** | Nettoyage & Démoussage de Toiture dans la **métropole lyonnaise** |
| `/realisations` | Nos dernières réalisations | inchangé (naturel) |
| `/blog` | Le Blog Toiture & Zinguerie | inchangé ; ajout d'un paragraphe d'introduction |
| `/` | Couvreur à Décines-Charpieu et dans l'Est lyonnais | inchangé (cohérent) |

Le style est conservé : le mot géographique reste dans la `<span>` ambrée.

## 4. Meta descriptions

| Page | Avant | Après |
|---|---|---|
| `/` | …basé à Décines-Charpieu : rénovation, réparation et entretien de toiture dans l'Est lyonnais, à Lyon et dans sa métropole. Devis gratuit. (185 car.) | Jrenov, couvreur-zingueur basé à Décines-Charpieu : rénovation, réparation et entretien de toiture dans l'Est lyonnais et la métropole de Lyon. Devis gratuit. (158) |
| `/services` | …artisan couvreur basé à Décines-Charpieu, à Lyon et dans sa métropole. Devis gratuit. (219) | Couverture, zinguerie, isolation, démoussage, fuites et fenêtres de toit : les prestations de Jrenov, couvreur basé à Décines-Charpieu, dans l'Est lyonnais et à Lyon. (166) |
| `/services/couverture` | Artisan couvreur spécialisé en réfection de toiture… à Lyon et dans le Rhône. Garantie décennale et devis gratuit au 04 65 84 88 85. | Réfection ou réparation de toiture en tuiles, ardoise ou bac acier par Jrenov, couvreur basé à Décines-Charpieu, dans l'Est lyonnais et la métropole. Devis gratuit. (164) |
| `/services/zinguerie` | Artisan zingueur à Lyon et dans le Rhône. Pose et rénovation de gouttières… | Gouttières zinc, alu ou PVC, chéneaux, noues, solins, abergements : Jrenov, zingueur basé à Décines-Charpieu, intervient dans l'Est lyonnais et la métropole. |
| `/services/isolation` | Spécialiste de l'isolation… à Lyon et dans le Rhône. **Réduisez vos factures.** … | Sarking, combles perdus ou aménagés : Jrenov isole les toitures depuis Décines-Charpieu, dans l'Est lyonnais et la métropole de Lyon. Diagnostic et devis gratuits. (163) |
| `/services/demoussage` | Artisan spécialisé dans le nettoyage… à Lyon… | Nettoyage de toiture, traitement anti-mousse et hydrofuge par Jrenov, basé à Décines-Charpieu : interventions dans l'Est lyonnais, à Lyon et dans la métropole. (159) |
| `/realisations` | …chantiers… réalisés à Lyon et dans le Rhône. | Couverture, zinguerie, isolation, fenêtres de toit : photos et détails des chantiers menés par Jrenov depuis Décines-Charpieu, dans l'Est lyonnais et la métropole. (163) |
| `/blog` | …rénovation de toiture à Lyon. | Fuites, entretien, isolation, gouttières, fenêtres de toit : les conseils de Jrenov, couvreur à Décines-Charpieu, pour votre toiture dans la métropole lyonnaise. (161) |
| `/zones-intervention` | (180 car.) | Basé à Décines-Charpieu, Jrenov intervient dans l'Est lyonnais, à Lyon et dans un rayon d'environ 50 km : communes desservies et chantiers réalisés. (148) |
| `/services/recherche-de-fuite`, `/services/fenetres-de-toit` | — | inchangées (155 et 146 car.) |

Toutes les descriptions sont uniques et font entre 146 et 166 caractères. Similarité maximale entre descriptions des services : 0,45.

## 5. Introductions et formulations géographiques

| Emplacement | Avant | Après | Motif |
|---|---|---|---|
| Couverture, introduction | « Jrenov intervient dans toute la métropole lyonnaise… » | « Basé à Décines-Charpieu, Jrenov intervient dans l'Est lyonnais et dans toute la métropole lyonnaise… » | ancrage |
| Couverture, étape 1 | « Inspection visuelle sur place **à Lyon** » | « Inspection visuelle sur place » | **inexact** (siège à Décines) |
| Zinguerie, introduction | « …dans la métropole lyonnaise. » | « …depuis Décines-Charpieu, dans l'Est lyonnais et la métropole lyonnaise. » | ancrage |
| Zinguerie, encart | « se déplacent **sur Lyon et sa métropole** … **sous 24h à 48h** » | « se déplacent depuis Décines-Charpieu, dans l'Est lyonnais et la métropole… » | ancrage + délai non vérifiable |
| Isolation, introduction | « **Jusqu'à 30 %** de la chaleur s'échappe par un toit mal isolé… » | « Dans une maison mal isolée, la toiture est l'une des premières sources de pertes de chaleur. Basé à Décines-Charpieu… dans l'Est lyonnais comme à Lyon… » | ancrage + statistique non sourcée |
| Isolation, encart | « Demandez un bilan isolation gratuit **à Lyon** » | « Demandez un bilan isolation gratuit » | inexact |
| Démoussage, introduction | « …sur Lyon et toute la métropole. » | « …depuis Décines-Charpieu, dans l'Est lyonnais, à Lyon et dans toute la métropole. » | ancrage |
| Démoussage, encart | « Demandez votre diagnostic gratuit **à Lyon** » | « Demandez votre diagnostic gratuit » | inexact |
| `/realisations`, introduction | « …dans la métropole lyonnaise. » | « …menés depuis Décines-Charpieu, dans l'Est lyonnais et la métropole lyonnaise. » | ancrage |
| `/services`, introduction | « …intervient à Lyon et dans sa métropole… » | « …intervient dans l'Est lyonnais, à Lyon et dans toute la métropole… » | Est lyonnais ajouté |
| Header, sous-titre du logo | « Couverture & Zinguerie **Lyon** » | « Couverture & Zinguerie · Est lyonnais » | suggérait une entreprise lyonnaise |
| `/devis`, encart de réassurance | « Artisan de proximité **(Lyon)** » | « Artisan de proximité (Décines-Charpieu) » | **inexact** |
| `/plan-du-site`, description | « …site Jrenov Couverture **à Lyon** » | « …site de Jrenov, couvreur basé à Décines-Charpieu : services, zones d'intervention, réalisations et conseils. » | **inexact** |
| `lib/services.ts`, couverture (cartes de l'accueil, hub, JSON-LD) | « …ardoises et bac acier **à Lyon et ses environs** » | « …dans l'Est lyonnais et la métropole de Lyon » | ancrage |

**Conservées**, car valides : « région lyonnaise » (matériaux, climat), « canicules lyonnaises », les mentions de Lyon comme zone desservie, les réalisations à Lyon 3e, 5e et 6e, les exemples de code postal « 69003 Lyon » dans les formulaires.

Recherche effectuée sur « basé à Lyon », « entreprise lyonnaise », « artisan lyonnais », « couvreur à Lyon », « siège à Lyon », « proximité Lyon » et assimilés : **aucune occurrence restante**.

---

## 6. FAQ ajoutées (composant `ServiceFaq`, FAQPage généré depuis le contenu visible)

Le contenu visible et le JSON-LD ont été vérifiés identiques en HTTP sur les 4 pages.

### Couverture (3)
1. **Faut-il réparer ou refaire entièrement sa toiture ?** Réparation ponctuelle (faîtage remplacé par une pose à sec à Fontaines-sur-Saône) ou réfection complète si les tuiles sont poreuses (couverture centenaire à Villeurbanne) ; le diagnostic gratuit permet de trancher.
2. **Quels matériaux de couverture posez-vous ?** Terre cuite, béton, ardoise, bac acier (repris de la page).
3. **Que faire quand une tuile est cassée ou a glissée ?** Ne pas tarder, ne pas monter sur le toit ; service d'urgence fuite 7j/7.

### Zinguerie (3)
1. **Zinc, aluminium ou PVC : quel matériau choisir pour ses gouttières ?** (repris des matériaux de la page ; profilage alu sur place à Dagneux)
2. **Quelle est la différence entre une gouttière et un chéneau ?**
3. **D'où vient une fuite autour d'une cheminée ?** (chantier de Brignais)

### Isolation (3)
1. **Sarking ou isolation par l'intérieur : que choisir ?** (fibre de bois 160 mm à Caluire-et-Cuire)
2. **Combles perdus ou combles aménagés : qu'est-ce qui change ?** (35 cm de laine de roche à Chassieu)
3. **Sur quels critères choisir l'isolant ?** (repris des isolants de la page)

Aucune question sur les aides : la page ne prétend pas que Jrenov est RGE et les règles des aides n'ont pas été modifiées.

### Démoussage (4)
1. **Quelle est la meilleure période pour nettoyer une toiture ?** Printemps et automne, en évitant fortes chaleurs et gel (repris de l'article Val de Saône).
2. **Faut-il appliquer un hydrofuge après chaque démoussage ?** Non obligatoire ; hydrofuge coloré appliqué à Tassin-la-Demi-Lune.
3. **Une toiture très envahie par la mousse peut-elle encore être nettoyée ?** Oui si les tuiles sont saines (Tassin-la-Demi-Lune).
4. **Puis-je démousser mon toit moi-même ?** Déconseillé : risque de chute, pression mal réglée (repris de l'article).

Aucune fréquence d'entretien nouvelle n'a été créée. La mention « 3 à 5 ans » existait déjà sur la page et n'a pas été reprise dans la FAQ. Les questions ont été choisies pour ne pas répéter celles des pages locales (Genas : fréquence ; Villeurbanne : rénovation complète ; Meyzieu : habillage alu ; Chassieu : épaisseur d'isolant).

---

## 7. Stratégie anti-cannibalisation

| Page | Intention visée | Title | Ce qui la distingue |
|---|---|---|---|
| `/` | **Marque** + couvreur Décines-Charpieu + Est lyonnais (requête large) | Jrenov \| Couvreur zingueur de l'Est lyonnais, à Décines-Charpieu | Commence par la marque, vise l'Est lyonnais dans son ensemble et présente toutes les prestations |
| `/couvreur-decines-charpieu` | **Local** : « couvreur à Décines-Charpieu » | Couvreur à Décines-Charpieu, artisan installé dans la commune | Seule page dont le title commence par « Couvreur à Décines-Charpieu » ; contenu sur le territoire (adresse, Grand Large, chantier local, communes voisines) |
| `/services/couverture` | **Métier** : rénovation / réparation de toiture | Rénovation et réparation de toiture dans l'Est lyonnais | Aucun « couvreur à » ; matériaux, méthode, FAQ technique |
| `/zones-intervention` | **Géographique** : communes desservies | Zones d'intervention autour de Décines-Charpieu | Liste des secteurs, communes et chantiers par commune |

Avant ce lot, l'accueil et la page Décines-Charpieu commençaient tous deux par « Couvreur à Décines-Charpieu ». Le title de l'accueil commence désormais par la marque. Le H1 de l'accueil n'a pas été modifié : il est cohérent, et le title porte l'essentiel du signal.

---

## 8. Contrôle des affirmations (pages modifiées)

Recherche : RGE, Qualibat, NF, certifié, agréé, partenaire, prix, €, numéro 1, leader, expert depuis, garanti, intervention sous X, résultat garanti, pourcentages.

| Occurrence | Décision |
|---|---|
| Isolation : carte « **Jusqu'à 30 % d'Économies** » + « diminue **immédiatement** vos factures » | **Reformulée** : « Moins de pertes de chaleur » / « la toiture est l'une des principales sources de déperdition thermique ; une isolation adaptée limite ces pertes et les besoins de chauffage ». La carte confondait 30 % de déperditions et 30 % d'économies |
| Isolation : description « Réduisez vos factures » ; introduction « Jusqu'à 30 % » | **Retirées** |
| Zinguerie : « sous 24h à 48h » | **Retiré** (délai non vérifiable) |
| Zinguerie : « pour garantir une étanchéité parfaite » | **Reformulé** : « pour une étanchéité durable » |
| Démoussage : « devis… sous 24h » | **Retiré** |
| Démoussage : « pour garantir un écoulement optimal » | **Reformulé** : « pour rétablir un bon écoulement » |
| « Travaux sous Garantie Décennale 10 Ans » | **Conservée** : assurance décennale confirmée dans les mentions légales |
| « Service d'urgence fuite 7j/7 » | Conservée : information publiée par l'entreprise (page contact) |
| Zinguerie : « durée de vie supérieure à 40 ans » (zinc) ; démoussage : « tous les 3 à 5 ans » | Conservées (contenu technique existant, non modifié) ; **à faire valider** |
| RGE, Qualibat, NF, prix, €, numéro 1, leader, expert | **aucune occurrence** dans les pages modifiées |

**Hors périmètre, à confirmer par l'entreprise** : les engagements « sous 24h » de l'accueil (« Intervention sous 24h », « Devis… sous 24h »), de `/devis`, `/contact` et des pages de réalisation n'ont pas été modifiés dans ce lot.

---

## 9. Anti-duplication

| Contrôle | Résultat |
|---|---|
| 6 pages services (`PREFIX=/services/`) | ✅ aucun bloc ni passage identique ≥ 100 caractères, aucune FAQ répétée ; similarité maximale titles 0,46, descriptions 0,45 |
| 6 pages locales | ✅ inchangé (titles 0,56, descriptions 0,54) |

## 10. Validation technique

| Vérification | Résultat |
|---|---|
| `npx eslint .` | ✅ 0 problème |
| `npx tsc --noEmit` | ✅ OK |
| `npm run build` | ✅ 60 pages |
| HTTP | 200 pour les 13 pages demandées, `/robots.txt` et `/sitemap.xml` ; **404** pour `/page-inexistante` |
| Canonical | identique à la route sur chaque page |
| H1 | un seul par page |
| JSON-LD | `RoofingContractor` + `WebSite` partout ; `BreadcrumbList` hors accueil et 404 ; `Service` + **`FAQPage`** sur les 6 services ; `WebPage` + `Service` sur les pages locales |
| Breadcrumb | Accueil › Nos services › {service} ; Accueil › Zones d'intervention › Couvreur à {commune} |
| Crawl | **51 pages, 0 redirection, 0 lien cassé** ; 50/50 URL du sitemap atteignables ; seule `/mentions-legales` (noindex) est hors sitemap |

## 11. Maillage vérifié

Accueil → services (6 cartes) et zones (section « Qui sommes-nous ? ») · Services → réalisations, articles, pages locales pertinentes et hub zones (via `ServiceSilo`) · Réalisations → service(s) et page locale si elle existe · Articles → service (bloc « Besoin d'une intervention ? ») · Pages locales → services. Aucun lien ajouté dans ce lot.

## 12. Recommandations pour la suite

Voir le rapport final du lot. Priorité : **faire valider par l'entreprise les engagements commerciaux** (délais « sous 24h », durée de vie du zinc, fréquence de démoussage), puis préparer `/couvreur-lyon`, qui repose sur 3 réalisations réelles.
