import { Resend } from "resend";
import { BUSINESS, PHONE_HREF, SITE_URL } from "@/lib/site";
import { escapeHtml, toHeaderSafe } from "@/lib/form-security/sanitize";
import type { CallbackData } from "@/lib/form-security/validation";

/**
 * E-mails de la demande de rappel :
 * 1. notification au professionnel (obligatoire pour confirmer la soumission) ;
 * 2. accusé de réception au prospect, seulement si son email a été fourni.
 * Le second envoi ne doit pas annuler une demande déjà transmise au professionnel.
 */
function emailConfig() {
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!process.env.RESEND_API_KEY || !from || !to) {
    throw new Error("email_configuration_missing");
  }
  return { from, to };
}

function layout(content: string, preheader: string): string {
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<div style="display:none;font-size:1px;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9;border-collapse:collapse"><tr><td align="center" style="padding:26px 12px">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-collapse:collapse;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#0f172a;padding:25px 28px;border-bottom:4px solid #f59e0b">
  <div style="color:#fff;font-size:28px;font-weight:900;letter-spacing:0.2px"><span style="color:#f59e0b">J</span>RENOV<span style="color:#f59e0b">.</span></div>
  <div style="color:#cbd5e1;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;margin-top:6px">Couverture · Zinguerie · Est lyonnais</div>
</td></tr>
<tr><td style="padding:32px 28px 26px">${content}</td></tr>
<tr><td style="background:#0f172a;padding:22px 28px">
  <div style="color:#e2e8f0;font-size:13px;font-weight:bold">JRENOV · Couvreur-zingueur à Décines-Charpieu</div>
  <div style="color:#cbd5e1;font-size:12px;line-height:22px;margin-top:5px">48 Ancien Chemin des Marais, 69150 Décines-Charpieu</div>
  <div style="color:#cbd5e1;font-size:12px"><a href="${PHONE_HREF}" style="color:#fbbf24;text-decoration:none">${escapeHtml(BUSINESS.phoneDisplay)}</a> · <a href="${SITE_URL}" style="color:#fbbf24;text-decoration:none">www.jrenov.com</a></div>
</td></tr></table>
<p style="font-size:11px;color:#64748b;text-align:center;line-height:17px;max-width:560px;margin:16px 0 0">E-mail automatique lié à une demande effectuée sur le site JRENOV. Aucun abonnement publicitaire.</p>
</td></tr></table>
</body></html>`;
}

const headline = (title: string, intro: string) => `
<p style="margin:0 0 10px;color:#b45309;text-transform:uppercase;font-size:12px;letter-spacing:1px;font-weight:700">JRENOV · Demande de rappel</p>
<h1 style="margin:0 0 15px;font-size:25px;line-height:33px;font-weight:800;color:#0f172a">${title}</h1>
<p style="margin:0 0 25px;font-size:15px;line-height:24px;color:#475569">${intro}</p>
`;

export function buildCallbackNotification(data: CallbackData, from: string, to: string) {
  const safeName = escapeHtml(data.nom);
  const safePhone = escapeHtml(data.telephone);
  const safeEmail = data.email ? escapeHtml(data.email) : "Non renseigné";
  const safeTelHref = data.telephone.replace(/[^\d+]/g, "");
  const content = `${headline("Nouveau prospect à rappeler", "Une demande de rappel express vient d’être reçue depuis le site JRENOV.")}
<table role="presentation" width="100%" style="border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px">
<tr><td style="padding:16px 20px;font-size:13px;color:#64748b">Nom du prospect</td><td style="padding:16px 20px;text-align:right;font-weight:bold;font-size:15px;color:#0f172a">${safeName}</td></tr>
<tr><td style="padding:14px 20px;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0">Téléphone</td><td style="padding:14px 20px;text-align:right;border-top:1px solid #e2e8f0"><a style="font-weight:bold;color:#b45309" href="tel:${escapeHtml(safeTelHref)}">${safePhone}</a></td></tr>
<tr><td style="padding:14px 20px;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0">E-mail</td><td style="padding:14px 20px;text-align:right;border-top:1px solid #e2e8f0;color:#0f172a;font-size:13px">${safeEmail}</td></tr>
</table>
<table role="presentation" width="100%"><tr><td style="padding-top:26px;text-align:center">
<a href="tel:${escapeHtml(safeTelHref)}" style="display:inline-block;background:#f59e0b;color:#0f172a;font-weight:800;text-decoration:none;padding:15px 24px;border-radius:9px;font-size:15px">Rappeler ce prospect</a>
</td></tr></table>
<p style="margin:23px 0 0;color:#64748b;font-size:12px;line-height:20px">Ce message contient uniquement les informations demandées dans le formulaire express.</p>`;
  return {
    from, to: [to],
    ...(data.email ? { replyTo: data.email } : {}),
    subject: toHeaderSafe(`[JRENOV] Demande de rappel — ${data.nom}`, 150),
    html: layout(content, "Nouveau prospect à rappeler depuis jrenov.com"),
    text: `Nouvelle demande de rappel JRENOV\nNom : ${data.nom}\nTéléphone : ${data.telephone}\nE-mail : ${data.email || "Non renseigné"}\n`,
  };
}

export function buildCallbackConfirmation(data: CallbackData, from: string) {
  const content = `${headline(`Votre demande est bien reçue, ${escapeHtml(data.nom)}`, "Merci de votre confiance. Nous avons reçu votre demande de rappel. Notre équipe prendra contact avec vous pour échanger sur votre besoin en toiture.")}
<div style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:7px;padding:18px 20px;margin-bottom:24px">
  <p style="margin:0 0 6px;color:#92400e;font-weight:bold;font-size:13px">Vos coordonnées enregistrées</p>
  <p style="margin:0;color:#0f172a;font-size:14px;line-height:23px">Nom : <strong>${escapeHtml(data.nom)}</strong><br>Téléphone : <strong>${escapeHtml(data.telephone)}</strong></p>
</div>
<p style="font-size:14px;line-height:23px;color:#475569;margin:0 0 22px">Si de l'eau pénètre actuellement dans votre logement, privilégiez un appel direct plutôt que d’attendre un rappel.</p>
<table role="presentation" width="100%"><tr><td align="center">
<a href="${PHONE_HREF}" style="display:inline-block;background:#f59e0b;color:#0f172a;font-weight:800;text-decoration:none;padding:15px 24px;border-radius:9px;font-size:15px">Appeler JRENOV au ${escapeHtml(BUSINESS.phoneDisplay)}</a>
</td></tr></table>
<p style="font-size:12px;line-height:20px;color:#64748b;margin:24px 0 0">Il s'agit d'un accusé de réception automatique, et non d'une confirmation de rendez-vous ou d'une promesse de délai d’intervention. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>`;
  return {
    from,
    to: [data.email],
    replyTo: BUSINESS.email,
    subject: "JRENOV — Nous avons bien reçu votre demande de rappel",
    html: layout(content, "Votre demande de rappel a bien été reçue par JRENOV."),
    text: `Bonjour ${data.nom},\n\nNous avons bien reçu votre demande de rappel au ${data.telephone}. Notre équipe prendra contact avec vous pour échanger sur votre besoin.\n\nEn cas d'infiltration active, appelez le ${BUSINESS.phoneDisplay}.\n\nJRENOV - 48 Ancien Chemin des Marais, 69150 Décines-Charpieu\n`,
  };
}

export async function sendCallbackEmails(data: CallbackData): Promise<{ confirmationSent: boolean }> {
  const { from, to } = emailConfig();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // L'accusé ne part que si la notification métier a été réellement acceptée.
  const notification = await resend.emails.send(buildCallbackNotification(data, from, to));
  if (notification.error || !notification.data?.id) throw new Error("professional_notification_failed");

  if (!data.email) return { confirmationSent: false };
  try {
    const confirmation = await resend.emails.send(buildCallbackConfirmation(data, from));
    if (confirmation.error || !confirmation.data?.id) {
      console.warn("[form] rappel confirmation_send_failed");
      return { confirmationSent: false };
    }
    return { confirmationSent: true };
  } catch {
    console.warn("[form] rappel confirmation_send_failed");
    return { confirmationSent: false };
  }
}
