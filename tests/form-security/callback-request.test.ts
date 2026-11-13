import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/form-security/validation";
import { buildContactEmail } from "@/lib/form-emails";


describe("rappel immédiat JRENOV", () => {
  it("accepte un nom et un téléphone sans demander de mail ni de message libre", () => {
    const valid = validateContact({
      nom: "Jean Martin",
      telephone: "06 12 34 56 78",
      email: "",
      ville: "",
      sujet: "rappel",
      message: "Demande de rappel depuis le site JRENOV. Merci de rappeler ce prospect dès que possible 24 h/24, 7 j/7.",
    });
    expect(valid.ok).toBe(true);
  });

  it("refuse un téléphone invalide", () => {
    const invalid = validateContact({
      nom: "Jean Martin",
      telephone: "123",
      email: "",
      ville: "",
      sujet: "rappel",
      message: "Demande de rappel depuis le site JRENOV.",
    });
    expect(invalid.ok).toBe(false);
  });

  it("envoie un email identifié comme rappel immédiat", () => {
    const mail = buildContactEmail({
      nom: "Jean Martin",
      telephone: "0612345678",
      email: "",
      ville: "",
      sujet: "rappel",
      message: "Demande de rappel depuis le site JRENOV.",
    });
    expect(mail.subject).toContain("RAPPEL IMMÉDIAT");
    expect(mail.html).toContain("0612345678");
  });

  it("conserve un formulaire de rappel disponible sans restriction horaire", () => {
    const request = validateContact({
      nom: "Jean Martin",
      telephone: "06 12 34 56 78",
      email: "",
      ville: "",
      sujet: "rappel",
      message: "Demande de rappel 24 h/24, 7 j/7.",
    });
    expect(request.ok).toBe(true);
  });
});
