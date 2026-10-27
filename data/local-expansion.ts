import type { LocalArea } from "./local-areas";
import type { ServiceKey } from "@/lib/services";

/**
 * Extensions géographiques éditorialisées :
 * - chaque contexte, problème, description de service et réponse FAQ est propre à la ville ;
 * - `localSlugs` désigne exclusivement des réalisations documentées DANS la commune ;
 * - pour les villes sans chantier, seules des réalisations de communes voisines sont présentées ;
 * - aucun établissement, avis, chantier, statistique de demande ni urgence garantie ne sont inventés.
 *
 * Les villes ciblées se situent dans le rayon de service annoncé (environ 50 km de Décines).
 * Relecture éditoriale et confirmation de couverture réelle avant publication.
 */

type Issue = LocalArea["issues"]["items"][number];
type Faq = LocalArea["faq"][number];
type ServiceCopy = { service: ServiceKey; text: string };

type CitySpec = {
  slug: string;
  city: string;
  postalCode: string;
  keyword: string;
  headline: string;
  angle: string;
  lead: string;
  introTitle: string;
  intro: [string, string];
  contextTitle: string;
  context: [string, string];
  issuesTitle: string;
  issues: [Issue, Issue, Issue];
  serviceTitle: string;
  serviceIntro: string;
  serviceCopy: ServiceCopy[];
  localSlugs: string[];
  nearbySlugs: string[];
  nearbyCities: string[];
  proof: string;
  process: string;
  faq: [Faq, Faq];
};

const LINKABLE_CITIES: Record<string, string> = {
  "Décines-Charpieu": "couvreur-decines-charpieu",
  Meyzieu: "couvreur-meyzieu",
  Villeurbanne: "couvreur-villeurbanne",
  Lyon: "couvreur-lyon",
  Genas: "couvreur-genas",
  Chassieu: "couvreur-chassieu",
  "Saint-Priest": "couvreur-saint-priest",
  Bron: "couvreur-bron",
  "Vaulx-en-Velin": "couvreur-vaulx-en-velin",
  "Rillieux-la-Pape": "couvreur-rillieux-la-pape",
  Vénissieux: "couvreur-venissieux",
  "Caluire-et-Cuire": "couvreur-caluire-et-cuire",
  Écully: "couvreur-ecully",
  "Tassin-la-Demi-Lune": "couvreur-tassin-la-demi-lune",
  Mions: "couvreur-mions",
  Corbas: "couvreur-corbas",
  Miribel: "couvreur-miribel",
  Beynost: "couvreur-beynost",
  Jonage: "couvreur-jonage",
  "Saint-Bonnet-de-Mure": "couvreur-saint-bonnet-de-mure",
  "Saint-Fons": "couvreur-saint-fons",
  "Sainte-Foy-lès-Lyon": "couvreur-sainte-foy-les-lyon",
  Francheville: "couvreur-francheville",
  Dardilly: "couvreur-dardilly",
  "Saint-Laurent-de-Mure": "couvreur-saint-laurent-de-mure",
};

function buildCityPage(input: CitySpec): LocalArea {
  const localProof = input.localSlugs.length > 0;
  return {
    slug: input.slug,
    city: input.city,
    postalCode: input.postalCode,
    primaryKeyword: input.keyword,
    metaTitle: input.headline,
    metaDescription: `${input.keyword} : ${input.angle} Jrenov intervient depuis Décines-Charpieu. Devis gratuit, sans engagement.`,
    h1: input.headline,
    heroBadge: `Zone desservie depuis Décines-Charpieu · ${input.postalCode}`,
    heroLead: input.lead,
    intro: { title: input.introTitle, paragraphs: input.intro },
    context: { title: input.contextTitle, paragraphs: input.context },
    issues: { title: input.issuesTitle, items: input.issues },
    services: { title: input.serviceTitle, intro: input.serviceIntro, items: input.serviceCopy },
    realisations: {
      title: localProof ? `Un chantier documenté à ${input.city}` : "Des chantiers documentés dans le secteur",
      intro: input.proof,
      localSlugs: input.localSlugs,
      nearbyTitle: localProof ? "Autres réalisations dans les communes voisines" : "Réalisations dans d'autres communes",
      nearbySlugs: input.nearbySlugs,
    },
    processIntro: input.process,
    nearby: {
      title: `Communes autour de ${input.city}`,
      intro: "Notre siège reste à Décines-Charpieu : ces communes voisines sont également couvertes par nos pages d'information, selon la nature du chantier.",
      cities: input.nearbyCities.map((name) => ({ name, ...(LINKABLE_CITIES[name] ? { slug: LINKABLE_CITIES[name] } : {}) })),
    },
    faq: input.faq,
    sectionOrder: localProof
      ? ["intro","realisations","context","issues","services","faq","process","nearby"]
      : ["intro","issues","context","services","realisations","faq","nearby","process"],
  };
}

