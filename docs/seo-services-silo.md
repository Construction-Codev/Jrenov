# Lot 4 — Silo services et maillage interne

> Réalisé le 7 octobre 2026. Suite de [`local-seo-implementation.md`](./local-seo-implementation.md).
> Rien n'a été commité ni poussé. Le flux Facebook, les fichiers `.env`, Analytics et Speed Insights n'ont pas été touchés.

## 1. État initial

- Lots 2 et 3 présents dans le working tree (57 fichiers modifiés ou créés, non commités).
- Routes vérifiées : `/`, `/services` et ses 4 sous-pages, `/zones-intervention`, et les 6 pages locales. Leur architecture n'a pas été modifiée.

---

## 2. Services

| URL | Statut | Intention principale | Title (+ « \| Jrenov ») | H1 |
|---|---|---|---|---|
| `/services/couverture` | enrichie | rénovation / réparation de toiture | Rénovation & Réparation de Couverture à Lyon (69) | Rénovation & Réfection de Toiture à Lyon |
| `/services/zinguerie` | enrichie | zinguerie, gouttières | Zinguerie & Pose de Gouttières à Lyon (69) | Travaux de Zinguerie & Gouttières à Lyon |
| `/services/isolation` | enrichie | isolation de toiture, combles | Isolation Toiture & Combles à Lyon (69) | Isolation de Toiture & Combles à Lyon |
| `/services/demoussage` | enrichie | nettoyage, démoussage | Nettoyage & Démoussage Toiture à Lyon (69) | Nettoyage & Démoussage de Toiture à Lyon |
| **`/services/recherche-de-fuite`** | **nouvelle** | recherche de fuite toiture (Décines-Charpieu, Est lyonnais, métropole) ; variantes : fuite toiture, infiltration, couvreur urgence, bâchage, mise hors d'eau, fuite après intempéries | Recherche de fuite toiture – Décines & Est lyonnais | Recherche de fuite et urgence toiture |
| **`/services/fenetres-de-toit`** | **nouvelle** | pose et remplacement de fenêtres de toit / « type Velux », verrières | Fenêtres de toit type Velux – Pose & remplacement | Fenêtres de toit : création, pose et remplacement |

Les titles et H1 des 4 pages existantes n'ont pas été modifiés (« Lyon (69) ») : voir les recommandations.

### Contenu des nouvelles pages (faits tous issus du projet)

