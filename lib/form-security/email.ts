import { isDisposableDomain } from "./disposable-email-domains";
import { hasControlChars, hasLineBreak } from "./sanitize";

export type EmailCheck =
  | { ok: true; email: string; domain: string }
  | { ok: false; reason: "invalid_email" | "disposable_domain" };

const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_LENGTH = 64;

/**
 * Partie locale : caractères usuels (RFC 5322 « dot-atom »), sans point en
 * début/fin ni points consécutifs. Les formes exotiques (guillemets,
 * commentaires) sont volontairement refusées : aucun client réel n'en a besoin.
 */
const LOCAL_PART = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;

/** Label de domaine : lettres (y compris accentuées), chiffres, tirets internes. */
const DOMAIN_LABEL = /^(?!-)[a-z0-9\u00a1-\uffff-]{1,63}(?<!-)$/i;

/**
 * Validation syntaxique raisonnable d'une adresse email :
 * trim, domaine en minuscules, longueurs RFC, domaine avec extension,
 * puis refus des domaines jetables connus.
 */
export function validateEmail(raw: string): EmailCheck {
  const value = raw.trim();
  if (!value || value.length > MAX_EMAIL_LENGTH) return { ok: false, reason: "invalid_email" };
  if (hasControlChars(value) || hasLineBreak(value) || /\s/.test(value)) {
    return { ok: false, reason: "invalid_email" };
  }

  const at = value.lastIndexOf("@");
  if (at <= 0 || at !== value.indexOf("@")) return { ok: false, reason: "invalid_email" };

  const local = value.slice(0, at);
  const domain = value.slice(at + 1).toLowerCase().replace(/\.$/, "");

  if (local.length > MAX_LOCAL_LENGTH || !LOCAL_PART.test(local)) {
    return { ok: false, reason: "invalid_email" };
  }

  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every((label) => DOMAIN_LABEL.test(label))) {
    return { ok: false, reason: "invalid_email" };
  }
  // Extension : au moins 2 caractères, pas uniquement numérique (refuse les IP brutes)
  const tld = labels[labels.length - 1];
  if (tld.length < 2 || /^\d+$/.test(tld)) return { ok: false, reason: "invalid_email" };

  if (isDisposableDomain(domain)) return { ok: false, reason: "disposable_domain" };

  return { ok: true, email: `${local}@${domain}`, domain };
}

/** Identifiant anonymisé pour les logs : seul le domaine est conservé. */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  return at > 0 ? `***@${email.slice(at + 1)}` : "***";
}
