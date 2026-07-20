"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { SettingsSectionKey } from "@/components/layout/nav-items";

interface SiteHeaderProps {
  onOpenSettings: (section: SettingsSectionKey) => void;
}

export function SiteHeader({ onOpenSettings }: SiteHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </div>
        <div className="flex justify-center">
          <CommandPalette onOpenSettings={onOpenSettings} />
        </div>
        <div className="flex items-center gap-1 justify-self-end">
          <ThemeToggle />
          <Tooltip>
            {/* span wrapper: a disabled button has pointer-events-none, which would
                also block the tooltip's hover trigger */}
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  aria-label="Notifications — coming soon"
                  className="pointer-events-none"
                >
                  <Bell className="size-4" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Notifications — coming soon</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
