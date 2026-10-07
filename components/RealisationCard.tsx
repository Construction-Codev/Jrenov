import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import type { Realisation } from "@/lib/content";

/** Carte détaillée : réalisation mise en avant (preuve locale). */
export function RealisationCard({ item }: { item: Realisation }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition group">
      {item.image && (
        <div className="relative aspect-video md:aspect-auto md:w-2/5 shrink-0 bg-slate-100 overflow-hidden">
          <Image
            src={item.image}
            alt={`${item.title} - Chantier Jrenov à ${item.city}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 space-y-3 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full">
              {item.category}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {item.city}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {item.date}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
            <Link href={`/realisations/${item.slug}`}>{item.title}</Link>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
        </div>
        <Link
          href={`/realisations/${item.slug}`}
          className="text-xs font-extrabold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
        >
          Voir le détail du chantier <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

/** Carte compacte : réalisation d'une commune voisine (titre et commune uniquement). */
export function RealisationCompactCard({ item }: { item: Realisation }) {
  return (
    <Link
      href={`/realisations/${item.slug}`}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:border-amber-400 transition group flex flex-col"
    >
      {item.image && (
        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
          <Image
            src={item.image}
            alt={`${item.title} - ${item.city}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 space-y-1">
        <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {item.city}
        </span>
        <span className="block font-bold text-slate-900 text-sm group-hover:text-amber-600 transition">
          {item.title}
        </span>
      </div>
    </Link>
  );
}
