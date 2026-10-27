import { handleFormSubmission } from "@/lib/form-security/submission";
import { validateCallback } from "@/lib/form-security/validation";
import { sendCallbackEmails } from "@/lib/callback-emails";

/**
 * Formulaire express : même validation d'origine, limitation par IP,
 * honeypot, jeton signé, Turnstile éventuel et contrôle MX que /api/devis.
 */
export async function POST(request: Request) {
  return handleFormSubmission(request, {
    form: "rappel",
    validate: validateCallback,
    send: sendCallbackEmails,
  });
}
