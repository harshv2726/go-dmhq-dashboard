"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useStore } from "@/lib/use-store";
import { PlanPicker } from "@/components/billing/plan-picker";
import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { store, isLoading: storeLoading, refresh } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  if (authLoading || !user || storeLoading || !store) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-4 h-64 w-full" />
      </div>
    );
  }

  async function handleSubscribed() {
    await refresh();
    router.replace("/home");
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <span className="font-heading text-xl font-semibold tracking-tight">DMHQ</span>
        <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {store.plan ? "Renew your plan" : `Choose a plan for ${store.name}`}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {store.plan
            ? "Your plan has ended — pick a plan to keep using DMHQ."
            : "Pick a plan to activate your store. You can switch plans anytime."}
        </p>
      </div>

      {/* No currentPlan passed here: landing on /onboarding always means
          there's no *active* plan (first-time or just expired), so both
          cards should stay selectable rather than showing whatever plan
          string is still sitting on the store record as "current." */}
      <PlanPicker storeName={store.name} onSubscribed={handleSubscribed} />

      <button type="button" onClick={logout} className="mt-8 text-center text-sm text-muted-foreground hover:underline">
        Sign out
      </button>
    </div>
  );
}
