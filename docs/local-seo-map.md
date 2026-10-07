# Carte SEO locale — backlog des communes (rayon ~50 km autour de Décines-Charpieu)

> Mis à jour le 7 octobre 2026, à l'issue du Lot 3.
> Point de départ : siège de Jrenov, 48 Ancien Chemin des Marais, 69150 Décines-Charpieu.
> **Les distances sont des ordres de grandeur à vol d'oiseau, depuis Décines-Charpieu jusqu'au centre de la commune ; elles sont à vérifier avant d'être utilisées dans un contenu.** Elles servent uniquement à prioriser.
> « Réalisation » = au moins un chantier publié dans `data/realisations.json`.

## Règle de publication

Une page `/couvreur-{commune}` n'est publiée **que si** elle peut avoir un contenu réellement propre :

1. au moins **une réalisation réelle** dans la commune, **ou** un lien géographique fort avec le siège (commune limitrophe) **et** un angle éditorial distinct ;
2. un angle (type de bâti, prestation dominante, contexte) **différent** des pages existantes ;
3. un passage sans alerte du contrôle `npm run check:local-duplication`.

Être dans le rayon de 50 km **ne suffit pas**. Sans contenu propre, la commune reste citée sur `/zones-intervention`, sans page dédiée.

---

## Déjà publiées (Lots 3 et 6)

| Commune | Distance approx. | Réalisation | Angle |
|---|---|---|---|
| Décines-Charpieu | 0 km (siège) | ✅ Fenêtres de toit | Siège, proximité |
| Meyzieu | ~4 km | ✅ Bandeaux / rives alu | Bas de toit, zinguerie |
| Villeurbanne | ~8 km | ✅ Réfection tuiles | Maisons de ville, rénovation en ville |
| Genas | ~6 km | ✅ Démoussage | Entretien, démoussage |
| Chassieu | ~5 km | ✅ Isolation combles | Isolation + couverture |
| Saint-Priest | ~10 km | ✅ Traitement charpente | Charpente + couverture |
| **Lyon** (Lot 6) | ~12 km (centre) | ✅ Lyon 3e, 5e, 6e | Bâti urbain : toits-terrasses, solins, verrières, copropriétés |

---

## Tier 1 — prochaine vague à étudier

| Commune | Distance approx. | Réalisation | Potentiel | Créer une page ? | Priorité |
|---|---|---|---|---|---|
| **Vaulx-en-Velin** | ~5 km | ❌ | Fort (commune limitrophe, population importante) | **Oui, sous condition** : seule commune limitrophe importante sans page. Attendre une première réalisation, ou un angle propre validé par l'entreprise (habitat, quartiers desservis) | 2 |
| **Bron** | ~6 km | ❌ | Fort (proche, population importante) | **Oui, sous condition** : même logique que Vaulx-en-Velin. Le risque est une page trop proche de Chassieu ou Saint-Priest | 2 |

## Tier 2

| Commune | Distance approx. | Réalisation | Potentiel | Créer une page ? | Priorité |
|---|---|---|---|---|---|
| Caluire-et-Cuire | ~11 km | ✅ Isolation Sarking | Moyen à fort | Oui, angle isolation par l'extérieur ; attention à la cannibalisation avec Chassieu (isolation) | 3 |
| Vénissieux | ~11 km | ✅ Urgence après orage | Moyen à fort | Oui, angle urgence et mise hors d'eau, très différent des pages existantes | 3 |
| Corbas | ~13 km | ✅ Bac acier sur dépendance | Moyen | Possible, angle dépendances et bac acier ; page courte à éviter | 4 |
| Jonage | ~7 km | ❌ | Faible à moyen (petite commune limitrophe de Meyzieu) | Non pour l'instant : citée sur Meyzieu et sur le hub | 5 |
| Rillieux-la-Pape | ~10 km | ❌ | Moyen | Non tant qu'il n'y a pas de chantier | 5 |
| Mions | ~13 km | ❌ | Faible à moyen | Non tant qu'il n'y a pas de chantier | 6 |
| Saint-Bonnet-de-Mure | ~12 km | ❌ | Faible à moyen | Non : regroupement possible dans une section « Est lyonnais hors Métropole » du hub | 6 |
| Saint-Laurent-de-Mure | ~15 km | ❌ | Faible | Non : idem | 7 |
| Pusignan | ~10 km | ❌ | Faible | Non : citée sur Meyzieu et Genas | 7 |
| Miribel | ~11 km | ❌ | Faible à moyen (Côtière de l'Ain) | Non tant qu'il n'y a pas de chantier | 7 |
| Beynost | ~12 km | ❌ | Faible | Non | 8 |

## Secteurs plus éloignés

| Secteur | Distance approx. | Réalisations | Stratégie |
|---|---|---|---|
| **Ouest lyonnais** (Écully, Tassin-la-Demi-Lune, Craponne, Sainte-Foy-lès-Lyon, Francheville, Oullins, Brignais) | ~15–25 km | ✅ 7 chantiers | Valoriser via les réalisations et le hub. Une page secteur « Ouest lyonnais » plutôt que 7 pages communales, à étudier après le Tier 1. La concurrence locale y est plus proche des clients que Jrenov |
| **Val de Saône / Monts d'Or** (Fontaines-sur-Saône, Champagne-au-Mont-d'Or, Neuville-sur-Saône) | ~15–20 km | ✅ 2 chantiers | Idem : page secteur éventuelle, l'article de blog Val de Saône existe déjà |
| **Côtière de l'Ain** (Dagneux, Montluel, Miribel, Beynost, Neyron) | ~10–20 km | ✅ 1 chantier (Dagneux) | Hub uniquement pour l'instant |
| **Nord-Isère** (Pont-de-Chéruy, Tignieu-Jameyzieu, Charvieu-Chavagneux, Crémieu, Villefontaine, L'Isle-d'Abeau, Bourgoin-Jallieu) | ~15–35 km | ❌ aucun | **Rien à publier** tant qu'aucun chantier n'existe. Le secteur n'apparaît pas sur le hub pour l'instant |
| **Limites du rayon** (Vienne, Givors, Villefranche-sur-Saône) | ~30–45 km | ❌ | Non prioritaire |

---

## Ce qui débloquerait une page

Pour chaque nouvelle commune, il suffit d'ajouter un chantier réel (photo, description, date, durée) dans `data/realisations.json`. Il apparaît alors automatiquement sur le hub, dans le secteur concerné. La page locale est ensuite créée en ajoutant une entrée dans `data/local-areas.ts` et dans `data/local-area-index.ts`. La validation du build vérifie que la réalisation « locale » est bien dans la commune.
