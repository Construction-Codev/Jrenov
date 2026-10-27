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
  // CITY_ENTRIES
];
