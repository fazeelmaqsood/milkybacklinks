"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBacklink } from "@/actions/admin";
import { Loader2, Plus, X } from "lucide-react";
import type { Campaign } from "@/lib/db/schema";

export function AdminAddBacklink({ campaigns }: { campaigns: Campaign[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    campaignId: campaigns[0]?.id ?? "",
    publicationName: "",
    publicationUrl: "",
    liveUrl: "",
    targetUrl: "",
    anchorText: "",
    domainRating: "",
    domainAuthority: "",
    linkType: "unknown" as "dofollow" | "nofollow" | "sponsored" | "mention_only" | "unknown",
    status: "live" as "pending_review" | "live" | "changed" | "removed",
    dateLive: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.campaignId || !form.publicationName) return;
    setLoading(true);

    await createBacklink({
      campaignId: form.campaignId,
      publicationName: form.publicationName,
      publicationUrl: form.publicationUrl || undefined,
      liveUrl: form.liveUrl || undefined,
      targetUrl: form.targetUrl || undefined,
      anchorText: form.anchorText || undefined,
      domainRating: form.domainRating ? parseInt(form.domainRating, 10) : undefined,
      domainAuthority: form.domainAuthority ? parseInt(form.domainAuthority, 10) : undefined,
      linkType: form.linkType,
      status: form.status,
      dateLive: form.dateLive || undefined,
      notes: form.notes || undefined,
    });

    setLoading(false);
    setOpen(false);
    setForm((p) => ({ ...p, publicationName: "", liveUrl: "", targetUrl: "", anchorText: "", dateLive: "" }));
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
        <Plus className="w-3.5 h-3.5" />
        Add Backlink
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-[#e0ddd8] bg-[#f2f0eb] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#1a1a1a]">Add Backlink / Media Mention</h3>
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
            <Label className="text-xs">Publication Name *</Label>
            <Input
              value={form.publicationName}
              onChange={(e) => setForm((p) => ({ ...p, publicationName: e.target.value }))}
              placeholder="e.g. TechCrunch"
              className="h-8 text-xs"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Live URL</Label>
            <Input
              value={form.liveUrl}
              onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))}
              placeholder="https://..."
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Target URL</Label>
            <Input
              value={form.targetUrl}
              onChange={(e) => setForm((p) => ({ ...p, targetUrl: e.target.value }))}
              placeholder="https://client.com/page"
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Anchor Text</Label>
            <Input
              value={form.anchorText}
              onChange={(e) => setForm((p) => ({ ...p, anchorText: e.target.value }))}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Domain Rating</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={form.domainRating}
              onChange={(e) => setForm((p) => ({ ...p, domainRating: e.target.value }))}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Link Type</Label>
            <Select value={form.linkType} onValueChange={(v) => setForm((p) => ({ ...p, linkType: v as typeof form.linkType }))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["dofollow", "nofollow", "sponsored", "mention_only", "unknown"].map((t) => (
                  <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v as typeof form.status }))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["pending_review", "live", "changed", "removed"].map((s) => (
                  <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Date Live</Label>
            <Input
              type="date"
              value={form.dateLive}
              onChange={(e) => setForm((p) => ({ ...p, dateLive: e.target.value }))}
              className="h-8 text-xs"
            />
          </div>
        </div>

        <Button type="submit" size="sm" disabled={loading}>
          {loading ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</> : "Add Backlink"}
        </Button>
      </form>
    </div>
  );
}
