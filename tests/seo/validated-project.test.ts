import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// Cas synthétique : teste le parcours de publication sans approuver de vraie photo.
vi.mock("@/data/project-drafts.json", () => ({ default: [{
  slug: "chantier-valide-test", status: "published", title: "Réparation ponctuelle",
  city: "Commune de test", intervention: "Couverture", summary: "Résumé de test validé",
  description: "Description synthétique des travaux", services: ["couverture", "zinguerie"],
  photoIds: ["photo-test"], validation: {
    city: { status: "approved", evidence: "Validation synthétique commune" },
    works: { status: "approved", evidence: "Validation synthétique travaux" },
  },
}] }));
vi.mock("@/data/photo-registry.json", () => ({ default: [{
  id: "photo-test", originalName: "test.jpg", sourceUrl: "https://drive.google.com/file/d/test/view",
  sourceFolderId: "test", mimeType: "image/jpeg", validation: { status: "approved", evidence: "Validation synthétique photo" },
  localPath: "/images/realisations/tuiles.jpg", width: 1200, height: 800,
  alt: "Photo synthétique de test", projectSlug: "chantier-valide-test",
}] }));

import ProjectPage, { generateStaticParams, generateMetadata } from "@/app/realisations/[slug]/page";
import sitemap from "@/app/sitemap";

describe("Fiche validée avec galerie", () => {
  it("entre dans le routeur et le sitemap uniquement après les validations", async () => {
    expect(await generateStaticParams()).toContainEqual({ slug: "chantier-valide-test" });
    expect(sitemap().some((entry) => entry.url.endsWith("/realisations/chantier-valide-test"))).toBe(true);
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "chantier-valide-test" }) });
    expect(metadata.alternates?.canonical).toBe("/realisations/chantier-valide-test");
  });

  it("affiche les photos dimensionnées, les prestations et CTA sans inventer date ou durée", async () => {
    const html = renderToStaticMarkup(await ProjectPage({ params: Promise.resolve({ slug: "chantier-valide-test" }) }));
    expect(html).toContain('width="1200"');
    expect(html).toContain('height="800"');
    expect(html).toContain('alt="Photo synthétique de test"');
    expect(html).toContain('href="/services/couverture"');
    expect(html).toContain('href="/services/zinguerie"');
    expect(html).toContain('href="/devis"');
    expect(html).not.toContain("Durée :");
    expect(html).not.toContain("datePublished");
    expect(html).not.toContain("drive.google.com");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });
});
