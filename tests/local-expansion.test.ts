import { describe, expect, it } from "vitest";
import { LOCAL_AREAS, validateLocalAreas } from "@/lib/local-areas";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";
import { EXPANSION_LOCAL_AREAS } from "@/data/local-expansion";
import { realisations, communeName } from "@/lib/content";
import { SERVICES } from "@/lib/services";

const bySlug = new Map(realisations.map((item) => [item.slug, item]));
const serviceSlugs = new Set(SERVICES.map((service) => service.key));

describe("Pages SEO locales ajoutées", () => {
  it("indexe 18 nouvelles communes distinctes et respecte les invariants existants", () => {
    expect(EXPANSION_LOCAL_AREAS).toHaveLength(18);
    expect(LOCAL_AREAS).toHaveLength(25);
    expect(LOCAL_AREA_INDEX.map((a) => [a.slug, a.city]))
      .toEqual(LOCAL_AREAS.map((a) => [a.slug, a.city]));
    expect(new Set(LOCAL_AREAS.map((a) => a.slug)).size).toBe(LOCAL_AREAS.length);
    expect(new Set(LOCAL_AREAS.map((a) => a.city)).size).toBe(LOCAL_AREAS.length);
    expect(() => validateLocalAreas()).not.toThrow();
  });

  it("ne présente jamais une réalisation d'une autre ville comme chantier local", () => {
    for (const area of EXPANSION_LOCAL_AREAS) {
      for (const slug of area.realisations.localSlugs) {
        const item = bySlug.get(slug);
        expect(item, slug).toBeDefined();
        expect(communeName(item?.city ?? ""), slug).toBe(area.city);
      }
      for (const slug of area.realisations.nearbySlugs) {
        const item = bySlug.get(slug);
        expect(item, slug).toBeDefined();
        expect(communeName(item?.city ?? ""), slug).not.toBe(area.city);
      }
    }
  });

  it("fournit un contenu distinct, plusieurs services réels et des questions locales pour chaque ville", () => {
    for (const area of EXPANSION_LOCAL_AREAS) {
      expect(area.services.items.length, area.slug).toBeGreaterThanOrEqual(5);
      expect(new Set(area.services.items.map((entry) => entry.service)).size).toBe(area.services.items.length);
      expect(area.services.items.every((entry) => serviceSlugs.has(entry.service))).toBe(true);
      expect(area.intro.paragraphs.every((p) => p.length > 90), area.slug).toBe(true);
      expect(area.context.paragraphs.every((p) => p.length > 90), area.slug).toBe(true);
      expect(area.issues.items).toHaveLength(3);
      expect(area.faq).toHaveLength(2);
      expect(area.metaDescription).toContain("Décines-Charpieu");
      expect(area.h1).toContain(area.city);
    }
  });

  it("n'affirme pas disposer d'une réalisation locale dans les communes sans chantier", () => {
    const missing = EXPANSION_LOCAL_AREAS.filter((area) => area.realisations.localSlugs.length === 0);
    expect(missing).toHaveLength(11);
    for (const area of missing) {
      expect(area.realisations.title).toBe("Des chantiers documentés dans le secteur");
      expect(area.realisations.nearbySlugs.length).toBeGreaterThan(0);
    }
  });
});
