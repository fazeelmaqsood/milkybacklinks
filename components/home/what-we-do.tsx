import { Search, Lightbulb, Send, Eye, Link2, PieChart } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Campaign Research",
    desc: "We analyse your brand, niche, and existing online presence to build a targeted outreach foundation tailored to your goals.",
    step: "01",
  },
  {
    icon: Lightbulb,
    title: "PR Angle Development",
    desc: "We create compelling story angles that give journalists a genuine reason to feature your brand — not just a pitch email.",
    step: "02",
  },
  {
    icon: Send,
    title: "Outreach Setup & Tracking",
    desc: "We manage journalist outreach and track every pitch. Your dashboard reflects the current outreach stage in real time.",
    step: "03",
  },
  {
    icon: Eye,
    title: "Media Mention Review",
    desc: "Every placement is manually reviewed before it's logged in your dashboard. We only log what's real and verifiable.",
    step: "04",
  },
  {
    icon: Link2,
    title: "Backlink Tracking",
    desc: "Delivered links are documented with publication name, live URL, anchor text, link type, and domain metrics.",
    step: "05",
  },
  {
    icon: PieChart,
    title: "Reporting",
    desc: "Campaign reports summarise outreach activity, media mentions, delivered links, and next steps — with no fluff.",
    step: "06",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-24 lg:py-32 bg-[#f2f0eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            What we do <span className="gradient-text">for your campaign</span>.
          </h2>
          <p className="text-[#9a9793] text-lg leading-relaxed">
            Every step is structured, documented, and visible in your client dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, step }) => (
            <div
              key={title}
              className="relative rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 hover:border-[#f97316]/40 hover:bg-[#ebe8e2] transition-all duration-200 overflow-hidden group"
            >
              <div className="absolute top-4 right-4 text-5xl font-black text-[#2a2a2a]/40 select-none group-hover:text-[#f97316]/10 transition-colors">
                {step}
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#f97316]" />
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{title}</h3>
                <p className="text-sm text-[#9a9793] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
