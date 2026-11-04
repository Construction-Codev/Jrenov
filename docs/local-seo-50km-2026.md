# Déploiement SEO local autour de Décines-Charpieu

## Objectif
Améliorer la réponse aux recherches « couvreur + commune », « réparation toiture + commune », « rénovation de toiture + commune », « charpente + commune », « zinguerie + commune », « démoussage + commune », « isolation toiture + commune » et « recherche de fuite + commune », sans création de faux établissements, de chantiers inventés ni de pages de simple substitution de ville.

## Portée de la PR
- 25 pages existantes relues, expressions négatives supprimées et 2 nouvelles réponses techniques personnalisées par commune.
- 30 pages nouvelles avec angle éditorial propre à la commune, diagnostic, prestations, questions clients et exemples de **chantiers explicitement situés ailleurs**.
- 55 pages locales au total avec route, canonical et sitemap via les sources de vérité du site.
- Répertoire interactif : environ 650 communes dans un rayon indicatif de 50 km autour du centroïde de Décines-Charpieu. Un référencement dans l'annuaire **n'implique pas une page dédiée**.
- Le site n'invente aucune implantation, note, certification, chantier local, tarif, disponibilité ou statistique de demande.

## Géographie : limites et vérifications
La première liste est calculée à partir des géométries IGN Admin Express COG 2018 diffusées sur gregoiredavid/france-geojson, géométries simplifiées au format GeoJSON. La fusion d'Oullins et Pierre-Bénite (commune nouvelle Oullins-Pierre-Bénite, code 69149 depuis 2024) a été corrigée. La distance calculée est une distance à vol d'oiseau entre centres géométriques, pas une distance routière, ni une garantie commerciale d'intervention.

**Ce périmètre est provisoire, non certifié exhaustif pour le COG 2026.** Avant d'employer « toutes les communes officiellement comprises dans 50 km », vérifier les changements de noms et de frontières avec le COG 2026 de l'INSEE et recalculer le rayon sur le nouveau référentiel. Les communes à la frontière des 50 km sont particulièrement sensibles à la méthode de calcul. Le site emploie donc « approximatif ».

Sources :
- https://www.insee.fr/fr/information/8740222
- https://github.com/gregoiredavid/france-geojson
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Qualité éditoriale et prochaines vagues
L'objectif n'est pas de publier 650 pages interchangeables. Une page dédiée doit être appuyée par un angle utile, un diagnostic technique adapté au problème visé, des réponses FAQ spécifiques, un maillage vers les services réels et, lorsque c'est possible, une réalisation réellement située dans la ville. Les nouveaux contenus doivent être relus par un couvreur avant publication.

Les communes du répertoire sans page dédiée restent **non liées** jusqu'à la préparation d'un contenu propre et justifié. La création de centaines de pages sans cette valeur ajoutée exposerait le site à un risque de pages satellites (doorway pages) et de contenu produit à grande échelle pour manipuler les classements.

## Avant merge
- Build Vercel READY pour le commit de la PR.
- Tests : `npm test`, `npm run lint`, `npm run build`.
- Vérification manuelle des 55 pages : intentions de recherche, liens, titres SEO, FAQ et lecture mobile.
- Contrôle anti-duplication avec `npm run check:local-duplication` sur une instance de preview accessible.
- Vérifier la capacité réelle de l'entreprise à se déplacer et à traiter les demandes, particulièrement en limite de rayon.

Les volumes exacts des mots-clés n'ont **pas** été vérifiés dans Google Keyword Planner ni Search Console pour chaque commune ; ne pas présenter les formulations comme un classement de recherches observées.
