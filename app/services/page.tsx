import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  XCircle,
  Search,
  Send,
  FileText,
  Link2,
  Globe,
  PenLine,
  Zap,
  Newspaper,
  Languages,
  Image as ImageIcon,
  Briefcase,
  MapPin,
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
import { plansByTrack } from "@/lib/plans";

const plans = plansByTrack("link-building");
import { CategoryFilter, type ServiceCategory } from "@/components/services/category-filter";
import { services as serviceDetails } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Link Building Services",
  description:
    "Editorial-style link building services with transparent tracking. Real outreach, real placements — backed by a clean client dashboard.",
};

const cardIcons = [Search, Link2, Award, Sparkles];

const services = plans.map((plan, i) => {
  const turnaround = plan.id === "starter-audit" ? "3 days" : "1 month";
  return {
    ...plan,
    icon: cardIcons[i] ?? Link2,
    turnaround,
  };
});

const serviceCategories: ServiceCategory[] = serviceDetails.map((s) => ({
  name: s.name,
  icon: s.icon,
  description: s.shortDescription,
  fromPrice: s.fromPrice,
  turnaround: s.turnaround,
  popular: s.popular,
  href: `/services/${s.slug}`,
  category: s.category,
}));

const compareInHouse = [
  "Time-intensive journalist research",
  "Limited media contact database",
  "Steep PR learning curve",
  "Inconsistent outreach cadence",
  "No tracking infrastructure",
];

const compareOutsourced = [
  "Battle-tested outreach playbooks",
  "Established journalist relationships",
  "Specialist PR & link experts",
  "Consistent monthly placements",
  "Full transparency dashboard",
];

const qualityPoints = [
  {
    icon: ShieldCheck,
    title: "No PBNs, ever",
    desc: "We never place links on private blog networks, link farms, or low-quality directories. Editorial-style placements only.",
  },
  {
    icon: Award,
    title: "Authority publications",
    desc: "Placements come from sites with real editorial standards. We share publication name, live URL, DR/DA, and anchor text upfront.",
  },
  {
    icon: CheckCircle2,
    title: "Manually reviewed",
    desc: "Every placement is verified by our team before it lands in your dashboard. We log only what's live and real.",
  },
  {
    icon: Globe,
    title: "Niche relevance",
    desc: "We pitch to publications and journalists that align with your industry — not generic mass outreach lists.",
  },
];

const faqs = [
  {
    q: "What is link building?",
    a: "Link building is the practice of earning links from other websites back to your own. Search engines treat editorial links from authoritative, relevant sites as signals of trust — they directly influence how your pages rank.",
  },
  {
    q: "Why use a link building service instead of doing it in-house?",
    a: "In-house link building requires a dedicated PR researcher, a journalist contact database, outreach tooling, and weeks of relationship-building before you see results. Outsourcing gives you specialist expertise, established journalist relationships, and consistent placements — without hiring or training a team.",
  },
  {
    q: "What kind of backlinks do you build?",
    a: "We focus on editorial-style placements through journalist outreach and digital PR. That means real media mentions, contextual brand references, and earned coverage — not paid guest posts, link insertions, or sponsored placements.",
  },
  {
    q: "How long until I see results?",
    a: "Most placements land within your first month. Larger campaigns build momentum over 2–3 months as we secure additional coverage. SEO ranking impact typically follows 4–12 weeks after a backlink goes live, depending on competition.",
  },
  {
    q: "Can I target specific pages on my site?",
    a: "Yes — you can list target URLs during onboarding (homepage, product pages, blog posts). We'll prioritize them in outreach, though specific target placement cannot be guaranteed since editors choose what to link.",
  },
  {
    q: "Do you guarantee a specific number of links?",
    a: "Each plan specifies the placements included. We do guarantee delivery of the placements outlined in your plan within the stated timeframe. We do not guarantee placement on specific named publications — that's determined by editorial decisions.",
  },
  {
    q: "How do you find the publications you pitch to?",
    a: "Our team uses a combination of journalist databases, industry-specific media lists, and ongoing relationships built through prior campaigns. Every publication is vetted for niche relevance and domain quality before outreach.",
  },
  {
    q: "Will I get a backlink report?",
    a: "Yes. Your client dashboard surfaces every delivered placement with publication name, live URL, anchor text, link type (dofollow/nofollow), and Domain Rating. Monthly summary reports are also delivered for ongoing plans.",
  },
  {
    q: "What if a link is removed?",
    a: "Editorial links can occasionally be removed by publishers. If a delivered link goes down within 30 days of placement, we'll work to either restore it or replace it on a comparable publication at no extra cost.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All paid plans are month-to-month with no long-term contract. Cancel before your next billing cycle and you won't be charged again — work in progress is delivered through the end of the current period.",
  },
];

