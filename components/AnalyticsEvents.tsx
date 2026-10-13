"use client";

import { useEffect } from "react";
import { trackContactLinkClick } from "@/lib/contact-link-tracking";

/**
 * Suivi centralisé des clics « tel: » et « mailto: » sur tout le site,
 * par délégation d'événement : aucun composant CTA n'a besoin d'être modifié.
 * Seul l'emplacement du lien (header / footer / contenu) est transmis,
 * jamais le numéro ou l'adresse. Les clics « tel: » réels déclenchent aussi la
 * conversion Google Ads téléphone si les cookies publicitaires sont acceptés.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;

      trackContactLinkClick(link, event.isTrusted);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
