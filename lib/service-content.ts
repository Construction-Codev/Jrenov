import { SERVICES, getService, type ServiceItem, type ServiceKey } from "@/lib/services";
import { realisations, posts, getRealisation, type Realisation, type Post } from "@/lib/content";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";

/**
 * Source de vérité du silo « services » :
 * - réalisations → services (par catégorie, avec exceptions justifiées par le texte du chantier) ;
 * - réalisations mises en avant sur chaque page service ;
 * - articles → services (+ phrase de liaison éditoriale) ;
 * - pages locales mises en avant sur chaque page service.
 * Seuls des slugs sont référencés : les textes restent dans data/*.json.
 * La cohérence est vérifiée au build par validateServiceContent().
 */

// ─── Réalisations → services ────────────────────────────────────────────────

/** Correspondance par défaut selon la catégorie du chantier. */
const CATEGORY_SERVICES: Record<string, ServiceKey[]> = {
  Couverture: ["couverture"],
  Zinguerie: ["zinguerie"],
  Isolation: ["isolation"],
  Entretien: ["demoussage"],
  "Fenêtre de toit": ["fenetres-de-toit"],
  // Mise hors d'eau après intempéries + remplacement de tuiles
  Urgence: ["recherche-de-fuite", "couverture"],
  // Pas de page service dédiée (étanchéité de toit-terrasse, charpente) : voir exceptions ci-dessous
  Étanchéité: [],
  Charpente: [],
};

/**
 * Exceptions : le texte du chantier justifie explicitement une prestation supplémentaire.
 * Chaque entrée REMPLACE la correspondance par défaut de la catégorie.
 */
const REALISATION_SERVICE_OVERRIDES: Record<string, ServiceKey[]> = {
  // « Recherche de fuite et façonnage d'un abergement de cheminée »
  "reparation-fuite-cheminee-brignais": ["recherche-de-fuite", "zinguerie"],
  // « Suite à une fuite au creux du toit » → noue zinc
  "refection-noue-zinc-francheville": ["zinguerie", "recherche-de-fuite"],
  // « Intervention d'urgence suite à des infiltrations le long du mur de façade »
  "reparation-zinguerie-gouttiere-ecully": ["zinguerie", "recherche-de-fuite"],
  // « Suite à des infiltrations dans les derniers étages » (toit-terrasse)
  "refection-etancheite-toit-terrasse-lyon-6": ["recherche-de-fuite"],
  // Sarking : « Dépose de la couverture … repose d'une couverture neuve »
  "isolation-sarking-toiture-caluire": ["isolation", "couverture"],
};

export function serviceKeysForRealisation(item: Realisation): ServiceKey[] {
  return item.services ?? REALISATION_SERVICE_OVERRIDES[item.slug] ?? CATEGORY_SERVICES[item.category] ?? [];
}

export function servicesForRealisation(item: Realisation): ServiceItem[] {
  return serviceKeysForRealisation(item).map(getService);
}

/**
 * Badge « Garantie décennale » sur une page de réalisation.
 * Affiché uniquement si le chantier est rattaché à la couverture ou à la zinguerie :
 * deux activités explicitement couvertes par l'assurance décennale (mentions légales)
 * et qui portent sur l'ouvrage lui-même. En cas de doute, le badge est masqué :
 * entretien (démoussage), isolation seule, fenêtres de toit, étanchéité de toit-terrasse,
 * et charpente (la catégorie mêle traitement insecticide et renforcement, non distinguables).
 */
const DECENNIAL_SERVICES: readonly ServiceKey[] = ["couverture", "zinguerie"];

export function showsDecennialBadge(item: Realisation): boolean {
  return serviceKeysForRealisation(item).some((key) => DECENNIAL_SERVICES.includes(key));
}

// ─── Articles → services ────────────────────────────────────────────────────

export interface ArticleLink {
  services: ServiceKey[];
  /** Phrase de liaison affichée en fin d'article. */
  text: string;
  /** Ajoute un lien vers la demande de devis. */
  withQuote?: boolean;
}

