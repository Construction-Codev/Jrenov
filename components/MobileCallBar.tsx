import { Phone, FileText } from "lucide-react";
import Link from "next/link";
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
  return (
    <div
      data-cta-placement="mobile_bar"
      className="md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
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
        <Link
          href="/devis"
          className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Devis</span>
        </Link>
      </div>
    </div>
  );
}
