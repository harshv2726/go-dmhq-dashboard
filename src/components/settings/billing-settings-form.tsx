"use client";

import { PlanPicker } from "@/components/billing/plan-picker";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/types";
import type { Store } from "@/lib/types";

interface BillingSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

function hasActivePlan(store: Store): boolean {
  return store.plan_expires_at !== null && new Date(store.plan_expires_at) > new Date();
}

export function BillingSettingsForm({ initial, onSaved }: BillingSettingsFormProps) {
  const active = hasActivePlan(initial);
  const currentPlanInfo = active ? PLANS.find((p) => p.key === initial.plan) : undefined;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>
            {active && currentPlanInfo && initial.plan_expires_at
              ? `${currentPlanInfo.name} (${currentPlanInfo.priceLabel}) — renews or expires ${new Date(initial.plan_expires_at).toLocaleDateString(undefined, { dateStyle: "medium" })}.`
              : "No active plan."}
          </CardDescription>
        </CardHeader>
      </Card>

      <div>
        <h3 className="text-sm font-semibold">{active ? "Change plan" : "Choose a plan"}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Switching plans starts a new payment for the new plan&apos;s price and resets your billing period.
        </p>
        <div className="mt-4">
          <PlanPicker storeName={initial.name} currentPlan={active ? initial.plan || undefined : undefined} onSubscribed={onSaved} />
        </div>
      </div>
    </div>
  );
}
