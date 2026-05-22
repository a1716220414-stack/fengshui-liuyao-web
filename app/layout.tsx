import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactCTA from "@/components/marketing/FloatingContactCTA";
import ServiceContactSection from "@/components/marketing/ServiceContactSection";
import {
  jsonLdScript,
  organizationJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "SY Metaphysics",
  title: {
    default: "SY Metaphysics | Feng Shui & Liu Yao Consultation",
    template: "%s | SY Metaphysics",
  },
  description:
    "SY Metaphysics provides bilingual Feng Shui analysis, Liu Yao divination, floor plan review, and consultation services for overseas users.",
  keywords: [
    "Feng Shui",
    "Liu Yao",
    "Chinese metaphysics",
    "I Ching",
    "home feng shui",
    "room feng shui",
    "feng shui consultation",
    "six lines divination",
    "风水",
    "六爻",
    "易经",
    "东方玄学",
  ],
  authors: [
    {
      name: "SY Metaphysics",
    },
  ],
  creator: "SY Metaphysics",
  publisher: "SY Metaphysics",
  openGraph: {
    title: "SY Metaphysics | Feng Shui & Liu Yao Consultation",
    description:
      "Bilingual Feng Shui analysis, Liu Yao divination, and metaphysics consultation for overseas users.",
    url: siteUrl,
    siteName: "SY Metaphysics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SY Metaphysics | Feng Shui & Liu Yao Consultation",
    description:
      "Bilingual Feng Shui analysis, Liu Yao divination, and metaphysics consultation for overseas users.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
        <Navbar />
        {children}
        <ServiceContactSection />
        <Footer />
        <FloatingContactCTA />
        <Analytics />
      </body>
    </html>
  );
}
