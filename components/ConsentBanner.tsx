"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_OPEN_EVENT,
  getAdsConsent,
  setAdsConsent,
  subscribeAdsConsent,
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
  type AdsConsent,
} from "@/lib/consent";
import { GA4_MEASUREMENT_ID } from "@/lib/google-analytics";

/**
 * Préférences de consentement par finalité. L'ancien choix Google Ads reste
 * inchangé ; il n'autorise pas automatiquement Google Analytics 4.
 * Rien de Google ne se charge si les deux finalités sont refusées/inconnues.
 */
export default function ConsentBanner() {
  const ads = useSyncExternalStore<AdsConsent | "ssr">(subscribeAdsConsent, getAdsConsent, () => "ssr");
  const analytics = useSyncExternalStore<AdsConsent | "ssr">(subscribeAnalyticsConsent, getAnalyticsConsent, () => "ssr");
  const ga4Active = GA4_MEASUREMENT_ID !== null;
  const [reopened, setReopened] = useState(false);
  const [allowAds, setAllowAds] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    setAllowAds(ads === "granted");
    setAllowAnalytics(analytics === "granted");
  }, [ads, analytics, reopened]);

  if (ads === "ssr" || analytics === "ssr") return null;
  if (ads !== "unknown" && (!ga4Active || analytics !== "unknown") && !reopened) return null;

  const choose = (adValue: boolean, analyticsValue: boolean) => {
    setAdsConsent(adValue);
    if (ga4Active) setAnalyticsConsent(analyticsValue);
    setReopened(false);
  };
  const actionClass =
    "min-h-11 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-400";

  return (
    <div role="region" aria-label="Préférences de cookies" className="border-t-4 border-amber-500 bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl space-y-1">
            <p className="text-sm font-bold text-white sm:text-base">Choisissez les cookies autorisés</p>
            <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
              Nous utilisons les cookies Google uniquement avec votre accord.
              Vous pouvez autoriser les mesures d&apos;audience sans autoriser les publicités, ou l&apos;inverse.{" "}
              <Link href="/mentions-legales#cookies" className="underline hover:text-amber-400">En savoir plus</Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => choose(false, false)} className={actionClass}>Tout refuser</button>
            <button type="button" onClick={() => choose(allowAds, allowAnalytics)} className={actionClass}>Enregistrer</button>
            <button type="button" onClick={() => choose(true, true)} className={actionClass}>Tout accepter</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              aria-label="Autoriser les cookies publicitaires Google Ads"
              type="checkbox"
              checked={allowAds}
              onChange={(e) => setAllowAds(e.currentTarget.checked)}
              className="h-4 w-4 accent-amber-500"
            />
            Publicité Google Ads (mesure des conversions)
          </label>
          {ga4Active && (
            <label className="flex cursor-pointer items-center gap-2">
              <input
                aria-label="Autoriser les cookies Google Analytics 4"
                type="checkbox"
                checked={allowAnalytics}
                onChange={(e) => setAllowAnalytics(e.currentTarget.checked)}
                className="h-4 w-4 accent-amber-500"
              />
              Mesure d&apos;audience Google Analytics 4
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
