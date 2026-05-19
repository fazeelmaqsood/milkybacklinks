import { AlertTriangle } from "lucide-react";

const problems = [
  {
    title: "Spammy links damage trust",
    desc: "Low-quality backlinks from link farms and PBNs can actively harm your domain's credibility with search engines and readers alike.",
  },
  {
    title: "Generic outreach wastes time",
    desc: "Blasting hundreds of journalists with untargeted pitches creates noise, not results. Relevance and precision matter.",
  },
  {
    title: "Most agencies hide their process",
    desc: "You pay the invoice, wait weeks, and receive a PDF with links. No visibility into what happened in between.",
  },
  {
    title: "DR alone tells an incomplete story",
    desc: "A high Domain Rating doesn't mean a link is relevant, earned, or editorially placed. Quality context matters more than raw metrics.",
  },
  {
    title: "Clients deserve transparency",
    desc: "Without real-time updates, clients are left guessing whether any meaningful progress is being made on their campaign.",
  },
];

export function Problem() {
  return (
    <section className="py-24 lg:py-32" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Link building has a transparency problem.
          </h2>
          <p className="text-[#9a9793] text-lg leading-relaxed">
            The industry is filled with hollow promises, opaque processes, and
            tactics that prioritize quantity over earned, editorially relevant coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 hover:border-[#f97316]/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2 text-sm">{p.title}</h3>
                  <p className="text-sm text-[#9a9793] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
