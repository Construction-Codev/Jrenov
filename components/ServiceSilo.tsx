import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { RealisationCompactCard } from "@/components/RealisationCard";
import ServiceLocalLinks from "@/components/ServiceLocalLinks";
import type { ServiceKey } from "@/lib/services";
import {
  SERVICE_SILOS,
  articlesForService,
  featuredRealisations,
  validateServiceContent,
} from "@/lib/service-content";

/**
 * Blocs de maillage d'une page service : réalisations de ce type,
 * articles associés (« Nos conseils ») et pages locales.
 * Toutes les données viennent de lib/service-content.ts.
 */
export default function ServiceSilo({ serviceKey }: { serviceKey: ServiceKey }) {
  validateServiceContent();
  const silo = SERVICE_SILOS[serviceKey];
  const projects = featuredRealisations(serviceKey);
  const articles = articlesForService(serviceKey);

  return (
    <>
      {/* Réalisations de ce type */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-10">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Nos chantiers</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{silo.realisationsTitle}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((item) => (
            <RealisationCompactCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="text-center pt-6">
          <Link
            href="/realisations"
            className="text-amber-600 hover:text-amber-700 text-sm font-bold inline-flex items-center gap-1 transition"
          >
            Toutes nos réalisations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Nos conseils */}
      {articles.length > 0 && (
        <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Nos conseils</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">À lire sur notre blog</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400 transition group space-y-3"
                >
                  <span className="flex items-center gap-2 text-xs text-slate-500">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="block text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
                    {post.title}
                  </span>
                  <span className="block text-xs sm:text-sm text-slate-600 leading-relaxed">{post.excerpt}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zones d'intervention (maillage local) */}
      <ServiceLocalLinks title={silo.local.title} intro={silo.local.intro} slugs={silo.local.slugs} />
    </>
  );
}
