import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";

/**
 * Bloc « zones d'intervention » des pages services : liens vers une sélection
 * de pages locales pertinentes pour la prestation, plus le hub géographique.
 */
export default function ServiceLocalLinks({
  title,
  intro,
  slugs,
}: {
  title: string;
  intro: string;
  slugs: string[];
}) {
  const areas = LOCAL_AREA_INDEX.filter((area) => slugs.includes(area.slug));

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{intro}</p>
        <ul className="flex flex-wrap gap-3">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/${area.slug}`}
                className="inline-flex items-center gap-1.5 bg-white border border-amber-300 text-slate-900 hover:bg-amber-50 hover:text-amber-700 font-semibold text-sm px-4 py-2 rounded-full transition"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Couvreur à {area.city}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/zones-intervention"
          className="text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
        >
          Toutes nos zones d&apos;intervention <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
