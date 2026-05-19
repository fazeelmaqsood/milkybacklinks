/**
 * Import a completed Stripe Checkout into Neon (when webhook was missed).
 *
 * Usage:
 *   npx tsx scripts/sync-stripe-payment.ts cs_test_xxxxx
 *
 * Get session id from thank-you URL: ?session_id=cs_test_...
 * Or Stripe Dashboard → Payments → Checkout session id
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const sessionId = process.argv[2];

if (!sessionId?.startsWith("cs_")) {
  console.error(
    "\nUsage: npx tsx scripts/sync-stripe-payment.ts cs_test_xxxxxxxx\n" +
      "Find id in thank-you URL (?session_id=...) or Stripe Dashboard.\n"
  );
  process.exit(1);
}

async function main() {
  const { getStripe } = await import("../lib/stripe-server");
  const { processCheckoutSession } = await import("../lib/process-checkout-session");
  const { linkPaidClientsToProfile } = await import("../lib/client-access");
  const { db } = await import("../lib/db");
  const { profiles } = await import("../lib/db/schema");
  const { eq } = await import("drizzle-orm");

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    console.error(`Session payment_status is "${session.payment_status}", not paid.`);
    process.exit(1);
  }

  const result = await processCheckoutSession(session);
  console.log(result.ok ? "\n✓" : "\n✗", result.message);

  const email = session.customer_email ?? session.metadata?.client_email;
  if (email) {
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, email))
      .limit(1);
    if (profile) {
      await linkPaidClientsToProfile(profile);
      console.log("✓ Linked campaign to profile:", email);
    }
  }

  if (!result.ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
