"use client";

import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { useAuth } from "@/lib/auth-context";
import { useStore } from "@/lib/use-store";

export function SiteHeader() {
  const { user, logout } = useAuth();
  const { store } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-[#f1f1f1] px-6 py-[0.6em]">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="size-5" />
        </button>
        <span className="text-[22px] font-semibold" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          DMHQ.
        </span>
      </div>

      <nav>
        <ul className="flex list-none items-center gap-4">
          <li>
            <button
              disabled
              title="Notifications — coming soon"
              className="text-sm text-muted-foreground opacity-60 disabled:cursor-not-allowed"
            >
              Notification
            </button>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-[#c9c9c9] px-3 py-1.5 text-sm hover:bg-accent">
                  {store?.name ?? "Store"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {store?.name ?? "Account"}
                  {user && (
                    <span className="block text-xs font-normal capitalize text-muted-foreground">{user.staffRole}</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="flex w-72 flex-col p-4">
          <SheetHeader className="p-0">
            <SheetTitle className="text-[22px] font-semibold" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            DMHQ.
          </SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex-1 overflow-y-auto">
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
