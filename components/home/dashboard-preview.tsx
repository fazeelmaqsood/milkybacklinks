import { Activity, Link2, FileText, MessageSquare, Clock, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Activity,
    title: "Campaign Status",
    value: "Outreach In Progress",
    color: "#f97316",
    detail: "Stage 5 of 8 · Updated 2 days ago",
  },
  {
    icon: TrendingUp,
    title: "Outreach Progress",
    value: "42 Pitches Sent",
    color: "#fb923c",
    detail: "Targeting relevant tech & business media",
  },
  {
    icon: Link2,
    title: "Links Delivered",
    value: "3 Verified",
    color: "#22c55e",
    detail: "2 dofollow · 1 editorial mention",
  },
  {
    icon: FileText,
    title: "Reports",
    value: "1 Report Ready",
    color: "#06b6d4",
    detail: "Month 1 campaign summary available",
  },
  {
    icon: MessageSquare,
    title: "Admin Notes",
    value: "2 Updates",
    color: "#f59e0b",
    detail: "Last note added Jan 28, 2025",
  },
  {
    icon: Clock,
    title: "Campaign Timeline",
    value: "Week 4 of 8",
    color: "#737373",
    detail: "On track · Est. completion Feb 28",
  },
];

export function DashboardPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            Campaign Visibility
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Built for{" "}
            <span className="gradient-text">campaign visibility</span>.
          </h2>
          <p className="text-[#9a9793] text-lg leading-relaxed">
            Your client dashboard surfaces every meaningful datapoint — from
            campaign stage to delivered links — in one clean view.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-b from-[#f97316]/10 to-[#fb923c]/10 rounded-3xl blur-2xl pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(({ icon: Icon, title, value, color, detail }) => (
              <div
                key={title}
                className="group rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 hover:border-[#f97316]/50 hover:bg-[#ebe8e2] transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <p className="text-xs text-[#9a9793] mb-1">{title}</p>
                <p className="text-lg font-bold text-[#1a1a1a] mb-2">{value}</p>
                <p className="text-xs text-[#b5b2ad]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
