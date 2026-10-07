import { describe, expect, it } from "vitest";
import { userMessageFor, validateContact, validateQuote } from "@/lib/form-security/validation";

const contact = {
  nom: "Jean Dupont",
  telephone: "06 12 34 56 78",
  email: "jean.dupont@gmail.com",
  ville: "69150 Décines-Charpieu",
  sujet: "couverture",
  message: "Bonjour, plusieurs tuiles ont glissé après le coup de vent.\nPouvez-vous passer ?",
};

const quote = {
  service: "zinguerie",
  building: "maison",
  surface: "120",
  delai: "rapide",
  nom: "Marie Martin",
  telephone: "+33 6 12 34 56 78",
  email: "",
  codePostal: "69330 Meyzieu",
  description: "Gouttière qui déborde côté jardin.",
};

describe("validateContact", () => {
  it("accepte un message normal", () => {
    const result = validateContact({ ...contact, formToken: "x", website: "" });
    expect(result.ok).toBe(true);
  });

  it("accepte l'absence d'email et de ville (champs optionnels)", () => {
    expect(validateContact({ ...contact, email: "", ville: null }).ok).toBe(true);
  });

  it("refuse un champ obligatoire vide", () => {
    expect(validateContact({ ...contact, telephone: "  " })).toMatchObject({ ok: false, reason: "missing_field", field: "telephone" });
  });

  it("refuse un message trop long", () => {
    expect(validateContact({ ...contact, message: "a".repeat(3001) })).toMatchObject({
      ok: false,
      reason: "field_too_long",
      field: "message",
    });
  });

  it("refuse du HTML malveillant", () => {
    expect(validateContact({ ...contact, message: 'Bonjour <script>alert("x")</script>' })).toMatchObject({
      ok: false,
      reason: "injection",
    });
    expect(validateContact({ ...contact, nom: '<img src=x onerror="a()">' }).ok).toBe(false);
  });

  it("refuse une injection d'en-tête dans le nom", () => {
    expect(validateContact({ ...contact, nom: "Dupont\r\nBcc: victime@exemple.fr" })).toMatchObject({
      ok: false,
      reason: "control_chars",
      field: "nom",
    });
  });

  it("refuse un email jetable sans le dire au visiteur", () => {
    const result = validateContact({ ...contact, email: "x@yopmail.com" });
    expect(result).toMatchObject({ ok: false, reason: "disposable_domain" });
    if (!result.ok) expect(userMessageFor(result.reason, result.field)).toBe("Merci d'utiliser une adresse email valide.");
  });

  it("refuse un téléphone invalide", () => {
    expect(validateContact({ ...contact, telephone: "abc" })).toMatchObject({ ok: false, reason: "invalid_phone" });
    expect(validateContact({ ...contact, telephone: "12" })).toMatchObject({ ok: false, reason: "invalid_phone" });
  });

  it("refuse un sujet hors liste", () => {
    expect(validateContact({ ...contact, sujet: "casino" })).toMatchObject({ ok: false, reason: "invalid_field" });
  });

  it("refuse un payload incohérent (champ inattendu ou type invalide)", () => {
    expect(validateContact({ ...contact, admin: "1" })).toMatchObject({ ok: false, reason: "unexpected_field" });
    expect(validateContact({ ...contact, nom: { $ne: "" } })).toMatchObject({ ok: false, reason: "invalid_field" });
    expect(validateContact(["a"])).toMatchObject({ ok: false });
    expect(validateContact(null)).toMatchObject({ ok: false });
  });

  it("refuse un message truffé de liens", () => {
    expect(
      validateContact({ ...contact, message: "https://a.fr https://b.fr https://c.fr https://d.fr" })
    ).toMatchObject({ ok: false, reason: "spam_content" });
  });

  it("refuse les caractères de contrôle", () => {
    expect(validateContact({ ...contact, message: "Bonjour\u0000" })).toMatchObject({ ok: false, reason: "control_chars" });
  });
});

describe("validateQuote", () => {
  it("accepte une demande de devis normale", () => {
    expect(validateQuote(quote).ok).toBe(true);
  });

  it("refuse une prestation inconnue", () => {
    expect(validateQuote({ ...quote, service: "piscine" })).toMatchObject({ ok: false, field: "service" });
  });

  it("refuse une surface non numérique", () => {
    expect(validateQuote({ ...quote, surface: "beaucoup" })).toMatchObject({ ok: false, field: "surface" });
  });
});
