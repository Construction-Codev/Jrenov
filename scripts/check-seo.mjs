import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Contrôle du HTML de production : démarrer `npm run start`, puis `npm run check:seo`.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const canonicalHost = "https://www.jrenov.com";
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert(urls.length > 0);
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
const descriptions = new Set();
const links = new Set();
const images = new Set();

for (const url of urls) {
  assert(url.startsWith(canonicalHost));
  const path = new URL(url).pathname;
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1, `${path}: H1`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `${path}: title manquant ou dupliqué`);
  assert(description && !descriptions.has(description), `${path}: description manquante ou dupliquée`);
  titles.add(title); descriptions.add(description);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: noindex dans le sitemap`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, url, `${path}: canonical`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((match) => JSON.parse(match[1]));
  assert(schemas.some((schema) => schema["@type"] === "RoofingContractor"), `${path}: établissement`);
  if (path !== "/") {
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb?.itemListElement.at(-1).item, url, `${path}: fil d’Ariane`);
  }
  if (path.startsWith("/couvreur-") || (path.startsWith("/services/") && path !== "/services/")) {
    assert(schemas.some((schema) => schema["@type"] === "Service"), `${path}: Service`);
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (!match[1].startsWith("/_next/")) links.add(decode(match[1]));
  }
  for (const match of main.matchAll(/<img\b[^>]+>/g)) {
    assert(/\balt="[^"]+"/.test(match[0]), `${path}: alt manquant`);
    assert((/\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0])) || /position:absolute/.test(match[0]), `${path}: dimensions image`);
    const src = decode(match[0].match(/\bsrc="([^"]+)"/)?.[1] ?? "");
    if (src.startsWith("/")) images.add(src);
  }
}

for (const path of [...links, ...images]) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `Lien/image cassé : ${path}`);
  await response.body?.cancel();
}

const drafts = JSON.parse(await readFile(new URL("../data/project-drafts.json", import.meta.url), "utf8"));
for (const draft of drafts.filter((item) => item.status === "draft")) {
  const response = await fetch(`${base}/realisations/${draft.slug}`);
  assert.equal(response.status, 404, `Brouillon accessible : ${draft.slug}`);
  assert((await response.text()).includes('content="noindex"'), `Brouillon indexable : ${draft.slug}`);
  assert(!xml.includes(draft.slug));
}

console.log(`${urls.length} URL indexables vérifiées : statuts, H1, métadonnées uniques, canonical, JSON-LD.`);
console.log(`${links.size} liens internes et ${images.size} images vérifiés ; ${drafts.filter((item) => item.status === "draft").length} brouillons en 404/noindex.`);
