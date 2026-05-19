import type Stripe from "stripe";
import { db } from "@/lib/db";
import { leads, clients, campaigns, payments, profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/nanoid";
import { getPlan } from "@/lib/plans";

export async function processCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<{ ok: boolean; message: string; campaignId?: string }> {
  const leadId = session.metadata?.lead_id;

  if (!leadId) {
    return { ok: false, message: "No lead_id in session metadata" };
  }

  const [existingPayment] = await db
    .select({ id: payments.id })
    .from(payments)
    .where(eq(payments.stripeSessionId, session.id))
    .limit(1);

  if (existingPayment) {
    return { ok: true, message: "Payment already processed (skipped duplicate)" };
  }

  const planId = session.metadata?.plan_id;
  const plan = getPlan(planId);
  const productName = session.metadata?.product_name ?? plan.name;
  const amountCents = session.amount_total ?? plan.price * 100;
  const priceFormatted = (amountCents / 100).toFixed(2);

  await db
    .update(leads)
    .set({ status: "paid", updatedAt: new Date() })
    .where(eq(leads.id, leadId));

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1);
  if (!lead) {
    return { ok: false, message: `Lead not found: ${leadId}` };
  }

  const clientId = nanoid();
  const [matchingProfile] = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.email, lead.email))
    .limit(1);

  await db.insert(clients).values({
    id: clientId,
    leadId,
    profileId: matchingProfile?.id ?? null,
    companyName: lead.companyName,
    websiteUrl: lead.websiteUrl,
    industry: lead.industry,
    targetCountry: lead.targetCountry,
  });

  const campaignId = nanoid();
  await db.insert(campaigns).values({
    id: campaignId,
    clientId,
    leadId,
    productName,
    price: priceFormatted,
    currency: (session.currency ?? "usd").toUpperCase(),
    status: "payment_confirmed",
    progressStage: "payment_confirmed",
    linksDelivered: 0,
    startDate: new Date(),
  });

  await db.insert(payments).values({
    id: nanoid(),
    leadId,
    clientId,
    campaignId,
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : undefined,
    amount: amountCents,
    currency: (session.currency ?? "usd").toUpperCase(),
    status: "paid",
  });

  return {
    ok: true,
    message: `Created campaign "${productName}" ($${priceFormatted}) for ${lead.email}`,
    campaignId,
  };
}
