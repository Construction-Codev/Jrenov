/**
 * Consentement aux cookies publicitaires (Google Ads).
 *
 * Le site n'a pas encore de bannière de consentement : tant qu'aucun choix n'a été
 * enregistré, le consentement vaut « inconnu » et AUCUNE balise publicitaire n'est
 * chargée. Une future bannière (ou CMP) n'a qu'à appeler `setAdsConsent(true|false)`.
 * Le choix est conservé dans le navigateur et diffusé via l'événement CONSENT_EVENT.
 */

export type AdsConsent = "granted" | "denied" | "unknown";

export const CONSENT_STORAGE_KEY = "jrenov-consent-ads";
export const CONSENT_EVENT = "jrenov:consent-change";

export function getAdsConsent(): AdsConsent {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch {
    // Stockage bloqué (navigation privée stricte…) : pas de consentement présumé
    return "unknown";
  }
}

export function setAdsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  const value: AdsConsent = granted ? "granted" : "denied";
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Le choix vaudra au moins pour la page en cours
  }

  // Balise déjà chargée (consentement retiré ensuite) : on informe Google
  if (typeof window.gtag === "function") {
    try {
      const state = granted ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    } catch {
      // Ne jamais casser l'interface
    }
  }

  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Abonnement compatible useSyncExternalStore (même onglet + autres onglets). */
export function subscribeAdsConsent(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
