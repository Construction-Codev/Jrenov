import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Vercel Analytics simulé : aucun envoi réel
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

import { track } from "@vercel/analytics";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { trackContactLinkClick } from "@/lib/contact-link-tracking";
import {
  LEAD_CONVERSION_SEND_TO,
  PHONE_CONVERSION_COOLDOWN_MS,
  PHONE_CONVERSION_SEND_TO,
  resetPhoneConversionCooldown,
  trackLeadConversion,
  trackPhoneConversion,
} from "@/lib/google-ads";

// Navigateur simulé : localStorage en mémoire, gtag espionné. Aucune requête Google réelle.
function fakeWindow({ consent, gtag }: { consent?: string; gtag?: unknown }) {
  const store = new Map<string, string>(consent ? [[CONSENT_STORAGE_KEY, consent]] : []);
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    },
    gtag,
    dispatchEvent: () => true,
  });
}

/** Lien simulé : seul l'attribut href et l'emplacement (header/footer/barre mobile) comptent. */
function fakeLink(href: string, inside?: "header" | "footer" | '[data-cta-placement="mobile_bar"]') {
  return {
    getAttribute: (name: string) => (name === "href" ? href : null),
    closest: (selector: string) => (selector === inside ? ({} as Element) : null),
  } as unknown as Element;
}

const phoneCalls = (gtag: ReturnType<typeof vi.fn>) =>
  gtag.mock.calls.filter(([, , params]) => (params as { send_to?: string })?.send_to === PHONE_CONVERSION_SEND_TO);

describe("trackPhoneConversion", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    resetPhoneConversionCooldown();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("consentement accepté : une conversion avec le send_to téléphone exact, sans donnée personnelle", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    expect(trackPhoneConversion()).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: PHONE_CONVERSION_SEND_TO,
      transport_type: "beacon",
    });
    expect(PHONE_CONVERSION_SEND_TO).not.toBe(LEAD_CONVERSION_SEND_TO);
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/0465848885|tel:/);
  });

  it("consentement inconnu ou refusé : rien", () => {
    const gtag = vi.fn();
    fakeWindow({ gtag });
    expect(trackPhoneConversion()).toBe(false);
    fakeWindow({ consent: "denied", gtag });
    expect(trackPhoneConversion()).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("double clic rapproché : une seule conversion, puis de nouveau comptée après le délai", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    expect(trackPhoneConversion()).toBe(true);
    expect(trackPhoneConversion()).toBe(false);
    vi.advanceTimersByTime(PHONE_CONVERSION_COOLDOWN_MS);
    expect(trackPhoneConversion()).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("bloqueur (gtag absent ou qui plante) ou stockage bloqué : ne lève pas", () => {
    fakeWindow({ consent: "granted" });
    expect(() => trackPhoneConversion()).not.toThrow();
    fakeWindow({ consent: "granted", gtag: () => { throw new Error("blocked"); } });
    expect(trackPhoneConversion()).toBe(false);
    vi.stubGlobal("window", { get localStorage() { throw new Error("denied"); }, gtag: vi.fn() });
    expect(trackPhoneConversion()).toBe(false);
  });

  it("côté serveur (pas de window) : rien", () => {
    expect(trackPhoneConversion()).toBe(false);
  });
});

describe("trackContactLinkClick (délégation de AnalyticsEvents)", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    resetPhoneConversionCooldown();
    vi.mocked(track).mockClear();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("clic téléphone après acceptation : Vercel phone_click + conversion téléphone", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    trackContactLinkClick(fakeLink("tel:0465848885", "header"), true);
    expect(track).toHaveBeenCalledWith("phone_click", { placement: "header" });
    expect(phoneCalls(gtag)).toHaveLength(1);
  });

  it("clic téléphone sans consentement ou après refus : Vercel toujours envoyé, aucun événement Google Ads", () => {
    const gtag = vi.fn();
    fakeWindow({ gtag });
    trackContactLinkClick(fakeLink("tel:0465848885", "footer"), true);
    fakeWindow({ consent: "denied", gtag });
    trackContactLinkClick(fakeLink("tel:0465848885"), true);
    expect(track).toHaveBeenNthCalledWith(1, "phone_click", { placement: "footer" });
    expect(track).toHaveBeenNthCalledWith(2, "phone_click", { placement: "content" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("clic sur la barre d'appel mobile : placement mobile_bar + conversion téléphone", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    trackContactLinkClick(fakeLink("tel:+33761242793", '[data-cta-placement="mobile_bar"]'), true);
    expect(track).toHaveBeenCalledWith("phone_click", { placement: "mobile_bar" });
    expect(phoneCalls(gtag)).toHaveLength(1);
  });

  it("clic téléphone avec bloqueur : Vercel envoyé, aucune erreur", () => {
    fakeWindow({ consent: "granted" });
    expect(() => trackContactLinkClick(fakeLink("tel:0465848885"), true)).not.toThrow();
    expect(track).toHaveBeenCalledWith("phone_click", { placement: "content" });
  });

  it("clic simulé par script (non fiable) : pas de conversion", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    trackContactLinkClick(fakeLink("tel:0465848885"), false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("clic e-mail : email_click uniquement, aucune conversion téléphone ni formulaire", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    trackContactLinkClick(fakeLink("mailto:contact@example.com"), true);
    expect(track).toHaveBeenCalledWith("email_click", { placement: "content" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("formulaire réussi après un clic téléphone : chaque conversion garde son propre send_to", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    trackLeadConversion("phone-test-submission");
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenLastCalledWith("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
      transaction_id: "phone-test-submission",
    });
    expect(phoneCalls(gtag)).toHaveLength(0);
  });
});
