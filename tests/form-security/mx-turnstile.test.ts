import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkEmailDomain, clearDomainCache, type DnsResolver } from "@/lib/form-security/mx";
import { TURNSTILE_VERIFY_URL, verifyTurnstile } from "@/lib/form-security/turnstile";

const notFound = () => Object.assign(new Error("not found"), { code: "ENOTFOUND" });
const noData = () => Object.assign(new Error("no data"), { code: "ENODATA" });
const servfail = () => Object.assign(new Error("servfail"), { code: "ESERVFAIL" });

function resolver(overrides: Partial<DnsResolver>): DnsResolver {
  return {
    resolveMx: async () => {
      throw noData();
    },
    resolve4: async () => {
      throw noData();
    },
    resolve6: async () => {
      throw noData();
    },
    ...overrides,
  };
}

describe("vérification MX (DNS simulé)", () => {
  beforeEach(() => clearDomainCache());

  it("accepte un domaine avec MX", async () => {
    expect(await checkEmailDomain("a.fr", resolver({ resolveMx: async () => [{ exchange: "mx.a.fr", priority: 10 }] }))).toBe("ok");
  });

  it("refuse un domaine inexistant", async () => {
    const r = resolver({
      resolveMx: async () => {
        throw notFound();
      },
      resolve4: async () => {
        throw notFound();
      },
      resolve6: async () => {
        throw notFound();
      },
    });
    expect(await checkEmailDomain("domaine-inexistant-123456.xyz", r)).toBe("no_mail_server");
  });

  it("accepte un MX implicite (A sans MX)", async () => {
    expect(await checkEmailDomain("b.fr", resolver({ resolve4: async () => ["203.0.113.1"] }))).toBe("ok");
  });

  it("n'accuse pas sur une panne DNS (SERVFAIL)", async () => {
    const r = resolver({
      resolveMx: async () => {
        throw servfail();
      },
    });
    expect(await checkEmailDomain("c.fr", r)).toBe("unknown");
  });

  it("n'accuse pas sur un timeout, et répond vite", async () => {
    const r = resolver({ resolveMx: () => new Promise(() => {}) });
    const start = Date.now();
    expect(await checkEmailDomain("d.fr", r, 50)).toBe("unknown");
    expect(Date.now() - start).toBeLessThan(1000);
  });
});

describe("Turnstile (Cloudflare simulé)", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("est inactif sans les deux variables : aucun appel réseau", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    const fetchMock = vi.fn();
    expect(await verifyTurnstile(undefined, null, fetchMock)).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  describe("activé", () => {
    beforeEach(() => {
      vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-de-test");
      vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-de-test");
    });

    it("accepte un jeton validé par Cloudflare", async () => {
      const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: true })));
      expect(await verifyTurnstile("jeton", "203.0.113.5", fetchMock)).toEqual({ ok: true });
      expect(fetchMock).toHaveBeenCalledWith(TURNSTILE_VERIFY_URL, expect.objectContaining({ method: "POST" }));
    });

    it("refuse un jeton rejeté par Cloudflare", async () => {
      const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: false })));
      expect(await verifyTurnstile("jeton", null, fetchMock)).toEqual({ ok: false, reason: "turnstile_failed" });
    });

    it("refuse un jeton absent sans appeler Cloudflare", async () => {
      const fetchMock = vi.fn();
      expect(await verifyTurnstile(undefined, null, fetchMock)).toEqual({ ok: false, reason: "turnstile_missing" });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("refuse si Cloudflare est injoignable", async () => {
      const fetchMock = vi.fn(async () => {
        throw new Error("network");
      });
      expect(await verifyTurnstile("jeton", null, fetchMock)).toEqual({ ok: false, reason: "turnstile_error" });
    });
  });
});
