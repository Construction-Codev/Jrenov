"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { readSubmissionId, trackLeadConversion } from "@/lib/google-ads";
import { FormGuardFields, useFormGuard } from "@/components/forms/FormGuard";
import {
  Home,
  Droplets,
  Shield,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { BUSINESS, PHONE_HREF } from "@/lib/site";

// Types
type ServiceType =
  | "couverture"
  | "zinguerie"
  | "isolation"
  | "demoussage"
  | "urgence";

type BuildingType = "maison" | "immeuble" | "autre";

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    service: "" as ServiceType | "",
    building: "maison" as BuildingType,
    surface: "",
    delai: "rapide",
    nom: "",
    telephone: "",
    email: "",
    codePostal: "",
    description: "",
  });

  // Évite d'envoyer plusieurs fois « quote_form_start » pour une même visite du formulaire
  const hasTrackedStart = useRef(false);

  const handleSelectService = (service: ServiceType) => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("quote_form_start", { service });
    }
    setFormData((prev) => ({ ...prev, service }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) return;
    if (step === 1) trackEvent("quote_form_contact_step", { service: formData.service });
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
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
        trackEvent("quote_form_submit", { service: formData.service || undefined });
        const submissionId = await readSubmissionId(response);
        setSubmitted(true);
        trackLeadConversion(submissionId);
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
            Expliquez-nous votre besoin en deux étapes. Votre demande est gratuite, sans engagement, et un artisan vous recontacte sous 24 heures ouvrées.
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
            
            {/* Deux étapes : besoin puis coordonnées. Aucun détail technique obligatoire. */}
            <div className="border-b border-slate-800 bg-slate-900 p-4 text-white sm:p-6">
              <div className="mx-auto flex max-w-md items-center justify-center gap-4 text-sm font-semibold">
                <span className={`flex items-center gap-2 ${step === 1 ? "text-amber-400" : "text-slate-200"}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-extrabold text-slate-950">1</span>
                  Mon besoin
                </span>
                <div className={`h-0.5 w-8 ${step === 2 ? "bg-amber-500" : "bg-slate-600"}`} />
                <span className={`flex items-center gap-2 ${step === 2 ? "text-amber-400" : "text-slate-400"}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${step === 2 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>2</span>
                  Me recontacter
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {errorMessage}
                </div>
              )}
              
              {/* ÉTAPE 1 : Choix du service */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Quel est le type de travaux à réaliser ?
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: "couverture", label: "Rénovation de Toiture", desc: "Changement de tuiles, réfection", icon: Home },
                      { id: "zinguerie", label: "Zinguerie & Gouttières", desc: "Pose, réparation chéneaux", icon: Droplets },
                      { id: "isolation", label: "Isolation Thermique", desc: "Sarking, combles perdus", icon: Shield },
                      { id: "demoussage", label: "Nettoyage & Démoussage", desc: "Traitement hydrofuge, entretien", icon: Sparkles },
                      { id: "urgence", label: "Urgence / Fuite d'eau", desc: "Infiltration suite aux intempéries", icon: AlertTriangle, alert: true },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.service === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectService(item.id as ServiceType)}
                          className={`p-5 rounded-2xl border text-left transition flex items-start gap-4 ${
                            isSelected
                              ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className={`p-3 rounded-xl shrink-0 ${item.alert ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{item.label}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!formData.service}
                      onClick={handleNext}
                      className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm"
                    >
                      <span>Étape suivante</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 : Coordonnées, avec détails facultatifs */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Comment pouvons-nous vous recontacter ?
                  </h2>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nom" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          id="nom"
                          required
                          placeholder="Jean Dupont"
                          value={formData.nom}
                          onChange={(e) => setFormData((p) => ({ ...p, nom: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="telephone" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          required
                          placeholder="06 00 00 00 00"
                          value={formData.telephone}
                          onChange={(e) => setFormData((p) => ({ ...p, telephone: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Adresse E-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="exemple@domaine.fr"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="codePostal" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Code Postal / Ville *
                        </label>
                        <input
                          type="text"
                          id="codePostal"
                          required
                          placeholder="69003 Lyon"
                          value={formData.codePostal}
                          onChange={(e) => setFormData((p) => ({ ...p, codePostal: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <details className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                      Préciser mon projet (facultatif)
                    </summary>
                    <div className="mt-5 space-y-4">
                      <fieldset>
                        <legend className="mb-2 text-xs font-bold uppercase text-slate-700">Type de bâtiment</legend>
                        <div className="grid grid-cols-3 gap-2">
                          {([
                            { id: "maison", label: "Maison" },
                            { id: "immeuble", label: "Immeuble" },
                            { id: "autre", label: "Autre" },
                          ] as const).map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              aria-pressed={formData.building === b.id}
                              onClick={() => setFormData((p) => ({ ...p, building: b.id }))}
                              className={`rounded-lg border px-2 py-3 text-xs font-bold ${formData.building === b.id ? "border-amber-500 bg-amber-100 text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <div>
                        <label htmlFor="surface" className="mb-2 block text-xs font-bold uppercase text-slate-700">
                          Surface approximative du toit (m²)
                        </label>
                        <input
                          type="number"
                          id="surface"
                          min="1"
                          placeholder="Ex. : 100"
                          value={formData.surface}
                          onChange={(e) => setFormData((p) => ({ ...p, surface: e.target.value }))}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="mb-2 block text-xs font-bold uppercase text-slate-700">
                          Précisions sur les travaux
                        </label>
                        <textarea
                          id="description"
                          rows={3}
                          maxLength={3000}
                          placeholder="Fuite, tuiles cassées, rénovation…"
                          value={formData.description}
                          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>
                    </div>
                  </details>

                  <p className="text-xs text-slate-500">Seuls votre nom, votre téléphone et votre commune sont nécessaires pour être rappelé.</p>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading || !formData.nom || !formData.telephone || !formData.codePostal}
                      className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl transition text-sm shadow-md"
                    >
                      {loading ? "Envoi en cours..." : "Envoyer ma demande de devis"}
                    </button>
                  </div>
                </div>
              )}

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