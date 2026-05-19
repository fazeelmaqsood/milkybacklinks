"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReport } from "@/actions/admin";
import { Loader2, Plus, X } from "lucide-react";
import type { Campaign } from "@/lib/db/schema";

export function AdminAddReport({ campaigns }: { campaigns: Campaign[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    campaignId: campaigns[0]?.id ?? "",
    title: "",
    reportMonth: "",
    summary: "",
    reportUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.campaignId || !form.title) return;
    setLoading(true);

    await createReport({
      campaignId: form.campaignId,
      title: form.title,
      reportMonth: form.reportMonth || undefined,
      summary: form.summary || undefined,
      reportUrl: form.reportUrl || undefined,
    });

    setLoading(false);
    setOpen(false);
    setForm((p) => ({ ...p, title: "", reportMonth: "", summary: "", reportUrl: "" }));
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
        <Plus className="w-3.5 h-3.5" />
        Create Report
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#1a1a1a]">Create Campaign Report</h3>
        <button onClick={() => setOpen(false)} className="text-[#9a9793] hover:text-[#1a1a1a]">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Campaign *</Label>
            <Select value={form.campaignId} onValueChange={(v) => setForm((p) => ({ ...p, campaignId: v }))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.id.slice(0, 8)}… · {c.productName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Report Month</Label>
            <Input
              value={form.reportMonth}
              onChange={(e) => setForm((p) => ({ ...p, reportMonth: e.target.value }))}
              placeholder="e.g. January 2025"
              className="h-8 text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Title *</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Month 1 Campaign Report"
            className="h-8 text-xs"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Summary</Label>
          <Textarea
            value={form.summary}
            onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
            placeholder="Campaign summary visible to client..."
            rows={3}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Report URL (optional)</Label>
          <Input
            value={form.reportUrl}
            onChange={(e) => setForm((p) => ({ ...p, reportUrl: e.target.value }))}
            placeholder="https://docs.google.com/..."
            className="h-8 text-xs"
          />
        </div>

        <Button type="submit" size="sm" disabled={loading}>
          {loading ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</> : "Create Report"}
        </Button>
      </form>
    </div>
  );
}
