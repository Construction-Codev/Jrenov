import { LOCAL_AREAS, ZONE_SECTORS, type LocalArea } from "@/data/local-areas";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";
import { realisations, getRealisation, communeName, type Realisation } from "@/lib/content";

export { LOCAL_AREAS, ZONE_SECTORS };
export type { LocalArea };

export function getLocalArea(slug: string): LocalArea | undefined {
  return LOCAL_AREAS.find((area) => area.slug === slug);
}

/** Page locale publiée correspondant à la commune d'une réalisation, si elle existe. */
export function localAreaForCity(city: string): LocalArea | undefined {
  const name = communeName(city);
  return LOCAL_AREAS.find((area) => area.city === name);
}

/** Réalisations d'une commune (comparaison sur le nom de commune normalisé). */
export function realisationsInCommune(name: string): Realisation[] {
  return realisations.filter((item) => communeName(item.city) === name);
}

function requireRealisation(slug: string, context: string): Realisation {
  const item = getRealisation(slug);
  if (!item) throw new Error(`[local-areas] Réalisation inconnue « ${slug} » (${context})`);
  return item;
}

/**
 * Contrôles exécutés au build (generateStaticParams) :
 * - chaque réalisation « locale » se situe bien dans la commune de la page ;
 * - chaque réalisation citée existe dans data/realisations.json ;
 * - les liens vers des pages locales visent des pages publiées ;
 * - slugs, titles, descriptions et H1 sont uniques.
 */
export function validateLocalAreas(): void {
  const slugs = new Set(LOCAL_AREAS.map((area) => area.slug));

  for (const area of LOCAL_AREAS) {
    for (const slug of area.realisations.localSlugs) {
      const item = requireRealisation(slug, area.slug);
      if (communeName(item.city) !== area.city) {
        throw new Error(
          `[local-areas] « ${slug} » (${item.city}) n'est pas une réalisation à ${area.city}`
        );
      }
    }
    for (const slug of area.realisations.nearbySlugs) {
      const item = requireRealisation(slug, area.slug);
      if (communeName(item.city) === area.city) {
        throw new Error(`[local-areas] « ${slug} » est locale, pas voisine (${area.slug})`);
      }
    }
    for (const city of area.nearby.cities) {
      if (city.slug && !slugs.has(city.slug)) {
        throw new Error(`[local-areas] Lien vers une page locale non publiée : ${city.slug}`);
      }
    }
  }

  for (const sector of ZONE_SECTORS) {
    for (const commune of sector.communes) {
      if (commune.slug && !slugs.has(commune.slug)) {
        throw new Error(`[local-areas] Lien vers une page locale non publiée : ${commune.slug}`);
      }
    }
  }

  const index = LOCAL_AREA_INDEX.map((entry) => `${entry.slug}|${entry.city}`).join(",");
  const full = LOCAL_AREAS.map((area) => `${area.slug}|${area.city}`).join(",");
  if (index !== full) {
    throw new Error("[local-areas] data/local-area-index.ts n'est pas synchronisé avec LOCAL_AREAS");
  }

  for (const key of ["slug", "metaTitle", "metaDescription", "h1"] as const) {
    const values = LOCAL_AREAS.map((area) => area[key]);
    if (new Set(values).size !== values.length) {
      throw new Error(`[local-areas] Valeur « ${key} » dupliquée entre pages locales`);
    }
  }
}