const stats = [
  { value: "1,200+", label: "Placements delivered" },
  { value: "100%", label: "Editorial-style" },
  { value: "30 days", label: "Turnaround" },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Link Building Services | MilkyBacklinks",
  description:
    "Editorial-style link building services with transparent tracking. Real outreach, real placements — backed by a clean client dashboard.",
  url: `${SITE_URL}/services`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  },
};

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Link Building Services",
  url: `${SITE_URL}/services`,
  numberOfItems: serviceCategories.length,
  itemListElement: serviceCategories.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    description: s.description,
    url: `${SITE_URL}${s.href}`,
  })),
};

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }}
      />
      <Nav />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden grid-bg">
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }} />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              Link Building Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-[1.05] tracking-tight">
              Earn natural, in-content{" "}
              <span className="gradient-text">backlinks</span>{" "}
              from real publications.
            </h1>
            <p className="text-lg text-[#6b6866] max-w-2xl mx-auto mb-10 leading-relaxed">
              Editorial-style placements through journalist outreach and digital PR.
              Transparent reporting, manual verification, and a client dashboard that
              shows every delivered link.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/get-started?plan=starter-audit">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get a Free Audit
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" className="w-full sm:w-auto group">
                  View Services
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Service categories grid */}
        <section id="services" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
                  Services
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                  {serviceCategories.length} services available from Link Building.
                </h2>
              </div>
              <Link href="#plans" className="text-sm text-[#f97316] hover:underline shrink-0">
                Jump to plans →
              </Link>
            </div>

            <CategoryFilter services={serviceCategories} />
          </div>
        </section>

        {/* Pricing plans */}
        <section id="plans" className="pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
                Plans & Pricing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                Pick the plan that fits your stage.
              </h2>
              <p className="text-[#6b6866]">
                From a free backlink audit to monthly volume placements — every plan
                delivers manually verified, niche-relevant links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(({ icon: Icon, ...s }) => {
                const highlight = s.highlighted;
                return (
                  <div
                    key={s.id}
                    className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 ${
                      highlight
                        ? "border-[#f97316]/60 bg-[#f2f0eb] shadow-2xl shadow-[#f97316]/10 lg:scale-[1.03]"
                        : "border-[#e0ddd8] bg-[#faf8f5] hover:border-[#f97316]/30 hover:shadow-lg"
                    }`}
                  >
                    {highlight && (
                      <div className="h-1 w-full bg-gradient-to-r from-[#f97316] to-[#fb923c]" />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#f97316]" />
                        </div>
                        {highlight && (
                          <span className="inline-flex items-center rounded-full bg-[#f97316]/15 border border-[#f97316]/30 px-2.5 py-0.5 text-[10px] font-semibold text-[#f97316] uppercase tracking-wider">
                            Most Popular
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{s.name}</h3>
                      <p className="text-xs text-[#9a9793] mb-5 min-h-[2.5rem]">{s.tagline}</p>

                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-black text-[#1a1a1a]">{s.priceLabel}</span>
                        {s.price > 0 && (
                          <span className="text-xs text-[#9a9793]">/mo</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#9a9793] mb-5">
                        <Clock className="w-3 h-3" />
                        {s.turnaround}
                      </div>

                      <ul className="space-y-2 mb-6 flex-1">
                        {s.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" />
                            <span className="text-xs text-[#6b6866] leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href={`/get-started?plan=${s.id}`}>
                        <Button
                          size="sm"
                          variant={highlight ? "default" : "outline"}
                          className="w-full group"
                        >
                          {s.cta}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why outsource */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
                Built to Scale
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                Flexible link building for agencies and brands.
              </h2>
              <p className="text-[#6b6866]">
                Whether you're a growing brand or an agency reselling under your own banner,
                our services scale to match. White-label reporting available on request.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "No long-term contracts",
                  desc: "Month-to-month plans. Cancel anytime, no penalties, no hidden renewal fees.",
                },
                {
                  icon: PenLine,
                  title: "White-label friendly",
                  desc: "Reporting can be branded for agency resale. Your clients never see our name.",
                },
                {
                  icon: FileText,
                  title: "Real reporting",
                  desc: "Live URL, anchor text, publication, link type, and Domain Rating for every placement.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-[#e0ddd8] bg-[#faf8f5] p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">{title}</h3>
                  <p className="text-sm text-[#6b6866] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Which service to choose */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              Choosing a Service
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Which link building service should you start with?
            </h2>
            <div className="space-y-5 text-[#6b6866] leading-relaxed">
              <p>
                If you're just starting out, the <strong className="text-[#1a1a1a]">free Starter Audit</strong>{" "}
                is the right entry point. We'll look at your current backlink profile, identify gaps
                against competitors, and surface niche-relevant link opportunities — no payment required.
              </p>
              <p>
                Brands that already have some authority and want to add a single, well-placed link
                should look at the <strong className="text-[#1a1a1a]">Basic Link</strong> tier. It's a
                single niche-relevant backlink secured through manual outreach, ideal for filling a
                specific topical gap.
              </p>
              <p>
                For brands focused on building authority, the{" "}
                <strong className="text-[#1a1a1a]">PR Authority Link</strong> tier delivers a stronger,
                editorial-style placement on a higher-DR publication. This is our most popular plan
                because it balances cost with placement quality.
              </p>
              <p>
                Scaling brands and agencies running consistent campaigns should pick the{" "}
                <strong className="text-[#1a1a1a]">Growth Campaign</strong>. Three editorial placements
                per month builds compounding domain authority while keeping your link velocity natural.
              </p>
              <p className="text-sm text-[#9a9793]">
                Not sure which to pick? Start with the free audit — we'll recommend the right tier
                based on your site's current state.
              </p>
            </div>
          </div>
        </section>

        {/* In-house vs outsourced */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
                In-house vs. Outsourced
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                Why most teams outsource link building.
              </h2>
              <p className="text-[#6b6866]">
                Running a digital PR program in-house demands tooling, a media database, and
                full-time outreach effort. Most teams find specialist outsourcing more efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#e0ddd8] bg-[#faf8f5] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-[#ef4444]" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a]">In-house</h3>
                </div>
                <ul className="space-y-3">
                  {compareInHouse.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full border border-[#ef4444]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-px bg-[#ef4444]" />
                      </span>
                      <span className="text-sm text-[#6b6866]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#f97316]/40 bg-[#faf8f5] p-7 shadow-lg shadow-[#f97316]/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#f97316]" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a]">MilkyBacklinks</h3>
                </div>
                <ul className="space-y-3">
                  {compareOutsourced.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#6b6866]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quality guarantee */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
                Quality Standards
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                How we guarantee high-quality backlinks.
              </h2>
              <p className="text-[#6b6866]">
                Quality isn't a slogan — it's enforced at every step from outreach to verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {qualityPoints.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-xl border border-[#e0ddd8] bg-[#faf8f5] p-6 hover:border-[#f97316]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1.5">{title}</h3>
                    <p className="text-sm text-[#6b6866] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-24 bg-[#f2f0eb]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
                Frequently asked questions.
              </h2>
              <p className="text-[#6b6866]">
                Everything you need to know about our link building services.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
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

        {/* Social proof + CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-[#f97316]/30 bg-gradient-to-br from-[#faf8f5] to-[#f2f0eb] overflow-hidden p-10 sm:p-14 text-center">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl sm:text-4xl font-black text-[#1a1a1a] mb-1">
                        {s.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#9a9793] uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4 max-w-2xl mx-auto">
                  Ready to earn editorial-style backlinks?
                </h2>
                <p className="text-[#6b6866] mb-8 max-w-xl mx-auto">
                  Start with a free audit or jump into a campaign today. No long-term
                  contracts, no setup fees.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/get-started?plan=starter-audit">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Request Free Audit
                    </Button>
                  </Link>
                  <Link href="/get-started?plan=pr-authority">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Start a Campaign
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
