import { describe, expect, it } from "vitest";
import { LOCAL_AREAS, validateLocalAreas } from "@/lib/local-areas";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";
import { ADDITIONAL_LOCAL_AREAS } from "@/data/local-areas-extra";
import catalogue from "@/data/communes-50km.json";

describe("couverture et qualité des pages SEO locales", () => {
  it("recense les communes du périmètre indicatif sans annoncer un établissement par ville", () => {
    expect(catalogue.communes.length).toBeGreaterThan(500);
    expect(new Set(catalogue.communes.map((c) => c.code)).size).toBe(catalogue.communes.length);
    expect(catalogue.communes.every((c) => c.km >= 0 && c.km <= 50)).toBe(true);
    expect(new Set(catalogue.communes.map((c) => c.dept))).toEqual(new Set(["69", "01", "38", "42"]));
  });

  it("synchronise toutes les routes locales et garantit l'unicité des titres", () => {
    expect(LOCAL_AREAS).toHaveLength(55);
    expect(ADDITIONAL_LOCAL_AREAS).toHaveLength(30);
    expect(LOCAL_AREA_INDEX.map((a) => a.slug)).toEqual(LOCAL_AREAS.map((a) => a.slug));
    expect(new Set(LOCAL_AREAS.map((a) => a.metaTitle)).size).toBe(LOCAL_AREAS.length);
    expect(new Set(LOCAL_AREAS.map((a) => a.metaDescription)).size).toBe(LOCAL_AREAS.length);
    expect(() => validateLocalAreas()).not.toThrow();
  });

  it("traite la charpente, la réparation et la rénovation avec une FAQ propre à chaque page", () => {
    for (const area of LOCAL_AREAS) {
      expect(area.faq.length).toBeGreaterThanOrEqual(4);
      expect(area.faq.some((item) => /charpente|chevrons|liteaux/i.test(item.question + " " + item.answer))).toBe(true);
      expect(area.faq.some((item) => /rénovation|réfection|réparer|réparation/i.test(item.question + " " + item.answer))).toBe(true);
      expect(area.services.items.length).toBeGreaterThanOrEqual(3);
      const all = [area.heroLead, ...area.intro.paragraphs, ...area.context.paragraphs,
        ...area.faq.map((f) => f.answer)].join(" ");
      expect(all).not.toMatch(/n['’]a pas d['’]établissement|n['’]est pas installée? à|pas d['’]agence à/i);
    }
  });

  it("ne relie comme chantier local que les quatre réalisations vérifiées", () => {
    const verified: Record<string, string> = {
      "Craponne": "pose-fenetres-toit-velux-craponne",
      "Dagneux": "pose-gouttieres-alu-sur-mesure-dagneux",
      "Fontaines-sur-Saône": "renovation-faitage-a-sec-fontaines-sur-saone",
      "Champagne-au-Mont-d'Or": "renovation-toiture-tuiles-plat-champagne-au-mont-d-or",
    };
    for (const area of ADDITIONAL_LOCAL_AREAS) {
      expect(area.realisations.localSlugs).toEqual(verified[area.city] ? [verified[area.city]] : []);
      expect(area.realisations.nearbySlugs.length).toBeGreaterThan(0);
      expect(area.faq.length).toBeGreaterThanOrEqual(6);
      expect(area.context.title).toMatch(/charpente/i);
    }
  });
});
