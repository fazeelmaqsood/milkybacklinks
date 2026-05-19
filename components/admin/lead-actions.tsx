"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateLeadStatus } from "@/actions/admin";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "pending_payment", label: "Pending Payment" },
  { value: "paid", label: "Paid" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "rejected", label: "Rejected" },
];

export function AdminLeadActions({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await updateLeadStatus(leadId, status);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="h-8 text-xs w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        variant="outline"
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="h-8 text-xs"
      >
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
      </Button>
    </div>
  );
}
