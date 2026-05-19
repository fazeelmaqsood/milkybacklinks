import Link from "next/link";
import { LayoutDashboard, Users, Activity, Link2, FileText, Zap } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";
import { SignOutButton } from "@/components/auth/sign-out-button";

const adminNav = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
  { href: "/admin/campaigns", icon: Activity, label: "Campaigns" },
  { href: "/admin/backlinks", icon: Link2, label: "Backlinks" },
  { href: "/admin/reports", icon: FileText, label: "Reports" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#e0ddd8] bg-[#f2f0eb] fixed h-full">
        <div className="p-6 border-b border-[#e0ddd8]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#1a1a1a] text-sm">
              Milky<span className="text-[#f97316]">Backlinks</span>
            </span>
          </Link>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-[#ef4444]/20 border border-[#ef4444]/30 px-2.5 py-0.5 text-[10px] font-semibold text-[#f87171]">
              Admin
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-semibold text-[#b5b2ad] uppercase tracking-wider px-3 mb-3">
            Management
          </p>
          {adminNav.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#9a9793] hover:text-[#1a1a1a] hover:bg-[#f2f0eb] transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#e0ddd8]">
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 md:ml-64">
        <header className="md:hidden border-b border-[#e0ddd8] bg-[#f2f0eb] px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-[#1a1a1a] text-sm">Admin</span>
          <div className="flex items-center gap-3">
            {adminNav.map(({ href, icon: Icon }) => (
              <Link key={href} href={href} className="text-[#9a9793] hover:text-[#1a1a1a]">
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
