"use client";

import Link from "next/link";
import { CirclePlusIcon, StoreIcon } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { mainNavItems, settingsNavItem } from "@/components/layout/nav-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useStore } from "@/lib/use-store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { store } = useStore();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/">
                <StoreIcon className="size-5!" />
                <span className="text-base font-semibold">{store?.name ?? "DMHQ"}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={mainNavItems.map((item) => ({ title: item.label, url: item.href, icon: <item.icon /> }))}
          quickCreate={{ label: "New product", url: "/products/new", icon: <CirclePlusIcon /> }}
        />
        <NavSecondary
          items={[{ title: settingsNavItem.label, url: settingsNavItem.href, icon: <settingsNavItem.icon /> }]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
