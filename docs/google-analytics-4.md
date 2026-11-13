# JRENOV — Préparation de Google Analytics 4 (GA4)

## État actuel
- Le site dispose de Vercel Analytics et Google Ads via `AW-18401022050`.
- Aucun identifiant de flux GA4 n'est présent dans Vercel au moment de la PR.
- **Cette PR n'ouvre ni ne crée de propriété Google Analytics**. La mesure GA4 demeure inactive jusqu'à la configuration par le propriétaire du compte.
- Seules les pages du site et les événements de conversion sont prévus ; aucun import de conversions Google Ads n'est automatisé.

## Activation (après création/vérification de la propriété)
1. Dans [Google Analytics](https://analytics.google.com/), utiliser une propriété GA4 sous le compte du propriétaire de JRENOV ; ne pas créer un doublon si une propriété existe déjà.
2. Administration > Flux de données > Web > `www.jrenov.com` : récupérer l'identifiant public `G-XXXXXXXXXX`.
3. Ajouter dans **Vercel → Projet jrenov → Settings → Environment Variables** la variable `NEXT_PUBLIC_GA4_MEASUREMENT_ID` avec cette valeur. La portée **Production** est indispensable ; Preview est facultative, les statistiques des tests doivent rester séparées pour ne pas polluer la propriété réelle.
4. Redéployer Production pour intégrer la valeur publique dans le bundle Next.js. Le site partagera `gtag.js` entre Google Ads et GA4.
5. Depuis une session de navigation privée : refuser tout et vérifier **aucune requête de suivi Google** ; accepter uniquement Analytics et contrôler GA4 en Temps réel / DebugView ; accepter uniquement Ads et contrôler que la mesure GA4 ne reçoit pas de pages vues.
6. Tester les événements `phone_click`, `quote_form_start`, `quote_form_submit`, `contact_form_submit`, `callback_request`. Aucun e-mail, téléphone ou message de formulaire ne doit être envoyé à GA4.
7. Marquer `quote_form_submit`, `contact_form_submit` et `callback_request` comme événements clés GA4 selon la qualification métier. **Ne pas importer en doublon ces événements clés en conversions primaires Google Ads** si l'action Google Ads existante compte déjà les mêmes prospects.
8. Lorsque suffisamment de données sont disponibles : mesurer les pages d'entrée, la proportion de sessions engagées, l'appareil et la source, sans confondre clic téléphone et appel abouti.

## Consentement
- Choix indépendants : `jrenov-consent-ads` et `jrenov-consent-analytics`.
- Un accord Ads historique ne vaut jamais autorisation GA4 ; consentement GA4 demandée au premier passage après activation.
- Absence d'accord : aucune bibliothèque Google chargée.
- Retrait : signaux `analytics_storage:denied` ou `ad_storage:denied` ; pas de nouveaux événements de la finalité retirée.
- La bannière affiche des options de refus et d'acceptation d'importance visuelle équivalente.
- Les mentions légales ont été mises à jour.
- Les performances Vercel restent suivies indépendamment.

## Engagement et rappel
La communication JRENOV indique désormais le **rappel 24 h/24, 7 j/7** (sur instructions du propriétaire). Cette promesse implique une équipe réellement disponible pour rappeler à ces horaires. Les modifications ne modifient pas l'acheminement des messages ni ne mettent en place un standard téléphonique permanent.

## Déploiement
PR à fusionner uniquement après lint, tests et build. Sans `G-...`, seule la nouvelle promesse de rappel devient visible ; GA4 attend son identifiant.
