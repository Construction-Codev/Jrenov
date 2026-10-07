import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  MapPin,
  Phone,
  FileText,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ContactCta from "@/components/ContactCta";
import { RealisationCard, RealisationCompactCard } from "@/components/RealisationCard";
import { BUSINESS, pageMetadata } from "@/lib/site";
import { getService } from "@/lib/services";
import { getRealisation, type Realisation } from "@/lib/content";
import { LOCAL_AREAS, getLocalArea, validateLocalAreas, type LocalArea } from "@/lib/local-areas";
import { localPageJsonLd } from "@/lib/structured-data";
import type { LocalSectionKey } from "@/data/local-areas";

// Seules les pages locales déclarées dans data/local-areas.ts existent : tout autre slug renvoie une 404.
export const dynamicParams = false;

type Props = {
  params: Promise<{ localSlug: string }>;
};

export function generateStaticParams() {
  validateLocalAreas();
  return LOCAL_AREAS.map((area) => ({ localSlug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { localSlug } = await params;
  const area = getLocalArea(localSlug);
  if (!area) return {};

  return pageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/${area.slug}`,
  });
}

const PHONE_HREF = `tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`;

const PROCESS_STEPS = [
  { step: "01", title: "Premier contact", desc: "Par téléphone ou via le formulaire de devis en ligne." },
  { step: "02", title: "Diagnostic sur place", desc: "Visite gratuite pour examiner la toiture et ses raccords." },
  { step: "03", title: "Devis détaillé", desc: "Gratuit et sans engagement, avec le détail des travaux." },
  { step: "04", title: "Réalisation", desc: "Travaux couverts par notre garantie décennale." },
];

function resolveRealisations(slugs: string[]): Realisation[] {
  return slugs.map((slug) => getRealisation(slug)).filter((item): item is Realisation => Boolean(item));
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-3 mb-8">
      <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">{eyebrow}</span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{title}</h2>
    </div>
  );
}

function renderSection(key: LocalSectionKey, area: LocalArea): ReactNode {
  switch (key) {
    case "intro":
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <SectionHeading eyebrow={`Jrenov à ${area.city}`} title={area.intro.title} />
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {area.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      );

    case "context":
      return (
        <section key={key} className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Contexte local" title={area.context.title} />
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {area.context.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      );

    case "issues":
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SectionHeading eyebrow="Problèmes de toiture" title={area.issues.title} />
          <div className="grid md:grid-cols-3 gap-6">
            {area.issues.items.map((issue) => (
              <div key={issue.title} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{issue.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{issue.text}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "services":
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SectionHeading eyebrow="Nos prestations" title={area.services.title} />
          <p className="text-slate-600 text-sm sm:text-base mb-6">{area.services.intro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {area.services.items.map(({ service: serviceKey, text }) => {
              const service = getService(serviceKey);
              const Icon = service.icon;
              return (
                <div key={serviceKey} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{text}</p>
                    <Link
                      href={service.href}
                      className="text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
                    >
                      Découvrir la prestation <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );

    case "realisations": {
      const local = resolveRealisations(area.realisations.localSlugs);
      const nearby = resolveRealisations(area.realisations.nearbySlugs);
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SectionHeading eyebrow="Preuve de chantier" title={area.realisations.title} />
          <p className="text-slate-600 text-sm sm:text-base mb-6">{area.realisations.intro}</p>
          <div className="space-y-6">
            {local.map((item) => (
              <RealisationCard key={item.slug} item={item} />
            ))}
          </div>
          {nearby.length > 0 && (
            <div className="pt-10 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">{area.realisations.nearbyTitle}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearby.map((item) => (
                  <RealisationCompactCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          )}
          <Link
            href="/realisations"
            className="mt-6 text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
          >
            Toutes nos réalisations <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      );
    }

    case "process":
      return (
        <section key={key} className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Prise en charge" title="Comment se déroule votre demande ?" />
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-3xl">{area.processIntro}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step) => (
                <div key={step.step} className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3">
                  <span className="text-3xl font-black text-amber-500/30 absolute top-4 right-4">{step.step}</span>
                  <h3 className="text-base font-bold text-slate-900 pr-8">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "nearby":
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <SectionHeading eyebrow="Zone d'intervention" title={area.nearby.title} />
          <p className="text-slate-600 text-sm sm:text-base mb-6">{area.nearby.intro}</p>
          <ul className="flex flex-wrap gap-3">
            {area.nearby.cities.map((city) => (
              <li key={city.name}>
                {city.slug ? (
                  <Link
                    href={`/${city.slug}`}
                    className="inline-flex items-center gap-1.5 bg-white border border-amber-300 text-slate-900 hover:bg-amber-50 hover:text-amber-700 font-semibold text-sm px-4 py-2 rounded-full transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Couvreur à {city.name}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-sm px-4 py-2 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {city.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/zones-intervention"
            className="mt-6 text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
          >
            Toutes nos zones d&apos;intervention <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      );

    case "faq":
      return (
        <section key={key} className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <SectionHeading eyebrow="Questions fréquentes" title={`Vos questions sur votre toiture à ${area.city}`} />
          <div className="space-y-4">
            {area.faq.map((item) => (
              <details key={item.question} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 open:border-amber-300">
                <summary className="flex items-start gap-3 cursor-pointer list-none font-bold text-slate-900">
                  <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item.question}</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed pt-3 pl-8">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      );
  }
}

export default async function LocalAreaPage({ params }: Props) {
  const { localSlug } = await params;
  const area = getLocalArea(localSlug);
  if (!area) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={localPageJsonLd(area)} />

      {/* 1. Hero */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{area.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{area.h1}</h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">{area.heroLead}</p>

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

          <p className="flex items-center gap-2 text-xs text-slate-400 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Siège : {BUSINESS.address.streetAddress}, {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality}
          </p>
        </div>
      </section>

      {area.sectionOrder.map((key) => renderSection(key, area))}

      <ContactCta
        title={`Un projet de toiture à ${area.city} ?`}
        text="Décrivez votre besoin en ligne ou appelez-nous : diagnostic et devis gratuits, sans engagement."
      />
    </div>
  );
}
