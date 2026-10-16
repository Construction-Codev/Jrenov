import { afterEach, describe, expect, it, vi } from "vitest";
import legacy from "@/data/realisations.json";
import drafts from "@/data/project-drafts.json";

afterEach(() => {
  vi.doUnmock("@/data/realisations.json");
  vi.doUnmock("@/data/project-drafts.json");
  vi.resetModules();
});

describe("Contrôles bloquants au build", () => {
  it("empêche une nouvelle fiche de contourner la validation via le catalogue historique", async () => {
    vi.resetModules();
    vi.doMock("@/data/realisations.json", () => ({ default: [...legacy, { ...legacy[0], slug: "nouveau-chantier-non-valide" }] }));
    await expect(import("@/lib/content")).rejects.toThrow("Nouvelle fiche dans le catalogue historique");
  });

  it("fait échouer le build si le statut published est posé avant validation", async () => {
    vi.resetModules();
    vi.doMock("@/data/project-drafts.json", () => ({ default: [{ ...drafts[0], status: "published" }] }));
    await expect(import("@/lib/content")).rejects.toThrow("Commune non confirmée");
  });
});
