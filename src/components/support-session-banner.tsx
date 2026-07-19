"use client";

import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAccessToken } from "@/lib/api";

const SUPERBOARD_URL = process.env.NEXT_PUBLIC_SUPERBOARD_URL ?? "http://localhost:3002";

// Shown for the lifetime of a support acting session (see
// AuthUser.isSupportSession) so it's always visible to whoever is at the
// keyboard — the seller if they check back, and the support agent as a
// constant reminder they're inside someone else's store.
export function SupportSessionBanner() {
  function exit() {
    setAccessToken(null);
    window.location.href = SUPERBOARD_URL;
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-warning px-4 py-2 text-sm text-warning-foreground">
      <div className="flex items-center gap-2">
        <ShieldAlert className="size-4 shrink-0" />
        <span>You&apos;re viewing this store as DMHQ Support. Every action here is logged.</span>
      </div>
      <Button size="sm" variant="outline" className="shrink-0 bg-transparent" onClick={exit}>
        Exit support session
      </Button>
    </div>
  );
}
