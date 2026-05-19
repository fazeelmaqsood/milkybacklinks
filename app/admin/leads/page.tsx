import type { Metadata } from "next";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AdminLeadActions } from "@/components/admin/lead-actions";

export const metadata: Metadata = {
  title: "Admin — Leads",
  robots: { index: false },
};

const STATUS_VARIANT: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> =
  {
    new: "secondary",
    pending_payment: "warning",
    paid: "success",
    contacted: "default",
    qualified: "success",
    rejected: "danger",
  };

export default async function AdminLeadsPage() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Leads</h1>
        <p className="text-[#9a9793] mt-1">{allLeads.length} total leads</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0ddd8]">
                  {["Name", "Email", "Website", "Industry", "Status", "Created", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-medium text-[#9a9793] first:pl-6 last:pr-6"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {allLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#9a9793]">
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  allLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#ebe8e2]/50 transition-colors">
                      <td className="py-3 px-4 pl-6 font-medium text-[#1a1a1a]">{lead.name}</td>
                      <td className="py-3 px-4 text-[#9a9793]">{lead.email}</td>
                      <td className="py-3 px-4 text-[#9a9793] max-w-[140px] truncate">
                        {lead.websiteUrl}
                      </td>
                      <td className="py-3 px-4 text-[#9a9793]">{lead.industry ?? "—"}</td>
                      <td className="py-3 px-4">
                        <Badge variant={STATUS_VARIANT[lead.status] ?? "secondary"}>
                          {lead.status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#9a9793] text-xs whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="py-3 px-4 pr-6">
                        <AdminLeadActions leadId={lead.id} currentStatus={lead.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
