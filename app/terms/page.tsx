import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MilkyBacklinks terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">Terms of Service</h1>
            <p className="text-[#9a9793]">Last updated: May 2025</p>
            <div className="mt-4 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-4">
              <p className="text-sm text-[#fbbf24]">
                <strong>Note:</strong> This document is provided as a starting point. Review with a
                qualified legal professional before launch.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-[#6b6866] leading-relaxed">
            <Section title="1. Acceptance of Terms">
              By using MilkyBacklinks ("the Service"), you agree to these Terms of Service. If you do
              not agree, do not use the Service.
            </Section>

            <Section title="2. The Service">
              MilkyBacklinks provides a Digital PR Starter Campaign service. This includes campaign
              research, journalist outreach, outreach tracking, client dashboard access, and
              reporting. The service is designed to support earned media and backlink acquisition
              through structured digital PR outreach.
            </Section>

            <Section title="3. No Guarantee of Specific Results">
              <strong className="text-[#1a1a1a]">We do not guarantee specific backlinks, media placements, or publications.</strong>
              <br /><br />
              Media placement results depend entirely on editorial decisions made by third-party
              journalists and editors, who are independent of MilkyBacklinks. We do not control
              whether any specific journalist covers your story, or whether any publication chooses
              to include a link to your website.
              <br /><br />
              The $500 Digital PR Starter Campaign covers the research, outreach, and reporting
              process — not a guaranteed outcome.
            </Section>

            <Section title="4. Payment Terms">
              The Digital PR Starter Campaign is priced at $500 USD as a one-time payment.
              Payment is processed securely by Stripe. Your campaign begins after payment confirmation.
            </Section>

            <Section title="5. Client Responsibilities">
              You agree to provide accurate onboarding information, including your correct website URL,
              industry, and campaign goals. Inaccurate information may limit the effectiveness of
              your campaign.
            </Section>

            <Section title="6. Acceptable Use">
              You may not use the Service for any unlawful purpose, or to promote content that is
              harmful, deceptive, or in violation of third-party rights.
            </Section>

            <Section title="7. Intellectual Property">
              Campaign reports and materials created as part of your campaign are shared with you for
              your own use. MilkyBacklinks retains ownership of templates, processes, and systems used
              to deliver the service.
            </Section>

            <Section title="8. Limitation of Liability">
              To the maximum extent permitted by law, MilkyBacklinks is not liable for indirect,
              incidental, or consequential damages arising from your use of the service or from any
              failure of a campaign to achieve a specific outcome.
            </Section>

            <Section title="9. Changes to Terms">
              We may update these terms from time to time. Changes will be posted on this page.
              Continued use of the service after changes constitutes acceptance.
            </Section>

            <Section title="10. Contact">
              Questions about these terms? Contact us at: hello@milkybacklinks.com
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
