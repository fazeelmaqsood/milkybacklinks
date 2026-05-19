import { db } from "@/lib/db";
import { clients, leads, profiles } from "@/lib/db/schema";
import { and, desc, eq, isNull } from "drizzle-orm";
import type { Client, Profile } from "@/lib/db/schema";

/** Resolve the client record for a logged-in user (by profile link or matching lead email). */
export async function getClientForProfile(profile: Profile): Promise<Client | null> {
  const [byProfile] = await db
    .select()
    .from(clients)
    .where(eq(clients.profileId, profile.id))
    .limit(1);

  if (byProfile) return byProfile;

  const [lead] = await db
    .select()
    .from(leads)
    .where(and(eq(leads.email, profile.email), eq(leads.status, "paid")))
    .orderBy(desc(leads.createdAt))
    .limit(1);

  if (!lead) return null;

  const [byLead] = await db
    .select()
    .from(clients)
    .where(eq(clients.leadId, lead.id))
    .limit(1);

  if (!byLead) return null;

  if (!byLead.profileId) {
    await db
      .update(clients)
      .set({ profileId: profile.id, updatedAt: new Date() })
      .where(eq(clients.id, byLead.id));
  }

  return byLead;
}

/** Link any paid clients with matching email to this profile (after signup). */
export async function linkPaidClientsToProfile(profile: Profile): Promise<void> {
  const paidLeads = await db
    .select({ id: leads.id })
    .from(leads)
    .where(and(eq(leads.email, profile.email), eq(leads.status, "paid")));

  for (const { id: leadId } of paidLeads) {
    await db
      .update(clients)
      .set({ profileId: profile.id, updatedAt: new Date() })
      .where(and(eq(clients.leadId, leadId), isNull(clients.profileId)));
  }
}
