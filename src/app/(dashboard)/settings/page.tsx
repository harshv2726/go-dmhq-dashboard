"use client";

import { useStore } from "@/lib/use-store";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneralBrandForm } from "@/components/settings/general-brand-form";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  const { store, isLoading, refresh } = useStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="General store details and branding. More settings (shipping, taxes, notifications, team) are coming soon."
      />

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
