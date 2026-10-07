import Link from "next/link";
import { ArrowRight, Wrench, FileText } from "lucide-react";
import { getService } from "@/lib/services";
import { ARTICLE_LINKS } from "@/lib/service-content";

/** Bloc éditorial « Besoin d'une intervention ? » en fin d'article. */
export default function ArticleServiceLinks({ slug }: { slug: string }) {
  const link = ARTICLE_LINKS[slug];
  if (!link) return null;

  return (
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
  );
}
