import realisations from "@/data/realisations.json";
import posts from "@/data/post.json";

export { realisations, posts };

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

export type Realisation = (typeof realisations)[number];
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
