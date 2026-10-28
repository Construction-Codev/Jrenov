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
  { slug: "couvreur-caluire-et-cuire", city: "Caluire-et-Cuire" },
  { slug: "couvreur-venissieux", city: "Vénissieux" },
  { slug: "couvreur-jonage", city: "Jonage" },
  { slug: "couvreur-dardilly", city: "Dardilly" },
  { slug: "couvreur-vienne", city: "Vienne" },
  { slug: "couvreur-bourgoin-jallieu", city: "Bourgoin-Jallieu" },
  { slug: "couvreur-saint-genis-laval", city: "Saint-Genis-Laval" },
  { slug: "couvreur-rillieux-la-pape", city: "Rillieux-la-Pape" },
  { slug: "couvreur-brignais", city: "Brignais" },
  { slug: "couvreur-francheville", city: "Francheville" },
  { slug: "couvreur-bron", city: "Bron" },
  { slug: "couvreur-tassin-la-demi-lune", city: "Tassin-la-Demi-Lune" },
  { slug: "couvreur-mions", city: "Mions" },
  { slug: "couvreur-saint-quentin-fallavier", city: "Saint-Quentin-Fallavier" },
  { slug: "couvreur-corbas", city: "Corbas" },
  { slug: "couvreur-ecully", city: "Écully" },
  { slug: "couvreur-oullins", city: "Oullins" },
  { slug: "couvreur-sainte-foy-les-lyon", city: "Sainte-Foy-lès-Lyon" },
] as const;
