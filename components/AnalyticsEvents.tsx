"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Suivi centralisé des clics « tel: » et « mailto: » sur tout le site,
 * par délégation d'événement : aucun composant CTA n'a besoin d'être modifié.
 * Seul l'emplacement du lien (header / footer / contenu) est transmis,
 * jamais le numéro ou l'adresse.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;

      const placement = link.closest("header")
        ? "header"
        : link.closest("footer")
          ? "footer"
          : "content";

      const href = link.getAttribute("href") ?? "";
      trackEvent(href.startsWith("tel:") ? "phone_click" : "email_click", { placement });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
