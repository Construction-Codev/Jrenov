import { Resend } from "resend";
import { escapeHtml, escapeMultiline, toHeaderSafe } from "@/lib/form-security/sanitize";
import type { ContactData, QuoteData } from "@/lib/form-security/validation";

/**
 * Construction et envoi des emails des formulaires.
 * Toutes les valeurs saisies sont échappées avant insertion dans le HTML ;
 * le sujet et le Reply-To ne contiennent que des valeurs mono-ligne validées.
 */

let client: Resend | undefined;
function getResend(): Resend {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

const or = (value: string, fallback: string) => (value ? escapeHtml(value) : fallback);

// ─── Contact ────────────────────────────────────────────────────────────────

const CONTACT_SUBJECT_LABELS: Record<string, string> = {
  urgence: "Urgence fuite / Dépannage",
  couverture: "Rénovation de toiture / Tuiles",
  zinguerie: "Zinguerie & Gouttières",
  isolation: "Isolation de toiture",
  demoussage: "Nettoyage & Démoussage",
  autre: "Autre demande",
  rappel: "RAPPEL IMMÉDIAT – demande de rappel",
};

export function buildContactEmail(data: ContactData) {
  const subjectLabel = CONTACT_SUBJECT_LABELS[data.sujet] ?? data.sujet;
  return {
    from: "Jrenov Site <contact@jrenov.com>",
    to: ["contact@jrenov.com"],
    replyTo: data.email || undefined,
    subject: toHeaderSafe(`[Formulaire Site] Nouvelle demande : ${subjectLabel} - ${data.nom}`, 150),
    html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97706;">Nouvelle demande de contact (Jrenov)</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nom complet :</strong> ${escapeHtml(data.nom)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(data.telephone)}</p>
          <p><strong>Email :</strong> ${or(data.email, "Non renseigné")}</p>
          <p><strong>Ville / CP :</strong> ${or(data.ville, "Non renseigné")}</p>
          <p><strong>Type d'intervention :</strong> ${escapeHtml(subjectLabel)}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message / Description :</strong></p>
          <p style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            ${escapeMultiline(data.message)}
          </p>
        </div>
      `,
  };
}

export async function sendContactEmail(data: ContactData): Promise<void> {
  const { error } = await getResend().emails.send(buildContactEmail(data));
  if (error) throw new Error(error.name ?? "resend_error");
}

// ─── Devis ──────────────────────────────────────────────────────────────────

export function buildQuoteEmail(data: QuoteData) {
  // Le lien tel: ne reçoit que les chiffres et le « + » du numéro validé
  const telHref = data.telephone.replace(/[^\d+]/g, "");

  return {
    from: process.env.CONTACT_EMAIL_FROM as string,
    to: [process.env.CONTACT_EMAIL_TO as string],
    replyTo: data.email || undefined,
    subject: toHeaderSafe(`[Demande de Devis] ${data.nom}`, 150),
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #d97706; margin-top: 0;">Nouvelle demande de devis en ligne</h2>
          <p style="font-size: 14px; color: #64748b;">Reçue depuis le formulaire de devis du site web.</p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

          <p><strong>Message :</strong></p>
          <div style="background-color: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px;">
            ${escapeMultiline(data.message)}
          </div>

          <h3 style="color: #0f172a; font-size: 16px; margin-top: 20px;">Coordonnées du client</h3>
          <ul>
            <li><strong>Nom & Prénom :</strong> ${escapeHtml(data.nom)}</li>
            <li><strong>Téléphone :</strong> <a href="tel:${escapeHtml(telHref)}" style="color: #d97706; font-weight: bold;">${escapeHtml(data.telephone)}</a></li>
            <li><strong>E-mail :</strong> ${or(data.email, "Non renseigné")}</li>
          </ul>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">Message automatique généré par le site Jrenov.</p>
        </div>
      `,
  };
}

export async function sendQuoteEmail(data: QuoteData): Promise<void> {
  const { error } = await getResend().emails.send(buildQuoteEmail(data));
  if (error) throw new Error(error.name ?? "resend_error");
}
