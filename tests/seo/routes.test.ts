import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import sitemap from "@/app/sitemap";
import LocalPage, { generateStaticParams as localParams, generateMetadata as localMetadata } from "@/app/[localSlug]/page";
import ProjectPage, { dynamicParams, generateStaticParams as projectParams, generateMetadata as projectRouteMetadata } from "@/app/realisations/[slug]/page";
import ZonesPage from "@/app/zones-intervention/page";
import CoveragePage from "@/app/services/couverture/page";
import { LOCAL_AREAS, validateLocalAreas } from "@/lib/local-areas";
import { LOCAL_GUIDANCE, HUB_GUIDANCE } from "@/data/local-guidance";
import { realisations } from "@/lib/content";
import { SERVICES } from "@/lib/services";
import { projectDrafts } from "@/lib/project-publication";
import { projectMetadata } from "@/lib/project-seo";
import { BUSINESS_ID, businessJsonLd, serviceJsonLd, localPageJsonLd, realisationJsonLd } from "@/lib/structured-data";
import { SITE_URL, serializeJsonLd } from "@/lib/site";
import { getBreadcrumbTrails } from "@/lib/breadcrumb";
import { validateServiceContent } from "@/lib/service-content";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); } }));

describe("Architecture SEO locale", () => {
  it("génère uniquement les routes connues, sans combinaisons service × ville", () => {
    expect(() => validateLocalAreas()).not.toThrow();
    expect(() => validateServiceContent()).not.toThrow();
    expect(localParams().map((item) => item.localSlug).sort()).toEqual(LOCAL_AREAS.map((item) => item.slug).sort());
    for (const slug of Object.keys(LOCAL_GUIDANCE)) expect(LOCAL_AREAS.some((area) => area.slug === slug)).toBe(true);
    const urls = sitemap().map((item) => item.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const service of SERVICES) expect(urls).toContain(`${SITE_URL}${service.href}`);
    for (const city of ["bron", "rillieux-la-pape"]) expect(urls).toContain(`${SITE_URL}/couvreur-${city}`);
    expect(urls).not.toContain(`${SITE_URL}/couvreur-vaulx-en-velin`);
  });

  it("produit des métadonnées locales uniques avec leur canonical", async () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const area of LOCAL_AREAS) {
      const metadata = await localMetadata({ params: Promise.resolve({ localSlug: area.slug }) });
      titles.add(metadata.title); descriptions.add(metadata.description);
      expect(metadata.alternates?.canonical).toBe(`/${area.slug}`);
      const html = renderToStaticMarkup(await LocalPage({ params: Promise.resolve({ localSlug: area.slug }) }));
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      const guidance = LOCAL_GUIDANCE[area.slug];
      if (guidance) expect(html).toContain(guidance.title.replaceAll("&", "&amp;"));
      expect(html).toContain('href="/devis"');
    }
    expect(titles.size).toBe(LOCAL_AREAS.length);
    expect(descriptions.size).toBe(LOCAL_AREAS.length);
  });

  it("répond aux dix communes dans des pages existantes utiles", () => {
    const html = renderToStaticMarkup(createElement(ZonesPage));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    for (const item of HUB_GUIDANCE) {
      expect(html).toContain(`id="${item.id}"`);
      expect(html).toContain(item.city);
    }
    const coverage = renderToStaticMarkup(createElement(CoveragePage));
    expect(coverage.match(/<h1\b/g)).toHaveLength(1);
    expect(coverage).toContain('id="reparation-toiture"');
    expect(coverage).toContain('href="/services/recherche-de-fuite"');
  });
});

describe("Routes des réalisations et données structurées", () => {
  it("refuse les brouillons et slugs inconnus en page et metadata", async () => {
    expect(dynamicParams).toBe(false);
    const params = await projectParams();
    for (const slug of ["inconnu", ...projectDrafts.map((item) => item.slug)]) {
      expect(params.some((item) => item.slug === slug)).toBe(false);
      await expect(ProjectPage({ params: Promise.resolve({ slug }) })).rejects.toThrow("404");
      await expect(projectRouteMetadata({ params: Promise.resolve({ slug }) })).rejects.toThrow("404");
    }
  });

  it("garde un seul H1, la commune, les CTA et des metadata uniques sur toutes les fiches", async () => {
    const titles = new Set(); const descriptions = new Set();
    for (const project of realisations) {
      const metadata = projectMetadata(project);
      titles.add(metadata.title); descriptions.add(metadata.description);
      expect(String(metadata.title).length + " | Jrenov".length).toBeLessThanOrEqual(60);
      expect(metadata.alternates?.canonical).toBe(`/realisations/${project.slug}`);
      const html = renderToStaticMarkup(await ProjectPage({ params: Promise.resolve({ slug: project.slug }) }));
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toContain('href="/devis"');
      expect(html).toContain('href="/contact"');
      expect(html).not.toContain("sous 24h");
    }
    expect(titles.size).toBe(realisations.length); expect(descriptions.size).toBe(realisations.length);
  });

  it("rattache les services et pages locales à un seul établissement réel", () => {
    const business = businessJsonLd();
    expect(business["@type"]).toBe("RoofingContractor");
    expect(business.address.addressLocality).toBe("Décines-Charpieu");
    for (const city of ["Bron", "Vaulx-en-Velin", "Rillieux-la-Pape"]) expect(business.areaServed.some((area) => area.name === city)).toBe(true);
    for (const service of SERVICES) expect(serviceJsonLd(service).provider["@id"]).toBe(BUSINESS_ID);
    for (const area of LOCAL_AREAS) {
      const graph = localPageJsonLd(area);
      expect(graph[1].provider?.["@id"]).toBe(BUSINESS_ID);
      expect(graph[1]).not.toHaveProperty("address");
    }
    const schema = realisationJsonLd(realisations[0], [SERVICES[0]]);
    expect(schema.about[0]["@id"]).toBe(`${SITE_URL}/services/couverture#service`);
    expect(JSON.stringify(business)).not.toMatch(/aggregateRating|review|priceRange/);
    expect(serializeJsonLd({ value: "</script>" })).not.toContain("<");
  });

  it("prépare le fil d’Ariane de toutes les URL indexables", () => {
    const trails = getBreadcrumbTrails();
    for (const entry of sitemap()) {
      const path = new URL(entry.url).pathname;
      if (path !== "/") expect(trails[path]?.at(-1)?.href).toBe(path);
    }
  });
});
