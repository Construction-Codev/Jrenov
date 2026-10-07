import type { Metadata } from "next";
import Link from "next/link";
import { Home, Wrench, MapPin, Images, Phone, ArrowRight } from "lucide-react";

// Next.js ajoute déjà <meta name="robots" content="noindex"> aux réponses 404 ; on remplace aussi
// le « index, follow » hérité du layout racine pour éviter deux directives contradictoires.
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Accueil", desc: "Revenir à la page d'accueil", icon: Home },
  { href: "/services", label: "Nos services", desc: "Couverture, zinguerie, isolation, démoussage", icon: Wrench },
  { href: "/zones-intervention", label: "Zones d'intervention", desc: "Décines-Charpieu, Est lyonnais et métropole", icon: MapPin },
  { href: "/realisations", label: "Réalisations", desc: "Nos chantiers en images", icon: Images },
  { href: "/contact", label: "Contact", desc: "Nous écrire ou nous appeler", icon: Phone },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto relative z-10 space-y-4 text-center sm:text-left">
          <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Erreur 404</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Cette page est introuvable
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            L&apos;adresse demandée n&apos;existe pas ou a été déplacée. Voici les pages les plus utiles du site.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400 transition group flex gap-4 h-full"
                >
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 group-hover:text-amber-600 transition inline-flex items-center gap-1">
                      {link.label} <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="block text-xs text-slate-600">{link.desc}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
