import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, FileText, ArrowRight, Building2 } from "lucide-react";
import ContactCta from "@/components/ContactCta";
import { BUSINESS, pageMetadata } from "@/lib/site";
import { LOCAL_AREAS, ZONE_SECTORS, getLocalArea, realisationsInCommune } from "@/lib/local-areas";

export const metadata: Metadata = pageMetadata({
  title: "Zones d'intervention autour de Décines-Charpieu",
  description:
    "Basé à Décines-Charpieu, Jrenov intervient dans l'Est lyonnais, à Lyon et dans un rayon d'environ 50 km : communes desservies et chantiers réalisés.",
  path: "/zones-intervention",
});

const PHONE_HREF = `tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`;

export default function ZonesInterventionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      {/* 1. Hero */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Rayon d&apos;environ 50 km autour de Décines-Charpieu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Nos zones d&apos;intervention <span className="text-amber-400">autour de Décines-Charpieu</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Jrenov est basé à Décines-Charpieu, dans l&apos;Est lyonnais. Depuis ce siège, nous intervenons dans
            la métropole de Lyon et dans un rayon d&apos;environ 50 km pour vos travaux de couverture, de zinguerie,
            d&apos;isolation et d&apos;entretien de toiture.
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
              href={PHONE_HREF}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              Appeler le {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Siège */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Un seul point de départ : Décines-Charpieu</h2>
            <p>
              Le siège de Jrenov est situé au {BUSINESS.address.streetAddress},{" "}
              {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality}. C&apos;est de là que partent nos
              interventions : plus un chantier en est proche, plus il est simple d&apos;organiser une visite rapide.
            </p>
            <p>
              Les communes listées ci-dessous sont celles où nous avons déjà travaillé ou qui entourent directement
              notre siège. Cette liste n&apos;est pas exhaustive : si votre commune n&apos;y figure pas, contactez-nous
              pour vérifier que nous pouvons intervenir.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pages locales publiées */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Pages locales</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Votre couvreur dans l&apos;Est lyonnais</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCAL_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400 hover:shadow-md transition group space-y-2"
              >
                <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {area.city} ({area.postalCode})
                </span>
                <span className="block text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
                  Couvreur à {area.city}
                </span>
                <span className="block text-xs sm:text-sm text-slate-600 leading-relaxed">{area.heroBadge}</span>
                <span className="text-amber-600 text-sm font-bold inline-flex items-center gap-1 pt-1">
                  Voir la page <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Secteurs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center space-y-3">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Secteurs desservis</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Communes et chantiers par secteur</h2>
        </div>

        {ZONE_SECTORS.map((sector) => (
          <div key={sector.key} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">{sector.name}</h3>
              <p className="text-sm text-slate-600">{sector.description}</p>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sector.communes.map((commune) => {
                const area = commune.slug ? getLocalArea(commune.slug) : undefined;
                const projects = realisationsInCommune(commune.name);
                return (
                  <li key={commune.name} className="border border-slate-100 rounded-xl p-4 space-y-2">
                    {area ? (
                      <Link
                        href={`/${area.slug}`}
                        className="font-bold text-slate-900 hover:text-amber-600 transition inline-flex items-center gap-1.5"
                      >
                        <MapPin className="w-4 h-4 text-amber-500" />
                        Couvreur à {commune.name}
                      </Link>
                    ) : (
                      <span className="font-bold text-slate-700 inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {commune.name}
                      </span>
                    )}
                    {projects.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-600">
                        {projects.map((project) => (
                          <li key={project.slug}>
                            <Link href={`/realisations/${project.slug}`} className="hover:text-amber-600 hover:underline">
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <ContactCta
        title="Votre commune n'est pas dans la liste ?"
        text="Nous intervenons dans un rayon d'environ 50 km autour de Décines-Charpieu. Appelez-nous ou demandez un devis en ligne."
      />
    </div>
  );
}
