import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { LOCAL_AREAS } from "@/lib/local-areas";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Plan du site",
    description:
      "Accédez à l'ensemble des pages du site de Jrenov, couvreur basé à Décines-Charpieu : services, zones d'intervention, réalisations et conseils.",
    path: "/plan-du-site",
  }),
};

export default function PlanDuSite() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Plan du site</h1>

      <div className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-amber-600 mb-3">Pages Principales</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li><Link href="/realisations" className="hover:underline">Nos réalisations</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog & conseils toiture</Link></li>
            <li><Link href="/devis" className="hover:underline">Demande de Devis Gratuit</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact & Zone d&apos;intervention</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-amber-600 mb-3">Zones d&apos;intervention</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            <li><Link href="/zones-intervention" className="hover:underline">Toutes nos zones d&apos;intervention</Link></li>
            {LOCAL_AREAS.map((area) => (
              <li key={area.slug}>
                <Link href={`/${area.slug}`} className="hover:underline">Couvreur à {area.city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-amber-600 mb-3">Nos services de couverture</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            <li><Link href="/services" className="hover:underline">Toutes nos prestations</Link></li>
            <li><Link href="/services/couverture" className="hover:underline">Rénovation de couverture & pose de tuiles</Link></li>
            <li><Link href="/services/zinguerie" className="hover:underline">Travaux de zinguerie & pose de gouttières</Link></li>
            <li><Link href="/services/isolation" className="hover:underline">Isolation de toiture & combles</Link></li>
            <li><Link href="/services/demoussage" className="hover:underline">Nettoyage, démoussage & traitement hydrofuge</Link></li>
            <li><Link href="/services/recherche-de-fuite" className="hover:underline">Recherche de fuite & urgence toiture</Link></li>
            <li><Link href="/services/fenetres-de-toit" className="hover:underline">Pose et remplacement de fenêtres de toit</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}