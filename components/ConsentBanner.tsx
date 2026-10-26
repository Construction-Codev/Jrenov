"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_OPEN_EVENT,
  getAdsConsent,
  setAdsConsent,
  subscribeAdsConsent,
  type AdsConsent,
} from "@/lib/consent";

/**
 * Bandeau compact de consentement aux cookies publicitaires (Google Ads).
 * Affiché tant qu'aucun choix n'est enregistré, ou à la demande via « Gérer mes cookies ».
 * « Accepter » et « Refuser » ont exactement le même style. Sans acceptation, rien n'est chargé.
 * Non bloquant : la navigation n'est jamais considérée comme une acceptation, et le site
 * comme les formulaires restent utilisables quel que soit le choix.
 */
export default function ConsentBanner() {
  // Côté serveur : « ssr » pour ne jamais afficher la bannière dans le HTML statique
  const consent = useSyncExternalStore<AdsConsent | "ssr">(subscribeAdsConsent, getAdsConsent, () => "ssr");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (consent === "ssr" || (consent !== "unknown" && !reopened)) return null;

  const choose = (granted: boolean) => {
    setAdsConsent(granted);
    setReopened(false);
  };

  const buttonClass =
    "h-9 min-w-24 px-4 rounded-lg bg-slate-100 hover:bg-white text-slate-950 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

  // Choix visible dès l’arrivée, au-dessus des boutons mobiles ; aucun cookie publicitaire avant accord.
  return (
    <div
      role="region"
      aria-label="Cookies publicitaires"
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 border-t border-slate-700 bg-slate-900/95 text-slate-300 shadow-lg backdrop-blur md:bottom-0"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <p className="text-xs leading-snug flex-1">
          Avec votre accord, nous utilisons des cookies Google Ads pour mesurer les demandes provenant de nos
          annonces.{" "}
          <Link href="/mentions-legales#cookies" className="underline hover:text-amber-400 whitespace-nowrap">
            En savoir plus
          </Link>
        </p>
        <div className="grid grid-cols-2 gap-2 shrink-0">
          <button type="button" onClick={() => choose(false)} className={buttonClass}>
            Refuser
          </button>
          <button type="button" onClick={() => choose(true)} className={buttonClass}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
