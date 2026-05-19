import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "Submit campaign details",
    desc: "Complete the onboarding form with your brand, website, target audience, and campaign goals. Takes about 5 minutes.",
  },
  {
    num: "02",
    title: "Pay $500 securely",
    desc: "Complete your one-time $500 payment via Stripe's secure checkout. No hidden fees, no monthly commitments.",
  },
  {
    num: "03",
    title: "Campaign research starts",
    desc: "Our team begins researching your brand's PR angle and relevant media landscape within your niche.",
  },
  {
    num: "04",
    title: "Outreach tracking begins",
    desc: "Journalist outreach is tracked. Your dashboard updates to reflect the current stage of your campaign.",
  },
  {
    num: "05",
    title: "Delivered links are reviewed",
    desc: "Every media mention and backlink placement is manually reviewed and logged with full documentation.",
  },
  {
    num: "06",
    title: "Reports are shared",
    desc: "You receive a campaign report summarising activity, delivered links, and next-step recommendations.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            Step by Step
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            How it works.
          </h2>
          <p className="text-[#9a9793] text-lg leading-relaxed">
            From form submission to your first campaign report — every step is clear and tracked.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2a2a2a] to-transparent -translate-x-px" />

          <div className="space-y-6 lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  i % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 mb-4 lg:mb-0 hover:border-[#f97316]/40 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center shrink-0 shadow-lg shadow-[#f97316]/20">
                          <span className="text-white font-bold text-sm">{step.num}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a] mb-2">{step.title}</h3>
                          <p className="text-sm text-[#9a9793] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 mb-4 lg:mb-0 hover:border-[#f97316]/40 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fb923c] to-[#f97316] flex items-center justify-center shrink-0 shadow-lg shadow-[#fb923c]/20">
                          <span className="text-white font-bold text-sm">{step.num}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a] mb-2">{step.title}</h3>
                          <p className="text-sm text-[#9a9793] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/get-started">
            <Button size="lg" className="group">
              Start Your $500 Campaign
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
