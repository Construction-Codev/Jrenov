import { describe, expect, it } from "vitest";
import { frenchDateToIso, sortByFrenchDateNewestFirst } from "@/lib/content";

describe("chronologie des réalisations et articles", () => {
  it("interprète les mois français et les dates complètes sans inventer de jour", () => {
    expect(frenchDateToIso("Septembre 2026")).toBe("2026-09");
    expect(frenchDateToIso("27 Octobre 2026")).toBe("2026-10-27");
    expect(frenchDateToIso("date inconnue")).toBeUndefined();
  });

  it("affiche la plus récente en premier, sans modifier la liste originale", () => {
    const entries = [
      { slug: "ancien", date: "Janvier 2026" },
      { slug: "recent", date: "Septembre 2026" },
      { slug: "milieu", date: "Mai 2026" },
    ];
    const sorted = sortByFrenchDateNewestFirst(entries);
    expect(sorted.map((entry) => entry.slug)).toEqual(["recent", "milieu", "ancien"]);
    expect(entries.map((entry) => entry.slug)).toEqual(["ancien", "recent", "milieu"]);
  });

  it("départage les dates identiques par ordre d'ajout et place les dates inconnues en dernier", () => {
    const sorted = sortByFrenchDateNewestFirst([
      { slug: "premier-juin", date: "Juin 2026" },
      { slug: "sans-date", date: "" },
      { slug: "dernier-juin", date: "Juin 2026" },
      { slug: "27-octobre", date: "27 Octobre 2026" },
      { slug: "septembre", date: "Septembre 2026" },
    ]);
    expect(sorted.map((entry) => entry.slug)).toEqual([
      "27-octobre",
      "septembre",
      "dernier-juin",
      "premier-juin",
      "sans-date",
    ]);
  });
});
