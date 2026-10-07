import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Jeton de formulaire signé (HMAC-SHA256) émis par GET /api/form-token au
 * chargement du formulaire. Il prouve que la soumission provient d'un formulaire
 * réellement chargé (les appels directs simples n'en ont pas) ; toute modification
 * casse la signature.
 *
 * Règles :
 * - jeton absent, falsifié ou expiré (MAX_AGE_MS = 24 h) → rejet ;
 * - le temps de remplissage ne provoque JAMAIS de rejet : un humain peut envoyer
 *   très vite (autocomplétion, coordonnées préremplies). Un envoi en moins de
 *   FAST_SUBMIT_MS est seulement signalé dans les logs (`fast=1`).
 */
export const FAST_SUBMIT_MS = 3_000;
export const MAX_AGE_MS = 24 * 60 * 60 * 1000;
/** Tolérance d'horloge entre instances serveur. */
const CLOCK_SKEW_MS = 5_000;

export type TokenCheck =
  | { ok: true; /** Signal de log uniquement, jamais un motif de rejet. */ fast: boolean }
  | { ok: false; reason: "token_missing" | "token_invalid" | "token_expired" };

let ephemeralSecret: string | undefined;

/**
 * Secret de signature :
 * 1. FORM_TOKEN_SECRET si défini (recommandé) ;
 * 2. sinon dérivé de RESEND_API_KEY (stable entre instances, jamais exposé) ;
 * 3. sinon secret aléatoire propre au processus (développement uniquement).
 */
function getSecret(): string {
  const dedicated = process.env.FORM_TOKEN_SECRET;
  if (dedicated) return dedicated;
  const resend = process.env.RESEND_API_KEY;
  if (resend) return createHash("sha256").update(`jrenov-form-token:${resend}`).digest("hex");
  ephemeralSecret ??= randomBytes(32).toString("hex");
  return ephemeralSecret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function issueFormToken(now = Date.now()): string {
  const payload = `${now}.${randomBytes(9).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== "string" || !token) return { ok: false, reason: "token_missing" };
  if (token.length > 200) return { ok: false, reason: "token_invalid" };

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "token_invalid" };
  const [issued, nonce, signature] = parts;
  const payload = `${issued}.${nonce}`;

  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return { ok: false, reason: "token_invalid" };
  }

  const issuedAt = Number(issued);
  if (!Number.isFinite(issuedAt) || issuedAt > now + CLOCK_SKEW_MS) return { ok: false, reason: "token_invalid" };

  const age = now - issuedAt;
  if (age > MAX_AGE_MS) return { ok: false, reason: "token_expired" };
  return { ok: true, fast: age < FAST_SUBMIT_MS };
}

/** Empreinte courte et non réversible (IP, etc.) pour les logs. */
export function anonymize(value: string): string {
  return createHmac("sha256", getSecret()).update(`log:${value}`).digest("hex").slice(0, 10);
}