export const ARTICLE_LINKS: Record<string, ArticleLink> = {
  "choisir-couvreur-lyon-verifier-devis-assurance": {
    services: ["couverture"],
    text: "Vous avez un projet de rénovation ou une réparation à programmer ? Retrouvez nos interventions et demandez un devis détaillé adapté à votre couverture.",
    withQuote: true,
  },
  "tuiles-cassees-reparer-ou-refaire-toiture": {
    services: ["couverture", "recherche-de-fuite"],
    text: "Une tuile cassée peut nécessiter une reprise localisée ou une inspection plus large : découvrez nos services de couverture et de recherche de fuite.",
    withQuote: true,
  },
  "fuite-toiture-apres-orage-premiers-reflexes": {
    services: ["recherche-de-fuite"],
    text: "Après une infiltration, notre intervention vise d'abord à identifier l'origine du problème puis à sécuriser et réparer la couverture.",
    withQuote: true,
  },
  "fuite-solin-cheminee-comment-reparer": {
    services: ["zinguerie", "recherche-de-fuite"],
    text: "Nous examinons les raccords de toiture, les solins et les abergements pour proposer une solution adaptée à la cause de la fuite.",
    withQuote: true,
  },
  "prix-reparation-fuite-toiture-comment-estimer": {
    services: ["recherche-de-fuite", "couverture"],
    text: "Le prix dépend de la cause et de l'accès à la toiture : une visite et un descriptif précis sont indispensables pour chiffrer votre réparation.",
    withQuote: true,
  },
  "infiltration-autour-velux-origines-solutions": {
    services: ["fenetres-de-toit", "recherche-de-fuite"],
    text: "Nous intervenons sur les fenêtres de toit et leurs raccords ainsi que sur les infiltrations provenant des éléments de couverture voisins.",
    withQuote: true,
  },
  "faitage-toiture-abime-comment-reconnaitre": {
    services: ["couverture"],
    text: "Un faîtage fragilisé nécessite un contrôle des éléments, de la fixation et de la ventilation de la couverture avant toute réparation.",
    withQuote: true,
  },
  "gouttiere-deborde-fortes-pluies-causes-solutions": {
    services: ["zinguerie"],
    text: "Une gouttière qui déborde peut nécessiter un nettoyage, une reprise de pente ou une réparation : nos prestations de zinguerie détaillent ces interventions.",
    withQuote: true,
  },
  "condensation-ou-fuite-dans-les-combles": {
    services: ["recherche-de-fuite", "isolation"],
    text: "Pour un diagnostic cohérent, il faut vérifier l'étanchéité extérieure, l'isolation et la ventilation plutôt que traiter uniquement les traces visibles.",
    withQuote: true,
  },
  "declaration-prealable-refection-toiture-lyon": {
    services: ["couverture"],
    text: "Une fois les formalités vérifiées auprès de votre commune, découvrez nos solutions de couverture et préparez votre demande de devis.",
    withQuote: true,
  },
  "verifier-toiture-avant-hiver-checklist-lyon": {
    services: ["couverture", "zinguerie", "demoussage"],
    text: "Tuiles, faîtage, écoulement des eaux et entretien : nos services permettent d'adapter les interventions à l'état réel de votre toiture.",
    withQuote: true,
  },
  "reparer-ou-renover-toiture-criteres-decision": {
    services: ["couverture", "recherche-de-fuite"],
    text: "Nous pouvons examiner l'origine des désordres pour comparer une réparation durable et une rénovation plus étendue, selon votre couverture.",
    withQuote: true,
  },
  "comment-detecter-fuite-toiture-lyon": {
    services: ["recherche-de-fuite"],
    text: "Vous reconnaissez l'un de ces signes chez vous ? Voyez comment nous localisons l'origine d'une infiltration, mettons la toiture hors d'eau puis réparons.",
  },
  "artisan-couvreur-urgence-fuite-toiture-lyon-ouest-lyonnais": {
    services: ["recherche-de-fuite"],
    text: "Fuite après un orage ou une chute de grêle ? Notre page dédiée détaille notre prise en charge des urgences, du bâchage à la réparation définitive.",
  },
  "isolation-toiture-par-exterieur-sarking": {
    services: ["isolation"],
    text: "Sarking, combles perdus ou combles aménagés : retrouvez les solutions d'isolation de toiture que nous réalisons.",
  },
  "aide-financiere-isolation-toiture-renovation-rhone": {
    services: ["isolation"],
    text: "Pour connaître les techniques d'isolation de toiture que nous mettons en œuvre, consultez notre page dédiée.",
  },
  "quand-remplacer-gouttieres-zinc-pvc-alu": {
    services: ["zinguerie"],
    text: "Gouttières zinc, aluminium ou PVC, chéneaux et descentes : découvrez nos travaux de zinguerie.",
  },
  "velux-fenetre-toit-luminosite-combles": {
    services: ["fenetres-de-toit"],
    text: "Création d'une ouverture ou remplacement d'une ancienne fenêtre de toit : voyez comment nous intégrons les fenêtres de toit à la couverture.",
  },
  "prix-renovation-toiture-m2-lyon-devis": {
    services: ["couverture"],
    text: "Pour un chiffrage adapté à votre toiture, découvrez nos travaux de couverture ou demandez directement votre devis.",
    withQuote: true,
  },
  "nettoyage-demoussage-toiture-entreprise-lyon-val-saone": {
    services: ["demoussage"],
    text: "Nettoyage, traitement anti-mousse et hydrofuge : découvrez le détail de notre prestation de démoussage.",
  },
};

