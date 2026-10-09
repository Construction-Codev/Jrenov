import Link from "next/link";
import { Phone, MapPin, Clock, Mail, ShieldCheck } from "lucide-react";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";
import ManageCookiesButton from "@/components/ManageCookiesButton";

const SERVICES_LINKS = [
  { label: "Rénovation de couverture", href: "/services/couverture" },
  { label: "Zinguerie & Gouttières", href: "/services/zinguerie" },
  { label: "Isolation thermique", href: "/services/isolation" },
  { label: "Nettoyage & Démoussage", href: "/services/demoussage" },
  { label: "Recherche de fuite & urgence", href: "/services/recherche-de-fuite" },
  { label: "Fenêtres de toit", href: "/services/fenetres-de-toit" },
];

// Quelques pages locales mises en avant : la liste complète est sur /zones-intervention
const FOOTER_ZONES = LOCAL_AREA_INDEX.map((area) => ({ label: area.city, href: `/${area.slug}` }));

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1 : Présentation Jrenov */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-amber-500 text-slate-950 font-black text-xl px-2.5 py-1 rounded">
                J
              </div>
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                RENOV<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Artisan couvreur-zingueur basé à Décines-Charpieu : rénovation, réparation et entretien de toitures dans la métropole lyonnaise et dans un rayon d&apos;environ 50 km.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantie Décennale 10 ans</span>
            </div>

            {/* Réseaux Sociaux (SVG Inline) */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61593675344403"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Jrenov"
                className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 p-2.5 rounded-full transition border border-slate-800"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/jrenov69"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Jrenov"
                className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 p-2.5 rounded-full transition border border-slate-800"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Nos Prestations */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Nos Prestations</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-400 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Zone d'intervention SEO */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Zone d&apos;intervention</h3>
            <ul className="grid grid-cols-1 gap-1 text-xs text-slate-400">
              {FOOTER_ZONES.map((zone) => (
                <li key={zone.href}>
                  <Link href={zone.href} className="flex items-center gap-1.5 hover:text-amber-400 transition">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Couvreur à {zone.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/zones-intervention" className="font-semibold text-slate-300 hover:text-amber-400 transition">
                  Toutes nos zones d&apos;intervention &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact Direct */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Contact & Urgences</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <a href="tel:0465848885" className="flex items-center gap-2 font-bold text-white hover:text-amber-400 transition">
                <Phone className="w-4 h-4 text-amber-500" />
                04 65 84 88 85
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Intervention 7j/7 en cas d&apos;urgence</span>
              </div>
              <a href="mailto:contact@jrenov.com" className="flex items-center gap-2 hover:text-amber-400 transition">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contact@jrenov.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <address className="not-italic">
                  48 Ancien Chemin des Marais
                  <br />
                  69150 Décines-Charpieu
                </address>
              </div>
            </div>
          </div>

        </div>

        {/* Bas du Footer & Mentions Légales */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Jrenov, couvreur à Décines-Charpieu. Tous droits réservés.</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/plan-du-site" className="hover:text-slate-300 transition">
              Plan du site
            </Link>
            <Link href="/mentions-legales" className="hover:text-slate-300 transition">
              Mentions légales
            </Link>
            <ManageCookiesButton className="hover:text-slate-300 transition" />
            <Link href="/devis" className="hover:text-slate-300 transition">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}