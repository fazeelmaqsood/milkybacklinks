import { CheckCircle2, Circle } from "lucide-react";

const stages = [
  {
    label: "Brand submitted",
    desc: "Onboarding form received. Brand details, goals, and website recorded.",
    done: true,
  },
  {
    label: "Campaign angle selected",
    desc: "PR research complete. Strongest story angles identified for outreach.",
    done: true,
  },
  {
    label: "Outreach list prepared",
    desc: "Relevant journalists and publications shortlisted based on niche and audience.",
    done: true,
  },
  {
    label: "Journalist pitches tracked",
    desc: "Outreach begins. Each pitch is tracked in the campaign system.",
    done: true,
  },
  {
    label: "Live mention reviewed",
    desc: "A placement has gone live. It is reviewed for accuracy before being logged.",
    done: false,
  },
  {
    label: "Report created",
    desc: "Campaign summary report created with links, metrics, and next steps.",
    done: false,
  },
];

export function Workflow() {
  return (
    <section className="py-24 lg:py-32 bg-[#f2f0eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              Sample Workflow
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              See what a real campaign looks like.
            </h2>
            <p className="text-[#9a9793] text-lg leading-relaxed mb-6">
              This is an example of how a campaign progresses from submission to
              report delivery. No fabricated case studies — just the real workflow.
            </p>
            <p className="text-sm text-[#b5b2ad] rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-4 leading-relaxed">
              Results vary per campaign. This sample workflow shows the process,
              not a guarantee of specific outcomes. Actual media placements depend
              on editorial decisions made by third-party publications.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#f97316] via-[#f97316]/50 to-[#2a2a2a]" />

            <div className="space-y-4">
              {stages.map((stage) => (
                <div key={stage.label} className="flex items-start gap-4 relative">
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      stage.done
                        ? "bg-[#f97316] shadow-lg shadow-[#f97316]/30"
                        : "bg-[#f2f0eb] border border-[#e0ddd8]"
                    }`}
                  >
                    {stage.done ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#b5b2ad]" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-xl border p-4 transition-colors ${
                      stage.done
                        ? "border-[#f97316]/30 bg-[#f97316]/5"
                        : "border-[#e0ddd8] bg-[#f2f0eb]"
                    }`}
                  >
                    <p
                      className={`font-semibold text-sm mb-1 ${
                        stage.done ? "text-[#1a1a1a]" : "text-[#9a9793]"
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="text-xs text-[#b5b2ad] leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
