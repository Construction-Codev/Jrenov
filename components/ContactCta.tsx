import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { BUSINESS } from "@/lib/site";

const PHONE_HREF = `tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`;

/** Bandeau d'appel à l'action (devis + téléphone), au style des pages services. */
export default function ContactCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
          <p className="text-slate-300 text-sm max-w-lg">{text}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/devis"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition text-center text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Devis gratuit
          </Link>
          <a
            href={PHONE_HREF}
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl transition text-center text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
