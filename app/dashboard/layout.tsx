import Link from "next/link";
import { LayoutDashboard, Link2, FileText } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { requireClient } from "@/lib/auth-helpers";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireClient();

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#e0ddd8] bg-[#f2f0eb] fixed h-full">
        <div className="p-6 border-b border-[#e0ddd8]">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-semibold text-[#b5b2ad] uppercase tracking-wider px-3 mb-3">
            Campaign
          </p>
          {[
            { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
            { href: "/dashboard#backlinks", icon: Link2, label: "Backlinks" },
            { href: "/dashboard#reports", icon: FileText, label: "Reports" },
          ].map(({ href, icon: Icon, label }) => (
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

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile nav */}
        <header className="md:hidden border-b border-[#e0ddd8] bg-[#f2f0eb] px-4 h-14 flex items-center justify-between">
          <Logo size="sm" textClassName="text-sm" />
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-[#9a9793] hover:text-[#1a1a1a]">
              <LayoutDashboard className="w-4 h-4" />
            </Link>
            <SignOutButton
              showLabel={false}
              className="text-[#9a9793] hover:text-[#1a1a1a] p-0"
            />
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
