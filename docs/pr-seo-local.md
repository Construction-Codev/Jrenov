# Renforcer le SEO local et sécuriser les nouvelles réalisations

Les pages locales existantes manquaient de conseils pratiques différenciés et les réalisations n’avaient aucun contrôle de publication. Cette proposition enrichit les sept pages communales, le hub des zones desservies et la page couverture, puis ajoute une procédure de validation explicite pour toute nouvelle fiche chantier.

- Sept contenus distincts pour préparer le diagnostic et le devis ; sections dédiées sur le hub pour Bron, Vaulx-en-Velin et Rillieux-la-Pape. Aucun doublon communal ni combinaison automatique service × ville.
- Les 22 fiches historiques bénéficient de titres courts, de la commune dans le H1, de CTA devis/contact et de données structurées descriptives. La photo de Corbas, signalée incorrecte par l’audit existant, est masquée.
- Registre de 224 images Drive avec noms et provenance, suivi séparé des 25 images historiques et deux dossiers de préparation sans commune ni travaux attribués. Toutes les nouvelles photos restent à valider.
- Les nouvelles fiches nécessitent une commune et des travaux confirmés, des photos approuvées et attribuées, des dimensions/alt et des prestations associées. Le build refuse une publication incomplète ou l’ajout d’un nouveau slug dans le catalogue historique. Les brouillons répondent 404/noindex et sont exclus du sitemap et du maillage.
- Galerie `next/image` prévue pour les photos validées ; contraste, focus clavier et cibles tactiles améliorés en conservant le design existant.

Les 22 fiches historiques sont conservées : leurs faits et attributions ne sont pas nouvellement certifiés par ce travail. Aucune nouvelle fiche chantier ni nouvelle URL locale publique n’est publiée. Les formulaires, le tracking et la logique de consentement restent en place ; aucune campagne Google Ads n’est modifiée.

Validation : lint, TypeScript, **168 tests sur 13 fichiers** et build réussis. Contrôle HTTP des **51 URL indexables**, **55 liens internes et 21 images**, plus deux brouillons en 404/noindex. Contrôle anti-duplication passant pour les sept pages locales. Chrome à 320/390 px sur six pages : aucun débordement et navigation vers le formulaire de devis fonctionnelle, sans envoi.

Lighthouse mobile local (performance/accessibilité/SEO) : Décines **99/100/100**, couverture **98/100/100**, zones **99/100/100** ; CLS 0 sur ces mesures. Résultats de laboratoire, sans équivalence avec les données terrain Search Console.

Le bilan et la procédure de validation sont dans [docs/seo-local-2026-10-16.md](./seo-local-2026-10-16.md). Ne pas fusionner avant accord du propriétaire. Le `package-lock.json` modifié avant cette tâche est exclu des commits.
