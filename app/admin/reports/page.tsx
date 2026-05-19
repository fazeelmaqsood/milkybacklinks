import type { Metadata } from "next";
import { db } from "@/lib/db";
import { reports, campaigns } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AdminAddReport } from "@/components/admin/add-report";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false },
};

export default async function AdminReportsPage() {
  const [allReports, allCampaigns] = await Promise.all([
    db.select().from(reports).orderBy(desc(reports.createdAt)),
    db.select().from(campaigns),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Reports</h1>
        <p className="text-[#9a9793] mt-1">{allReports.length} total reports</p>
      </div>

      <AdminAddReport campaigns={allCampaigns} />

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {allReports.length === 0 ? (
            <div className="py-10 text-center text-[#9a9793]">No reports yet.</div>
          ) : (
            <div className="space-y-3">
              {allReports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-5"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-[#1a1a1a]">{r.title}</p>
                      {r.reportMonth && <Badge variant="secondary">{r.reportMonth}</Badge>}
                    </div>
                    {r.summary && (
                      <p className="text-sm text-[#9a9793] leading-relaxed">{r.summary}</p>
                    )}
                    <p className="text-xs text-[#b5b2ad] mt-2">
                      Campaign: {r.campaignId.slice(0, 8)}… · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  {r.reportUrl && (
                    <a
                      href={r.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#f97316] hover:text-[#fdba74] font-medium whitespace-nowrap"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
