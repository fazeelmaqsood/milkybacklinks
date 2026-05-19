import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Digital PR campaign research",
    desc: "We research your brand, industry, and competitive landscape to identify the strongest PR angles for outreach.",
  },
  {
    title: "PR angle creation",
    desc: "Every campaign starts with a story. We develop narrative angles that give journalists a reason to cover your brand.",
  },
  {
    title: "Structured outreach tracking",
    desc: "Outreach activity is tracked and documented — you can see the stage your campaign is in at any time from your dashboard.",
  },
  {
    title: "Delivered link and media mention reporting",
    desc: "When a link or mention is placed, it's logged in your dashboard with publication details, link type, and live URL.",
  },
  {
    title: "Client dashboard visibility",
    desc: "Your campaign dashboard shows real-time status, progress stages, delivered backlinks, and campaign notes.",
  },
  {
    title: "Admin-reviewed campaign updates",
    desc: "Every update in your dashboard is reviewed and entered by our team — not auto-generated or fabricated.",
  },
];

export function Solution() {
  return (
    <section className="py-24 lg:py-32 bg-[#f2f0eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              The Solution
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Earned media outreach,{" "}
              <span className="gradient-text">fully transparent</span>.
            </h2>
            <p className="text-[#9a9793] text-lg leading-relaxed mb-8">
              MilkyBacklinks is built around a simple idea: you should be able
              to see exactly what's happening with your campaign at every stage.
              No guesswork. No vague status updates.
            </p>
            <div className="rounded-xl border border-[#f97316]/30 bg-[#f97316]/5 p-5">
              <p className="text-sm text-[#6b6866] leading-relaxed italic">
                "Built to support earned media and backlink acquisition through
                structured digital PR outreach — with a client dashboard that
                makes every step of the process visible."
              </p>
            </div>
          </div>

          {/* Right: feature list */}
          <div className="space-y-4">
            {solutions.map((s, i) => (
              <div
                key={s.title}
                className="flex items-start gap-4 rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-5 hover:border-[#f97316]/40 transition-colors"
              >
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#f97316]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1.5 text-sm">{s.title}</h3>
                  <p className="text-sm text-[#9a9793] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
