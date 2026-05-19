import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  trustedOrigins: [baseURL],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Create profile for every new user (default role: client)
          const { nanoid } = await import("./nanoid");
          try {
            await db
              .insert(schema.profiles)
              .values({
                id: nanoid(),
                userId: user.id,
                email: user.email,
                fullName: user.name ?? null,
                role: "client",
              })
              .onConflictDoNothing();

            const { eq } = await import("drizzle-orm");
            const { linkPaidClientsToProfile } = await import("./client-access");
            const [profile] = await db
              .select()
              .from(schema.profiles)
              .where(eq(schema.profiles.userId, user.id))
              .limit(1);

            if (profile) {
              await linkPaidClientsToProfile(profile);
            }
          } catch (err) {
            console.error("Failed to create profile after user creation:", err);
          }
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
