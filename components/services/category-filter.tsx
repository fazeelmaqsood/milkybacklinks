"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Newspaper,
  PenLine,
  Link2,
  Languages,
  Image as ImageIcon,
  Briefcase,
  MapPin,
  Sparkles,
  Globe,
  Megaphone,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Newspaper,
  PenLine,
  Link2,
  Languages,
  Image: ImageIcon,
  Briefcase,
  MapPin,
  Zap,
};

export type ServiceCategory = {
  name: string;
  icon: keyof typeof iconMap;
  description: string;
  fromPrice: string;
  turnaround: string;
  popular?: boolean;
  href: string;
  category: string;
};

const CATEGORIES: { label: string; icon: LucideIcon }[] = [
  { label: "All Categories", icon: Layers },
  { label: "Link Building", icon: Link2 },
  { label: "Digital PR", icon: Megaphone },
  { label: "Local SEO", icon: MapPin },
  { label: "Multilingual", icon: Globe },
  { label: "B2B & SaaS", icon: Briefcase },
];

export function CategoryFilter({ services }: { services: ServiceCategory[] }) {
  const [active, setActive] = useState("All Categories");

  const counts = useMemo(() => {
    const map: Record<string, number> = { "All Categories": services.length };
    for (const s of services) {
      map[s.category] = (map[s.category] ?? 0) + 1;
    }
    return map;
  }, [services]);

  const filtered = useMemo(
    () => (active === "All Categories" ? services : services.filter((s) => s.category === active)),
    [active, services]
  );

  return (
    <>
      <div className="mb-10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(({ label, icon: CatIcon }) => {
            const isActive = active === label;
            const count = counts[label] ?? 0;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={cn(
                  "group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shrink-0",
                  isActive
                    ? "bg-[#1a1a1a] text-white shadow-lg shadow-[#1a1a1a]/15 ring-1 ring-[#1a1a1a]"
                    : "bg-[#faf8f5] text-[#6b6866] border border-[#e0ddd8] hover:border-[#1a1a1a]/30 hover:text-[#1a1a1a] hover:bg-[#f2f0eb]"
                )}
              >
                <CatIcon
                  className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    isActive ? "text-[#f97316]" : "text-[#9a9793] group-hover:text-[#f97316]"
                  )}
                />
                {label}
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full text-[10px] font-semibold min-w-[20px] h-5 px-1.5 transition-colors",
                    isActive
                      ? "bg-[#f97316] text-white"
                      : "bg-[#e8e5e0] text-[#6b6866] group-hover:bg-[#d8d4cd]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => {
          const Icon = iconMap[s.icon] ?? Link2;
          return (
            <Link
              key={s.name}
              href={s.href}
              className="group relative flex flex-col rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden hover:border-[#f97316]/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#f97316]/10"
            >
              {s.popular && (
                <span className="absolute top-4 right-4 z-10 inline-flex items-center rounded-full bg-[#f97316] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="aspect-[16/10] bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000000] flex items-center justify-center relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(249,115,22,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.08) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative w-16 h-16 rounded-2xl bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f97316]/25 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#f97316]" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-white text-lg mb-1.5 group-hover:text-[#fdba74] transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-[#9a9793] leading-relaxed mb-4 flex-1">
                  {s.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                  <span className="text-sm text-[#a3a3a3]">
                    from <span className="text-white font-semibold">{s.fromPrice}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#f97316]">
                    <Zap className="w-3 h-3 fill-[#f97316]" />
                    {s.turnaround}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-[#9a9793] py-12">
          No services in this category yet — try another tab.
        </p>
      )}
    </>
  );
}
