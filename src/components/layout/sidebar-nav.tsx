"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleHelp, CirclePlus, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { mainNavItems, settingsNavItem } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-0.75 rounded-[6px] p-1.5 text-sm transition-colors",
        active ? "bg-[#eaeaea]" : "hover:bg-[#eaeaea]",
        className,
      )}
    >
      <span className="flex items-center">
        <Icon className="size-3.5" />
      </span>
      {label}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="list-none space-y-0.5">
        <li>
          <Link
            href="/products/new"
            onClick={onNavigate}
            className="flex items-center gap-0.75 rounded-[6px] bg-foreground p-1.5 text-sm text-background"
          >
            <CirclePlus className="size-3.5" />
            New product
          </Link>
        </li>
        {mainNavItems.map((item) => {
          if (!("children" in item)) {
            return (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} icon={item.icon} active={isActiveHref(pathname, item.href)} onNavigate={onNavigate} />
              </li>
            );
          }

          const sectionActive = isActiveHref(pathname, item.href) || item.children.some((c) => isActiveHref(pathname, c.href));

          return (
            <li key={item.href}>
              <Collapsible defaultOpen={sectionActive}>
                <div className="flex items-center">
                  <NavLink href={item.href} label={item.label} icon={item.icon} active={isActiveHref(pathname, item.href)} onNavigate={onNavigate} className="flex-1" />
                  <CollapsibleTrigger className="group rounded-[6px] p-1.5 hover:bg-[#eaeaea]">
                    <ChevronRight className="size-3.5 transition-transform group-data-[state=open]:rotate-90" />
                    <span className="sr-only">Toggle {item.label}</span>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <ul className="ml-4 list-none space-y-0.5 border-l border-[#f1f1f1] pl-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavLink href={child.href} label={child.label} icon={child.icon} active={isActiveHref(pathname, child.href)} onNavigate={onNavigate} />
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>
          );
        })}
      </ul>
      <ul className="list-none space-y-0.5">
        <li>
          <NavLink
            href={settingsNavItem.href}
            label={settingsNavItem.label}
            icon={settingsNavItem.icon}
            active={isActiveHref(pathname, settingsNavItem.href)}
            onNavigate={onNavigate}
          />
        </li>
        <li>
          <button
            disabled
            title="Help — coming soon"
            className="flex w-full cursor-not-allowed items-center gap-0.75 rounded-[6px] p-1.5 text-left text-sm opacity-60"
          >
            <CircleHelp className="size-3.5" />
            Help
          </button>
        </li>
      </ul>
    </div>
  );
}
