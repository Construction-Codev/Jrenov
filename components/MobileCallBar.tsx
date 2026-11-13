"use client";

import { useCallback, useState } from "react";
import { Phone, PhoneCall } from "lucide-react";
import { CallbackDialog } from "@/components/CallbackRequest";
import { BUSINESS, PHONE_HREF } from "@/lib/site";

/**
 * Barre d'appel fixe en bas d'écran, uniquement sur mobile (< md).
 *
 * Sur téléphone, le numéro du header est masqué : sans cette barre, le visiteur
 * qui arrive d'une annonce doit ouvrir le menu pour trouver comment appeler.
 * Le lien « tel: » est suivi automatiquement par AnalyticsEvents (Vercel +
 * conversion Google Ads téléphone après consentement), avec l'emplacement
 * « mobile_bar » grâce à l'attribut data-cta-placement.
 */
export default function MobileCallBar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  return (
    <>
    <div
      data-cta-placement="mobile_bar"
      className="md:hidden bg-white border-t border-slate-200 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <a
          href={PHONE_HREF}
          aria-label={`Appeler Jrenov au ${BUSINESS.phoneDisplay}`}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Appeler · {BUSINESS.phoneDisplay}</span>
        </a>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <PhoneCall className="w-4 h-4" aria-hidden="true" />
          <span>Rappel 24h/24</span>
        </button>
      </div>
    </div>
    <CallbackDialog open={dialogOpen} onClose={closeDialog} />
    </>
  );
}
