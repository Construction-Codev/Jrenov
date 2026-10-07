import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { realisations, posts, frenchDateToIso, latestIsoDate } from "@/lib/content";
import { LOCAL_AREAS } from "@/lib/local-areas";
import { SERVICES } from "@/lib/services";

/**
 * Sitemap généré depuis les données du projet.
 * - Les dates proviennent de data/realisations.json et data/post.json (aucune date inventée).
 * - Les pages sans date exploitable (dont les pages locales) n'ont pas de lastModified.
 * - /mentions-legales est exclue (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const realisationEntries = realisations.map((item) => ({
    url: absoluteUrl(`/realisations/${item.slug}`),
    lastModified: frenchDateToIso(item.date),
  }));

  const postEntries = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: frenchDateToIso(post.date),
  }));

  const staticPaths = [
    "/",
    "/services",
    ...SERVICES.map((service) => service.href),
    "/zones-intervention",
    ...LOCAL_AREAS.map((area) => `/${area.slug}`),
    "/contact",
    "/devis",
    "/plan-du-site",
  ];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    {
      url: absoluteUrl("/realisations"),
      lastModified: latestIsoDate(realisationEntries.map((e) => e.lastModified)),
    },
    ...realisationEntries,
    {
      url: absoluteUrl("/blog"),
      lastModified: latestIsoDate(postEntries.map((e) => e.lastModified)),
    },
    ...postEntries,
  ];
}
