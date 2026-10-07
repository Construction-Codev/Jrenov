import { BUSINESS, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { realisations, communeName } from "@/lib/content";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Communes desservies : le siège + les communes où une réalisation est publiée.
 * « Lyon 6e (69006) » → « Lyon » ; « Villeurbanne (69100) » → « Villeurbanne ».
 */
export function servedCities(): string[] {
  const cities = realisations.map((item) => communeName(item.city));
  return Array.from(new Set([BUSINESS.address.addressLocality, ...cities]));
}

/** Entité principale Jrenov (RoofingContractor). Uniquement des données vérifiées. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: absoluteUrl(BUSINESS.logoPath),
    image: absoluteUrl(BUSINESS.logoPath),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days,
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    areaServed: servedCities().map((name) => ({ "@type": "City", name })),
    sameAs: BUSINESS.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Service d'une page /services/* : fournisseur = entité Jrenov, sans prix ni avis. */
export function serviceJsonLd(service: { schemaName: string; description: string; href: string }) {
  const url = absoluteUrl(service.href);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.schemaName,
    serviceType: service.schemaName,
    description: service.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: servedCities().map((name) => ({ "@type": "City", name })),
  };
}

/**
 * Page locale : WebPage + Service rattachés à l'entité unique Jrenov.
 * Aucune adresse locale : le seul établissement reste celui de Décines-Charpieu.
 */
export function localPageJsonLd(area: {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
}) {
  const url = absoluteUrl(`/${area.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: area.metaTitle,
      description: area.metaDescription,
      inLanguage: "fr-FR",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${url}#service` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Couverture et toiture à ${area.city}`,
      serviceType: "Couvreur",
      url,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: area.city },
    },
  ];
}

/** Article de blog : uniquement les champs réellement disponibles (pas d'image). */
export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  datePublished?: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    ...(post.datePublished ? { datePublished: post.datePublished } : {}),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: url,
    inLanguage: "fr-FR",
  };
}
