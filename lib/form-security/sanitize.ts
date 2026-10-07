/**
 * Assainissement des chaînes saisies dans les formulaires.
 * Ces fonctions sont pures (aucune dépendance) et testées dans tests/form-security.
 */

/** Caractères de contrôle interdits partout (tabulation, \n et \r gérés à part). */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

/** Sauts de ligne : interdits dans les champs mono-ligne et dans tout ce qui part dans un en-tête email. */
const LINE_BREAKS = /[\r\n\u2028\u2029]/;

/** Marqueurs d'injection HTML / script manifestes. */
const INJECTION_PATTERNS = [
  /<\s*\/?\s*(script|iframe|object|embed|svg|img|style|link|meta|form|input|base)\b/i,
  /javascript\s*:/i,
  /<[^>]*\bon[a-z]+\s*=/i, // gestionnaire d'événement dans une balise (ex. <img onerror=…>)
  /data\s*:\s*text\/html/i,
];

export function hasControlChars(value: string): boolean {
  return CONTROL_CHARS.test(value);
}

export function hasLineBreak(value: string): boolean {
  return LINE_BREAKS.test(value);
}

export function looksLikeInjection(value: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(value));
}

/** Nombre de liens dans un texte (le spam en contient souvent beaucoup). */
export function countLinks(value: string): number {
  return (value.match(/https?:\/\/|www\./gi) ?? []).length;
}

/** Normalise une saisie : NFC, espaces de début/fin retirés, fins de ligne unifiées. */
export function normalizeInput(value: string): string {
  return value.normalize("NFC").replace(/\r\n?/g, "\n").trim();
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;",
};

/** Échappe une valeur avant toute insertion dans le HTML d'un email. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`]/g, (char) => HTML_ESCAPES[char]);
}

/** Échappe puis convertit les sauts de ligne en <br> (texte multi-ligne). */
export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

/**
 * Valeur sûre pour un en-tête email (Subject, nom affiché) :
 * aucun saut de ligne ni caractère de contrôle, longueur bornée.
 */
export function toHeaderSafe(value: string, maxLength = 120): string {
  return value
    .replace(/[\r\n\u2028\u2029]+/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}
