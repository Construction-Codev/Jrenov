"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, PhoneCall, X } from "lucide-react";
import { createPortal } from "react-dom";
import { FormGuardFields, useFormGuard } from "@/components/forms/FormGuard";
import { trackEvent } from "@/lib/analytics";
import { readSubmissionId, trackLeadConversion } from "@/lib/google-ads";

export function isCallbackHours(date: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris", weekday: "short",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const day = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return day !== "Sun" && Number.isFinite(hour) && hour >= 8 && hour < 19;
}

function useCallbackHours(): boolean | null {
  const [opened, setOpened] = useState<boolean | null>(null);
  useEffect(() => {
    const refresh = () => setOpened(isCallbackHours(new Date()));
    refresh();
    const timer = setInterval(refresh, 60_000);
    return () => clearInterval(timer);
  }, []);
  return opened;
}

function CallbackHeading({ open }: { open: boolean | null }) {
  return <>JRENOV vous rappelle {open === null ? "rapidement" : open ? "immédiatement" : "dès l'ouverture"}</>;
}

export function CallbackRequestForm() {
  const id = useId();
  const guard = useFormGuard();
  const open = useCallbackHours();
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || submitted) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: values.get("nom"),
          telephone: values.get("telephone"),
          email: values.get("email") || "",
          ville: "",
          sujet: "rappel",
          message: "Demande de rappel depuis le site JRENOV. Merci de rappeler ce prospect dès que possible pendant les horaires d'ouverture.",
          ...(await guard.getGuardPayload(form)),
        }),
      });
      const id = response.ok ? await readSubmissionId(response) : null;
      if (!response.ok || !id) {
        const body = response.ok ? null : await response.json().catch(() => null);
        setError(typeof body?.error === "string" ? body.error : "Votre demande n'a pas pu être envoyée. Réessayez.");
        guard.renew(form);
        return;
      }
      setSubmitted(true);
      trackEvent("callback_request");
      // Une demande de rappel reçue est un lead confirmé, comme un formulaire.
      // On utilise la conversion existante pour éviter deux actions Google Ads.
      trackLeadConversion(id);
    } catch {
      setError("Erreur réseau. Merci de réessayer.");
      guard.renew(form);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-900">
      <CheckCircle2 className="mx-auto mb-2 h-8 w-8" aria-hidden="true" />
      <strong>Demande reçue !</strong>
      <p className="mt-2 text-sm">{open ? "JRENOV vous rappelle dès que possible." : "JRENOV vous rappelle dès la prochaine ouverture."}</p>
    </div>;
  }

  return <form onSubmit={submit} className="space-y-3">
    <div>
      <label htmlFor={id + "-nom"} className="mb-1 block text-sm font-semibold text-slate-800">Votre nom</label>
      <input id={id + "-nom"} name="nom" type="text" required minLength={2} maxLength={80} autoComplete="name"
        placeholder="Votre nom" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500" />
    </div>
    <div>
      <label htmlFor={id + "-telephone"} className="mb-1 block text-sm font-semibold text-slate-800">Votre numéro de téléphone</label>
      <input id={id + "-telephone"} name="telephone" type="tel" required maxLength={25} autoComplete="tel" inputMode="tel"
        placeholder="06 12 34 56 78" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500" />
    </div>
    <div>
      <label htmlFor={id + "-email"} className="mb-1 block text-sm font-semibold text-slate-800">Votre email (facultatif)</label>
      <input id={id + "-email"} name="email" type="email" maxLength={254} autoComplete="email"
        placeholder="Pour recevoir une confirmation" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500" />
    </div>
    <FormGuardFields />
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <button type="submit" disabled={sending} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-extrabold text-slate-950 hover:bg-amber-400 disabled:opacity-60">
      <PhoneCall className="h-5 w-5" aria-hidden="true" />
      {sending ? "Envoi en cours…" : "Demander mon rappel gratuit"}
    </button>
    <p className="text-center text-xs text-slate-600">
      {open === null ? "Rappel selon nos horaires." : open ? "Rappel immédiat pendant les horaires d'ouverture." : "Rappel dès l'ouverture (lundi-samedi, 8h-19h)."}
      {" "}Vos coordonnées servent à traiter votre demande et à vous envoyer une confirmation si vous renseignez votre email.
    </p>
  </form>;
}

export function CallbackHomeSection() {
  const open = useCallbackHours();
  return <section aria-labelledby="callback-home-title" className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6">
    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-sm font-extrabold uppercase tracking-wider text-amber-700">Rappel gratuit</p>
        <h2 id="callback-home-title" className="text-3xl font-black text-slate-950"><CallbackHeading open={open} /></h2>
        <p className="text-slate-700">Un problème de toiture ? Laissez seulement votre nom et votre téléphone. Un couvreur vous recontacte gratuitement.</p>
        <p className="text-sm text-slate-600">Rappel immédiat du lundi au samedi, de 8h à 19h.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"><CallbackRequestForm /></div>
    </div>
  </section>;
}

export function CallbackDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const opened = useCallbackHours();
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    function escape(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    document.addEventListener("keydown", escape);
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", escape); previous?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4" role="presentation"
    onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="callback-dialog-title"
      className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 id="callback-dialog-title" className="text-xl font-extrabold text-slate-950"><CallbackHeading open={opened} /></h2>
          <p className="mt-1 text-sm text-slate-600">Seulement deux informations pour être rappelé gratuitement.</p>
        </div>
        <button type="button" aria-label="Fermer" ref={closeRef} onClick={onClose} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <CallbackRequestForm />
    </div>
  </div>, document.body);
}
