import { HelpCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ visible + données structurées FAQPage générées à partir du MÊME tableau :
 * le JSON-LD correspond donc exactement au contenu affiché.
 */
export default function ServiceFaq({ title, items }: { title: string; items: FaqItem[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <JsonLd data={faqJsonLd} />
      <div className="text-center space-y-3 mb-10">
        <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Questions fréquentes</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 open:border-amber-300"
          >
            <summary className="flex items-start gap-3 cursor-pointer list-none font-bold text-slate-900">
              <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{item.question}</span>
            </summary>
            <p className="text-sm text-slate-600 leading-relaxed pt-3 pl-8">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
