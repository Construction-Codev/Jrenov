import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { LEAD_CONVERSION_SEND_TO, readSubmissionId, trackLeadConversion } from "@/lib/google-ads";

// Navigateur simulé : localStorage en mémoire, gtag espionné. Aucune requête réelle.
function fakeWindow({ consent, gtag }: { consent?: string; gtag?: unknown }) {
  const store = new Map<string, string>(consent ? [[CONSENT_STORAGE_KEY, consent]] : []);
  const win = {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    },
    gtag,
    dispatchEvent: () => true,
  };
  vi.stubGlobal("window", win);
  return win;
}

let counter = 0;
const newId = () => `test-submission-${++counter}`;

describe("trackLeadConversion", () => {
  beforeEach(() => vi.unstubAllGlobals());
  afterEach(() => vi.unstubAllGlobals());

  it("succès serveur + consentement : une conversion avec le bon send_to", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    const id = newId();
    expect(trackLeadConversion(id)).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
      transaction_id: id,
    });
  });

  it("même soumission rappelée : aucun doublon ; nouvelle soumission : comptée", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    const id = newId();
    trackLeadConversion(id);
    expect(trackLeadConversion(id)).toBe(false);
    expect(trackLeadConversion(newId())).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("sans identifiant serveur (échec, honeypot, réponse inattendue) : rien", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "granted", gtag });
    expect(trackLeadConversion(null)).toBe(false);
    expect(trackLeadConversion(undefined)).toBe(false);
    expect(trackLeadConversion("")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("consentement refusé ou absent : rien", () => {
    const gtag = vi.fn();
    fakeWindow({ consent: "denied", gtag });
    expect(trackLeadConversion(newId())).toBe(false);
    fakeWindow({ gtag });
    expect(trackLeadConversion(newId())).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("balise absente (bloqueur) : ne lève pas", () => {
    fakeWindow({ consent: "granted" });
    expect(() => trackLeadConversion(newId())).not.toThrow();
    expect(trackLeadConversion(newId())).toBe(false);
  });

  it("gtag qui plante ou localStorage bloqué : ne lève pas", () => {
    fakeWindow({ consent: "granted", gtag: () => { throw new Error("blocked"); } });
    expect(trackLeadConversion(newId())).toBe(false);
    vi.stubGlobal("window", { get localStorage() { throw new Error("denied"); }, gtag: vi.fn() });
    expect(trackLeadConversion(newId())).toBe(false);
  });

  it("côté serveur (pas de window) : rien", () => {
    expect(trackLeadConversion(newId())).toBe(false);
  });
});

describe("readSubmissionId", () => {
  it("lit l'identifiant d'un envoi réel", async () => {
    expect(await readSubmissionId(Response.json({ success: true, submissionId: "abc" }))).toBe("abc");
  });

  it("faux succès honeypot ou corps invalide : null", async () => {
    expect(await readSubmissionId(Response.json({ success: true }))).toBeNull();
    expect(await readSubmissionId(new Response("pas du json"))).toBeNull();
  });
});