// CITY_ENTRIES_START
export const EXPANSION_LOCAL_AREAS: LocalArea[] = [
  buildCityPage({
  "slug": "couvreur-bron",
  "city": "Bron",
  "postalCode": "69500",
  "keyword": "Couvreur à Bron",
  "headline": "Couvreur à Bron : réparation de toiture et zinguerie",
  "angle": "réparation de tuiles, diagnostic de fuite, gouttières et rénovation de toiture.",
  "lead": "Pour une tuile cassée, une infiltration autour d'une cheminée ou une couverture vieillissante à Bron, Jrenov propose un diagnostic de toiture depuis son siège à Décines-Charpieu.",
  "introTitle": "Une intervention toiture adaptée au tissu de Bron",
  "intro": [
    "Entre Lyon, Saint-Priest et Chassieu, Bron rassemble des maisons individuelles, des pavillons et des ensembles résidentiels. Un toit incliné en tuiles et une toiture d'immeuble ne se contrôlent pas de la même façon : le type de couverture et les accès déterminent la solution.",
    "Jrenov n'a pas de bureau à Bron : l'entreprise est établie à Décines-Charpieu. Votre adresse, une description des dégâts et, si possible, des photographies prises depuis le sol permettent de préparer le premier échange."
  ],
  "contextTitle": "Les points d'étanchéité à vérifier à Bron",
  "context": [
    "Sur les toits en tuiles, les solins contre mur, les raccords de cheminée et les rives doivent être examinés lorsqu'une tache apparaît sous les combles. Une fuite peut se déclarer loin de son point d'entrée apparent.",
    "Pour les propriétaires de maisons proches des Essarts ou de Parilly, un diagnostic évite de confondre remplacement ponctuel de tuiles, réparation des ouvrages de zinguerie et réfection de pan complet."
  ],
  "issuesTitle": "Trois situations qui méritent un diagnostic",
  "issues": [
    {
      "title": "Tuiles fendues ou glissées",
      "text": "Après des rafales, les défauts visibles depuis la rue peuvent justifier une intervention localisée ; il ne faut pas monter soi-même sur la toiture."
    },
    {
      "title": "Infiltration autour d'une cheminée",
      "text": "Le solin, l'abergement et la jonction entre le conduit et les tuiles nécessitent une inspection avant de choisir la réparation."
    },
    {
      "title": "Gouttière qui déborde",
      "text": "L'accumulation d'eau sur une façade peut provenir d'une obstruction, d'une pente défectueuse ou d'une descente à reprendre."
    }
  ],
  "serviceTitle": "Nos services de couverture à Bron",
  "serviceIntro": "Chaque prestation fait l'objet d'une page technique détaillée, consultable avant une demande de devis.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Localisation des entrées d'eau près des ouvertures, des cheminées et des raccords de couverture."
    },
    {
      "service": "couverture",
      "text": "Remplacement ciblé de tuiles ou étude d'une rénovation lorsque plusieurs pans sont dégradés."
    },
    {
      "service": "zinguerie",
      "text": "Réparation des solins, gouttières, descentes et habillages de rive."
    },
    {
      "service": "demoussage",
      "text": "Inspection et nettoyage raisonné lorsque mousses et dépôts empêchent l'écoulement de l'eau."
    },
    {
      "service": "isolation",
      "text": "Étude d'une isolation de toiture lorsque le chantier inclut une réfection importante."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "renovation-couverture-tuiles-villeurbanne",
    "isolation-combles-perdus-laine-roche-chassieu",
    "traitement-charpente-bois-saint-priest"
  ],
  "nearbyCities": [
    "Saint-Priest",
    "Chassieu",
    "Villeurbanne",
    "Vénissieux"
  ],
  "proof": "Nous ne présentons pas de chantier à Bron sans preuve. Ces interventions documentées à Villeurbanne, Chassieu et Saint-Priest illustrent les différents travaux réalisés dans la métropole.",
  "process": "Indiquez la commune, le type de couverture si vous le connaissez et les symptômes observés : le diagnostic permettra de distinguer réparation simple et reprise plus importante.",
  "faq": [
    {
      "question": "Jrenov possède-t-il une agence à Bron ?",
      "answer": "Non. Son siège est à Décines-Charpieu ; les demandes de Bron sont étudiées depuis cette adresse."
    },
    {
      "question": "Faut-il connaître la surface du toit pour demander un devis ?",
      "answer": "Non. Le type de problème et l'adresse suffisent pour un premier échange ; la surface et l'accès pourront être vérifiés lors du diagnostic."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-vaulx-en-velin",
  "city": "Vaulx-en-Velin",
  "postalCode": "69120",
  "keyword": "Couvreur à Vaulx-en-Velin",
  "headline": "Couvreur à Vaulx-en-Velin : fuites, tuiles et toiture",
  "angle": "recherche de fuite, reprise de couverture, zinguerie et entretien de toiture.",
  "lead": "À Vaulx-en-Velin, une infiltration sur une maison ou un raccord de toiture défaillant demande d'abord de comprendre où l'eau passe. Jrenov intervient depuis Décines-Charpieu pour établir une solution adaptée.",
  "introTitle": "Des toitures différentes entre le Village et les quartiers résidentiels",
  "intro": [
    "Vaulx-en-Velin présente aussi bien des maisons à couverture inclinée que des bâtiments collectifs. La présence d'une auréole au plafond ne dit pas à elle seule si la panne vient d'une tuile, d'un solin ou de l'évacuation des eaux pluviales.",
    "Pour une intervention sur une copropriété, il faut identifier l'interlocuteur autorisé à commander les travaux. Pour une maison, le propriétaire peut transmettre directement les symptômes, la commune et les contraintes d'accès."
  ],
  "contextTitle": "Du diagnostic de fuite à la réparation",
  "context": [
    "Une étanchéité de cheminée fissurée, une noue encombrée ou des tuiles glissées peuvent provoquer des infiltrations similaires. Avant d'envisager une réfection générale, une recherche de l'origine du problème limite les remplacements inutiles.",
    "Dans les secteurs de Vaulx Village et de La Soie, l'environnement du bâtiment et les accès au toit doivent être évalués individuellement. Jrenov ne revendique ni adresse ni chantier à Vaulx-en-Velin sans justificatif."
  ],
  "issuesTitle": "Les questions les plus fréquentes avant travaux",
  "issues": [
    {
      "title": "Fuite après la pluie",
      "text": "Le chemin de l'eau peut suivre la charpente ; la zone humide dans la pièce n'indique pas toujours la tuile responsable."
    },
    {
      "title": "Faîtage ou rives détériorés",
      "text": "Les jonctions en partie haute et en bordure de toiture méritent un contrôle des fixations et raccords."
    },
    {
      "title": "Évacuation des eaux insuffisante",
      "text": "Gouttières, descentes et chéneaux doivent être examinés avant de remplacer des éléments de couverture."
    }
  ],
  "serviceTitle": "Interventions de toiture proposées à Vaulx-en-Velin",
  "serviceIntro": "Les pages techniques précisent les méthodes selon le matériau et l'état de la couverture.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Identification de l'origine des infiltrations avant réparation de l'élément responsable."
    },
    {
      "service": "couverture",
      "text": "Réparation de tuiles et réfection de couverture selon l'étendue des désordres."
    },
    {
      "service": "zinguerie",
      "text": "Contrôle des noues, gouttières et raccords à la cheminée ou aux murs."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Reprise des raccords ou remplacement d'une fenêtre de toit lorsque son étanchéité est en cause."
    },
    {
      "service": "demoussage",
      "text": "Nettoyage adapté au matériau après vérification de son état, sans promettre qu'un nettoyage résout une fuite."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "renovation-couverture-tuiles-villeurbanne",
    "habillage-bandeaux-rive-alu-meyzieu",
    "remplacement-velux-ancien-decines"
  ],
  "nearbyCities": [
    "Villeurbanne",
    "Décines-Charpieu",
    "Meyzieu",
    "Bron"
  ],
  "proof": "Jrenov ne dispose pas ici de réalisation locale vérifiée dans sa photothèque. Les réalisations ci-dessous ont été documentées à Villeurbanne, Meyzieu et Décines-Charpieu.",
  "process": "La localisation du bien, la nature du problème et la situation éventuelle de copropriété doivent être précisées avant de proposer un rendez-vous adapté.",
  "faq": [
    {
      "question": "Jrenov a-t-il déjà réalisé un chantier à Vaulx-en-Velin ?",
      "answer": "Aucune réalisation locale n'est actuellement documentée sur ce site. Les chantiers affichés ici se situent dans des communes voisines."
    },
    {
      "question": "Peut-on demander un devis pour un immeuble ?",
      "answer": "Une demande peut être étudiée, mais le périmètre, les accès et l'autorisation du propriétaire ou du syndic doivent être clarifiés avant les travaux."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-rillieux-la-pape",
  "city": "Rillieux-la-Pape",
  "postalCode": "69140",
  "keyword": "Couvreur à Rillieux-la-Pape",
  "headline": "Couvreur à Rillieux-la-Pape : toiture et zinguerie",
  "angle": "diagnostic de fuite, réparation des tuiles, faîtage et zinguerie.",
  "lead": "Pour une toiture en tuiles, des gouttières endommagées ou une fuite à Rillieux-la-Pape, Jrenov étudie votre demande depuis Décines-Charpieu, en tenant compte de l'accès et du type de bâtiment.",
  "introTitle": "Entre Vancia et les quartiers résidentiels de Rillieux",
  "intro": [
    "L'agglomération de Rillieux-la-Pape rassemble notamment des pavillons et de l'habitat collectif. Une maison avec faîtage scellé au mortier n'a pas les mêmes points sensibles qu'une couverture d'immeuble comportant plusieurs évacuations.",
    "La commune se situe sur la frange nord de la métropole de Lyon. Jrenov peut recevoir une demande pour cette zone, sans se présenter comme une entreprise domiciliée à Rillieux ni s'attribuer des chantiers non documentés."
  ],
  "contextTitle": "Quels raccords de toiture contrôler ?",
  "context": [
    "L'étanchéité des rives et des abergements exige une vérification attentive lorsqu'une infiltration se produit après une pluie battante. Une simple trace intérieure ne permet pas de conclure au remplacement de toute la couverture.",
    "La réfection d'un faîtage peut parfois être ciblée : un chantier réel à Fontaines-sur-Saône illustre la pose d'un closoir ventilé en remplacement d'un ancien scellement au mortier."
  ],
  "issuesTitle": "Problèmes pour lesquels nous pouvons établir un diagnostic",
  "issues": [
    {
      "title": "Faîtage dégradé",
      "text": "Faîtières descellées ou mortier fissuré : il faut contrôler le support et la ventilation avant une reprise."
    },
    {
      "title": "Tuiles déplacées",
      "text": "Une tuile glissée peut exposer l'écran de sous-toiture et nécessiter une remise en place ou un remplacement."
    },
    {
      "title": "Gouttière percée",
      "text": "Une fuite près de l'égout du toit peut endommager les façades et les bois de rive."
    }
  ],
  "serviceTitle": "Couverture et réparation autour de Rillieux-la-Pape",
  "serviceIntro": "Les services les plus pertinents dépendent du type de toiture et de la cause exacte du désordre.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Réfection de faîtage, remplacement de tuiles et étude de rénovation de pans usés."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Recherche de défauts sur les liaisons entre les éléments de couverture."
    },
    {
      "service": "zinguerie",
      "text": "Révision de gouttières, noues, habillages et raccordements de cheminée."
    },
    {
      "service": "isolation",
      "text": "Isolation de toiture à étudier lorsque les travaux impliquent une dépose de couverture."
    },
    {
      "service": "demoussage",
      "text": "Contrôle de l'état des tuiles avant toute prestation d'entretien."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "renovation-faitage-a-sec-fontaines-sur-saone",
    "isolation-sarking-toiture-caluire",
    "renovation-couverture-tuiles-villeurbanne"
  ],
  "nearbyCities": [
    "Caluire-et-Cuire",
    "Villeurbanne",
    "Lyon"
  ],
  "proof": "Ces chantiers se trouvent à Fontaines-sur-Saône, Caluire-et-Cuire et Villeurbanne. Ils sont présentés comme des exemples voisins, et non comme des réalisations à Rillieux-la-Pape.",
  "process": "Une photographie prise depuis le jardin peut aider à situer un faîtage fissuré, mais aucun diagnostic sûr ne se fait uniquement à distance.",
  "faq": [
    {
      "question": "Faites-vous des réparations de faîtage près de Rillieux ?",
      "answer": "Ce type de travaux fait partie des prestations de couverture proposées. Un contrôle du mortier, des supports et des tuiles permet de chiffrer la bonne solution."
    },
    {
      "question": "Une infiltration au plafond impose-t-elle une toiture neuve ?",
      "answer": "Pas nécessairement. Selon sa cause, une intervention sur un solin, une tuile ou un raccord peut suffire ; la décision dépend du diagnostic."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-venissieux",
  "city": "Vénissieux",
  "postalCode": "69200",
  "keyword": "Couvreur à Vénissieux",
  "headline": "Couvreur à Vénissieux : urgence toiture et rénovation",
  "angle": "réparation après orage, remplacement de tuiles, zinguerie et couverture.",
  "lead": "Jrenov présente un chantier de remise hors d'eau réalisé à Vénissieux après intempéries. Pour une infiltration actuelle ou des tuiles endommagées, l'entreprise peut étudier une réparation depuis Décines-Charpieu.",
  "introTitle": "Une intervention déjà documentée à Vénissieux",
  "intro": [
    "La page s'appuie sur une réalisation enregistrée en juin 2026 : après un orage de grêle, un bâtiment professionnel a nécessité un bâchage puis le remplacement de tuiles et la consolidation de certaines fixations.",
    "Cette intervention prouve une expérience locale précise, pas un délai d'urgence garanti sur chaque demande. Pour votre propre toiture, l'accessibilité et l'importance des dommages doivent être évaluées avant d'annoncer une méthode ou un calendrier."
  ],
  "contextTitle": "Bâcher, réparer puis sécuriser les raccords",
  "context": [
    "Après un épisode de grêle ou de fortes rafales, des tuiles peuvent être fissurées sans être tombées. Une inspection permet d'identifier les zones exposées et les fixations qui nécessitent une reprise.",
    "Les bâtiments de Vénissieux présentent différents matériaux et hauteurs ; la protection temporaire, la sécurité du chantier et la solution définitive se décident selon l'ouvrage."
  ],
  "issuesTitle": "Après des intempéries, que vérifier ?",
  "issues": [
    {
      "title": "Tuiles brisées ou déplacées",
      "text": "Une casse localisée nécessite de contrôler les tuiles voisines et leurs fixations."
    },
    {
      "title": "Eau qui pénètre dans les locaux",
      "text": "Lorsque la fuite est active, la mise hors d'eau et la sécurité des occupants sont prioritaires."
    },
    {
      "title": "Faîtage fragilisé",
      "text": "Le maintien mécanique et les raccords doivent être inspectés après un sinistre de toiture."
    }
  ],
  "serviceTitle": "Services de toiture à Vénissieux",
  "serviceIntro": "Le chantier publié illustre la réparation d'urgence ; les autres prestations sont étudiées sur devis.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Analyse de l'entrée d'eau et mise en sécurité si l'état de la toiture l'exige."
    },
    {
      "service": "couverture",
      "text": "Remplacement de tuiles détériorées et reprise de faîtage selon constat sur place."
    },
    {
      "service": "zinguerie",
      "text": "Réparation des raccords métalliques pouvant également provoquer des infiltrations."
    },
    {
      "service": "demoussage",
      "text": "Entretien d'une toiture après vérification de l'état des matériaux."
    },
    {
      "service": "isolation",
      "text": "Étude du complexe isolant si un chantier de rénovation plus large est nécessaire."
    }
  ],
  "localSlugs": [
    "remplacement-tuiles-cassees-orage-venissieux"
  ],
  "nearbySlugs": [
    "renovation-toiture-garages-corbas",
    "traitement-charpente-bois-saint-priest"
  ],
  "nearbyCities": [
    "Saint-Fons",
    "Corbas",
    "Saint-Priest",
    "Bron"
  ],
  "proof": "Cette réalisation est attribuée à Vénissieux dans les données de chantier de Jrenov : intervention après grêle, bâchage et remplacement de tuiles.",
  "process": "Pour une demande après intempéries, indiquez si l'eau pénètre actuellement et si le bâtiment est habité ou exploité ; ne tentez pas de marcher sur le toit.",
  "faq": [
    {
      "question": "Avez-vous déjà effectué une intervention après grêle à Vénissieux ?",
      "answer": "Oui. Une réalisation datée de juin 2026 figure sur le site avec les étapes de mise hors d'eau et de réparation."
    },
    {
      "question": "Peut-on réparer seulement les tuiles cassées ?",
      "answer": "Cela dépend de l'état de la couverture, du support et du nombre de zones touchées. Le diagnostic permet d'évaluer la réparation pertinente."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-caluire-et-cuire",
  "city": "Caluire-et-Cuire",
  "postalCode": "69300",
  "keyword": "Couvreur à Caluire-et-Cuire",
  "headline": "Couvreur à Caluire-et-Cuire : isolation et couverture",
  "angle": "isolation de toiture par l'extérieur, réfection de tuiles et étanchéité.",
  "lead": "À Caluire-et-Cuire, Jrenov a documenté un chantier d'isolation de toiture par l'extérieur. L'entreprise peut également étudier les réparations de fuites, reprises de couverture et travaux de zinguerie.",
  "introTitle": "Un chantier d'isolation extérieure déjà réalisé à Caluire",
  "intro": [
    "La réalisation publiée en mars 2026 décrit une dépose de couverture suivie de la pose de panneaux isolants en fibre de bois, puis d'une nouvelle couverture. Ce type de chantier demande de coordonner isolation, étanchéité et ventilation.",
    "Caluire-et-Cuire comprend maisons individuelles et immeubles. Avant de proposer un sarking, il faut vérifier les caractéristiques du toit, les contraintes d'urbanisme applicables et les possibilités techniques."
  ],
  "contextTitle": "Quand associer isolation et réfection de toiture ?",
  "context": [
    "Lorsqu'une toiture doit être déposée pour être rénovée, la question de l'isolation extérieure peut se poser. Elle ne constitue pas pour autant une solution systématique : hauteur disponible, supports et configuration du bâtiment jouent un rôle essentiel.",
    "Pour une fuite ponctuelle sur un toit globalement sain, une recherche de l'origine du désordre est généralement la première étape ; une rénovation énergétique complète doit être justifiée."
  ],
  "issuesTitle": "Trois sujets à examiner sur une toiture",
  "issues": [
    {
      "title": "Confort sous toiture",
      "text": "Des combles inconfortables peuvent conduire à comparer isolation intérieure et extérieure."
    },
    {
      "title": "Raccords autour des fenêtres de toit",
      "text": "Un Velux ancien ou son raccord peut créer un défaut d'étanchéité indépendant de l'isolant."
    },
    {
      "title": "Couverture vieillissante",
      "text": "L'état des tuiles, des liteaux et des points singuliers influence la faisabilité d'une rénovation."
    }
  ],
  "serviceTitle": "Travaux proposés à Caluire-et-Cuire",
  "serviceIntro": "Les méthodes techniques sont décrites sur les pages services ; le devis doit préciser l'ouvrage réellement concerné.",
  "serviceCopy": [
    {
      "service": "isolation",
      "text": "Étude de l'isolation par l'extérieur de type sarking ou d'une autre solution adaptée aux combles."
    },
    {
      "service": "couverture",
      "text": "Dépose, réparation ou remplacement des tuiles et réfection des rives lorsque nécessaire."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic avant d'engager une dépose importante en cas d'infiltration localisée."
    },
    {
      "service": "zinguerie",
      "text": "Réfection de solins, gouttières et raccords métalliques au pied des ouvrages."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Étude du remplacement de fenêtres de toit et de leurs raccordements d'étanchéité."
    }
  ],
  "localSlugs": [
    "isolation-sarking-toiture-caluire"
  ],
  "nearbySlugs": [
    "renovation-faitage-a-sec-fontaines-sur-saone",
    "renovation-couverture-tuiles-villeurbanne"
  ],
  "nearbyCities": [
    "Rillieux-la-Pape",
    "Lyon",
    "Villeurbanne"
  ],
  "proof": "La réalisation de Caluire-et-Cuire, datée de mars 2026, décrit une isolation thermique par l'extérieur avec repose de couverture.",
  "process": "Avant toute étude d'isolation, rassemblez les informations disponibles sur les combles et la couverture ; un diagnostic précis est nécessaire.",
  "faq": [
    {
      "question": "Jrenov a-t-il déjà réalisé un sarking à Caluire-et-Cuire ?",
      "answer": "Une fiche chantier dédiée décrit une isolation extérieure en fibre de bois et la repose de la couverture, datées de mars 2026."
    },
    {
      "question": "Peut-on isoler sans refaire toute la toiture ?",
      "answer": "Selon les combles et le support, une isolation intérieure peut être envisagée. Le choix demande une étude adaptée au bâtiment."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-ecully",
  "city": "Écully",
  "postalCode": "69130",
  "keyword": "Couvreur à Écully",
  "headline": "Couvreur à Écully : gouttières et rénovation de toit",
  "angle": "gouttières zinc, zinguerie sur mesure, étanchéité et couverture.",
  "lead": "Jrenov dispose d'une réalisation de zinguerie documentée à Écully : réfection des gouttières et habillage des sous-faces. Vous pouvez également solliciter un diagnostic de fuite ou une étude de toiture.",
  "introTitle": "Un chantier de zinguerie à Écully comme référence",
  "intro": [
    "Une intervention de février 2026 est décrite sur le site : remplacement de gouttières défectueuses, façonnage en zinc et habillage des bandeaux exposés. Ce chantier rappelle que les infiltrations se développent parfois en bordure de toiture.",
    "Les maisons d'Écully comportent des couvertures et des débords de toit de configurations variées. Pour une fuite de gouttière ou un bois de rive dégradé, il faut examiner l'état du support avant de proposer un simple habillage."
  ],
  "contextTitle": "Protéger le bas de toit et les façades",
  "context": [
    "Une gouttière percée ne se résume pas à une nuisance sonore : le ruissellement peut salir la façade ou humidifier les boiseries. Selon l'état, une réparation ponctuelle ou un remplacement du linéaire peut être envisagé.",
    "Le zinc façonné et l'aluminium d'habillage ne répondent pas au même usage. Un devis doit préciser les sections, les raccordements, les fixations et les éléments éventuellement remplacés."
  ],
  "issuesTitle": "Zinguerie : les points à surveiller",
  "issues": [
    {
      "title": "Gouttière fuyarde",
      "text": "Les raccords, crochets et pentes sont contrôlés avant un remplacement."
    },
    {
      "title": "Bois de rive détérioré",
      "text": "Un habillage neuf ne doit pas masquer des planches pourries ou désolidarisées."
    },
    {
      "title": "Infiltration près du mur",
      "text": "Les solins et jonctions de toiture peuvent être à l'origine du problème et nécessitent un diagnostic."
    }
  ],
  "serviceTitle": "Nos prestations à Écully",
  "serviceIntro": "Le chantier local de gouttières est documenté ; ces autres interventions sont proposées selon l'état du bâtiment.",
  "serviceCopy": [
    {
      "service": "zinguerie",
      "text": "Gouttières en zinc, reprises de chéneaux et habillages de sous-faces ou de bandeaux."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic d'infiltrations au droit des murs, des rives et des évacuations pluviales."
    },
    {
      "service": "couverture",
      "text": "Réparation ou rénovation des tuiles et des ouvrages de couverture."
    },
    {
      "service": "demoussage",
      "text": "Entretien de toiture, avec attention portée aux évacuations d'eau."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Contrôle ou remplacement de fenêtres et de leurs raccordements si nécessaire."
    }
  ],
  "localSlugs": [
    "reparation-zinguerie-gouttiere-ecully"
  ],
  "nearbySlugs": [
    "demoussage-traitement-hydrofuge-tassin",
    "renovation-toiture-tuiles-plat-champagne-au-mont-d-or"
  ],
  "nearbyCities": [
    "Tassin-la-Demi-Lune",
    "Dardilly",
    "Lyon"
  ],
  "proof": "La fiche chantier à Écully décrit des gouttières refaites en zinc et un habillage d'aluminium, en février 2026.",
  "process": "Pour une gouttière, des photos du linéaire depuis le sol et les dimensions approximatives aident à préparer la visite, sans remplacer le métrage sur place.",
  "faq": [
    {
      "question": "Avez-vous une réalisation de gouttières à Écully ?",
      "answer": "Oui, une intervention de février 2026 est décrite avec le remplacement de gouttières et l'habillage de bandeaux."
    },
    {
      "question": "Une gouttière percée doit-elle être intégralement remplacée ?",
      "answer": "Tout dépend de son matériau, de son état et de la localisation des défauts. Le diagnostic permet de comparer réparation et remplacement."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-tassin-la-demi-lune",
  "city": "Tassin-la-Demi-Lune",
  "postalCode": "69160",
  "keyword": "Couvreur à Tassin-la-Demi-Lune",
  "headline": "Couvreur à Tassin-la-Demi-Lune : entretien et toiture",
  "angle": "démoussage, traitement hydrofuge, réparation de couverture et zinguerie.",
  "lead": "Une réalisation de nettoyage et traitement de toiture est documentée à Tassin-la-Demi-Lune. Jrenov étudie aussi les demandes de réparation de fuite et de rénovation de couverture dans ce secteur de l'ouest lyonnais.",
  "introTitle": "Entretien de couverture : un chantier déjà présenté à Tassin",
  "intro": [
    "Le site présente une intervention de février 2026 sur des tuiles envahies par les mousses et lichens, avec nettoyage et traitement hydrofuge. Les traitements ne conviennent pas indistinctement à toutes les tuiles : l'état du matériau doit d'abord être vérifié.",
    "À Tassin-la-Demi-Lune, la présence de maisons et de jardins justifie une attention particulière aux débris végétaux qui peuvent s'accumuler dans les gouttières. Cela ne suffit pas à conclure qu'une toiture nécessite systématiquement un hydrofuge."
  ],
  "contextTitle": "Nettoyer, réparer ou remplacer ?",
  "context": [
    "Le nettoyage peut améliorer l'écoulement de l'eau mais ne répare ni une tuile fissurée ni un solin décollé. Lorsque des traces d'humidité sont présentes, l'étanchéité doit être diagnostiquée avant de choisir un traitement de surface.",
    "Pour une couverture saine mais encrassée, le choix de la méthode de nettoyage doit tenir compte de la porosité des tuiles, de leur âge et des recommandations du fabricant."
  ],
  "issuesTitle": "Entretenir sa couverture sans l'endommager",
  "issues": [
    {
      "title": "Mousses et lichens",
      "text": "Un nettoyage inadapté ou trop agressif peut fragiliser les matériaux : la technique dépend de l'état des tuiles."
    },
    {
      "title": "Gouttières encombrées",
      "text": "Un débordement au droit des arbres peut nécessiter un nettoyage des évacuations."
    },
    {
      "title": "Tuiles poreuses ou fissurées",
      "text": "Un traitement hydrofuge ne remplace pas la réparation des éléments qui ne sont plus étanches."
    }
  ],
  "serviceTitle": "Prestations à Tassin-la-Demi-Lune",
  "serviceIntro": "Entretien, zinguerie et couverture sont étudiés en fonction d'un diagnostic et non d'une formule unique.",
  "serviceCopy": [
    {
      "service": "demoussage",
      "text": "Nettoyage et traitement de couverture après contrôle des matériaux et des besoins."
    },
    {
      "service": "couverture",
      "text": "Réparation de tuiles et réfection de pans lorsqu'un remplacement est justifié."
    },
    {
      "service": "zinguerie",
      "text": "Entretien et réparation des gouttières, descentes et raccords de toiture."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Recherche des causes réelles d'infiltration avant un traitement de surface."
    },
    {
      "service": "isolation",
      "text": "Étude d'une isolation en cas de rénovation de toiture plus globale."
    }
  ],
  "localSlugs": [
    "demoussage-traitement-hydrofuge-tassin"
  ],
  "nearbySlugs": [
    "reparation-zinguerie-gouttiere-ecully",
    "renovation-toiture-ardoise-ste-foy"
  ],
  "nearbyCities": [
    "Écully",
    "Francheville",
    "Sainte-Foy-lès-Lyon",
    "Dardilly"
  ],
  "proof": "La réalisation à Tassin-la-Demi-Lune porte sur un démoussage avec traitement de toiture, daté de février 2026.",
  "process": "Signalez tout défaut visible avant de demander un nettoyage : un toit poreux ou endommagé doit être évalué avant application de produits.",
  "faq": [
    {
      "question": "Un hydrofuge arrête-t-il une fuite ?",
      "answer": "Non. Il ne se substitue pas à la réparation d'une tuile, d'un solin ou d'une noue dont l'étanchéité est défaillante."
    },
    {
      "question": "Jrenov présente-t-il un chantier de démoussage à Tassin ?",
      "answer": "Oui. La réalisation de février 2026 documente un nettoyage de tuiles et un traitement de surface."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-corbas",
  "city": "Corbas",
  "postalCode": "69960",
  "keyword": "Couvreur à Corbas",
  "headline": "Couvreur à Corbas : rénovation de toiture et bac acier",
  "angle": "bac acier, réparation de toiture, étanchéité et zinguerie.",
  "lead": "Jrenov a documenté une rénovation de toiture de dépendance à Corbas, avec pose d'une couverture en bac acier. L'entreprise peut également étudier les réparations et travaux de couverture pour maisons et annexes.",
  "introTitle": "Un chantier de couverture de garage à Corbas",
  "intro": [
    "La réalisation de septembre 2026 décrit la réfection d'une toiture de dépendance et la pose de bac acier avec dispositifs contre la condensation. L'ancienne couverture amiantée avait été déposée par une entreprise agréée, ce qui doit rester une opération réservée aux intervenants autorisés.",
    "Sur une annexe ou un garage, la pente, les fixations et la gestion de la condensation sont aussi importantes que l'aspect des panneaux. Le matériau retenu dépend de la configuration et des règles locales applicables."
  ],
  "contextTitle": "Réparer une dépendance n'est pas refaire une maison",
  "context": [
    "La toiture d'un garage peut nécessiter une solution différente de celle d'une maison couverte en tuiles : nature de la charpente, étanchéité des rives et ventilation influencent la conception.",
    "En présence de plaques susceptibles de contenir de l'amiante, la nature du matériau doit être évaluée et la réglementation applicable respectée avant toute dépose ; un devis de couverture ordinaire ne vaut pas autorisation de désamiantage."
  ],
  "issuesTitle": "Points de contrôle sur garage et dépendance",
  "issues": [
    {
      "title": "Condensation sous les panneaux",
      "text": "Ventilation, pente et accessoires sont essentiels pour limiter l'humidité sous une couverture métallique."
    },
    {
      "title": "Rives et raccords",
      "text": "Les fixations et habillages doivent empêcher le ruissellement vers les murs et les bois."
    },
    {
      "title": "Ancienne couverture suspecte",
      "text": "Ne percez pas et ne déposez pas vous-même un matériau potentiellement amianté."
    }
  ],
  "serviceTitle": "Couverture et zinguerie à Corbas",
  "serviceIntro": "Une réalisation locale illustre la pose de bac acier ; les prestations suivantes nécessitent un devis adapté.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Étude de réparation ou de remplacement de couverture sur maison, garage ou annexe."
    },
    {
      "service": "zinguerie",
      "text": "Habillage des rives, reprises de gouttières et raccordement des évacuations pluviales."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Identification d'un défaut au niveau des recouvrements, des rives ou des solins."
    },
    {
      "service": "isolation",
      "text": "Étude de l'isolation et de la condensation selon l'utilisation du bâtiment."
    },
    {
      "service": "demoussage",
      "text": "Entretien des toitures compatibles, selon l'état et le type de couverture."
    }
  ],
  "localSlugs": [
    "renovation-toiture-garages-corbas"
  ],
  "nearbySlugs": [
    "remplacement-tuiles-cassees-orage-venissieux",
    "traitement-charpente-bois-saint-priest"
  ],
  "nearbyCities": [
    "Mions",
    "Saint-Priest",
    "Vénissieux",
    "Saint-Fons"
  ],
  "proof": "Le chantier de Corbas est présenté comme une rénovation de toiture de garage réalisée en septembre 2026.",
  "process": "Pour une annexe, précisez l'usage du bâtiment, la couverture existante et les accès ; signalez tout doute sur la nature de l'ancien matériau.",
  "faq": [
    {
      "question": "Jrenov a-t-il posé du bac acier à Corbas ?",
      "answer": "Oui, la fiche de réalisation décrit une toiture de dépendance refaite en bac acier en septembre 2026."
    },
    {
      "question": "Intervenez-vous sur les couvertures en amiante ?",
      "answer": "Le chantier documenté a confié la dépose amiantée à une entreprise agréée. Toute opération sur un matériau suspect relève des contrôles et de la réglementation appropriés."
    }
  ]
}),
  // CITY_ENTRIES
];
