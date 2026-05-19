import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { EMAIL_CONFIG, isEmailConfigured, sendEmailSafe } from "@/lib/resend";
import { getStripe } from "@/lib/stripe-server";
import { processCheckoutSession } from "@/lib/process-checkout-session";
import { emailLogoHtml } from "@/lib/brand";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe env vars not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const result = await processCheckoutSession(session);
      if (!result.ok) {
        console.error("Checkout processing:", result.message);
        return NextResponse.json({ received: true });
      }

      const planId = session.metadata?.plan_id;
      const plan = (await import("@/lib/plans")).getPlan(planId);
      const productName = session.metadata?.product_name ?? plan.name;
      const amountCents = session.amount_total ?? plan.price * 100;
      const priceFormatted = (amountCents / 100).toFixed(2);

      if (isEmailConfigured() && result.campaignId) {
        const { db } = await import("@/lib/db");
        const { leads } = await import("@/lib/db/schema");
        const { eq } = await import("drizzle-orm");
        const leadId = session.metadata?.lead_id;
        const [lead] = leadId
          ? await db.select().from(leads).where(eq(leads.id, leadId)).limit(1)
          : [];
        const clientEmail = session.customer_email ?? lead?.email;
        const clientName = session.metadata?.client_name ?? lead?.name ?? "";

        if (clientEmail) {
          await Promise.allSettled([
            sendPaymentConfirmationToClient({
              email: clientEmail,
              name: clientName,
              productName,
              priceFormatted,
            }),
            sendPaymentNotificationToAdmin({
              name: clientName,
              email: clientEmail,
              websiteUrl: lead?.websiteUrl ?? "",
              campaignId: result.campaignId,
              productName,
              priceFormatted,
            }),
          ]);
        }
      }
    } catch (err) {
      console.error("Error processing webhook:", err);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function sendPaymentConfirmationToClient({
  email,
  name,
  productName,
  priceFormatted,
}: {
  email: string;
  name: string;
  productName: string;
  priceFormatted: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await sendEmailSafe({
    from: EMAIL_CONFIG.from,
    to: email,
    subject: `Your ${productName} is confirmed`,
    html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#000000;color:#ffffff;padding:40px;border-radius:12px;border:1px solid #2a2a2a;">
          <div style="margin-bottom:32px;">${emailLogoHtml({ height: 44, darkBg: true })}</div>
          <h1 style="font-size:24px;font-weight:700;margin-bottom:16px;">Payment confirmed, ${name}.</h1>
          <p style="color:#a3a3a3;line-height:1.7;margin-bottom:24px;">Your ${productName} has been confirmed. Our team will begin within 1–2 business days.</p>
          <div style="background:#111111;border:1px solid #2a2a2a;border-radius:8px;padding:20px;margin-bottom:24px;">
            <p style="color:#ffffff;margin:4px 0;"><strong>Product:</strong> ${productName}</p>
            <p style="color:#ffffff;margin:4px 0;"><strong>Amount paid:</strong> $${priceFormatted} USD</p>
            <p style="color:#ffffff;margin:4px 0;"><strong>Status:</strong> <span style="color:#22c55e;">✓ Confirmed</span></p>
          </div>
          <a href="${siteUrl}/dashboard" style="display:inline-block;background:#f97316;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-bottom:24px;">View Your Dashboard →</a>
          <p style="color:#737373;font-size:13px;">Questions? Reply to this email.</p>
        </div>
      `,
  });
}

async function sendPaymentNotificationToAdmin({
  name,
  email,
  websiteUrl,
  campaignId,
  productName,
  priceFormatted,
}: {
  name: string;
  email: string;
  websiteUrl: string;
  campaignId: string;
  productName: string;
  priceFormatted: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await sendEmailSafe({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.adminEmail,
    subject: `New payment: ${productName} ($${priceFormatted})`,
    html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#000000;color:#ffffff;padding:40px;border-radius:12px;border:1px solid #2a2a2a;">
          <h1 style="font-size:20px;font-weight:700;margin-bottom:24px;color:#22c55e;">💰 New payment received</h1>
          <p style="color:#a3a3a3;margin-bottom:16px;">${productName} — $${priceFormatted} USD</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#737373;font-size:13px;width:140px;">Client Name</td><td style="padding:8px 0;color:#ffffff;font-size:13px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;font-size:13px;">Email</td><td style="padding:8px 0;color:#ffffff;font-size:13px;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;font-size:13px;">Website</td><td style="padding:8px 0;color:#ffffff;font-size:13px;">${websiteUrl}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;font-size:13px;">Campaign ID</td><td style="padding:8px 0;color:#ffffff;font-size:13px;">${campaignId}</td></tr>
          </table>
          <a href="${siteUrl}/admin" style="display:inline-block;margin-top:24px;background:#f97316;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Admin Dashboard →</a>
        </div>
      `,
  });
}
