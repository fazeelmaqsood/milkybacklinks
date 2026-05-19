import type { Metadata } from "next";
import { db } from "@/lib/db";
import { backlinks, campaigns } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AdminAddBacklink } from "@/components/admin/add-backlink";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin — Backlinks",
  robots: { index: false },
};

const LINK_TYPE_BADGE: Record<string, string> = {
  dofollow: "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/30",
  nofollow: "bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/30",
  sponsored: "bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/30",
  mention_only: "bg-[#06b6d4]/20 text-[#22d3ee] border-[#06b6d4]/30",
  unknown: "bg-[#737373]/20 text-[#6b6866] border-[#737373]/30",
};

export default async function AdminBacklinksPage() {
  const [allBacklinks, allCampaigns] = await Promise.all([
    db.select().from(backlinks).orderBy(desc(backlinks.createdAt)),
    db.select().from(campaigns),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Backlinks</h1>
          <p className="text-[#9a9793] mt-1">{allBacklinks.length} total entries</p>
        </div>
      </div>

      <AdminAddBacklink campaigns={allCampaigns} />

      <Card>
        <CardHeader>
          <CardTitle>All Backlinks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0ddd8]">
                  {["Publication", "Target URL", "Anchor", "DR", "Type", "Status", "Date Live", ""].map(
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
                {allBacklinks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#9a9793]">
                      No backlinks yet. Add the first one above.
                    </td>
                  </tr>
                ) : (
                  allBacklinks.map((bl) => (
                    <tr key={bl.id} className="hover:bg-[#ebe8e2]/50 transition-colors">
                      <td className="py-3 px-4 pl-6 font-medium text-[#1a1a1a]">
                        {bl.publicationName}
                      </td>
                      <td className="py-3 px-4 text-[#9a9793] max-w-[120px] truncate">
                        {bl.targetUrl ?? "—"}
                      </td>
                      <td className="py-3 px-4 text-[#9a9793]">{bl.anchorText ?? "—"}</td>
                      <td className="py-3 px-4 text-[#9a9793]">{bl.domainRating ?? "—"}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                            LINK_TYPE_BADGE[bl.linkType] ?? LINK_TYPE_BADGE.unknown
                          }`}
                        >
                          {bl.linkType.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            bl.status === "live"
                              ? "success"
                              : bl.status === "removed"
                              ? "danger"
                              : "secondary"
                          }
                        >
                          {bl.status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#9a9793] text-xs whitespace-nowrap">
                        {formatDate(bl.dateLive)}
                      </td>
                      <td className="py-3 px-4 pr-6">
                        {bl.liveUrl ? (
                          <a
                            href={bl.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f97316] hover:text-[#fdba74] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
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
