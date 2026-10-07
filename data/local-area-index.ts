/**
 * Index léger des pages locales publiées (slug + commune), utilisable dans les
 * Client Components sans embarquer le contenu éditorial de data/local-areas.ts.
 * Sa cohérence avec LOCAL_AREAS est vérifiée au build (lib/local-areas.ts).
 */
export const LOCAL_AREA_INDEX = [
  { slug: "couvreur-decines-charpieu", city: "Décines-Charpieu" },
  { slug: "couvreur-meyzieu", city: "Meyzieu" },
  { slug: "couvreur-villeurbanne", city: "Villeurbanne" },
  { slug: "couvreur-lyon", city: "Lyon" },
  { slug: "couvreur-genas", city: "Genas" },
  { slug: "couvreur-chassieu", city: "Chassieu" },
  { slug: "couvreur-saint-priest", city: "Saint-Priest" },
] as const;
