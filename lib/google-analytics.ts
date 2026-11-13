import { getAnalyticsConsent } from "@/lib/consent";

/**
 * Identifiant public du flux web GA4. Sans G-xxxxxxxx, aucun script ni événement GA4.
 * Ajouter NEXT_PUBLIC_GA4_MEASUREMENT_ID dans les paramètres Vercel Production/Preview.
 */
const configuredId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() ?? "";
export const GA4_MEASUREMENT_ID: string | null = /^G-[A-Z0-9]{6,16}$/.test(configuredId) ? configuredId : null;

/** Events GA4 sans données personnelles, distincts des conversions Google Ads. */
export function trackGA4Event(event: string, properties: Record<string, string> = {}): boolean {
  if (!GA4_MEASUREMENT_ID || !/^[a-z][a-z0-9_]{1,39}$/.test(event)) return false;
  if (typeof window === "undefined" || getAnalyticsConsent() !== "granted" || typeof window.gtag !== "function") return false;
  try {
    window.gtag("event", event, { ...properties, send_to: GA4_MEASUREMENT_ID });
    return true;
  } catch {
    return false;
  }
}
