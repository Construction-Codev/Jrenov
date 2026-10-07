import { beforeEach, describe, expect, it } from "vitest";
import { FAST_SUBMIT_MS, MAX_AGE_MS, issueFormToken, verifyFormToken } from "@/lib/form-security/form-token";
import { checkRateLimit, getClientIp, rateLimitKey, resetRateLimits } from "@/lib/form-security/rate-limit";

describe("jeton temporel signé", () => {
  const now = 1_800_000_000_000;

  it("accepte un jeton valide", () => {
    expect(verifyFormToken(issueFormToken(now - FAST_SUBMIT_MS - 1000), now)).toEqual({ ok: true, fast: false });
  });

  it("utilisateur très rapide / autocomplétion : accepté, simplement signalé", () => {
    expect(verifyFormToken(issueFormToken(now), now)).toEqual({ ok: true, fast: true });
    expect(verifyFormToken(issueFormToken(now - 200), now)).toEqual({ ok: true, fast: true });
  });

  it("refuse un jeton absent", () => {
    expect(verifyFormToken(undefined, now)).toEqual({ ok: false, reason: "token_missing" });
  });

  it("refuse un jeton expiré", () => {
    expect(verifyFormToken(issueFormToken(now - MAX_AGE_MS - 1000), now)).toEqual({ ok: false, reason: "token_expired" });
  });

  it("refuse un horodatage falsifié (signature invalide)", () => {
    const [, nonce, signature] = issueFormToken(now - 500).split(".");
    const forged = `${now - 60_000}.${nonce}.${signature}`;
    expect(verifyFormToken(forged, now)).toEqual({ ok: false, reason: "token_invalid" });
    expect(verifyFormToken("n'importe.quoi.ici", now)).toEqual({ ok: false, reason: "token_invalid" });
  });
});

describe("rate limiting", () => {
  beforeEach(() => resetRateLimits());
  const rule = { limit: 5, windowMs: 10 * 60 * 1000 };

  it("autorise 5 soumissions puis bloque la 6e", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) expect(checkRateLimit("contact:1.2.3.4", rule, t + i).ok).toBe(true);
    const blocked = checkRateLimit("contact:1.2.3.4", rule, t + 10);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("libère la limite après la fenêtre", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) checkRateLimit("k", rule, t);
    expect(checkRateLimit("k", rule, t + rule.windowMs + 1).ok).toBe(true);
  });

  it("isole les clés (autre IP, autre formulaire)", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("contact:1.1.1.1", rule, 1);
    expect(checkRateLimit("contact:2.2.2.2", rule, 2).ok).toBe(true);
    expect(checkRateLimit("devis:1.1.1.1", rule, 2).ok).toBe(true);
  });

  it("regroupe une IPv6 par préfixe /64", () => {
    expect(rateLimitKey("contact", "2001:db8:1:2:aaaa::1")).toBe("contact:2001:db8:1:2::/64");
    expect(rateLimitKey("contact", "2001:db8:1:2:bbbb::9")).toBe("contact:2001:db8:1:2::/64");
    expect(rateLimitKey("contact", "2001:db8::1")).toBe("contact:2001:db8:0:0::/64");
    expect(rateLimitKey("contact", "::ffff:1.2.3.4")).toBe("contact:1.2.3.4");
    expect(rateLimitKey("contact", null)).toBe("contact:unknown");
  });

  it("lit l'IP derrière le proxy et ignore les valeurs incohérentes", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" }))).toBe("203.0.113.5");
    expect(getClientIp(new Headers({ "x-real-ip": "2001:db8::1" }))).toBe("2001:db8::1");
    expect(getClientIp(new Headers({ "x-forwarded-for": "<script>" }))).toBeNull();
    expect(getClientIp(new Headers())).toBeNull();
  });
});
