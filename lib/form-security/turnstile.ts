/**
 * Cloudflare Turnstile (niveau 3, désactivé par défaut).
 *
 * Activation : définir LES DEUX variables NEXT_PUBLIC_TURNSTILE_SITE_KEY et
 * TURNSTILE_SECRET_KEY. Tant que l'une manque, le widget n'est pas affiché et
 * le serveur n'exige aucun jeton : le build et les formulaires fonctionnent.
 * Quand elles sont présentes, le jeton est TOUJOURS vérifié côté serveur
 * auprès de Cloudflare avant l'envoi de l'email.
 */

export const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 4_000;

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export type TurnstileCheck = { ok: true } | { ok: false; reason: "turnstile_missing" | "turnstile_failed" | "turnstile_error" };

export async function verifyTurnstile(
  token: unknown,
  remoteIp: string | null,
  fetchImpl: typeof fetch = fetch
): Promise<TurnstileCheck> {
  if (!isTurnstileEnabled()) return { ok: true };
  if (typeof token !== "string" || !token || token.length > 2048) return { ok: false, reason: "turnstile_missing" };

  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY as string, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? { ok: true } : { ok: false, reason: "turnstile_failed" };
  } catch {
    // Cloudflare injoignable : on refuse (la soumission pourra être renvoyée)
    return { ok: false, reason: "turnstile_error" };
  }
}
