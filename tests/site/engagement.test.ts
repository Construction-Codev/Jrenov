import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = (file: string) => readFileSync(new URL("../../" + file, import.meta.url), "utf8");

describe("parcours d'engagement mobile et demandes de rappel", () => {
  it("ne télécharge pas les vidéos de fond lorsque le visiteur est sur mobile ou préfère moins de mouvement", () => {
    const hero = source("components/Banner.tsx");
    expect(hero).toContain('const MOBILE_QUERY = "(max-width: 767px)"');
    expect(hero).toContain("const staticHero = reducedMotion || mobileScreen");
    expect(hero).toContain("() => true");
    expect(hero).toContain("src={!staticHero && loadedVideos.includes(index) ? src : undefined}");
    expect(hero).toContain('preload={staticHero ? "none" : index === 0 ? "metadata" : "auto"}');
    expect(hero).toContain("src={POSTER}");
    expect(hero).toContain("aria-hidden");
  });

  it("propose le rappel sans changer les protections du formulaire", () => {
    const callback = source("components/CallbackRequest.tsx");
    const devis = source("app/devis/page.tsx");
    expect(callback).toContain("export function CallbackServiceSection");
    expect(callback).toContain("<CallbackRequestForm />");
    expect(callback).toContain('trackEvent("callback_request")');
    expect(callback).toContain('trackLeadConversion(id,');
    expect(devis).toContain("Me rappeler gratuitement");
    expect(devis).toContain("<CallbackDialog open={callbackOpen}");
    expect(devis).toContain("useFormGuard()");
    expect(devis).toContain('trackEvent("quote_form_submit")');
  });

  it("conserve les liens internes utiles sur la page de couverture", () => {
    const couverture = source("app/services/couverture/page.tsx");
    const fuite = source("app/services/recherche-de-fuite/page.tsx");
    expect(couverture).toContain('href="/services/recherche-de-fuite"');
    expect(couverture).toContain('href="/realisations"');
    expect(couverture).toContain("<CallbackServiceSection");
    expect(fuite).toContain("<CallbackServiceSection");
    expect(couverture).toContain("<CoverageDiagnosis />");
    expect(fuite).toContain('href={PHONE_HREF}');
  });
});
