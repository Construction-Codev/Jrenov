import { NextResponse } from 'next/server';
import { issueFormToken } from '@/lib/form-security/form-token';

// Jeton signé demandé par les formulaires à leur affichage : il permet au serveur
// de vérifier le temps de remplissage. Jamais mis en cache.
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  );
}
