import { realisations, posts } from "@/lib/content";
import { LOCAL_AREAS } from "@/lib/local-areas";

export type Crumb = { href: string; label: string };

const SECTION_LABELS: Record<string, string> = {
  "/services": "Nos services",
  "/services/couverture": "Rénovation de couverture",
  "/services/zinguerie": "Zinguerie & gouttières",
  "/services/isolation": "Isolation de toiture",
  "/services/demoussage": "Nettoyage & démoussage",
  "/services/recherche-de-fuite": "Recherche de fuite & urgence",
  "/services/fenetres-de-toit": "Fenêtres de toit",
  "/zones-intervention": "Zones d'intervention",
  "/realisations": "Nos réalisations",
  "/blog": "Blog",
  "/devis": "Demande de devis",
  "/contact": "Contact",
  "/plan-du-site": "Plan du site",
  "/mentions-legales": "Mentions légales",
};

/**
 * Fil d'Ariane complet (hors « Accueil ») pour chaque chemin connu.
 * Les pages de contenu utilisent leur titre réel ; les pages locales sont
 * rattachées au hub /zones-intervention. Un chemin absent n'affiche aucun fil.
 */
export function getBreadcrumbTrails(): Record<string, Crumb[]> {
  const trails: Record<string, Crumb[]> = {};

  // Pages simples : fil déduit des segments, chacun devant avoir un libellé
  for (const path of Object.keys(SECTION_LABELS)) {
    const segments = path.split("/").filter(Boolean);
    trails[path] = segments.map((_, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return { href, label: SECTION_LABELS[href] };
    });
  }

  for (const item of realisations) {
    trails[`/realisations/${item.slug}`] = [
      { href: "/realisations", label: SECTION_LABELS["/realisations"] },
      { href: `/realisations/${item.slug}`, label: item.title },
    ];
  }

  for (const post of posts) {
    trails[`/blog/${post.slug}`] = [
      { href: "/blog", label: SECTION_LABELS["/blog"] },
      { href: `/blog/${post.slug}`, label: post.title },
    ];
  }

  for (const area of LOCAL_AREAS) {
    trails[`/${area.slug}`] = [
      { href: "/zones-intervention", label: SECTION_LABELS["/zones-intervention"] },
      { href: `/${area.slug}`, label: `Couvreur à ${area.city}` },
    ];
  }

  return trails;
}