export function articlesForService(key: ServiceKey): Post[] {
  return posts.filter((post) => ARTICLE_LINKS[post.slug]?.services.includes(key));
}

// ─── Contenu du silo par service ────────────────────────────────────────────

export interface ServiceSilo {
  /** Titre du bloc réalisations sur la page service. */
  realisationsTitle: string;
  /** Réalisations mises en avant (2 à 6), dans l'ordre d'affichage. */
  featuredRealisations: string[];
  /** Pages locales mises en avant. */
  local: { title: string; intro: string; slugs: string[] };
}

export const SERVICE_SILOS: Record<ServiceKey, ServiceSilo> = {
  couverture: {
    realisationsTitle: "Réalisations de couverture",
    featuredRealisations: [
      "renovation-couverture-tuiles-villeurbanne",
      "renovation-toiture-ardoise-ste-foy",
      "renovation-toiture-tuiles-plat-champagne-au-mont-d-or",
      "renovation-faitage-a-sec-fontaines-sur-saone",
      "renovation-toiture-garages-corbas",
      "remplacement-tuiles-cassees-orage-venissieux",
    ],
    local: {
      title: "Rénovation de toiture dans l'Est lyonnais",
      intro:
        "Depuis notre siège de Décines-Charpieu, nous refaisons et réparons des couvertures dans tout l'Est lyonnais, à Lyon et dans la métropole. Exemples de communes avec une page dédiée :",
      slugs: ["couvreur-decines-charpieu", "couvreur-villeurbanne", "couvreur-meyzieu", "couvreur-saint-priest"],
    },
  },
  zinguerie: {
    realisationsTitle: "Réalisations de zinguerie",
    featuredRealisations: [
      "habillage-bandeaux-rive-alu-meyzieu",
      "reparation-fuite-cheminee-brignais",
      "refection-noue-zinc-francheville",
      "refection-solins-etancheite-lyon-5",
      "pose-gouttieres-alu-sur-mesure-dagneux",
      "reparation-zinguerie-gouttiere-ecully",
    ],
    local: {
      title: "Zinguerie près de chez vous",
      intro:
        "Gouttières, rives et abergements : nos interventions de zinguerie partent de Décines-Charpieu. Quelques communes où nous intervenons :",
      slugs: ["couvreur-meyzieu", "couvreur-decines-charpieu", "couvreur-villeurbanne", "couvreur-lyon"],
    },
  },
  isolation: {
    realisationsTitle: "Réalisations d'isolation",
    featuredRealisations: ["isolation-combles-perdus-laine-roche-chassieu", "isolation-sarking-toiture-caluire"],
    local: {
      title: "Isolation de toiture dans l'Est lyonnais",
      intro:
        "Combles perdus, combles aménagés ou isolation par l'extérieur : nous intervenons notamment dans ces communes proches de notre siège :",
      slugs: ["couvreur-chassieu", "couvreur-decines-charpieu", "couvreur-saint-priest"],
    },
  },
  demoussage: {
    realisationsTitle: "Réalisations de nettoyage et démoussage",
    featuredRealisations: ["demoussage-toiture-ecologique-genas", "demoussage-traitement-hydrofuge-tassin"],
    local: {
      title: "Démoussage autour de Décines-Charpieu",
      intro:
        "Nettoyage et traitement de toiture dans l'Est lyonnais et la métropole, par exemple dans ces communes :",
      slugs: ["couvreur-genas", "couvreur-decines-charpieu", "couvreur-meyzieu"],
    },
  },
  "recherche-de-fuite": {
    realisationsTitle: "Interventions liées aux fuites et infiltrations",
    featuredRealisations: [
      "reparation-fuite-cheminee-brignais",
      "remplacement-tuiles-cassees-orage-venissieux",
      "refection-noue-zinc-francheville",
      "reparation-zinguerie-gouttiere-ecully",
      "refection-etancheite-toit-terrasse-lyon-6",
    ],
    local: {
      title: "Urgence fuite dans l'Est lyonnais",
      intro:
        "Pour une fuite, la proximité compte. Basés à Décines-Charpieu, nous intervenons en priorité dans les communes voisines, ainsi qu'à Lyon et dans la métropole :",
      slugs: [
        "couvreur-decines-charpieu",
        "couvreur-meyzieu",
        "couvreur-chassieu",
        "couvreur-genas",
        "couvreur-saint-priest",
        "couvreur-villeurbanne",
        "couvreur-lyon",
      ],
    },
  },
  "fenetres-de-toit": {
    realisationsTitle: "Réalisations de fenêtres de toit et verrières",
    featuredRealisations: [
      "remplacement-velux-ancien-decines",
      "pose-fenetres-toit-velux-craponne",
      "creation-verriere-toit-lyon-3",
    ],
    local: {
      title: "Fenêtres de toit autour de Décines-Charpieu",
      intro:
        "Notre dernier remplacement de fenêtres de toit a eu lieu à Décines-Charpieu, où se trouve notre siège. Nous intervenons aussi dans les communes voisines :",
      slugs: ["couvreur-decines-charpieu", "couvreur-lyon", "couvreur-villeurbanne", "couvreur-meyzieu"],
    },
  },
};

