"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { FormGuardFields, useFormGuard } from "@/components/forms/FormGuard";
import { LOCAL_AREA_INDEX } from "@/data/local-area-index";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const guard = useFormGuard();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // évite le double envoi
    setLoading(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      nom: formData.get("nom"),
      telephone: formData.get("telephone"),
      email: formData.get("email"),
      ville: formData.get("ville"),
      sujet: formData.get("sujet"),
      message: formData.get("message"),
      ...(await guard.getGuardPayload(form)),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Seul le type de demande (liste fermée) est transmis, jamais les champs saisis
        trackEvent("contact_form_submit", { service: String(body.sujet ?? "") || undefined });
        setSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(errorData.error || "Une erreur est survenue lors de l'envoi.");
        guard.renew(form);
      }
    } catch {
      setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      guard.renew(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Header de la page */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
            Basé à Décines-Charpieu · Lyon & métropole
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contactez <span className="text-amber-400">Jrenov</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Une question, un besoin de rénovation ou une urgence fuite ? Nos couvreurs vous répondent sous 24h.
          </p>
        </div>
      </section>

      {/* 2. Section principale : Formulaire + Infos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulaire de Contact (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message envoyé avec succès !</h3>
                <p className="text-sm text-emerald-700">
                  Merci de nous avoir contactés. Un artisan Jrenov traitera votre demande et vous recontactera très rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      placeholder="06 00 00 00 00"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="exemple@domaine.fr"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="ville" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Ville / Code Postal
                    </label>
                    <input
                      type="text"
                      id="ville"
                      name="ville"
                      placeholder="69003 Lyon"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Type d&apos;intervention *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm bg-white"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="urgence">Urgence fuite / Dépannage</option>
                    <option value="couverture">Rénovation de toiture / Tuiles</option>
                    <option value="zinguerie">Zinguerie & Gouttières</option>
                    <option value="isolation">Isolation de toiture</option>
                    <option value="demoussage">Nettoyage & Démoussage</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description de votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Précisez votre besoin (fuite constatée, surface de la toiture, délais souhaités...)"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
                  />
                </div>

                <FormGuardFields />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>

          {/* Coordonnées & Infos (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box Appel Urgence */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Appel Direct / Urgence</h3>
                  <p className="text-xs text-slate-400">Intervention rapide depuis Décines-Charpieu</p>
                </div>
              </div>
              <a
                href="tel:0465848885"
                className="block text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-lg py-3 rounded-xl transition"
              >
                04 65 84 88 85
              </a>
            </div>

            {/* Fiche d'informations */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Informations de contact</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Siège social :</span>
                    <address className="not-italic">
                      48 Ancien Chemin des Marais
                      <br />
                      69150 Décines-Charpieu
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Horaires d&apos;ouverture :</span>
                    <span>Du Lundi au Samedi : 8h00 - 19h00</span> <br />
                    <span className="text-amber-600 font-semibold">Service d&apos;urgence fuite 7j/7</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">E-mail :</span>
                    <a href="mailto:contact@jrenov.com" className="hover:underline">
                      contact@jrenov.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900">Travaux couverts par notre assurance décennale</span>
                </div>
              </div>
            </div>

            {/* Zone d'intervention */}
            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Zone d&apos;intervention</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Basés à Décines-Charpieu, nous intervenons dans la métropole lyonnaise et dans un rayon
                d&apos;environ 50 km.
              </p>
              <ul className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                {LOCAL_AREA_INDEX.map((area) => (
                  <li key={area.slug} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <Link href={`/${area.slug}`} className="hover:text-amber-600 hover:underline">
                      {area.city}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/zones-intervention" className="text-xs font-bold text-amber-600 hover:text-amber-700">
                Toutes nos zones d&apos;intervention &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Carte de Lyon (Google Maps) */}
      <section className="w-full h-80 bg-slate-200 relative">
        <iframe
          title="Carte : siège de Jrenov à Décines-Charpieu"
          src="https://www.google.com/maps?q=48%20Ancien%20Chemin%20des%20Marais%2C%2069150%20D%C3%A9cines-Charpieu&z=12&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-85 hover:grayscale-0 transition"
        />
      </section>
    </div>
  );
}