import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plansByTrack } from "@/lib/plans";

const plans = plansByTrack("pr");

export function PricingSection() {
  return (
    <section className="py-24 lg:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Plans for every stage of growth.
          </h2>
          <p className="text-[#9a9793] text-lg leading-relaxed">
            Start with a free audit or jump straight into a structured PR campaign.
          </p>
        </div>

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

        <p className="mt-10 text-xs text-[#b5b2ad] text-center max-w-2xl mx-auto leading-relaxed">
          Results depend on editorial decisions made by third-party publications.
          No specific placements or publications are guaranteed.
        </p>
      </div>
    </section>
  );
}
