import type { Metadata } from "next";
import { requireClient } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { profiles, campaigns, backlinks, reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getClientForProfile } from "@/lib/client-access";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Activity, Link2, FileText, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

const PROGRESS_STAGES = [
  "onboarding_received",
  "payment_confirmed",
  "campaign_research",
  "pr_angles_prepared",
  "outreach_in_progress",
  "mentions_review",
  "report_delivered",
  "campaign_completed",
] as const;

const STAGE_LABELS: Record<string, string> = {
  onboarding_received: "Onboarding Received",
  payment_confirmed: "Payment Confirmed",
  campaign_research: "Campaign Research",
  pr_angles_prepared: "PR Angles Prepared",
  outreach_in_progress: "Outreach In Progress",
  mentions_review: "Mentions Review",
  report_delivered: "Report Delivered",
  campaign_completed: "Campaign Completed",
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

const LINK_TYPE_BADGE: Record<string, string> = {
  dofollow: "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/30",
  nofollow: "bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/30",
  sponsored: "bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/30",
  mention_only: "bg-[#06b6d4]/20 text-[#22d3ee] border-[#06b6d4]/30",
  unknown: "bg-[#737373]/20 text-[#6b6866] border-[#737373]/30",
};

export default async function DashboardPage() {
  const { session } = await requireClient();

  // Get profile
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  const clientRecord = profile ? await getClientForProfile(profile) : null;

  // Get campaign (only for this client)
  const campaign = clientRecord
    ? await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.clientId, clientRecord.id))
        .limit(1)
        .then((r) => r[0] ?? null)
    : null;

  // Get backlinks (only for this campaign)
  const campaignBacklinks = campaign
    ? await db
        .select()
        .from(backlinks)
        .where(eq(backlinks.campaignId, campaign.id))
    : [];

  // Get reports (only for this campaign)
  const campaignReports = campaign
    ? await db
        .select()
        .from(reports)
        .where(eq(reports.campaignId, campaign.id))
    : [];

  const progressIndex = campaign
    ? PROGRESS_STAGES.indexOf(campaign.progressStage as typeof PROGRESS_STAGES[number])
    : -1;
  const progressPercent = progressIndex >= 0 ? ((progressIndex + 1) / PROGRESS_STAGES.length) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">
          Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="text-[#9a9793] mt-1">
          {clientRecord?.websiteUrl ?? "Your campaign dashboard."}
        </p>
      </div>

      {/* No campaign state */}
      {!campaign ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Activity className="w-10 h-10 text-[#2a2a2a] mx-auto mb-4" />
            <p className="font-medium text-[#1a1a1a] mb-2">No campaign yet</p>
            <p className="text-sm text-[#9a9793]">
              Your campaign will appear here after payment confirmation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Campaign overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Product",
                value: campaign.productName,
                icon: Activity,
                color: "#f97316",
              },
              {
                label: "Amount Paid",
                value: `$${campaign.price}`,
                icon: Clock,
                color: "#22c55e",
              },
              {
                label: "Links Delivered",
                value: `${campaign.linksDelivered}`,
                icon: Link2,
                color: "#fb923c",
              },
              {
                label: "Started",
                value: formatDate(campaign.startDate),
                icon: Clock,
                color: "#06b6d4",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-5"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-xs text-[#9a9793] mb-1">{label}</p>
                <p className="font-semibold text-[#1a1a1a] text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Status + Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Campaign Progress</CardTitle>
                <Badge variant={STATUS_VARIANT[campaign.status] ?? "secondary"}>
                  {campaign.status.replace(/_/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[#9a9793] mb-2">
                  <span>{STAGE_LABELS[campaign.progressStage] ?? campaign.progressStage}</span>
                  <span>{Math.round(progressPercent)}% complete</span>
                </div>
                <Progress value={progressPercent} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
                {PROGRESS_STAGES.map((stage, i) => (
                  <div
                    key={stage}
                    className={`rounded-lg p-3 text-center transition-colors ${
                      i <= progressIndex
                        ? "bg-[#f97316]/15 border border-[#f97316]/30"
                        : "bg-[#f2f0eb] border border-[#e0ddd8]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                        i <= progressIndex
                          ? "bg-[#f97316] text-white"
                          : "bg-[#2a2a2a] text-[#b5b2ad]"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <p
                      className={`text-[10px] leading-tight ${
                        i <= progressIndex ? "text-[#6b6866]" : "text-[#b5b2ad]"
                      }`}
                    >
                      {STAGE_LABELS[stage]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client notes */}
          {campaign.clientNotes && (
            <Card>
              <CardHeader>
                <CardTitle>Campaign Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6b6866] leading-relaxed whitespace-pre-wrap">
                  {campaign.clientNotes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Backlinks */}
          <div id="backlinks">
            <Card>
              <CardHeader>
                <CardTitle>Delivered Backlinks & Media Mentions</CardTitle>
              </CardHeader>
              <CardContent>
                {campaignBacklinks.length === 0 ? (
                  <div className="py-10 text-center">
                    <Link2 className="w-8 h-8 text-[#2a2a2a] mx-auto mb-3" />
                    <p className="text-sm text-[#9a9793]">
                      Delivered links and media mentions will appear here once reviewed by our team.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0ddd8]">
                          {[
                            "Publication",
                            "Target URL",
                            "Anchor",
                            "DR",
                            "Type",
                            "Status",
                            "Date",
                            "",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left py-3 px-2 text-xs font-medium text-[#9a9793] first:pl-0 last:pr-0"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2a2a2a]">
                        {campaignBacklinks.map((bl) => (
                          <tr key={bl.id} className="hover:bg-[#ebe8e2]/50 transition-colors">
                            <td className="py-3 px-2 pl-0 font-medium text-[#1a1a1a]">
                              {bl.publicationName}
                            </td>
                            <td className="py-3 px-2 text-[#9a9793] max-w-[120px] truncate">
                              {bl.targetUrl ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-[#9a9793]">{bl.anchorText ?? "—"}</td>
                            <td className="py-3 px-2 text-[#9a9793]">{bl.domainRating ?? "—"}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                                  LINK_TYPE_BADGE[bl.linkType] ?? LINK_TYPE_BADGE.unknown
                                }`}
                              >
                                {bl.linkType.replace(/_/g, " ")}
                              </span>
                            </td>
                            <td className="py-3 px-2">
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
                            <td className="py-3 px-2 text-[#9a9793] text-xs whitespace-nowrap">
                              {formatDate(bl.dateLive)}
                            </td>
                            <td className="py-3 px-2 pr-0">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Reports */}
          <div id="reports">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {campaignReports.length === 0 ? (
                  <div className="py-10 text-center">
                    <FileText className="w-8 h-8 text-[#2a2a2a] mx-auto mb-3" />
                    <p className="text-sm text-[#9a9793]">
                      Reports will appear here once your campaign has updates.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {campaignReports.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start justify-between gap-4 rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-5"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-[#1a1a1a]">{r.title}</p>
                            {r.reportMonth && (
                              <Badge variant="secondary">{r.reportMonth}</Badge>
                            )}
                          </div>
                          {r.summary && (
                            <p className="text-sm text-[#9a9793] leading-relaxed">{r.summary}</p>
                          )}
                          <p className="text-xs text-[#b5b2ad] mt-2">{formatDate(r.createdAt)}</p>
                        </div>
                        {r.reportUrl && (
                          <a
                            href={r.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-[#f97316] hover:text-[#fdba74] font-medium whitespace-nowrap"
                          >
                            View Report
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
        </>
      )}
    </div>
  );
}
