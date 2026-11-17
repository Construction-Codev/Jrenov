# JRENOV — Audit ciblé backlinks et performances (17 novembre 2026)

## Sources et limites

- Rapport SEOptimer fourni par le client, daté du 17 novembre 2026 à 16 h 41 UTC. **Ce rapport analyse principalement la page d'accueil et n'est pas un audit de toutes les pages.**
- Code source `master` examiné au commit `9cbcd7b0068556931e26e614192f54819091174b`.
- Documentation officielle Google Search Central sur le désaveu des liens.
- Aucun accès direct au rapport **Liens** ou **Actions manuelles** de Google Search Console dans cette intervention. Les chiffres de backlinks ci-dessous viennent de SEOptimer, pas de Google.
- Les chiffres PageSpeed sont un mélange de mesures terrain et de laboratoire qui ne doivent pas être comparées comme s'ils mesuraient le même échantillon.

## Résultats — backlinks

D'après SEOptimer :
- 331 backlinks, 293 domaines référents, 264 liens `nofollow`, aucune garantie sur l'exhaustivité.
- Une ancre artificielle « Expert SEO Links and Backlinks for jrenov.com Ranking Growth » est répétée 264 fois.
- Exemples de domaines sans pertinence apparente pour le métier de couvreur : `seo-tip.com`, `wants.cfd`, `bitcoinmix.biz`, `quero.party` et autres pages de catalogues de domaines.
- Les domaines avec TLD `.space`, `.shop`, `.store`, `.online` sont fortement représentés ; un TLD n'est **pas** en soi une preuve de spam.
- Des pages légitimes (annuaire ou mention locale) peuvent également figurer dans le même export. Ne jamais supprimer/désavouer par simple classement automatique.

### Diagnostic

Le profil présente des indices de **spam SEO non sollicité** ou de liens artificiels ; les informations disponibles ne permettent pas d'affirmer que JRENOV les a achetés, qu'ils transmettent une valeur SEO ou qu'ils ont entraîné une pénalité. La valeur SEO d'un lien ne se résume ni au TLD, ni à une note de domaine fournie par un outil tiers.

**Aucune action de désaveu ou tentative de suppression n'a été effectuée.** Google déconseille le désaveu systématique et indique que la plupart des sites n'en ont pas besoin : https://support.google.com/webmasters/answer/2648487

### Vérification Search Console indispensable

1. Ouvrir la propriété exacte `https://www.jrenov.com/` ou la propriété Domaine `jrenov.com`.
2. Accéder à **Sécurité et actions manuelles > Actions manuelles** ; documenter si une action liée aux liens non naturels est présente.
3. Accéder à **Liens > Liens externes > Principaux sites d'origine** et exporter la liste complète ; exporter aussi les textes d'ancrage et les pages cibles.
4. Classer les domaines par : réellement référent / répertoire local pertinent / spam de catalogue / suspect à examiner. Vérifier quelques URLs de chacun.
5. Ne considérer un fichier de désaveu qu'en présence d'indices suffisants de liens artificiels construits pour manipuler le classement ET d'un risque avéré d'action manuelle ; ne jamais désavouer l'ensemble des 293 domaines.
6. Suivre impressions, clics et positions avec Search Console. Les backlinks suspects ne prouvent pas à eux seuls une baisse de visibilité.

## Résultats — performances

SEOptimer estime pour la page d'accueil :
- Poids téléchargé : **5,43 Mo**, dont **5,09 Mo** de catégorie « Autres ».
- LCP de laboratoire mobile : **3,5 s** ; CLS laboratoire **0,053**, TBT **0,07 s**.
- Mesures réelles rapportées : **LCP 1,5 s**, **CLS 0,00**, Core Web Vitals réussis. Vérifier la période et l'agrégation, potentiellement origin-level.
- Une opportunité de **redirections multiples ~1,08 s** est signalée par le rapport. Vérifier l'URL exacte testée et sa chaîne de redirections avant de modifier les DNS ou les paramètres Vercel.

Contrôle du dépôt :
- `public/banner1.mp4` : **2 593 001 octets**
- `public/banner2.mp4` : **2 604 216 octets**
- `public/banner3.mp4` : **2 643 516 octets**
- `public/banner1-poster.jpg` : **92 923 octets**
- Les vidéos représentent **~7,84 Mo** au total sur le dépôt. Cela ne signifie pas qu'elles sont toutes téléchargées à chaque visite.
- `components/Banner.tsx` affiche déjà un poster avec `next/image` sur les écrans de moins de 768 px et pour `prefers-reduced-motion` ; les vidéos ne possèdent pas d'attribut `src` dans ces cas.
- Sur desktop, la vidéo suivante était amorcée après **2 s**, alors que la transition ne peut avoir lieu qu'autour de **8 s**. Cela favorise le téléchargement de deux MP4 dès les premières secondes.

### Correction ciblée incluse dans cette PR

Dans `components/Banner.tsx`, le préchargement de la vidéo suivante démarre à **6,5 s** au lieu de **2 s** : moins de concurrence réseau durant le chargement initial du desktop ; la première vidéo et les transitions restent inchangées. **Cela n'enlève pas les 2,6 Mo de la première vidéo** et n'accélérera probablement pas l'accueil mobile déjà statique.

### Mesures nécessaires avant d'autres changements

1. Faire 3 exécutions PageSpeed Insights mobile sur l'URL finale `https://www.jrenov.com/`, puis 3 sur desktop : enregistrer LCP, CLS, INP (terrain), TBT (labo), score, taille transférée et waterfall.
2. Avec Chrome DevTools, vérifier sur mobile qu'aucune requête `banner*.mp4` n'est émise au chargement ni après attente. Vérifier sur desktop que `banner2.mp4` ne démarre pas avant ~6,5 s.
3. Vérifier les chaînes `http://jrenov.com` → `https://www.jrenov.com/`, et `https://jrenov.com` → `https://www.jrenov.com/` ; recommander les liens publicitaires directement vers l'URL finale.
4. Comparer les performances du **preview Vercel** et de la production sur le même appareil/réseau, puis après fusion, sans confondre données terrain et labo.
5. Si le LCP mobile reste mauvais en laboratoire, examiner `next/image`, la priorité du poster, le CSS du hero et la ressource effectivement identifiée comme LCP avant d'ajouter des optimisations arbitraires.

## Priorisation

| Priorité | Action | Effet attendu / limites |
|---|---|---|
| Haute | Contrôler Actions manuelles et export Liens GSC | Confirmer la réalité du risque backlinks |
| Haute | Confirmer le chemin de téléchargement mobile / desktop | Détecter toute régression vidéo |
| Haute | Mesurer PageSpeed et Speed Insights sur URL canonique | Faire des corrections chiffrées |
| Moyenne | Reporter le préchargement de la vidéo suivante à 6,5 s | Économiser du réseau au chargement initial desktop |
| Moyenne | Vérifier redirections et URL utilisées dans les Ads | Corriger les chaînes de navigation si elles existent |
| Faible | Raccourcir légèrement le Title si Search Console justifie un test | Pas de nécessité de respecter arbitrairement 60 caractères |
| Nulle | Acheter des backlinks, désavouer tout le monde, installer llms.txt pour le score | Pas de bénéfice démontré |

Aucune action sur Google Ads, backlinks externes, Google Search Console ou production n'est réalisée par ce document.
