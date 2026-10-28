import type { ServiceKey } from "@/lib/services";
import { BUSINESS } from "@/lib/site";

/**
 * Pages locales publiées (première vague du Lot 3, deuxième vague d'octobre 2026).
 *
 * Règles éditoriales :
 * - contenu rédigé commune par commune (aucun gabarit à remplacement de nom de ville) ;
 * - les réalisations citées proviennent EXCLUSIVEMENT de data/realisations.json ;
 *   `localRealisationSlugs` ne contient que des chantiers situés dans la commune
 *   (vérifié automatiquement par lib/local-areas.ts) ;
 * - aucune adresse autre que le siège de Décines-Charpieu, aucun avis,
 *   aucune certification, aucune statistique locale.
 */

export type LocalSectionKey =
  | "intro"
  | "context"
  | "issues"
  | "services"
  | "realisations"
  | "process"
  | "nearby"
  | "faq";

export interface LocalFaq {
  question: string;
  answer: string;
}

export interface NearbyCity {
  name: string;
  /** Slug d'une page locale publiée uniquement. */
  slug?: string;
}

export interface LocalArea {
  /** URL exacte : /{slug} */
  slug: string;
  city: string;
  postalCode: string;
  /** Mot-clé principal visé. */
  primaryKeyword: string;
  /** Title sans le suffixe « | Jrenov » (ajouté par le template). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  heroLead: string;
  intro: { title: string; paragraphs: string[] };
  context: { title: string; paragraphs: string[] };
  issues: { title: string; items: { title: string; text: string }[] };
  services: { title: string; intro: string; items: { service: ServiceKey; text: string }[] };
  realisations: {
    title: string;
    intro: string;
    localSlugs: string[];
    nearbyTitle: string;
    nearbySlugs: string[];
  };
  processIntro: string;
  nearby: { title: string; intro: string; cities: NearbyCity[] };
  faq: LocalFaq[];
  /** Ordre d'affichage des sections, propre à chaque page. */
  sectionOrder: LocalSectionKey[];
}

