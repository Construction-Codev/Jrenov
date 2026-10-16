import Link from "next/link";
import { LOCAL_GUIDANCE } from "@/data/local-guidance";
import { getService } from "@/lib/services";

export default function LocalProjectGuidance({ slug }: { slug: string }) {
  const guidance = LOCAL_GUIDANCE[slug];
  if (!guidance) return null;
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{guidance.title}</h2>
        {guidance.paragraphs.map((paragraph) => <p key={paragraph} className="text-slate-700 leading-relaxed">{paragraph}</p>)}
        <h3 className="text-lg font-bold text-slate-900">Les éléments utiles à votre demande de devis</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          {guidance.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link href={getService(guidance.service).href} className="text-amber-800 underline underline-offset-4 font-semibold py-3">{guidance.link}</Link>
          <Link href="/devis" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl">Décrire mon projet</Link>
        </div>
      </div>
    </section>
  );
}
