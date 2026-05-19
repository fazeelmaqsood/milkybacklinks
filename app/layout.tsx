import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital PR Starter Campaign | MilkyBacklinks",
    template: "%s | MilkyBacklinks",
  },
  description:
    "Start a $500 digital PR campaign with outreach tracking, backlink reporting, and a transparent client dashboard. Earned media acquisition through structured PR outreach.",
  keywords: [
    "digital PR",
    "link building",
    "backlink campaign",
    "PR outreach",
    "earned media",
    "SEO",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com",
    siteName: "MilkyBacklinks",
    title: "Digital PR Starter Campaign | MilkyBacklinks",
    description:
      "Start a $500 digital PR campaign with outreach tracking, backlink reporting, and a transparent client dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital PR Starter Campaign | MilkyBacklinks",
    description:
      "Start a $500 digital PR campaign with outreach tracking, backlink reporting, and a transparent client dashboard.",
  },
  robots: { index: true, follow: true },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MilkyBacklinks",
  url: SITE_URL,
  description:
    "Digital PR and link building agency. Earned editorial backlinks through journalist outreach, with transparent client dashboard reporting.",
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MilkyBacklinks",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#1a1a1a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
