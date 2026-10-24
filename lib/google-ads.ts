import { getAdsConsent } from "@/lib/consent";

/**
 * Google Ads : identifiants et conversions.
 *
 * La balise gtag.js est chargée par components/GoogleTag.tsx, uniquement après
 * consentement. Deux conversions distinctes :
 * - « Website lead » : trackLeadConversion(), appelée après une réponse serveur
 *   confirmant l'envoi réel de la demande ;
 * - clic téléphone : trackPhoneConversion(), appelée par la délégation de clics
 *   de components/AnalyticsEvents.tsx sur un vrai clic d'un lien « tel: ».
 * Pour les leads consentis, Google reçoit uniquement les coordonnées nécessaires au suivi avancé.
 * Les autres champs du formulaire et le message ne sont jamais transmis.
 */
export const GOOGLE_ADS_ID = "AW-18401022050";
export const LEAD_CONVERSION_SEND_TO = "AW-18401022050/3zwjCM7KnZcdEOKgpcZE";
export const PHONE_CONVERSION_SEND_TO = "AW-18401022050/xlbwCOjuo5sdEOKgpcZE";

/** Délai pendant lequel un nouveau clic téléphone n'est pas recompté (double tap, double écoute). */
export const PHONE_CONVERSION_COOLDOWN_MS = 2000;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Soumissions déjà comptabilisées dans cet onglet (protection anti-doublon). */
const trackedSubmissions = new Set<string>();

/**
 * Déclenche la conversion pour une demande confirmée par le serveur.
 * `submissionId` est l'identifiant renvoyé par l'API après envoi effectif :
 * sans lui (honeypot, réponse inattendue), rien n'est envoyé. Il sert aussi de
 * transaction_id pour que Google dédoublonne de son côté.
 *
 * Ne lève jamais : absence de gtag, refus de consentement ou bloqueur sont ignorés.
 */
export type LeadUserData = { email?: unknown; telephone?: unknown };

/** Google Tag chiffre automatiquement les coordonnées fournies via user_data.
 * Aucun contenu libre de formulaire n'est transmis et le consentement est requis.
 */
export function trackLeadConversion(submissionId: unknown, user?: LeadUserData): boolean {
  try {
    if (typeof submissionId !== "string" || submissionId === "") return false;
    if (typeof window === "undefined") return false;
    if (trackedSubmissions.has(submissionId)) return false;
    if (getAdsConsent() !== "granted") return false;
    if (typeof window.gtag !== "function") return false;

    const email = typeof user?.email === "string" ? user.email.trim().toLowerCase() : "";
    const rawPhone = typeof user?.telephone === "string" ? user.telephone.replace(/[\\s.()-]/g, "") : "";
    const phone = /^0[1-9]\\d{8}$/.test(rawPhone)
      ? "+33" + rawPhone.slice(1)
      : /^\\+33[1-9]\\d{8}$/.test(rawPhone) ? rawPhone : "";
    // Le paramètre user_data est traité par Google Tag pour les conversions avancées.
    // Ne jamais transmettre de coordonnées sans consentement publicitaire préalable.
    if (email || phone) {
      window.gtag("set", "user_data", {
        ...(email ? { email } : {}),
        ...(phone ? { phone_number: phone } : {}),
      });
    }
    trackedSubmissions.add(submissionId);
    window.gtag("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
      transaction_id: submissionId,
    });
    return true;
  } catch {
    return false;
  }
}

let lastPhoneConversionAt: number | null = null;

/**
 * Déclenche la conversion « clic téléphone ». À n'appeler que depuis un vrai clic
 * utilisateur sur un lien « tel: » (jamais au chargement d'une page).
 * Aucun paramètre : le numéro composé n'est jamais transmis.
 *
 * Ne bloque pas la navigation (pas de preventDefault, envoi en beacon) et ne lève
 * jamais : absence de gtag, consentement refusé/inconnu ou bloqueur sont ignorés.
 */
export function trackPhoneConversion(): boolean {
  try {
    if (typeof window === "undefined") return false;
    if (getAdsConsent() !== "granted") return false;
    if (typeof window.gtag !== "function") return false;

    const now = Date.now();
    if (lastPhoneConversionAt !== null && now - lastPhoneConversionAt < PHONE_CONVERSION_COOLDOWN_MS) {
      return false;
    }
    lastPhoneConversionAt = now;

    window.gtag("event", "conversion", {
      send_to: PHONE_CONVERSION_SEND_TO,
      transport_type: "beacon",
    });
    return true;
  } catch {
    return false;
  }
}

/** Réservé aux tests : réinitialise la protection anti-doublon des clics téléphone. */
export function resetPhoneConversionCooldown(): void {
  lastPhoneConversionAt = null;
}

/** Lit l'identifiant de soumission dans la réponse JSON de /api/contact ou /api/devis. */
export async function readSubmissionId(response: Response): Promise<string | null> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "submissionId" in data) {
      const id = (data as { submissionId: unknown }).submissionId;
      return typeof id === "string" && id !== "" ? id : null;
    }
  } catch {
    // Corps illisible : pas de conversion, mais le succès reste affiché
  }
  return null;
}
