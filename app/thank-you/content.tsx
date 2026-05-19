"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlan } from "@/lib/plans";

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const isAudit = searchParams.get("audit") === "1";
  const plan = getPlan(searchParams.get("plan"));

  const heading = isAudit
    ? "Your audit request has been received."
    : `Your ${plan.name} is confirmed.`;

  const subheading = isAudit
    ? "We'll review your site and send back a personalized backlink growth plan within 3 business days."
    : "Once payment is processed, your dashboard will activate and show current status and updates.";

  const steps = isAudit
    ? [
        { icon: Mail, title: "Check your email", desc: "A confirmation has been sent with the details we received." },
        { icon: CheckCircle2, title: "Audit in progress", desc: "Our team reviews your site, niche, and competitors." },
        { icon: ArrowRight, title: "Plan delivered", desc: "You'll receive your personalized growth plan by email within 3 business days." },
      ]
    : [
        { icon: Mail, title: "Check your email", desc: "A confirmation email has been sent with your order details." },
        { icon: CheckCircle2, title: "Work begins", desc: "Our team starts within 1–2 business days." },
        { icon: ArrowRight, title: "Track from your dashboard", desc: "Log in to view real-time status, progress, and delivered links." },
      ];

  return (
    <div className="max-w-lg w-full text-center">
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#22c55e]" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">{heading}</h1>
      <p className="text-[#9a9793] text-lg leading-relaxed mb-8">{subheading}</p>

      <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6 text-left mb-8">
        <p className="text-xs font-semibold text-[#f97316] uppercase tracking-wider mb-4">
          What happens next
        </p>
        <div className="space-y-4">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#f97316]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">{title}</p>
                <p className="text-xs text-[#9a9793] mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!isAudit && (
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto group">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
        <Link href="/">
          <Button size="lg" variant={isAudit ? "default" : "outline"} className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-xs text-[#b5b2ad]">
        Questions?{" "}
        <a href="mailto:hello@milkybacklinks.com" className="text-[#f97316] hover:underline">
          Contact our team
        </a>
      </p>
    </div>
  );
}
