import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import ServiceSilo from "@/components/ServiceSilo";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  FileText,
  Flame,
  Snowflake,
  TrendingDown,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Isolation de toiture et Sarking – métropole lyonnaise",
    description:
      "Sarking, combles perdus ou aménagés : Jrenov isole les toitures depuis Décines-Charpieu, dans l'Est lyonnais et la métropole de Lyon. Diagnostic et devis gratuits.",
    path: "/services/isolation",
  }),
};

const ISOLATION_TECHNIQUES = [
  {
    title: "Isolation par l'Extérieur (Sarking)",
    desc: "Méthode idéale lors d'une rénovation complète de couverture. Les panneaux isolants sont posés directement sur la charpente, évitant tout pont thermique et préservant l'espace habitable intérieur.",
    icon: Layers,
    badge: "Efficacité Maximale",
  },
  {
    title: "Isolation des Combles Aménagés",
    desc: "Pose d'isolant sous les rampants de toiture en une ou deux couches croisées avec pare-vapeur étanche à l'air. Parfait pour transformer vos combles en espace d'habitation confortable.",
    icon: Flame,
    badge: "Gain de Confort",
  },
  {
    title: "Isolation des Combles Perdus",
    desc: "Application par soufflage de laine de verre, laine de roche ou ouate de cellulose sur le plancher des combles. La solution la plus rapide et économique pour stopper la fuite de chaleur.",
    icon: TrendingDown,
    badge: "Ultra Rentable",
  },
];

const ADVANTAGES = [
  {
    title: "Moins de Pertes de Chaleur",
    desc: "Dans une maison mal isolée, la toiture est l'une des principales sources de déperdition thermique. Une isolation adaptée limite ces pertes et les besoins de chauffage.",
    icon: TrendingDown,
  },
  {
    title: "Confort Été comme Hiver",
    desc: "Garde la chaleur à l'intérieur en hiver et stoppe la surchauffe sous les toits durant les canicules lyonnaises.",
    icon: Snowflake,
  },
  {
    title: "Valorisation de votre Bien",
    desc: "Amélioration significative du DPE (Diagnostic de Performance Énergétique) et valeur verte renforcée pour votre maison.",
    icon: ShieldCheck,
  },
];

const MATERIALS = [
  { name: "Laine de Roche / Verre", detail: "Excellente isolation thermique et acoustique, incombustible et économique." },
  { name: "Laine de Bois / Fibre de Bois", detail: "Isolant biosourcé offrant un temps de déphasage élevé, idéal contre la chaleur estivale." },
  { name: "Ouate de Cellulose", detail: "Isolant écologique issu du recyclage, parfait pour le soufflage dans les combles perdus." },
  { name: "Polyuréthane / PIR", detail: "Haute performance thermique en faible épaisseur, idéal pour la méthode Sarking." },
];

const FAQ: FaqItem[] = [
  {
    question: "Sarking ou isolation par l'intérieur : que choisir ?",
    answer:
      "Le Sarking pose l'isolant par l'extérieur, sur les chevrons : il ne réduit pas l'espace habitable et limite les ponts thermiques, mais il suppose de déposer la couverture. Il est donc surtout intéressant lors d'une réfection de toiture, comme à Caluire-et-Cuire avec 160 mm de fibre de bois. Si la couverture est en bon état, l'isolation sous rampants, par l'intérieur, évite de toucher aux tuiles.",
  },
  {
    question: "Combles perdus ou combles aménagés : qu'est-ce qui change ?",
    answer:
      "Des combles perdus, non habitables, s'isolent par soufflage d'isolant sur le plancher : à Chassieu, nous avons soufflé 35 cm de laine de roche. Des combles aménagés s'isolent sous les rampants, en une ou deux couches croisées, avec un pare-vapeur étanche à l'air.",
  },
  {
    question: "Sur quels critères choisir l'isolant ?",
    answer:
      "Sur la technique retenue (soufflage, rampants ou Sarking), l'épaisseur disponible, le confort d'été recherché et le budget. Les laines minérales sont économiques et incombustibles, la fibre de bois limite la surchauffe estivale, la ouate de cellulose se prête au soufflage et le polyuréthane offre une forte performance sous faible épaisseur.",
  },
];

export default function IsolationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("isolation"))} />
      
      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Travaux sous Garantie Décennale 10 Ans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Isolation de Toiture & Combles, de Décines-Charpieu à <span className="text-amber-400">Lyon</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Dans une maison mal isolée, la toiture est l&apos;une des premières sources de pertes de chaleur. Basé à Décines-Charpieu, Jrenov vous accompagne dans la rénovation thermique de votre toiture, dans l&apos;Est lyonnais comme à Lyon, pour améliorer votre confort thermique et réduire durablement vos factures d&apos;énergie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-5 h-5" />
              Demander un devis isolation
            </Link>

            <a
              href="tel:0465848885"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              Appeler le 04 65 84 88 85
            </a>
          </div>
        </div>
      </section>

      {/* 2. Avantages clés */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            Pourquoi Isoler ?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Les bénéfices d&apos;une isolation thermique performante
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
              >
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{adv.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Techniques d'isolation */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
              Nos Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Nos méthodes d&apos;isolation adaptées à votre habitation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ISOLATION_TECHNIQUES.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                        {tech.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{tech.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Isolants utilisés */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            Matériaux Qualitatifs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quel isolant choisir pour vos travaux ?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((mat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-slate-900 text-sm">{mat.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{mat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="isolation" />

      {/* FAQ (FAQPage généré depuis le contenu visible) */}
      <ServiceFaq title="Vos questions sur l'isolation de toiture" items={FAQ} />

      {/* 5. Banner Diagnostic thermique */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Factures de chauffage trop élevées ?
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Demandez un bilan isolation gratuit
            </h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Nos artisans se déplacent chez vous pour analyser votre toiture et définir la solution d&apos;isolation la plus performante.
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