/**
 * Domaines d'adresses email jetables (temporaires) connus.
 *
 * Choix : une liste locale courte et ciblée plutôt qu'une liste de plusieurs
 * dizaines de milliers d'entrées. Elle couvre les services les plus utilisés
 * par les bots et les visiteurs malveillants ; la vérification MX
 * (lib/form-security/mx.ts) complète ce filtre pour les domaines inventés.
 *
 * Maintenance : ajouter ici tout domaine jetable repéré dans les logs
 * (« rejected: disposable_domain » n'apparaît que pour ceux déjà listés ;
 * les autres sont visibles dans les demandes reçues).
 * Les sous-domaines sont couverts : « x.mailinator.com » est bloqué.
 *
 * NE JAMAIS ajouter de domaine grand public (gmail.com, outlook.com,
 * hotmail.com, orange.fr, free.fr, icloud.com, yahoo.com, proton.me…),
 * ni de service d'alias de confidentialité (33mail, SimpleLogin, addy.io,
 * Firefox Relay…) : de vrais clients les utilisent.
 */
export const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  // Mailinator et ses alias
  "mailinator.com",
  "mailinator.net",
  "mailinator.org",
  "mailinator2.com",
  "notmailinator.com",
  "reallymymail.com",
  "sogetthis.com",
  "spamherelots.com",
  "thisisnotmyrealemail.com",
  "binkmail.com",
  "bobmail.info",
  "chammy.info",
  "suremail.info",
  "tradermail.info",
  "veryrealemail.com",
  // Guerrilla Mail
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.info",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "pokemail.net",
  "spam4.me",
  // 10 Minute Mail et apparentés
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.co.uk",
  "10minutemail.de",
  "10minemail.com",
  "20minutemail.com",
  "minutemail.com",
  // Temp Mail et variantes
  "temp-mail.org",
  "temp-mail.io",
  "tempmail.com",
  "tempmail.net",
  "tempmail.de",
  "tempmailo.com",
  "tempmail.dev",
  "tempmail.plus",
  "tempmailaddress.com",
  "tempr.email",
  "tempail.com",
  "temp-mail.ru",
  "tmpmail.org",
  "tmpmail.net",
  "tmpeml.com",
  "tempinbox.com",
  "throwawaymail.com",
  // YOPmail et ses alias
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "cool.fr.nf",
  "jetable.fr.nf",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",
  "nospam.ze.tc",
  "nomail.xl.cx",
  "mega.zik.dj",
  "speed.1s.fr",
  // Services français / européens
  "jetable.org",
  "jetable.com",
  "jetable.net",
  "trashmail.com",
  "trashmail.net",
  "trashmail.de",
  "trashmail.io",
  "trashmail.me",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "spambog.com",
  "spambog.de",
  "mailnesia.com",
  "mytrashmail.com",
  "kurzepost.de",
  // Autres services jetables courants
  "getnada.com",
  "nada.email",
  "maildrop.cc",
  "dispostable.com",
  "discard.email",
  "fakeinbox.com",
  "fakemail.net",
  "emailondeck.com",
  "mohmal.com",
  "mintemail.com",
  "mailcatch.com",
  "mailexpire.com",
  "incognitomail.org",
  "anonbox.net",
  "harakirimail.com",
  "inboxkitten.com",
  "emailfake.com",
  "fakemailgenerator.com",
  "generator.email",
  "luxusmail.org",
  "mailpoof.com",
  "mail.tm",
  "mail.gw",
  "dropmail.me",
  "1secmail.com",
  "1secmail.net",
  "1secmail.org",
  "linshiyouxiang.net",
  "byom.de",
  "spamdecoy.net",
  "mailtemp.net",
  "emltmp.com",
]);

/** Vrai si le domaine (ou l'un de ses domaines parents) est un service jetable connu. */
export function isDisposableDomain(domain: string): boolean {
  const labels = domain.toLowerCase().replace(/\.$/, "").split(".");
  for (let i = 0; i < labels.length - 1; i++) {
    if (DISPOSABLE_EMAIL_DOMAINS.has(labels.slice(i).join("."))) return true;
  }
  return false;
}
