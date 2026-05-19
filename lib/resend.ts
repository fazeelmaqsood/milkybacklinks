import { Resend } from "resend";

export function isEmailConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  return Boolean(key && key.startsWith("re_") && key.length > 10);
}

export const resend = new Resend(
  isEmailConfigured() ? process.env.RESEND_API_KEY! : "re_placeholder"
);

export const EMAIL_CONFIG = {
  /** Must be a verified domain in Resend, or onboarding@resend.dev for testing */
  from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
  /** Where new-lead and payment alerts are sent */
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@milkybacklinks.com",
};

export async function sendEmailSafe(
  payload: Parameters<Resend["emails"]["send"]>[0]
): Promise<{ ok: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn("Email skipped: RESEND_API_KEY not set");
    return { ok: false, error: "Email not configured" };
  }

  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Send failed" };
  }
}
