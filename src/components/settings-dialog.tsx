"use client";

import { useState } from "react";
import { Bell, ChartNoAxesColumn, FileText, Percent, Store as StoreIcon, Truck } from "lucide-react";
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
import { GeneralBrandForm } from "@/components/settings/general-brand-form";
import { ShippingSettingsForm } from "@/components/settings/shipping-settings-form";
import { TaxSettingsForm } from "@/components/settings/tax-settings-form";
import { PoliciesSettingsForm } from "@/components/settings/policies-settings-form";
import { NotificationsSettingsForm } from "@/components/settings/notifications-settings-form";
import { AnalyticsSettingsForm } from "@/components/settings/analytics-settings-form";

const sections = [
  { key: "general", label: "General & Brand", icon: StoreIcon },
  { key: "shipping", label: "Shipping & Delivery", icon: Truck },
  { key: "taxes", label: "Taxes", icon: Percent },
  { key: "policies", label: "Policies", icon: FileText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "analytics", label: "Analytics", icon: ChartNoAxesColumn },
] as const;

type SectionKey = (typeof sections)[number]["key"];

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [active, setActive] = useState<SectionKey>("general");
  const { store, isLoading, refresh } = useStore();

  const activeLabel = sections.find((s) => s.key === active)?.label ?? "";

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
                    {sections.map((section) => (
                      <SidebarMenuItem key={section.key}>
                        <SidebarMenuButton isActive={section.key === active} onClick={() => setActive(section.key)}>
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
                </>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
