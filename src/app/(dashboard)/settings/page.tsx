"use client";

import { useStore } from "@/lib/use-store";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneralBrandForm } from "@/components/settings/general-brand-form";

export default function SettingsPage() {
  const { store, isLoading, refresh } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          General store details and branding. More settings (shipping, taxes, notifications, team) are coming soon.
        </p>
      </div>

      {isLoading || !store ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        // key forces a remount (fresh local form state) if the store itself
        // ever changes identity, e.g. after switching accounts.
        <GeneralBrandForm key={store.id} initial={store} onSaved={refresh} />
      )}
    </div>
  );
}
