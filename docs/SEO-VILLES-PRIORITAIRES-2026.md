# JRENOV — extension SEO locale, octobre 2026

## Périmètre
- Siège réel unique : 48 Ancien Chemin des Marais, Décines-Charpieu.
- 7 pages ville existantes + 18 pages géographiques spécifiques = **25 pages ville**.
- **Aucun chantier inventé**, aucune fausse adresse dans les villes ciblées.
- Une page riche par commune, avec 5 prestations liées aux 6 pages de service existantes, et non 6 duplications de page par ville.
- Une page est une zone d'intervention potentielle ; elle ne prouve pas une réalisation locale.
- La disponibilité commerciale (notamment pour communes plus éloignées) doit être confirmée par JRENOV avant publication.

## Villes ajoutées avec réalisation locale documentée
| Commune | Chantier cité et vérifié dans data/realisations.json |
|---|---|
| Vénissieux | Mise hors d'eau et tuiles après intempéries (juin 2026) |
| Caluire-et-Cuire | Isolation par l'extérieur (mars 2026) |
| Écully | Gouttières zinc (février 2026) |
| Tassin-la-Demi-Lune | Démoussage et hydrofuge (février 2026) |
| Corbas | Bac acier sur toiture de garage (septembre 2026) |
| Sainte-Foy-lès-Lyon | Couverture en ardoise (avril 2026) |
| Francheville | Noue zinc et fuite (août 2026) |

## Villes ajoutées sans chantier local déclaré
Bron ; Vaulx-en-Velin ; Rillieux-la-Pape ; Mions ; Miribel ; Beynost ; Jonage ; Saint-Bonnet-de-Mure ; Saint-Fons ; Dardilly ; Saint-Laurent-de-Mure.

Les fiches citent parfois **une réalisation d'une autre commune**, explicitement décrite comme telle. Elles ne contiennent aucun avis, bureau local ou temps d'intervention fictif.

## Principes SEO
1. Page unique par ville, textes éditoriaux spécifiques (contexte, problèmes, offres, FAQ), H1, title, description et URL canoniques.
2. Chaque prestation de la page renvoie à sa page service centrale : couverture, fuite, zinguerie, isolation, démoussage et fenêtres de toit selon pertinence.
3. Liens entrants depuis /zones-intervention, /plan-du-site, le sitemap XML et un nombre raisonné de pages services.
4. Les réalisations citées en preuve locale doivent avoir un slug réel et une ville identique dans data/realisations.json, contrôlés par validateLocalAreas.
5. Maintenir une seule adresse réelle dans les données structurées ; ne pas créer de Google Business Profile secondaire sans site physique et éligibilité.
6. Ne pas dupliquer en série des centaines de pages ville × service sans différenciation et apport local vérifiable : risque de pages satellites / doorway pages.

## Sources et limites
- INSEE, comparateur de territoires (population 2023, publié en août 2026) :
  - Bron : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69029
  - Vaulx-en-Velin : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69256
  - Rillieux-la-Pape : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69286
  - Caluire-et-Cuire : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69034
  - Vénissieux : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69259
  - Mions : https://www.insee.fr/fr/statistiques/1405599?geo=COM-69283
  - Miribel : https://www.insee.fr/fr/statistiques/1405599?geo=COM-01249
- Google Search Central, spam/doorway guidance: https://developers.google.com/search/docs/essentials/spam-policies
- Les priorités reposent sur la population, la proximité depuis Décines, les chantiers existants et la pertinence des services. **Ce ne sont pas des volumes de recherche ni des estimations garanties de leads**.

## Avant fusion / mise en ligne
- [ ] Vérifier auprès de JRENOV la zone effective d'intervention, notamment dans l'Ain et l'ouest lyonnais.
- [ ] Relire le contexte de chaque ville et les formulations commerciales.
- [ ] Exécuter `npm run lint`, `npm test`, `npm run build` et un crawl des 25 pages locales.
- [ ] Vérifier dans la prévisualisation que toutes les pages produisent un HTTP 200, avec H1/title/description uniques et les bons liens.
- [ ] S'assurer que les photos représentent de vrais chantiers, avec permission d'utilisation, avant toute attribution à une ville.
- [ ] Après publication : inspecter quelques pages dans Search Console, suivre impressions, clics, requêtes par commune et vrais devis qualifiés.
