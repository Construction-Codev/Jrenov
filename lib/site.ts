import type { Metadata } from "next";

/**
 * Source de vérité unique pour l'identité de Jrenov et les URL absolues.
 * Toute URL SEO (canonical, sitemap, JSON-LD, Open Graph, breadcrumb) doit partir de SITE_URL.
 */
export const SITE_URL = "https://www.jrenov.com";
export const SITE_NAME = "Jrenov";

export const DEFAULT_TITLE = "Jrenov | Couvreur zingueur de l'Est lyonnais, à Décines-Charpieu";
export const DEFAULT_DESCRIPTION =
  "Jrenov, couvreur-zingueur basé à Décines-Charpieu : rénovation, réparation et entretien de toiture dans l'Est lyonnais et la métropole de Lyon. Devis gratuit.";

export const BUSINESS = {
  name: "Jrenov",
  legalName: "JRENOV",
  founder: "Jason Robba",
  // Date d'immatriculation indiquée dans les mentions légales (07/05/2018)
  foundingDate: "2018-05-07",
  phoneDisplay: "04 65 84 88 85",
  phoneE164: "+33465848885",
  email: "contact@jrenov.com",
  address: {
    streetAddress: "48 Ancien Chemin des Marais",
    postalCode: "69150",
    addressLocality: "Décines-Charpieu",
    addressCountry: "FR",
  },
  // Horaires affichés sur la page contact
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61593675344403",
    "https://instagram.com/jrenov69",
  ],
  logoPath: "/logo-512.png",
} as const;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Chantier de couverture réalisé par Jrenov",
};

/** Construit une URL absolue sur le domaine canonique. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Metadata d'une page : title, description, canonical, Open Graph et Twitter
 * cohérents entre eux. Le title passe par le template du layout racine
 * (« %s | Jrenov ») sauf si `absoluteTitle` est fourni.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  type = "website",
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/**
 * Sérialisation JSON-LD sûre (recommandation Next.js) : échappe « < »
 * pour empêcher toute fermeture prématurée de la balise <script>.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
