import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import FacebookFeed from "@/components/FacebookFeed";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import GoogleTag from "@/components/GoogleTag";
import ConsentBanner from "@/components/ConsentBanner";
import {
  BUSINESS,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { businessJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { getBreadcrumbTrails } from "@/lib/breadcrumb";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: BUSINESS.founder }],
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  verification: {
    google: "CDiAmQ2IJErLnLF6rShtnkzOSJBZguHs8_7oX9ZxyQQ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <JsonLd data={businessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <Breadcrumb trails={getBreadcrumbTrails()} />
        <main className="flex-1">{children}</main>
        <FacebookFeed />
        <Footer />
        <AnalyticsEvents />
        <GoogleTag />
        <ConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
