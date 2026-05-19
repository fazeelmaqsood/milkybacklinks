import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "@/lib/plans";
import { getStripe, isStripeConfigured } from "@/lib/stripe-server";

export async function POST(req: NextRequest) {
  try {
    const { leadId, email, name, planId } = await req.json();

    if (!leadId || !email) {
      return NextResponse.json({ error: "leadId and email are required" }, { status: 400 });
    }

    const plan = getPlan(planId);
    if (plan.price === 0) {
      return NextResponse.json(
        { error: "This plan is free — no checkout required." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment system not configured. Please contact support." },
        { status: 503 }
      );
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        lead_id: leadId,
        plan_id: plan.id,
        product_name: plan.name,
        client_email: email,
        client_name: name ?? "",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: plan.price * 100,
            recurring: { interval: "month" },
            product_data: {
              name: plan.name,
              description: plan.tagline,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}`,
      cancel_url: `${siteUrl}/get-started?plan=${plan.id}&payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
