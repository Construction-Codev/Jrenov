"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, PhoneCall, Send } from "lucide-react";
import { BUSINESS, PHONE_HREF } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { readSubmissionId, trackLeadConversion } from "@/lib/google-ads";
import { FormGuardFields, useFormGuard } from "@/components/forms/FormGuard";

/**
 * Une demande en une seule étape pour les visiteurs qui préfèrent être rappelés.
 * Téléphone et nom obligatoires ; e-mail facultatif (accusé de réception).
 * Ne collecte ni projet détaillé ni adresse pour ne pas alourdir la prise de contact.
 */
export default function QuickCallbackForm({ id = "rappel" }: { id?: string }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [providedEmail, setProvidedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const guard = useFormGuard();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || sent) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const nom = String(fields.get("nom") ?? "").trim();
    const telephone = String(fields.get("telephone") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    if (!nom || !telephone) return;

    setLoading(true);
    setError(null);

    try {
      const protection = await guard.getGuardPayload(form);
      const response = await fetch("/api/rappel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, telephone, email, ...protection }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(typeof body.error === "string" ? body.error : "Envoi impossible. Merci de réessayer.");
        guard.renew(form);
        return;
      }

      // Un succès ne doit jamais déclencher plusieurs conversions Google Ads.
      const result = await response.clone().json().catch(() => ({}));
      const submissionId = await readSubmissionId(response);
      setProvidedEmail(Boolean(email));
      setConfirmation(result.confirmationSent === true);
      setSent(true);
      trackEvent("callback_form_submit", { placement: "content" });
      trackLeadConversion(submissionId);
    } catch {
      setError("La demande n'a pas pu être envoyée. Vérifiez votre connexion ou appelez-nous.");
      guard.renew(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-slate-900 px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-wide text-amber-300">
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Contact express JRENOV
          </div>
          <h2 id={`${id}-title`} className="text-2xl font-black leading-tight sm:text-3xl">
            Vous préférez qu&apos;on <span className="text-amber-400">vous rappelle ?</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Laissez simplement votre nom et votre numéro. Pas besoin de décrire votre toiture ni de remplir un devis pour être contacté.
          </p>
          <div className="mt-6 border-t border-slate-700 pt-5 text-sm text-slate-300">
            Une fuite active ou une infiltration en cours ?
            <a href={PHONE_HREF} className="mt-2 flex min-h-11 items-center gap-2 font-bold text-amber-300 underline-offset-4 hover:underline">
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Appelez directement le {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-9 sm:py-10">
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center gap-4" role="status" aria-live="polite">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden="true" />
              <h3 className="text-2xl font-black text-slate-900">Votre demande a été transmise !</h3>
              <p className="text-sm leading-6 text-slate-600">
                Merci. JRENOV dispose de vos coordonnées pour vous recontacter au sujet de votre besoin.
              </p>
              {providedEmail && (
                <p className="text-sm leading-6 text-slate-600">
                  {confirmation
                    ? "Un accusé de réception a été envoyé à votre adresse e-mail."
                    : "L'accusé de réception par e-mail n'a pas pu être envoyé, mais votre demande a bien été transmise."}
                </p>
              )}
              <Link href="/devis" className="text-sm font-bold text-amber-700 underline underline-offset-4">
                Vous souhaitez détailler votre projet ? Demander un devis
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Être recontacté</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-nom`} className="mb-1.5 block text-sm font-bold text-slate-900">Nom et prénom *</label>
                  <input
                    id={`${id}-nom`}
                    name="nom"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    minLength={2}
                    required
                    placeholder="Votre nom"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-tel`} className="mb-1.5 block text-sm font-bold text-slate-900">Téléphone *</label>
                  <input
                    id={`${id}-tel`}
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={25}
                    required
                    placeholder="Votre numéro"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500/30"
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-bold text-slate-900">E-mail <span className="font-normal text-slate-500">(facultatif)</span></label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="Pour recevoir une confirmation"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500/30"
                />
                <p className="mt-1.5 text-xs text-slate-500">Si renseigné, un accusé de réception vous est envoyé.</p>
              </div>
              <FormGuardFields />
              {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-65"
              >
                {loading ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
                {loading ? "Transmission en cours…" : "Demander à être rappelé"}
              </button>
              <p className="text-xs leading-5 text-slate-500">
                Vos coordonnées sont utilisées uniquement pour répondre à votre demande de rappel, sans prospection automatique.
                Consultez nos <Link href="/mentions-legales" className="font-semibold text-slate-700 underline underline-offset-2">informations légales</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
