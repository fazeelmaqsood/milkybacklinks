import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "MilkyBacklinks refund policy for the Digital PR Starter Campaign.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">Refund Policy</h1>
            <p className="text-[#9a9793]">Last updated: May 2025</p>
            <div className="mt-4 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-4">
              <p className="text-sm text-[#fbbf24]">
                <strong>Note:</strong> Review with a qualified legal professional before launch.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-[#6b6866] leading-relaxed">
            <Section title="Overview">
              We want you to feel confident starting a Digital PR Starter Campaign. This policy
              explains under what circumstances refunds may be considered.
            </Section>

            <Section title="Before Campaign Work Begins">
              If you have paid for a Digital PR Starter Campaign and campaign research has not yet
              started, you may request a refund by contacting us at hello@milkybacklinks.com.
              Refund requests in this window are considered on a case-by-case basis.
            </Section>

            <Section title="After Campaign Work Has Started">
              Once campaign research, PR angle development, or outreach preparation has begun,
              refunds may be limited or unavailable. The service value includes:
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Campaign research and strategy</li>
                <li>PR angle development</li>
                <li>Outreach preparation and tracking</li>
                <li>Client dashboard setup and access</li>
                <li>Reporting and campaign updates</li>
              </ul>
              These activities require time and effort from our team and are initiated shortly after
              payment confirmation.
            </Section>

            <Section title="No Guarantee of Specific Outcomes">
              Refunds are not available on the basis of campaign outcome alone. As stated in our
              Terms of Service, we do not guarantee specific backlinks, placements, or publications.
              Results depend on editorial decisions made by independent third-party journalists and
              editors.
              <br /><br />
              If you are unsatisfied with how your campaign was managed or communicated, please
              contact us and we will do our best to address your concern.
            </Section>

            <Section title="How to Request a Refund">
              Contact us at <a href="mailto:hello@milkybacklinks.com" className="text-[#f97316] hover:underline">hello@milkybacklinks.com</a> with:
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Your name and email address</li>
                <li>Your campaign ID or website URL</li>
                <li>The reason for your refund request</li>
              </ul>
              We aim to respond within 2 business days.
            </Section>

            <Section title="Contact">
              Questions about this policy? Email us at hello@milkybacklinks.com
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">{title}</h2>
      <div className="text-[#6b6866]">{children}</div>
    </div>
  );
}
