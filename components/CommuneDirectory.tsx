"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import catalogue from "@/data/communes-50km.json";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";

const DEP_NAMES: Record<string, string> = {
  "69": "Rhône et Métropole de Lyon",
  "01": "Ain",
  "38": "Isère",
  "42": "Loire",
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

const routeMap = new Map(
  LOCAL_AREA_INDEX.map(({ slug, city }) => [normalize(city), slug])
);
routeMap.set(normalize("Oullins-Pierre-Bénite"), "couvreur-oullins");
routeMap.set(normalize("Verpillière"), "couvreur-la-verpilliere");
routeMap.set(normalize("Isle-d'Abeau"), "couvreur-l-isle-d-abeau");

export default function CommuneDirectory() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return catalogue.communes.filter(({ name }) => !needle || normalize(name).includes(needle));
  }, [query]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200" aria-labelledby="communes-50km-heading">
      <div className="max-w-7xl mx-auto space-y-7">
        <div className="space-y-3">
          <p className="text-amber-700 uppercase tracking-wide font-bold text-sm">Couverture géographique</p>
          <h2 id="communes-50km-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Communes dans un rayon approximatif de 50 km
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
            Recherchez votre commune autour de Décines-Charpieu. Les pages détaillées présentent les prestations,
            exemples de travaux et réponses techniques adaptées. Les autres communes restent consultables dans cet inventaire
            pour préparer une demande d'intervention.
          </p>
        </div>
        <label htmlFor="commune-search" className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl max-w-2xl focus-within:border-amber-500">
          <Search className="h-5 w-5 text-slate-500" aria-hidden="true" />
          <input
            id="commune-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une ville ou un village…"
            className="flex-1 bg-transparent outline-none text-slate-900 text-sm"
          />
        </label>
        <p aria-live="polite" className="text-sm text-slate-600">
          {results.length} commune{results.length === 1 ? "" : "s"} dans l'inventaire
        </p>
        {results.length === 0 && (
          <p className="text-slate-600 text-sm">Aucune correspondance : vérifiez l'orthographe ou contactez-nous directement.</p>
        )}
        <div className="grid lg:grid-cols-2 gap-5">
          {Object.entries(DEP_NAMES).map(([dep, label]) => {
            const communes = results.filter((commune) => commune.dept === dep);
            if (!communes.length) return null;
            return (
              <details key={dep} open={query.trim().length > 0 ? true : undefined} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 group">
                <summary className="cursor-pointer font-bold text-slate-900 text-base flex items-center justify-between">
                  {label}
                  <span className="text-xs font-medium text-slate-500">{communes.length} communes</span>
                </summary>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mt-5">
                  {communes.map((commune) => {
                    const slug = routeMap.get(normalize(commune.name));
                    return (
                      <li key={commune.code} className="text-sm">
                        {slug ? (
                          <Link href={`/${slug}`} className="inline-flex items-start gap-1.5 text-amber-800 font-semibold hover:underline">
                            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                            {commune.name}
                            <ArrowUpRight className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                          </Link>
                        ) : (
                          <span className="text-slate-600">{commune.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 max-w-4xl leading-relaxed">
          Périmètre indicatif calculé à vol d'oiseau entre centres géographiques de communes.
          Le fond géographique initial est historique et certaines limites ou dénominations ont pu changer.
          La faisabilité de chaque intervention reste à confirmer selon le chantier.
        </p>
      </div>
    </section>
  );
}
