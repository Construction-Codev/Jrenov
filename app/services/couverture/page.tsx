import type { Metadata } from "next";
import { pageMetadata, BUSINESS, PHONE_HREF } from "@/lib/site";
import { getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import QuickCallbackForm from "@/components/QuickCallbackForm";
import ServiceSilo from "@/components/ServiceSilo";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  FileText,
  Hammer,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Rénovation et réparation de toiture dans l'Est lyonnais",
    description:
      "Réfection ou réparation de toiture en tuiles, ardoise ou bac acier par Jrenov, couvreur basé à Décines-Charpieu, dans l'Est lyonnais et la métropole. Devis gratuit.",
    path: "/services/couverture",
  }),
};

const MATERIALS = [
  {
    name: "Tuiles en Terre Cuite",
    desc: "Esthétiques, durables et traditionnelles (tuiles romanes, plates ou emboîtement). Le choix classique dans la région lyonnaise.",
  },
  {
    name: "Tuiles en Béton",
    desc: "Excellente résistance aux intempéries et au gel, proposant un bon rapport qualité/prix pour les grandes surfaces.",
  },
  {
    name: "Ardoises Naturelles",
    desc: "Élégance haut de gamme et longévité exceptionnelle. Idéales pour les toitures à forte pente et le patrimoine.",
  },
  {
    name: "Bac Acier & Toitures Plates",
    desc: "Solution moderne, étanche et ultra-résistante pour annexes, garages ou bâtiments industriels et contemporains.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnostic & Devis Gratuit",
    desc: "Inspection visuelle sur place et analyse de la charpente et de l'étanchéité.",
  },
  {
    step: "02",
    title: "Mise en Sécurité & Dépose",
    desc: "Installation des échafaudages et retrait des anciens matériaux usagés.",
  },
  {
    step: "03",
    title: "Pose de l'Écran & Liteonnage",
    desc: "Installation du pare-pluie (HPV) et pose des lattes de support ventilées.",
  },
  {
    step: "04",
    title: "Pose de la Couverture & Finitions",
    desc: "Alignement précis des matériaux et réalisation de l'étanchéité sur les berges et faîtages.",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Faut-il réparer ou refaire entièrement sa toiture ?",
    answer:
      "Tout dépend de l'état général de la couverture. Quelques tuiles cassées ou un faîtage abîmé se réparent ponctuellement : à Fontaines-sur-Saône, nous avons remplacé un faîtage scellé au mortier par une pose à sec. Quand les tuiles sont devenues poreuses sur l'ensemble du toit, une réfection complète s'impose, comme à Villeurbanne sur une couverture centenaire. Le diagnostic, gratuit, permet de trancher.",
  },
  {
    question: "Quels matériaux de couverture posez-vous ?",
    answer:
      "Tuiles en terre cuite (romanes, plates ou à emboîtement), tuiles en béton, ardoises naturelles et bac acier pour les annexes, garages ou bâtiments contemporains. Le choix dépend de la pente du toit, du style de la maison et des règles d'urbanisme locales.",
  },
  {
    question: "Que faire quand une tuile est cassée ou a glissé ?",
    answer:
      "Ne tardez pas : par une seule tuile manquante, l'eau peut atteindre l'isolant puis la charpente. Ne montez pas sur le toit vous-même. Si de l'eau entre déjà dans la maison, appelez notre service d'urgence fuite, assuré 7j/7.",
  },
];

export default function CouverturePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("couverture"))} />
      
      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Travaux sous Garantie Décennale 10 Ans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Réparation et rénovation de toiture à <span className="text-amber-400">Décines-Charpieu et dans l’Est lyonnais</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Fuite, infiltration, tuile cassée ou réfection complète ? Décrivez votre problème à un couvreur local. Jrenov intervient depuis Décines-Charpieu dans l&apos;Est lyonnais et la métropole de Lyon. Devis gratuit et sans engagement.
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
          <a href="#rappel" className="inline-block text-sm font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200">
            Ou demandez à être rappelé avec votre nom et votre téléphone
          </a>
        </div>
      </section>

      <QuickCallbackForm />

      {/* Parcours court pour les visiteurs arrivant d’une recherche de réparation. */}
      <section aria-labelledby="besoin-toiture" className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">Votre besoin, notre réponse</span>
            <h2 id="besoin-toiture" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Quel problème rencontrez-vous sur votre toiture ?
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Pas besoin de connaître les termes techniques pour nous contacter. Indiquez simplement la nature de votre problème : nous vous recontacterons pour préciser les travaux.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-slate-900">
                  <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
                  Fuite ou infiltration
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Des traces d&apos;humidité ou de l&apos;eau qui entre ? Pour une urgence en cours, privilégiez un appel direct.
                </p>
              </div>
              <a href={PHONE_HREF} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Appeler Jrenov
              </a>
            </article>
            <article className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900">Tuiles cassées ou déplacées</h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  Réparation ponctuelle, solin ou faîtage : décrivez les dégâts, même sans mesure de surface.
                </p>
              </div>
              <Link href="/devis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 text-sm font-extrabold text-slate-950 hover:bg-amber-400">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Demander un devis
              </Link>
            </article>
            <article className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900">Rénovation de couverture</h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  Toiture vieillissante ou projet de réfection ? Consultez d&apos;abord nos réalisations dans la métropole.
                </p>
              </div>
              <Link href="/realisations" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-900 hover:border-amber-500">
                Voir nos chantiers réalisés
              </Link>
            </article>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-700" aria-hidden="true" />Travaux couverts par la garantie décennale</span>
            <span>Artisan basé à Décines-Charpieu</span>
            <span>Devis gratuit et sans engagement</span>
          </div>
        </div>
      </section>

      {/* 3. Section Matériaux */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Matériaux & Savoir-faire</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Tous types de couvertures maîtrisés
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Nous sélectionnons des matériaux de haute qualité adaptés aux contraintes climatiques du Rhône et aux règles d&apos;urbanisme de la région lyonnaise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section Processus de Rénovation */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Méthodologie</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Comment se déroule votre chantier de toiture ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3">
                <span className="text-3xl font-black text-amber-500/30 absolute top-4 right-4">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 pr-8">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="couverture" />

      {/* FAQ (FAQPage généré depuis le contenu visible) */}
      <ServiceFaq title="Vos questions sur la rénovation de toiture" items={FAQ} />

      {/* 4. Banner Urgence / Infiltration */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Dépannage Rapide
            </div>
            <h3 className="text-xl sm:text-2xl font-black">Une fuite d&apos;eau suite à un orage ?</h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Depuis Décines-Charpieu, nos équipes se déplacent rapidement dans l&apos;Est lyonnais et la métropole pour bâcher votre toit et effectuer une mise hors d&apos;eau temporaire ou définitive.
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition shrink-0 uppercase text-xs sm:text-sm tracking-wider"
          >
            Appel d&apos;urgence : {BUSINESS.phoneDisplay}
          </a>
        </div>
      </section>

    </div>
  );
}