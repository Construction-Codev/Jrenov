import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Phone,
  FileText,
  Droplets,
  Wind,
  Home,
  Search,
  ShieldCheck,
  Hammer,
  CloudRain,
  Umbrella,
} from "lucide-react";
import { BUSINESS, pageMetadata } from "@/lib/site";
import { getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import ServiceSilo from "@/components/ServiceSilo";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";

export const metadata: Metadata = pageMetadata({
  title: "Recherche de fuite toiture – Décines & Est lyonnais",
  description:
    "Fuite ou infiltration par la toiture ? Jrenov, couvreur à Décines-Charpieu, localise l'origine, met hors d'eau et répare dans l'Est lyonnais. Urgence 7j/7.",
  path: "/services/recherche-de-fuite",
});

const PHONE_HREF = `tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`;

// Signes repris de l'article « Comment détecter une fuite de toiture avant les infiltrations ? »
const SYMPTOMS = [
  {
    title: "Auréoles au plafond",
    desc: "Des taches jaunâtres ou brunes apparaissent, puis s'étendent après chaque épisode de pluie.",
    icon: Droplets,
  },
  {
    title: "Papier peint qui se décolle",
    desc: "Un revêtement qui gondole ou se détache sous la toiture trahit souvent une humidité persistante.",
    icon: Home,
  },
  {
    title: "Odeur d'humidité dans les combles",
    desc: "Une odeur de moisi ou un isolant humide au toucher signalent une infiltration à rechercher.",
    icon: Wind,
  },
  {
    title: "Tuiles visibles depuis le sol",
    desc: "Avec des jumelles, des tuiles glissées, cassées ou une mousse très abondante doivent alerter.",
    icon: Search,
  },
];

// Origines possibles, chacune illustrée par un chantier réel ou un contenu du site
const ORIGINS = [
  {
    title: "Tuiles cassées ou déplacées",
    desc: "Coup de vent ou grêle : une tuile qui glisse ou se fend laisse passer l'eau directement vers l'isolant.",
  },
  {
    title: "Abergement de cheminée",
    desc: "Au pied d'une souche, un raccord en mortier qui se fissure laisse l'eau s'infiltrer le long du conduit.",
  },
  {
    title: "Noue percée",
    desc: "Au creux formé par deux pans de toiture, une noue métallique rouillée concentre toute l'eau de pluie.",
  },
  {
    title: "Solin contre un mur",
    desc: "La bande d'étanchéité entre la toiture et un mur peut se fendre ou se décoller avec le temps.",
  },
  {
    title: "Gouttière ou chéneau défaillant",
    desc: "Un chéneau bouché ou percé déborde et l'eau finit par ruisseler le long de la façade ou dans le mur.",
  },
  {
    title: "Fenêtre de toit ou toit-terrasse",
    desc: "Raccords d'une fenêtre de toit fatigués, revêtement d'étanchéité d'un toit plat en fin de vie.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Votre appel",
    desc: "Vous nous décrivez ce que vous constatez : emplacement de la tache, moment où l'eau apparaît, météo récente.",
  },
  {
    step: "02",
    title: "Recherche de l'origine",
    desc: "Inspection visuelle de la couverture et, quand c'est possible, des combles : l'eau entre rarement à l'aplomb de la tache.",
  },
  {
    step: "03",
    title: "Mise hors d'eau si nécessaire",
    desc: "Si la toiture est ouverte, un bâchage temporaire protège la maison en attendant la réparation.",
  },
  {
    step: "04",
    title: "Réparation définitive",
    desc: "Remplacement de tuiles, abergement, noue ou solin refaits : la réparation fait l'objet d'un devis détaillé.",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Que faire en attendant l'arrivée du couvreur ?",
    answer:
      "Coupez le courant dans la zone touchée, protégez meubles et planchers avec des bâches et placez un récipient sous l'écoulement. Ne montez pas sur le toit, surtout par temps humide : la mise en sécurité est le travail du couvreur.",
  },
  {
    question: "Intervenez-vous en urgence ?",
    answer:
      "Oui, un service d'urgence fuite est assuré 7j/7 au 04 65 84 88 85, avec une intervention sous 24h. Basés à Décines-Charpieu, nous intervenons dans l'Est lyonnais et la métropole de Lyon.",
  },
  {
    question: "Une fuite vient-elle toujours d'une tuile cassée ?",
    answer:
      "Non. À Brignais, l'eau entrait par le mortier fissuré au pied d'une cheminée ; à Francheville, par une noue rouillée au creux du toit. C'est pourquoi la recherche porte sur tous les raccords, pas seulement sur les tuiles.",
  },
  {
    question: "Mon assurance peut-elle prendre en charge la réparation ?",
    answer:
      "La plupart des contrats d'assurance habitation couvrent les dégâts des eaux liés aux intempéries, mais les conditions varient : vérifiez votre contrat. Le devis de réparation que nous établissons peut être transmis à votre assureur.",
  },
  {
    question: "Le diagnostic est-il payant ?",
    answer:
      "Non. Le diagnostic de la toiture et le devis sont gratuits et sans engagement.",
  },
];

export default function RechercheDeFuitePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("recherche-de-fuite"))} />

      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Service d&apos;urgence fuite 7j/7</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Recherche de fuite et <span className="text-amber-400">urgence toiture</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Tache au plafond, eau dans les combles, toiture endommagée après un orage : Jrenov recherche
            l&apos;origine de l&apos;infiltration, met votre toiture hors d&apos;eau si nécessaire, puis la répare.
            Notre siège est à Décines-Charpieu ; nous intervenons dans l&apos;Est lyonnais et la métropole de Lyon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <a
              href={PHONE_HREF}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Phone className="w-5 h-5" />
              Urgence : {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/devis"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5 text-amber-400" />
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Symptômes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Les signes d&apos;alerte</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Comment reconnaître une fuite de toiture ?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Une infiltration se manifeste souvent à l&apos;intérieur bien avant d&apos;être visible sur le toit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SYMPTOMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Origines possibles */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">D&apos;où vient l&apos;eau ?</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Les origines les plus fréquentes d&apos;une infiltration
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORIGINS.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600 text-center pt-8 max-w-3xl mx-auto">
            Selon l&apos;origine, la réparation relève de la{" "}
            <Link href="/services/couverture" className="text-amber-700 font-semibold hover:underline">couverture</Link>, de la{" "}
            <Link href="/services/zinguerie" className="text-amber-700 font-semibold hover:underline">zinguerie</Link> ou du
            raccordement d&apos;une{" "}
            <Link href="/services/fenetres-de-toit" className="text-amber-700 font-semibold hover:underline">fenêtre de toit</Link>.
          </p>
        </div>
      </section>

      {/* 4. Déroulement de l'intervention */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Notre méthode</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            De l&apos;appel à la réparation définitive
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div key={step.step} className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3">
              <span className="text-3xl font-black text-amber-500/30 absolute top-4 right-4">{step.step}</span>
              <h3 className="text-base font-bold text-slate-900 pr-8">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Intempéries + en attendant */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <CloudRain className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Après un orage ou de la grêle</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quand des tuiles sont cassées en nombre, la priorité est de remettre la toiture hors d&apos;eau. À
              Vénissieux, en juin 2026, nous avons bâché en moins de 12 heures la toiture d&apos;un bâtiment
              professionnel touché par la grêle, avant de remplacer 150 tuiles et de consolider les fixations du
              faîtage.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              La plupart des contrats d&apos;assurance habitation couvrent les dégâts des eaux liés aux
              intempéries : le devis de réparation peut être transmis à votre assureur.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                <Umbrella className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">En attendant notre arrivée</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                Coupez le courant dans la pièce où l&apos;eau s&apos;écoule.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                Protégez meubles et planchers avec des bâches.
              </li>
              <li className="flex items-start gap-2">
                <Hammer className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                Ne montez pas sur le toit, en particulier par temps humide.
              </li>
            </ul>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-3 rounded-xl transition text-sm"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 6. Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="recherche-de-fuite" />

      {/* 7. FAQ */}
      <ServiceFaq title="Vos questions sur les fuites de toiture" items={FAQ} />

      {/* 8. Banner Urgence */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              De l&apos;eau entre chez vous ?
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Appelez-nous pour une mise hors d&apos;eau</h2>
            <p className="text-slate-300 text-sm max-w-lg">
              Service d&apos;urgence fuite 7j/7. Pour une infiltration ancienne ou une réparation à planifier,
              demandez plutôt un devis en ligne.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={PHONE_HREF}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition uppercase text-xs sm:text-sm tracking-wider text-center"
            >
              {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/devis"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition uppercase text-xs sm:text-sm tracking-wider text-center"
            >
              Devis en ligne
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