**Recherche de fuite.** Signes d'alerte (repris de l'article « Comment détecter une fuite… »), origines fréquentes (chacune illustrée par un chantier ou un contenu existant), méthode en 4 étapes (inspection visuelle, comme indiqué sur la page couverture ; bâchage ; réparation sur devis), bloc « Après un orage » (chantier de Vénissieux), conseils « En attendant notre arrivée » (repris de l'article urgence), réalisations, conseils, zones, FAQ de 5 questions, CTA téléphone et devis.
- Aucune technique ni aucun équipement de détection n'est revendiqué (pas de caméra thermique, fumigène, drone, détecteur).
- Aucun délai promis : seul le fait daté du chantier de Vénissieux (« bâché en moins de 12 heures ») est cité, avec le service d'urgence 7j/7 déjà affiché sur le site.

**Fenêtres de toit.** Trois types de projets (création, remplacement, verrière), chacun accompagné de la réalisation qui l'atteste ; étanchéité (raccords réellement utilisés à Craponne, Décines-Charpieu et Lyon 3e, avec liens vers la zinguerie et la recherche de fuite) ; choix de l'ouverture et volet roulant solaire (repris de l'article Velux) ; réalisations, conseils, zones, FAQ de 5 questions, CTA.
- Le terme « Velux » est employé comme « fenêtre de toit de type Velux ». Une mention et une question de FAQ précisent que Jrenov **n'est ni revendeur, ni partenaire, ni installateur agréé** de la marque.
- Aucune affirmation énergétique, aucun prix, aucun délai.

---

## 3. Source de vérité : `lib/service-content.ts`

| Élément | Rôle |
|---|---|
| `CATEGORY_SERVICES` | Correspondance par défaut catégorie de réalisation → services |
| `REALISATION_SERVICE_OVERRIDES` | Exceptions justifiées par le texte du chantier (commentaire avec citation pour chacune) |
| `SERVICE_SILOS` | Pour chaque service : titre du bloc réalisations, réalisations mises en avant (2 à 6, par slug), pages locales mises en avant |
| `ARTICLE_LINKS` | Article → services (+ phrase de liaison, lien devis éventuel) |
| `validateServiceContent()` | Exécutée au build : catégories toutes couvertes, slugs existants, réalisations mises en avant réellement rattachées au service, pages locales publiées |

`lib/services.ts` reste la liste des 6 services (titre, description, icône, URL, nom Schema.org). Les textes des réalisations et articles ne sont pas copiés : seuls leurs slugs sont référencés.

Composants : `components/ServiceSilo.tsx` (réalisations, conseils, zones), `components/ServiceFaq.tsx` (FAQ visible et FAQPage générées depuis le même tableau), `components/ArticleServiceLinks.tsx` (bloc de fin d'article).

---

## 4. Réalisations associées

### Réalisation → services (affiché sur chaque page de réalisation)

| Réalisation | Catégorie | Services liés | Justification |
|---|---|---|---|
| renovation-couverture-tuiles-villeurbanne | Couverture | couverture | catégorie |
| renovation-toiture-ardoise-ste-foy | Couverture | couverture | catégorie |
| renovation-faitage-a-sec-fontaines-sur-saone | Couverture | couverture | catégorie |
| renovation-toiture-tuiles-plat-champagne-au-mont-d-or | Couverture | couverture | catégorie |
| renovation-toiture-garages-corbas | Couverture | couverture | catégorie |
| remplacement-tuiles-cassees-orage-venissieux | Urgence | recherche de fuite, couverture | mise hors d'eau + remplacement de 150 tuiles |
| reparation-fuite-cheminee-brignais | Zinguerie | recherche de fuite, zinguerie | « Recherche de fuite et façonnage d'un abergement » |
| refection-noue-zinc-francheville | Zinguerie | zinguerie, recherche de fuite | « Suite à une fuite au creux du toit » |
| reparation-zinguerie-gouttiere-ecully | Zinguerie | zinguerie, recherche de fuite | « Intervention d'urgence suite à des infiltrations » |
| habillage-bandeaux-rive-alu-meyzieu | Zinguerie | zinguerie | catégorie |
| pose-gouttieres-alu-sur-mesure-dagneux | Zinguerie | zinguerie | catégorie |
| refection-solins-etancheite-lyon-5 | Zinguerie | zinguerie | catégorie (pas de fuite mentionnée) |
| refection-etancheite-toit-terrasse-lyon-6 | Étanchéité | recherche de fuite | « Suite à des infiltrations dans les derniers étages » |
| isolation-combles-perdus-laine-roche-chassieu | Isolation | isolation | catégorie |
| isolation-sarking-toiture-caluire | Isolation | isolation, couverture | dépose et repose d'une couverture neuve |
| demoussage-toiture-ecologique-genas | Entretien | démoussage | catégorie |
| demoussage-traitement-hydrofuge-tassin | Entretien | démoussage | catégorie |
| pose-fenetres-toit-velux-craponne | Fenêtre de toit | fenêtres de toit | catégorie |
| remplacement-velux-ancien-decines | Fenêtre de toit | fenêtres de toit | catégorie |
| creation-verriere-toit-lyon-3 | Fenêtre de toit | fenêtres de toit | catégorie |
| traitement-charpente-bois-saint-priest | Charpente | — | pas de page charpente (volontaire) |
| reparation-charpente-lambourde-oullins | Charpente | — | pas de page charpente ; la fuite y est ancienne, ce n'est pas l'objet du chantier |

### Service → réalisations mises en avant

| Service | Réalisations |
|---|---|
| Couverture | Villeurbanne, Sainte-Foy-lès-Lyon, Champagne-au-Mont-d'Or, Fontaines-sur-Saône, Corbas, Vénissieux |
| Zinguerie | Meyzieu, Brignais, Francheville, Lyon 5e, Dagneux, Écully |
| Isolation | Chassieu, Caluire-et-Cuire |
| Démoussage | Genas, Tassin-la-Demi-Lune |
| Recherche de fuite (« Interventions liées aux fuites et infiltrations ») | Brignais, Vénissieux, Francheville, Écully, Lyon 6e |
| Fenêtres de toit | Décines-Charpieu, Craponne, Lyon 3e |

### Réalisation → page locale
Liens présents (depuis le Lot 3, conservés) pour les 6 réalisations situées dans une commune publiée : Décines-Charpieu, Meyzieu, Villeurbanne, Genas, Chassieu, Saint-Priest. Aucun lien vers une commune sans page.

---

## 5. Articles associés

| Article | Service(s) | Bloc en fin d'article |
|---|---|---|
| comment-detecter-fuite-toiture-lyon | Recherche de fuite | « Besoin d'une intervention ? » |
| artisan-couvreur-urgence-fuite-toiture-lyon-ouest-lyonnais | Recherche de fuite | idem |
| isolation-toiture-par-exterieur-sarking | Isolation | idem |
| aide-financiere-isolation-toiture-renovation-rhone | Isolation | idem |
| quand-remplacer-gouttieres-zinc-pvc-alu | Zinguerie | idem |
| velux-fenetre-toit-luminosite-combles | Fenêtres de toit | idem |
| prix-renovation-toiture-m2-lyon-devis | Couverture + `/devis` | idem |
| nettoyage-demoussage-toiture-entreprise-lyon-val-saone | Démoussage | idem |

Chaque page service affiche ses articles dans un bloc « Nos conseils » (calcul inverse depuis `ARTICLE_LINKS`).

---

## 6. Maillage mis en place

| De | Vers |
|---|---|
| Header (menu Services) | 6 services + « Toutes nos prestations » |
| Footer (toutes les pages) | 6 services, 6 pages locales, hub zones |
| Accueil | 6 services (grille passée de 4 à 3 colonnes pour 6 cartes) |
| Hub `/services` | 6 services (« Six prestations au service de votre toit ») |
| Pages services | réalisations de ce type, articles, pages locales pertinentes, hub zones ; liens croisés entre services (recherche de fuite ↔ couverture, zinguerie, fenêtres de toit) |
| Réalisations | service(s) correspondant(s) + page locale si elle existe |
| Articles | service(s) correspondant(s) (+ devis pour l'article prix) |
| Pages locales | services ajoutés sélectivement (voir ci-dessous) |
| Plan du site | 2 nouvelles pages sous « Services » |

**Pages locales.** Les nouveaux services ont été ajoutés avec un texte propre au territoire, sans reprise des pages services :

| Page locale | Services listés |
|---|---|
| Décines-Charpieu | les 6, dont recherche de fuite (siège proche) et fenêtres de toit (chantier local) |
| Meyzieu, Villeurbanne, Chassieu, Saint-Priest | + recherche de fuite (5 services chacune) |
| Genas | inchangée (4 services, angle entretien) |

À Chassieu et Saint-Priest, le texte « couverture » a été ajusté pour ne pas répéter la mise hors d'eau et la recherche d'infiltrations, désormais portées par le service recherche de fuite.

---

## 7. Données structurées

| Page | JSON-LD |
|---|---|
| 6 pages services | `Service` : `name`, `serviceType`, `description` (texte du site), `url` canonique, `provider` → `https://www.jrenov.com/#business`, `areaServed` = communes desservies. **Pas de** `AggregateRating`, `Review`, `Offer`, certification ni adresse secondaire |
| Recherche de fuite, Fenêtres de toit | + `FAQPage` généré depuis le même tableau que la FAQ visible (égalité vérifiée en HTTP : 5 Q/R chacune) |
| 8 articles | `BlogPosting` : `headline`, `description`, `datePublished` (date de `data/post.json`), `author` (Jason Robba, depuis les données), `publisher` → `#business`, `mainEntityOfPage`. Pas d'image (aucune n'existe), pas de `dateModified` |
| Toutes les pages services | `BreadcrumbList` : Accueil › Nos services › {service} |

## 8. Sitemap

50 URL (48 avant). Les 6 pages services y figurent, générées depuis `SERVICES`. Aucune date ajoutée.

---

## 9. Vérifications

| Vérification | Résultat |
|---|---|
| `npx eslint .` | ✅ 0 problème |
| `npx tsc --noEmit` | ✅ OK |
| `npm run build` | ✅ 60 pages (validations `validateLocalAreas` et `validateServiceContent` passées) |
| HTTP | 200 pour `/`, `/services`, les 6 services, `/realisations`, `/blog`, `/zones-intervention`, `/couvreur-decines-charpieu`, `/couvreur-meyzieu`, `/robots.txt`, `/sitemap.xml` ; **404** pour `/page-inexistante` (noindex, liens vers accueil, services, zones, réalisations, contact) |
| Title, description, canonical, H1 | uniques, canonical identique à la route, un seul H1 par page |
| Crawl local | **51 pages, 0 redirection, 0 lien cassé** ; les 50 URL du sitemap sont atteignables ; seule `/mentions-legales` (noindex) est hors sitemap |
| Anti-duplication services (`PREFIX=/services/`) | ✅ aucun bloc ou passage identique ≥ 100 caractères ; FAQ distinctes ; similarité maximale des titles 0,56 et des descriptions 0,51 (seuil 0,6) |
| Anti-duplication pages locales | ✅ inchangé après l'ajout des services (titles 0,56, descriptions 0,54) |

### Contrôle des affirmations (nouveaux contenus)

Recherche de : RGE, Qualibat, NF, certifié, partenaire, agréé, prix, €, garanti, délais chiffrés, numéro 1, expert, caméra, thermique, fumigène, drone, détecteur.

| Occurrence | Décision |
|---|---|
| « partenaire », « agréé » (page fenêtres de toit) | conservées : ce sont des **négations** explicites |
| « bâché en moins de 12 heures » (Vénissieux) | conservée : fait daté du chantier (`data/realisations.json` : « Bâchage d'urgence sous 12h »), pas une promesse |
| « Service d'urgence fuite 7j/7 » | conservée : information déjà publiée par l'entreprise (page contact, footer) |
| « entreprise agréée » (Corbas, page Saint-Priest) | conservée : désigne l'entreprise de désamiantage, pas Jrenov (texte du chantier) |
| « R = 8 m².K/W » (Chassieu) | conservée : donnée du chantier |
| RGE, Qualibat, NF, prix, €, garantie, technique de détection | **aucune** occurrence dans les nouveaux contenus |

---

## 10. Recommandations pour la suite

1. **Lot 5 — recentrer les 4 pages services existantes** : leurs titles et H1 visent encore « Lyon (69) ». Adopter l'ancrage Décines-Charpieu / Est lyonnais / métropole déjà utilisé sur les nouvelles pages, et ajouter une FAQ réelle à chacune (avec FAQPage correspondant).
2. Titles de `/realisations` et `/blog` (encore « à Lyon »).
3. Ajouter des réalisations réelles de recherche de fuite et de fenêtres de toit dans l'Est lyonnais, pour renforcer les deux nouvelles pages et débloquer de futures pages locales.
4. Décision commerciale à prendre sur la charpente avant toute page dédiée.
5. Search Console : soumettre le sitemap à nouveau ; demander l'indexation des 2 nouvelles pages services.
