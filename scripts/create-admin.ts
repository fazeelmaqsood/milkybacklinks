/**
 * Create the first admin user.
 *
 * Usage:
 *   1. Copy .env.example to .env.local and fill in DATABASE_URL + BETTER_AUTH_SECRET
 *   2. Run: npx tsx scripts/create-admin.ts
 *
 * Or manually: see MANUAL SQL section at the bottom.
 */

import "dotenv/config";

const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    "\nError: Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running this script.\n" +
    "Example:\n  ADMIN_EMAIL=you@domain.com ADMIN_PASSWORD=SecurePass123 npx tsx scripts/create-admin.ts\n"
  );
  process.exit(1);
}

async function main() {
  const { auth } = await import("../lib/auth");
  const { db } = await import("../lib/db");
  const { profiles, users } = await import("../lib/db/schema");
  const { eq } = await import("drizzle-orm");
  const { nanoid } = await import("../lib/nanoid");

  console.log(`\nCreating admin user: ${ADMIN_EMAIL}`);

  // Create user via Better Auth
  const result = await auth.api.signUpEmail({
    body: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
  });

  if (!result || !result.user) {
    console.error("Failed to create user. The email may already exist.");
    process.exit(1);
  }

  const userId = result.user.id;
  console.log(`User created: ${userId}`);

  // Check if profile already exists
  const existing = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    // Update to admin
    await db
      .update(profiles)
      .set({ role: "admin", updatedAt: new Date() })
      .where(eq(profiles.userId, userId));
    console.log("Existing profile updated to admin role.");
  } else {
    // Create profile with admin role
    await db.insert(profiles).values({
      id: nanoid(),
      userId,
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "admin",
    });
    console.log("Admin profile created.");
  }

  console.log(`\n✓ Admin user ready. Login at /login with: ${ADMIN_EMAIL}\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});

/**
 * MANUAL SQL ALTERNATIVE
 * ─────────────────────
 * If you prefer to set admin role manually after registering via /login:
 *
 * 1. Register a normal account at /login (or your site's signup)
 * 2. Note the user's ID from the auth.users table
 * 3. Run this SQL in Neon:
 *
 *    INSERT INTO profiles (id, user_id, full_name, email, role, created_at, updated_at)
 *    VALUES (
 *      gen_random_uuid()::text,
 *      '<your-user-id>',
 *      'Admin',
 *      'you@domain.com',
 *      'admin',
 *      NOW(),
 *      NOW()
 *    )
 *    ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();
 */
