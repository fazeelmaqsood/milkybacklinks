"use server";

import { db } from "@/lib/db";
import { leads, campaigns, backlinks, reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";
import { nanoid } from "@/lib/nanoid";
import { z } from "zod";

// ─── Leads ───────────────────────────────────────────────────────────────────

export async function updateLeadStatus(leadId: string, status: string) {
  await requireAdmin();
  await db.update(leads).set({ status: status as typeof leads.$inferSelect["status"], updatedAt: new Date() }).where(eq(leads.id, leadId));
  revalidatePath("/admin/leads");
}

// ─── Campaigns ───────────────────────────────────────────────────────────────

const campaignUpdateSchema = z.object({
  status: z.string().optional(),
  progressStage: z.string().optional(),
  internalNotes: z.string().optional(),
  clientNotes: z.string().optional(),
  linksDelivered: z.number().optional(),
  dueDate: z.string().optional(),
});

export async function updateCampaign(
  campaignId: string,
  data: z.infer<typeof campaignUpdateSchema>
) {
  await requireAdmin();
  const parsed = campaignUpdateSchema.parse(data);

  await db
    .update(campaigns)
    .set({
      ...(parsed.status && { status: parsed.status as typeof campaigns.$inferSelect["status"] }),
      ...(parsed.progressStage && { progressStage: parsed.progressStage as typeof campaigns.$inferSelect["progressStage"] }),
      ...(parsed.internalNotes !== undefined && { internalNotes: parsed.internalNotes }),
      ...(parsed.clientNotes !== undefined && { clientNotes: parsed.clientNotes }),
      ...(parsed.linksDelivered !== undefined && { linksDelivered: parsed.linksDelivered }),
      ...(parsed.dueDate && { dueDate: new Date(parsed.dueDate) }),
      updatedAt: new Date(),
    })
    .where(eq(campaigns.id, campaignId));

  revalidatePath("/admin/campaigns");
  revalidatePath("/dashboard");
}

// ─── Backlinks ───────────────────────────────────────────────────────────────

const backlinkSchema = z.object({
  campaignId: z.string(),
  publicationName: z.string().min(1),
  publicationUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  targetUrl: z.string().optional(),
  anchorText: z.string().optional(),
  domainRating: z.number().optional(),
  domainAuthority: z.number().optional(),
  linkType: z.enum(["dofollow", "nofollow", "sponsored", "mention_only", "unknown"]),
  status: z.enum(["pending_review", "live", "changed", "removed"]),
  dateLive: z.string().optional(),
  notes: z.string().optional(),
});

export async function createBacklink(data: z.infer<typeof backlinkSchema>) {
  await requireAdmin();
  const parsed = backlinkSchema.parse(data);

  await db.insert(backlinks).values({
    id: nanoid(),
    ...parsed,
    dateLive: parsed.dateLive ? new Date(parsed.dateLive) : undefined,
  });

  revalidatePath("/admin/backlinks");
  revalidatePath("/dashboard");
}

export async function updateBacklink(
  backlinkId: string,
  data: Partial<z.infer<typeof backlinkSchema>>
) {
  await requireAdmin();
  const updateData = {
    ...data,
    dateLive: data.dateLive ? new Date(data.dateLive) : undefined,
    updatedAt: new Date(),
  };
  await db
    .update(backlinks)
    .set(updateData)
    .where(eq(backlinks.id, backlinkId));

  revalidatePath("/admin/backlinks");
  revalidatePath("/dashboard");
}

// ─── Reports ─────────────────────────────────────────────────────────────────

const reportSchema = z.object({
  campaignId: z.string(),
  title: z.string().min(1),
  reportMonth: z.string().optional(),
  summary: z.string().optional(),
  reportUrl: z.string().optional(),
});

export async function createReport(data: z.infer<typeof reportSchema>) {
  await requireAdmin();
  const parsed = reportSchema.parse(data);

  await db.insert(reports).values({
    id: nanoid(),
    ...parsed,
  });

  revalidatePath("/admin/reports");
  revalidatePath("/dashboard");
}

export async function updateReport(
  reportId: string,
  data: Partial<z.infer<typeof reportSchema>>
) {
  await requireAdmin();
  await db
    .update(reports)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(reports.id, reportId));

  revalidatePath("/admin/reports");
  revalidatePath("/dashboard");
}
