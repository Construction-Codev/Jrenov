import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Phone, FileText, CheckCircle2, ArrowRight, Images } from "lucide-react";
import { pageMetadata, BUSINESS } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Nos prestations de couverture et toiture",
  description:
    "Couverture, zinguerie, isolation, démoussage, fuites et fenêtres de toit : les prestations de Jrenov, couvreur basé à Décines-Charpieu, dans l'Est lyonnais et à Lyon.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      {/* 1. Hero de la page */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Travaux sous Garantie Décennale 10 Ans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Nos prestations de <span className="text-amber-400">couverture</span> et de toiture
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Basé à Décines-Charpieu, Jrenov intervient dans l&apos;Est lyonnais, à Lyon et dans toute la métropole pour la rénovation, la
            réparation, l&apos;isolation et l&apos;entretien de votre toiture, y compris en urgence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-5 h-5" />
              Demander un devis gratuit
            </Link>

            <a
              href={`tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              Appeler le {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Grille des prestations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            Savoir-faire Artisan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Six prestations au service de votre toit
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Choisissez la prestation qui correspond à votre besoin pour découvrir nos méthodes, les matériaux
            utilisés et le déroulement du chantier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.href}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    <Link href={service.href} className="hover:text-amber-600 transition">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={service.href}
                  className="text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
                >
                  Découvrir la prestation <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Lien vers les réalisations */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto">
            <Images className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Nos chantiers en images
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Couverture, zinguerie, fenêtres de toit ou réparation de fuite : consultez le détail de nos réalisations dans la
            métropole lyonnaise.
          </p>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm transition"
          >
            Voir nos réalisations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Banner Devis */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black">Un projet de toiture ?</h2>
            <p className="text-slate-300 text-sm max-w-lg">
              Décrivez-nous votre besoin : nous vous proposons un devis détaillé et sans engagement.
            </p>
          </div>
          <Link
            href="/devis"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition shrink-0 uppercase text-xs sm:text-sm tracking-wider"
          >
            Obtenir un devis gratuit
          </Link>
        </div>
      </section>

    </div>
  );
}
