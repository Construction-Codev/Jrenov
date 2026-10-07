import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import realisations from "@/data/realisations.json";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Nos chantiers de toiture dans l'Est lyonnais et à Lyon",
    description:
      "Couverture, zinguerie, isolation, fenêtres de toit : photos et détails des chantiers menés par Jrenov depuis Décines-Charpieu, dans l'Est lyonnais et la métropole.",
    path: "/realisations",
  }),
};

export default function RealisationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Savoir-faire en images</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Nos dernières réalisations</h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Consultez nos chantiers de réfection de toiture, zinguerie et dépannage menés depuis Décines-Charpieu, dans l&apos;Est lyonnais et la métropole lyonnaise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realisations.map((item) => (
            <article key={item.slug} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition group">
              
              {/* Image de la réalisation avec gestion d'affichage */}
              {item.image && (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.city ? item.city : 'Lyon'}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="space-y-4 p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full">{item.category}</span>
                    <span className="text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition">
                    <Link href={`/realisations/${item.slug}`}>{item.title}</Link>
                  </h2>
                  
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">{item.summary}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {item.city ?? "Lyon"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {item.duration}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
                <Link href={`/realisations/${item.slug}`} className="text-xs font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                  Voir le détail du chantier <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}