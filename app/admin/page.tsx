import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { leads, clients, campaigns, backlinks } from "@/lib/db/schema";
import { count, eq, desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Link2, CheckCircle2, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Overview",
  robots: { index: false },
};

export default async function AdminPage() {
  const [
    [{ totalLeads }],
    [{ paidLeads }],
    [{ totalClients }],
    [{ activeCount }],
    [{ completedCount }],
    [{ linkCount }],
    recentLeads,
    recentCampaigns,
  ] = await Promise.all([
    db.select({ totalLeads: count() }).from(leads),
    db.select({ paidLeads: count() }).from(leads).where(eq(leads.status, "paid")),
    db.select({ totalClients: count() }).from(clients),
    db.select({ activeCount: count() }).from(campaigns).where(eq(campaigns.status, "outreach")),
    db.select({ completedCount: count() }).from(campaigns).where(eq(campaigns.status, "completed")),
    db.select({ linkCount: count() }).from(backlinks).where(eq(backlinks.status, "live")),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
    db.select().from(campaigns).orderBy(desc(campaigns.createdAt)).limit(5),
  ]);

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "#f97316" },
    { label: "Paid Clients", value: paidLeads, icon: TrendingUp, color: "#22c55e" },
    { label: "Client Accounts", value: totalClients, icon: Users, color: "#fb923c" },
    { label: "Active Campaigns", value: activeCount, icon: Activity, color: "#06b6d4" },
    { label: "Completed", value: completedCount, icon: CheckCircle2, color: "#22c55e" },
    { label: "Live Links", value: linkCount, icon: Link2, color: "#f59e0b" },
  ];

  const LEAD_STATUS_VARIANT: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> = {
    new: "secondary",
    pending_payment: "warning",
    paid: "success",
    contacted: "default",
    qualified: "success",
    rejected: "danger",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin Overview</h1>
        <p className="text-[#9a9793] mt-1">Campaign management dashboard.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-4"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">{value}</p>
            <p className="text-xs text-[#9a9793] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent leads + campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link
                href="/admin/leads"
                className="text-xs text-[#f97316] hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-[#9a9793] py-4">No leads yet.</p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between gap-4 py-2 border-b border-[#e0ddd8] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{lead.name}</p>
                      <p className="text-xs text-[#9a9793]">{lead.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={LEAD_STATUS_VARIANT[lead.status] ?? "secondary"}>
                        {lead.status.replace(/_/g, " ")}
                      </Badge>
                      <span className="text-xs text-[#b5b2ad]">{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Campaigns</CardTitle>
              <Link
                href="/admin/campaigns"
                className="text-xs text-[#f97316] hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentCampaigns.length === 0 ? (
              <p className="text-sm text-[#9a9793] py-4">No campaigns yet.</p>
            ) : (
              <div className="space-y-3">
                {recentCampaigns.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-4 py-2 border-b border-[#e0ddd8] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{c.productName}</p>
                      <p className="text-xs text-[#9a9793]">{c.progressStage?.replace(/_/g, " ")}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#b5b2ad]">{formatDate(c.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
