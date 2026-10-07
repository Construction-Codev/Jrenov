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
  Sparkles,
  Droplets,
  Sun,
  CheckCircle2,
  AlertTriangle,
  Brush,
} from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Démoussage et nettoyage de toiture – Est lyonnais & Lyon",
    description:
      "Nettoyage de toiture, traitement anti-mousse et hydrofuge par Jrenov, basé à Décines-Charpieu : interventions dans l'Est lyonnais, à Lyon et dans la métropole.",
    path: "/services/demoussage",
  }),
};

const STEPS = [
  {
    step: "01",
    title: "Nettoyage Basse/Moyenne Pression",
    desc: "Élimination des dépôts de mousse, lichens et traces de pollution sans altérer la porosité ni casser vos tuiles.",
  },
  {
    step: "02",
    title: "Application du Traitement Fongicide",
    desc: "Pulvérisation d'un produit anti-mousse professionnel curatif et préventif qui détruit les germes en profondeur.",
  },
  {
    step: "03",
    title: "Traitement Hydrofuge Protecteur",
    desc: "Application d'un film protecteur imperméabilisant (incolore ou coloré) pour faire glisser l'eau et retarder le retour des mousses.",
  },
  {
    step: "04",
    title: "Vidange & Nettoyage des Gouttières",
    desc: "Nettoyage complet des gouttières et chéneaux pour rétablir un bon écoulement des eaux de pluie.",
  },
];

const ADVANTAGES = [
  {
    title: "Prévention des Infiltrations",
    desc: "La mousse retient l'eau de pluie qui, en gelant l'hiver, fait éclater les tuiles et crée des fuites.",
    icon: Droplets,
  },
  {
    title: "Esthétique & Valeur du Bien",
    desc: "Redonne à votre couverture son éclat d'origine et valorise immédiatement le visuel de votre maison.",
    icon: Sparkles,
  },
  {
    title: "Prolongation de la Durée de Vie",
    desc: "Un entretien régulier tous les 3 à 5 ans évite de devoir remplacer prématurément l'intégralité de la toiture.",
    icon: Sun,
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Quelle est la meilleure période pour nettoyer une toiture ?",
    answer:
      "Le printemps, pour éliminer les traces de l'hiver, et l'automne, après la chute des feuilles. Évitez les fortes chaleurs estivales et les périodes de gel.",
  },
  {
    question: "Faut-il appliquer un hydrofuge après chaque démoussage ?",
    answer:
      "Ce n'est pas obligatoire : l'hydrofuge est une protection complémentaire. Appliqué après le nettoyage et le traitement fongicide, il fait glisser l'eau et retarde le retour des mousses. Il existe en version incolore ou colorée ; à Tassin-la-Demi-Lune, un hydrofuge coloré préventif a été appliqué après le nettoyage.",
  },
  {
    question: "Une toiture très envahie par la mousse peut-elle encore être nettoyée ?",
    answer:
      "Oui, tant que les tuiles sont saines. À Tassin-la-Demi-Lune, une toiture fortement envahie a été nettoyée à pression modérée puis traitée. Si certaines tuiles sont fendues ou s'écaillent, il faut d'abord les remplacer.",
  },
  {
    question: "Puis-je démousser mon toit moi-même ?",
    answer:
      "C'est déconseillé : le travail en hauteur expose à un risque de chute, et une pression mal réglée peut rendre les tuiles poreuses. Un couvreur adapte la pression au matériau et vérifie l'état de la couverture pendant l'intervention.",
  },
];

export default function DemoussagePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("demoussage"))} />
      
      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Produits Professionnels & Traitement Durable</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Nettoyage & Démoussage de Toiture dans la <span className="text-amber-400">métropole lyonnaise</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Mousses, lichens et traces noires fragilisent vos tuiles et l&apos;étanchéité de votre toit. Jrenov réalise le nettoyage, le traitement anti-mousse et l&apos;application d&apos;hydrofuge depuis Décines-Charpieu, dans l&apos;Est lyonnais, à Lyon et dans toute la métropole.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-5 h-5" />
              Demander un devis démoussage
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

      {/* 2. Pourquoi démousser ? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            Entretien de Toiture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Pourquoi nettoyer régulièrement sa toiture ?
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

      {/* 3. Les Étapes du Traitement */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
              Notre Méthode
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Les 4 étapes d&apos;un entretien de toiture réussi
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3"
              >
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

      {/* 4. Focus Hydrofuge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Brush className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Le traitement hydrofuge : la meilleure protection</h3>
              <p className="text-xs text-slate-500">Protection incolore ou rénovateur de couleur</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            L&apos;hydrofuge pénètre au cœur du matériau (tuile terre cuite, béton ou ardoise) sans bloquer sa respiration. Il rend la surface auto-nettoyante : la pluie glisse en emportant les poussières et salissures.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Incolore : conserve l&apos;aspect naturel des tuiles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Coloré : ravive la teinte des couvertures ternies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="demoussage" />

      {/* FAQ (FAQPage généré depuis le contenu visible) */}
      <ServiceFaq title="Vos questions sur le démoussage" items={FAQ} />

      {/* 5. Banner Urgence / Devis */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Toiture couverte de mousse ?
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Demandez votre diagnostic gratuit
            </h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Nos artisans analysent l&apos;état de vos tuiles et vous proposent un devis détaillé et sans engagement sous 24h.
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