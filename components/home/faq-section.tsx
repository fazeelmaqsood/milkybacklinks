import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const homeFaqs = [
  {
    q: "What is included in the $500 campaign?",
    a: "The $500 Digital PR Starter Campaign includes campaign onboarding, PR angle research, journalist outreach setup and tracking, access to a client dashboard, delivered backlink and media mention tracking, and a monthly or final campaign report. All updates are admin-reviewed.",
  },
  {
    q: "Do you guarantee backlinks?",
    a: "No. We do not guarantee specific backlinks, placements, or publications. Media placements depend on editorial decisions made by third-party journalists and editors. Our campaign is designed to support earned media acquisition through structured digital PR outreach — results depend on the quality of the pitch, brand story, and media landscape.",
  },
  {
    q: "How long does a campaign take?",
    a: "Most campaigns run for 4–8 weeks from the point of payment confirmation. The timeline varies based on outreach activity, editorial response times, and campaign stage. Your dashboard will always show the current stage and last update.",
  },
  {
    q: "What do I see in the dashboard?",
    a: "Your dashboard shows campaign status, progress stage (out of 8 stages), delivered backlinks with publication details and live URLs, campaign reports, and any admin notes. Everything is updated manually by our team.",
  },
  {
    q: "Is this guest posting?",
    a: "No. This is a digital PR campaign focused on earned media and organic journalist outreach. We do not purchase guest post placements or link insertions. Placements are editorial — based on journalists choosing to cover your brand's story.",
  },
  {
    q: "What information do you need from me?",
    a: "You'll complete an onboarding form with your name, email, company name, website URL, industry, target country, target pages (optional), competitors (optional), and campaign goal. The more context you provide, the stronger the outreach can be.",
  },
  {
    q: "Can agencies use this?",
    a: "Yes. Agencies can purchase and manage a Digital PR Starter Campaign on behalf of a client. The campaign dashboard, reports, and backlink tracking are available through the client login after payment.",
  },
  {
    q: "What happens after payment?",
    a: "After payment is confirmed, you receive a confirmation email and your campaign dashboard is activated. You can log in to track campaign progress. Our team begins campaign research within 1–2 business days of payment confirmation.",
  },
  {
    q: "Can I request target pages?",
    a: "Yes. During onboarding, you can specify target pages you'd like links to point to. We'll consider these during outreach, though specific page targeting cannot be guaranteed as it depends on the context of each editorial placement.",
  },
  {
    q: "Do you report nofollow or sponsored links honestly?",
    a: "Yes. Every link logged in your dashboard shows the link type: dofollow, nofollow, sponsored, mention only, or unknown. We log what's real — including link types that are less SEO-ideal. Transparency is core to how this platform works.",
  },
];

const faqs = homeFaqs;

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Common questions.
            </h2>
            <p className="text-[#9a9793] leading-relaxed">
              Everything you need to know before starting your digital PR campaign.
            </p>
          </div>

          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="divide-y divide-[#2a2a2a]">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0">
                  <AccordionTrigger className="text-left py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
