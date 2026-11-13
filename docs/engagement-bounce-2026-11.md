# JRENOV — Optimisation de l'engagement et des demandes de devis

## Diagnostic : 13 novembre 2026
Données du projet Vercel et de son instantané sauvegardé dans CODE-V OS.

- 2–8 novembre : **125 visiteurs, 281 pages vues**, dont **83 visiteurs sur mobile**.
- Pages consultées : `/services/couverture` **50 visiteurs**, `/` **30**, `/devis` **28**.
- 14 octobre–13 novembre : **22 événements quote_form_start**, **7 quote_form_submit** (20 et 6 visiteurs distincts à l'intérieur de chaque catégorie d'événement). **Ne pas déduire un taux d'abandon précis** : ce sont des événements, pas un entonnoir de sessions.
- Une semaine affichait 23 clics téléphone pour un seul visiteur : **ne pas compter les clics comme des appels réels** sans rapprochement.
- Le **taux de rebond Vercel n'est pas présent** dans les données remontées dans CODE-V OS ; pas de taux chiffré fourni.
- Vercel Web Analytics considère une session comme un rebond lorsqu'elle n'a qu'une page vue, même si une action personnalisée comme un clic téléphone a eu lieu. Réduire ce chiffre artificiellement par des changements d'URL est interdit.

## Modifications dans cette PR
- **Mobile (moins de 768 px)** et `prefers-reduced-motion` : poster statique du hero, aucun `src` vidéo chargé ; conservation des vidéos sur desktop.
- Page `/services/couverture` : navigation contextuelle vers fuite et réalisations, bloc de rappel direct à proximité du haut de page.
- Page `/services/recherche-de-fuite` : rappel direct en alternative à l'appel urgent, sans reléguer le numéro hors de la première section.
- Page `/devis` : possibilité de demander un rappel avec nom + téléphone à la place de quatre champs (dont le message obligatoire). Le formulaire existant, ses anti-spams et les conversions Google Ads sont conservés.

## Plan de mesure : comparaison à trafic comparable
- Dans Vercel Analytics, mesurer **le taux de rebond réel par page d'entrée et appareil** sur 14 jours avant/après mise en production. Segmenter Google Ads / organique lorsque la source est disponible. Le bounce rate Vercel ne tient pas compte des événements personnalisés.
- **KPI prioritaire : demandes exploitables** confirmées par les retours clients (appels aboutis, `callback_request`, `quote_form_submit`, `contact_form_submit`). Éviter le double comptage entre événements et clients.
- **KPI secondaires :** visiteurs uniques sur les pages clés, ratio de sessions avec plusieurs pages vues, sessions engagées GA4 si GA4 est ajouté, LCP/INP mobiles dans Speed Insights, qualité des conversions Google Ads.
- Pas d'objectif chiffré de baisse garanti tant que la valeur de rebond initiale n'est pas accessible.
- Surveiller le taux de dépôt des formulaires et les causes d'échecs des demandes de devis pour éviter une baisse de qualité des leads.

## Déploiement
PR sans fusion automatique. Exécuter `npm test`, `npm run lint`, `npm run build` et tests mobiles de l'affichage, des vidéos et des deux formulaires. Comparer après revue et merge. Aucun changement Google Ads.
