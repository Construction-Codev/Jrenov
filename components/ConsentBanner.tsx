"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import {
  CONSENT_OPEN_EVENT,
  getAdsConsent,
  setAdsConsent,
  subscribeAdsConsent,
  type AdsConsent,
} from "@/lib/consent";

/**
 * Bannière de consentement aux cookies publicitaires (Google Ads).
 * Affichée tant qu'aucun choix n'est enregistré, ou à la demande via « Gérer mes cookies ».
 * « Accepter » et « Refuser » ont exactement le même style. Sans acceptation, rien n'est chargé.
 * Non bloquante : le site et les formulaires restent utilisables quel que soit le choix.
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
    "flex-1 sm:flex-none min-w-28 bg-slate-100 hover:bg-white text-slate-950 font-bold text-sm py-2.5 px-5 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

  return (
    <div
      role="region"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-slate-900 text-slate-300 border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p id="consent-title" className="text-sm font-bold text-white">
              Cookies publicitaires
            </p>
            <p className="text-xs leading-relaxed">
              Avec votre accord, Google Ads mesure si nos annonces mènent à une demande de contact ou de devis.
              Refuser ne change rien à l&apos;utilisation du site. Vous pouvez modifier votre choix à tout moment
              via « Gérer mes cookies » en bas de page.{" "}
              <Link href="/mentions-legales#cookies" className="underline hover:text-amber-400">
                En savoir plus
              </Link>
            </p>
            {consent !== "unknown" && (
              <p className="text-xs text-slate-400">
                Choix actuel : {consent === "granted" ? "accepté" : "refusé"}.
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 shrink-0">
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
