import { track } from "@vercel/analytics";

/**
 * Événements de conversion suivis dans Vercel Web Analytics.
 *
 * RÈGLE : aucune donnée personnelle ne doit transiter ici (nom, e-mail,
 * téléphone, adresse, code postal, message…). Les propriétés autorisées
 * décrivent uniquement le type d'action.
 */
export type ConversionEvent =
  | "phone_click"
  | "email_click"
  | "quote_form_start"
  | "quote_form_submit"
  | "contact_form_submit";

type EventProperties = {
  /** Zone de la page où l'action a eu lieu : header, footer, content… */
  placement?: "header" | "footer" | "content";
  /** Type de prestation choisi dans un formulaire (valeur d'une liste fermée). */
  service?: string;
};

const ALLOWED_SERVICES = new Set([
  "couverture",
  "zinguerie",
  "isolation",
  "demoussage",
  "urgence",
  "autre",
]);

export function trackEvent(name: ConversionEvent, properties: EventProperties = {}): void {
  const safe: Record<string, string> = {};
  if (properties.placement) safe.placement = properties.placement;
  // Seules les valeurs connues sont transmises : jamais de saisie libre.
  if (properties.service && ALLOWED_SERVICES.has(properties.service)) {
    safe.service = properties.service;
  }

  try {
    track(name, safe);
  } catch {
    // L'analytics ne doit jamais casser l'interface.
  }
}
