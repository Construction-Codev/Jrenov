"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Lien permanent du pied de page pour modifier le choix de cookies. */
export default function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Gérer mes cookies
    </button>
  );
}
