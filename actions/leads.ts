"use server";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { EMAIL_CONFIG, isEmailConfigured, sendEmailSafe } from "@/lib/resend";
import { z } from "zod";
import { nanoid } from "@/lib/nanoid";
import { getPlan } from "@/lib/plans";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company_name: z.string().optional(),
  website_url: z.string().url("Valid website URL required"),
  industry: z.string().optional(),
  target_country: z.string().optional(),
  target_pages: z.string().optional(),
  competitors: z.string().optional(),
  campaign_goal: z.string().optional(),
  notes: z.string().optional(),
  plan_id: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export async function createLead(data: LeadFormData): Promise<{
  success: boolean;
  leadId?: string;
  error?: string;
}> {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Validation failed" };
  }

  const { name, email, company_name, website_url, industry, target_country, target_pages, competitors, campaign_goal, notes, plan_id } =
    parsed.data;

  const plan = getPlan(plan_id);
  const isFree = plan.price === 0;
  const leadId = nanoid();

  try {
    await db.insert(leads).values({
      id: leadId,
      name,
      email,
      companyName: company_name,
      websiteUrl: website_url,
      industry,
      targetCountry: target_country,
      targetPages: target_pages,
      competitors,
      campaignGoal: campaign_goal,
      notes,
      planId: plan.id,
      status: isFree ? "audit_requested" : "pending_payment",
    });
  } catch (err) {
    console.error("Failed to insert lead:", err);
    return { success: false, error: "Failed to save your details. Please try again." };
  }

  if (isEmailConfigured()) {
    await Promise.allSettled([
      sendClientConfirmationEmail({ name, email, website_url, plan }),
      sendAdminLeadEmail({ name, email, company_name, website_url, industry, target_country, notes, plan }),
    ]);
  }

  return { success: true, leadId };
}

async function sendClientConfirmationEmail({
  name,
  email,
  website_url,
  plan,
}: {
  name: string;
  email: string;
  website_url: string;
  plan: ReturnType<typeof getPlan>;
}) {
  const isFree = plan.price === 0;
  const subject = isFree
    ? `We received your free backlink audit request`
    : `We received your ${plan.name} details`;
  const nextStep = isFree
    ? `Our team will review your site and send back your personalized backlink growth plan within 3 business days.`
    : `You'll be redirected to our secure Stripe checkout to complete payment. Once payment is confirmed, your campaign dashboard will be activated.`;
  const priceLine = isFree ? "Free" : `${plan.priceLabel} USD / month`;

  await sendEmailSafe({
    from: EMAIL_CONFIG.from,
    to: email,
    subject,
    html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#faf8f5;color:#1a1a1a;padding:40px;border-radius:12px;border:1px solid #e0ddd8;">
          <div style="margin-bottom:32px;">
            <span style="font-size:20px;font-weight:700;color:#1a1a1a;">Milky<span style="color:#f97316;">Backlinks</span></span>
          </div>
          <h1 style="font-size:24px;font-weight:700;margin-bottom:16px;color:#1a1a1a;">We received your details, ${name}.</h1>
          <p style="color:#6b6866;line-height:1.7;margin-bottom:24px;">Thanks for reaching out. We've received your ${plan.name} request for <strong style="color:#1a1a1a;">${website_url}</strong>.</p>
          <div style="background:#f2f0eb;border:1px solid #e0ddd8;border-radius:8px;padding:20px;margin-bottom:24px;">
            <p style="color:#9a9793;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Plan Details</p>
            <p style="color:#1a1a1a;margin:4px 0;"><strong>Plan:</strong> ${plan.name}</p>
            <p style="color:#1a1a1a;margin:4px 0;"><strong>Website:</strong> ${website_url}</p>
            <p style="color:#1a1a1a;margin:4px 0;"><strong>Price:</strong> ${priceLine}</p>
          </div>
          <p style="color:#6b6866;line-height:1.7;margin-bottom:24px;"><strong style="color:#1a1a1a;">Next step:</strong> ${nextStep}</p>
          <p style="color:#9a9793;font-size:13px;line-height:1.7;">Questions? Just reply to this email.</p>
        </div>
      `,
  });
}

async function sendAdminLeadEmail({
  name,
  email,
  company_name,
  website_url,
  industry,
  target_country,
  notes,
  plan,
}: {
  name: string;
  email: string;
  company_name?: string;
  website_url: string;
  industry?: string;
  target_country?: string;
  notes?: string;
  plan: ReturnType<typeof getPlan>;
}) {
  await sendEmailSafe({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.adminEmail,
    subject: `New lead — ${plan.name}`,
    html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#faf8f5;color:#1a1a1a;padding:40px;border-radius:12px;border:1px solid #e0ddd8;">
          <h1 style="font-size:20px;font-weight:700;margin-bottom:24px;">New lead — ${plan.name}</h1>
          <table style="width:100%;border-collapse:collapse;">
            ${[
              ["Plan", `${plan.name} (${plan.priceLabel})`],
              ["Name", name],
              ["Email", email],
              ["Company", company_name ?? "—"],
              ["Website", website_url],
              ["Industry", industry ?? "—"],
              ["Target Country", target_country ?? "—"],
              ["Notes", notes ?? "—"],
            ]
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:8px 0;color:#9a9793;font-size:13px;width:140px;">${label}</td><td style="padding:8px 0;color:#1a1a1a;font-size:13px;">${value}</td></tr>`
              )
              .join("")}
          </table>
          <p style="margin-top:24px;color:#9a9793;font-size:13px;">Check the admin dashboard to update lead status.</p>
        </div>
      `,
  });
}
