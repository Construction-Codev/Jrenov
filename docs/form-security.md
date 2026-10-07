# Sécurité des formulaires contact et devis

> Réalisé le 7 octobre 2026. Rien n'a été commité ni poussé.
> SEO, URL des pages, Facebook, Analytics, Speed Insights et fichiers `.env` non modifiés.

## 1. Architecture

### Avant l'intervention

| Élément | État |
|---|---|
| `/contact` (`app/contact/page.tsx`) | Client Component : `fetch` POST JSON vers `/api/contact` |
| `/devis` (`app/devis/page.tsx`) | Client Component, 3 étapes : `fetch` POST JSON vers `/api/devis` |
| `/api/contact`, `/api/devis` | Deux routes distinctes, chacune avec son propre appel Resend |
| Validation serveur | Présence de quelques champs obligatoires uniquement |
| Anti-spam | **Aucun** : ni honeypot, ni captcha, ni Turnstile, ni BotID, ni rate limit, ni contrôle d'origine |
| Email | Optionnel dans les deux formulaires ; **aucune** validation |
| HTML de l'email | Valeurs saisies interpolées **sans échappement** (`${nom}`, `${message}`…) |
| En-têtes | `nom`, `sujet`, `codePostal` dans le `subject`, `email` dans `replyTo`, sans contrôle des sauts de ligne |
| Logs | Objet d'erreur Resend complet en cas d'échec |

### Après

```
Navigateur (contact / devis)
  ├─ GET /api/form-token          → jeton signé (preuve que le formulaire a été chargé)
  ├─ honeypot « website » invisible
  ├─ widget Turnstile (seulement si NEXT_PUBLIC_TURNSTILE_SITE_KEY est défini)
  └─ POST /api/contact | /api/devis  (JSON + formToken + website [+ turnstileToken])
        └─ handleFormSubmission()  — lib/form-security/submission.ts
             1. Origin du site obligatoire                  → 403
             2. Content-Type application/json               → 415
             3. Taille ≤ 16 Ko (en-tête + lecture réelle)   → 413
             4. JSON valide                                 → 400
             5. Rate limit par IP et par formulaire         → 429
             6. Honeypot rempli                             → 200 (faux succès, rien n'est envoyé)
             7. Jeton signé : présent, intact, ≤ 24 h    → 400 (aucun délai minimal)
             8. Validation des champs (liste blanche)       → 400
             9. Turnstile (si activé) vérifié auprès de Cloudflare → 400
            10. Domaine de l'email : MX / A                 → 400
            11. Envoi Resend (HTML échappé, en-têtes assainis) → 200 / 500
```

**Une soumission refusée n'appelle jamais Resend** (vérifié par les tests).

### Fichiers

