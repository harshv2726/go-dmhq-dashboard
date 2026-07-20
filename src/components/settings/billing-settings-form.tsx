"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import { PlanPicker } from "@/components/billing/plan-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/types";
import type { Store } from "@/lib/types";

interface BillingSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

function hasActivePlan(store: Store): boolean {
  return store.plan_expires_at !== null && new Date(store.plan_expires_at) > new Date();
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function BillingSettingsForm({ initial, onSaved }: BillingSettingsFormProps) {
  const [cancelling, setCancelling] = useState(false);
  const active = hasActivePlan(initial);
  const cancelled = active && initial.plan_cancelled_at !== null;
  const currentPlanInfo = active ? PLANS.find((p) => p.key === initial.plan) : undefined;

  async function cancelPlan() {
    setCancelling(true);
    try {
      await api.post("/api/v1/seller/billing/cancel");
      toast.success("Plan cancelled — you'll keep access until it expires.");
      onSaved();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to cancel plan");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>
            {active && currentPlanInfo && initial.plan_expires_at
              ? cancelled
                ? `${currentPlanInfo.name} (${currentPlanInfo.priceLabel}) — cancelled, access ends ${formatDate(initial.plan_expires_at)}.`
                : `${currentPlanInfo.name} (${currentPlanInfo.priceLabel}) — renews or expires ${formatDate(initial.plan_expires_at)}.`
              : "No active plan."}
          </CardDescription>
        </CardHeader>
        {active && !cancelled && (
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={cancelling}>
                  Cancel plan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel your plan?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You&apos;ll keep full access until {initial.plan_expires_at && formatDate(initial.plan_expires_at)}. You can
                    resubscribe anytime before or after that to keep going.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep plan</AlertDialogCancel>
                  <AlertDialogAction onClick={cancelPlan}>Cancel plan</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        )}
      </Card>

      <div>
        <h3 className="text-sm font-semibold">{active ? "Change plan" : "Choose a plan"}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {cancelled
            ? "Subscribing to either plan below reactivates your billing and clears the cancellation."
            : "Switching plans starts a new payment for the new plan's price and resets your billing period."}
        </p>
        <div className="mt-4">
          <PlanPicker storeName={initial.name} currentPlan={active && !cancelled ? initial.plan || undefined : undefined} onSubscribed={onSaved} />
        </div>
      </div>
    </div>
  );
}
