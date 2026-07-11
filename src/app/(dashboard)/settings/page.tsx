"use client";

import { useStore } from "@/lib/use-store";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneralBrandForm } from "@/components/settings/general-brand-form";
import { ShippingSettingsForm } from "@/components/settings/shipping-settings-form";
import { TaxSettingsForm } from "@/components/settings/tax-settings-form";
import { PoliciesSettingsForm } from "@/components/settings/policies-settings-form";
import { NotificationsSettingsForm } from "@/components/settings/notifications-settings-form";
import { AnalyticsSettingsForm } from "@/components/settings/analytics-settings-form";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  const { store, isLoading, refresh } = useStore();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="General store details and branding." />

      {isLoading || !store ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <>
          <GeneralBrandForm key={`general-${store.id}`} initial={store} onSaved={refresh} />
          <ShippingSettingsForm key={`shipping-${store.id}`} initial={store} onSaved={refresh} />
          <TaxSettingsForm key={`tax-${store.id}`} initial={store} onSaved={refresh} />
          <PoliciesSettingsForm key={`policies-${store.id}`} initial={store} onSaved={refresh} />
          <NotificationsSettingsForm key={`notifications-${store.id}`} initial={store} onSaved={refresh} />
          <AnalyticsSettingsForm key={`analytics-${store.id}`} initial={store} onSaved={refresh} />
        </>
      )}
    </div>
  );
}
