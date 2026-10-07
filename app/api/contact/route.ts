import { handleFormSubmission } from '@/lib/form-security/submission';
import { validateContact } from '@/lib/form-security/validation';
import { sendContactEmail } from '@/lib/form-emails';

// Formulaire de contact : toutes les protections (origine, taille, rate limit,
// honeypot, jeton temporel, validation, email, Turnstile éventuel) sont
// appliquées par handleFormSubmission avant tout envoi via Resend.
export async function POST(request: Request) {
  return handleFormSubmission(request, {
    form: 'contact',
    validate: validateContact,
    send: sendContactEmail,
  });
}
