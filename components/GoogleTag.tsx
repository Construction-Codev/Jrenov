"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getAdsConsent, subscribeAdsConsent } from "@/lib/consent";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";

/**
 * Balise Google (gtag.js) pour Google Ads, chargée une seule fois pour tout le site
 * et UNIQUEMENT si le visiteur a accepté les cookies publicitaires (voir lib/consent.ts).
 * Sans consentement : aucun script Google, aucune requête, aucun cookie.
 * La conversion n'est jamais déclenchée ici (voir trackLeadConversion).
 */
export default function GoogleTag() {
  const consent = useSyncExternalStore(subscribeAdsConsent, getAdsConsent, () => "unknown" as const);
  if (consent !== "granted") return null;

  return (
    <>
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);};
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script
        id="google-ads-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