export const LOCAL_AREAS: LocalArea[] = [
  // ──────────────────────────────────────────────────────────────
  // DÉCINES-CHARPIEU — siège de Jrenov
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-decines-charpieu",
    city: "Décines-Charpieu",
    postalCode: "69150",
    primaryKeyword: "couvreur Décines-Charpieu",
    metaTitle: "Couvreur à Décines-Charpieu, artisan installé dans la commune",
    metaDescription:
      `Jrenov, artisan couvreur installé à Décines-Charpieu (69150) : réparation et rénovation de toiture, zinguerie, isolation et démoussage. Devis gratuit au ${BUSINESS.phoneDisplay}.`,
    h1: "Couvreur à Décines-Charpieu",
    heroBadge: "Siège de Jrenov · 69150 Décines-Charpieu",
    heroLead:
      "C'est ici que Jrenov a son siège. Tuile déplacée, fuite au plafond, fenêtre de toit à changer ou couverture à refaire : votre couvreur est installé dans la commune.",
    intro: {
      title: "Une entreprise de couverture décinoise",
      paragraphs: [
        "Jrenov est une entreprise individuelle de couverture immatriculée en 2018 et domiciliée au 48 Ancien Chemin des Marais, à Décines-Charpieu. Les toitures de la commune sont donc celles dont nous sommes le plus proches : la visite de diagnostic, l'établissement du devis puis le suivi du chantier se font sans traverser l'agglomération.",
        "Du secteur de Charpieu au centre-ville, en passant par les abords du Grand Large, nous intervenons sur des maisons individuelles comme sur de petits immeubles. Une réparation ponctuelle après un coup de vent, un entretien de couverture ou une réfection complète relèvent du même interlocuteur.",
      ],
    },
    context: {
      title: "Les toitures décinoises et leurs points sensibles",
      paragraphs: [
        "Le bâti de Décines-Charpieu mêle pavillons, maisons anciennes des noyaux historiques et résidences plus récentes. Sur les maisons, on rencontre notamment des couvertures en tuiles mécaniques, comme sur la maison où nous avons remplacé trois fenêtres de toit en septembre 2026.",
        "Quel que soit le matériau, les infiltrations naissent rarement au milieu d'un pan de toiture. Elles apparaissent plutôt aux jonctions : autour d'une fenêtre de toit, au pied d'une cheminée, le long d'une rive ou au faîtage. C'est donc par ces raccords que commence notre diagnostic.",
      ],
    },
    issues: {
      title: "Les demandes les plus courantes autour de notre siège",
      items: [
        {
          title: "Fenêtre de toit qui vieillit mal",
          text: "Bois qui grise, joints fatigués, raccords qui laissent passer l'eau : un ancien Velux se remplace par l'extérieur, en reprenant l'étanchéité avec la couverture.",
        },
        {
          title: "Tuiles déplacées après un coup de vent",
          text: "Une seule tuile glissée suffit à mouiller l'isolant des combles. Une intervention rapide limite les dégâts et évite une reprise plus lourde.",
        },
        {
          title: "Abergement ou solin fissuré",
          text: "Mortier qui se fend au pied de la cheminée ou contre un mur : ces raccords se refont en zinc façonné pour retrouver une étanchéité durable.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Décines-Charpieu",
      intro: "Toutes nos prestations sont disponibles dans la commune de notre siège :",
      items: [
        {
          service: "couverture",
          text: "Réparation de tuiles, réfection de faîtage, rénovation partielle ou complète de la couverture.",
        },
        {
          service: "recherche-de-fuite",
          text: "Une infiltration signalée dans la commune se traite sans long trajet depuis notre siège : recherche de l'origine, bâchage si besoin, puis réparation.",
        },
        {
          service: "fenetres-de-toit",
          text: "C'est à Décines-Charpieu qu'a eu lieu notre dernier remplacement de fenêtres de toit, sur une maison couverte en tuiles mécaniques.",
        },
        {
          service: "zinguerie",
          text: "Gouttières, chéneaux, noues, abergements de cheminée et habillage des rives.",
        },
        {
          service: "isolation",
          text: "Isolation des combles perdus ou aménagés, et isolation par l'extérieur lors d'une réfection.",
        },
        {
          service: "demoussage",
          text: "Nettoyage de la couverture, traitement anti-mousse et hydrofuge.",
        },
      ],
    },
    realisations: {
      title: "Un chantier à Décines-Charpieu",
      intro:
        "Remplacement de trois fenêtres de toit sur une maison couverte en tuiles mécaniques, réalisé en une journée :",
      localSlugs: ["remplacement-velux-ancien-decines"],
      nearbyTitle: "Dans les communes voisines",
      nearbySlugs: [
        "habillage-bandeaux-rive-alu-meyzieu",
        "isolation-combles-perdus-laine-roche-chassieu",
        "demoussage-toiture-ecologique-genas",
      ],
    },
    processIntro:
      "Pour un chantier à Décines-Charpieu, la visite peut souvent être organisée rapidement puisque nous partons de la commune.",
    nearby: {
      title: "Autour de Décines-Charpieu",
      intro:
        "Depuis notre siège, nous intervenons également dans les communes proches. Certaines disposent d'une page dédiée :",
      cities: [
        { name: "Meyzieu", slug: "couvreur-meyzieu" },
        { name: "Chassieu", slug: "couvreur-chassieu" },
        { name: "Genas", slug: "couvreur-genas" },
        { name: "Villeurbanne", slug: "couvreur-villeurbanne" },
        { name: "Vaulx-en-Velin" },
        { name: "Bron" },
      ],
    },
    faq: [
      {
        question: "Où se trouve Jrenov à Décines-Charpieu ?",
        answer:
          `Le siège de l'entreprise est situé au 48 Ancien Chemin des Marais, 69150 Décines-Charpieu. Nous sommes joignables du lundi au samedi de 8h00 à 19h00 au ${BUSINESS.phoneDisplay}, et un service d'urgence fuite est assuré 7j/7.`,
      },
      {
        question: "Peut-on remplacer une fenêtre de toit sans refaire les finitions intérieures ?",
        answer:
          "Oui, lorsque le remplacement se fait par l'extérieur. À Décines-Charpieu, nous avons déposé trois anciens Velux en bois et posé des modèles neufs en polyuréthane, raccordés sur tuiles mécaniques avec des jupes d'étanchéité souples, sans détérioration des finitions intérieures.",
      },
      {
        question: "Combien coûte le diagnostic de ma toiture ?",
        answer:
          "Le diagnostic et le devis sont gratuits et sans engagement. Le devis détaille les travaux proposés pour que vous puissiez comparer sereinement.",
      },
    ],
    sectionOrder: ["intro", "realisations", "context", "issues", "services", "process", "nearby", "faq"],
  },

  // ──────────────────────────────────────────────────────────────
  // MEYZIEU — angle : bas de toit, rives, zinguerie
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-meyzieu",
    city: "Meyzieu",
    postalCode: "69330",
    primaryKeyword: "couvreur Meyzieu",
    metaTitle: "Couvreur à Meyzieu – Toiture, rives & zinguerie",
    metaDescription:
      "Couvreur à Meyzieu : habillage de rives et bandeaux, gouttières, réparation et rénovation de toiture. Jrenov intervient depuis Décines-Charpieu, commune voisine. Devis gratuit.",
    h1: "Couvreur à Meyzieu : toiture, rives et zinguerie",
    heroBadge: "Commune voisine de notre siège",
    heroLead:
      "Planches de rive qui pourrissent, bandeaux à repeindre sans cesse, gouttières fatiguées : à Meyzieu comme ailleurs, beaucoup de désordres de toiture commencent par le bas du toit.",
    intro: {
      title: "Des voisins directs de Décines-Charpieu",
      paragraphs: [
        "Meyzieu et Décines-Charpieu se partagent les rives du Grand Large et du canal de Jonage. Notre siège étant installé à Décines-Charpieu, les Majolans font partie de nos voisins les plus proches : quelques kilomètres seulement séparent l'entreprise de la plupart des chantiers de la commune.",
        "En mai 2026, nous avons réalisé à Meyzieu l'habillage complet des bandeaux et des sous-faces d'une maison, en aluminium gris anthracite. Un chantier typique de ce que l'on appelle le « bas de toit », souvent négligé jusqu'à ce que le bois se dégrade.",
      ],
    },
    context: {
      title: "Le bas de toit, point faible des maisons individuelles",
      paragraphs: [
        "Sur une maison individuelle, les débords de toiture en bois — planches de rive, sous-faces, bandeaux — sont exposés à la pluie et au soleil. Sans peinture ou lasure régulière, le bois finit par se fendre puis pourrir, et l'eau peut alors atteindre les chevrons.",
        "L'habillage en aluminium thermolaqué répond à ce problème : une fois les bois abîmés remplacés, les profilés recouvrent rives et sous-faces et suppriment la corvée de peinture. Le coloris se choisit pour s'accorder avec la façade et les menuiseries.",
      ],
    },
    issues: {
      title: "Ce que nous traitons le plus souvent à Meyzieu",
      items: [
        {
          title: "Planches de rive abîmées",
          text: "Bois fendu, peinture qui s'écaille, pièces qui se détachent : il faut remplacer les éléments pourris avant tout habillage.",
        },
        {
          title: "Gouttières qui débordent ou fuient",
          text: "Pente mal réglée, crochets fatigués ou raccords percés : une gouttière défaillante finit par salir et humidifier la façade.",
        },
        {
          title: "Tuiles de rive descellées",
          text: "En bordure de toiture, les tuiles sont les plus exposées au vent : une rive mal fixée se repère souvent depuis la rue.",
        },
      ],
    },
    services: {
      title: "Prestations proposées aux habitants de Meyzieu",
      intro: "Zinguerie en tête, mais pas seulement :",
      items: [
        {
          service: "zinguerie",
          text: "Habillage de bandeaux et sous-faces, gouttières, chéneaux et descentes d'eau pluviale.",
        },
        {
          service: "couverture",
          text: "Remplacement de tuiles, reprise des rives et des faîtages, rénovation de la couverture.",
        },
        {
          service: "recherche-de-fuite",
          text: "Façade tachée sous une gouttière ou plafond humide près d'une rive : nous remontons jusqu'à la cause avant de proposer une réparation.",
        },
        {
          service: "demoussage",
          text: "Nettoyage et traitement des tuiles pour limiter le retour des mousses.",
        },
        {
          service: "isolation",
          text: "Isolation des combles, en complément d'une intervention sur la toiture.",
        },
      ],
    },
    realisations: {
      title: "Notre réalisation à Meyzieu",
      intro:
        "Remplacement des planches de rive pourries puis habillage des bandeaux et sous-faces en aluminium, en trois jours :",
      localSlugs: ["habillage-bandeaux-rive-alu-meyzieu"],
      nearbyTitle: "Chantiers à proximité",
      nearbySlugs: ["remplacement-velux-ancien-decines", "demoussage-toiture-ecologique-genas"],
    },
    processIntro:
      "Pour un projet de zinguerie à Meyzieu, la visite sert surtout à mesurer le linéaire de rives et de gouttières et à vérifier l'état des bois avant d'établir le devis.",
    nearby: {
      title: "Communes proches de Meyzieu",
      intro: "Nous intervenons aussi dans les communes qui entourent Meyzieu :",
      cities: [
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
        { name: "Genas", slug: "couvreur-genas" },
        { name: "Chassieu", slug: "couvreur-chassieu" },
        { name: "Jonage", slug: "couvreur-jonage" },
        { name: "Pusignan" },
      ],
    },
    faq: [
      {
        question: "Pourquoi habiller ses bandeaux en aluminium plutôt que les repeindre ?",
        answer:
          "Le bois de rive doit être repeint ou lasuré régulièrement. L'habillage en aluminium thermolaqué supprime cet entretien : à Meyzieu, nous avons choisi un gris anthracite pour l'harmoniser avec la façade.",
      },
      {
        question: "Faut-il remplacer les planches de rive avant de les habiller ?",
        answer:
          "Oui, dès qu'elles sont pourries. Sur notre chantier de Meyzieu, les planches de rive dégradées ont d'abord été remplacées ; l'habillage ne doit jamais masquer un bois qui continue de se dégrader.",
      },
      {
        question: "Combien de temps dure un habillage de bandeaux et sous-faces ?",
        answer:
          "Le chantier de Meyzieu a duré trois jours. La durée dépend surtout du linéaire à traiter, de la hauteur et de l'accès à la façade.",
      },
      {
        question: "Jrenov est-il loin de Meyzieu ?",
        answer:
          `Non : notre siège se trouve à Décines-Charpieu, commune limitrophe. Pour une fuite, appelez le ${BUSINESS.phoneDisplay}.`,
      },
    ],
    sectionOrder: ["intro", "context", "issues", "realisations", "services", "process", "faq", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // VILLEURBANNE — angle : maisons de ville, rénovation en milieu urbain
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-villeurbanne",
    city: "Villeurbanne",
    postalCode: "69100",
    primaryKeyword: "couvreur Villeurbanne",
    metaTitle: "Couvreur à Villeurbanne – Rénover une maison de ville",
    metaDescription:
      "Rénovation et réparation de toiture à Villeurbanne : maisons de ville, couvertures anciennes en tuiles, rives et cheminées en zinc. Jrenov, couvreur basé à Décines-Charpieu.",
    h1: "Couvreur à Villeurbanne : rénover les toitures de maisons de ville",
    heroBadge: "Intervention depuis Décines-Charpieu",
    heroLead:
      "Couverture centenaire devenue poreuse, rives et cheminée à reprendre, chantier en pleine ville : la rénovation d'une toiture villeurbannaise se prépare avec soin.",
    intro: {
      title: "Un couvreur de l'Est lyonnais à Villeurbanne",
      paragraphs: [
        "Jrenov n'a pas d'établissement à Villeurbanne : l'entreprise est installée à Décines-Charpieu, plus à l'est, et rejoint la commune pour chaque chantier. Villeurbanne fait partie des villes de la métropole où nous intervenons pour des particuliers.",
        "Entre les immeubles des Gratte-Ciel et les rues de maisons de ville de Cusset, des Maisons-Neuves ou de Croix-Luizet, le bâti villeurbannais est très varié. Notre chantier de janvier 2026 concernait justement une maison de ville dont la couverture en tuiles terre cuite devait être entièrement refaite.",
      ],
    },
    context: {
      title: "Refaire une toiture en ville : ce qu'il faut anticiper",
      paragraphs: [
        "Lorsqu'un échafaudage doit être installé sur le trottoir, une autorisation d'occupation du domaine public doit en général être demandée en mairie. C'est un délai à prévoir dans le planning des travaux, au même titre que l'approvisionnement des matériaux.",
        "Les couvertures anciennes sont aussi souvent dépourvues d'écran de sous-toiture. Une réfection complète est l'occasion d'en poser un : sur notre chantier villeurbannais, un écran HPV a été installé sous les nouvelles tuiles, avant la reprise en zinc des rives et de la cheminée.",
      ],
    },
    issues: {
      title: "Les problèmes typiques des couvertures anciennes",
      items: [
        {
          title: "Tuiles poreuses",
          text: "Avec les années, une tuile terre cuite peut perdre son imperméabilité : l'eau s'infiltre alors par capillarité, même sans tuile cassée.",
        },
        {
          title: "Cheminée et rives fatiguées",
          text: "Raccords en mortier fissurés, bandes métalliques corrodées : ces points se reprennent en zinc lors de la réfection.",
        },
        {
          title: "Jonction avec un mur mitoyen",
          text: "Entre maisons accolées, l'étanchéité contre le mur voisin repose sur un solin, qui se refait en plomb ou en zinc.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Villeurbanne",
      intro: "Pour les maisons comme pour les petits immeubles :",
      items: [
        {
          service: "couverture",
          text: "Réfection complète en tuiles terre cuite, remplacement de l'écran de sous-toiture, réparations ponctuelles.",
        },
        {
          service: "recherche-de-fuite",
          text: "Infiltration sous une couverture ancienne ou au pied d'une cheminée : diagnostic de l'origine avant d'engager une réparation ou une réfection.",
        },
        {
          service: "zinguerie",
          text: "Rives, abergements de cheminée, solins, gouttières et chéneaux.",
        },
        {
          service: "isolation",
          text: "Isolation par l'extérieur lorsque la couverture est déposée, ou isolation des combles.",
        },
        {
          service: "demoussage",
          text: "Entretien des couvertures qui n'ont pas besoin d'être refaites.",
        },
      ],
    },
    realisations: {
      title: "Notre réalisation à Villeurbanne",
      intro:
        "Réfection totale d'une couverture centenaire : dépose des tuiles, pose d'un écran HPV, tuiles terre cuite neuves et zinguerie refaite, en cinq jours.",
      localSlugs: ["renovation-couverture-tuiles-villeurbanne"],
      nearbyTitle: "Ailleurs à Lyon et en proche métropole",
      nearbySlugs: [
        "creation-verriere-toit-lyon-3",
        "refection-etancheite-toit-terrasse-lyon-6",
        "isolation-sarking-toiture-caluire",
      ],
    },
    processIntro:
      "En ville, la préparation compte autant que les travaux : la visite permet aussi d'étudier l'accès, l'emplacement de l'échafaudage et l'évacuation des anciennes tuiles.",
    nearby: {
      title: "Communes voisines de Villeurbanne",
      intro: "Nous intervenons également à proximité :",
      cities: [
        { name: "Lyon", slug: "couvreur-lyon" },
        { name: "Vaulx-en-Velin" },
        { name: "Caluire-et-Cuire", slug: "couvreur-caluire-et-cuire" },
        { name: "Bron" },
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
      ],
    },
    faq: [
      {
        question: "Jrenov est-il une entreprise villeurbannaise ?",
        answer:
          "Non. Notre siège est à Décines-Charpieu, au 48 Ancien Chemin des Marais. Nous intervenons à Villeurbanne depuis cette adresse, comme dans le reste de la métropole lyonnaise.",
      },
      {
        question: "Que comprend une rénovation complète de couverture ?",
        answer:
          "Sur notre chantier de Villeurbanne : dépose de toutes les tuiles, pose d'un écran de sous-toiture HPV, repose de tuiles terre cuite neuves, puis réfection en zinc de l'étanchéité des rives et de la cheminée. Le chantier a duré cinq jours.",
      },
      {
        question: "Faut-il une autorisation pour refaire sa toiture ?",
        answer:
          "Une réfection à l'identique ne demande généralement pas de formalité d'urbanisme, mais un changement d'aspect (matériau, couleur) relève en règle générale d'une déclaration préalable. Renseignez-vous auprès du service urbanisme de votre mairie avant de lancer les travaux.",
      },
    ],
    sectionOrder: ["intro", "realisations", "context", "issues", "services", "process", "faq", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // LYON — angle : bâti urbain (immeubles, toits-terrasses, maisons de ville)
  // Réalisations réelles : Lyon 3e (verrière), Lyon 5e (solins), Lyon 6e (toit-terrasse)
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-lyon",
    city: "Lyon",
    postalCode: "69001-69009",
    primaryKeyword: "couvreur Lyon",
    metaTitle: "Couvreur à Lyon – Toits-terrasses, solins & verrières",
    metaDescription:
      "Toits-terrasses, solins de maisons de ville, verrières : Jrenov intervient à Lyon depuis Décines-Charpieu. Chantiers réalisés dans les 3e, 5e et 6e.",
    h1: "Couvreur à Lyon : immeubles, toits-terrasses et maisons de ville",
    heroBadge: "Lyon intra-muros · intervention depuis Décines-Charpieu",
    heroLead:
      "Une toiture lyonnaise, c'est souvent un toit-terrasse au-dessus des derniers étages, une maison de ville serrée contre ses voisines ou un atelier sous verrière. Des configurations urbaines qui demandent des solutions sur mesure.",
    intro: {
      title: "Des chantiers dans plusieurs arrondissements",
      paragraphs: [
        "Jrenov n'est pas installé à Lyon : notre siège se trouve à Décines-Charpieu, à l'est de l'agglomération. Les arrondissements de la rive gauche du Rhône sont donc les plus proches de nous, mais nous intervenons aussi de l'autre côté des fleuves.",
        "En 2026, nous avons réalisé trois chantiers lyonnais très différents : l'étanchéité d'un toit-terrasse dans le 6e, une verrière d'atelier dans le 3e et la reprise de solins en plomb sur une maison de ville historique du 5e. Trois chantiers, trois problèmes propres au bâti urbain.",
      ],
    },
    context: {
      title: "Toiture en ville : immeubles, copropriétés et secteurs protégés",
      paragraphs: [
        "Sur un immeuble en copropriété, la préparation des travaux de toiture peut nécessiter une coordination avec le syndic ou les autres interlocuteurs de l'immeuble. Mieux vaut en tenir compte dans le calendrier lorsqu'une infiltration touche les derniers étages.",
        "Certains secteurs lyonnais peuvent être soumis à des règles particulières d'urbanisme ou de patrimoine. Avant une modification visible de la toiture (matériau, teinte, nouvelle ouverture), renseignez-vous auprès du service urbanisme compétent.",
      ],
    },
    issues: {
      title: "Les situations que nous rencontrons à Lyon",
      items: [
        {
          title: "Infiltrations sous un toit-terrasse",
          text: "Quand l'eau atteint les derniers étages d'un immeuble, c'est souvent le complexe d'étanchéité lui-même qui est en fin de vie et doit être refait.",
        },
        {
          title: "Raccord contre un mur mitoyen",
          text: "Entre deux bâtiments accolés, la jonction toiture-mur est protégée par un solin : fissuré ou décollé, il laisse ruisseler l'eau dans les murs.",
        },
        {
          title: "Besoin de lumière sous les toits",
          text: "Atelier, combles ou dernier étage sombre : une verrière ou une fenêtre de toit impose d'ouvrir la couverture et parfois de renforcer la charpente.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Lyon",
      intro: "Selon le bâtiment et le problème rencontré :",
      items: [
        {
          service: "recherche-de-fuite",
          text: "Infiltrations aux derniers étages ou sous un toit plat : recherche de l'origine avant toute réfection.",
        },
        {
          service: "zinguerie",
          text: "Solins, bandes d'étanchéité en plomb ou en zinc, gouttières et chéneaux d'immeubles et de maisons de ville.",
        },
        {
          service: "fenetres-de-toit",
          text: "Verrières d'atelier et fenêtres de toit, avec renforcement de charpente lorsque l'ouverture l'exige.",
        },
        {
          service: "couverture",
          text: "Réparation et réfection de couvertures en tuiles ou en ardoise.",
        },
        {
          service: "isolation",
          text: "Isolation intégrée à la réfection d'une étanchéité ou d'une couverture.",
        },
      ],
    },
    realisations: {
      title: "Nos réalisations à Lyon",
      intro: "Trois chantiers menés dans Lyon même, dans trois arrondissements différents :",
      localSlugs: [
        "refection-etancheite-toit-terrasse-lyon-6",
        "creation-verriere-toit-lyon-3",
        "refection-solins-etancheite-lyon-5",
      ],
      nearbyTitle: "Dans les communes limitrophes",
      nearbySlugs: [
        "renovation-couverture-tuiles-villeurbanne",
        "isolation-sarking-toiture-caluire",
        "renovation-toiture-ardoise-ste-foy",
      ],
    },
    processIntro:
      "À Lyon, la visite sert aussi à repérer les contraintes d'accès : hauteur de l'immeuble, cour intérieure, rue étroite. Elles conditionnent la manière d'installer le chantier.",
    nearby: {
      title: "Autour de Lyon",
      intro: "Nous intervenons également dans les communes qui bordent Lyon :",
      cities: [
        { name: "Villeurbanne", slug: "couvreur-villeurbanne" },
        { name: "Caluire-et-Cuire", slug: "couvreur-caluire-et-cuire" },
        { name: "Sainte-Foy-lès-Lyon" },
        { name: "Vénissieux", slug: "couvreur-venissieux" },
        { name: "Bron" },
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
      ],
    },
    faq: [
      {
        question: "D'où intervient Jrenov pour un chantier à Lyon ?",
        answer:
          "De notre siège de Décines-Charpieu, au 48 Ancien Chemin des Marais. Nous n'avons pas d'établissement dans Lyon, mais nous y avons déjà réalisé des chantiers dans les 3e, 5e et 6e arrondissements.",
      },
      {
        question: "Refaites-vous l'étanchéité des toits-terrasses d'immeubles ?",
        answer:
          "Oui. Dans le 6e arrondissement, après des infiltrations dans les derniers étages, nous avons déposé l'ancien revêtement d'un toit-terrasse, posé un pare-vapeur, 120 mm d'isolant polyuréthane, puis une étanchéité bicouche élastomère soudée au chalumeau, en quatre jours.",
      },
      {
        question: "Comment se prépare un chantier de toiture sur un immeuble en copropriété ?",
        answer:
          "La préparation peut nécessiter une coordination avec le syndic ou les autres interlocuteurs de l'immeuble. Nous établissons un devis détaillé, gratuit et sans engagement, qui peut leur être transmis.",
      },
      {
        question: "Peut-on installer une verrière dans une toiture lyonnaise ?",
        answer:
          "Oui, si la charpente le permet ou peut être renforcée. Dans le 3e arrondissement, nous avons renforcé la charpente bois, découpé la couverture et intégré trois verrières juxtaposées, avec des raccords d'étanchéité en plomb et en zinc.",
      },
    ],
    sectionOrder: ["intro", "context", "realisations", "issues", "services", "faq", "process", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // GENAS — angle : entretien, démoussage, couverture
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-genas",
    city: "Genas",
    postalCode: "69740",
    primaryKeyword: "couvreur Genas",
    metaTitle: "Couvreur à Genas – Démoussage & entretien de toiture",
    metaDescription:
      "Couvreur à Genas : nettoyage et démoussage de toiture, traitement des tuiles, réparation et rénovation de couverture. Jrenov, artisan basé à Décines-Charpieu. Devis gratuit.",
    h1: "Couvreur à Genas : entretien, démoussage et couverture",
    heroBadge: "Est lyonnais · intervention depuis Décines-Charpieu",
    heroLead:
      "Une toiture envahie par la mousse vieillit plus vite. À Genas, nous avons nettoyé en août 2026 une couverture en tuiles romanes avec un traitement d'origine végétale.",
    intro: {
      title: "Genas, dans l'Est lyonnais",
      paragraphs: [
        "Genas fait partie de la Communauté de communes de l'Est lyonnais, en dehors du périmètre de la Métropole de Lyon, mais tout près de Décines-Charpieu où Jrenov est installé. C'est pour nous une commune de proximité, au même titre que Meyzieu ou Chassieu.",
        "Sur les maisons individuelles, l'entretien régulier de la couverture évite bien des réparations. Cette page s'attarde donc sur le nettoyage et le démoussage, sans oublier que nous réparons et rénovons aussi les toitures genassiennes.",
      ],
    },
    context: {
      title: "Mousses et lichens : agir avant que les tuiles ne souffrent",
      paragraphs: [
        "La mousse agit comme une éponge posée sur les tuiles : elle garde l'humidité au contact du matériau. Lors des épisodes de gel, cette eau peut faire éclater la surface des tuiles, et les débris végétaux qui glissent vers le bas encombrent les gouttières.",
        "Le choix de la méthode compte autant que la fréquence. À Genas, les tuiles romanes ont été nettoyées à basse pression pour ne pas dégrader le matériau, puis nous avons appliqué un traitement décontaminant d'origine végétale, bio-assimilable.",
      ],
    },
    issues: {
      title: "Signes qu'une toiture a besoin d'entretien",
      items: [
        {
          title: "Couverture verte ou noircie",
          text: "Mousses, lichens et traces noires s'installent d'abord sur les pans les moins ensoleillés et dans le creux des tuiles canal.",
        },
        {
          title: "Gouttières encombrées",
          text: "Débris végétaux et dépôts de mousse ralentissent l'écoulement et provoquent des débordements le long de la façade.",
        },
        {
          title: "Tuiles qui s'effritent",
          text: "Quand la surface s'écaille, un simple nettoyage ne suffit plus : un remplacement ponctuel des tuiles abîmées s'impose avant tout traitement.",
        },
      ],
    },
    services: {
      title: "L'entretien d'abord, la couverture ensuite",
      intro: "Selon l'état de votre toit, nous vous orientons vers :",
      items: [
        {
          service: "demoussage",
          text: "Nettoyage, traitement anti-mousse, hydrofuge incolore ou coloré.",
        },
        {
          service: "couverture",
          text: "Remplacement des tuiles cassées ou poreuses, réfection de faîtage, rénovation de la toiture.",
        },
        {
          service: "zinguerie",
          text: "Nettoyage, réparation ou remplacement des gouttières et chéneaux.",
        },
        {
          service: "isolation",
          text: "Isolation des combles si vous profitez de l'intervention pour améliorer le confort de la maison.",
        },
      ],
    },
    realisations: {
      title: "Notre réalisation à Genas",
      intro:
        "Nettoyage basse pression de tuiles romanes envahies par la végétation, puis traitement d'origine végétale, en deux jours :",
      localSlugs: ["demoussage-toiture-ecologique-genas"],
      nearbyTitle: "Autres chantiers dans l'Est lyonnais",
      nearbySlugs: [
        "isolation-combles-perdus-laine-roche-chassieu",
        "traitement-charpente-bois-saint-priest",
        "remplacement-velux-ancien-decines",
      ],
    },
    processIntro:
      "Pour un démoussage à Genas, la visite permet de vérifier l'état des tuiles : nettoyer une couverture qui comporte des tuiles fendues n'aurait pas de sens sans les remplacer.",
    nearby: {
      title: "Autour de Genas",
      intro: "Nous intervenons aussi dans les communes voisines :",
      cities: [
        { name: "Chassieu", slug: "couvreur-chassieu" },
        { name: "Meyzieu", slug: "couvreur-meyzieu" },
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
        { name: "Saint-Priest", slug: "couvreur-saint-priest" },
        { name: "Pusignan" },
        { name: "Saint-Bonnet-de-Mure" },
      ],
    },
    faq: [
      {
        question: "À quelle fréquence faut-il démousser une toiture ?",
        answer:
          "Un entretien tous les 3 à 5 ans est généralement conseillé, de préférence au printemps ou à l'automne. Évitez les fortes chaleurs et les périodes de gel.",
      },
      {
        question: "Un démoussage risque-t-il d'abîmer les tuiles ?",
        answer:
          "Pas si la pression est adaptée au matériau. À Genas, le nettoyage des tuiles romanes a été réalisé à basse pression pour ne pas dégrader leur surface.",
      },
      {
        question: "Existe-t-il des traitements plus respectueux de l'environnement ?",
        answer:
          "Oui. Sur ce chantier, nous avons appliqué un traitement décontaminant d'origine végétale, bio-assimilable. Le choix du produit se fait selon l'état de la couverture.",
      },
      {
        question: "Genas fait-elle partie de votre zone d'intervention ?",
        answer:
          "Oui. Bien que hors Métropole de Lyon, Genas est proche de notre siège de Décines-Charpieu et fait pleinement partie de notre secteur de l'Est lyonnais.",
      },
    ],
    sectionOrder: ["intro", "context", "services", "realisations", "issues", "process", "nearby", "faq"],
  },

  // ──────────────────────────────────────────────────────────────
  // CHASSIEU — angle : isolation des combles + couverture
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-chassieu",
    city: "Chassieu",
    postalCode: "69680",
    primaryKeyword: "couvreur Chassieu",
    metaTitle: "Couvreur à Chassieu – Toiture & isolation des combles",
    metaDescription:
      "Couvreur à Chassieu : isolation des combles perdus, réparation et rénovation de toiture, zinguerie. Jrenov intervient depuis Décines-Charpieu. Devis gratuit et sans engagement.",
    h1: "Couvreur à Chassieu : couverture et isolation de toiture",
    heroBadge: "Est lyonnais · à proximité de notre siège",
    heroLead:
      "Un isolant tassé perd une partie de son efficacité. À Chassieu, nous avons remplacé en juillet 2026 une vieille laine de verre par 35 cm de laine de roche soufflée.",
    intro: {
      title: "Chassieu, entre Eurexpo et zones résidentielles",
      paragraphs: [
        "Chassieu est surtout connue pour le parc des expositions Eurexpo et la proximité de l'aéroport de Lyon-Bron. C'est aussi une commune résidentielle voisine de Décines-Charpieu, où se trouve le siège de Jrenov.",
        "Avant d'isoler des combles, mieux vaut s'assurer que la couverture est étanche : une fuite non traitée finirait par mouiller le nouvel isolant. C'est l'intérêt de confier les deux sujets à une entreprise de couverture, capable d'intervenir au-dessus comme au-dessous des tuiles.",
      ],
    },
    context: {
      title: "Combles perdus : une isolation qui se vérifie",
      paragraphs: [
        "Sur le chantier de Chassieu, l'ancienne laine de verre, tassée, a d'abord été évacuée. Nous avons ensuite posé des piges de hauteur et repéré le réseau électrique avant de souffler 35 cm de laine de roche, pour une résistance thermique annoncée de R = 8 m².K/W.",
        "Les piges restent en place après le chantier : elles permettent de contrôler l'épaisseur réellement soufflée. Le soufflage a été réalisé en une journée.",
      ],
    },
    issues: {
      title: "Quand se pencher sur ses combles et sa toiture",
      items: [
        {
          title: "Isolant tassé ou déplacé",
          text: "Avec le temps, certaines laines se tassent ou sont déplacées lors de travaux : l'épaisseur efficace diminue.",
        },
        {
          title: "Traces d'humidité sous la toiture",
          text: "Auréoles sur la charpente ou isolant mouillé signalent une infiltration à traiter avant toute nouvelle isolation.",
        },
        {
          title: "Couverture à refaire",
          text: "Si la toiture doit être rénovée, l'isolation peut être posée par l'extérieur, sur les chevrons, sans perdre d'espace dans les combles.",
        },
      ],
    },
    services: {
      title: "Ce que nous réalisons à Chassieu",
      intro: "Isolation et couverture, mais aussi zinguerie et entretien :",
      items: [
        {
          service: "isolation",
          text: "Soufflage en combles perdus, isolation des combles aménagés, isolation par l'extérieur (Sarking).",
        },
        {
          service: "couverture",
          text: "Remplacement de tuiles, réfection de faîtage, rénovation de toiture.",
        },
        {
          service: "recherche-de-fuite",
          text: "Isolant mouillé dans les combles ? Avant de le remplacer, nous localisons l'entrée d'eau et réparons la couverture.",
        },
        {
          service: "zinguerie",
          text: "Gouttières, noues et abergements de cheminée.",
        },
        {
          service: "demoussage",
          text: "Nettoyage et traitement de la couverture.",
        },
      ],
    },
    realisations: {
      title: "Notre réalisation à Chassieu",
      intro:
        "Évacuation de l'ancien isolant et soufflage de 35 cm de laine de roche dans des combles perdus, en une journée :",
      localSlugs: ["isolation-combles-perdus-laine-roche-chassieu"],
      nearbyTitle: "Chantiers voisins",
      nearbySlugs: [
        "traitement-charpente-bois-saint-priest",
        "demoussage-toiture-ecologique-genas",
        "renovation-toiture-garages-corbas",
      ],
    },
    processIntro:
      "Pour un projet d'isolation à Chassieu, la visite inclut un passage dans les combles : état de l'isolant existant, accès, réseau électrique et signes éventuels d'infiltration.",
    nearby: {
      title: "Communes autour de Chassieu",
      intro: "Nous intervenons aussi à proximité :",
      cities: [
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
        { name: "Genas", slug: "couvreur-genas" },
        { name: "Saint-Priest", slug: "couvreur-saint-priest" },
        { name: "Bron" },
        { name: "Meyzieu", slug: "couvreur-meyzieu" },
      ],
    },
    faq: [
      {
        question: "Quelle épaisseur d'isolant souffler dans des combles perdus ?",
        answer:
          "Elle dépend de l'isolant choisi et de la performance visée. À Chassieu, nous avons soufflé 35 cm de laine de roche, pour une résistance thermique annoncée de R = 8 m².K/W.",
      },
      {
        question: "Faut-il retirer l'ancien isolant ?",
        answer:
          "Quand il est tassé, souillé ou humide, oui. C'est ce que nous avons fait à Chassieu en évacuant l'ancienne laine de verre avant le soufflage.",
      },
      {
        question: "Peut-on isoler sans toucher à la couverture ?",
        answer:
          "Oui pour des combles perdus : l'isolant est soufflé sur le plancher. Si la couverture doit de toute façon être refaite, l'isolation par l'extérieur devient intéressante, comme sur notre chantier de Caluire-et-Cuire.",
      },
    ],
    sectionOrder: ["intro", "context", "realisations", "issues", "services", "faq", "process", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // SAINT-PRIEST — angle : sous la toiture (charpente) + couverture
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-saint-priest",
    city: "Saint-Priest",
    postalCode: "69800",
    primaryKeyword: "couvreur Saint-Priest",
    metaTitle: "Couvreur à Saint-Priest – Toiture & charpente",
    metaDescription:
      "Couvreur à Saint-Priest : réparation et rénovation de toiture, zinguerie, isolation et traitement de charpente contre les insectes. Jrenov, basé à Décines-Charpieu. Devis gratuit.",
    h1: "Couvreur à Saint-Priest : toiture, combles et charpente",
    heroBadge: "Sud-Est lyonnais · intervention depuis Décines-Charpieu",
    heroLead:
      "De la sciure au pied des pièces de bois, de petits trous dans les chevrons ? C'est souvent la trace d'insectes xylophages. À Saint-Priest, nous avons traité en juin 2026 une charpente attaquée par des vrillettes.",
    intro: {
      title: "Des toitures de toutes les époques",
      paragraphs: [
        "Saint-Priest est l'une des grandes communes de l'est de la métropole. Entre le centre ancien, les quartiers résidentiels et des secteurs plus excentrés comme Manissieux, on y trouve des toitures de toutes les époques, de la maison de village au pavillon récent.",
        "Jrenov s'y rend depuis Décines-Charpieu pour les travaux de couverture, de zinguerie et d'isolation, mais aussi pour ce qui se passe sous les tuiles : la charpente, qui porte l'ensemble de la toiture.",
      ],
    },
    context: {
      title: "Ce qu'un couvreur observe sous la toiture",
      paragraphs: [
        "Sur le chantier de Saint-Priest, c'est la présence de sciure dans des combles perdus qui a donné l'alerte. Le traitement a combiné brossage des bois, perçage, pose d'injecteurs autonomes et traitement sous pression du cœur des pannes et des chevrons, complété par une pulvérisation, en deux jours.",
        "Un bois humide est aussi un bois fragilisé. Lorsqu'une ancienne fuite a laissé des traces, certaines pièces doivent être renforcées ou remplacées : à Oullins, nous avons ainsi changé des chevrons affaissés et moisé des pannes avant de refermer la couverture.",
      ],
    },
    issues: {
      title: "Ce qui doit vous alerter",
      items: [
        {
          title: "Sciure et petits trous dans le bois",
          text: "Ce sont les indices d'insectes xylophages : un traitement curatif stoppe l'attaque, le préventif protège les bois sains.",
        },
        {
          title: "Toiture qui se déforme",
          text: "Un faîtage qui ondule ou un pan qui se creuse peut révéler une pièce de charpente affaiblie.",
        },
        {
          title: "Tuiles cassées après un orage",
          text: "Grêle et coups de vent imposent une mise hors d'eau rapide avant la réparation définitive.",
        },
      ],
    },
    services: {
      title: "Nos interventions à Saint-Priest",
      intro: "Au-delà du traitement de charpente, nous proposons :",
      items: [
        {
          service: "couverture",
          text: "Remplacement de tuiles, réfection de faîtage, couverture de dépendances en bac acier.",
        },
        {
          service: "recherche-de-fuite",
          text: "Après un orage, bâchage pour remettre la toiture hors d'eau, puis réparation définitive des tuiles et du faîtage.",
        },
        {
          service: "isolation",
          text: "Isolation des combles une fois la charpente saine.",
        },
        {
          service: "zinguerie",
          text: "Gouttières, chéneaux, noues et raccords d'étanchéité.",
        },
        {
          service: "demoussage",
          text: "Nettoyage et traitement des tuiles.",
        },
      ],
    },
    realisations: {
      title: "Notre réalisation à Saint-Priest",
      intro:
        "Traitement curatif et préventif d'une charpente attaquée par des vrillettes, dans des combles perdus :",
      localSlugs: ["traitement-charpente-bois-saint-priest"],
      nearbyTitle: "Dans le sud-est de l'agglomération",
      nearbySlugs: [
        "renovation-toiture-garages-corbas",
        "remplacement-tuiles-cassees-orage-venissieux",
        "isolation-combles-perdus-laine-roche-chassieu",
      ],
    },
    processIntro:
      "À Saint-Priest comme ailleurs, la visite ne s'arrête pas aux tuiles : quand c'est possible, nous inspectons aussi les combles pour vérifier l'état de la charpente.",
    nearby: {
      title: "Communes proches de Saint-Priest",
      intro: "Nous intervenons également autour de Saint-Priest :",
      cities: [
        { name: "Chassieu", slug: "couvreur-chassieu" },
        { name: "Genas", slug: "couvreur-genas" },
        { name: "Bron" },
        { name: "Vénissieux", slug: "couvreur-venissieux" },
        { name: "Mions" },
        { name: "Corbas" },
      ],
    },
    faq: [
      {
        question: "Comment savoir si une charpente est attaquée par des insectes ?",
        answer:
          "Sciure au sol des combles, petits trous ronds dans le bois, bois qui s'effrite sous la pointe d'un tournevis : ce sont les signes les plus courants. À Saint-Priest, c'est la sciure qui a donné l'alerte.",
      },
      {
        question: "En quoi consiste un traitement de charpente ?",
        answer:
          "Sur notre chantier de Saint-Priest : brossage des bois, perçage, pose d'injecteurs autonomes et traitement sous pression des pannes et chevrons, complété par une pulvérisation. L'intervention a duré deux jours.",
      },
      {
        question: "Intervenez-vous après un orage ?",
        answer:
          "Oui. À Vénissieux, commune voisine, nous avons bâché une toiture moins de 12 heures après un orage de grêle, puis remplacé 150 tuiles et consolidé le faîtage.",
      },
      {
        question: "Couvrez-vous aussi les garages et dépendances ?",
        answer:
          "Oui. À Corbas, nous avons posé une couverture en bac acier anti-condensation sur un garage, après dépose de l'ancienne couverture amiantée par une entreprise agréée.",
      },
    ],
    sectionOrder: ["intro", "issues", "context", "realisations", "services", "process", "faq", "nearby"],
  },
  // ──────────────────────────────────────────────────────────────
  // CALUIRE-ET-CUIRE — angle : isolation par l'extérieur (Sarking) + réfection
  // Réalisation réelle : isolation-sarking-toiture-caluire (mars 2026)
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-caluire-et-cuire",
    city: "Caluire-et-Cuire",
    postalCode: "69300",
    primaryKeyword: "couvreur Caluire-et-Cuire",
    metaTitle: "Couvreur à Caluire-et-Cuire – Isolation Sarking & réfection",
    metaDescription:
      `Couvreur à Caluire-et-Cuire : réfection de toiture, isolation sous tuiles en fibre de bois (Sarking), zinguerie et recherche de fuite. Chantier réalisé en mars 2026. Devis gratuit au ${BUSINESS.phoneDisplay}.`,
    h1: "Couvreur à Caluire-et-Cuire : réfection et isolation de toiture",
    heroBadge: "Plateau de Caluire · chantier réalisé en 2026",
    heroLead:
      "Refaire sa couverture est le meilleur moment pour isoler par-dessus les chevrons. À Caluire-et-Cuire, nous avons mené en mars 2026 une rénovation complète avec 160 mm de fibre de bois posés sous les tuiles neuves.",
    intro: {
      title: "Entre Rhône et Saône, au nord de Lyon",
      paragraphs: [
        "Caluire-et-Cuire occupe le plateau qui prolonge la Croix-Rousse vers le nord, entre la Saône et le Rhône. Des bords du Rhône à Saint-Clair jusqu'aux rues pavillonnaires de Montessuy ou de Vassieux, la commune réunit des maisons de maître, des villas et de petits immeubles aux toitures très différentes.",
        "Jrenov n'a pas d'établissement à Caluire-et-Cuire : nous venons de Décines-Charpieu, en traversant le Rhône. Nous y avons déjà conduit l'un de nos chantiers les plus complets, une rénovation énergétique de toiture menée en sept jours.",
      ],
    },
    context: {
      title: "Isoler par l'extérieur sans perdre un centimètre sous les combles",
      paragraphs: [
        "La technique dite « Sarking » consiste à poser l'isolant au-dessus de la charpente, en panneaux rigides continus, avant de remettre la couverture. Les chevrons restent apparents à l'intérieur et les pièces sous les toits gardent toute leur hauteur, ce qui intéresse particulièrement les combles déjà aménagés.",
        "Sur la maison caluirarde, la couverture a été entièrement déposée, puis des panneaux de fibre de bois haute densité de 160 mm ont été fixés sur les chevrons. Ce matériau dense limite aussi la surchauffe estivale sous les toits. Une couverture neuve a ensuite été posée par-dessus.",
      ],
    },
    issues: {
      title: "Pourquoi les Caluirards nous contactent",
      items: [
        {
          title: "Combles aménagés trop chauds l'été",
          text: "Une chambre sous les toits devient vite inconfortable lorsque l'isolant est mince ou absent : l'isolation par l'extérieur traite le problème sans réduire la pièce.",
        },
        {
          title: "Couverture ancienne en fin de vie",
          text: "Tuiles qui se délitent, liteaux fatigués, absence d'écran sous toiture : une réfection complète permet de tout reprendre d'un coup.",
        },
        {
          title: "Infiltration sur une maison de maître",
          text: "Lucarnes, cheminées et noues multiplient les raccords sur les grandes toitures : chacun d'eux doit être contrôlé lors du diagnostic.",
        },
      ],
    },
    services: {
      title: "Nos interventions à Caluire-et-Cuire",
      intro: "Isolation et couverture vont souvent de pair sur les maisons caluirardes :",
      items: [
        {
          service: "isolation",
          text: "Isolation sous tuiles en fibre de bois (Sarking), isolation des combles perdus ou aménagés.",
        },
        {
          service: "couverture",
          text: "Dépose et réfection complète de couverture, remplacement des liteaux et pose d'un écran de sous-toiture.",
        },
        {
          service: "zinguerie",
          text: "Abergements de cheminée, noues, gouttières et habillages de rives en zinc.",
        },
        {
          service: "recherche-de-fuite",
          text: "Tache au plafond d'une chambre sous les toits : nous cherchons l'entrée d'eau avant de proposer la réparation adaptée.",
        },
        {
          service: "fenetres-de-toit",
          text: "Remplacement ou création de fenêtres de toit, idéalement en même temps qu'une réfection.",
        },
      ],
    },
    realisations: {
      title: "Notre chantier à Caluire-et-Cuire",
      intro:
        "Dépose de la couverture, isolation en fibre de bois de 160 mm sur chevrons et couverture neuve, en sept jours :",
      localSlugs: ["isolation-sarking-toiture-caluire"],
      nearbyTitle: "Autres chantiers au nord de Lyon",
      nearbySlugs: [
        "renovation-faitage-a-sec-fontaines-sur-saone",
        "renovation-toiture-tuiles-plat-champagne-au-mont-d-or",
        "creation-verriere-toit-lyon-3",
      ],
    },
    processIntro:
      "Pour un projet d'isolation par l'extérieur à Caluire-et-Cuire, la visite permet de mesurer la toiture, de vérifier la charpente et d'anticiper la surélévation créée par l'isolant au niveau des rives et des raccords.",
    nearby: {
      title: "Autour de Caluire-et-Cuire",
      intro: "Nous intervenons également dans les communes voisines :",
      cities: [
        { name: "Lyon", slug: "couvreur-lyon" },
        { name: "Villeurbanne", slug: "couvreur-villeurbanne" },
        { name: "Rillieux-la-Pape" },
        { name: "Fontaines-sur-Saône" },
        { name: "Sathonay-Camp" },
      ],
    },
    faq: [
      {
        question: "Qu'est-ce que l'isolation Sarking ?",
        answer:
          "C'est une isolation posée au-dessus des chevrons, sous la couverture. À Caluire-et-Cuire, nous avons utilisé des panneaux rigides de fibre de bois de 160 mm avant de reposer une couverture neuve. L'espace intérieur des combles est entièrement conservé.",
      },
      {
        question: "Combien de temps dure une rénovation de toiture avec isolation par l'extérieur ?",
        answer:
          "Notre chantier de Caluire-et-Cuire a duré sept jours, de la dépose de l'ancienne couverture à la pose des tuiles neuves. La durée varie selon la surface, la forme de la toiture et la météo.",
      },
      {
        question: "Faut-il refaire la couverture pour isoler par l'extérieur ?",
        answer:
          "Oui : l'isolant se place entre la charpente et les tuiles, la couverture doit donc être déposée. C'est pourquoi cette solution est surtout pertinente lorsque la toiture doit de toute façon être refaite.",
      },
      {
        question: "Venez-vous de loin pour un chantier caluirard ?",
        answer:
          `Notre siège se trouve à Décines-Charpieu, de l'autre côté du Rhône. Pour une visite ou un devis gratuit, appelez le ${BUSINESS.phoneDisplay} du lundi au samedi.`,
      },
    ],
    sectionOrder: ["intro", "context", "realisations", "services", "issues", "faq", "process", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // VÉNISSIEUX — angle : urgence après intempéries, bâtiments professionnels
  // Réalisation réelle : remplacement-tuiles-cassees-orage-venissieux (juin 2026)
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-venissieux",
    city: "Vénissieux",
    postalCode: "69200",
    primaryKeyword: "couvreur Vénissieux",
    metaTitle: "Couvreur à Vénissieux – Urgence tuiles cassées & bâchage",
    metaDescription:
      `Couvreur à Vénissieux : bâchage d'urgence, remplacement de tuiles cassées après orage ou grêle, réparation de faîtage et de couverture, particuliers et professionnels. Appelez le ${BUSINESS.phoneDisplay}.`,
    h1: "Couvreur à Vénissieux : urgence toiture et réparation de couverture",
    heroBadge: "Sud de Lyon · intervention depuis Décines-Charpieu",
    heroLead:
      "Après un orage de grêle, chaque heure compte. En juin 2026, nous avons bâché en moins de 12 heures la toiture d'un bâtiment professionnel de Vénissieux, puis remplacé 150 tuiles.",
    intro: {
      title: "Vénissieux, porte sud de la métropole",
      paragraphs: [
        "Vénissieux s'étend au sud de Lyon, entre le 8e arrondissement, Saint-Fons, Saint-Priest et Corbas. Le centre, Parilly, le Moulin-à-Vent ou les Minguettes ne se ressemblent pas, et les toitures non plus : maisons individuelles, petits collectifs, ateliers et locaux d'activité.",
        "Notre siège de Décines-Charpieu est relié à Vénissieux par le boulevard périphérique Laurent-Bonnevay, ce qui nous permet d'intervenir rapidement en cas de dégât sur une toiture, pour des particuliers comme pour des entreprises.",
      ],
    },
    context: {
      title: "Toiture abîmée par un orage : les bons réflexes",
      paragraphs: [
        "Après un épisode de grêle ou de vent violent, la priorité est de remettre le bâtiment hors d'eau. Une bâche correctement lestée et fixée limite les infiltrations le temps de commander les matériaux et de planifier la réparation définitive.",
        "Prenez des photos des dégâts visibles depuis le sol et prévenez votre assureur dans les délais prévus par votre contrat. Un devis détaillé de réparation, établi après visite, vous sera généralement demandé pour le dossier.",
      ],
    },
    issues: {
      title: "Les dégâts que nous réparons à Vénissieux",
      items: [
        {
          title: "Tuiles cassées par la grêle",
          text: "Les impacts fendent ou percent les tuiles : l'eau passe dès la pluie suivante, parfois loin du point d'impact.",
        },
        {
          title: "Faîtage fragilisé",
          text: "Les tuiles faîtières, au sommet du toit, sont les plus exposées : leurs fixations doivent être vérifiées et consolidées après une tempête.",
        },
        {
          title: "Locaux professionnels à remettre en service",
          text: "Sur un atelier ou un entrepôt, une infiltration peut stopper l'activité : la mise hors d'eau passe avant tout le reste.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Vénissieux",
      intro: "De l'urgence à la rénovation :",
      items: [
        {
          service: "recherche-de-fuite",
          text: "Bâchage de mise hors d'eau, recherche de l'origine d'une infiltration et réparation.",
        },
        {
          service: "couverture",
          text: "Remplacement de tuiles cassées, consolidation du faîtage, réfection partielle ou totale de la couverture.",
        },
        {
          service: "zinguerie",
          text: "Gouttières et chéneaux déformés par la grêle ou arrachés par le vent.",
        },
        {
          service: "isolation",
          text: "Remplacement d'un isolant de combles mouillé après une infiltration.",
        },
        {
          service: "demoussage",
          text: "Nettoyage et traitement des tuiles une fois la toiture remise en état.",
        },
      ],
    },
    realisations: {
      title: "Notre intervention d'urgence à Vénissieux",
      intro:
        "Bâchage sous 12 heures après la grêle, remplacement de 150 tuiles et consolidation des fixations du faîtage, en deux jours :",
      localSlugs: ["remplacement-tuiles-cassees-orage-venissieux"],
      nearbyTitle: "Dans le sud et l'est de l'agglomération",
      nearbySlugs: [
        "renovation-toiture-garages-corbas",
        "traitement-charpente-bois-saint-priest",
        "refection-etancheite-toit-terrasse-lyon-6",
      ],
    },
    processIntro:
      "En cas d'urgence à Vénissieux, appelez directement : nous évaluons la situation par téléphone puis organisons la mise hors d'eau avant le diagnostic complet et le devis.",
    nearby: {
      title: "Communes proches de Vénissieux",
      intro: "Nous intervenons aussi autour de Vénissieux :",
      cities: [
        { name: "Lyon", slug: "couvreur-lyon" },
        { name: "Saint-Priest", slug: "couvreur-saint-priest" },
        { name: "Corbas" },
        { name: "Saint-Fons" },
        { name: "Feyzin" },
        { name: "Bron" },
      ],
    },
    faq: [
      {
        question: "En combien de temps pouvez-vous bâcher une toiture après un orage ?",
        answer:
          "Cela dépend du nombre de demandes après l'intempérie. Lors de notre intervention de juin 2026 à Vénissieux, le bâchage a été réalisé en moins de 12 heures après l'orage de grêle.",
      },
      {
        question: "Intervenez-vous sur des bâtiments professionnels ?",
        answer:
          "Oui. Le chantier de Vénissieux concernait justement un bâtiment professionnel : 150 tuiles ont été remplacées et les fixations du faîtage consolidées.",
      },
      {
        question: "Que faire en attendant le couvreur quand il pleut dans la maison ?",
        answer:
          "Coupez l'électricité de la pièce concernée si l'eau approche d'un point lumineux, placez des récipients sous les gouttes et déplacez meubles et objets de valeur. Ne montez jamais sur un toit mouillé.",
      },
      {
        question: "Le devis de réparation peut-il servir pour l'assurance ?",
        answer:
          "Notre devis détaille les travaux nécessaires et peut être joint à votre déclaration de sinistre. La prise en charge dépend ensuite de votre contrat et de l'expertise de l'assureur.",
      },
    ],
    sectionOrder: ["intro", "realisations", "context", "issues", "services", "process", "faq", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // JONAGE — angle : proximité immédiate, fuites et réparations rapides
  // Aucune réalisation publiée à Jonage : chantiers voisins uniquement
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-jonage",
    city: "Jonage",
    postalCode: "69330",
    primaryKeyword: "couvreur Jonage",
    metaTitle: "Couvreur à Jonage – Fuite de toit & réparation rapide",
    metaDescription:
      `Couvreur à Jonage : recherche de fuite, réparation de tuiles, gouttières et entretien de toiture. Jrenov est installé à Décines-Charpieu, à quelques minutes. Devis gratuit au ${BUSINESS.phoneDisplay}.`,
    h1: "Couvreur à Jonage : fuites, réparations et entretien de toiture",
    heroBadge: "À quelques minutes de notre siège",
    heroLead:
      "Une goutte au plafond, une tuile tombée dans le jardin, une gouttière qui déborde : à Jonage, votre couvreur est installé tout près, à Décines-Charpieu.",
    intro: {
      title: "Jonage, entre canal et Grand Parc",
      paragraphs: [
        "Jonage est l'une des communes les plus à l'est de la Métropole de Lyon, bordée par le canal qui porte son nom et par le Grand Parc de Miribel-Jonage. Le bâti y est majoritairement pavillonnaire, avec un centre-village plus ancien.",
        "Pour Jrenov, Jonage se trouve dans le premier cercle autour de notre siège de Décines-Charpieu, juste après Meyzieu. Une demande de visite pour une fuite ou une réparation peut donc s'organiser rapidement.",
      ],
    },
    context: {
      title: "Maisons individuelles : les fuites viennent souvent des raccords",
      paragraphs: [
        "Sur un pavillon, une infiltration ne signifie pas forcément qu'il faut refaire la toiture. Le plus souvent, l'eau passe par un point précis : une tuile glissée, un faîtage dont le mortier s'effrite, un abergement de cheminée fissuré ou une noue percée.",
        "Notre méthode consiste à partir de la trace d'humidité à l'intérieur pour remonter vers la couverture, en contrôlant chaque raccord. Ce diagnostic permet de proposer une réparation ciblée plutôt qu'une réfection coûteuse.",
      ],
    },
    issues: {
      title: "Les interventions demandées à Jonage",
      items: [
        {
          title: "Plafond taché ou humide",
          text: "La tache apparaît rarement à l'aplomb de l'entrée d'eau : l'eau chemine le long des chevrons avant de tomber sur l'isolant.",
        },
        {
          title: "Gouttières encombrées par les feuilles",
          text: "Dans un environnement arboré, gouttières et descentes se bouchent vite et l'eau finit par déborder contre la façade.",
        },
        {
          title: "Faîtage scellé qui s'effrite",
          text: "Le mortier des tuiles faîtières se fissure avec le temps ; une pose à sec avec closoir ventilé est plus durable.",
        },
      ],
    },
    services: {
      title: "Ce que nous faisons à Jonage",
      intro: "Réparation d'abord, rénovation quand elle s'impose :",
      items: [
        {
          service: "recherche-de-fuite",
          text: "Diagnostic de l'infiltration, mise hors d'eau si nécessaire, puis réparation du point défaillant.",
        },
        {
          service: "couverture",
          text: "Remplacement de tuiles, reprise de faîtage, réfection de rives et rénovation de couverture.",
        },
        {
          service: "zinguerie",
          text: "Nettoyage, réparation et remplacement de gouttières, noues et abergements.",
        },
        {
          service: "demoussage",
          text: "Démoussage et traitement hydrofuge pour prolonger la vie des tuiles.",
        },
        {
          service: "isolation",
          text: "Isolation des combles, une fois la couverture étanche.",
        },
      ],
    },
    realisations: {
      title: "Nos chantiers autour de Jonage",
      intro:
        "Nous n'avons pas encore publié de chantier situé à Jonage. Voici nos réalisations les plus proches, dans les communes voisines de l'Est lyonnais :",
      localSlugs: [],
      nearbyTitle: "À Meyzieu, Décines-Charpieu et Genas",
      nearbySlugs: [
        "habillage-bandeaux-rive-alu-meyzieu",
        "remplacement-velux-ancien-decines",
        "demoussage-toiture-ecologique-genas",
      ],
    },
    processIntro:
      "À Jonage, la visite de diagnostic est l'occasion de faire le tour complet de la toiture : couverture, faîtage, raccords et gouttières, pour ne rien laisser passer.",
    nearby: {
      title: "Autour de Jonage",
      intro: "Nous intervenons aussi dans les communes voisines :",
      cities: [
        { name: "Meyzieu", slug: "couvreur-meyzieu" },
        { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
        { name: "Genas", slug: "couvreur-genas" },
        { name: "Pusignan" },
        { name: "Jons" },
      ],
    },
    faq: [
      {
        question: "Faut-il refaire toute la toiture quand il y a une fuite ?",
        answer:
          "Rarement. Sur une maison individuelle, l'infiltration vient le plus souvent d'un point précis (tuile, faîtage, raccord de cheminée). Une recherche de fuite permet de réparer uniquement ce qui doit l'être.",
      },
      {
        question: "À quelle distance de Jonage se trouve votre entreprise ?",
        answer:
          `Notre siège est au 48 Ancien Chemin des Marais à Décines-Charpieu, à quelques minutes de Jonage par Meyzieu. Nous sommes joignables au ${BUSINESS.phoneDisplay} du lundi au samedi, de 8h à 19h.`,
      },
      {
        question: "Pourquoi remplacer un faîtage scellé par une pose à sec ?",
        answer:
          "Le mortier se fissure avec les variations de température et finit par se détacher. La pose à sec, avec closoir ventilé et fixation mécanique des faîtières, comme nous l'avons fait à Fontaines-sur-Saône, ventile mieux la toiture et dure plus longtemps.",
      },
    ],
    sectionOrder: ["intro", "issues", "context", "services", "realisations", "process", "faq", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // DARDILLY — angle : zinguerie, entretien, maisons avec jardin (Ouest lyonnais)
  // Aucune réalisation publiée à Dardilly : chantiers voisins uniquement
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-dardilly",
    city: "Dardilly",
    postalCode: "69570",
    primaryKeyword: "couvreur Dardilly",
    metaTitle: "Couvreur à Dardilly – Zinguerie, gouttières & toiture",
    metaDescription:
      "Couvreur à Dardilly : gouttières et zinguerie, démoussage, réparation et rénovation de toiture. Chantiers réalisés à Écully, Champagne-au-Mont-d'Or et Tassin. Devis gratuit et sans engagement.",
    h1: "Couvreur à Dardilly : toiture, gouttières et zinguerie",
    heroBadge: "Ouest lyonnais · au pied des Monts d'Or",
    heroLead:
      "Grandes parcelles, arbres et toitures à plusieurs pans : à Dardilly, l'entretien des gouttières et des raccords en zinc compte autant que l'état des tuiles.",
    intro: {
      title: "Un couvreur pour les maisons dardilloises",
      paragraphs: [
        "Dardilly s'étend au nord-ouest de Lyon, entre Écully, Limonest et Champagne-au-Mont-d'Or, aux portes des Monts d'Or. La commune associe un vieux village, des hameaux et de nombreux quartiers de maisons individuelles entourées de jardins.",
        "Jrenov est installé à Décines-Charpieu, de l'autre côté de l'agglomération, mais nous intervenons régulièrement dans l'Ouest lyonnais : plusieurs de nos chantiers publiés se trouvent dans les communes qui entourent Dardilly.",
      ],
    },
    context: {
      title: "Toitures à plusieurs pans : la zinguerie en première ligne",
      paragraphs: [
        "Plus une toiture compte de pans, de lucarnes et de jonctions, plus elle comporte de noues, de solins et d'abergements. Ces pièces de zinc canalisent l'eau aux endroits les plus sensibles ; une noue percée ou un chéneau fuyard suffit à provoquer une infiltration le long d'un mur.",
        "La végétation environnante joue aussi : feuilles et aiguilles s'accumulent dans les gouttières et au creux des noues, retiennent l'humidité et favorisent la corrosion. Un nettoyage régulier, associé à un contrôle des raccords, évite bien des réparations.",
      ],
    },
    issues: {
      title: "Ce que nous rencontrons sur les toitures de Dardilly",
      items: [
        {
          title: "Gouttière nantaise qui fuit",
          text: "Intégrée au bas de la toiture, la gouttière nantaise abîme la façade et les bois de rive lorsqu'elle se perce.",
        },
        {
          title: "Noue rouillée au creux du toit",
          text: "À la jonction de deux pans, l'eau se concentre : une noue fatiguée provoque une fuite difficile à localiser depuis l'intérieur.",
        },
        {
          title: "Mousse sur les pans ombragés",
          text: "Sous les arbres, les tuiles sèchent mal et se couvrent de mousse, qui finit par glisser dans les gouttières.",
        },
      ],
    },
    services: {
      title: "Nos prestations pour Dardilly",
      intro: "Zinguerie, entretien et couverture :",
      items: [
        {
          service: "zinguerie",
          text: "Chéneaux et gouttières façonnés sur mesure, noues en zinc, habillage alu des bandeaux et rives.",
        },
        {
          service: "demoussage",
          text: "Nettoyage des tuiles, traitement fongicide et hydrofuge, nettoyage des gouttières.",
        },
        {
          service: "couverture",
          text: "Remplacement de tuiles, réfection de faîtage, rénovation de couverture en tuiles ou ardoises.",
        },
        {
          service: "recherche-de-fuite",
          text: "Infiltration le long d'un mur ou au creux du toit : diagnostic de la zinguerie et de la couverture.",
        },
        {
          service: "fenetres-de-toit",
          text: "Pose et remplacement de fenêtres de toit avec raccords d'étanchéité en zinc.",
        },
      ],
    },
    realisations: {
      title: "Nos chantiers près de Dardilly",
      intro:
        "Aucun chantier publié n'est situé à Dardilly même. Ces réalisations ont été menées dans les communes voisines de l'Ouest lyonnais et des Monts d'Or :",
      localSlugs: [],
      nearbyTitle: "Écully, Champagne-au-Mont-d'Or, Tassin et Francheville",
      nearbySlugs: [
        "reparation-zinguerie-gouttiere-ecully",
        "renovation-toiture-tuiles-plat-champagne-au-mont-d-or",
        "demoussage-traitement-hydrofuge-tassin",
        "refection-noue-zinc-francheville",
      ],
    },
    processIntro:
      "Pour une maison de Dardilly, nous regroupons si possible la visite avec nos autres rendez-vous de l'Ouest lyonnais, puis nous vous envoyons un devis détaillé.",
    nearby: {
      title: "Communes voisines de Dardilly",
      intro: "Nous intervenons également à proximité :",
      cities: [
        { name: "Écully" },
        { name: "Champagne-au-Mont-d'Or" },
        { name: "Limonest" },
        { name: "Tassin-la-Demi-Lune" },
        { name: "Lyon", slug: "couvreur-lyon" },
        { name: "Caluire-et-Cuire", slug: "couvreur-caluire-et-cuire" },
      ],
    },
    faq: [
      {
        question: "Quelle différence entre une gouttière nantaise et une gouttière pendante ?",
        answer:
          "La gouttière nantaise repose sur le bas de la toiture, derrière un petit muret de tuiles ou de bois ; la gouttière pendante est accrochée sous le bord du toit. À Écully, nous avons remplacé des gouttières nantaises fuyardes par des chéneaux en zinc façonnés sur mesure.",
      },
      {
        question: "Comment repérer une noue qui fuit ?",
        answer:
          "Une tache d'humidité dans l'angle d'une pièce sous les toits, ou une coulure sur la charpente à la jonction de deux pans, doit faire penser à la noue. À Francheville, une noue rouillée a été remplacée par un couloir en zinc à pince.",
      },
      {
        question: "Faut-il nettoyer ses gouttières tous les ans ?",
        answer:
          "Dans un jardin arboré, un nettoyage au moins annuel, de préférence après la chute des feuilles, est recommandé. Il permet aussi de contrôler l'état des crochets et des raccords.",
      },
    ],
    sectionOrder: ["intro", "context", "issues", "services", "realisations", "faq", "process", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // VIENNE (38) — angle : ville ancienne, couvertures en tuiles, planification
  // Aucune réalisation publiée à Vienne : aucune réalisation affichée comme locale
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-vienne",
    city: "Vienne",
    postalCode: "38200",
    primaryKeyword: "couvreur Vienne",
    metaTitle: "Couvreur à Vienne (38) – Réparation & rénovation de toiture",
    metaDescription:
      `Couvreur à Vienne (Isère) : réparation de tuiles, recherche de fuite, zinguerie et rénovation de toiture. Jrenov, artisan de l'agglomération lyonnaise. Devis gratuit au ${BUSINESS.phoneDisplay}.`,
    h1: "Couvreur à Vienne : réparation et rénovation de toiture",
    heroBadge: "Vienne (38200) · vallée du Rhône",
    heroLead:
      "Ville ancienne bâtie sur les collines de la rive gauche du Rhône, Vienne compte beaucoup de toitures en tuiles qui demandent un œil attentif. Jrenov s'y déplace depuis l'Est lyonnais.",
    intro: {
      title: "Intervenir à Vienne depuis l'agglomération lyonnaise",
      paragraphs: [
        "Vienne est une sous-préfecture de l'Isère, située au bord du Rhône, au sud de Lyon. Son centre historique, connu pour ses vestiges romains comme le temple d'Auguste et de Livie ou le théâtre antique, est entouré de quartiers résidentiels qui montent sur les collines.",
        "Jrenov est basé à Décines-Charpieu et n'a pas d'agence à Vienne. Nous nous y déplaçons pour des chantiers de couverture, de zinguerie et de réparation, en planifiant la visite à l'avance pour vous proposer un rendez-vous précis.",
      ],
    },
    context: {
      title: "Toitures anciennes et secteur historique",
      paragraphs: [
        "Dans la vallée du Rhône, les toitures à faible pente couvertes de tuiles canal ou romanes sont fréquentes. Sur ces couvertures, les tuiles de courant et de couvert peuvent glisser avec le temps, et les faîtages ou rives scellés au mortier finissent par se fissurer.",
        "Une partie du centre de Vienne est concernée par des règles de protection du patrimoine. Avant tout changement d'aspect de la toiture (matériau, teinte, ouverture nouvelle), il est indispensable de se renseigner auprès du service urbanisme de la ville. Une réparation à l'identique reste généralement plus simple à engager.",
      ],
    },
    issues: {
      title: "Ce qui amène les Viennois à appeler un couvreur",
      items: [
        {
          title: "Tuiles canal qui glissent",
          text: "Sur les pentes faibles, les tuiles peu fixées se décalent et laissent passer l'eau entre deux rangs.",
        },
        {
          title: "Rives et faîtage scellés fissurés",
          text: "Le mortier vieillit, se fend et se détache par morceaux : l'eau s'infiltre en tête de mur ou au sommet du toit.",
        },
        {
          title: "Chéneaux et descentes en mauvais état",
          text: "Sur les maisons de ville, un chéneau percé déverse l'eau dans la maçonnerie et abîme les façades.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Vienne",
      intro: "Selon l'état de votre toiture :",
      items: [
        {
          service: "couverture",
          text: "Remaniement de tuiles, réfection de faîtage et de rives, rénovation de couverture en tuiles.",
        },
        {
          service: "recherche-de-fuite",
          text: "Recherche de l'origine d'une infiltration, bâchage provisoire si besoin, puis réparation.",
        },
        {
          service: "zinguerie",
          text: "Chéneaux, gouttières, descentes et abergements en zinc.",
        },
        {
          service: "demoussage",
          text: "Nettoyage des tuiles et traitement hydrofuge adapté au matériau.",
        },
        {
          service: "isolation",
          text: "Isolation des combles ou par l'extérieur lors d'une réfection de couverture.",
        },
      ],
    },
    realisations: {
      title: "Des chantiers comparables aux toitures viennoises",
      intro:
        "Nous n'avons pas encore publié de chantier à Vienne. Ces réalisations, menées dans l'agglomération lyonnaise, correspondent aux travaux que nous proposons sur les toitures en tuiles :",
      localSlugs: [],
      nearbyTitle: "Couverture et zinguerie dans la métropole",
      nearbySlugs: [
        "demoussage-traitement-hydrofuge-tassin",
        "renovation-faitage-a-sec-fontaines-sur-saone",
        "reparation-fuite-cheminee-brignais",
      ],
    },
    processIntro:
      "Pour un chantier à Vienne, nous convenons ensemble d'un créneau de visite. Le diagnostic et le devis restent gratuits, quelle que soit la distance.",
    nearby: {
      title: "Autour de Vienne",
      intro: "Nous pouvons également intervenir dans les communes proches, selon le chantier :",
      cities: [
        { name: "Pont-Évêque" },
        { name: "Chasse-sur-Rhône" },
        { name: "Saint-Romain-en-Gal" },
        { name: "Sainte-Colombe" },
        { name: "Seyssuel" },
      ],
    },
    faq: [
      {
        question: "Jrenov intervient-il vraiment jusqu'à Vienne ?",
        answer:
          `Oui. Notre siège est à Décines-Charpieu et Vienne fait partie de notre zone d'intervention dans un rayon d'environ 50 km. Appelez le ${BUSINESS.phoneDisplay} pour convenir d'une visite.`,
      },
      {
        question: "Qu'est-ce qu'un remaniement de toiture ?",
        answer:
          "C'est une intervention qui consiste à déposer puis reposer les tuiles d'une zone, en remplaçant celles qui sont cassées et en vérifiant le support. Elle convient aux couvertures dont la plupart des tuiles sont encore saines.",
      },
      {
        question: "Faut-il une autorisation pour refaire une toiture dans le centre ancien ?",
        answer:
          "Cela dépend de la localisation et de la nature des travaux. Dans un secteur protégé, un changement d'aspect est soumis à des règles particulières : renseignez-vous auprès du service urbanisme de la ville de Vienne avant de signer un devis.",
      },
    ],
    sectionOrder: ["intro", "context", "issues", "services", "process", "realisations", "faq", "nearby"],
  },

  // ──────────────────────────────────────────────────────────────
  // BOURGOIN-JALLIEU (38) — angle : pavillons, rénovation et isolation
  // Aucune réalisation publiée à Bourgoin-Jallieu : aucune réalisation affichée comme locale
  // ──────────────────────────────────────────────────────────────
  {
    slug: "couvreur-bourgoin-jallieu",
    city: "Bourgoin-Jallieu",
    postalCode: "38300",
    primaryKeyword: "couvreur Bourgoin-Jallieu",
    metaTitle: "Couvreur à Bourgoin-Jallieu – Rénovation & isolation de toit",
    metaDescription:
      "Couvreur à Bourgoin-Jallieu (Nord-Isère) : rénovation de couverture, isolation des combles, fenêtres de toit, zinguerie et recherche de fuite. Jrenov se déplace depuis l'Est lyonnais par l'A43.",
    h1: "Couvreur à Bourgoin-Jallieu : rénovation, isolation et fenêtres de toit",
    heroBadge: "Nord-Isère (38300) · accès direct par l'A43",
    heroLead:
      "Couverture de pavillon à rénover, combles mal isolés, fenêtre de toit à remplacer : Jrenov intervient à Bourgoin-Jallieu depuis Décines-Charpieu, par l'autoroute A43.",
    intro: {
      title: "Bourgoin-Jallieu, au cœur du Nord-Isère",
      paragraphs: [
        "Bourgoin-Jallieu est la principale ville du Nord-Isère, au sein de l'agglomération Porte de l'Isère, sur l'axe Lyon–Chambéry. Autour du centre-ville et de Jallieu s'étendent de nombreux quartiers pavillonnaires construits au fil des dernières décennies.",
        "Notre siège de Décines-Charpieu est situé à l'est de Lyon, du côté de l'A43 : Bourgoin-Jallieu est donc accessible directement par l'autoroute. Nous y intervenons sur rendez-vous pour des travaux de toiture complets.",
      ],
    },
    context: {
      title: "Pavillons : rénover la couverture et isoler en même temps",
      paragraphs: [
        "Beaucoup de maisons individuelles ont été couvertes de tuiles mécaniques ou de tuiles béton, souvent sans écran de sous-toiture. Après plusieurs décennies, ces couvertures montrent des tuiles poreuses, des liteaux fatigués et des combles dont l'isolant s'est tassé.",
        "Traiter la couverture et l'isolation dans un même projet évite d'intervenir deux fois. Selon l'état de la toiture, on peut souffler un nouvel isolant dans les combles perdus, ou isoler par l'extérieur si la couverture doit être refaite.",
      ],
    },
    issues: {
      title: "Les besoins fréquents à Bourgoin-Jallieu",
      items: [
        {
          title: "Combles froids l'hiver",
          text: "Une ancienne laine de verre tassée isole mal : souffler une épaisseur suffisante de laine de roche améliore nettement le confort.",
        },
        {
          title: "Fenêtre de toit qui fuit ou se bloque",
          text: "Un Velux ancien se remplace par l'extérieur, en reprenant les raccords d'étanchéité avec la couverture.",
        },
        {
          title: "Tuiles béton qui ont perdu leur protection",
          text: "Avec les années, la surface des tuiles béton devient poreuse et se couvre de mousse : un nettoyage et un hydrofuge, ou un remplacement, s'imposent.",
        },
      ],
    },
    services: {
      title: "Nos prestations à Bourgoin-Jallieu",
      intro: "Pour les maisons individuelles du Nord-Isère :",
      items: [
        {
          service: "couverture",
          text: "Rénovation complète de couverture avec pose d'un écran de sous-toiture, remplacement de tuiles et de faîtage.",
        },
        {
          service: "isolation",
          text: "Soufflage en combles perdus, isolation des combles aménagés ou par l'extérieur.",
        },
        {
          service: "fenetres-de-toit",
          text: "Remplacement de fenêtres de toit anciennes et création de nouvelles ouvertures.",
        },
        {
          service: "zinguerie",
          text: "Gouttières, descentes, noues et habillage des rives.",
        },
        {
          service: "recherche-de-fuite",
          text: "Diagnostic d'infiltration et réparation ciblée de la couverture.",
        },
        {
          service: "demoussage",
          text: "Nettoyage et traitement des tuiles mécaniques ou béton.",
        },
      ],
    },
    realisations: {
      title: "Des chantiers proches de vos besoins",
      intro:
        "Aucun chantier publié n'est situé à Bourgoin-Jallieu. Ces réalisations dans l'Est lyonnais illustrent les travaux que nous menons sur les pavillons :",
      localSlugs: [],
      nearbyTitle: "Isolation, fenêtres de toit et couverture",
      nearbySlugs: [
        "isolation-combles-perdus-laine-roche-chassieu",
        "remplacement-velux-ancien-decines",
        "renovation-toiture-garages-corbas",
      ],
    },
    processIntro:
      "À Bourgoin-Jallieu, nous fixons un rendez-vous de visite précis. Le diagnostic porte à la fois sur la couverture et, lorsque c'est possible, sur les combles et leur isolant.",
    nearby: {
      title: "Autour de Bourgoin-Jallieu",
      intro: "Nous pouvons également intervenir dans les communes voisines, selon le chantier :",
      cities: [
        { name: "L'Isle-d'Abeau" },
        { name: "Villefontaine" },
        { name: "Saint-Quentin-Fallavier" },
        { name: "Ruy-Montceau" },
        { name: "Nivolas-Vermelle" },
      ],
    },
    faq: [
      {
        question: "Vous déplacez-vous jusqu'à Bourgoin-Jallieu pour un devis ?",
        answer:
          `Oui. Bourgoin-Jallieu se trouve dans notre rayon d'intervention d'environ 50 km autour de Décines-Charpieu. La visite et le devis sont gratuits ; appelez le ${BUSINESS.phoneDisplay} pour fixer un rendez-vous.`,
      },
      {
        question: "Vaut-il mieux isoler les combles ou refaire la toiture en premier ?",
        answer:
          "Il faut d'abord s'assurer que la couverture est étanche : un isolant neuf mouillé par une fuite perd son efficacité. Si la toiture est saine, l'isolation des combles peut se faire seule ; sinon, on traite les deux ensemble.",
      },
      {
        question: "Peut-on remplacer un Velux sans abîmer l'intérieur ?",
        answer:
          "Oui, le remplacement se fait par l'extérieur. À Décines-Charpieu, nous avons ainsi posé trois fenêtres de toit neuves en une journée, sans détériorer les finitions intérieures.",
      },
    ],
    sectionOrder: ["intro", "issues", "context", "services", "realisations", "process", "faq", "nearby"],
  },
];

/**
 * Secteurs du hub /zones-intervention.
 * Secteurs où une réalisation existe, qui entourent directement le siège, ou couverts
 * par une page locale publiée (Nord-Isère et pays viennois, dans le rayon d'environ 50 km).
 * Les listes ne sont pas exhaustives.
 */
export interface ZoneSector {
  key: string;
  name: string;
  description: string;
  communes: NearbyCity[];
}

export const ZONE_SECTORS: ZoneSector[] = [
  {
    key: "est",
    name: "Décines-Charpieu & Est lyonnais",
    description:
      "Le cœur de notre activité : notre siège est à Décines-Charpieu et les communes voisines sont à quelques kilomètres.",
    communes: [
      { name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" },
      { name: "Meyzieu", slug: "couvreur-meyzieu" },
      { name: "Genas", slug: "couvreur-genas" },
      { name: "Chassieu", slug: "couvreur-chassieu" },
      { name: "Saint-Priest", slug: "couvreur-saint-priest" },
      { name: "Vaulx-en-Velin" },
      { name: "Bron" },
      { name: "Jonage", slug: "couvreur-jonage" },
      { name: "Pusignan" },
      { name: "Saint-Bonnet-de-Mure" },
      { name: "Mions" },
      { name: "Corbas" },
    ],
  },
  {
    key: "lyon",
    name: "Lyon & proche métropole",
    description:
      "Villeurbanne, les arrondissements de Lyon et les communes de première couronne, où nous intervenons sur maisons de ville comme sur immeubles.",
    communes: [
      { name: "Villeurbanne", slug: "couvreur-villeurbanne" },
      { name: "Lyon", slug: "couvreur-lyon" },
      { name: "Caluire-et-Cuire", slug: "couvreur-caluire-et-cuire" },
      { name: "Vénissieux", slug: "couvreur-venissieux" },
      { name: "Rillieux-la-Pape" },
    ],
  },
  {
    key: "nord",
    name: "Val de Saône & Monts d'Or",
    description: "Au nord de Lyon, le long de la Saône et sur les pentes des Monts d'Or.",
    communes: [{ name: "Fontaines-sur-Saône" }, { name: "Champagne-au-Mont-d'Or" }],
  },
  {
    key: "ouest",
    name: "Ouest lyonnais",
    description: "De l'autre côté de Lyon, nous avons réalisé plusieurs chantiers de couverture, de zinguerie et d'entretien.",
    communes: [
      { name: "Écully" },
      { name: "Dardilly", slug: "couvreur-dardilly" },
      { name: "Tassin-la-Demi-Lune" },
      { name: "Craponne" },
      { name: "Sainte-Foy-lès-Lyon" },
      { name: "Francheville" },
      { name: "Oullins" },
      { name: "Brignais" },
    ],
  },
  {
    key: "ain",
    name: "Côtière de l'Ain",
    description: "Au nord-est, de l'autre côté du Rhône, dans le département de l'Ain.",
    communes: [{ name: "Dagneux" }, { name: "Miribel" }, { name: "Beynost" }],
  },
  {
    key: "isere",
    name: "Nord-Isère & pays viennois",
    description:
      "Au sud-est et au sud de l'agglomération, dans notre rayon d'environ 50 km : interventions sur rendez-vous.",
    communes: [
      { name: "Bourgoin-Jallieu", slug: "couvreur-bourgoin-jallieu" },
      { name: "Vienne", slug: "couvreur-vienne" },
    ],
  },
];