| Fichier | Rôle |
|---|---|
| `lib/form-security/submission.ts` | Chaîne de protection commune aux deux routes + logs |
| `lib/form-security/validation.ts` | Règles des champs contact / devis, messages affichés |
| `lib/form-security/email.ts` | Validation syntaxique de l'email, masquage pour les logs |
| `lib/form-security/disposable-email-domains.ts` | Liste des domaines jetables |
| `lib/form-security/mx.ts` | Vérification DNS MX / A / AAAA avec timeout et cache |
| `lib/form-security/form-token.ts` | Jeton temporel signé HMAC, empreinte anonymisée |
| `lib/form-security/rate-limit.ts` | Rate limit en mémoire, extraction de l'IP, clé IPv6 /64 |
| `lib/form-security/turnstile.ts` | Vérification serveur Turnstile (inactive sans clés) |
| `lib/form-security/sanitize.ts` | Échappement HTML, détection d'injection, valeurs sûres pour les en-têtes |
| `lib/form-emails.ts` | Construction et envoi des emails (même contenu qu'avant, échappé) |
| `components/forms/FormGuard.tsx` | Côté client : jeton, honeypot, widget Turnstile |
| `app/api/form-token/route.ts` | Émission du jeton (dynamique, `no-store`) |
| `app/api/contact/route.ts`, `app/api/devis/route.ts` | Délèguent à `handleFormSubmission` |
| `app/contact/page.tsx`, `app/devis/page.tsx` | Ajout des champs anti-spam, anti double-clic, renouvellement du jeton après échec |

Les expéditeurs, destinataires et contenus des emails sont **inchangés** : contact depuis `contact@jrenov.com` vers `contact@jrenov.com` ; devis via `CONTACT_EMAIL_FROM` / `CONTACT_EMAIL_TO`.

---

## 2. Validation serveur des champs

Les attributs HTML (`required`, `type="email"`…) restent pour le confort de saisie, mais seule la validation serveur fait foi.

| Champ | Règle |
|---|---|
| Tous | chaîne uniquement (ni objet, ni tableau) ; normalisation NFC + trim ; aucun caractère de contrôle ; aucun motif d'injection (`<script`, `<iframe`, `<img`, `<svg`, `javascript:`, gestionnaire `on…=` dans une balise, `data:text/html`) ; **champ inconnu = refus** (liste blanche) |
| Champs mono-ligne | aucun saut de ligne (`\r`, `\n`, U+2028/2029) : protection contre l'injection d'en-têtes |
| `nom` | obligatoire, 2 à 80 caractères, au moins 2 lettres ; lettres, chiffres, espace, `' ’ . & ( ) -` |
| `telephone` | obligatoire, ≤ 25 caractères, `+ 0-9 espace ( ) . -`, 9 à 15 chiffres |
| `email` | facultatif ; s'il est rempli : voir § 3 |
| `ville` / `codePostal` | ≤ 100 caractères (code postal / ville obligatoire pour le devis) |
| `sujet` (contact) | liste fermée : urgence, couverture, zinguerie, isolation, demoussage, autre |
| `service` (devis) | liste fermée : couverture, zinguerie, isolation, demoussage, urgence |
| `building` | liste fermée : maison, immeuble, autre |
| `surface` | nombre, au plus 6 chiffres et 2 décimales |
| `message` (contact) | obligatoire, 5 à 3 000 caractères, multi-ligne, au plus 3 liens |
| `description` (devis) | facultative, ≤ 3 000 caractères, au plus 3 liens |
| Payload total | ≤ 16 Ko |

## 3. Email

1. trim ; 2. domaine en minuscules ; 3. syntaxe (partie locale « dot-atom », domaine à labels valides, extension non numérique) ; 4. ≤ 254 caractères au total, ≤ 64 pour la partie locale ; 5. domaine avec extension obligatoire ; 6. domaine absent de la liste des services jetables (sous-domaines compris) ; 7. domaine capable de recevoir des emails (§ 5).

Les domaines grand public (gmail.com, outlook.com, hotmail.com, orange.fr, free.fr, icloud.com, yahoo.com, proton.me…) ne sont **jamais** bloqués ; c'est vérifié par un test.

Message affiché pour toute adresse refusée, qu'elle soit invalide, jetable ou sans serveur : **« Merci d'utiliser une adresse email valide. »**

## 4. Domaines jetables

`lib/form-security/disposable-email-domains.ts` : **110 domaines** connus (Mailinator et ses alias, Guerrilla Mail, 10 Minute Mail, Temp Mail, YOPmail et ses alias `*.fr.nf`, jetable.org, trashmail, maildrop, getnada, 1secmail, mail.tm…).

- Liste courte et ciblée plutôt qu'une liste de plusieurs dizaines de milliers d'entrées. Les domaines jetables inconnus mais inventés sont rattrapés par la vérification MX.
- Les services d'**alias de confidentialité** (33mail, SimpleLogin, addy.io, Firefox Relay…) ne sont volontairement **pas** bloqués : de vrais clients les utilisent.
- Maintenance : ajouter un domaine à la liste quand il apparaît dans des demandes indésirables. Alternative pour une couverture maximale : le paquet npm `disposable-email-domains`, une liste maintenue de plus de 100 000 domaines, à charger à la place de la liste locale.

## 5. Vérification MX (retenue)

L'environnement le permet : les routes s'exécutent sur le runtime Node.js (par défaut sur Vercel), avec `node:dns` disponible.

| Résultat DNS | Décision |
|---|---|
| MX présent | accepté |
| Pas de MX mais A/AAAA (« MX implicite », RFC 5321) | accepté |
| Domaine inexistant ou sans aucun enregistrement | **refusé** |
| Timeout (1,5 s), SERVFAIL, réseau indisponible | **accepté** (fail-open : une panne DNS n'est pas une preuve de fraude) |

Les résultats sont mis en cache 10 minutes par domaine (sauf les résultats indéterminés). Vérifié en local avec le vrai DNS : `contact@domaine-inexistant-123456.xyz` est refusé.

## 6. Honeypot

- Champ `website` placé hors écran (`position:absolute; left:-10000px`, et non `display:none`, que certains bots savent ignorer), dans un conteneur `aria-hidden`, avec `tabIndex=-1`, `autoComplete="off"`, un libellé « Ne pas remplir ce champ » et les attributs d'exclusion des gestionnaires de mots de passe (`data-1p-ignore`, `data-lpignore`, `data-form-type="other"`, `data-bwignore`), pour qu'aucune autocomplétion ne le remplisse chez un vrai client.
- Valeur envoyée dans le JSON et vérifiée côté serveur.
- S'il est rempli : **HTTP 200 `{ success: true }`**. Le bot croit avoir réussi, rien n'est envoyé, le serveur journalise `rejected: honeypot`.

## 7. Jeton signé (sans délai minimal)

- À l'affichage du formulaire, le navigateur appelle `GET /api/form-token`, qui renvoie `heureÉmission.nonce.signatureHMAC-SHA256`.
- Le serveur exige un jeton **présent, intact** (toute modification casse la signature) et **émis il y a moins de 24 h**. Les appels directs simples, qui n'ont pas chargé le formulaire, sont donc refusés.
- **Aucun délai minimal de remplissage** : un utilisateur très rapide (autocomplétion Chrome/Safari, coordonnées préremplies) n'est **jamais** bloqué. Un envoi en moins de 3 s (`FAST_SUBMIT_MS`) est seulement signalé dans les logs (`fast=1`), à titre de diagnostic.
- Un onglet resté ouvert longtemps ne voit jamais d'erreur : le navigateur redemande un jeton avant l'envoi si le sien a plus d'une heure.
- Secret de signature : `FORM_TOKEN_SECRET` s'il est défini (recommandé). À défaut, une clé est dérivée de `RESEND_API_KEY` par hachage : elle est stable entre instances et jamais exposée. En dernier recours (développement), une clé aléatoire propre au processus est utilisée.

## 8. Rate limiting

- **5 soumissions par tranche de 10 minutes**, par IP **et** par formulaire (contact et devis comptés séparément). Au-delà : HTTP 429 avec `Retry-After` et un message invitant à téléphoner.
- IP : `x-real-ip`, puis `x-vercel-forwarded-for`, puis le premier élément de `x-forwarded-for`. Sur Vercel, ces en-têtes sont renseignés par la plateforme. Les valeurs non conformes sont ignorées.
- IPv6 regroupée par préfixe **/64**, pour empêcher le contournement en changeant d'adresse dans le même bloc. IPv4 mappée (`::ffff:a.b.c.d`) traitée comme IPv4.
- Sans IP exploitable (cas local), les requêtes partagent la clé `unknown`.
- **Limite connue** : le compteur est **en mémoire**. Sur Vercel serverless, chaque instance a sa propre mémoire et peut être recyclée : le compteur freine les rafales vers une même instance, mais n'est pas une limite globale. Pour une limite stricte, sans dépendance payante :
  1. **Vercel Firewall, règle de rate limiting** (tableau de bord Vercel, sans code) sur `/api/contact` et `/api/devis` ;
  2. ou un stockage partagé (Upstash Redis, offre gratuite) en remplaçant `checkRateLimit`.

## 9. Cloudflare Turnstile (préparé, désactivé par défaut)

**Choix : niveau 3 prêt mais inactif.** Les niveaux 1 et 2 bloquent déjà la grande majorité du spam automatisé sans aucune friction, et Turnstile ajoute un script tiers sur les pages de formulaire. Il suffit de définir les deux clés pour l'activer, sans modifier le code.

- Activation : **les deux** variables `NEXT_PUBLIC_TURNSTILE_SITE_KEY` et `TURNSTILE_SECRET_KEY`. Si l'une manque, aucun widget n'est affiché, aucun jeton n'est exigé, et le build fonctionne.
- Widget en rendu explicite, `appearance: "interaction-only"` : invisible tant que Cloudflare n'exige pas d'interaction.
- Le jeton est **toujours vérifié côté serveur** auprès de `challenges.cloudflare.com/turnstile/v0/siteverify` (avec l'IP du client et un timeout de 4 s), **avant** l'envoi de l'email. Si Cloudflare est injoignable, la soumission est refusée avec l'erreur générique.

### À créer côté Cloudflare
1. Tableau de bord Cloudflare → **Turnstile** → **Add widget**.
2. Nom : « Jrenov formulaires ».
3. Domaines (hostnames) : `www.jrenov.com`, `jrenov.com`, et éventuellement le domaine de prévisualisation Vercel ou `localhost` pour les tests.
4. Mode du widget : **Managed** (recommandé) ou **Invisible**.
5. Copier la **Site Key** dans `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, et la **Secret Key** dans `TURNSTILE_SECRET_KEY` (variables Vercel, environnement Production), puis redéployer.

## 10. Injection HTML et en-têtes

- **HTML** : chaque valeur saisie passe par `escapeHtml` (`& < > " ' \``) ou `escapeMultiline` (échappement puis `\n` → `<br>`) avant d'être insérée. `<script>` ou `<img onerror=…>` apparaîtraient comme du texte ; ils sont de toute façon refusés en amont.
- **Subject** : construit uniquement à partir de valeurs mono-ligne validées, puis passé dans `toHeaderSafe` (suppression des sauts de ligne et caractères de contrôle, 150 caractères maximum).
- **Reply-To** : uniquement l'email validé (syntaxe stricte, sans espace ni saut de ligne), sinon absent.
- **From / To** : constants ou issus des variables d'environnement, jamais de la saisie.
- **Lien `tel:`** de l'email devis : ne contient que les chiffres et le `+`.

## 11. Réponses API et logs

| Situation | HTTP | Message visiteur |
|---|---|---|
| Succès | 200 | `{ success: true }` |
| Honeypot | 200 | `{ success: true }` (faux succès) |
| Email invalide / jetable / sans serveur | 400 | Merci d'utiliser une adresse email valide. |
| Téléphone invalide | 400 | Merci d'indiquer un numéro de téléphone valide. |
| Champ obligatoire manquant | 400 | Merci de remplir les champs obligatoires. |
| Message trop long | 400 | Votre message est trop long. Merci de le raccourcir. |
| Injection, contrôle, champ inconnu, jeton, Turnstile | 400 | Message générique |
| Origine invalide / type / taille | 403 / 415 / 413 | Message générique |
| Rate limit | 429 | Trop de demandes… appelez le 04 65 84 88 85 |
| Échec Resend | 500 | Message générique |

Message générique : « Votre demande n'a pas pu être envoyée. Merci de réessayer ou de nous appeler au 04 65 84 88 85. »

Logs serveur, sobres :
```
[form] contact sent ip=3f9a1c0b2d email=***@gmail.com
[form] contact rejected: honeypot ip=3f9a1c0b2d
[form] devis rejected: invalid_email (email) ip=…
[form] contact rejected: rate_limit ip=…
[form] contact error: send_failed ip=… (validation_error)
```
Jamais de message, de nom, de téléphone, d'adresse, d'email complet, de jeton ni de secret. L'IP n'apparaît que sous forme d'empreinte HMAC tronquée.

## 12. UX

- Design inchangé : le honeypot est invisible, et Turnstile reste inactif tant que les clés ne sont pas définies.
- Bouton désactivé pendant l'envoi (existant) et garde `if (loading) return` contre le double clic.
- Messages d'erreur clairs pour les vraies erreurs de saisie, génériques pour le reste.
- Après un échec : nouveau jeton et nouveau défi Turnstile automatiques.

---

## 13. Tests

Vitest (`npm test` → `vitest run`, configuration `vitest.config.mts`). Resend, DNS et Cloudflare sont **simulés** : aucun email, aucune requête DNS ni aucun appel Cloudflare réel.

| Fichier | Couverture |
|---|---|
| `tests/form-security/email.test.ts` | adresses valides, invalides (dont injection d'en-tête et longueurs), jetables, domaines légitimes jamais bloqués, masquage |
| `tests/form-security/sanitize.test.ts` | échappement HTML (`<script>`, `<img onerror>`), en-têtes, caractères de contrôle, faux positifs (« onduline = 20 m² », « < 500 € ») |
| `tests/form-security/validation.test.ts` | message normal, champs manquants, trop longs, HTML malveillant, injection d'en-tête, email jetable, téléphone, payload incohérent, liens multiples |
| `tests/form-security/token-rate-limit.test.ts` | jeton : valide, **utilisateur très rapide accepté**, absent, expiré, falsifié ; rate limit : 5 puis blocage, fenêtre, isolation des clés, IPv6 /64, extraction de l'IP |
| `tests/form-security/mx-turnstile.test.ts` | MX : présent, domaine inexistant, MX implicite, SERVFAIL, timeout rapide ; Turnstile : inactif, succès, échec, jeton absent, Cloudflare injoignable |
| `tests/form-security/api-routes.test.ts` | routes réelles : soumission valide (un seul envoi, HTML échappé, sujet sans saut de ligne), honeypot, email invalide, jetable, MX, panne DNS, payload énorme, trop long, incomplet, JSON malformé, HTML, en-tête, **utilisateur très rapide (contact et devis) accepté et envoyé**, **sans email accepté**, jeton falsifié, jeton expiré, origine, **rate limit (6e → 429)**, échec Resend, Turnstile refusé ou validé ; devis : valide et protections ; compteurs séparés. **Chaque refus vérifie que Resend n'est pas appelé** |

**Résultat : 6 fichiers, 116 tests, 116 réussis.**

### Audit HTTP local (`next start`, clé Resend factice pour ne rien envoyer)

| Cas | HTTP |
|---|---|
| Soumission valide contact / devis | 500 (attendu : toutes les protections passées, puis échec volontaire de Resend avec la clé factice) |
| Email invalide / domaine jetable / domaine inexistant (vrai DNS) | 400 |
| Honeypot contact / devis | 200 (aucun envoi) |
| Message énorme | 413 |
| Payload incomplet | 400 |
| HTML malveillant / injection d'en-tête / sans jeton | 400 |
| Requête directe sans Origin | 403 |
| Double soumission simultanée | 2 requêtes traitées (voir limites) |
| Rafale de 7 depuis la même IP | 5 traitées, puis 429, 429 |
| `GET /api/form-token` | 200, `Cache-Control: no-store` |

---

## 14. Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `FORM_TOKEN_SECRET` | recommandée | Secret de signature du jeton temporel (chaîne aléatoire d'au moins 32 caractères). Sans elle, une clé est dérivée de `RESEND_API_KEY` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | non (niveau 3) | Clé publique Turnstile |
| `TURNSTILE_SECRET_KEY` | non (niveau 3) | Clé secrète Turnstile (serveur uniquement) |

Variables existantes, inchangées : `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`.

## 15. Limites connues

1. **Rate limit en mémoire**, par instance serverless (voir § 8) : à doubler par une règle Vercel Firewall.
2. **Rejeu du jeton** : un bot qui récupère un jeton peut le réutiliser pendant 24 h. Le rate limit, le honeypot, la validation et, si besoin, Turnstile compensent.
3. **Double soumission simultanée** : bloquée côté navigateur (bouton désactivé + garde), mais le serveur n'a pas de déduplication. Deux requêtes identiques envoyées en parallèle par un script produiraient deux emails, dans la limite du rate limit.
4. **Liste de domaines jetables** volontairement courte (110 domaines) ; complétée par la vérification MX.
5. Le contrôle d'origine filtre les scripts naïfs mais un en-tête `Origin` peut être forgé hors navigateur. Ce n'est pas une authentification.

## 16. Recommandations

1. Ajouter `FORM_TOKEN_SECRET` dans Vercel (Production et Preview).
2. Créer une **règle de rate limiting Vercel Firewall** sur `/api/contact` et `/api/devis` (par exemple 10 requêtes par minute et par IP).
3. Surveiller les logs `[form] … rejected:` pendant 2 à 4 semaines. Si du spam passe encore, **activer Turnstile** (§ 9) en définissant simplement les deux clés.
4. Ajouter à la liste locale les domaines jetables observés, ou adopter le paquet `disposable-email-domains`.
