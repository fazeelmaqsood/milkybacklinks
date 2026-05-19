import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profile] = await db
    .select({ role: profiles.role, fullName: profiles.fullName })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  return NextResponse.json({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: profile?.role ?? "client",
  });
}