export function featuredRealisations(key: ServiceKey): Realisation[] {
  return SERVICE_SILOS[key].featuredRealisations
    .map((slug) => getRealisation(slug))
    .filter((item): item is Realisation => Boolean(item));
}

// ─── Validation au build ────────────────────────────────────────────────────

let validated = false;

export function validateServiceContent(): void {
  if (validated) return;
  const localSlugs = new Set<string>(LOCAL_AREA_INDEX.map((area) => area.slug));
  const postSlugs = new Set(posts.map((post) => post.slug));

  for (const item of realisations) {
    if (!item.services && !(item.slug in REALISATION_SERVICE_OVERRIDES) && !(item.category in CATEGORY_SERVICES)) {
      throw new Error(`[service-content] Catégorie sans correspondance : « ${item.category} » (${item.slug})`);
    }
  }
  for (const slug of Object.keys(REALISATION_SERVICE_OVERRIDES)) {
    if (!getRealisation(slug)) throw new Error(`[service-content] Réalisation inconnue : ${slug}`);
  }
  for (const slug of Object.keys(ARTICLE_LINKS)) {
    if (!postSlugs.has(slug)) throw new Error(`[service-content] Article inconnu : ${slug}`);
  }

  for (const service of SERVICES) {
    const silo = SERVICE_SILOS[service.key];
    const count = silo.featuredRealisations.length;
    if (count < 2 || count > 6) {
      throw new Error(`[service-content] ${service.key} : ${count} réalisations (attendu 2 à 6)`);
    }
    for (const slug of silo.featuredRealisations) {
      const item = getRealisation(slug);
      if (!item) throw new Error(`[service-content] Réalisation inconnue : ${slug}`);
      if (!serviceKeysForRealisation(item).includes(service.key)) {
        throw new Error(`[service-content] « ${slug} » n'est pas rattachée au service ${service.key}`);
      }
    }
    for (const slug of silo.local.slugs) {
      if (!localSlugs.has(slug)) throw new Error(`[service-content] Page locale non publiée : ${slug}`);
    }
  }
  validated = true;
}
