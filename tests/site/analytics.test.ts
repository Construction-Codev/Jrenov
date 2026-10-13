import { beforeEach, describe, expect, it, vi } from "vitest";

const { trackMock } = vi.hoisted(() => ({ trackMock: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track: trackMock }));

import { trackEvent } from "@/lib/analytics";

beforeEach(() => trackMock.mockReset());

describe("trackEvent : prestations du formulaire de devis", () => {
  it.each(["fenetres-de-toit", "recherche-de-fuite", "couverture", "urgence"])(
    "transmet la prestation connue %s",
    (service) => {
      trackEvent("quote_form_submit", { service });
      expect(trackMock).toHaveBeenCalledWith("quote_form_submit", { service });
    },
  );

  it("ignore une valeur hors liste", () => {
    trackEvent("quote_form_start", { service: "jean.dupont@gmail.com" });
    expect(trackMock).toHaveBeenCalledWith("quote_form_start", {});
  });
});
