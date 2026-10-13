import { describe, expect, it } from "vitest";
import { BUSINESS, PHONE_HREF } from "@/lib/site";
import { businessJsonLd } from "@/lib/structured-data";

describe("numéro de téléphone de l'entreprise", () => {
  it("expose le numéro affiché, E.164 et le lien d'appel depuis une seule source", () => {
    expect(BUSINESS.phoneDisplay).toBe("07 61 24 27 93");
    expect(BUSINESS.phoneE164).toBe("+33761242793");
    expect(PHONE_HREF).toBe("tel:+33761242793");
  });

  it("publie le nouveau numéro dans les données structurées", () => {
    expect(businessJsonLd().telephone).toBe("+33761242793");
  });

  it("garde l'affichage et le format E.164 cohérents", () => {
    expect(`+33${BUSINESS.phoneDisplay.replace(/\s/g, "").slice(1)}`).toBe(BUSINESS.phoneE164);
  });
});
