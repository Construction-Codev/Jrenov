# Suivi Google Ads

- Compte : `AW-18401022050`
- Conversion « Website lead » : `AW-18401022050/3zwjCM7KnZcdEOKgpcZE`

## Fonctionnement

| Élément | Fichier |
|---|---|
| Balise gtag.js, chargée une fois pour tout le site, **uniquement après consentement** | `components/GoogleTag.tsx` (monté dans `app/layout.tsx`) |
| Consentement publicitaire (`granted` / `denied` / `unknown`) | `lib/consent.ts` |
| Conversion lead | `lib/google-ads.ts` → `trackLeadConversion()` |
| Identifiant de soumission renvoyé après envoi réel | `lib/form-security/submission.ts` (`submissionId`) |

La conversion est déclenchée par `/contact` et `/devis` uniquement quand l'API a répondu 200
**avec** un `submissionId`, c'est-à-dire après l'envoi effectif de l'email. Le faux succès du
honeypot ne contient pas d'identifiant : il n'est jamais comptabilisé. Le `submissionId` est
transmis en `transaction_id` (dédoublonnage côté Google) et mémorisé dans l'onglet (pas de
double déclenchement côté navigateur). Aucune donnée saisie n'est envoyée à Google.

Jamais de conversion : à l'ouverture des pages, au clic sur Envoyer, en cas d'erreur de
validation ou serveur, sur les clics téléphone/e-mail. Absence de gtag, refus ou bloqueur
n'empêchent jamais l'envoi du formulaire (tout est dans des `try/catch`, après le succès).

## Consentement : à brancher

Le site n'a **pas encore de bannière de consentement**. Tant qu'aucun choix n'est enregistré,
gtag.js n'est pas chargé et **aucune conversion n'est envoyée**. Une bannière (maison ou CMP)
doit simplement appeler :

```ts
import { setAdsConsent } from "@/lib/consent";
setAdsConsent(true);  // « Accepter » : charge la balise sans rechargement
setAdsConsent(false); // « Refuser » : rien n'est chargé (ou consent update « denied » si déjà chargé)
```

Pour tester sans bannière, dans la console du navigateur :
`localStorage.setItem("jrenov-consent-ads", "granted")` puis recharger.
