"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateCampaign } from "@/actions/admin";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { Campaign } from "@/lib/db/schema";

const STATUSES = [
  "onboarding", "payment_confirmed", "research", "pr_angles",
  "outreach", "links_review", "reporting", "completed", "paused", "cancelled",
];

const STAGES = [
  "onboarding_received", "payment_confirmed", "campaign_research",
  "pr_angles_prepared", "outreach_in_progress", "mentions_review",
  "report_delivered", "campaign_completed",
];

export function AdminCampaignEditor({ campaign }: { campaign: Campaign }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [status, setStatus] = useState(campaign.status);
  const [stage, setStage] = useState(campaign.progressStage);
  const [linksDelivered, setLinksDelivered] = useState(String(campaign.linksDelivered));
  const [internalNotes, setInternalNotes] = useState(campaign.internalNotes ?? "");
  const [clientNotes, setClientNotes] = useState(campaign.clientNotes ?? "");
  const [dueDate, setDueDate] = useState(
    campaign.dueDate ? new Date(campaign.dueDate).toISOString().split("T")[0] : ""
  );

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    await updateCampaign(campaign.id, {
      status,
      progressStage: stage,
      linksDelivered: parseInt(linksDelivered, 10) || 0,
      internalNotes,
      clientNotes,
      dueDate: dueDate || undefined,
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-[#f97316] hover:text-[#fdba74] transition-colors"
      >
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {open ? "Hide editor" : "Edit campaign"}
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-[#e0ddd8] pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Campaign["status"])}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Progress Stage</Label>
              <Select value={stage} onValueChange={(v) => setStage(v as Campaign["progressStage"])}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Links Delivered</Label>
              <Input
                value={linksDelivered}
                onChange={(e) => setLinksDelivered(e.target.value)}
                type="number"
                min="0"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Internal Notes (not visible to client)</Label>
            <Textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={2}
              placeholder="Internal team notes..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Client Notes (visible to client in dashboard)</Label>
            <Textarea
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              rows={2}
              placeholder="Updates shown to the client..."
            />
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" onClick={handleSave} disabled={loading}>
              {loading ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
              ) : saved ? (
                "Saved ✓"
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
