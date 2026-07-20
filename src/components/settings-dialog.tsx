"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/lib/use-store";
import { settingsSections, type SettingsSectionKey } from "@/components/layout/nav-items";
import { GeneralBrandForm } from "@/components/settings/general-brand-form";
import { ShippingSettingsForm } from "@/components/settings/shipping-settings-form";
import { TaxSettingsForm } from "@/components/settings/tax-settings-form";
import { PoliciesSettingsForm } from "@/components/settings/policies-settings-form";
import { NotificationsSettingsForm } from "@/components/settings/notifications-settings-form";
import { AnalyticsSettingsForm } from "@/components/settings/analytics-settings-form";
import { AccessRequestsSettingsForm } from "@/components/settings/access-requests-settings-form";
import { BillingSettingsForm } from "@/components/settings/billing-settings-form";
import { DeveloperSettingsForm } from "@/components/settings/developer-settings-form";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection: SettingsSectionKey;
  onActiveSectionChange: (section: SettingsSectionKey) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  activeSection: active,
  onActiveSectionChange,
}: SettingsDialogProps) {
  const { store, isLoading, refresh } = useStore();

  const activeLabel = settingsSections.find((s) => s.key === active)?.label ?? "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[600px] md:max-w-[750px] lg:max-w-[850px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Manage your store settings.</DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {settingsSections.map((section) => (
                      <SidebarMenuItem key={section.key}>
                        <SidebarMenuButton
                          isActive={section.key === active}
                          onClick={() => onActiveSectionChange(section.key)}
                        >
                          <section.icon />
                          <span>{section.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[560px] flex-1 flex-col overflow-hidden">
            <header className="flex h-14 shrink-0 items-center border-b px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {isLoading || !store ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <>
                  {active === "general" && (
                    <GeneralBrandForm key={`general-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "shipping" && (
                    <ShippingSettingsForm key={`shipping-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "taxes" && <TaxSettingsForm key={`taxes-${store.id}`} initial={store} onSaved={refresh} />}
                  {active === "policies" && (
                    <PoliciesSettingsForm key={`policies-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "notifications" && (
                    <NotificationsSettingsForm key={`notifications-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "analytics" && (
                    <AnalyticsSettingsForm key={`analytics-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "billing" && (
                    <BillingSettingsForm key={`billing-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "developer" && (
                    <DeveloperSettingsForm key={`developer-${store.id}`} initial={store} onSaved={refresh} />
                  )}
                  {active === "access-requests" && <AccessRequestsSettingsForm />}
                </>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
