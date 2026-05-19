import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
}

export async function requireAuth(redirectTo = "/login") {
  const session = await getSession();
  if (!session) redirect(redirectTo);
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }
  return { session, profile };
}

export async function requireClient() {
  const session = await requireAuth();
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  return { session, profile: profile ?? null };
}
