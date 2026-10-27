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
  buildCityPage({
  "slug": "couvreur-sainte-foy-les-lyon",
  "city": "Sainte-Foy-lès-Lyon",
  "postalCode": "69110",
  "keyword": "Couvreur à Sainte-Foy-lès-Lyon",
  "headline": "Couvreur à Sainte-Foy-lès-Lyon : ardoise et toiture",
  "angle": "rénovation d'ardoise, réparation de fuites et zinguerie.",
  "lead": "Jrenov présente une réfection de couverture en ardoise naturelle à Sainte-Foy-lès-Lyon. Cette réalisation permet d'illustrer les soins nécessaires aux toitures anciennes et à leurs raccords.",
  "introTitle": "Un chantier d'ardoise sur une maison de caractère",
  "intro": [
    "Une fiche chantier d'avril 2026 décrit le remplacement d'une ancienne couverture en ardoise, des fixations inox et la reprise des entourages de lucarnes. Ces éléments doivent être coordonnés pour préserver l'étanchéité générale.",
    "Sainte-Foy-lès-Lyon comprend des maisons où la pente et les détails architecturaux rendent les travaux délicats. Chaque projet impose de vérifier la couverture existante et les règles d'urbanisme, particulièrement avant de changer de matériau."
  ],
  "contextTitle": "Ardoises et raccords : une approche complète",
  "context": [
    "Une ardoise fissurée peut laisser entrer l'eau, mais une lucarne ou un raccord métallique peut aussi expliquer une infiltration. La recherche de fuite doit précéder la proposition de travaux.",
    "Lors d'une réfection, les écrans, les liteaux, les fixations et les ouvrages de zinguerie sont étudiés ensemble pour éviter de rénover seulement la partie visible."
  ],
  "issuesTitle": "Les points sensibles des couvertures complexes",
  "issues": [
    {
      "title": "Ardoises qui se soulèvent",
      "text": "Crochets et supports doivent être vérifiés avant remplacement."
    },
    {
      "title": "Entourages de lucarnes",
      "text": "Les liaisons étanches autour des petites ouvertures réclament des détails adaptés."
    },
    {
      "title": "Cheminées anciennes",
      "text": "Un abergement fissuré peut créer une infiltration indépendamment de l'ardoise."
    }
  ],
  "serviceTitle": "Services de couverture à Sainte-Foy-lès-Lyon",
  "serviceIntro": "Le chantier local concerne l'ardoise ; nous pouvons aussi étudier d'autres types de couvertures.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Réparation ou rénovation de couverture en ardoise ou en tuiles selon l'ouvrage."
    },
    {
      "service": "zinguerie",
      "text": "Travaux sur abergements, lucarnes, rives et évacuations pluviales."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Recherche d'entrées d'eau en toiture avant une réfection générale."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Étude de la pose et de l'étanchéité de fenêtres de toit."
    },
    {
      "service": "isolation",
      "text": "Analyse des possibilités d'isolation lors d'une réfection de couverture."
    }
  ],
  "localSlugs": [
    "renovation-toiture-ardoise-ste-foy"
  ],
  "nearbySlugs": [
    "refection-noue-zinc-francheville",
    "demoussage-traitement-hydrofuge-tassin"
  ],
  "nearbyCities": [
    "Francheville",
    "Tassin-la-Demi-Lune",
    "Lyon"
  ],
  "proof": "La réalisation en ardoise datée d'avril 2026 est localisée à Sainte-Foy-lès-Lyon.",
  "process": "Indiquez le matériau de couverture et les éventuels éléments patrimoniaux ou ouvertures ; la visite permettra de préciser la solution.",
  "faq": [
    {
      "question": "Avez-vous une référence d'ardoise à Sainte-Foy ?",
      "answer": "Oui, la réalisation d'avril 2026 décrit une réfection en ardoise et des raccords de lucarnes."
    },
    {
      "question": "Peut-on remplacer uniquement une partie de l'ardoise ?",
      "answer": "Cela dépend de l'état des supports, des fixations et du modèle d'ardoise. Un contrôle sur place reste nécessaire."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-francheville",
  "city": "Francheville",
  "postalCode": "69340",
  "keyword": "Couvreur à Francheville",
  "headline": "Couvreur à Francheville : fuite, noue zinc et toiture",
  "angle": "réparation des noues, solins, couverture et gouttières.",
  "lead": "Une réparation de noue en zinc réalisée à Francheville figure parmi les chantiers Jrenov. Elle illustre l'importance des jonctions entre deux pans de toiture lors d'une infiltration.",
  "introTitle": "Une réparation de noue déjà réalisée à Francheville",
  "intro": [
    "La fiche d'août 2026 relate une fuite apparue au creux de deux versants : les tuiles ont été déposées localement pour remplacer la noue métallique dégradée. Cette intervention ne signifie pas qu'un remplacement complet du toit soit nécessaire à chaque infiltration.",
    "Sur les maisons à plusieurs pans, les noues concentrent une partie de l'eau de pluie. Leur forme, leur pente et la qualité des recouvrements doivent être examinées avant toute réparation."
  ],
  "contextTitle": "Diagnostiquer un défaut entre deux versants",
  "context": [
    "La corrosion ou une jonction mal dimensionnée peuvent entraîner une entrée d'eau. Il faut aussi rechercher l'accumulation de débris végétaux et vérifier que les tuiles ne gênent pas l'écoulement.",
    "La même vigilance s'applique aux pieds de cheminée et aux solins contre un mur : une réparation durable porte sur la cause, pas seulement sur la tache visible dans le logement."
  ],
  "issuesTitle": "Trois défauts de zinguerie possibles",
  "issues": [
    {
      "title": "Noue métallique percée",
      "text": "La jonction entre les pans peut demander un façonnage sur mesure après dépose locale."
    },
    {
      "title": "Solin décollé",
      "text": "Une reprise d'étanchéité peut être préférable à un traitement superficiel."
    },
    {
      "title": "Gouttière débordante",
      "text": "Une obstruction ou une pente inadaptée peut entraîner de l'eau contre la façade."
    }
  ],
  "serviceTitle": "Couverture et zinguerie à Francheville",
  "serviceIntro": "Nos pages de prestations expliquent les interventions possibles selon l'origine des désordres.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic des noues et autres points singuliers de la toiture."
    },
    {
      "service": "zinguerie",
      "text": "Façonnage, reprise de noues, abergements et évacuations."
    },
    {
      "service": "couverture",
      "text": "Réparation localisée de tuiles ou rénovation lorsqu'elle est nécessaire."
    },
    {
      "service": "demoussage",
      "text": "Entretien après inspection des éléments de toiture."
    },
    {
      "service": "isolation",
      "text": "Étude d'une isolation lorsqu'une réfection importante est envisagée."
    }
  ],
  "localSlugs": [
    "refection-noue-zinc-francheville"
  ],
  "nearbySlugs": [
    "renovation-toiture-ardoise-ste-foy",
    "reparation-fuite-cheminee-brignais"
  ],
  "nearbyCities": [
    "Sainte-Foy-lès-Lyon",
    "Tassin-la-Demi-Lune",
    "Lyon"
  ],
  "proof": "La réalisation d'août 2026 est bien située à Francheville : remplacement d'une noue en zinc pour traiter une fuite.",
  "process": "Pour une infiltration située au milieu du toit, notez si elle apparaît pendant des pluies prolongées ou uniquement par vent fort.",
  "faq": [
    {
      "question": "Jrenov a-t-il remplacé une noue à Francheville ?",
      "answer": "Oui, un chantier daté d'août 2026 porte sur le remplacement d'une noue métallique."
    },
    {
      "question": "Une fuite dans une noue impose-t-elle une toiture neuve ?",
      "answer": "Pas nécessairement. Si la couverture adjacente est saine, une reprise localisée peut être envisageable après diagnostic."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-mions",
  "city": "Mions",
  "postalCode": "69780",
  "keyword": "Couvreur à Mions",
  "headline": "Couvreur à Mions : toiture, tuiles et entretien",
  "angle": "réparation de toiture, démoussage, zinguerie et étanchéité.",
  "lead": "Jrenov étudie les demandes de réparation et d'entretien de toiture à Mions depuis Décines-Charpieu. Les exemples de travaux publiés concernent des communes voisines du sud-est lyonnais.",
  "introTitle": "Entretien et rénovation de toiture autour de Mions",
  "intro": [
    "Mions se situe dans le prolongement résidentiel du sud-est de la métropole, entre Saint-Priest et Corbas. Sur une maison, la présence de tuiles abîmées ou d'une gouttière défaillante doit être évaluée avant d'envisager un changement de couverture.",
    "La page distingue les services que Jrenov peut étudier à Mions de ses chantiers réellement documentés. Aucun exemple n'est présenté comme réalisé dans la commune sans référence."
  ],
  "contextTitle": "Rives, faîtage et évacuations pluviales",
  "context": [
    "Un débordement en bordure de toit peut venir d'une gouttière bouchée, d'une mauvaise pente ou d'un défaut de fixation des tuiles de rive. Chaque cause conduit à une intervention différente.",
    "Pour une toiture de dépendance, les exigences de pente et de ventilation doivent aussi être examinées. Un chantier de couverture de garage est documenté à Corbas, proche du secteur."
  ],
  "issuesTitle": "Quand contacter un couvreur à Mions ?",
  "issues": [
    {
      "title": "Tuiles cassées après le vent",
      "text": "Une inspection ciblée permet d'éviter de remplacer des matériaux encore sains."
    },
    {
      "title": "Traces sous la gouttière",
      "text": "La pente, les descentes et les raccords peuvent être en cause."
    },
    {
      "title": "Garage à rénover",
      "text": "La solution dépend de la charpente, de l'usage et du revêtement existant."
    }
  ],
  "serviceTitle": "Prestations de toiture à Mions",
  "serviceIntro": "Une demande précise permet d'orienter vers le bon type d'intervention.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Réparation de tuiles et rénovation de toiture principale ou d'annexe."
    },
    {
      "service": "zinguerie",
      "text": "Réparation ou remplacement de gouttières, habillage des rives et abergements."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Identification des points d'entrée de l'eau avant réparation."
    },
    {
      "service": "demoussage",
      "text": "Nettoyage de couverture si les tuiles sont compatibles et en état satisfaisant."
    },
    {
      "service": "isolation",
      "text": "Étude des combles et des solutions d'isolation selon le projet."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "renovation-toiture-garages-corbas",
    "traitement-charpente-bois-saint-priest",
    "remplacement-tuiles-cassees-orage-venissieux"
  ],
  "nearbyCities": [
    "Corbas",
    "Saint-Priest",
    "Vénissieux",
    "Saint-Bonnet-de-Mure"
  ],
  "proof": "Aucun chantier Jrenov à Mions n'est publié à ce jour. Les exemples affichés sont situés à Corbas, Saint-Priest et Vénissieux.",
  "process": "Distinguez réparation urgente et projet de rénovation : l'état de l'ouvrage et ses accès sont déterminants pour le rendez-vous.",
  "faq": [
    {
      "question": "Y a-t-il un chantier Jrenov à Mions présenté sur ce site ?",
      "answer": "Non, les réalisations visibles ici proviennent de communes proches et sont nommées comme telles."
    },
    {
      "question": "Faut-il refaire le toit d'un garage qui fuit ?",
      "answer": "Pas systématiquement. Selon la couverture, une réparation de rive, de recouvrement ou de fixation peut être envisagée."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-miribel",
  "city": "Miribel",
  "postalCode": "01700",
  "keyword": "Couvreur à Miribel",
  "headline": "Couvreur à Miribel : couverture et recherche de fuite",
  "angle": "fuites, couverture en tuiles, zinguerie et entretien.",
  "lead": "À Miribel, dans l'Ain, Jrenov peut examiner une demande de couverture ou de réparation depuis son siège de Décines-Charpieu. Les références présentées se trouvent dans des communes du secteur élargi.",
  "introTitle": "Un secteur de la Côtière à couvrir depuis Décines",
  "intro": [
    "Miribel appartient au département de l'Ain et se situe sur la frange nord-est de la métropole lyonnaise. Pour un chantier, la nature de la toiture et les conditions d'accès comptent plus que la seule distance entre les communes.",
    "Les maisons avec toiture inclinée peuvent présenter des fuites au niveau des faîtages, des rives ou des cheminées. Il convient d'identifier l'ouvrage concerné avant de demander un devis de réfection générale."
  ],
  "contextTitle": "Vérifier les points singuliers avant de remplacer les tuiles",
  "context": [
    "Une infiltration qui apparaît après une pluie oblique peut venir d'un raccord et non d'un défaut au milieu du versant. Une recherche de fuite méthodique est préférable à un remplacement au hasard.",
    "En cas de projet plus large, les gouttières et l'isolation peuvent être examinées en même temps que la couverture, mais doivent être chiffrées distinctement."
  ],
  "issuesTitle": "Ce que l'on contrôle sur une toiture",
  "issues": [
    {
      "title": "Faîtage fragilisé",
      "text": "Les fixations et l'état des faîtières déterminent la réparation."
    },
    {
      "title": "Fuite de cheminée",
      "text": "Un abergement ou un solin peut nécessiter une reprise en zinc."
    },
    {
      "title": "Gouttières usées",
      "text": "Les assemblages et descentes doivent conserver un écoulement correct."
    }
  ],
  "serviceTitle": "Prestations possibles autour de Miribel",
  "serviceIntro": "Les interventions proposées font l'objet d'une étude préalable de la toiture.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Remplacement de tuiles, réfection de faîtage ou rénovation selon la situation."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic d'infiltrations dans une couverture inclinée."
    },
    {
      "service": "zinguerie",
      "text": "Reprise des raccords, noues et gouttières."
    },
    {
      "service": "demoussage",
      "text": "Nettoyage et entretien sur supports compatibles."
    },
    {
      "service": "isolation",
      "text": "Étude du confort thermique en cas de travaux de rénovation."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "pose-gouttieres-alu-sur-mesure-dagneux",
    "renovation-faitage-a-sec-fontaines-sur-saone",
    "remplacement-velux-ancien-decines"
  ],
  "nearbyCities": [
    "Beynost",
    "Jonage",
    "Rillieux-la-Pape",
    "Décines-Charpieu"
  ],
  "proof": "Ces travaux se trouvent notamment à Dagneux, Fontaines-sur-Saône et Décines-Charpieu ; ils ne sont pas présentés comme des chantiers réalisés à Miribel.",
  "process": "Pour une intervention hors département du Rhône, mentionnez bien l'adresse exacte à Miribel afin de confirmer le périmètre d'intervention.",
  "faq": [
    {
      "question": "Jrenov est-il installé à Miribel ?",
      "answer": "Non, son siège est à Décines-Charpieu. L'entreprise peut étudier une demande sur Miribel et en confirmer les modalités."
    },
    {
      "question": "Une toiture en tuiles anciennes se répare-t-elle ?",
      "answer": "Souvent, une reprise locale est possible si les supports et les matériaux sont adaptés. Le diagnostic reste indispensable."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-beynost",
  "city": "Beynost",
  "postalCode": "01700",
  "keyword": "Couvreur à Beynost",
  "headline": "Couvreur à Beynost : toiture, gouttières et fuites",
  "angle": "zinguerie, réparation de tuiles, diagnostic d'étanchéité.",
  "lead": "Depuis Décines-Charpieu, Jrenov étudie les projets de toiture à Beynost, commune de la Côtière dans l'Ain. Les réalisations documentées figurent dans les communes proches et non à Beynost même.",
  "introTitle": "Beynost : privilégier le diagnostic au devis standard",
  "intro": [
    "À Beynost, une intervention sur une maison nécessite de tenir compte de la pente, des matériaux et du réseau de gouttières. Le même symptôme d'humidité peut provenir d'un solin, d'une tuile déplacée ou d'une évacuation qui refoule.",
    "Jrenov présente des références de zinguerie et de couverture dans la région, notamment à Dagneux. Aucun chantier à Beynost n'est attribué sans documents correspondants."
  ],
  "contextTitle": "Les évacuations en bas de pente",
  "context": [
    "Une gouttière peut devenir inefficace à cause d'un mauvais alignement ou d'une descente obstruée. Un remplacement complet n'est pas la réponse automatique ; le couvreur vérifie d'abord la cause et la longueur concernée.",
    "Lorsque les tuiles sont vieillissantes, le contrôle des rives et du faîtage permet d'établir si une réparation localisée reste pertinente."
  ],
  "issuesTitle": "Identifier l'origine d'un défaut de toiture",
  "issues": [
    {
      "title": "Écoulement insuffisant",
      "text": "Gouttière encrassée, crochets ou raccords sont à inspecter."
    },
    {
      "title": "Tuile manquante",
      "text": "Le risque d'infiltration doit être évalué sans monter sur le toit."
    },
    {
      "title": "Solin fissuré",
      "text": "Le raccord contre un mur peut nécessiter une reprise d'étanchéité."
    }
  ],
  "serviceTitle": "Couverture et entretien à Beynost",
  "serviceIntro": "Retrouvez les descriptifs techniques de chaque prestation proposée.",
  "serviceCopy": [
    {
      "service": "zinguerie",
      "text": "Gouttières, descentes pluviales, noues et abergements."
    },
    {
      "service": "couverture",
      "text": "Réparation de tuiles et réfection de couverture."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Identification d'une infiltration avant reprise du toit."
    },
    {
      "service": "demoussage",
      "text": "Entretien selon la nature et l'état des tuiles."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Contrôle ou remplacement des raccords de fenêtre de toit."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "pose-gouttieres-alu-sur-mesure-dagneux",
    "habillage-bandeaux-rive-alu-meyzieu"
  ],
  "nearbyCities": [
    "Miribel",
    "Jonage",
    "Meyzieu"
  ],
  "proof": "Les exemples de zinguerie affichés sont documentés à Dagneux et Meyzieu, pas à Beynost.",
  "process": "La commune se trouvant dans l'Ain, précisez-la dès le premier contact pour vérifier l'organisation de l'intervention.",
  "faq": [
    {
      "question": "Peut-on solliciter un devis depuis Beynost ?",
      "answer": "Oui, Jrenov peut étudier votre demande depuis son siège à Décines-Charpieu et préciser les modalités de visite."
    },
    {
      "question": "Une gouttière qui fuit se répare-t-elle ?",
      "answer": "Cela dépend du matériau, de l'étendue des dommages et de l'état des assemblages. Un contrôle permet de décider."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-jonage",
  "city": "Jonage",
  "postalCode": "69330",
  "keyword": "Couvreur à Jonage",
  "headline": "Couvreur à Jonage : réparation de toiture et zinguerie",
  "angle": "reprise de toiture, gouttières, infiltrations et fenêtres de toit.",
  "lead": "À Jonage, près de Meyzieu, Jrenov peut examiner une fuite, une tuile cassée ou un projet de rénovation. Les exemples publiés proviennent notamment de Meyzieu et Décines-Charpieu.",
  "introTitle": "Un secteur proche de notre siège",
  "intro": [
    "Jonage prolonge l'Est lyonnais au-delà de Meyzieu. Pour un propriétaire, une réparation de toiture commence par le repérage de la zone touchée : faîtage, rive, cheminée ou fenêtre de toit.",
    "Les réalisations consultables à Meyzieu montrent des travaux de zinguerie, tandis qu'à Décines un chantier concerne le remplacement de fenêtres de toit. Elles illustrent les services sans être présentées comme des références réalisées à Jonage."
  ],
  "contextTitle": "Raccords et toiture : ne pas confondre les défauts",
  "context": [
    "L'eau peut s'infiltrer sous une tuile déplacée ou contourner le toit par un raccord mal étanche. Le choix d'une réparation dépend d'une observation de l'ensemble des points singuliers.",
    "Une rénovation générale peut inclure gouttières et isolation, mais le diagnostic distingue les postes réellement nécessaires."
  ],
  "issuesTitle": "Trois demandes de toiture possibles",
  "issues": [
    {
      "title": "Tuiles après un coup de vent",
      "text": "Vérifier le positionnement des tuiles et les attaches sur la zone concernée."
    },
    {
      "title": "Gouttière qui se déforme",
      "text": "Contrôler le profil, les fixations et les joints."
    },
    {
      "title": "Fenêtre de toit vieillissante",
      "text": "Examiner le vitrage, le dormant et le raccordement avec la couverture."
    }
  ],
  "serviceTitle": "Nos services de toiture à Jonage",
  "serviceIntro": "Les prestations sont proposées à partir des informations sur le toit, puis précisées par une visite.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Recherche d'entrées d'eau et mise en sécurité si nécessaire."
    },
    {
      "service": "couverture",
      "text": "Remplacement de tuiles ou rénovation de pans dégradés."
    },
    {
      "service": "zinguerie",
      "text": "Gouttières, habillages de rives et solins."
    },
    {
      "service": "fenetres-de-toit",
      "text": "Remplacement et étanchéité de fenêtres de toit."
    },
    {
      "service": "demoussage",
      "text": "Nettoyage des tuiles lorsque leur état le permet."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "habillage-bandeaux-rive-alu-meyzieu",
    "remplacement-velux-ancien-decines",
    "pose-gouttieres-alu-sur-mesure-dagneux"
  ],
  "nearbyCities": [
    "Meyzieu",
    "Décines-Charpieu",
    "Beynost",
    "Miribel"
  ],
  "proof": "Les chantiers affichés sont situés à Meyzieu, Décines-Charpieu et Dagneux : aucune réalisation locale à Jonage n'a été ajoutée artificiellement.",
  "process": "Précisez si votre besoin concerne une fuite active ou un projet de remplacement programmé afin d'orienter la première réponse.",
  "faq": [
    {
      "question": "Jrenov possède-t-il un chantier publié à Jonage ?",
      "answer": "Pas à ce jour. Les exemples présentés sont situés dans des communes du secteur."
    },
    {
      "question": "Pour une fuite autour d'un Velux, faut-il changer toute la fenêtre ?",
      "answer": "Pas toujours. Le problème peut venir du raccord ou de la fenêtre elle-même : il faut l'identifier avant de chiffrer."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-saint-bonnet-de-mure",
  "city": "Saint-Bonnet-de-Mure",
  "postalCode": "69720",
  "keyword": "Couvreur à Saint-Bonnet-de-Mure",
  "headline": "Couvreur à Saint-Bonnet-de-Mure : toiture et fuites",
  "angle": "couverture en tuiles, recherche de fuite, gouttières et isolation.",
  "lead": "Pour un projet à Saint-Bonnet-de-Mure, Jrenov examine les besoins de réparation, rénovation et étanchéité depuis Décines-Charpieu. Les chantiers présentés en référence sont ceux de communes voisines.",
  "introTitle": "Travaux de couverture dans l'est de l'agglomération",
  "intro": [
    "Saint-Bonnet-de-Mure se situe à l'est de Saint-Priest et Genas. Sur les maisons et dépendances, l'état de la couverture, la pente et les raccords avec les évacuations doivent être vérifiés avant de retenir un procédé.",
    "Jrenov n'affiche pas de chantier réalisé à Saint-Bonnet-de-Mure sans éléments probants. Les réalisations proches documentent la couverture d'un garage à Corbas et l'entretien de toiture à Genas."
  ],
  "contextTitle": "Réparation ponctuelle et rénovation n'ont pas le même périmètre",
  "context": [
    "Remplacer des tuiles abîmées constitue une opération différente d'une réfection avec écran de sous-toiture et liteaux. Pour comparer des devis, les supports et accessoires doivent être détaillés.",
    "Pour une infiltration à proximité d'une cheminée, une reprise du solin peut suffire si le reste de la couverture est en état. Le diagnostic permet de ne pas anticiper une dépense inutile."
  ],
  "issuesTitle": "Observer les signes avant d'appeler",
  "issues": [
    {
      "title": "Tuiles manquantes",
      "text": "Une zone visible doit être sécurisée et inspectée sans monter soi-même sur le toit."
    },
    {
      "title": "Façade humide sous toiture",
      "text": "L'évacuation pluviale ou les rives peuvent être en cause."
    },
    {
      "title": "Combles inconfortables",
      "text": "Une intervention sur la couverture peut être l'occasion d'étudier l'isolation, sans la présumer nécessaire."
    }
  ],
  "serviceTitle": "Prestations de couverture à Saint-Bonnet-de-Mure",
  "serviceIntro": "Les pages techniques aident à préparer un diagnostic précis.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Réparation de tuiles et travaux de réfection sur toiture inclinée."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic de l'origine d'infiltrations près des éléments sensibles."
    },
    {
      "service": "zinguerie",
      "text": "Reprise de gouttières, solins et habillages métalliques."
    },
    {
      "service": "isolation",
      "text": "Étude des solutions thermiques selon le projet de toiture."
    },
    {
      "service": "demoussage",
      "text": "Entretien de couverture après inspection des tuiles."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "demoussage-toiture-ecologique-genas",
    "renovation-toiture-garages-corbas",
    "traitement-charpente-bois-saint-priest"
  ],
  "nearbyCities": [
    "Genas",
    "Saint-Priest",
    "Mions",
    "Saint-Laurent-de-Mure"
  ],
  "proof": "Aucun chantier de Saint-Bonnet-de-Mure n'est revendiqué. Les réalisations citées sont situées à Genas, Corbas et Saint-Priest.",
  "process": "Indiquez si les travaux concernent une maison, un garage ou une annexe : cette précision aide à préparer le rendez-vous.",
  "faq": [
    {
      "question": "Pouvez-vous vérifier une fuite à Saint-Bonnet-de-Mure ?",
      "answer": "Jrenov peut étudier une demande dans ce secteur depuis Décines-Charpieu et proposer une visite selon disponibilité."
    },
    {
      "question": "Une isolation est-elle obligatoire lors d'une réparation ?",
      "answer": "Une réparation ponctuelle n'implique pas automatiquement une isolation. Les obligations éventuelles et la faisabilité dépendent du chantier."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-saint-fons",
  "city": "Saint-Fons",
  "postalCode": "69190",
  "keyword": "Couvreur à Saint-Fons",
  "headline": "Couvreur à Saint-Fons : réparation et étanchéité de toit",
  "angle": "fuites, couvertures en tuiles, zinguerie et travaux sur annexes.",
  "lead": "À Saint-Fons, Jrenov peut étudier une infiltration, une réparation de couverture ou des travaux de gouttière. Les références de chantier affichées proviennent de Vénissieux et Corbas, pas de Saint-Fons.",
  "introTitle": "Toiture de maison ou de bâtiment d'activité",
  "intro": [
    "Saint-Fons s'inscrit dans le sud de la métropole lyonnaise, au voisinage de Vénissieux et de Lyon. Une toiture de pavillon et une toiture de bâtiment professionnel n'ont pas les mêmes contraintes de sécurité ni de matériaux.",
    "Dans le cas d'une infiltration, la nature du toit doit être identifiée avant de proposer un devis : couverture inclinée en tuiles, éléments métalliques ou autre type d'étanchéité."
  ],
  "contextTitle": "Éviter les réparations sans diagnostic",
  "context": [
    "La cause d'un plafond humide peut être éloignée de la zone où l'eau apparaît à l'intérieur. Les jonctions avec un mur, les chéneaux et les solins sont des points à examiner.",
    "Un chantier réel de bâchage après grêle est publié à Vénissieux, dans la commune voisine. Il donne un exemple de mise en sécurité, sans promettre une intervention identique à Saint-Fons."
  ],
  "issuesTitle": "Repérer la nature de la demande",
  "issues": [
    {
      "title": "Fuite après un épisode pluvieux",
      "text": "La localisation de l'entrée d'eau guide le choix de la réparation."
    },
    {
      "title": "Tuiles endommagées",
      "text": "L'état des supports et des fixations doit être examiné."
    },
    {
      "title": "Débordement d'évacuation",
      "text": "Chéneaux, gouttières et descentes peuvent nécessiter un contrôle."
    }
  ],
  "serviceTitle": "Nos services de toiture à Saint-Fons",
  "serviceIntro": "Les prestations sont soumises à l'examen du bâtiment et à une proposition adaptée.",
  "serviceCopy": [
    {
      "service": "recherche-de-fuite",
      "text": "Recherche des points d'entrée d'eau avant réparation."
    },
    {
      "service": "couverture",
      "text": "Remplacement de tuiles et rénovation de couvertures compatibles."
    },
    {
      "service": "zinguerie",
      "text": "Entretien ou remplacement de gouttières et raccords métalliques."
    },
    {
      "service": "demoussage",
      "text": "Nettoyage de couverture selon son état."
    },
    {
      "service": "isolation",
      "text": "Étude d'isolation en complément de rénovations appropriées."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "remplacement-tuiles-cassees-orage-venissieux",
    "renovation-toiture-garages-corbas"
  ],
  "nearbyCities": [
    "Vénissieux",
    "Corbas",
    "Bron",
    "Lyon"
  ],
  "proof": "Les réalisations affichées ici sont situées à Vénissieux et Corbas. Aucun chantier à Saint-Fons n'a été ajouté artificiellement.",
  "process": "Précisez le type de bâtiment dès la prise de contact pour identifier les contraintes et le domaine de prestation applicable.",
  "faq": [
    {
      "question": "Avez-vous des réalisations publiées à Saint-Fons ?",
      "answer": "Aucune actuellement. Les références affichées sont localisées dans les communes voisines."
    },
    {
      "question": "Travaillez-vous aussi sur des bâtiments professionnels ?",
      "answer": "Une demande peut être étudiée selon la nature de la toiture, les accès et les qualifications requises pour l'intervention."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-dardilly",
  "city": "Dardilly",
  "postalCode": "69570",
  "keyword": "Couvreur à Dardilly",
  "headline": "Couvreur à Dardilly : rénovation de toit et gouttières",
  "angle": "réfection de tuiles, zinguerie, recherche de fuite et entretien.",
  "lead": "Dans l'ouest de l'agglomération, Jrenov peut étudier une réparation ou une rénovation de toiture à Dardilly. Les chantiers montrés proviennent d'Écully et des communes voisines.",
  "introTitle": "Réparation et zinguerie à l'ouest de Lyon",
  "intro": [
    "Dardilly est située au nord-ouest de Lyon, à proximité d'Écully et de Champagne-au-Mont-d'Or. Pour un pavillon, l'état des rives et des gouttières compte autant que celui des tuiles.",
    "Les réalisations mises en avant sont authentiquement localisées à Écully et Champagne-au-Mont-d'Or. La présente page est une information sur la zone desservie, pas la description d'un chantier à Dardilly."
  ],
  "contextTitle": "De la fuite de gouttière à la réfection complète",
  "context": [
    "Une infiltration localisée au bord du toit peut venir d'une sous-face dégradée, d'un solin ou d'une gouttière percée. La reprise d'un seul ouvrage peut parfois éviter des travaux plus larges.",
    "Lorsqu'une couverture en tuiles est en fin de vie, la réfection peut demander de vérifier les liteaux et les points de raccordement avant le choix des matériaux."
  ],
  "issuesTitle": "Quelques désordres fréquents à diagnostiquer",
  "issues": [
    {
      "title": "Bandeau de rive abîmé",
      "text": "Il faut contrôler le bois support avant de le protéger par un habillage."
    },
    {
      "title": "Tuiles à reprendre",
      "text": "Un diagnostic permet de savoir si le problème est local ou généralisé."
    },
    {
      "title": "Gouttière désolidarisée",
      "text": "Crochets, pente et évacuations doivent être examinés ensemble."
    }
  ],
  "serviceTitle": "Travaux de toiture proposés à Dardilly",
  "serviceIntro": "Les interventions s'étudient sur place, selon le support et l'état des matériaux.",
  "serviceCopy": [
    {
      "service": "zinguerie",
      "text": "Gouttières et habillage des rives, dans la continuité des chantiers de zinguerie publiés à Écully."
    },
    {
      "service": "couverture",
      "text": "Rénovation de tuiles ou réparation ponctuelle de couverture."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Recherche de causes d'infiltration avant réparation."
    },
    {
      "service": "demoussage",
      "text": "Entretien de couverture adapté au type de tuile."
    },
    {
      "service": "isolation",
      "text": "Étude du confort thermique lors d'une rénovation de toit."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "reparation-zinguerie-gouttiere-ecully",
    "renovation-toiture-tuiles-plat-champagne-au-mont-d-or"
  ],
  "nearbyCities": [
    "Écully",
    "Tassin-la-Demi-Lune",
    "Lyon"
  ],
  "proof": "Les références concernent Écully et Champagne-au-Mont-d'Or. Aucun chantier à Dardilly n'est revendiqué dans le portfolio.",
  "process": "Pour une couverture complexe, décrivez le nombre de pans et les raccords visibles ; le devis dépendra d'une visite.",
  "faq": [
    {
      "question": "Avez-vous une agence à Dardilly ?",
      "answer": "Non, le siège de Jrenov demeure à Décines-Charpieu. L'entreprise étudie les demandes dans l'ouest lyonnais."
    },
    {
      "question": "Faut-il demander deux devis pour gouttières et tuiles ?",
      "answer": "Un même devis peut détailler plusieurs postes distincts, en précisant clairement les quantités et matériaux."
    }
  ]
}),
  buildCityPage({
  "slug": "couvreur-saint-laurent-de-mure",
  "city": "Saint-Laurent-de-Mure",
  "postalCode": "69720",
  "keyword": "Couvreur à Saint-Laurent-de-Mure",
  "headline": "Couvreur à Saint-Laurent-de-Mure : toiture et zinguerie",
  "angle": "réparation de toiture, gouttières, fuites et isolation.",
  "lead": "Jrenov étudie les projets de toiture à Saint-Laurent-de-Mure depuis Décines-Charpieu. Aucun chantier local n'est revendiqué : les réalisations présentées appartiennent à des communes du secteur.",
  "introTitle": "Rénover une couverture dans l'est lyonnais",
  "intro": [
    "Saint-Laurent-de-Mure est voisine de Saint-Bonnet-de-Mure, à l'est de la métropole lyonnaise. Les propriétaires de maisons et dépendances peuvent avoir des besoins distincts : tuile à remplacer, zinguerie, isolation ou remise en état d'un garage.",
    "Avant de contacter un couvreur, il est utile de noter la commune, la nature de la toiture et les éventuels signes d'humidité. Les détails techniques pourront être précisés au diagnostic."
  ],
  "contextTitle": "Traiter la cause de l'infiltration",
  "context": [
    "Des tuiles fissurées, un solin décollé ou une gouttière qui déborde entraînent des travaux différents. La présence de mousse ne prouve pas à elle seule qu'une toiture est à remplacer.",
    "Pour une réfection complète, le devis doit distinguer couverture, zinguerie, écrans de sous-toiture et, si elle est envisagée, isolation."
  ],
  "issuesTitle": "Les éléments à contrôler",
  "issues": [
    {
      "title": "Tuile déplacée",
      "text": "L'état des fixations et des matériaux voisins oriente la réparation."
    },
    {
      "title": "Gouttière qui fuit",
      "text": "Les jonctions, crochets et descentes doivent être examinés."
    },
    {
      "title": "Humidité sous toiture",
      "text": "Une inspection du raccord et du support est nécessaire avant de chiffrer."
    }
  ],
  "serviceTitle": "Nos services de toiture à Saint-Laurent-de-Mure",
  "serviceIntro": "Un devis doit préciser les matériaux et la portée des travaux, sans prestations supposées.",
  "serviceCopy": [
    {
      "service": "couverture",
      "text": "Réparation ou rénovation de toitures en tuiles et annexes."
    },
    {
      "service": "zinguerie",
      "text": "Gouttières, abergements et habillage de rives."
    },
    {
      "service": "recherche-de-fuite",
      "text": "Diagnostic d'infiltrations avant intervention."
    },
    {
      "service": "isolation",
      "text": "Évaluation de l'isolation lors de travaux de toiture."
    },
    {
      "service": "demoussage",
      "text": "Entretien adapté aux tuiles en place."
    }
  ],
  "localSlugs": [],
  "nearbySlugs": [
    "demoussage-toiture-ecologique-genas",
    "renovation-toiture-garages-corbas"
  ],
  "nearbyCities": [
    "Saint-Bonnet-de-Mure",
    "Genas",
    "Mions",
    "Saint-Priest"
  ],
  "proof": "Les exemples de toiture concernent Genas et Corbas, et non Saint-Laurent-de-Mure.",
  "process": "Confirmez la commune et décrivez l'état de la toiture ; le premier échange aidera à programmer un diagnostic réaliste.",
  "faq": [
    {
      "question": "Jrenov a-t-il une réalisation à Saint-Laurent-de-Mure ?",
      "answer": "Aucune réalisation locale n'est actuellement publiée. Les exemples visibles sont localisés dans d'autres communes."
    },
    {
      "question": "Peut-on demander un devis pour refaire une seule pente ?",
      "answer": "Oui, l'étude peut porter sur un seul pan, à condition de vérifier les raccords et la cohérence avec la couverture conservée."
    }
  ]
}),
  // CITY_ENTRIES
];
