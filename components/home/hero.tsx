import Link from "next/link";
import { ArrowRight, ChevronRight, Shield, BarChart3, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #faf8f5)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e0ddd8] bg-[#f2f0eb] px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs font-medium text-[#6b6866]">
              Digital PR Starter Campaign — $500 one-time
            </span>
            <ChevronRight className="w-3 h-3 text-[#9a9793]" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-6 leading-[1.05]">
            Digital PR campaigns{" "}
            <span className="gradient-text">with full visibility</span>
            <br />
            from day one.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#9a9793] max-w-2xl mx-auto mb-10 leading-relaxed">
            Submit your brand, start a $500 campaign, and track outreach progress,
            media mentions, and delivered links through a clean client dashboard.
            No guesswork. No black-box reporting.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/get-started">
              <Button size="xl" className="w-full sm:w-auto group">
                Start Your $500 Campaign
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Dashboard preview — dark card floating on cream, Mistral-style */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/20 to-[#fb923c]/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-[#1f1f1f] bg-[#111111] overflow-hidden shadow-2xl">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a2a] bg-[#0d0d0d]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b]/70" />
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
                </div>
                <div className="flex-1 mx-4 h-5 rounded bg-[#2a2a2a]/60 flex items-center px-3">
                  <span className="text-[10px] text-[#525252]">app.milkybacklinks.com/dashboard</span>
                </div>
              </div>

              {/* Dashboard mock content */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: BarChart3, label: "Campaign Status", value: "Outreach Active", color: "#f97316", sub: "Since Jan 12, 2025" },
                  { icon: Link2, label: "Links Delivered", value: "3 Verified", color: "#22c55e", sub: "Last: TechCrunch mention" },
                  { icon: Shield, label: "Progress Stage", value: "PR Outreach", color: "#fb923c", sub: "Stage 5 of 8" },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${card.color}20` }}>
                        <card.icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                      </div>
                      <span className="text-xs text-[#737373]">{card.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">{card.value}</p>
                    <p className="text-[11px] text-[#525252]">{card.sub}</p>
                  </div>
                ))}

                {/* Progress bar */}
                <div className="sm:col-span-3 rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-4">
                  <p className="text-xs font-medium text-[#a3a3a3] mb-3">Campaign Progress</p>
                  <div className="flex gap-1.5">
                    {["Onboarding", "Payment", "Research", "PR Angles", "Outreach", "Review", "Report", "Complete"].map((stage, i) => (
                      <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`h-1.5 w-full rounded-full ${i < 5 ? "bg-gradient-to-r from-[#f97316] to-[#fb923c]" : "bg-[#2a2a2a]"}`} />
                        <span className="text-[9px] text-[#525252] hidden sm:block truncate w-full text-center">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
