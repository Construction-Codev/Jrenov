import type { LocalArea } from "@/data/local-areas";

/** Pages complémentaires à contenu contextualisé : aucune réalisation locale inventée. */
const PROFILES = [
  {
    "slug": "couvreur-vaulx-en-velin",
    "city": "Vaulx-en-Velin",
    "focus": "Raccords et maisons de ville",
    "lead": "Pour une toiture de maison mitoyenne, nous examinons les solins au contact des murs et les évacuations avant de remplacer des tuiles.",
    "inspect": "Une auréole à proximité d'une cheminée demande de suivre l'écoulement sur le pan voisin et non seulement à la verticale de la trace.",
    "action": "Le chiffrage différencie façonnage du solin, reprises de couverture et protections d'accès.",
    "i": 0
  },
  {
    "slug": "couvreur-pusignan",
    "city": "Pusignan",
    "focus": "Rives et bas de toit",
    "lead": "Les bandeaux, sous-faces et tuiles de rive d'une maison doivent être vérifiés ensemble lorsque le bord de couverture présente des déformations.",
    "inspect": "Un habillage aluminium posé sur un bois abîmé ne constitue pas une réparation durable : il faut contrôler les extrémités de chevrons.",
    "action": "Le devis précise les longueurs à reprendre et distingue fixations, remplacement des bois et finitions.",
    "i": 1
  },
  {
    "slug": "couvreur-saint-bonnet-de-mure",
    "city": "Saint-Bonnet-de-Mure",
    "focus": "Réfection de pans et faîtages",
    "lead": "Une couverture peut présenter quelques faîtières instables sans que toutes les tuiles soient à changer.",
    "inspect": "Nous recherchons les pièces déplacées et contrôlons les liteaux proches de la jonction supérieure des pans.",
    "action": "Une réparation de faîtage se chiffre séparément d'une réfection complète, avec les accessoires réellement nécessaires.",
    "i": 2
  },
  {
    "slug": "couvreur-miribel",
    "city": "Miribel",
    "focus": "Cheminées et toiture ancienne",
    "lead": "Sur une maison ancienne, une infiltration derrière une souche peut provenir d'un défaut de maçonnerie, de zinc ou de tuiles.",
    "inspect": "Nous comparons les indices intérieurs aux points de raccord extérieurs pour identifier la zone à ouvrir.",
    "action": "Le devis détaille les pièces d'abergement, le démontage local des tuiles et les finitions compatibles.",
    "i": 3
  },
  {
    "slug": "couvreur-beynost",
    "city": "Beynost",
    "focus": "Faîtages et tuiles de bord",
    "lead": "Un défaut visible sur le faîtage ou une rive ne doit pas conduire automatiquement à refaire un pan de toit entier.",
    "inspect": "Le contrôle porte sur les fixations, le maintien des tuiles et l'état du support sous la jonction.",
    "action": "Une réparation proportionnée conserve les éléments sains et remplace seulement les accessoires fragilisés.",
    "i": 4
  },
  {
    "slug": "couvreur-dagneux",
    "city": "Dagneux",
    "focus": "Gouttières et bandeaux",
    "lead": "Une gouttière qui déborde peut détériorer l'habillage d'une façade alors que la couverture elle-même reste en bon état.",
    "inspect": "L'inspection suit le parcours des eaux depuis la naissance jusqu'à la descente, et contrôle la pente et les crochets.",
    "action": "La remise en état peut associer reprise de pente, changement d'un tronçon et réparation du bas de toit.",
    "i": 5
  },
  {
    "slug": "couvreur-pont-de-cheruy",
    "city": "Pont-de-Chéruy",
    "focus": "Raccords entre volumes",
    "lead": "Quand deux pans ou une annexe rejoignent le toit principal, les raccords doivent être étudiés avant tout remplacement de couverture.",
    "inspect": "Nous vérifions les noues, les solins contre les murs et l'état des tuiles aux jonctions.",
    "action": "Le devis distingue le défaut de raccord d'une dégradation générale du matériau de couverture.",
    "i": 6
  },
  {
    "slug": "couvreur-charvieu-chavagneux",
    "city": "Charvieu-Chavagneux",
    "focus": "Isolation et tuiles",
    "lead": "Rénover les tuiles et améliorer l'isolation des combles sont deux décisions liées, mais qui ne nécessitent pas toujours le même chantier.",
    "inspect": "Avant de proposer un isolant, nous contrôlons les traces d'humidité, la ventilation et l'état des supports.",
    "action": "Le chiffrage sépare la réfection extérieure, les travaux dans les combles et les options thermiques.",
    "i": 7
  },
  {
    "slug": "couvreur-villette-d-anthon",
    "city": "Villette-d'Anthon",
    "focus": "Entretien de couverture",
    "lead": "Une toiture présentant de la mousse doit d'abord être évaluée : des matériaux fragiles ne se traitent pas comme des tuiles encore robustes.",
    "inspect": "La visite vérifie porosité apparente, tuiles endommagées, raccords et évacuations avant toute recommandation de traitement.",
    "action": "Un entretien raisonné est proposé uniquement lorsque l'état de la couverture s'y prête.",
    "i": 8
  },
  {
    "slug": "couvreur-neuville-sur-saone",
    "city": "Neuville-sur-Saône",
    "focus": "Toiture de maison mitoyenne",
    "lead": "Pour une rénovation de maison de ville, les raccords avec les bâtiments voisins et les accès peuvent compter autant que la surface à couvrir.",
    "inspect": "Nous inspectons les souches, les murs mitoyens et les noues en organisant les protections adaptées aux lieux.",
    "action": "Le devis décrit les contraintes de livraison et d'évacuation en plus des travaux de couverture.",
    "i": 9
  },
  {
    "slug": "couvreur-fontaines-sur-saone",
    "city": "Fontaines-sur-Saône",
    "focus": "Noues et étanchéité",
    "lead": "Sur une couverture composée de plusieurs pans, une noue mal raccordée peut provoquer une infiltration éloignée du point d'entrée.",
    "inspect": "Nous examinons les recouvrements, le tracé de la noue et l'humidité éventuelle des liteaux sous-jacents.",
    "action": "Une réparation de zinc ciblée peut suffire si les tuiles environnantes conservent leur intégrité.",
    "i": 10
  },
  {
    "slug": "couvreur-champagne-au-mont-d-or",
    "city": "Champagne-au-Mont-d'Or",
    "focus": "Ardoises et finitions de couverture",
    "lead": "Une maison aux matériaux de toiture variés exige d'identifier les techniques de fixation avant de sélectionner des éléments de remplacement.",
    "inspect": "Nous observons les rives, raccords de cheminée et éventuelles lucarnes pour préparer une réfection cohérente.",
    "action": "Le devis différencie la couverture principale des finitions métalliques et de leurs supports.",
    "i": 11
  },
  {
    "slug": "couvreur-craponne",
    "city": "Craponne",
    "focus": "Faîtage et tuiles",
    "lead": "Des tuiles faîtières instables justifient un contrôle des fixations et de la ventilation avant toute reprise au mortier.",
    "inspect": "Nous examinons la ligne haute, les tuiles immédiatement inférieures et les éléments porteurs accessibles.",
    "action": "Selon l'état de l'ouvrage, le chiffrage compare réparation localisée et reprise complète du faîtage.",
    "i": 12
  },
  {
    "slug": "couvreur-chaponost",
    "city": "Chaponost",
    "focus": "Maison et dépendances",
    "lead": "Une maison et son garage peuvent avoir des pentes et des revêtements différents : le même devis doit bien séparer chaque couverture.",
    "inspect": "Nous évaluons la tenue du support, les raccords entre volumes et les dispositifs d'évacuation de chaque toit.",
    "action": "Le choix du matériau de remplacement se fait selon le bâtiment concerné, sans solution systématique.",
    "i": 13
  },
  {
    "slug": "couvreur-saint-fons",
    "city": "Saint-Fons",
    "focus": "Relevés et étanchéité",
    "lead": "Sur un bâtiment avec une partie de toit plus basse, les jonctions entre niveaux et les évacuations nécessitent un examen spécifique.",
    "inspect": "Nous vérifions les relevés, pénétrations, solins et zones de stagnation avant d'identifier l'origine de l'infiltration.",
    "action": "Une réparation peut concerner l'étanchéité d'un raccord sans imposer le remplacement de toute la toiture.",
    "i": 14
  },
  {
    "slug": "couvreur-feyzin",
    "city": "Feyzin",
    "focus": "Zinguerie des volumes",
    "lead": "Les évacuations d'eaux pluviales et les jonctions entre parties hautes et basses font partie des points à contrôler sur une toiture.",
    "inspect": "L'inspection vérifie descentes, naissances et fixations des éléments métalliques autour des pans.",
    "action": "Les prestations de couverture et de zinguerie sont distinguées pour faciliter la comparaison du devis.",
    "i": 15
  },
  {
    "slug": "couvreur-saint-laurent-de-mure",
    "city": "Saint-Laurent-de-Mure",
    "focus": "Couverture et isolation des combles",
    "lead": "Une dépose importante des tuiles peut être l'occasion d'examiner l'isolation, mais il ne faut pas engager deux chantiers sans vérifier leur nécessité.",
    "inspect": "Nous contrôlons l'état des bois, la ventilation et l'écran éventuel sous la couverture.",
    "action": "Le devis sépare réparation extérieure, amélioration thermique et ouvrages de zinguerie.",
    "i": 16
  },
  {
    "slug": "couvreur-janneyrias",
    "city": "Janneyrias",
    "focus": "Recherche de fuite autour d'un Velux",
    "lead": "Une humidité sous une fenêtre de toit peut provenir du vitrage, de la condensation ou d'un raccord mal adapté aux tuiles.",
    "inspect": "Nous recherchons des indices concordants avant de proposer un remplacement complet de la fenêtre.",
    "action": "Le chiffrage indique si la reprise concerne le raccord, quelques tuiles ou l'équipement lui-même.",
    "i": 17
  },
  {
    "slug": "couvreur-saint-maurice-de-beynost",
    "city": "Saint-Maurice-de-Beynost",
    "focus": "Solins de cheminée",
    "lead": "Une trace d'eau près d'une cheminée nécessite un examen du raccord métallique et de la maçonnerie, pas un colmatage réalisé au hasard.",
    "inspect": "Le diagnostic vérifie les tuiles en amont et l'état des bois sous la zone de jonction.",
    "action": "Un abergement repris correctement peut éviter une réfection inutile des grands pans.",
    "i": 18
  },
  {
    "slug": "couvreur-montluel",
    "city": "Montluel",
    "focus": "Tuiles anciennes et solins",
    "lead": "Lorsqu'une couverture ancienne fuit près d'un mur, la défaillance peut venir du raccord plutôt que des tuiles elles-mêmes.",
    "inspect": "Nous examinons la compatibilité des matériaux, le solin et les fixations sur le pan concerné.",
    "action": "La réparation retenue doit être chiffrée avec ses raccords et ses éventuelles reprises de support.",
    "i": 19
  },
  {
    "slug": "couvreur-givors",
    "city": "Givors",
    "focus": "Accès en ville et rénovation",
    "lead": "Un projet de toiture sur maison de ville doit prendre en compte les accès, la sécurisation et les murs voisins avant le choix des nouvelles tuiles.",
    "inspect": "Nous contrôlons les souches et raccords mitoyens en prévoyant les moyens de travail adaptés.",
    "action": "Le devis distingue protections du chantier, dépose, couverture et zinguerie.",
    "i": 20
  },
  {
    "slug": "couvreur-chasse-sur-rhone",
    "city": "Chasse-sur-Rhône",
    "focus": "Fuites et descente d'eau",
    "lead": "Une façade humide peut résulter d'un problème de chéneau ou de descente plutôt que d'une fissure dans les tuiles.",
    "inspect": "La visite recherche l'origine du ruissellement puis vérifie les jonctions et les bois proches de la zone mouillée.",
    "action": "Une petite réparation de zinguerie peut suffire si les éléments de couverture sont sains.",
    "i": 21
  },
  {
    "slug": "couvreur-la-verpilliere",
    "city": "La Verpillière",
    "focus": "Tuiles mécaniques et rives",
    "lead": "Sur une couverture en tuiles mécaniques, un bord de pan dégradé exige un contrôle de ses fixations et de l'état des liteaux.",
    "inspect": "Nous vérifions les éclats, l'emboîtement des tuiles et la continuité de la rive.",
    "action": "Le devis décrit précisément les éléments remplacés au lieu de proposer automatiquement une réfection totale.",
    "i": 22
  },
  {
    "slug": "couvreur-l-isle-d-abeau",
    "city": "L'Isle-d'Abeau",
    "focus": "Réfection et isolation",
    "lead": "Une réfection de toiture peut être coordonnée à l'amélioration de l'isolation, mais une couverture saine n'a pas besoin d'être déposée pour ce seul motif.",
    "inspect": "Nous examinons l'état des supports et le renouvellement d'air dans les combles avant de conseiller une solution.",
    "action": "Le chiffrage explique les avantages et contraintes de l'isolation intérieure ou par l'extérieur.",
    "i": 23
  },
  {
    "slug": "couvreur-cremieu",
    "city": "Crémieu",
    "focus": "Toiture ancienne et urbanisme",
    "lead": "Un projet sur une maison ancienne doit respecter les matériaux existants et les éventuelles prescriptions patrimoniales de la commune.",
    "inspect": "Nous vérifions l'état des solins, des rives et des tuiles avant de proposer la solution de réparation.",
    "action": "Tout changement d'aspect doit être examiné avec le service urbanisme avant travaux.",
    "i": 24
  },
  {
    "slug": "couvreur-trevoux",
    "city": "Trévoux",
    "focus": "Cheminée et couverture",
    "lead": "Sur une toiture ancienne, l'abergement d'une cheminée et les raccords contre les murs voisins peuvent nécessiter des reprises précises.",
    "inspect": "Nous examinons la continuité de l'étanchéité, les pièces métalliques et la compatibilité des tuiles.",
    "action": "Une intervention localisée reste préférable lorsque le support et les pans voisins sont sains.",
    "i": 25
  },
  {
    "slug": "couvreur-meximieux",
    "city": "Meximieux",
    "focus": "Tuiles cassées et supports",
    "lead": "Remplacer une tuile sans vérifier son système d'emboîtement et l'état du liteau peut laisser persister une entrée d'eau.",
    "inspect": "Nous observons les pièces voisines et les éventuelles déformations de support avant d'intervenir.",
    "action": "La réparation immédiate et les opérations d'entretien programmables figurent séparément au devis.",
    "i": 26
  },
  {
    "slug": "couvreur-villefranche-sur-saone",
    "city": "Villefranche-sur-Saône",
    "focus": "Zinguerie de maison de ville",
    "lead": "Sur une toiture mitoyenne, les solins et descentes méritent le même soin que les matériaux de couverture.",
    "inspect": "Nous vérifions les murs voisins, les accessoires et l'accès pour organiser la réparation.",
    "action": "Le devis décrit les raccords repris et les travaux de tuiles sans mélanger des postes de nature différente.",
    "i": 27
  },
  {
    "slug": "couvreur-limonest",
    "city": "Limonest",
    "focus": "Noues et toiture à plusieurs volumes",
    "lead": "Une couverture composée de plusieurs pans présente des jonctions qu'il faut examiner avant d'envisager une rénovation.",
    "inspect": "Nous inspectons les intersections, les noues et les solins pour localiser l'entrée d'eau.",
    "action": "Le devis détaille chaque raccord afin de distinguer défaut ponctuel et vieillissement général.",
    "i": 28
  },
  {
    "slug": "couvreur-lagnieu",
    "city": "Lagnieu",
    "focus": "Réfection des noues",
    "lead": "Une fuite en creux de toiture peut être liée à la noue, y compris lorsque les tuiles voisines sont encore solides.",
    "inspect": "Nous contrôlons le tracé du métal, l'appui et les recouvrements aux deux côtés du raccord.",
    "action": "La réparation de zinguerie et les éventuelles reprises de couverture sont décrites distinctement.",
    "i": 29
  }
] as const;

