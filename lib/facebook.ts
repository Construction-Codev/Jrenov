import type { FacebookApiResponse, FacebookPost } from '@/types/facebook';

const isDev = process.env.NODE_ENV === 'development';
const loggedMessages = new Set<string>();

/**
 * Diagnostic du flux Facebook, sans aucune donnée sensible (ni token, ni identifiant).
 * - Développement : un résumé à chaque appel (variables, résultat de l'appel, nombre de posts).
 * - Production / build : uniquement les échecs, une seule fois par processus (logs serveur),
 *   l'interface restant silencieuse pour le visiteur.
 */
function logDiagnostic(summary: { variables: boolean; api: string; posts: number }, isFailure: boolean) {
  const message =
    `FacebookFeed: variables disponibles ${summary.variables ? 'oui' : 'non'}` +
    ` | appel API ${summary.api}` +
    ` | posts récupérés ${summary.posts}`;

  if (isDev) {
    (isFailure ? console.warn : console.info)(message);
    return;
  }
  if (isFailure && !loggedMessages.has(message)) {
    loggedMessages.add(message);
    console.warn(message);
  }
}

/**
 * Récupère les dernières publications de la page Facebook.
 * Ne lève jamais d'exception : en cas d'API indisponible ou de token refusé,
 * retourne une liste vide pour que le flux soit simplement masqué.
 */
export async function getFacebookPosts(limit = 6): Promise<FacebookPost[]> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    logDiagnostic({ variables: false, api: 'non tenté', posts: 0 }, true);
    return [];
  }

  const url = `https://graph.facebook.com/v20.0/${pageId}/posts?fields=id,message,full_picture,created_time,permalink_url&limit=${limit}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 7200 }, // Révalide toutes les 2 heures (ISR)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const code = errorData?.error?.code;
      const subcode = errorData?.error?.error_subcode;
      const detail = `échec (HTTP ${res.status}${code ? `, code Meta ${code}` : ''}${subcode ? `/${subcode}` : ''})`;
      logDiagnostic({ variables: true, api: detail, posts: 0 }, true);
      return [];
    }

    const json: FacebookApiResponse = await res.json();
    const posts = (json.data || []).sort(
      // Tri chronologique : le plus récent en premier
      (a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
    );

    logDiagnostic({ variables: true, api: 'succès', posts: posts.length }, false);
    return posts;
  } catch (error) {
    const reason = error instanceof Error ? error.name : 'erreur inconnue';
    logDiagnostic({ variables: true, api: `échec réseau (${reason})`, posts: 0 }, true);
    return [];
  }
}
