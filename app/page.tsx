import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Problem } from "@/components/home/problem";
import { Solution } from "@/components/home/solution";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { WhatWeDo } from "@/components/home/what-we-do";
import { HowItWorks } from "@/components/home/how-it-works";
import { PricingSection } from "@/components/home/pricing-section";
import { Workflow } from "@/components/home/workflow";
import { FaqSection, homeFaqs } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Digital PR Starter Campaign | Authority Link Building",
  description:
    "Start a $500 digital PR campaign with outreach tracking, backlink reporting, and a client dashboard. Structured earned media acquisition.",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Digital PR Starter Campaign | MilkyBacklinks",
  description:
    "Start a $500 digital PR campaign with outreach tracking, backlink reporting, and a client dashboard. Structured earned media acquisition.",
  url: SITE_URL,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <DashboardPreview />
        <WhatWeDo />
        <HowItWorks />
        <PricingSection />
        <Workflow />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
