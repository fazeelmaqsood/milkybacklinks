"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Shield } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function initials(name: string | undefined, email: string | undefined): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }
  return (email?.slice(0, 2) ?? "U").toUpperCase();
}

export function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      setIsAdmin(false);
      return;
    }
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setIsAdmin(data?.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, [session?.user?.id]);

  const handleSignOut = async () => {
    onNavigate?.();
    setMenuOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="h-9 w-20 rounded-lg bg-[#e0ddd8]/50 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <>
        <Link href="/login" onClick={onNavigate}>
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </Link>
        <Link href="/get-started" onClick={onNavigate}>
          <Button size="sm">Start Campaign</Button>
        </Link>
      </>
    );
  }

  const user = session.user;
  const label = user.name ?? user.email ?? "Account";

  return (
    <div className="relative flex items-center gap-3">
      <Link href="/get-started" onClick={onNavigate}>
        <Button size="sm" variant="outline" className="hidden sm:inline-flex">
          Start Campaign
        </Button>
      </Link>

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[#e0ddd8] bg-[#f2f0eb] pl-1 pr-3 py-1 hover:border-[#f97316]/40 transition-colors"
        aria-label="Account menu"
        aria-expanded={menuOpen}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] to-[#fb923c] text-xs font-bold text-white">
          {initials(user.name, user.email)}
        </span>
        <span className="hidden sm:block text-sm font-medium text-[#1a1a1a] max-w-[120px] truncate">
          {label.split(" ")[0]}
        </span>
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-[#e0ddd8] bg-[#faf8f5] py-1 shadow-lg">
            <p className="px-3 py-2 text-xs text-[#9a9793] truncate border-b border-[#e0ddd8]">
              {user.email}
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#f2f0eb]"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
            >
              <LayoutDashboard className="w-4 h-4 text-[#f97316]" />
              Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#f2f0eb]"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate?.();
                }}
              >
                <Shield className="w-4 h-4 text-[#f97316]" />
                Admin
              </Link>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#f2f0eb]"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
