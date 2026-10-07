import { validateEmail } from "./email";
import { countLinks, hasControlChars, hasLineBreak, looksLikeInjection, normalizeInput } from "./sanitize";

/**
 * Validation serveur des champs des formulaires contact et devis.
 * Les attributs HTML (required, type=email…) ne servent qu'au confort de saisie :
 * seule cette validation fait foi.
 */

export type RejectReason =
  | "missing_field"
  | "invalid_field"
  | "field_too_long"
  | "unexpected_field"
  | "control_chars"
  | "injection"
  | "spam_content"
  | "invalid_email"
  | "disposable_domain"
  | "invalid_phone";

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; reason: RejectReason; field: string };

interface FieldRule {
  required?: boolean;
  min?: number;
  max: number;
  multiline?: boolean;
  pattern?: RegExp;
  allowed?: readonly string[];
  kind?: "text" | "phone" | "email";
}

/** Champs techniques anti-spam, retirés avant la validation métier. */
export const GUARD_FIELDS = ["website", "formToken", "turnstileToken"] as const;

/** Au moins 2 lettres ; lettres accentuées, chiffres, espaces et ponctuation usuelle d'un nom. */
const NAME_PATTERN = /^(?=(?:.*\p{L}){2})[\p{L}\p{M}\p{N} '’.&()-]+$/u;
const PLACE_PATTERN = /^[\p{L}\p{M}\p{N} '’.,()/-]+$/u;
const PHONE_PATTERN = /^[+0-9 ().-]+$/;
const MAX_LINKS = 3;

function checkPhone(value: string): boolean {
  if (!PHONE_PATTERN.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 9 && digits <= 15;
}

function validateFields<T>(raw: unknown, rules: Record<keyof T & string, FieldRule>): ValidationResult<T> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, reason: "invalid_field", field: "payload" };
  }
  const input = raw as Record<string, unknown>;

  // Payload incohérent : champs inattendus
  for (const key of Object.keys(input)) {
    if (!(key in rules) && !(GUARD_FIELDS as readonly string[]).includes(key)) {
      return { ok: false, reason: "unexpected_field", field: key };
    }
  }

  const data: Record<string, string> = {};
  for (const [field, rule] of Object.entries(rules) as [string, FieldRule][]) {
    const value = input[field];
    if (value !== undefined && value !== null && typeof value !== "string") {
      return { ok: false, reason: "invalid_field", field };
    }
    const text = normalizeInput(typeof value === "string" ? value : "");

    if (!text) {
      if (rule.required) return { ok: false, reason: "missing_field", field };
      data[field] = "";
      continue;
    }
    if (text.length > rule.max) return { ok: false, reason: "field_too_long", field };
    if (rule.min && text.length < rule.min) return { ok: false, reason: "invalid_field", field };
    if (hasControlChars(text) || (!rule.multiline && hasLineBreak(text))) {
      return { ok: false, reason: "control_chars", field };
    }
    if (looksLikeInjection(text)) return { ok: false, reason: "injection", field };
    if (rule.multiline && countLinks(text) > MAX_LINKS) return { ok: false, reason: "spam_content", field };
    if (rule.allowed && !rule.allowed.includes(text)) return { ok: false, reason: "invalid_field", field };
    if (rule.pattern && !rule.pattern.test(text)) return { ok: false, reason: "invalid_field", field };

    if (rule.kind === "phone" && !checkPhone(text)) return { ok: false, reason: "invalid_phone", field };
    if (rule.kind === "email") {
      const email = validateEmail(text);
      if (!email.ok) return { ok: false, reason: email.reason, field };
      data[field] = email.email;
      continue;
    }
    data[field] = text;
  }

  return { ok: true, data: data as T };
}

// ─── Formulaire contact ─────────────────────────────────────────────────────

export const CONTACT_SUBJECTS = ["urgence", "couverture", "zinguerie", "isolation", "demoussage", "autre"] as const;

export interface ContactData {
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  sujet: string;
  message: string;
}

export function validateContact(raw: unknown): ValidationResult<ContactData> {
  return validateFields<ContactData>(raw, {
    nom: { required: true, min: 2, max: 80, pattern: NAME_PATTERN },
    telephone: { required: true, max: 25, kind: "phone" },
    email: { max: 254, kind: "email" },
    ville: { max: 100, pattern: PLACE_PATTERN },
    sujet: { required: true, max: 20, allowed: CONTACT_SUBJECTS },
    message: { required: true, min: 5, max: 3000, multiline: true },
  });
}

// ─── Formulaire devis ───────────────────────────────────────────────────────

export const QUOTE_SERVICES = ["couverture", "zinguerie", "isolation", "demoussage", "urgence"] as const;
export const QUOTE_BUILDINGS = ["maison", "immeuble", "autre"] as const;

export interface QuoteData {
  service: string;
  building: string;
  surface: string;
  delai: string;
  nom: string;
  telephone: string;
  email: string;
  codePostal: string;
  description: string;
}

export function validateQuote(raw: unknown): ValidationResult<QuoteData> {
  return validateFields<QuoteData>(raw, {
    service: { required: true, max: 20, allowed: QUOTE_SERVICES },
    building: { required: true, max: 20, allowed: QUOTE_BUILDINGS },
    surface: { max: 9, pattern: /^\d{1,6}(?:[.,]\d{1,2})?$/ },
    delai: { max: 20, pattern: /^[a-z0-9-]+$/ },
    nom: { required: true, min: 2, max: 80, pattern: NAME_PATTERN },
    telephone: { required: true, max: 25, kind: "phone" },
    email: { max: 254, kind: "email" },
    codePostal: { required: true, min: 2, max: 100, pattern: PLACE_PATTERN },
    description: { max: 3000, multiline: true },
  });
}

/** Message affiché au visiteur selon la raison (sans révéler les règles anti-spam). */
export function userMessageFor(reason: RejectReason, field: string): string {
  switch (reason) {
    case "invalid_email":
    case "disposable_domain":
      return "Merci d'utiliser une adresse email valide.";
    case "invalid_phone":
      return "Merci d'indiquer un numéro de téléphone valide.";
    case "missing_field":
      return "Merci de remplir les champs obligatoires.";
    case "field_too_long":
      return field === "message" || field === "description"
        ? "Votre message est trop long. Merci de le raccourcir."
        : "Merci de vérifier les informations saisies.";
    case "invalid_field":
      return "Merci de vérifier les informations saisies.";
    default:
      // control_chars, injection, spam_content, unexpected_field : réponse générique
      return GENERIC_ERROR;
  }
}

export const GENERIC_ERROR =
  "Votre demande n'a pas pu être envoyée. Merci de réessayer ou de nous appeler au 04 65 84 88 85.";
