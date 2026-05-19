"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/layout/user-menu";
import { Logo } from "@/components/brand/logo";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e0ddd8]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo className="transition-opacity hover:opacity-90" />

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[#6b6866] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-[#f2f0eb]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <UserMenu />
          </div>

          <button
            className="md:hidden p-2 text-[#6b6866] hover:text-[#1a1a1a] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[#e0ddd8] bg-[#faf8f5]/98 backdrop-blur-md">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-[#6b6866] hover:text-[#1a1a1a] hover:bg-[#f2f0eb] rounded-lg transition-colors"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#e0ddd8] flex flex-col gap-2 px-2">
                <UserMenu onNavigate={closeMobile} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
