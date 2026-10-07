import { promises as dns } from "node:dns";

/**
 * Vérification que le domaine d'une adresse peut recevoir des emails.
 *
 * - MX présent → accepté.
 * - Domaine inexistant (NXDOMAIN) → refusé.
 * - Domaine existant sans MX ni A/AAAA → refusé (aucun serveur ne peut recevoir).
 * - Domaine sans MX mais avec A/AAAA → accepté (« MX implicite », RFC 5321).
 * - Timeout, SERVFAIL, réseau indisponible… → accepté (« fail-open ») :
 *   une panne DNS n'est jamais considérée comme une preuve de fraude.
 *
 * Le délai est borné (MX_TIMEOUT_MS) et les résultats sont mis en cache
 * quelques minutes pour ne pas refaire la requête à chaque soumission.
 */

export type DomainCheck = "ok" | "no_mail_server" | "unknown";

export interface DnsResolver {
  resolveMx(domain: string): Promise<unknown[]>;
  resolve4(domain: string): Promise<unknown[]>;
  resolve6(domain: string): Promise<unknown[]>;
}

export const MX_TIMEOUT_MS = 1500;
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { result: DomainCheck; expires: number }>();

/** Codes DNS signifiant « le domaine ou l'enregistrement n'existe pas ». */
const NOT_FOUND_CODES = new Set(["ENOTFOUND", "ENODATA", "ENONAME", "NXDOMAIN"]);

class DnsTimeout extends Error {}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new DnsTimeout()), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function isNotFound(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code;
  return typeof code === "string" && NOT_FOUND_CODES.has(code);
}

async function hasRecords(lookup: () => Promise<unknown[]>, timeoutMs: number): Promise<boolean | null> {
  try {
    const records = await withTimeout(lookup(), timeoutMs);
    return records.length > 0;
  } catch (error) {
    if (isNotFound(error)) return false;
    return null; // erreur indéterminée (timeout, SERVFAIL…)
  }
}

export async function checkEmailDomain(
  domain: string,
  resolver: DnsResolver = dns,
  timeoutMs = MX_TIMEOUT_MS
): Promise<DomainCheck> {
  const key = domain.toLowerCase();
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.result;

  let result: DomainCheck;
  const mx = await hasRecords(() => resolver.resolveMx(key), timeoutMs);
  if (mx === true) {
    result = "ok";
  } else if (mx === null) {
    result = "unknown";
  } else {
    // Pas de MX : on accepte un MX implicite (A ou AAAA)
    const [a, aaaa] = await Promise.all([
      hasRecords(() => resolver.resolve4(key), timeoutMs),
      hasRecords(() => resolver.resolve6(key), timeoutMs),
    ]);
    if (a === true || aaaa === true) result = "ok";
    else if (a === null || aaaa === null) result = "unknown";
    else result = "no_mail_server";
  }

  // Les résultats indéterminés ne sont pas mis en cache
  if (result !== "unknown") cache.set(key, { result, expires: Date.now() + CACHE_TTL_MS });
  return result;
}

/** Réservé aux tests. */
export function clearDomainCache(): void {
  cache.clear();
}
