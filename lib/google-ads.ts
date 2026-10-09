import { getAdsConsent } from "@/lib/consent";

/**
 * Google Ads : identifiants et conversion « Website lead ».
 *
 * La balise gtag.js est chargée par components/GoogleTag.tsx, uniquement après
 * consentement. La conversion n'est déclenchée QUE par trackLeadConversion(),
 * appelée après une réponse serveur confirmant l'envoi réel de la demande.
 * Aucune donnée personnelle n'est transmise.
 */
export const GOOGLE_ADS_ID = "AW-18401022050";
export const LEAD_CONVERSION_SEND_TO = "AW-18401022050/3zwjCM7KnZcdEOKgpcZE";

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
export function trackLeadConversion(submissionId: unknown): boolean {
  try {
    if (typeof submissionId !== "string" || submissionId === "") return false;
    if (typeof window === "undefined") return false;
    if (trackedSubmissions.has(submissionId)) return false;
    if (getAdsConsent() !== "granted") return false;
    if (typeof window.gtag !== "function") return false;

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
