import { Resend } from "resend";
import { escapeHtml, escapeMultiline, toHeaderSafe } from "@/lib/form-security/sanitize";
import type { ContactData, QuoteData } from "@/lib/form-security/validation";
import { BUSINESS, PHONE_HREF, SITE_URL } from "@/lib/site";

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

type ConfirmationKind = "contact" | "devis" | "rappel";

const CONFIRMATIONS: Record<ConfirmationKind, { subject: string; message: string }> = {
  contact: {
    subject: "Jrenov : votre message a bien été reçu",
    message: "Nous avons bien reçu votre message. Notre équipe vous recontactera pour répondre à votre demande.",
  },
  devis: {
    subject: "Jrenov : votre demande de devis a bien été reçue",
    message: "Nous avons bien reçu votre demande de devis. Notre équipe vous recontactera pour préciser votre projet et préparer un devis adapté.",
  },
  rappel: {
    subject: "Jrenov : votre demande de rappel a bien été reçue",
    message: "Nous avons bien reçu votre demande de rappel. Notre équipe vous rappellera dès que possible pendant nos horaires d’ouverture, du lundi au samedi, de 8h à 19h.",
  },
};

/** Contenu fixe : le message libre du visiteur n'est pas retransmis à une adresse tierce. */
export function buildConfirmationEmail(email: string, kind: ConfirmationKind, from: string) {
  const content = CONFIRMATIONS[kind];
  return {
    from,
    to: [email],
    replyTo: BUSINESS.email,
    subject: content.subject,
    text: `Bonjour,\n\n${content.message}\n\nVous pouvez répondre à cet email ou nous appeler au ${BUSINESS.phoneDisplay}.\n\nL’équipe Jrenov\n${SITE_URL}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b;">
        <h1 style="font-size: 22px; color: #b45309;">Merci pour votre demande</h1>
        <p>Bonjour,</p>
        <p>${escapeHtml(content.message)}</p>
        <p>Vous pouvez répondre à cet email ou nous appeler au <a href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a>.</p>
        <p>L’équipe <a href="${SITE_URL}">Jrenov</a></p>
      </div>
    `,
  };
}

async function sendWithConfirmation(notification: ReturnType<typeof buildContactEmail>, email: string, kind: ConfirmationKind): Promise<void> {
  const { error } = await getResend().emails.send(notification);
  if (error) throw new Error(error.name ?? "resend_error");
  if (!email) return;

  // La demande est déjà reçue : un échec de confirmation ne doit pas provoquer un nouvel envoi du formulaire.
  try {
    const confirmation = await getResend().emails.send(buildConfirmationEmail(email, kind, notification.from));
    if (confirmation.error) throw new Error("confirmation_failed");
  } catch {
    // Aucune adresse ni contenu saisi dans les logs.
    console.warn(`[form] ${kind} confirmation_failed`);
  }
}

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
  await sendWithConfirmation(buildContactEmail(data), data.email, data.sujet === "rappel" ? "rappel" : "contact");
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
  await sendWithConfirmation(buildQuoteEmail(data), data.email, "devis");
}
