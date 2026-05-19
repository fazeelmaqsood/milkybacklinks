import type { Metadata } from "next";
import { db } from "@/lib/db";
import { campaigns, clients } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AdminCampaignEditor } from "@/components/admin/campaign-editor";

export const metadata: Metadata = {
  title: "Admin — Campaigns",
  robots: { index: false },
};

const STATUS_VARIANT: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> =
  {
    payment_confirmed: "success",
    research: "default",
    pr_angles: "default",
    outreach: "default",
    links_review: "warning",
    reporting: "warning",
    completed: "success",
    paused: "secondary",
    cancelled: "danger",
    onboarding: "secondary",
  };

export default async function AdminCampaignsPage() {
  const allCampaigns = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Campaigns</h1>
        <p className="text-[#9a9793] mt-1">{allCampaigns.length} total campaigns</p>
      </div>

      <div className="space-y-4">
        {allCampaigns.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-[#9a9793]">
              No campaigns yet.
            </CardContent>
          </Card>
        ) : (
          allCampaigns.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#1a1a1a]">{c.productName}</h3>
                    <Badge variant={STATUS_VARIANT[c.status] ?? "secondary"}>
                      {c.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#9a9793]">
                    ID: {c.id} · Started: {formatDate(c.startDate)} ·{" "}
                    {c.linksDelivered} links delivered
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#1a1a1a]">${c.price}</p>
                  <p className="text-xs text-[#9a9793]">{c.currency}</p>
                </div>
              </div>

              <AdminCampaignEditor campaign={c} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
