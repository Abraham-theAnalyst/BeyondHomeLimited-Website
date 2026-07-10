import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

// Archivo variable, instanced to the axes the design actually uses
// (wght 600-800, wdth 100-125): 41KB instead of Google's 87KB.
const archivo = localFont({
  src: "./fonts/archivo-sub.woff2",
  weight: "600 800",
  variable: "--font-archivo",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false, // caption-size only; never worth blocking LCP bandwidth
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Beyond Home Limited",
  description:
    "Media advertising across Nigeria: billboards, building wraps, signage, fleets and branded interiors. Established 2013, Lagos.",
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${schibsted.variable} ${plexMono.variable}`}
    >
      <body>
        <JsonLd data={organizationJsonLd()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
