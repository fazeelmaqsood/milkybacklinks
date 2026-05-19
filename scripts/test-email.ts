/**
 * Send a test email via Resend to verify configuration.
 *
 * Usage:
 *   npx tsx scripts/test-email.ts
 *   npx tsx scripts/test-email.ts you@email.com
 */

import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { isEmailConfigured, sendEmailSafe, EMAIL_CONFIG } = await import("../lib/resend");

  if (!isEmailConfigured()) {
    console.error(
      "\n✗ RESEND_API_KEY is missing in .env.local\n" +
        "Get one at https://resend.com/api-keys\n"
    );
    process.exit(1);
  }

  const to = process.argv[2] ?? EMAIL_CONFIG.adminEmail;

  console.log(`\nSending test email...`);
  console.log(`  From: ${EMAIL_CONFIG.from}`);
  console.log(`  To:   ${to}\n`);

  const result = await sendEmailSafe({
    from: EMAIL_CONFIG.from,
    to,
    subject: "MilkyBacklinks — test email",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <h1 style="color:#1a1a1a;">Email is working</h1>
        <p style="color:#6b6866;">Resend is configured correctly for MilkyBacklinks.</p>
      </div>
    `,
  });

  if (result.ok) {
    console.log("✓ Test email sent. Check your inbox (and spam).\n");
  } else {
    console.error("✗ Failed:", result.error);
    console.error(
      "\nTip: With onboarding@resend.dev you can only send TO the email on your Resend account.\n" +
        "For production, verify your domain and set FROM_EMAIL=noreply@yourdomain.com\n"
    );
    process.exit(1);
  }
}

main();
