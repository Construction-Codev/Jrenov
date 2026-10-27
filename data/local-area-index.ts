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
  { slug: "couvreur-bron", city: "Bron" },
  { slug: "couvreur-vaulx-en-velin", city: "Vaulx-en-Velin" },
  { slug: "couvreur-rillieux-la-pape", city: "Rillieux-la-Pape" },
  { slug: "couvreur-venissieux", city: "Vénissieux" },
  { slug: "couvreur-caluire-et-cuire", city: "Caluire-et-Cuire" },
  { slug: "couvreur-ecully", city: "Écully" },
  { slug: "couvreur-tassin-la-demi-lune", city: "Tassin-la-Demi-Lune" },
  { slug: "couvreur-corbas", city: "Corbas" },
  { slug: "couvreur-sainte-foy-les-lyon", city: "Sainte-Foy-lès-Lyon" },
  { slug: "couvreur-francheville", city: "Francheville" },
  { slug: "couvreur-mions", city: "Mions" },
  { slug: "couvreur-miribel", city: "Miribel" },
  { slug: "couvreur-beynost", city: "Beynost" },
  { slug: "couvreur-jonage", city: "Jonage" },
  { slug: "couvreur-saint-bonnet-de-mure", city: "Saint-Bonnet-de-Mure" },
  { slug: "couvreur-saint-fons", city: "Saint-Fons" },
  { slug: "couvreur-dardilly", city: "Dardilly" },
  { slug: "couvreur-saint-laurent-de-mure", city: "Saint-Laurent-de-Mure" },
] as const;
