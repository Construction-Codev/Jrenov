# Diagnostic Google Ads — couverture de balise et conversions JRENOV (3 novembre 2026)

## Périmètre et statut

Audit en lecture du code `master` (commit `d43459405d9bc73e6e87ad1277ae3a2410f8e747`). Aucune modification du consentement, de l'identifiant Google Ads, des campagnes, du budget ou des enchères. L'accès HTTP public aux pages de production n'a pas permis de réaliser une vérification instrumentée ; les conclusions ci-dessous **ne constituent pas** une validation navigateur en production.

Le rapport Google Ads communiqué montre 22 URL « Sans balise » et 3 « Avec balise ». Il ne fournit pas les dates de chaque détection ni le contexte de consentement du robot.

## Constats confirmés dans le dépôt

- `app/layout.tsx` monte `<GoogleTag />` dans le layout racine commun à toutes les routes, y compris les pages locales `app/[localSlug]/page.tsx` et `/services/recherche-de-fuite`.
- `components/GoogleTag.tsx` ne rend aucun `<Script>` tant que `getAdsConsent() !== "granted"`. Si accord, le composant envoie le consentement initial refusé, puis une mise à jour accordée et configure `AW-18401022050`, avec le chargement de `gtag.js`. Il s'agit d'une implémentation du **Consent Mode basique** : sans accord, aucune balise Google Ads n'est chargée.
- `lib/google-ads.ts` utilise `AW-18401022050/3zwjCM7KnZcdEOKgpcZE` pour un formulaire réellement accepté par l'API et `AW-18401022050/xlbwCOjuo5sdEOKgpcZE` pour les clics téléphoniques consentis.
- `components/AnalyticsEvents.tsx` délègue les clics `tel:` sur toutes les pages, avec `event.isTrusted`. `lib/contact-link-tracking.ts` transmet à Vercel Analytics l'emplacement (sans numéro), puis tente la conversion Google Ads avec consentement.
- Une conversion « clic téléphone » ne prouve **pas** qu'un appel a abouti. Les utilisateurs qui composent le numéro manuellement ne déclenchent pas ce suivi. Sans clic publicitaire attribuable, une conversion technique n'est pas nécessairement créditée à Google Ads.

## Hypothèses restant à tester

1. **Explication probable des pages « Sans balise » :** l'outil de couverture visite les pages sans avoir accepté les cookies. Cette hypothèse est cohérente avec le code, mais elle n'est **pas prouvée** par le seul rapport Google.
2. Certaines URL pourraient avoir été explorées antérieurement, être des redirections/404 ou avoir été testées avec des bloqueurs. Contrôler individuellement leur statut HTTP et leur disponibilité en production.
3. L'absence de conversion pour l'appel du 29 octobre peut provenir d'un refus du consentement, d'une composition manuelle, d'un clic non associé à Google Ads, d'un bloqueur, d'un retard de traitement ou d'un défaut technique. **Impossible de désigner une cause sans traces du parcours.**

## Plan de vérification navigateur — sans conversions réelles

Pour les routes `/`, `/contact`, `/couvreur-lyon`, `/couvreur-decines-charpieu`, `/services/recherche-de-fuite` :

1. Dans un profil neuf (stockage local vierge), ouvrir la page et constater qu'aucune requête vers `googletagmanager.com/gtag/js` n'est lancée avant choix.
2. Refuser les cookies et vérifier que `gtag.js` ne se charge pas.
3. Réouvrir les préférences puis accepter. Vérifier dans Tag Assistant la présence de `AW-18401022050`, l'ordre des commandes de consentement et la configuration `gtag('config', ...)`.
4. Avec les cookies acceptés, naviguer vers d'autres pages locales et les pages services ; contrôler la balise. Un chargement en SPA peut ne pas recréer un script à chaque changement de route, ce qui ne signifie pas nécessairement qu'il a disparu.
5. Pour un clic d'appel, remplacer temporairement `window.gtag` par une fonction espion **dans un environnement de test** afin de vérifier le `send_to` sans envoyer une conversion réelle. Tester consentement accepté/refusé, vrai clic et faux clic, bouton mobile et liens de contenu.
6. Pour le formulaire, préférer les mocks d'API existants aux envois de demandes réelles ; vérifier qu'une réponse serveur de succès avec `submissionId` est nécessaire avant toute conversion.
7. Comparer après ces tests le rapport de couverture Google Ads (sa mise à jour n'est pas instantanée).

## Critères de réussite

- Toutes les URL valides utilisent le layout commun et chargent une seule instance de la balise **après acceptation**.
- Zéro chargement Google Ads avant consentement ou après refus initial.
- Les bons identifiants de conversion sont émis une seule fois selon les garde-fous actuels.
- Aucune information personnelle n'est envoyée par les appels de conversion.
- Pas de changement d'optimisation vers « Maximiser les conversions » sur la seule base des clics téléphone.

## Décisions différées

Ne **pas** migrer automatiquement vers Consent Mode avancé. En mode avancé, la balise peut émettre des signaux sans cookies même si le stockage est refusé. Une validation juridique et une décision explicite de l'entreprise sont nécessaires avant cette migration.

Ne **pas** dupliquer la balise dans chaque page, ni convertir « clic téléphone » en action principale sans mesure de la qualité des appels.

## Documentation Google

- https://developers.google.com/tag-platform/security/concepts/consent-mode
- https://developers.google.com/tag-platform/security/guides/consent-debugging?hl=fr
- https://support.google.com/analytics/answer/14681508?hl=fr
