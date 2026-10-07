"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL, absoluteUrl, serializeJsonLd } from "@/lib/site";
import type { Crumb } from "@/lib/breadcrumb";

type Props = {
  /** Fils d'Ariane par chemin, calculés côté serveur depuis les données. */
  trails: Record<string, Crumb[]>;
};

export default function Breadcrumb({ trails }: Props) {
  const pathname = usePathname();

  // Ne pas afficher le fil d'Ariane sur la page d'accueil
  if (!pathname || pathname === "/") return null;

  // Route inconnue (404, etc.) : pas de fil d'Ariane plutôt que des liens douteux
  const breadcrumbItems = trails[pathname];
  if (!breadcrumbItems) return null;

  // Structure Schema.org JSON-LD pour le SEO Google
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: absoluteUrl(item.href),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaData) }}
      />
      <nav aria-label="Fil d'Ariane" className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <ol className="max-w-7xl mx-auto flex items-center text-xs sm:text-sm text-slate-600 overflow-x-auto">
          <li className="flex items-center shrink-0">
            <Link href="/" className="flex items-center hover:text-amber-600 transition">
              <Home className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
              Accueil
            </Link>
          </li>

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.href} className="flex items-center shrink-0">
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" aria-hidden="true" />
                {isLast ? (
                  <span className="font-semibold text-slate-900" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-amber-600 transition">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
