import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  projectDrafts, projectPhotos, publicationIssues, publishableProjects,
  type ProjectDraft, type ProjectPhoto,
} from "@/lib/project-publication";
import { realisations } from "@/lib/content";
import sitemap from "@/app/sitemap";
import { getBreadcrumbTrails } from "@/lib/breadcrumb";

const approval = { status: "approved" as const, evidence: "Validation explicite de test" };
const project: ProjectDraft = {
  slug: "chantier-test", status: "published", title: "Travaux de couverture", city: "Commune de test",
  intervention: "Couverture", summary: "Résumé confirmé", description: "Travaux confirmés",
  services: ["couverture"], photoIds: ["photo-test"], validation: { city: approval, works: approval },
};
const photo: ProjectPhoto = {
  id: "photo-test", originalName: "original.jpg", sourceUrl: "https://drive.google.com/file/d/test/view",
  sourceFolderId: "test", mimeType: "image/jpeg", validation: approval,
  localPath: "/images/realisations/test.jpg", width: 1200, height: 800, alt: "Toiture en tuiles", projectSlug: project.slug,
};

describe("Publication des nouvelles réalisations", () => {
  it("autorise uniquement une fiche complète et explicitement validée", () => {
    expect(publicationIssues(project, [photo])).toEqual([]);
  });

  it.each([
    { ...project, status: "draft" as const },
    { ...project, city: null },
    { ...project, description: "" },
    { ...project, services: [] },
    { ...project, photoIds: [] },
    { ...project, validation: { ...project.validation, city: { status: "pending" as const, evidence: null } } },
    { ...project, validation: { ...project.validation, works: { status: "approved" as const, evidence: "" } } },
  ])("refuse une fiche incomplète, même marquée publiée (%#)", (invalid) => {
    expect(publicationIssues(invalid, [photo]).length).toBeGreaterThan(0);
  });

  it.each([
    { ...photo, validation: { status: "pending" as const, evidence: null } },
    { ...photo, projectSlug: "autre-chantier" },
    { ...photo, width: 0 }, { ...photo, height: null }, { ...photo, alt: "" },
    { ...photo, localPath: "/images/realisations/../private.jpg" },
    { ...photo, sourceUrl: "" },
  ])("refuse les photos non validées ou mal attribuées (%#)", (invalid) => {
    expect(publicationIssues(project, [invalid]).length).toBeGreaterThan(0);
  });

  it("conserve les brouillons hors catalogue, sitemap et fil d’Ariane", () => {
    const urls = sitemap().map((item) => item.url);
    const trails = getBreadcrumbTrails();
    expect(publishableProjects().every((project) => publicationIssues(project).length === 0)).toBe(true);
    for (const draft of projectDrafts.filter((item) => item.status === "draft")) {
      expect(realisations.some((item) => item.slug === draft.slug)).toBe(false);
      expect(urls.some((url) => url.endsWith(`/realisations/${draft.slug}`))).toBe(false);
      expect(trails[`/realisations/${draft.slug}`]).toBeUndefined();
    }
  });

  it("trace le nom original et la provenance des photos, sans commune ni date déduites", () => {
    expect(projectPhotos.length).toBeGreaterThan(0);
    expect(new Set(projectPhotos.map((item) => item.id)).size).toBe(projectPhotos.length);
    for (const photo of projectPhotos) {
      expect(photo.originalName).not.toBe("");
      expect(photo.sourceUrl).toContain("https://drive.google.com/file/d/");
      expect(photo.sourceFolderId).not.toBe("");
      expect(["pending", "approved", "rejected"]).toContain(photo.validation.status);
      if (photo.validation.status === "approved") expect(photo.validation.evidence?.trim()).toBeTruthy();
    }
    for (const draft of projectDrafts) {
      for (const id of draft.photoIds) expect(projectPhotos.some((photo) => photo.id === id)).toBe(true);
    }
  });

  it("exige un fichier local réel pour toute future photo publiée", () => {
    for (const project of publishableProjects()) {
      for (const id of project.photoIds) {
        const photo = projectPhotos.find((item) => item.id === id)!;
        expect(existsSync(join(process.cwd(), "public", photo.localPath!))).toBe(true);
      }
    }
  });
});
