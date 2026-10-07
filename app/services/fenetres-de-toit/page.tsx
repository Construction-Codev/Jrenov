import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  Phone,
  FileText,
  Hammer,
  RefreshCw,
  Sun,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import { BUSINESS, pageMetadata } from "@/lib/site";
import { getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import ServiceSilo from "@/components/ServiceSilo";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";

export const metadata: Metadata = pageMetadata({
  title: "Fenêtres de toit type Velux – Pose & remplacement",
  description:
    "Création, pose et remplacement de fenêtres de toit type Velux et de verrières, raccordées à la couverture par Jrenov, couvreur à Décines-Charpieu.",
  path: "/services/fenetres-de-toit",
});

const PHONE_HREF = `tel:${BUSINESS.phoneDisplay.replace(/\s/g, "")}`;

// Trois types de projets, chacun attesté par une réalisation de data/realisations.json
const PROJECT_TYPES = [
  {
    title: "Créer une fenêtre de toit",
    desc: "Pour éclairer des combles, il faut ouvrir la toiture : la charpente est découpée et renforcée par des chevêtres, puis la fenêtre est posée et raccordée aux tuiles.",
    proof: "À Craponne, deux chevêtres ont été créés pour poser des fenêtres grand format avec volets roulants solaires.",
    icon: Hammer,
  },
  {
    title: "Remplacer une ancienne fenêtre",
    desc: "Une fenêtre de toit vieillissante se remplace par l'extérieur, en reprenant l'étanchéité avec la couverture.",
    proof: "À Décines-Charpieu, trois anciens modèles en bois ont été remplacés en une journée, sans détérioration des finitions intérieures.",
    icon: RefreshCw,
  },
  {
    title: "Installer une verrière",
    desc: "Une verrière de toit associe plusieurs châssis : la charpente est renforcée et la couverture découpée pour les intégrer.",
    proof: "À Lyon 3e, trois verrières juxtaposées éclairent désormais un atelier d'artiste.",
    icon: Sun,
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Le remplacement d'une fenêtre de toit abîme-t-il les murs et plafonds intérieurs ?",
    answer:
      "Pas quand il est réalisé par l'extérieur. Sur notre chantier de Décines-Charpieu, les trois fenêtres ont été changées sans détérioration des finitions intérieures, avec des jupes d'étanchéité souples raccordées aux tuiles mécaniques.",
  },
  {
    question: "Peut-on ajouter une fenêtre de toit dans des combles qui n'en ont pas ?",
    answer:
      "Oui. Il faut ouvrir la charpente et créer un chevêtre pour reprendre les chevrons coupés, comme à Craponne où deux fenêtres ont été créées dans des combles en cours d'aménagement.",
  },
  {
    question: "Ouverture par rotation ou par projection : que choisir ?",
    answer:
      "La rotation convient bien à une fenêtre placée en hauteur. La projection dégage la vue vers l'extérieur sans empiéter sur la pièce. Le choix dépend de la pente du toit et de l'aménagement intérieur.",
  },
  {
    question: "Faut-il une autorisation pour créer une fenêtre de toit ?",
    answer:
      "Créer une ouverture modifie l'aspect extérieur du bâtiment : en règle générale, une déclaration préalable est demandée. Les règles dépendent de la commune et du secteur ; renseignez-vous auprès du service urbanisme de votre mairie avant les travaux.",
  },
  {
    question: "Jrenov est-il revendeur ou installateur agréé Velux ?",
    answer:
      "Non. Jrenov est une entreprise de couverture. Nous employons le mot « Velux », nom de marque devenu courant, pour désigner les fenêtres de toit de ce type, sans revendiquer de partenariat ni d'agrément du fabricant.",
  },
];

export default function FenetresDeToitPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <JsonLd data={serviceJsonLd(getService("fenetres-de-toit"))} />

      {/* 1. Hero de la page Service */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <AppWindow className="w-4 h-4 text-amber-500" />
            <span>Fenêtres de toit & verrières</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Fenêtres de toit : <span className="text-amber-400">création, pose et remplacement</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Éclairer des combles, changer une fenêtre de toit de type Velux qui a fait son temps ou installer une
            verrière : en tant que couvreur, Jrenov s&apos;occupe aussi de ce qui fait la durabilité de
            l&apos;ouvrage, son raccordement à la couverture. Interventions depuis Décines-Charpieu dans la
            métropole lyonnaise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-5 h-5" />
              Demander un devis fenêtre de toit
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

      {/* 2. Types de projets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Vos projets</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Créer, remplacer ou agrandir la lumière
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECT_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">{item.proof}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Étanchéité */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <Droplets className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                L&apos;étanchéité, point critique de la pose
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Une fenêtre de toit interrompt la couverture : tout l&apos;enjeu est le raccordement avec les tuiles
              qui l&apos;entourent. Mal réalisé, il devient une source d&apos;infiltration. Le type de raccord
              dépend du matériau de couverture et de l&apos;ouvrage :
            </p>
            <ul className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Raccordements en zinc sur tuiles béton (Craponne)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Jupes d&apos;étanchéité souples sur tuiles mécaniques (Décines-Charpieu)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Raccords en plomb et zinc pour une verrière (Lyon 3e)</span>
              </li>
            </ul>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ces raccords relèvent du savoir-faire de{" "}
              <Link href="/services/zinguerie" className="text-amber-700 font-semibold hover:underline">
                zinguerie
              </Link>
              . Et si une fenêtre existante laisse déjà passer l&apos;eau, commencez par une{" "}
              <Link href="/services/recherche-de-fuite" className="text-amber-700 font-semibold hover:underline">
                recherche de fuite
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 4. Choix de l'ouverture */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-3 mb-10">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Bien choisir</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Ouverture et équipements</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">Rotation ou projection</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La rotation pivote autour d&apos;un axe central et convient aux fenêtres placées haut. La projection
              s&apos;ouvre vers l&apos;extérieur et dégage la vue sans encombrer la pièce.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">Volet roulant solaire</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Il protège du soleil d&apos;été et s&apos;installe sans tirer de câble électrique dans la pièce,
              comme sur les fenêtres posées à Craponne.
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 text-center pt-6">
          Velux est une marque déposée de son fabricant. Jrenov emploie ce terme pour désigner un type de fenêtre
          de toit et n&apos;est ni revendeur ni partenaire de la marque.
        </p>
      </section>

      {/* 5. Réalisations, conseils et zones d'intervention (silo services) */}
      <ServiceSilo serviceKey="fenetres-de-toit" />

      {/* 6. FAQ */}
      <ServiceFaq title="Vos questions sur les fenêtres de toit" items={FAQ} />

      {/* 7. Banner Devis */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black">Un projet de fenêtre de toit ?</h2>
            <p className="text-slate-300 text-sm max-w-lg">
              Création, remplacement ou verrière : nous venons voir la toiture et vous remettons un devis gratuit
              et sans engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/devis"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition uppercase text-xs sm:text-sm tracking-wider text-center"
            >
              Obtenir un devis gratuit
            </Link>
            <a
              href={PHONE_HREF}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition uppercase text-xs sm:text-sm tracking-wider text-center"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
