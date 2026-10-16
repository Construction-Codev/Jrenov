import Link from "next/link";

export default function CoverageDiagnosis() {
  return (
    <section id="reparation-toiture" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Réparer une toiture ou rénover la couverture : comment décider ?</h2>
      <p className="text-slate-700 leading-relaxed">Une tuile cassée ne signifie pas que toute la toiture est à remplacer. À l’inverse, répéter les petites réparations sur une couverture très dégradée peut laisser d’autres points d’entrée d’eau. Depuis Décines-Charpieu, nous étudions l’état de la couverture et de ses supports pour définir une intervention adaptée à votre maison dans la métropole de Lyon.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Une reprise ciblée à étudier</h3>
          <p className="text-slate-700 leading-relaxed">Quelques tuiles déplacées, un faîtage endommagé ou un raccord défectueux peuvent justifier une réparation partielle si le reste du toit et le support sont en état. La compatibilité des éléments de remplacement, les fixations et la ventilation doivent être vérifiées.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Une réfection plus large à envisager</h3>
          <p className="text-slate-700 leading-relaxed">Des infiltrations répétées en plusieurs endroits, des tuiles devenues fragiles ou des supports dégradés demandent une étude d’ensemble. Le devis précise ce qui est déposé, conservé ou remplacé et les raccords à reprendre. L’isolation peut être étudiée à cette occasion.</p>
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900">Si l’eau entre déjà dans le logement</h3>
      <p className="text-slate-700 leading-relaxed">Ne montez pas sur le toit. Notez où et quand l’eau apparaît, prenez des photos depuis un endroit sûr et signalez si la fuite est active. La mise hors d’eau éventuelle protège provisoirement le bâtiment ; la réparation définitive dépend ensuite de l’origine du défaut.</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/services/recherche-de-fuite" className="text-amber-800 underline underline-offset-4 font-semibold py-3">Faire rechercher l’origine de la fuite</Link>
        <Link href="/services/zinguerie" className="text-amber-800 underline underline-offset-4 font-semibold py-3">Comprendre les raccords et la zinguerie</Link>
        <Link href="/services/isolation" className="text-amber-800 underline underline-offset-4 font-semibold py-3">Associer isolation et rénovation</Link>
      </div>
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold">Que transmettre pour un devis de réparation ?</h3>
        <p className="text-slate-300 leading-relaxed">Indiquez la commune, le type de toiture si vous le connaissez, le défaut observé et les possibilités d’accès. Précisez les travaux déjà réalisés. Le chiffrage dépend notamment de la surface concernée, des matériaux, de l’état des supports et de l’installation nécessaire au chantier.</p>
        <Link href="/devis" className="inline-flex bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl">Demander mon devis toiture</Link>
      </div>
    </section>
  );
}
