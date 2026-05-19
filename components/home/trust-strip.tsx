import { Shield, BarChart3, FileText, Search, Link2, Lock } from "lucide-react";

const badges = [
  { icon: Search, label: "Journalist Outreach" },
  { icon: BarChart3, label: "Campaign Tracking" },
  { icon: FileText, label: "Transparent Reporting" },
  { icon: Shield, label: "Manual Quality Review" },
  { icon: Link2, label: "Backlink Tracking" },
  { icon: Lock, label: "Secure Payments" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[#e0ddd8] bg-[#f2f0eb] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium text-[#b5b2ad] uppercase tracking-widest mb-6">
          What every campaign includes
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-[#e0ddd8] bg-[#f2f0eb] px-4 py-2 text-sm text-[#6b6866]"
            >
              <Icon className="w-3.5 h-3.5 text-[#f97316]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
