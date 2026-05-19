import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#e0ddd8] bg-[#f2f0eb]">
          {/* Background gradient */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 120%, rgba(99,102,241,0.25) 0%, transparent 60%)",
            }}
          />
          {/* Grid */}
          <div
            aria-hidden
            className="absolute inset-0 grid-bg opacity-40 pointer-events-none"
          />

          <div className="relative py-20 px-8 sm:px-16 text-center">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-6">
              Ready to start?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight max-w-3xl mx-auto">
              Launch your digital PR campaign today.
            </h2>
            <p className="text-[#9a9793] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              One fixed price. Full campaign visibility. No surprise invoices.
              Start a structured digital PR outreach campaign for $500.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-started">
                <Button size="xl" className="group w-full sm:w-auto">
                  Start Your $500 Campaign
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  View Pricing Details
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xs text-[#b5b2ad]">
              Results depend on editorial decisions made by third-party publications.
              No specific placements are guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
