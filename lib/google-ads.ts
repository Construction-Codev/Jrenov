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
 *
 * Suivi avancé des conversions : pour « Website lead » uniquement, et seulement si le
 * visiteur a accepté les cookies publicitaires, l'e-mail et le téléphone saisis sont
 * passés à gtag (`user_data`), qui les hache (SHA-256) dans le navigateur avant envoi.
 * Rien d'autre du formulaire n'est transmis ; le clic téléphone n'envoie aucune donnée.
 */
export const GOOGLE_ADS_ID = "AW-18401022050";
export const LEAD_CONVERSION_SEND_TO = "AW-18401022050/3zwjCM7KnZcdEOKgpcZE";
// Action « Lead par téléphone » dans Google Ads. Libellé copié depuis l'extrait d'événement :
// ne jamais le ressaisir à la main (l'ancien libellé contenait un « l » à la place d'un « 1 »).
export const PHONE_CONVERSION_SEND_TO = "AW-18401022050/Sl_XCK3V87EdEOKgpcZE";

/** Délai pendant lequel un nouveau clic téléphone n'est pas recompté (double tap, double écoute). */
export const PHONE_CONVERSION_COOLDOWN_MS = 2000;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Coordonnées saisies dans le formulaire, utilisées pour le suivi avancé des conversions. */
export type LeadUserData = { email?: unknown; phone?: unknown };

/** E-mail en minuscules sans espaces, ou null s'il n'a pas la forme d'une adresse. */
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

/**
 * Numéro au format E.164 attendu par Google (« 06 12 34 56 78 » → « +33612345678 »).
 * Un numéro sans indicatif est considéré comme français. Retourne null s'il est inexploitable.
 */
export function normalizePhoneE164(value: unknown): string | null {
  if (typeof value !== "string") return null;
  let digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (!digits.startsWith("+")) {
    if (/^0\d{9}$/.test(digits)) digits = `+33${digits.slice(1)}`;
    else if (/^33\d{9}$/.test(digits)) digits = `+${digits}`;
    else return null;
  }
  // « +33 (0)6… » : le 0 après l'indicatif français n'appartient pas au numéro
  digits = digits.replace(/^\+330(\d{9})$/, "+33$1");
  return /^\+[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

/** Données transmises à gtag pour le suivi avancé, ou null si rien d'exploitable. */
export function buildUserData(userData?: LeadUserData): { email?: string; phone_number?: string } | null {
  if (!userData) return null;
  const email = normalizeEmail(userData.email);
  const phone = normalizePhoneE164(userData.phone);
  if (!email && !phone) return null;
  return { ...(email ? { email } : {}), ...(phone ? { phone_number: phone } : {}) };
}

/** Soumissions déjà comptabilisées dans cet onglet (protection anti-doublon). */
const trackedSubmissions = new Set<string>();

/**
 * Déclenche la conversion pour une demande confirmée par le serveur.
 * `submissionId` est l'identifiant renvoyé par l'API après envoi effectif :
 * sans lui (honeypot, réponse inattendue), rien n'est envoyé. Il sert aussi de
 * transaction_id pour que Google dédoublonne de son côté.
 *
 * `userData` (e-mail, téléphone du formulaire) alimente le suivi avancé des conversions :
 * il n'est transmis qu'après le contrôle du consentement, juste avant la conversion.
 *
 * Ne lève jamais : absence de gtag, refus de consentement ou bloqueur sont ignorés.
 */
export function trackLeadConversion(submissionId: unknown, userData?: LeadUserData): boolean {
  try {
    if (typeof submissionId !== "string" || submissionId === "") return false;
    if (typeof window === "undefined") return false;
    if (trackedSubmissions.has(submissionId)) return false;
    if (getAdsConsent() !== "granted") return false;
    if (typeof window.gtag !== "function") return false;

    trackedSubmissions.add(submissionId);
    const enhanced = buildUserData(userData);
    if (enhanced) window.gtag("set", "user_data", enhanced);
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
