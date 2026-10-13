import { trackEvent } from "@/lib/analytics";
import { trackPhoneConversion } from "@/lib/google-ads";

/** Partie d'un élément DOM utilisée ici (permet de tester sans navigateur). */
type LinkLike = Pick<Element, "getAttribute" | "closest">;

/**
 * Traite un clic sur un lien « tel: » ou « mailto: » repéré par la délégation
 * d'événements de components/AnalyticsEvents.tsx.
 *
 * - Vercel Analytics : phone_click / email_click avec l'emplacement uniquement.
 * - Google Ads : conversion téléphone, seulement pour un « tel: » et un clic réel
 *   (`isTrusted`, donc jamais un clic simulé par script). Le consentement est
 *   vérifié dans trackPhoneConversion().
 *
 * Ne modifie jamais l'événement : l'ouverture de l'application Téléphone ou de
 * la messagerie suit son cours normal.
 */
export function trackContactLinkClick(link: LinkLike, isTrusted: boolean): void {
  const href = (link.getAttribute("href") ?? "").trim().toLowerCase();
  const isPhone = href.startsWith("tel:");
  if (!isPhone && !href.startsWith("mailto:")) return;

  const placement = link.closest("header")
    ? "header"
    : link.closest("footer")
      ? "footer"
      : "content";

  trackEvent(isPhone ? "phone_click" : "email_click", { placement });

  if (isPhone && isTrusted) trackPhoneConversion();
}
