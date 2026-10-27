import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock, domainMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  domainMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));
vi.mock("@/lib/form-security/mx", () => ({ checkEmailDomain: domainMock }));

import { POST } from "@/app/api/rappel/route";
import { buildCallbackNotification, buildCallbackConfirmation } from "@/lib/callback-emails";
import { validateCallback } from "@/lib/form-security/validation";
import { issueFormToken } from "@/lib/form-security/form-token";
import { resetRateLimits } from "@/lib/form-security/rate-limit";

const ORIGIN = "https://www.jrenov.com";
let counter = 0;
const valid = (email = "marie@gmail.com") => ({
  nom: "Marie Martin",
  telephone: "06 12 34 56 78",
  email,
  website: "",
  formToken: issueFormToken(Date.now() - 10_000),
});
function request(body: unknown, ip = `198.51.100.${++counter}`) {
  return new Request(`${ORIGIN}/api/rappel`, {
    method: "POST",
    headers: { origin: ORIGIN, "content-type": "application/json", "x-real-ip": ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_inaccessible");
  vi.stubEnv("CONTACT_EMAIL_FROM", "Jrenov <contact@jrenov.com>");
  vi.stubEnv("CONTACT_EMAIL_TO", "contact@jrenov.com");
  resetRateLimits();
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "email-test" }, error: null });
  domainMock.mockReset();
  domainMock.mockResolvedValue("ok");
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); });

describe("demande de rappel express", () => {
  it("accepte nom et téléphone seuls, sans confirmation email", async () => {
    expect(validateCallback({ nom: "Marie Martin", telephone: "06 12 34 56 78" })).toMatchObject({ ok: true });
    const res = await POST(request(valid("")));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      success: true, submissionId: expect.any(String), confirmationSent: false,
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].to).toEqual(["contact@jrenov.com"]);
  });

  it("notifie l'entreprise AVANT d'envoyer un accusé au visiteur", async () => {
    const res = await POST(request(valid()));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, confirmationSent: true });
    expect(sendMock).toHaveBeenCalledTimes(2);
    expect(sendMock.mock.calls[0][0].to).toEqual(["contact@jrenov.com"]);
    expect(sendMock.mock.calls[1][0].to).toEqual(["marie@gmail.com"]);
    expect(sendMock.mock.calls[1][0].replyTo).toBe("contact@jrenov.com");
    expect(sendMock.mock.calls[1][0].html).toContain("#f59e0b");
    expect(sendMock.mock.calls[1][0].html).toContain("JRENOV");
  });

  it("échec d'envoi entreprise : erreur, aucun accusé client", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { name: "validation_error" } });
    const res = await POST(request(valid()));
    expect(res.status).toBe(500);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("échec du seul accusé client : prospect conservé et réponse explicite", async () => {
    sendMock.mockResolvedValueOnce({ data: { id: "notification" }, error: null });
    sendMock.mockResolvedValueOnce({ data: null, error: { name: "invalid_email" } });
    const res = await POST(request(valid()));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, confirmationSent: false });
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("honeypot : aucun e-mail et aucune conversion envoyée", async () => {
    const res = await POST(request({ ...valid(), website: "https://spam.test" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("refuse les numéros, emails et champs non valides", async () => {
    expect((await POST(request({ ...valid(), telephone: "123" }))).status).toBe(400);
    expect((await POST(request({ ...valid(), nom: "A" }))).status).toBe(400);
    expect((await POST(request({ ...valid(), email: "x@yopmail.com" }))).status).toBe(400);
    expect((await POST(request({ ...valid(), ville: "Lyon" }))).status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("échappe les données personnelles dans le HTML des e-mails", () => {
    const data = { nom: "Marie & Martin", telephone: "06 12 34 56 78", email: "marie@gmail.com" };
    const admin = buildCallbackNotification(data, "Jrenov <contact@jrenov.com>", "contact@jrenov.com");
    const client = buildCallbackConfirmation(data, "Jrenov <contact@jrenov.com>");
    expect(admin.html).toContain("Marie &amp; Martin");
    expect(client.html).toContain("Marie &amp; Martin");
    expect(admin.html).toContain('href="tel:0612345678"');
    expect(admin.html).not.toContain("Marie & Martin</");
  });

  it("limite à cinq envois par fenêtre et IP", async () => {
    const states: number[] = [];
    for (let i = 0; i < 6; i++) states.push((await POST(request(valid(""), "198.51.100.77"))).status);
    expect(states).toEqual([200, 200, 200, 200, 200, 429]);
    expect(sendMock).toHaveBeenCalledTimes(5);
  });
});
