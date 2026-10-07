import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Resend simulé : AUCUN email réel n'est envoyé pendant les tests
const { sendMock, domainCheckMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  domainCheckMock: vi.fn(),
}));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));
// DNS simulé : aucune requête réseau
vi.mock("@/lib/form-security/mx", () => ({ checkEmailDomain: domainCheckMock }));

import { POST as postContact } from "@/app/api/contact/route";
import { POST as postDevis } from "@/app/api/devis/route";
import { issueFormToken } from "@/lib/form-security/form-token";
import { resetRateLimits } from "@/lib/form-security/rate-limit";
import { MAX_PAYLOAD_BYTES } from "@/lib/form-security/submission";

const ORIGIN = "https://www.jrenov.com";
let ipCounter = 0;

function request(path: string, body: unknown, { ip, origin = ORIGIN }: { ip?: string; origin?: string | null } = {}) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-real-ip": ip ?? `203.0.113.${++ipCounter}`,
  };
  if (origin) headers.origin = origin;
  return new Request(`${ORIGIN}${path}`, {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const contactBody = () => ({
  nom: "Jean Dupont",
  telephone: "06 12 34 56 78",
  email: "jean.dupont@gmail.com",
  ville: "Décines-Charpieu",
  sujet: "urgence",
  message: "Fuite au plafond depuis l'orage. Prix < 500 € & délai court svp.",
  website: "",
  formToken: issueFormToken(Date.now() - 10_000),
});

const quoteBody = () => ({
  service: "couverture",
  building: "maison",
  surface: "90",
  delai: "rapide",
  nom: "Marie Martin",
  telephone: "+33 6 12 34 56 78",
  email: "",
  codePostal: "69330 Meyzieu",
  description: "Tuiles cassées.",
  website: "",
  formToken: issueFormToken(Date.now() - 10_000),
});

beforeEach(() => {
  resetRateLimits();
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "test" }, error: null });
  domainCheckMock.mockReset();
  domainCheckMock.mockResolvedValue("ok");
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => vi.unstubAllEnvs());

describe("POST /api/contact", () => {
  it("soumission valide : 200 et un seul envoi, données échappées", async () => {
    const res = await postContact(request("/api/contact", contactBody()));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const email = sendMock.mock.calls[0][0];
    expect(email.html).toContain("Prix &lt; 500 € &amp; délai");
    expect(email.replyTo).toBe("jean.dupont@gmail.com");
    expect(email.subject).not.toMatch(/[\r\n]/);
  });

  it("honeypot rempli : faux succès silencieux, aucun envoi", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), website: "https://spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("email invalide : 400 avec message générique, aucun envoi", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), email: "pas-un-email" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Merci d'utiliser une adresse email valide.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("domaine jetable : même message que pour un email invalide", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), email: "bot@mailinator.com" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Merci d'utiliser une adresse email valide.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("domaine sans serveur mail : refusé", async () => {
    domainCheckMock.mockResolvedValue("no_mail_server");
    const res = await postContact(request("/api/contact", { ...contactBody(), email: "contact@domaine-inexistant-123456.xyz" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("panne DNS : la soumission passe (fail-open)", async () => {
    domainCheckMock.mockResolvedValue("unknown");
    const res = await postContact(request("/api/contact", contactBody()));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("message énorme : 413, aucun envoi", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), message: "a".repeat(MAX_PAYLOAD_BYTES) }));
    expect(res.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("message trop long mais payload raisonnable : 400", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), message: "a".repeat(3500) }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("payload incomplet : 400, aucun envoi", async () => {
    const { telephone: _telephone, ...incomplete } = contactBody();
    void _telephone;
    const res = await postContact(request("/api/contact", incomplete));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("JSON malformé : 400", async () => {
    const res = await postContact(request("/api/contact", "{pas du json"));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("HTML malveillant : 400, aucun envoi", async () => {
    const res = await postContact(
      request("/api/contact", { ...contactBody(), message: 'Bonjour <img src=x onerror="alert(1)">' })
    );
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("injection d'en-tête dans le nom : 400, aucun envoi", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), nom: "Dupont\r\nBcc: victime@exemple.fr" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("utilisateur très rapide / autocomplétion : soumission immédiate acceptée et envoyée", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), formToken: issueFormToken() }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("devis envoyé immédiatement (autocomplétion) : accepté", async () => {
    const res = await postDevis(request("/api/devis", { ...quoteBody(), formToken: issueFormToken() }));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("sans email (champ facultatif) : la demande fonctionne comme avant", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), email: "" }));
    expect(res.status).toBe(200);
    expect(domainCheckMock).not.toHaveBeenCalled();
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("jeton expiré : 400, aucun envoi", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), formToken: issueFormToken(Date.now() - 25 * 60 * 60 * 1000) }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("jeton absent ou falsifié : 400", async () => {
    const res = await postContact(request("/api/contact", { ...contactBody(), formToken: "1.2.3" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("requête directe sans Origin du site : 403", async () => {
    expect((await postContact(request("/api/contact", contactBody(), { origin: null }))).status).toBe(403);
    expect((await postContact(request("/api/contact", contactBody(), { origin: "https://evil.example" }))).status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limit : la 6e soumission rapide depuis la même IP reçoit 429", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await postContact(request("/api/contact", contactBody(), { ip: "198.51.100.7" }))).status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(sendMock).toHaveBeenCalledTimes(5);
  });

  it("échec Resend : 500 générique", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "validation_error", message: "x" } });
    const res = await postContact(request("/api/contact", contactBody()));
    expect(res.status).toBe(500);
  });

  it("Turnstile activé et refusé par Cloudflare : 400, aucun envoi", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-de-test");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-de-test");
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: false })));
    vi.stubGlobal("fetch", fetchMock);
    const res = await postContact(request("/api/contact", { ...contactBody(), turnstileToken: "jeton" }));
    vi.unstubAllGlobals();
    expect(res.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("Turnstile activé et validé : envoi", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-de-test");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-de-test");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ success: true }))));
    const res = await postContact(request("/api/contact", { ...contactBody(), turnstileToken: "jeton" }));
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/devis", () => {
  it("soumission valide : 200 et un envoi", async () => {
    const res = await postDevis(request("/api/devis", quoteBody()));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].replyTo).toBeUndefined();
  });

  it("protégée comme le contact : honeypot, prestation inconnue, HTML", async () => {
    expect((await postDevis(request("/api/devis", { ...quoteBody(), website: "x" }))).status).toBe(200);
    expect((await postDevis(request("/api/devis", { ...quoteBody(), service: "<script>" }))).status).toBe(400);
    expect((await postDevis(request("/api/devis", { ...quoteBody(), description: "<script>x</script>" }))).status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("compteur de rate limit séparé du formulaire de contact", async () => {
    for (let i = 0; i < 5; i++) await postContact(request("/api/contact", contactBody(), { ip: "198.51.100.9" }));
    expect((await postDevis(request("/api/devis", quoteBody(), { ip: "198.51.100.9" }))).status).toBe(200);
  });
});
