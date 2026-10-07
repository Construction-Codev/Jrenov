#!/usr/bin/env node
/**
 * Contrôle anti-duplication des pages locales (/couvreur-*) ou services (PREFIX=/services/).
 *
 * Usage : démarrer le site (npm run build && npm run start), puis
 *   npm run check:local-duplication            (BASE_URL=http://localhost:3000 par défaut)
 *   BASE_URL=http://localhost:3918 npm run check:local-duplication
 *   PREFIX=/services/ npm run check:local-duplication
 *
 * Le script lit /sitemap.xml, récupère les pages locales rendues et compare
 * uniquement le contenu de <main> (header, footer et flux Facebook exclus) :
 *  1. blocs de texte identiques ≥ MIN_CHARS entre deux pages ;
 *  2. passages communs ≥ MIN_CHARS à l'intérieur de blocs différents ;
 *  3. titles et descriptions trop proches (nom de commune neutralisé) ;
 *  4. questions de FAQ répétées (nom de commune neutralisé).
 * Les composants communs (étapes, CTA) font moins de MIN_CHARS par bloc et
 * ne déclenchent donc pas d'alerte. Code de sortie 1 si un problème est trouvé.
 */

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const MIN_CHARS = Number(process.env.MIN_CHARS ?? 100);
// Préfixe des pages à comparer : « /couvreur- » (pages locales) ou « /services/ » (pages services)
const PREFIX = process.env.PREFIX ?? "/couvreur-";
const SHINGLE_WORDS = 8;
const SIMILARITY_THRESHOLD = 0.6;

const ENTITIES = { "&amp;": "&", "&#x27;": "'", "&apos;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };

function decode(text) {
  return text.replace(/&(amp|#x27|apos|quot|lt|gt|nbsp);/g, (m) => ENTITIES[m] ?? m);
}

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

function extract(html) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const withoutScripts = main.replace(/<script[\s\S]*?<\/script>/g, "");
  const faq = [...withoutScripts.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
  );
  const blocks = decode(
    withoutScripts
      .replace(/<\/(p|li|h1|h2|h3|summary|a|span|div)>/g, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length >= 20);
  return { title, description, faq, blocks };
}

function words(text) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/[a-z0-9]+/g) ?? [];
}

function neutralize(text, city) {
  return text.split(city).join("{ville}");
}

function jaccard(a, b) {
  const A = new Set(words(a));
  const B = new Set(words(b));
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / (A.size + B.size - inter || 1);
}

/** Passages communs de ≥ MIN_CHARS entre deux blocs (fusion des shingles consécutifs). */
function sharedPassages(blockA, blockB) {
  const tokensA = blockA.split(" ");
  const tokensB = blockB.split(" ");
  const shinglesB = new Set();
  for (let i = 0; i + SHINGLE_WORDS <= tokensB.length; i++) {
    shinglesB.add(tokensB.slice(i, i + SHINGLE_WORDS).join(" ").toLowerCase());
  }
  const passages = [];
  let start = -1;
  for (let i = 0; i + SHINGLE_WORDS <= tokensA.length + 1; i++) {
    const hit = i + SHINGLE_WORDS <= tokensA.length && shinglesB.has(tokensA.slice(i, i + SHINGLE_WORDS).join(" ").toLowerCase());
    if (hit && start === -1) start = i;
    if (!hit && start !== -1) {
      const passage = tokensA.slice(start, i - 1 + SHINGLE_WORDS).join(" ");
      if (passage.length >= MIN_CHARS) passages.push(passage);
      start = -1;
    }
  }
  return passages;
}

async function main() {
  const sitemap = await get("/sitemap.xml");
  const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)]
    .map((m) => m[1])
    .filter((path) => path.startsWith(PREFIX) && path.length > PREFIX.length);
  if (paths.length < 2) throw new Error(`Moins de deux pages « ${PREFIX}* » trouvées dans le sitemap.`);

  const pages = [];
  for (const path of paths) {
    const data = extract(await get(path));
    const city = data.title.match(/Couvreur à ([^–|-]+?)\s*[–|-]/)?.[1]?.trim() ?? path;
    pages.push({ path, city, ...data });
  }

  const problems = [];

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i];
      const b = pages[j];
      const pair = `${a.path} ↔ ${b.path}`;

      // 1 & 2. Blocs identiques et passages communs
      const seen = new Set();
      for (const blockA of a.blocks) {
        for (const blockB of b.blocks) {
          const na = neutralize(blockA, a.city);
          const nb = neutralize(blockB, b.city);
          if (na === nb && na.length >= MIN_CHARS) {
            if (!seen.has(na)) problems.push(`[bloc identique] ${pair}\n    « ${na.slice(0, 160)}… »`);
            seen.add(na);
            continue;
          }
          for (const passage of sharedPassages(na, nb)) {
            if (!seen.has(passage)) problems.push(`[passage commun ${passage.length} car.] ${pair}\n    « ${passage.slice(0, 160)}… »`);
            seen.add(passage);
          }
        }
      }

      // 3. Titles et descriptions
      const titleSim = jaccard(neutralize(a.title, a.city), neutralize(b.title, b.city));
      const descSim = jaccard(neutralize(a.description, a.city), neutralize(b.description, b.city));
      if (titleSim > SIMILARITY_THRESHOLD) problems.push(`[titles proches ${titleSim.toFixed(2)}] ${pair}`);
      if (descSim > SIMILARITY_THRESHOLD) problems.push(`[descriptions proches ${descSim.toFixed(2)}] ${pair}`);

      // 4. FAQ répétées
      for (const qa of a.faq) {
        for (const qb of b.faq) {
          if (jaccard(neutralize(qa, a.city), neutralize(qb, b.city)) > 0.8) {
            problems.push(`[FAQ répétée] ${pair}\n    « ${qa} » / « ${qb} »`);
          }
        }
      }
    }
  }

  console.log(`Pages « ${PREFIX}* » analysées (${pages.length}) : ${pages.map((p) => p.path).join(", ")}`);
  console.log("\nSimilarité maximale (Jaccard, commune neutralisée) :");
  let maxTitle = 0;
  let maxDesc = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      maxTitle = Math.max(maxTitle, jaccard(neutralize(pages[i].title, pages[i].city), neutralize(pages[j].title, pages[j].city)));
      maxDesc = Math.max(maxDesc, jaccard(neutralize(pages[i].description, pages[i].city), neutralize(pages[j].description, pages[j].city)));
    }
  }
  console.log(`  titles : ${maxTitle.toFixed(2)}   descriptions : ${maxDesc.toFixed(2)}   (seuil ${SIMILARITY_THRESHOLD})`);

  if (problems.length === 0) {
    console.log(`\n✅ Aucune duplication détectée (blocs ≥ ${MIN_CHARS} caractères, titles, descriptions, FAQ).`);
    return;
  }
  console.log(`\n❌ ${problems.length} problème(s) :\n`);
  for (const problem of problems) console.log(`- ${problem}`);
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
