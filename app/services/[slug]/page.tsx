import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Zap,
  Newspaper,
  PenLine,
  Link2,
  Languages,
  Image as ImageIcon,
  Briefcase,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, getServiceBySlug, type IconName } from "@/lib/services-data";
import { getPlan } from "@/lib/plans";

const iconMap: Record<IconName, LucideIcon> = {
  Newspaper,
  PenLine,
  Link2,
  Languages,
  Image: ImageIcon,
  Briefcase,
  MapPin,
  Zap,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const plan = getPlan(service.recommendedPlan);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "MilkyBacklinks",
      url: SITE_URL,
    },
    serviceType: service.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: plan.price,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: "USD",
        billingDuration: "P1M",
        billingIncrement: 1,
        unitText: "month",
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/get-started?plan=${service.recommendedPlan}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-[#9a9793] hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            All Services
          </Link>
        </div>

        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center rounded-full bg-[#f97316]/10 border border-[#f97316]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#f97316] uppercase tracking-wider">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="inline-flex items-center rounded-full bg-[#f97316] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-5 leading-tight tracking-tight">
                  {service.name}
                </h1>
                <p className="text-lg text-[#6b6866] leading-relaxed mb-8">
                  {service.heroSubheadline}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div>
                    <p className="text-[10px] text-[#9a9793] uppercase tracking-wider mb-1">From</p>
                    <p className="text-3xl font-black text-[#1a1a1a]">{service.fromPrice}</p>
                  </div>
                  <div className="h-10 w-px bg-[#e0ddd8]" />
                  <div>
                    <p className="text-[10px] text-[#9a9793] uppercase tracking-wider mb-1">Turnaround</p>
                    <p className="text-lg font-semibold text-[#1a1a1a] inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#f97316]" />
                      {service.turnaround}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/get-started?plan=${service.recommendedPlan}`}>
                    <Button size="lg" className="w-full sm:w-auto group">
                      Order Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/get-started?plan=starter-audit">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Get a Free Audit
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/15 to-[#fb923c]/15 rounded-3xl blur-2xl" />
                <div className="relative aspect-square max-w-md mx-auto rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000000] flex items-center justify-center overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="relative w-32 h-32 rounded-3xl bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-[#f97316]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                What's Included
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                Everything that ships with {service.name}.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.whatYouGet.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[#e0ddd8] bg-[#faf8f5] p-5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#1a1a1a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                How It Works
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                Our process for {service.name}.
              </h2>
              <p className="text-[#6b6866]">
                Every step is documented in your campaign dashboard so you always know what's
                happening behind the scenes.
              </p>
            </div>

            <div className="space-y-5">
              {service.howItWorks.map((step, i) => (
                <div
                  key={step.title}
                  className="flex items-start gap-5 rounded-2xl border border-[#e0ddd8] bg-[#faf8f5] p-6 hover:border-[#f97316]/30 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center text-white font-bold shadow-lg shadow-[#f97316]/20">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1.5">{step.title}</h3>
                    <p className="text-sm text-[#6b6866] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                Why This Service
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                What you get out of it.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {service.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-[#e0ddd8] bg-[#faf8f5] p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">{b.title}</h3>
                  <p className="text-sm text-[#6b6866] leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                  Who It's For
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-5 leading-tight">
                  Built for brands that need real, verifiable links.
                </h2>
                <p className="text-[#6b6866] leading-relaxed">
                  {service.name} works particularly well for the following types of teams.
                  If you're unsure whether this fits your situation, start with a free audit
                  and we'll recommend the right service.
                </p>
              </div>
              <div className="rounded-2xl border border-[#e0ddd8] bg-[#f2f0eb] p-7">
                <ul className="space-y-4">
                  {service.whoFor.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1a1a1a]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended plan callout */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#f97316]/40 bg-[#faf8f5] p-8 sm:p-12 shadow-xl shadow-[#f97316]/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                    Recommended Plan
                  </p>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#6b6866] mb-4">{plan.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#1a1a1a]">{plan.priceLabel}</span>
                    {plan.price > 0 && (
                      <span className="text-sm text-[#9a9793]">/ month</span>
                    )}
                  </div>
                </div>
                <Link href={`/get-started?plan=${service.recommendedPlan}`}>
                  <Button size="lg" className="group whitespace-nowrap">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                Questions about {service.name}.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="rounded-xl border border-[#e0ddd8] bg-[#faf8f5] px-5"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#1a1a1a] hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#6b6866] leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related services */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                More Services
              </p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">
                Other services you might consider.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => {
                const RIcon = iconMap[r.icon];
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group relative flex flex-col rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden hover:border-[#f97316]/60 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000000] flex items-center justify-center relative">
                      <div className="w-14 h-14 rounded-2xl bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <RIcon className="w-6 h-6 text-[#f97316]" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-1.5 group-hover:text-[#fdba74] transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-xs text-[#9a9793] leading-relaxed mb-4">
                        {r.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                        <span className="text-sm text-[#a3a3a3]">
                          from <span className="text-white font-semibold">{r.fromPrice}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#f97316]">
                          <Zap className="w-3 h-3 fill-[#f97316]" />
                          {r.turnaround}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-5">
              Ready to start your {service.name} campaign?
            </h2>
            <p className="text-[#6b6866] mb-8 max-w-xl mx-auto">
              No long-term contracts, no setup fees. Month-to-month plans you can cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/get-started?plan=starter-audit">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Request Free Audit
                </Button>
              </Link>
              <Link href={`/get-started?plan=${service.recommendedPlan}`}>
                <Button size="lg" className="w-full sm:w-auto group">
                  Order {service.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
