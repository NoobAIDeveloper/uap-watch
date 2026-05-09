import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClassificationBanner from "@/components/ClassificationBanner";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_KEYWORDS,
  organizationJsonLd,
  websiteJsonLd,
  datasetJsonLd,
} from "@/lib/seo";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Declassified UFO / UAP Files (Pentagon PURSUE Program)`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Browse 162 declassified UFO/UAP files from the Pentagon's 2026 PURSUE program — 120 PDFs, 28 videos, 14 images. Interactive map, full-text search, primary-source documents from FBI, USAF, USN, NASA, State Department, and DoD.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Declassified UFO / UAP Files`,
    description:
      "Independent dashboard mirroring the 162 declassified UAP files released by the U.S. Department of War's PURSUE program.",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Pentagon UFO / UAP Files`,
    description:
      "162 declassified UFO/UAP files. Interactive map, full-text PDFs, GOFAST, GIMBAL, Eye of Sauron, Apollo lunar anomalies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${spaceMono.variable}`}>
      <body className="grain bg-bg text-text antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), datasetJsonLd()]} />
        <ClassificationBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
