"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useStore } from "@/lib/use-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SettingsDialog } from "@/components/settings-dialog";
import { SupportSessionBanner } from "@/components/support-session-banner";
import { PendingAccessRequestBanner } from "@/components/pending-access-request-banner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { SettingsSectionKey } from "@/components/layout/nav-items";

function hasActivePlan(planExpiresAt: string | null): boolean {
  return planExpiresAt !== null && new Date(planExpiresAt) > new Date();
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  // A support acting session (see SupportSessionBanner) must never be
  // bounced to onboarding — support needs to reach any store regardless of
  // its billing state, precisely including one whose plan lapsed.
  const { store, isLoading: storeLoading } = useStore();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState<SettingsSectionKey>("general");

  function openSettings(section: SettingsSectionKey = "general") {
    setSettingsSection(section);
    setSettingsOpen(true);
  }

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  useEffect(() => {
    if (isLoading || !user || user.isSupportSession || storeLoading || !store) return;
    if (!hasActivePlan(store.plan_expires_at)) router.replace("/onboarding");
  }, [isLoading, user, storeLoading, store, router]);

  const planGateBlocking = user && !user.isSupportSession && (storeLoading || !store || !hasActivePlan(store.plan_expires_at));

  if (isLoading || !user || planGateBlocking) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar onOpenSettings={() => openSettings()} />
      <SidebarInset>
        {user.isSupportSession ? <SupportSessionBanner /> : <PendingAccessRequestBanner />}
        <SiteHeader onOpenSettings={openSettings} />
        <div className="@container/main flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 md:px-8">{children}</div>
      </SidebarInset>
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        activeSection={settingsSection}
        onActiveSectionChange={setSettingsSection}
      />
    </SidebarProvider>
  );
}
