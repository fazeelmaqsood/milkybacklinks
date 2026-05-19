/**
 * Promote an existing logged-in user to admin by email.
 *
 * Usage:
 *   ADMIN_EMAIL=you@domain.com npx tsx scripts/promote-admin.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

if (!ADMIN_EMAIL) {
  console.error("\nUsage: ADMIN_EMAIL=you@domain.com npx tsx scripts/promote-admin.ts\n");
  process.exit(1);
}

async function main() {
  const { db } = await import("../lib/db");
  const { profiles, users } = await import("../lib/db/schema");
  const { eq } = await import("drizzle-orm");
  const { nanoid } = await import("../lib/nanoid");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, ADMIN_EMAIL))
    .limit(1);

  if (!user) {
    console.error(
      `\nNo user found with email: ${ADMIN_EMAIL}\n` +
        "Sign up at /login first, then run this script again.\n"
    );
    process.exit(1);
  }

  const [existing] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  if (existing) {
    await db
      .update(profiles)
      .set({ role: "admin", updatedAt: new Date() })
      .where(eq(profiles.userId, user.id));
    console.log(`\n✓ ${ADMIN_EMAIL} is now an admin.\n`);
  } else {
    await db.insert(profiles).values({
      id: nanoid(),
      userId: user.id,
      fullName: user.name,
      email: user.email,
      role: "admin",
    });
    console.log(`\n✓ Admin profile created for ${ADMIN_EMAIL}.\n`);
  }

  console.log("Open http://localhost:3000/admin after signing in.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
