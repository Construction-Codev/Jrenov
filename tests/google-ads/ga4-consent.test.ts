import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_CONSENT_STORAGE_KEY, CONSENT_STORAGE_KEY,
  getAdsConsent, getAnalyticsConsent, setAnalyticsConsent,
} from "@/lib/consent";
import { readFileSync } from "node:fs";

const source = (path: string) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");

function fakeWindow() {
  const store = new Map<string, string>();
  const gtag = vi.fn();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
    },
    gtag,
    dispatchEvent: vi.fn(),
  });
  return { store, gtag };
}

describe("Google Analytics 4 et consentement granulaire", () => {
  beforeEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.resetModules(); });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("n'autorise pas GA4 avec un ancien accord Google Ads", () => {
    const { store } = fakeWindow();
    store.set(CONSENT_STORAGE_KEY, "granted");
    expect(getAdsConsent()).toBe("granted");
    expect(getAnalyticsConsent()).toBe("unknown");
  });

  it("un accord Analytics n'autorise pas Google Ads", () => {
    const { store, gtag } = fakeWindow();
    setAnalyticsConsent(true);
    expect(store.get(ANALYTICS_CONSENT_STORAGE_KEY)).toBe("granted");
    expect(getAdsConsent()).toBe("unknown");
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "granted" });
    setAnalyticsConsent(false);
    expect(getAnalyticsConsent()).toBe("denied");
    expect(gtag).toHaveBeenLastCalledWith("consent", "update", { analytics_storage: "denied" });
  });

  it("n'émet aucun événement sans identifiant et sans accord", async () => {
    const { gtag } = fakeWindow();
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "");
    vi.resetModules();
    let ga = await import("@/lib/google-analytics");
    expect(ga.GA4_MEASUREMENT_ID).toBeNull();
    expect(ga.trackGA4Event("phone_click")).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "G-ABC1234567");
    vi.resetModules();
    ga = await import("@/lib/google-analytics");
    expect(ga.GA4_MEASUREMENT_ID).toBe("G-ABC1234567");
    expect(ga.trackGA4Event("phone_click")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("avec accord, envoie seulement les événements non personnels à GA4", async () => {
    const { gtag } = fakeWindow();
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "G-ABC1234567");
    vi.resetModules();
    const ga = await import("@/lib/google-analytics");
    setAnalyticsConsent(true);
    gtag.mockClear();
    expect(ga.trackGA4Event("callback_request", { placement: "content" })).toBe(true);
    expect(gtag).toHaveBeenCalledWith("event", "callback_request", {
      placement: "content", send_to: "G-ABC1234567",
    });
    setAnalyticsConsent(false);
    gtag.mockClear();
    expect(ga.trackGA4Event("callback_request")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("charge un seul script partagé et suit les pages vues client uniquement sous consentement", () => {
    const tag = source("components/GoogleTag.tsx");
    const banner = source("components/ConsentBanner.tsx");
    const events = source("lib/analytics.ts");
    expect(tag).toContain('id="google-shared-gtag"');
    expect(tag).toContain("if (!shouldLoad) return null");
    expect(tag).toContain("analytics_storage: allowAnalytics");
    expect(tag).toContain("send_page_view: false");
    expect(tag).toContain('"page_view"');
    expect(tag).toContain("allowedParams");
    expect(banner).toContain("setAnalyticsConsent");
    expect(banner).toContain("setAdsConsent");
    expect(banner).toContain("Tout refuser");
    expect(banner).toContain("Tout accepter");
    expect(events).toContain("trackGA4Event(name, safe)");
  });
});
