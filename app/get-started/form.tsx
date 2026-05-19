"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPlan } from "@/lib/plans";

type FormData = {
  name: string;
  email: string;
  company_name: string;
  website_url: string;
  industry: string;
  target_country: string;
  target_pages: string;
  competitors: string;
  campaign_goal: string;
  notes: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  company_name: "",
  website_url: "",
  industry: "",
  target_country: "",
  target_pages: "",
  competitors: "",
  campaign_goal: "",
  notes: "",
};

function validate(data: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.website_url.trim()) errors.website_url = "Website URL is required";
  else {
    try {
      new URL(data.website_url);
    } catch {
      errors.website_url = "Enter a valid URL (include https://)";
    }
  }
  return errors;
}

export function GetStartedForm() {
  const searchParams = useSearchParams();
  const paymentCancelled = searchParams.get("payment") === "cancelled";
  const plan = getPlan(searchParams.get("plan"));
  const isFree = plan.price === 0;

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan_id: plan.id }),
      });
      const leadData = await leadRes.json();
      if (!leadRes.ok || !leadData.leadId) {
        throw new Error(leadData.error ?? "Failed to submit. Please try again.");
      }

      if (isFree) {
        window.location.href = `/thank-you?audit=1&plan=${plan.id}`;
        return;
      }

      const checkoutRes = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: leadData.leadId,
          email: form.email,
          name: form.name,
          planId: plan.id,
        }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok || !checkoutData.url) {
        throw new Error(checkoutData.error ?? "Failed to open checkout. Please try again.");
      }

      window.location.href = checkoutData.url;
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] grid-bg">
      <header className="border-b border-[#e0ddd8] bg-[#faf8f5]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Logo />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-16 lg:py-24">
        {paymentCancelled && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-4">
            <AlertCircle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#fbbf24]">Payment cancelled</p>
              <p className="text-sm text-[#6b6866] mt-1">
                No charge was made. Resubmit below to try again.
              </p>
            </div>
          </div>
        )}

        <div className="mb-10">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
            {plan.name}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
            {isFree
              ? "Request your free backlink audit."
              : `Start your ${plan.name} — ${plan.priceLabel}/mo.`}
          </h1>
          <p className="text-[#9a9793] leading-relaxed">
            {isFree
              ? "Tell us a bit about your brand and we'll send back a personalized backlink growth plan within 3 business days."
              : "Complete the form and you'll be redirected to our secure Stripe checkout. Work begins within 1–2 business days of payment."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" autoComplete="name" className={errors.name ? "border-[#ef4444]" : ""} />
              {errors.name && <p className="text-xs text-[#ef4444]">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" autoComplete="email" className={errors.email ? "border-[#ef4444]" : ""} />
              {errors.email && <p className="text-xs text-[#ef4444]">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company name</Label>
              <Input id="company_name" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL *</Label>
              <Input id="website_url" name="website_url" type="url" value={form.website_url} onChange={handleChange} placeholder="https://yourwebsite.com" className={errors.website_url ? "border-[#ef4444]" : ""} />
              {errors.website_url && <p className="text-xs text-[#ef4444]">{errors.website_url}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" name="industry" value={form.industry} onChange={handleChange} placeholder="SaaS, E-commerce, Finance..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_country">Target country</Label>
              <Input id="target_country" name="target_country" value={form.target_country} onChange={handleChange} placeholder="United States, UK, Global..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_pages">Target pages (optional)</Label>
            <Input id="target_pages" name="target_pages" value={form.target_pages} onChange={handleChange} placeholder="e.g. Homepage, /pricing, /blog/keyword" />
            <p className="text-xs text-[#b5b2ad]">Pages you&apos;d like links to point to. Specific targeting cannot be guaranteed.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="competitors">Competitor websites (optional)</Label>
            <Input id="competitors" name="competitors" value={form.competitors} onChange={handleChange} placeholder="competitor1.com, competitor2.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign_goal">Campaign goal</Label>
            <Textarea id="campaign_goal" name="campaign_goal" value={form.campaign_goal} onChange={handleChange} placeholder="What are you hoping to achieve?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes (optional)</Label>
            <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Any other context..." rows={3} />
          </div>

          <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold text-[#1a1a1a]">{plan.name}</span>
                <p className="text-xs text-[#9a9793] mt-0.5">{plan.priceSuffix}</p>
              </div>
              <div className="text-right">
                {plan.priceFrom && (
                  <span className="text-xs text-[#9a9793] block leading-none">From</span>
                )}
                <span className="text-2xl font-black text-[#1a1a1a]">{plan.priceLabel}</span>
              </div>
            </div>
            {plan.features.slice(0, 5).map((f) => (
              <div key={f} className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-xs text-[#6b6866]">{f}</span>
              </div>
            ))}
          </div>

          {status === "error" && (
            <div className="flex items-start gap-3 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 p-4">
              <AlertCircle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
              <p className="text-sm text-[#fca5a5]">{errorMessage}</p>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full group" disabled={status === "loading"}>
            {status === "loading" ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Saving details...</>
            ) : isFree ? (
              <>Request Free Audit<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
            ) : (
              <>Continue to Secure Checkout<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
            )}
          </Button>

          <p className="text-xs text-[#b5b2ad] text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#f97316] hover:underline">Terms</Link>{" "}and{" "}
            <Link href="/privacy-policy" className="text-[#f97316] hover:underline">Privacy Policy</Link>.
            No specific placements are guaranteed.
          </p>
        </form>
      </main>
    </div>
  );
}
