import type { ServiceKey } from "@/lib/services";

/**
 * Pages locales publiées (première vague du Lot 3).
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
      "Jrenov, artisan couvreur installé à Décines-Charpieu (69150) : réparation et rénovation de toiture, zinguerie, isolation et démoussage. Devis gratuit au 04 65 84 88 85.",
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
          "Le siège de l'entreprise est situé au 48 Ancien Chemin des Marais, 69150 Décines-Charpieu. Nous sommes joignables du lundi au samedi de 8h00 à 19h00 au 04 65 84 88 85, et un service d'urgence fuite est assuré 7j/7.",
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
        { name: "Jonage" },
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
          "Non : notre siège se trouve à Décines-Charpieu, commune limitrophe. Pour une fuite, appelez le 04 65 84 88 85.",
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
        { name: "Caluire-et-Cuire" },
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
        { name: "Caluire-et-Cuire" },
        { name: "Sainte-Foy-lès-Lyon" },
        { name: "Vénissieux" },
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
        { name: "Vénissieux" },
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
];

/**
 * Secteurs du hub /zones-intervention.
 * Uniquement des secteurs où une réalisation existe ou qui entourent directement le siège.
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
      { name: "Jonage" },
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
      { name: "Caluire-et-Cuire" },
      { name: "Vénissieux" },
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
];
