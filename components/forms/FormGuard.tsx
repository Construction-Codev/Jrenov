"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Protections anti-spam côté navigateur, partagées par les formulaires contact et devis.
 * Elles ne font qu'APPORTER des éléments au serveur, qui reste seul juge :
 * - jeton signé récupéré à l'affichage (temps de remplissage minimal) ;
 * - champ piège (honeypot) invisible pour les humains ;
 * - jeton Cloudflare Turnstile, uniquement si NEXT_PUBLIC_TURNSTILE_SITE_KEY est défini.
 *
 * Le honeypot et le jeton Turnstile sont lus dans le <form> soumis : aucune ref
 * n'est partagée entre composants.
 */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
/** Attribut portant l'identifiant du widget Turnstile rendu dans le formulaire. */
const TURNSTILE_ATTR = "data-turnstile-widget";
/** Au-delà, le jeton est renouvelé avant l'envoi (il expire après 24 h côté serveur). */
const TOKEN_REFRESH_AFTER_MS = 60 * 60 * 1000;
/** Nom du champ piège (doit rester identique côté serveur). */
const HONEYPOT_NAME = "website";

interface TurnstileApi {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId?: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadTurnstileScript(): Promise<void> {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile_script"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export interface FormGuard {
  /** Champs anti-spam à fusionner dans le corps JSON de la requête. */
  getGuardPayload: (form: HTMLFormElement) => Promise<Record<string, string>>;
  /** À appeler après un échec : nouveau jeton et nouveau défi Turnstile. */
  renew: (form: HTMLFormElement | null) => void;
}

export function useFormGuard(): FormGuard {
  const tokenRef = useRef<string | null>(null);

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("/api/form-token", { cache: "no-store" });
      const data = (await res.json()) as { token?: string };
      tokenRef.current = data.token ?? null;
    } catch {
      tokenRef.current = null;
    }
    return tokenRef.current;
  }, []);

  useEffect(() => {
    void fetchToken();
  }, [fetchToken]);

  const getGuardPayload = useCallback(
    async (form: HTMLFormElement) => {
      // Onglet resté ouvert longtemps : nouveau jeton avant expiration (24 h côté serveur)
      const issuedAt = Number(tokenRef.current?.split(".")[0]);
      const stale = !Number.isFinite(issuedAt) || Date.now() - issuedAt > TOKEN_REFRESH_AFTER_MS;
      const formToken = (stale ? await fetchToken() : tokenRef.current) ?? "";
      const honeypot = form.querySelector<HTMLInputElement>(`input[name="${HONEYPOT_NAME}"]`);
      const payload: Record<string, string> = { formToken, website: honeypot?.value ?? "" };

      // Turnstile injecte lui-même le jeton dans un champ caché de son conteneur
      const turnstileInput = form.querySelector<HTMLInputElement>(
        `[${TURNSTILE_ATTR}] input[name="cf-turnstile-response"]`
      );
      if (turnstileInput?.value) payload.turnstileToken = turnstileInput.value;
      return payload;
    },
    [fetchToken]
  );

  const renew = useCallback(
    (form: HTMLFormElement | null) => {
      void fetchToken();
      const widgetId = form?.querySelector(`[${TURNSTILE_ATTR}]`)?.getAttribute(TURNSTILE_ATTR);
      if (widgetId) window.turnstile?.reset(widgetId);
    },
    [fetchToken]
  );

  return { getGuardPayload, renew };
}

/** Widget Turnstile autonome ; son jeton est lu dans le formulaire par useFormGuard. */
function TurnstileWidget({ siteKey }: { siteKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    let widgetId: string | undefined;
    let active = true;

    loadTurnstileScript()
      .then(() => {
        if (!active || !window.turnstile) return;
        widgetId = window.turnstile.render(element, {
          sitekey: siteKey,
          // Invisible tant que Cloudflare n'exige pas d'interaction
          appearance: "interaction-only",
        });
        element.setAttribute(TURNSTILE_ATTR, widgetId);
      })
      .catch(() => {
        // Script indisponible : le serveur refusera la soumission avec un message générique
      });

    return () => {
      active = false;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [siteKey]);

  return <div ref={containerRef} {...{ [TURNSTILE_ATTR]: "" }} className="flex justify-center empty:hidden" />;
}

/**
 * Champs anti-spam à placer dans le <form>.
 * Le honeypot est hors écran (et non `display: none`, que certains bots ignorent),
 * absent de l'ordre de tabulation, masqué aux lecteurs d'écran et sans autocomplétion.
 */
export function FormGuardFields() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={HONEYPOT_NAME}>Ne pas remplir ce champ</label>
        <input
          type="text"
          id={HONEYPOT_NAME}
          name={HONEYPOT_NAME}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          // Ignoré par les gestionnaires de mots de passe / autocomplétion (1Password, LastPass, Dashlane, Bitwarden)
          data-1p-ignore=""
          data-lpignore="true"
          data-form-type="other"
          data-bwignore=""
        />
      </div>
      {TURNSTILE_SITE_KEY && <TurnstileWidget siteKey={TURNSTILE_SITE_KEY} />}
    </>
  );
}
