"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { readSubmissionId, trackLeadConversion } from "@/lib/google-ads";
import { FormGuardFields, useFormGuard } from "@/components/forms/FormGuard";
import { CheckCircle2, Phone, ShieldCheck, Building2 } from "lucide-react";
import { BUSINESS, PHONE_HREF } from "@/lib/site";

export default function DevisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    message: "",
  });

  // Évite d'envoyer plusieurs fois « quote_form_start » pour une même visite du formulaire
  const hasTrackedStart = useRef(false);

  const handleStart = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("quote_form_start");
    }
  };

  const guard = useFormGuard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // évite le double envoi
    setLoading(true);
    setErrorMessage(null);
    const form = e.currentTarget as HTMLFormElement;

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...(await guard.getGuardPayload(form)) }),
      });

      if (response.ok) {
        trackEvent("quote_form_submit");
        const submissionId = await readSubmissionId(response);
        setSubmitted(true);
        trackLeadConversion(submissionId, { email: formData.email, phone: formData.telephone });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(
          errorData.error || "Une erreur est survenue lors de l'envoi."
        );
        guard.renew(form);
      }
    } catch {
      setErrorMessage("Une erreur réseau est survenue. Veuillez vérifier votre connexion.");
      guard.renew(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* En-tête */}
        <div className="text-center space-y-3">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
            Gratuit & Sans Engagement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Demande de devis en ligne
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Obtenez une estimation précise pour vos travaux de toiture dans l&apos;Est lyonnais, à Lyon et dans sa métropole sous 24h.
          </p>
        </div>

        {/* Formulaire ou Message de succès */}
        {submitted ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Demande de devis bien reçue !
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Merci <span className="font-semibold text-slate-900">{formData.nom}</span>. Un artisan Jrenov étudie vos informations et vous recontactera au{" "}
                <span className="font-semibold text-slate-900">{formData.telephone}</span> sous 24 heures ouvrées.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1 inline-block">
              <p>Une urgence fuite ? Ne patientez pas :</p>
              <a href={PHONE_HREF} className="font-bold text-slate-900 text-sm hover:text-amber-600 block">
                Appeler le {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            <form onSubmit={handleSubmit} onChange={handleStart} className="p-6 sm:p-10 space-y-6">
              {errorMessage && (
                <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <label htmlFor="telephone" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  autoComplete="tel"
                  required
                  maxLength={25}
                  placeholder="06 00 00 00 00"
                  value={formData.telephone}
                  onChange={(e) => setFormData((p) => ({ ...p, telephone: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="nom" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Jean Dupont"
                  value={formData.nom}
                  onChange={(e) => setFormData((p) => ({ ...p, nom: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email (facultatif)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="exemple@domaine.fr"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={5}
                  maxLength={3000}
                  rows={4}
                  placeholder="Décrivez votre projet ou votre besoin..."
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl transition text-sm shadow-md"
              >
                {loading ? "Envoi en cours..." : "Envoyer ma demande de devis"}
              </button>

              <FormGuardFields />
            </form>
          </div>
        )}

        {/* Réassurance sous le formulaire */}
        <div className="grid sm:grid-cols-3 gap-4 text-center text-xs text-slate-500 pt-4">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Garantie Décennale 10 ans</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Réponse sous 24h</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Artisan de proximité (Décines-Charpieu)</span>
          </div>
        </div>

      </div>
    </div>
  );
}