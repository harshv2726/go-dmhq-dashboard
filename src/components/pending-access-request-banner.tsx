"use client";

import useSWR from "swr";
import { toast } from "sonner";
import { ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { AccessRequest } from "@/lib/types";

const POLL_INTERVAL_MS = 30_000;

// Surfaces a DMHQ support access request the instant an owner is looking
// at the dashboard, rather than relying only on the email/SMS alert.
// Gated to owners because the underlying endpoint is owner-only (a
// manager/staff member approving would hand out more than they have).
export function PendingAccessRequestBanner() {
  const { user } = useAuth();
  const isOwner = user?.staffRole === "owner";

  const { data, mutate, isLoading } = useSWR<AccessRequest[]>(
    isOwner ? "/api/v1/seller/access-requests/pending" : null,
    (path: string) => api.get<AccessRequest[]>(path),
    { refreshInterval: POLL_INTERVAL_MS },
  );

  if (!isOwner || isLoading || !data || data.length === 0) return null;

  const [next, ...rest] = data;

  async function respond(action: "approve" | "deny") {
    try {
      await api.post(`/api/v1/seller/access-requests/${next.id}/${action}`, {});
      toast.success(action === "approve" ? "Access approved" : "Access denied");
      mutate();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : `Failed to ${action} request`);
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-info px-4 py-2.5 text-sm text-info-foreground sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2">
        <ShieldQuestion className="mt-0.5 size-4 shrink-0" />
        <span>
          DMHQ Support is requesting access to your store: &ldquo;{next.reason}&rdquo;
          {rest.length > 0 && ` (+${rest.length} more pending)`}
        </span>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button size="sm" variant="outline" className="bg-transparent" onClick={() => respond("deny")}>
          Deny
        </Button>
        <Button size="sm" variant="secondary" onClick={() => respond("approve")}>
          Approve
        </Button>
      </div>
    </div>
  );
}
