"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import { PLANS, type Plan, type SubscribeResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mirrors apps/storefront's checkout Razorpay integration
// (src/app/stores/[slug]/checkout/page.tsx) almost verbatim — same manual
// <script> injection (no next/script), same widget options shape. Kept
// minimal/untyped like the original since this is the only other place
// this app talks to Razorpay.
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
}

interface PlanPickerProps {
  storeName: string;
  currentPlan?: "" | Plan;
  onSubscribed: () => void;
}

export function PlanPicker({ storeName, currentPlan, onSubscribed }: PlanPickerProps) {
  const [payingFor, setPayingFor] = useState<Plan | null>(null);

  async function subscribe(plan: Plan) {
    setPayingFor(plan);
    try {
      await loadRazorpayScript();
    } catch {
      toast.error("Couldn't load the payment widget. Check your connection and try again.");
      setPayingFor(null);
      return;
    }

    let payment: SubscribeResponse;
    try {
      payment = await api.post<SubscribeResponse>("/api/v1/seller/billing/subscribe", { plan });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to start payment");
      setPayingFor(null);
      return;
    }

    const rzp = new window.Razorpay({
      key: payment.key_id,
      amount: payment.amount,
      currency: payment.currency,
      name: "DMHQ",
      description: `${storeName} — ${PLANS.find((p) => p.key === plan)?.name} plan`,
      order_id: payment.razorpay_order_id,
      theme: { color: "#008060" },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        try {
          await api.post("/api/v1/seller/billing/verify", response);
          toast.success("Plan activated");
          onSubscribed();
        } catch (err) {
          toast.error(err instanceof ApiError ? err.message : "Payment verification failed");
        } finally {
          setPayingFor(null);
        }
      },
      modal: {
        ondismiss: () => {
          setPayingFor(null);
          toast.info("Payment cancelled. You can try again anytime.");
        },
      },
    });
    rzp.open();
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {PLANS.map((plan) => {
        const isCurrent = currentPlan === plan.key;
        return (
          <Card key={plan.key} className={cn(isCurrent && "border-primary")}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <span className="font-heading text-lg">{plan.priceLabel}</span>
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={isCurrent ? "outline" : "default"}
                disabled={payingFor !== null || isCurrent}
                onClick={() => subscribe(plan.key)}
              >
                {isCurrent ? "Current plan" : payingFor === plan.key ? "Opening payment…" : `Subscribe for ${plan.priceLabel}`}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
