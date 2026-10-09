import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { maskEmail } from "./email";
import { checkEmailDomain } from "./mx";
import { anonymize, verifyFormToken } from "./form-token";
import { FORM_RATE_LIMIT, checkRateLimit, getClientIp, rateLimitKey } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";
import { GENERIC_ERROR, userMessageFor, type ValidationResult } from "./validation";

/**
 * Chaîne de protection commune aux formulaires contact et devis.
 * Ordre : origine → type → taille → JSON → rate limit → honeypot → jeton signé
 * → validation des champs → Turnstile (si activé) → domaine email (MX) → envoi.
 * Une soumission refusée n'appelle JAMAIS la fonction d'envoi.
 */

export type FormName = "contact" | "devis";

/** Taille maximale du corps de requête (les vrais envois font moins de 5 Ko). */
export const MAX_PAYLOAD_BYTES = 16 * 1024;

interface SubmissionConfig<T extends { email: string }> {
  form: FormName;
  validate: (raw: unknown) => ValidationResult<T>;
  send: (data: T) => Promise<void>;
}

/** Log sobre : formulaire, issue, raison, IP anonymisée. Jamais de donnée saisie. */
function log(form: FormName, outcome: "sent" | "rejected" | "error", reason: string | null, ipId: string, extra = "") {
  const line = `[form] ${form} ${outcome}${reason ? `: ${reason}` : ""} ip=${ipId}${extra ? ` ${extra}` : ""}`;
  if (outcome === "sent") console.info(line);
  else console.warn(line);
}

function json(status: number, body: Record<string, unknown>, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

const genericError = (status = 400) => json(status, { error: GENERIC_ERROR });

/** Refuse les requêtes directes ne provenant pas d'une page du site. */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set(
    [
      request.headers.get("x-forwarded-host"),
      request.headers.get("host"),
      new URL(SITE_URL).host,
      "jrenov.com",
    ].filter((value): value is string => Boolean(value))
  );
  return allowed.has(originHost);
}

async function readBody(request: Request): Promise<{ ok: true; raw: unknown } | { ok: false; reason: string; status: number }> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_PAYLOAD_BYTES) return { ok: false, reason: "payload_too_large", status: 413 };

  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > MAX_PAYLOAD_BYTES) return { ok: false, reason: "payload_too_large", status: 413 };

  try {
    return { ok: true, raw: JSON.parse(text) };
  } catch {
    return { ok: false, reason: "invalid_json", status: 400 };
  }
}

export async function handleFormSubmission<T extends { email: string }>(
  request: Request,
  { form, validate, send }: SubmissionConfig<T>
): Promise<Response> {
  const ip = getClientIp(request.headers);
  const ipId = ip ? anonymize(ip) : "unknown";
  const reject = (reason: string, response: Response) => {
    log(form, "rejected", reason, ipId);
    return response;
  };

  if (!isAllowedOrigin(request)) return reject("bad_origin", genericError(403));
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reject("bad_content_type", genericError(415));
  }

  const body = await readBody(request);
  if (!body.ok) return reject(body.reason, genericError(body.status));

  const limit = checkRateLimit(rateLimitKey(form, ip), FORM_RATE_LIMIT);
  if (!limit.ok) {
    return reject(
      "rate_limit",
      json(
        429,
        { error: "Trop de demandes ont été envoyées. Merci de réessayer plus tard ou de nous appeler au 04 65 84 88 85." },
        { "Retry-After": String(limit.retryAfterSeconds) }
      )
    );
  }

  const raw = (body.raw ?? {}) as Record<string, unknown>;

  // Honeypot rempli : faux succès silencieux, rien n'est envoyé
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return reject("honeypot", json(200, { success: true }));
  }

  const token = verifyFormToken(raw.formToken);
  if (!token.ok) return reject(token.reason, genericError());

  const result = validate(raw);
  if (!result.ok) {
    return reject(`${result.reason} (${result.field})`, json(400, { error: userMessageFor(result.reason, result.field) }));
  }

  const turnstile = await verifyTurnstile(raw.turnstileToken, ip);
  if (!turnstile.ok) return reject(turnstile.reason, genericError());

  const { email } = result.data;
  if (email) {
    const domainCheck = await checkEmailDomain(email.slice(email.lastIndexOf("@") + 1));
    if (domainCheck === "no_mail_server") {
      return reject("no_mail_server", json(400, { error: userMessageFor("invalid_email", "email") }));
    }
  }

  try {
    await send(result.data);
  } catch (error) {
    // Code d'erreur Resend uniquement (ex. « validation_error »), jamais les données envoyées
    const code = error instanceof Error ? error.message.replace(/[^\w-]/g, "").slice(0, 40) : "unknown";
    log(form, "error", "send_failed", ipId, `(${code})`);
    return genericError(500);
  }

  // « fast=1 » : envoi rapide (autocomplétion…), simple signal de diagnostic
  log(form, "sent", null, ipId, `${email ? `email=${maskEmail(email)}` : "email=none"}${token.fast ? " fast=1" : ""}`);
  // submissionId : présent UNIQUEMENT après un envoi réel (jamais pour le honeypot).
  // Le navigateur s'en sert pour déclencher une seule conversion Google Ads par demande.
  return json(200, { success: true, submissionId: randomUUID() });
}
