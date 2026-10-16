import legacyRealisations from "@/data/realisations.json";
import legacyProjectSlugs from "@/data/legacy-project-slugs.json";
import posts from "@/data/post.json";
import { projectPhotos, publishableProjects } from "@/lib/project-publication";

// Le catalogue historique est figé aux slugs déjà publiés sur master (69ba43b).
// Toute nouvelle fiche doit emprunter le contrôle de validation.
if (legacyRealisations.some((project) => !legacyProjectSlugs.includes(project.slug))) {
  throw new Error("[content] Nouvelle fiche dans le catalogue historique : utiliser data/project-drafts.json");
}

/** Catalogue historique déjà publié sur master, sans nouvelle validation implicite. */
export const realisations: Realisation[] = [
  ...legacyRealisations,
  ...publishableProjects().map((project): Realisation => {
    const photos = project.photoIds.map((id) => projectPhotos.find((photo) => photo.id === id)!);
    return {
      slug: project.slug,
      title: project.title!,
      city: project.city!,
      category: project.intervention!,
      summary: project.summary!,
      description: project.description!,
      image: photos[0].localPath!,
      date: project.date ?? "",
      duration: project.duration ?? "",
      services: project.services,
      photos: photos.map((photo) => ({ src: photo.localPath!, width: photo.width!, height: photo.height!, alt: photo.alt! })),
    };
  }),
];

if (new Set(realisations.map((item) => item.slug)).size !== realisations.length) {
  throw new Error("[content] Slug de réalisation dupliqué entre le catalogue historique et les nouvelles fiches");
}

export { posts };

const FRENCH_MONTHS: Record<string, string> = {
  janvier: "01",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  decembre: "12",
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Convertit une date française des fichiers de données en date W3C,
 * sans inventer de précision :
 * - « 15 Février 2026 » → « 2026-02-15 »
 * - « Janvier 2026 »    → « 2026-01 »
 * Retourne undefined si la date n'est pas exploitable.
 */
export function frenchDateToIso(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const parts = normalize(value).split(/\s+/);

  if (parts.length === 3) {
    const [day, month, year] = parts;
    const mm = FRENCH_MONTHS[month];
    if (mm && /^\d{1,2}$/.test(day) && /^\d{4}$/.test(year)) {
      return `${year}-${mm}-${day.padStart(2, "0")}`;
    }
  }

  if (parts.length === 2) {
    const [month, year] = parts;
    const mm = FRENCH_MONTHS[month];
    if (mm && /^\d{4}$/.test(year)) return `${year}-${mm}`;
  }

  return undefined;
}

/** Date ISO la plus récente d'une liste (comparaison lexicographique valable en ISO). */
export function latestIsoDate(dates: (string | undefined)[]): string | undefined {
  return dates.filter((d): d is string => Boolean(d)).sort().at(-1);
}

export type Realisation = (typeof legacyRealisations)[number] & {
  services?: import("@/lib/services").ServiceKey[];
  photos?: { src: string; width: number; height: number; alt: string }[];
};
export type Post = (typeof posts)[number];

export function getRealisation(slug: string): Realisation | undefined {
  return realisations.find((item) => item.slug === slug);
}

/**
 * Nom de commune sans code postal ni arrondissement :
 * « Lyon 6e (69006) » → « Lyon » ; « Villeurbanne (69100) » → « Villeurbanne ».
 */
export function communeName(city: string): string {
  return city
    .replace(/\s*\(\d{5}\)\s*$/, "")
    .replace(/^Lyon\s+\d+e$/, "Lyon")
    .trim();
}
