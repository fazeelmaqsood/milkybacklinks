import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { plansByTrack } from "@/lib/plans";

const plans = plansByTrack("pr");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

const pricingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing | MilkyBacklinks",
  description:
    "Plans for every stage of growth — free backlink audits, niche-relevant links, and editorial PR placements.",
  url: `${SITE_URL}/pricing`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
    ],
  },
};

const pricingOffersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MilkyBacklinks Pricing Plans",
  url: `${SITE_URL}/pricing`,
  itemListElement: plans.map((plan, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Offer",
      name: plan.name,
      description: plan.tagline,
      url: `${SITE_URL}/get-started?plan=${plan.id}`,
      priceCurrency: "USD",
      price: plan.price,
      ...(plan.price > 0 && {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.price,
          priceCurrency: "USD",
          billingDuration: "P1M",
          billingIncrement: 1,
          unitText: "month",
        },
      }),
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: plan.name,
        description: plan.tagline,
        provider: { "@type": "Organization", name: "MilkyBacklinks", url: SITE_URL },
      },
    },
  })),
};

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans for every stage of growth — free backlink audits, niche-relevant links, and editorial PR placements.",
};

const notIncluded = [
  "Guaranteed specific publications",
  "Guest post purchases",
  "Link insertions on existing content",
  "PBN or link farm placements",
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingOffersSchema) }}
      />
      <Nav />
      <main className="pt-24">
        <section className="py-20 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6">
              Plans for every stage of growth.
            </h1>
            <p className="text-[#9a9793] text-lg max-w-xl mx-auto">
              Start with a free audit, a single backlink, or scale with a full PR campaign.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => {
                const isHighlighted = plan.highlighted;
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 ${
                      isHighlighted
                        ? "border-[#f97316]/60 bg-[#f2f0eb] shadow-2xl shadow-[#f97316]/10 lg:scale-[1.03]"
                        : "border-[#e0ddd8] bg-[#faf8f5] hover:border-[#f97316]/30"
                    }`}
                  >
                    {isHighlighted && (
                      <div className="h-1 w-full bg-gradient-to-r from-[#f97316] to-[#fb923c]" />
                    )}

                    <div className="flex-1 p-6 flex flex-col">
                      {isHighlighted && (
                        <span className="self-start inline-flex items-center rounded-full bg-[#f97316]/15 border border-[#f97316]/30 px-2.5 py-0.5 text-[10px] font-semibold text-[#f97316] uppercase tracking-wider mb-4">
                          Most Popular
                        </span>
                      )}

                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{plan.name}</h3>
                      <p className="text-xs text-[#9a9793] mb-6 min-h-[2.5rem]">{plan.tagline}</p>

                      <div className="flex items-baseline gap-1.5 mb-1">
                        {plan.priceFrom && (
                          <span className="text-sm font-medium text-[#9a9793]">From</span>
                        )}
                        <span className="text-4xl font-black text-[#1a1a1a]">{plan.priceLabel}</span>
                      </div>
                      <p className="text-xs text-[#b5b2ad] mb-6">{plan.priceSuffix}</p>

                      <ul className="space-y-2.5 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                            <span className="text-xs text-[#6b6866] leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href={`/get-started?plan=${plan.id}`}>
                        <Button
                          size="sm"
                          variant={isHighlighted ? "default" : "outline"}
                          className="w-full group"
                        >
                          {plan.cta}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 max-w-2xl mx-auto rounded-2xl border border-[#e0ddd8] bg-[#f2f0eb] p-8">
              <p className="text-xs font-semibold text-[#ef4444] uppercase tracking-wider mb-4">
                Not included in any plan
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full border border-[#ef4444]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-px bg-[#ef4444]" />
                    </span>
                    <span className="text-sm text-[#6b6866]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 text-xs text-[#b5b2ad] text-center max-w-2xl mx-auto leading-relaxed">
              Designed to support earned media and backlink acquisition through structured
              outreach. Results depend on editorial decisions made by third-party publications.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
