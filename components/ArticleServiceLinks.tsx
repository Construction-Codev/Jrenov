import Link from "next/link";
import { ArrowRight, Wrench, FileText } from "lucide-react";
import { getService } from "@/lib/services";
import { ARTICLE_LINKS } from "@/lib/service-content";
import { posts, frenchDateToIso } from "@/lib/content";

/** Bloc éditorial « Besoin d'une intervention ? » en fin d'article. */
export default function ArticleServiceLinks({ slug }: { slug: string }) {
  const link = ARTICLE_LINKS[slug];
  if (!link) return null;

  const relatedPosts = posts
    .filter((post) =>
      post.slug !== slug && ARTICLE_LINKS[post.slug]?.services.some((key) => link.services.includes(key))
    )
    .sort((a, b) => {
      const aLinks = ARTICLE_LINKS[a.slug].services.filter((key) => link.services.includes(key)).length;
      const bLinks = ARTICLE_LINKS[b.slug].services.filter((key) => link.services.includes(key)).length;
      return bLinks - aLinks || (frenchDateToIso(b.date) ?? "").localeCompare(frenchDateToIso(a.date) ?? "");
    })
    .slice(0, 3);

  return (
    <div className="space-y-6">
    <aside className="bg-amber-50/60 border-l-4 border-amber-500 p-5 rounded-r-xl space-y-3">
      <p className="text-sm font-bold text-slate-900">Besoin d&apos;une intervention ?</p>
      <p className="text-sm text-slate-700 leading-relaxed">{link.text}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {link.services.map((key) => {
          const service = getService(key);
          return (
            <Link
              key={key}
              href={service.href}
              className="text-sm font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              {service.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          );
        })}
        {link.withQuote && (
          <Link
            href="/devis"
            className="text-sm font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </aside>
    {relatedPosts.length > 0 && (
      <nav aria-label="Articles sur le même sujet" className="border-t border-slate-200 pt-6">
        <p className="text-sm font-bold text-slate-900 mb-3">Pour aller plus loin</p>
        <ul className="space-y-2">
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-sm text-amber-700 font-semibold hover:underline">
                {post.title} <ArrowRight className="w-3.5 h-3.5 inline-block" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )}
    </div>
  );
}
