import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/services", label: "Services" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ],
  Platform: [
    { href: "/get-started", label: "Start a Campaign" },
    { href: "/login", label: "Client Login" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
  Company: [
    { href: "/#services", label: "About" },
    { href: "mailto:hello@milkybacklinks.com", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#e0ddd8] bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[#1a1a1a] text-lg tracking-tight">
                Milky<span className="text-[#f97316]">Backlinks</span>
              </span>
            </Link>
            <p className="text-sm text-[#9a9793] leading-relaxed max-w-[200px]">
              Structured digital PR campaigns with transparent tracking and reporting.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9a9793] hover:text-[#1a1a1a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#e0ddd8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9a9793]">
            © {new Date().getFullYear()} MilkyBacklinks. All rights reserved.
          </p>
          <p className="text-xs text-[#b5b2ad]">
            Built for earned media and backlink acquisition through digital PR outreach.
          </p>
        </div>
      </div>
    </footer>
  );
}
