"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavItems, settingsNavItem } from "./nav-items";
import type { LucideIcon } from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon };

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-secondary font-medium text-secondary-foreground"
          : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground",
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:justify-between md:border-r md:bg-background">
      <nav className="space-y-0.5 px-2 py-3">
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>
      <div className="space-y-0.5 border-t px-2 py-3">
        <NavLink item={settingsNavItem} active={isActive(settingsNavItem.href)} />
      </div>
    </aside>
  );
}
