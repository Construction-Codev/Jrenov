import { handleFormSubmission } from '@/lib/form-security/submission';
import { validateQuote } from '@/lib/form-security/validation';
import { sendQuoteEmail } from '@/lib/form-emails';

// Formulaire de devis : mêmes protections que le formulaire de contact
// (lib/form-security/submission.ts), appliquées avant tout envoi via Resend.
export async function POST(request: Request) {
  return handleFormSubmission(request, {
    form: 'devis',
    validate: validateQuote,
    send: sendQuoteEmail,
  });
}
