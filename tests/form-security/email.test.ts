import { describe, expect, it } from "vitest";
import { maskEmail, validateEmail } from "@/lib/form-security/email";
import { isDisposableDomain } from "@/lib/form-security/disposable-email-domains";

describe("validateEmail", () => {
  it.each([
    "jean.dupont@gmail.com",
    "contact@orange.fr",
    "marie+travaux@outlook.com",
    "a.b@free.fr",
    "x@icloud.com",
    "pro@proton.me",
    "client@yahoo.com",
    "sarl-toiture@exemple.co.uk",
  ])("accepte une adresse valide : %s", (email) => {
    expect(validateEmail(email).ok).toBe(true);
  });

  it("supprime les espaces et met le domaine en minuscules", () => {
    expect(validateEmail("  Jean.Dupont@GMAIL.Com ")).toEqual({
      ok: true,
      email: "Jean.Dupont@gmail.com",
      domain: "gmail.com",
    });
  });

  it.each([
    "",
    "pas-une-adresse",
    "@gmail.com",
    "jean@",
    "jean@@gmail.com",
    "jean@gmail",
    "jean dupont@gmail.com",
    "jean..dupont@gmail.com",
    ".jean@gmail.com",
    "jean@-gmail.com",
    "jean@192.168.1.1",
    "jean@gmail.com\r\nBcc: victime@exemple.fr",
    `${"a".repeat(65)}@gmail.com`,
    `jean@${"a".repeat(250)}.com`,
  ])("refuse une adresse invalide : %j", (email) => {
    expect(validateEmail(email)).toEqual({ ok: false, reason: "invalid_email" });
  });

  it.each(["test@mailinator.com", "x@YOPMAIL.COM", "bot@sub.guerrillamail.com", "a@10minutemail.com", "z@temp-mail.org"])(
    "refuse un domaine jetable : %s",
    (email) => {
      expect(validateEmail(email)).toEqual({ ok: false, reason: "disposable_domain" });
    }
  );
});

describe("isDisposableDomain", () => {
  it.each(["gmail.com", "outlook.com", "hotmail.com", "orange.fr", "free.fr", "icloud.com", "yahoo.com", "proton.me", "jrenov.com"])(
    "ne bloque jamais un domaine légitime : %s",
    (domain) => {
      expect(isDisposableDomain(domain)).toBe(false);
    }
  );

  it("couvre les sous-domaines d'un service jetable", () => {
    expect(isDisposableDomain("inbox.mailinator.com")).toBe(true);
  });
});

describe("maskEmail", () => {
  it("ne conserve que le domaine", () => {
    expect(maskEmail("jean.dupont@gmail.com")).toBe("***@gmail.com");
  });
});
