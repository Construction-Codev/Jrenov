import type { Metadata } from "next";
import HeroBanner from "@/components/Banner";
import Link from "next/link";
import { BUSINESS, DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/site";
import { realisations, frenchDateToIso } from "@/lib/content";
import { LOCAL_AREAS } from "@/lib/local-areas";
import { SERVICES } from "@/lib/services";
import {
  ArrowRight,
  Shield,
  Phone,
  Clock,
  MapPin,
  FileCheck,
  LucideIcon,
} from "lucide-react";

// Types
interface EngagementItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const metadata: Metadata = pageMetadata({
  absoluteTitle: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

const ENGAGEMENTS: EngagementItem[] = [
  { icon: Clock, title: "Intervention sous 24h", desc: "Pour les urgences et fuites" },
  { icon: Shield, title: "Garantie Décennale", desc: "Travaux assurés pendant 10 ans" },
  { icon: FileCheck, title: "Devis Gratuit", desc: "Sans engagement sous 24h" },
  { icon: MapPin, title: "Basé à Décines-Charpieu", desc: "Lyon, métropole & ~50 km" },
];

// Les 3 chantiers les plus récents (dates issues de data/realisations.json)
const latestRealisations = [...realisations]
  .sort((a, b) => (frenchDateToIso(b.date) ?? "").localeCompare(frenchDateToIso(a.date) ?? ""))
  .slice(0, 3);

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* 1. Hero Banner */}
        <HeroBanner />

        {/* 2. Bandes d'engagements & réassurance */}
        <section className="bg-slate-900 text-white py-8 border-t border-amber-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              {ENGAGEMENTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Grille des Services */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
              Nos Prestations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Nos solutions de couverture dans l&apos;Est lyonnais et à Lyon
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              Jrenov accompagne les particuliers et professionnels pour tous leurs travaux de toiture, en neuf comme en rénovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href={service.href}
                      className="text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
                    >
                      En savoir plus &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Présentation de l'entreprise & zone d'intervention */}
        <section className="bg-white border-y border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
              <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
                Qui sommes-nous ?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Jrenov, entreprise de couverture implantée à Décines-Charpieu
              </h2>
              <p>
                Jrenov est une entreprise individuelle de couverture créée en 2018 par Jason Robba. Son siège est
                installé au {BUSINESS.address.streetAddress}, à {BUSINESS.address.addressLocality}, au cœur de
                l&apos;Est lyonnais.
              </p>
              <p>
                Nous réalisons la rénovation et la réparation de couvertures (tuiles, ardoises, bac acier), les
                travaux de zinguerie, l&apos;isolation de toiture ainsi que le nettoyage et le démoussage. Les
                urgences, comme une fuite après un orage, sont prises en charge 7j/7.
              </p>
              <p>
                Depuis Décines-Charpieu, nous intervenons dans les communes voisines, à Lyon et dans l&apos;ensemble
                de la métropole, ainsi que dans un rayon d&apos;environ 50 km.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                <Link
                  href="/zones-intervention"
                  className="text-amber-600 hover:text-amber-700 font-bold inline-flex items-center gap-1 transition"
                >
                  Nos zones d&apos;intervention <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/realisations"
                  className="text-amber-600 hover:text-amber-700 font-bold inline-flex items-center gap-1 transition"
                >
                  Toutes nos réalisations <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h3 className="font-bold text-slate-900">Nos derniers chantiers</h3>
                <ul className="space-y-3">
                  {latestRealisations.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/realisations/${item.slug}`} className="group block">
                        <span className="text-xs text-amber-600 font-bold">{item.city}</span>
                        <span className="block text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h3 className="font-bold text-slate-900">Votre couvreur près de chez vous</h3>
                <ul className="flex flex-wrap gap-2">
                  {LOCAL_AREAS.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/${area.slug}`}
                        className="inline-flex items-center gap-1 bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-700 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full transition"
                      >
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {area.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Encart CTA Urgence & Contact Direct */}
        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black">
                Un projet de toiture ou une urgence ?
              </h2>
              <p className="font-medium text-slate-900/90 max-w-xl">
                Nos artisans sont à votre écoute pour établir un diagnostic gratuit et intervenir dans les plus brefs délais.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <a
                href="tel:0465848885"
                className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-6 py-4 rounded-xl text-center flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                04 65 84 88 85
              </a>
              <Link
                href="/devis"
                className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold px-6 py-4 rounded-xl text-center transition"
              >
                Devis en ligne
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}