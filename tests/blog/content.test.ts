import { describe, expect, it } from "vitest";
import { posts, frenchDateToIso } from "@/lib/content";
import { ARTICLE_LINKS, validateServiceContent } from "@/lib/service-content";
import { blogPostingJsonLd } from "@/lib/structured-data";
import { SERVICES } from "@/lib/services";

const guides = posts.filter((post) => "topicMonth" in post && typeof post.topicMonth === "string");
const slugs = new Set(posts.map((post) => post.slug));
const localPaths = new Set(["/devis", "/contact", ...SERVICES.map((service) => service.href)]);

describe("articles de conseils JRENOV", () => {
  it("publie une URL unique par article", () => {
    expect(slugs.size).toBe(posts.length);
    expect(posts.every((post) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug))).toBe(true);
  });

  it("complète les dossiers saisonniers de mai à novembre sans antédater la publication", () => {
    expect(guides).toHaveLength(12);
    const months = new Set(guides.map((post) => frenchDateToIso(post.topicMonth)));
    expect([...months].sort()).toEqual([
      "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10", "2026-11",
    ]);
    for (const guide of guides) {
      expect(frenchDateToIso(guide.date)).toBe("2026-11-04");
      expect(guide.author).toBe("JRENOV");
    }
  });

  it("propose de véritables explications avec une structure utile", () => {
    for (const post of guides) {
      expect(post.excerpt.length).toBeGreaterThan(75);
      expect(post.content.join(" ").split(/\s+/).length).toBeGreaterThanOrEqual(330);
      expect(post.content.filter((line) => line.startsWith("### ")).length).toBeGreaterThanOrEqual(5);
      expect(post.content.every((line) => line.trim().length > 0)).toBe(true);
    }
  });

  it("garde les liens éditoriaux valides et rattachés à une prestation", () => {
    for (const post of guides) {
      expect(ARTICLE_LINKS[post.slug]?.services.length).toBeGreaterThan(0);
      for (const paragraph of post.content) {
        for (const match of paragraph.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
          const href = match[1];
          if (href.startsWith("/blog/")) expect(slugs.has(href.slice("/blog/".length))).toBe(true);
          else if (href.startsWith("/")) expect(localPaths.has(href)).toBe(true);
          else expect(href.startsWith("https://www.service-public.fr/")).toBe(true);
        }
      }
    }
    expect(() => validateServiceContent()).not.toThrow();
  });

  it("emploie une entité éditrice et une date de publication cohérente pour les nouveaux articles", () => {
    const post = guides[0];
    const data = blogPostingJsonLd({ ...post, datePublished: frenchDateToIso(post.date) });
    expect(data.author).toEqual({ "@type": "Organization", name: "Jrenov", url: "https://www.jrenov.com" });
    expect(data.datePublished).toBe("2026-11-04");
  });
});
