import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClassificationBanner from "@/components/ClassificationBanner";
import Footer from "@/components/Footer";

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
  title: "UAP.WATCH // UAP Situation Dashboard",
  description:
    "Independent visualization layer for the U.S. Department of War's PURSUE program. Mirroring the 2026-05-08 declassified UAP file release.",
  metadataBase: new URL("https://uap-watch-flame.vercel.app"),
  openGraph: {
    title: "UAP.WATCH",
    description:
      "Independent dashboard mirroring the declassified UAP files released by the U.S. Department of War.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UAP.WATCH",
    description:
      "Tactical view of the Pentagon's declassified UAP file release.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${spaceMono.variable}`}>
      <body className="grain bg-bg text-text antialiased">
        <ClassificationBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
