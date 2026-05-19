import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MilkyBacklinks privacy policy — how we collect and use your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">Privacy Policy</h1>
            <p className="text-[#9a9793]">Last updated: May 2025</p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-[#6b6866] leading-relaxed">
            <Section title="1. Overview">
              MilkyBacklinks ("we", "us", "our") is committed to protecting your personal information.
              This policy explains what data we collect, how we use it, and your rights.
            </Section>

            <Section title="2. Information We Collect">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Contact information:</strong> Name, email address, company name, website URL</li>
                <li><strong>Campaign information:</strong> Industry, target country, competitor sites, campaign goals, and notes you provide in the onboarding form</li>
                <li><strong>Payment information:</strong> Stripe processes payment data directly. We do not store card details. We store a Stripe session reference and payment status only.</li>
                <li><strong>Account data:</strong> Email and password (hashed) for dashboard login</li>
                <li><strong>Usage data:</strong> Standard server logs including IP address, browser type, and pages visited</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <ul className="space-y-2 list-disc pl-5">
                <li>To process your campaign onboarding and payment</li>
                <li>To operate your campaign dashboard and update campaign progress</li>
                <li>To send transactional emails (confirmation, payment receipt, campaign updates)</li>
                <li>To contact you about your campaign</li>
                <li>To comply with legal obligations</li>
              </ul>
              We do not sell your data to third parties.
            </Section>

            <Section title="4. Third-Party Services">
              We use the following third parties:
              <ul className="space-y-2 list-disc pl-5 mt-3">
                <li><strong>Stripe</strong> — payment processing (subject to Stripe's Privacy Policy)</li>
                <li><strong>Resend</strong> — transactional email delivery</li>
                <li><strong>Neon</strong> — database hosting</li>
                <li><strong>Vercel</strong> — application hosting</li>
              </ul>
            </Section>

            <Section title="5. Data Retention">
              We retain your campaign data for as long as your account is active or as needed to provide the service.
              You may request deletion of your data by emailing us at hello@milkybacklinks.com.
            </Section>

            <Section title="6. Your Rights">
              Depending on your jurisdiction, you may have the right to access, correct, or delete personal data we hold about you.
              Contact us at hello@milkybacklinks.com to exercise these rights.
            </Section>

            <Section title="7. Cookies">
              We use session cookies required for authentication. We do not use tracking or advertising cookies.
            </Section>

            <Section title="8. Contact">
              For privacy questions, contact: hello@milkybacklinks.com
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