const featuredWork = [
  "remplacement-velux-ancien-decines",
  "habillage-bandeaux-rive-alu-meyzieu",
  "refection-solins-etancheite-lyon-5",
  "renovation-couverture-tuiles-villeurbanne",
] as const;

export const ADDITIONAL_LOCAL_AREAS: LocalArea[] = PROFILES.map((p) => {
  const details = p.focus.toLowerCase();
  const nearby = [featuredWork[p.i % featuredWork.length], featuredWork[(p.i + 1) % featuredWork.length]];
  const serviceTitles = ["couverture", "recherche-de-fuite", "zinguerie", "isolation", "demoussage", "fenetres-de-toit"] as const;

  return {
    slug: p.slug,
    city: p.city,
    postalCode: "",
    primaryKeyword: `couvreur ${p.city}`,
    metaTitle: `Couvreur à ${p.city} – ${p.focus}`,
    metaDescription: `${p.city} : ${p.focus.toLowerCase()}, réparation et rénovation de toiture, recherche de fuite, zinguerie et devis JRENOV. ${p.action}`.slice(0, 160),
    h1: `Couvreur à ${p.city} : ${p.focus.toLowerCase()}`,
    heroBadge: `Travaux de couverture et zinguerie à ${p.city}`,
    heroLead: p.lead,
    intro: {
      title: `Votre projet de toiture à ${p.city} : ${details}`,
      paragraphs: [
        `À ${p.city}, ${details} : ${p.lead}`,
        `${p.inspect} ${p.action}`,
      ],
    },
    context: {
      title: `Charpente et rénovation de toiture à ${p.city} : les vérifications utiles`,
      paragraphs: [
        `${p.inspect} Sur ce type de projet à ${p.city}, les liteaux et chevrons accessibles sont à examiner. Pour ${details}, un doute structurel impose une évaluation spécifique avant la pose.`,
        `${p.action} Dans le cas de ${details}, les matériaux, les rives et les raccords doivent être distingués, sans présumer leur état avant inspection à ${p.city}.`,
      ],
    },
    issues: {
      title: `Que faire pour ${details} à ${p.city} ?`,
      items: [
        { title: p.focus, text: p.lead },
        { title: `Identifier la cause d'une fuite à ${p.city}`, text: p.inspect },
        { title: `Choisir les réparations avant la réfection`, text: p.action },
      ],
    },
    services: {
      title: `Couverture, charpente et travaux de toiture à ${p.city}`,
      intro: `Pour ${details} à ${p.city}, les travaux sont définis selon les défauts réellement observés.`,
      items: serviceTitles.map((service, index) => ({
        service,
        text: [
          `Réparation de tuiles, réfection de faîtage ou rénovation de toiture : ${p.action}`,
          `Recherche d'une infiltration avant toute réparation de fuite : ${p.inspect}`,
          `Gouttières, solins, noues et rives : ${p.lead}`,
          `Isolation et ventilation à examiner avec la couverture : ${p.action}`,
          `Démoussage uniquement sur couverture saine : ${p.inspect}`,
          `Fenêtre de toit et raccords adaptés : ${p.lead}`,
        ][index],
      })),
    },
    realisations: {
      title: `Exemples de travaux de couverture réalisés par JRENOV`,
      intro: `Pour ${details}, ces réalisations JRENOV dans d'autres communes illustrent le travail de couverture et de zinguerie.`,
      localSlugs: [],
      nearbyTitle: `Nos réalisations à découvrir`,
      nearbySlugs: nearby,
    },
    processIntro: `${p.action} La visite à ${p.city} permet de confirmer l'accès avant chiffrage.`,
    nearby: {
      title: `Nos interventions dans le secteur de ${p.city}`,
      intro: `Retrouvez le détail des zones desservies et des prestations de couverture de JRENOV.`,
      cities: [{ name: "Décines-Charpieu", slug: "couvreur-decines-charpieu" }],
    },
    faq: [
      {
        question: `Pour ${details} à ${p.city}, une réparation ponctuelle peut-elle suffire ?`,
        answer: `${p.inspect} Il faut confirmer la tenue des tuiles voisines.`,
      },
      {
        question: `Charpente à ${p.city} : quel contrôle avant de traiter ${details} ?`,
        answer: `${p.action} Pour ${details}, il faut aussi examiner les bois accessibles, leurs appuis et les traces d'humidité avant de retenir la nouvelle couverture.`,
      },
      {
        question: `Quels postes chiffrer à ${p.city} pour ${details} ?`,
        answer: `${p.action} Un devis pour ${details} détaille zones, matériaux et protections, afin de comparer les solutions à ${p.city}.`,
      },
      {
        question: `Pour ${details} à ${p.city}, faut-il remplacer toutes les tuiles ?`,
        answer: `${p.lead} La tenue des matériaux voisins détermine l'étendue des travaux.`,
      },
      {
        question: `Gouttières et ${details} à ${p.city} : que vérifier ensemble ?`,
        answer: `${p.inspect} Sur un projet de ${details}, les gouttières et noues ne sont reprises que si le diagnostic le justifie.`,
      },
      {
        question: `Quel diagnostic demander pour ${details} à ${p.city} ?`,
        answer: `${p.action} Précisez les matériaux et symptômes de ${details}. Des photos prises depuis un endroit sûr facilitent la préparation à ${p.city}.`,
      },
    ],
    sectionOrder: ["intro", "issues", "context", "services", "realisations", "faq", "process", "nearby"],
  };
});
