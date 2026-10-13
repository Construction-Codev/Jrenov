# Suivi Google Ads

- Compte : `AW-18401022050`
- Conversion « Website lead » : `AW-18401022050/3zwjCM7KnZcdEOKgpcZE`
- Conversion « Clic téléphone » : `AW-18401022050/xlbwCOjuo5sdEOKgpcZE` (action **secondaire** dans
  Google Ads pendant la validation : réglage fait dans l'interface Google Ads, pas dans le code)

## Fonctionnement

| Élément | Fichier |
|---|---|
| Balise gtag.js, chargée une fois pour tout le site, **uniquement après consentement** | `components/GoogleTag.tsx` (monté dans `app/layout.tsx`) |
| Consentement publicitaire (`granted` / `denied` / `unknown`) | `lib/consent.ts` |
| Conversion lead | `lib/google-ads.ts` → `trackLeadConversion()` |
| Conversion clic téléphone | `lib/google-ads.ts` → `trackPhoneConversion()` |
| Délégation des clics `tel:` / `mailto:` (Vercel + conversion téléphone) | `components/AnalyticsEvents.tsx` → `lib/contact-link-tracking.ts` |
| Identifiant de soumission renvoyé après envoi réel | `lib/form-security/submission.ts` (`submissionId`) |

La conversion est déclenchée par `/contact` et `/devis` uniquement quand l'API a répondu 200
**avec** un `submissionId`, c'est-à-dire après l'envoi effectif de l'email. Le faux succès du
honeypot ne contient pas d'identifiant : il n'est jamais comptabilisé. Le `submissionId` est
transmis en `transaction_id` (dédoublonnage côté Google) et mémorisé dans l'onglet (pas de
double déclenchement côté navigateur). Aucune donnée saisie n'est envoyée à Google.

Jamais de conversion : à l'ouverture des pages, au clic sur Envoyer, en cas d'erreur de
validation ou serveur, sur les clics téléphone/e-mail (ceux-ci ont leur propre conversion, voir plus bas). Absence de gtag, refus ou bloqueur
n'empêchent jamais l'envoi du formulaire (tout est dans des `try/catch`, après le succès).

## Clic téléphone

Un seul écouteur `click` (phase de capture, sur `document`) dans `components/AnalyticsEvents.tsx`
repère les liens `tel:` et `mailto:` de tout le site. Pour chaque clic il envoie toujours
`phone_click` / `email_click` à Vercel Analytics (emplacement seulement). Pour un `tel:` cliqué
réellement par le visiteur (`event.isTrusted`), il appelle aussi `trackPhoneConversion()`, qui :

- n'envoie rien si le consentement est `denied` ou `unknown`, ou si gtag est absent ;
- envoie `conversion` avec le `send_to` téléphone et `transport_type: "beacon"`, sans aucun
  paramètre (jamais le numéro) ;
- ignore un nouveau clic dans les 2 secondes (double tap, double écoute) ;
- ne fait jamais `preventDefault` et ne lève jamais : l'application Téléphone s'ouvre toujours.

Rien n'est déclenché au chargement d'une page ni sur un clic `mailto:`.

### Validation avec Google Tag Assistant

1. Ouvrir https://tagassistant.google.com, « Add domain », saisir `https://www.jrenov.com`.
2. Dans la fenêtre ouverte, **refuser** la bannière puis cliquer un numéro : Tag Assistant ne
   doit montrer aucune balise `AW-18401022050`.
3. « Gérer mes cookies » (pied de page) → **Accepter** : la balise `AW-18401022050` apparaît
   (événements `config`), sans conversion.
4. Cliquer le numéro du header (sur ordinateur, fermer la boîte « ouvrir l'application ») :
   un événement `conversion` avec `send_to = AW-18401022050/xlbwCOjuo5sdEOKgpcZE` apparaît, une
   seule fois même en double-cliquant.
5. Cliquer l'adresse e-mail : aucune conversion.
6. Dans Google Ads, Objectifs → Conversions → « Clic téléphone » → « Résolution des problèmes
   / Diagnostic » : le statut passe à « Enregistrement des conversions » sous quelques heures.
   Ces clics de test comptent comme conversions réelles : les faire depuis une IP exclue ou
   les accepter comme bruit pendant la phase secondaire.

## Consentement

`components/ConsentBanner.tsx` (bandeau compact en bas d’écran, monté dans `app/layout.tsx`) s'affiche tant qu'aucun choix n'est
enregistré. « Accepter » et « Refuser » ont le même style ; ils appellent `setAdsConsent(true)` et
`setAdsConsent(false)`. Le choix est mémorisé (`localStorage`, clé `jrenov-consent-ads`). Le bouton
« Gérer mes cookies » du pied de page (`components/ManageCookiesButton.tsx`) rouvre la bannière via
`openConsentPreferences()`. Accepter charge la balise sans rechargement ; un refus après acceptation
envoie `consent update denied` et plus aucune conversion n'est déclenchée. La bannière n'est pas
bloquante et n'est jamais rendue côté serveur. Section « 7. Cookies » ajoutée aux mentions légales.
