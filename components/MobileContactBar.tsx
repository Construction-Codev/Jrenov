import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import { BUSINESS, PHONE_HREF } from "@/lib/site";

/**
 * Accès direct aux deux actions prioritaires sur les petits écrans.
 * Le clic téléphone reste suivi par AnalyticsEvents via le lien tel: natif.
 * Masqué dès md, lorsque les appels et devis sont déjà accessibles dans le header.
 */
export default function MobileContactBar() {
  return (
    <nav
      aria-label="Contacter Jrenov rapidement"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_28px_rgba(15,23,42,0.12)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
        <a
          href={PHONE_HREF}
          aria-label={`Appeler Jrenov au ${BUSINESS.phoneDisplay}`}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
          Appeler
        </a>
        <Link
          href="/devis"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-3 text-sm font-extrabold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Devis gratuit
        </Link>
      </div>
    </nav>
  );
}
