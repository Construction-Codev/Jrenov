"use client";

import Script from "next/script";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getAdsConsent, subscribeAdsConsent,
  getAnalyticsConsent, subscribeAnalyticsConsent,
} from "@/lib/consent";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";
import { GA4_MEASUREMENT_ID } from "@/lib/google-analytics";

/**
 * Google Ads et GA4 partagent UNE SEULE bibliothèque gtag.js.
 * Pas de connexion Google avant consentement à au moins l'une des deux finalités.
 * Chaque finalité reste indépendante (publicitaire vs. mesure d'audience).
 */
export default function GoogleTag() {
  const ads = useSyncExternalStore(subscribeAdsConsent, getAdsConsent, () => "unknown");
  const analytics = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, () => "unknown");
  const pathname = usePathname();

  const allowAds = ads === "granted";
  const allowAnalytics = analytics === "granted" && GA4_MEASUREMENT_ID !== null;
  const shouldLoad = allowAds || allowAnalytics;
  const initialized = useRef(false);
  const configured = useRef({ ads: false, analytics: false });
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!shouldLoad) return;

    window.dataLayer ??= [];
    window.gtag ??= (...args: unknown[]) => { window.dataLayer?.push(args); };

    if (!initialized.current) {
      // Baseline « refus » avant toute configuration du tag.
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("js", new Date());
      initialized.current = true;
    }

    window.gtag("consent", "update", {
      analytics_storage: allowAnalytics ? "granted" : "denied",
      ad_storage: allowAds ? "granted" : "denied",
      ad_user_data: allowAds ? "granted" : "denied",
      ad_personalization: allowAds ? "granted" : "denied",
    });

    if (allowAds && !configured.current.ads) {
      window.gtag("config", GOOGLE_ADS_ID);
      configured.current.ads = true;
    }

    if (allowAnalytics && GA4_MEASUREMENT_ID && !configured.current.analytics) {
      window.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false });
      configured.current.analytics = true;
    }

    if (allowAnalytics && GA4_MEASUREMENT_ID) {
      const location = window.location.href;
      // Page vue initiale et changements de routes Next.js, sans doublon.
      if (lastPage.current !== location) {
        window.gtag("event", "page_view", {
          send_to: GA4_MEASUREMENT_ID,
          page_location: location,
          page_path: pathname,
        });
        lastPage.current = location;
      }
    } else {
      lastPage.current = null;
    }
  }, [allowAds, allowAnalytics, shouldLoad, pathname]);

  if (!shouldLoad) return null;
  const initialId = allowAds ? GOOGLE_ADS_ID : GA4_MEASUREMENT_ID;
  return (
    <Script
      id="google-shared-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${initialId}`}
      strategy="afterInteractive"
    />
  );
}
