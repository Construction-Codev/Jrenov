# Lot 6 — Page locale /couvreur-lyon et audit des engagements commerciaux

> Réalisé le 7 octobre 2026. Rien n'a été commité ni poussé. Facebook, Analytics, Speed Insights, formulaires et `.env` non modifiés.

## 1. Page `/couvreur-lyon`

Créée dans l'architecture du Lot 3 : une entrée dans `data/local-areas.ts` et dans `data/local-area-index.ts`, aucune nouvelle route. Le build a validé (`validateLocalAreas`) que les 3 réalisations dites « locales » sont bien situées à Lyon.

| Élément | Valeur |
|---|---|
| Mot-clé principal | couvreur Lyon |
| Title | Couvreur à Lyon – Toits-terrasses, solins & verrières \| Jrenov |
| Description | Toits-terrasses, solins de maisons de ville, verrières : Jrenov intervient à Lyon depuis Décines-Charpieu. Chantiers réalisés dans les 3e, 5e et 6e. |
| H1 | Couvreur à Lyon : immeubles, toits-terrasses et maisons de ville |
| Angle | Bâti urbain : copropriétés, toits-terrasses, mitoyenneté, verrières, secteurs protégés |
| Réalisations locales | `refection-etancheite-toit-terrasse-lyon-6`, `creation-verriere-toit-lyon-3`, `refection-solins-etancheite-lyon-5` |
| Réalisations voisines | Villeurbanne (couverture), Caluire-et-Cuire (Sarking), Sainte-Foy-lès-Lyon (ardoise) |
| Services mis en avant | recherche de fuite, zinguerie, fenêtres de toit, couverture, isolation |
| FAQ (4) | D'où intervient Jrenov ? · Toits-terrasses d'immeubles ? · Passer par le syndic ? · Verrière dans une toiture lyonnaise ? |
| JSON-LD | `WebPage` + `Service` (`provider` → `#business`, `areaServed` → Lyon) + `BreadcrumbList` |
| Fil d'Ariane | Accueil › Zones d'intervention › Couvreur à Lyon |

Garde-fous :
- la page dit explicitement que Jrenov **n'est pas installé à Lyon** et intervient depuis Décines-Charpieu ;
- les faits de chantier viennent uniquement de `data/realisations.json` ;
- les points réglementaires (parties communes en copropriété, avis de l'Architecte des Bâtiments de France en secteur protégé) sont formulés au conditionnel, avec renvoi vers la mairie ou le règlement de copropriété.

**Maillage ajouté** : hub `/zones-intervention` (secteur Lyon), page Villeurbanne (communes voisines), footer, accueil, contact et plan du site (via l'index local), pages services zinguerie, fenêtres de toit et recherche de fuite, et les 3 réalisations lyonnaises (lien « Voir nos interventions de couverture à Lyon »).

**Cannibalisation** : l'accueil vise la marque et l'Est lyonnais, `/couvreur-lyon` vise uniquement Lyon intra-muros. Aucune autre page n'a « Lyon » en tête de title.

## 2. Audit des engagements commerciaux

### Décisions de l'entreprise (7 octobre 2026)

| Engagement | Décision | Action |
|---|---|---|
| Intervention urgence **sous 24h** | **Confirmé** | Conservé (accueil). Ajouté dans la FAQ « Intervenez-vous en urgence ? » de `/services/recherche-de-fuite` |
| Réponse / devis **sous 24h** | **Confirmé** | Conservé (accueil, devis, contact, réalisations, description de `/devis`). Rétabli sur l'encart de `/services/demoussage` (retiré au Lot 5 faute de confirmation) |
| Urgence fuite **7j/7** | **Confirmé** | Conservé partout (header, footer, Hero, accueil, contact, recherche de fuite) |
| Diagnostic et devis **gratuits, sans engagement** | **Confirmé** | Conservé partout |
| « Travaux garantis 10 ans » (Hero) | **Reformulé** | « Travaux couverts par notre assurance décennale. » |
| « Garantie Décennale sur tous les chantiers » (contact) | **Reformulé** | « Travaux couverts par notre assurance décennale » |

Les badges « Garantie Décennale » / « Travaux sous Garantie Décennale 10 Ans » des pages couverture, zinguerie, isolation et du hub services sont conservés, comme convenu.

### Autres corrections (promesses absolues dans les articles)

| Article | Avant | Après |
|---|---|---|
| Gouttières zinc, PVC, alu | « Un couvreur-zingueur **garantit un écoulement parfait** et une étanchéité durable. » | « Un couvreur-zingueur règle la pente et les raccords pour assurer un bon écoulement et une étanchéité durable. » |
| Fenêtres de toit Velux | « **Étanchéité garantie** : remplacement des raccords… » | « **Étanchéité renouvelée** : remplacement des raccords… » |

### Points conservés, à garder en tête

- « 24 heures **ouvrées** » sur l'écran de succès du devis : plus prudent que « sous 24h » et cohérent, donc conservé.
- Article urgence : « un professionnel se déplace sous 24h à 48h » est une formulation générale sur la profession, pas un engagement de Jrenov.
- « Durée de vie supérieure à 40 ans » (zinc) et « tous les 3 à 5 ans » (démoussage) : données techniques générales, pas des engagements.
- Le badge « Garantie Décennale 10 ans » s'affiche sur **toutes** les pages de réalisation, y compris les 2 chantiers de démoussage (Genas, Tassin-la-Demi-Lune), que la décennale ne couvre pas. À rendre conditionnel à la catégorie si vous le souhaitez.

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | ✅ 116/116 |
| `npx eslint .` | ✅ 0 problème |
| `npx tsc --noEmit` | ✅ OK |
| `npm run build` | ✅ 61 pages |
| HTTP | `/couvreur-lyon` 200 ; `/couvreur-bron` et `/page-inexistante` 404 |
| Sitemap | 51 URL (dont `/couvreur-lyon`) |
| Crawl | 52 pages, 0 redirection, 0 lien cassé, sitemap entièrement atteignable |
| Anti-duplication, 7 pages locales | ✅ aucun bloc ≥ 100 caractères ; titles 0,56, descriptions 0,54 |
| Anti-duplication, 6 pages services | ✅ titles 0,46, descriptions 0,45 |
