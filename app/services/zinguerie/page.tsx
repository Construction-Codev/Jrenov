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
  Droplets,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Zingueur à Décines-Charpieu – Gouttières, chéneaux, noues",
    description:
      "Gouttières zinc, alu ou PVC, chéneaux, noues, solins, abergements : Jrenov, zingueur basé à Décines-Charpieu, intervient dans l'Est lyonnais et la métropole.",
    path: "/services/zinguerie",
  }),
};

const ZINGUERIE_SERVICES = [
  {
    title: "Gouttières Zinc & PVC",
    desc: "Pose, remplacement et réparation de gouttières pendantes ou nantaises pour évacuer efficacement les eaux pluviales et protéger vos façades.",
    icon: Droplets,
  },
  {
    title: "Chéneaux & Noues",
    desc: "Fabrication sur-mesure et réfection de chéneaux encastrés et noues de toiture pour éviter toute infiltration dans les angles critiques.",
    icon: Home,
  },
  {
    title: "Abergements de Cheminée",
    desc: "Conception et étanchéité des sorties de toit, entourages de souches de cheminée et fenêtres de toit (Velux).",
    icon: Wrench,
  },
  {
    title: "Habillage de Bandeaux & Rives",
    desc: "Protection de vos sous-faces et rives de toit en alu ou zinc pour embellir la charpente et supprimer l'entretien du bois.",
    icon: ShieldCheck,
  },
];

const MATERIALS = [
  {
    name: "Zinc (Traditionnel & Résistant)",
    details: "Matériau noble par excellence, d'une durée de vie supérieure à 40 ans. Excellente résistance aux variations thermiques de la région lyonnaise.",
  },
  {
    name: "Aluminium Lisse & Coloré",
    details: "Inoxydable, léger et disponible en plusieurs coloris pour s'harmoniser parfaitement avec l'architecture de votre bâtiment.",
  },
  {
    name: "PVC Économique",
    details: "Solution accessible et facile d'entretien pour les petits budgets, idéale pour les dépendances et annexes.",
  },
  {
    name: "Cuivre (Haut de Gamme)",
    details: "Esthétique unique qui se patine avec le temps. Durabilité extrême pour les demeures de caractère et toitures d'exception.",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Zinc, aluminium ou PVC : quel matériau choisir pour ses gouttières ?",
    answer:
      "Le zinc est le matériau traditionnel, durable et façonnable sur mesure. L'aluminium est inoxydable, léger et disponible en plusieurs coloris, et peut être profilé sur place sans raccord, comme à Dagneux. Le PVC reste la solution économique, adaptée aux annexes. Le choix dépend du budget, de l'architecture et de la couleur de la façade.",
  },
  {
    question: "Quelle est la différence entre une gouttière et un chéneau ?",
    answer:
      "La gouttière est fixée en bas de pente, le long de la rive, et recueille l'eau d'un versant. Le chéneau est un canal intégré à l'ouvrage, par exemple encastré dans la toiture ou posé sur un mur, qui collecte l'eau d'un ou plusieurs versants. Les deux se réalisent notamment en zinc façonné.",
  },
  {
    question: "D'où vient une fuite autour d'une cheminée ?",
    answer:
      "Le plus souvent du raccord entre la souche et la couverture : mortier fissuré ou abergement dégradé. À Brignais, nous avons retiré le mortier fissuré au pied de la cheminée, puis façonné et soudé un abergement complet en zinc sur mesure.",
  },
];

export default function ZingueriePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("zinguerie"))} />
      
      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Travaux sous Garantie Décennale 10 Ans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Travaux de Zinguerie & Gouttières dans l&apos;<span className="text-amber-400">Est lyonnais</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Une mauvaise évacuation des eaux pluviales peut détériorer vos façades et créer des infiltrations d&apos;eau. Jrenov assure l&apos;installation, le remplacement et la réparation de tous vos éléments de zinguerie depuis Décines-Charpieu, dans l&apos;Est lyonnais et la métropole lyonnaise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-5 h-5" />
              Demander un devis zinguerie
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

      {/* 2. Cartes Prestations Zinguerie */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            Savoir-faire Artisan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Nos prestations sur-mesure de zinguerie
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Chaque toiture possède ses spécificités. Nous façonnons les éléments en atelier ou directement sur chantier pour une étanchéité durable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ZINGUERIE_SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Matériaux Proposés */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
              Choix des matériaux
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Des matériaux adaptés à vos contraintes & votre budget
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-600">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-bold text-slate-900">{mat.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {mat.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="zinguerie" />

      {/* FAQ (FAQPage généré depuis le contenu visible) */}
      <ServiceFaq title="Vos questions sur la zinguerie" items={FAQ} />

      {/* 4. Banner Diagnostic Fuite / Gouttière Percée */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Gouttière qui déborde ou fuit ?
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Demandez un contrôle d&apos;étanchéité gratuit
            </h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Nos artisans se déplacent depuis Décines-Charpieu, dans l&apos;Est lyonnais et la métropole, pour déboucher, nettoyer ou réparer vos éléments de zinguerie.
            </p>
          </div>
          <a
            href="tel:0465848885"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition shrink-0 uppercase text-xs sm:text-sm tracking-wider"
          >
            Appeler : 04 65 84 88 85
          </a>
        </div>
      </section>

    </div>
  );
}