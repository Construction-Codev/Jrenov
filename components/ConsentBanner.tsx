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
 * Bandeau de consentement aux cookies publicitaires (Google Ads).
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
    "h-11 min-w-28 px-5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 text-base font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

  // Bandeau en bas d'écran, dans le conteneur « sticky » du layout (avec la barre d'appel mobile).
  // Bien visible (liseré, titre, grands boutons) mais sans fond assombri ni blocage : le site,
  // le numéro de téléphone et les formulaires restent utilisables sans avoir répondu.
  return (
    <div
      role="region"
      aria-label="Cookies publicitaires"
      className="bg-slate-900 border-t-4 border-amber-500 text-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-1 space-y-1">
          <p className="text-sm sm:text-base font-bold text-white">Acceptez-vous les cookies de mesure ?</p>
          <p className="text-xs sm:text-sm leading-snug">
            Avec votre accord, nous utilisons des cookies Google Ads pour mesurer les demandes provenant de nos
            annonces.{" "}
            <Link href="/mentions-legales#cookies" className="underline hover:text-amber-400 whitespace-nowrap">
              En savoir plus
            </Link>
          </p>
        </div>
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
