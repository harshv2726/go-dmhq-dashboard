"use client";

import useSWR from "swr";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { AccessRequest, AccessRequestStatus, Paginated } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/layout/empty-state";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles: Record<AccessRequestStatus, string> = {
  pending: "bg-info/15 text-info hover:bg-info/15",
  approved: "bg-success/15 text-success hover:bg-success/15",
  denied: "bg-muted text-muted-foreground hover:bg-muted",
  revoked: "bg-destructive/15 text-destructive hover:bg-destructive/15",
  expired: "bg-muted text-muted-foreground hover:bg-muted",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export function AccessRequestsSettingsForm() {
  const { data, mutate, isLoading } = useSWR<Paginated<AccessRequest>>(
    "/api/v1/seller/access-requests",
    (path: string) => api.get<Paginated<AccessRequest>>(path),
  );

  async function respond(id: string, action: "approve" | "deny" | "revoke") {
    try {
      await api.post(`/api/v1/seller/access-requests/${id}/${action}`, {});
      toast.success(
        action === "approve" ? "Access approved" : action === "deny" ? "Access denied" : "Access revoked",
      );
      mutate();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : `Failed to ${action} request`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access requests</CardTitle>
        <CardDescription>
          DMHQ support only ever sees your store&apos;s data if you approve a request here — every action they take
          while approved is logged.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : data.items.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="No access requests"
            description="You'll see it here if DMHQ support ever asks to access your store."
          />
        ) : (
          <div className="divide-y divide-border rounded-lg border">
            {data.items.map((req) => (
              <div key={req.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={cn("capitalize", statusStyles[req.status])}>
                      {req.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(req.created_at)}</span>
                  </div>
                  <p className="mt-1 text-sm">{req.reason}</p>
                  {req.status === "approved" && req.expires_at && (
                    <p className="mt-0.5 text-xs text-muted-foreground">Expires {formatDate(req.expires_at)}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  {req.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => respond(req.id, "deny")}>
                        Deny
                      </Button>
                      <Button size="sm" onClick={() => respond(req.id, "approve")}>
                        Approve
                      </Button>
                    </>
                  )}
                  {req.status === "approved" && (
                    <Button size="sm" variant="destructive" onClick={() => respond(req.id, "revoke")}>
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
