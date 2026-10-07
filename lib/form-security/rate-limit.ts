/**
 * Limitation du nombre de soumissions par adresse IP (fenêtre glissante, en mémoire).
 *
 * LIMITE CONNUE — Vercel serverless : chaque instance de fonction possède sa
 * propre mémoire, et une instance peut être recyclée à tout moment. Ce compteur
 * n'est donc ni partagé ni persistant : il freine les rafales envoyées vers une
 * même instance (cas typique d'un bot qui enchaîne les requêtes), mais ce n'est
 * pas une garantie globale. Pour une limite stricte, utiliser une règle de
 * rate limiting du Vercel Firewall (sans code) ou un stockage partagé
 * (Redis / Upstash) : voir docs/form-security.md.
 */

export interface RateLimitRule {
  /** Nombre maximal de soumissions dans la fenêtre. */
  limit: number;
  /** Durée de la fenêtre en millisecondes. */
  windowMs: number;
}

/** 5 soumissions par tranche de 10 minutes et par IP, pour chaque formulaire. */
export const FORM_RATE_LIMIT: RateLimitRule = { limit: 5, windowMs: 10 * 60 * 1000 };

const MAX_TRACKED_KEYS = 5_000;
const hits = new Map<string, number[]>();

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterSeconds: number };

export function checkRateLimit(key: string, rule: RateLimitRule = FORM_RATE_LIMIT, now = Date.now()): RateLimitResult {
  const windowStart = now - rule.windowMs;
  const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);

  if (recent.length >= rule.limit) {
    hits.set(key, recent);
    const retryAfterMs = recent[0] + rule.windowMs - now;
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  recent.push(now);
  hits.delete(key); // réinsertion en fin de Map : ordre d'ancienneté pour la purge
  hits.set(key, recent);

  // Protection mémoire : on oublie les clés les plus anciennes
  while (hits.size > MAX_TRACKED_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest === undefined) break;
    hits.delete(oldest);
  }

  return { ok: true, remaining: rule.limit - recent.length };
}

/** Réservé aux tests. */
export function resetRateLimits(): void {
  hits.clear();
}

/**
 * IP du client derrière le proxy Vercel.
 * Vercel renseigne `x-real-ip` et place l'IP réelle en premier dans
 * `x-forwarded-for` (valeurs écrasées par la plateforme, non falsifiables
 * depuis le navigateur). En local, ces en-têtes sont généralement absents.
 */
export function getClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for")?.split(",")[0],
    headers.get("x-forwarded-for")?.split(",")[0],
  ];
  for (const candidate of candidates) {
    const ip = candidate?.trim();
    if (ip && ip.length <= 45 && /^[0-9a-f:.]+$/i.test(ip)) return ip;
  }
  return null;
}

/**
 * Clé de limitation : IPv4 complète ; IPv6 réduite à son préfixe /64
 * (un même abonné dispose généralement de tout un /64 et pourrait sinon
 * contourner la limite en changeant d'adresse). Sans IP exploitable,
 * toutes les requêtes partagent la clé « unknown ».
 */
export function rateLimitKey(form: string, ip: string | null): string {
  if (!ip) return `${form}:unknown`;
  const mappedV4 = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mappedV4) return `${form}:${mappedV4[1]}`;
  if (!ip.includes(":")) return `${form}:${ip}`;
  const [head] = ip.split("::");
  const groups = head.split(":").filter(Boolean);
  const full = ip.includes("::") ? [...groups, "0", "0", "0", "0"] : ip.split(":");
  return `${form}:${full.slice(0, 4).join(":").toLowerCase()}::/64`;
}
