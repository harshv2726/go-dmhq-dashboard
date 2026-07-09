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

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="px-2 pt-3 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground/70 uppercase first:pt-0">
      {children}
    </div>
  );
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
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        active ? "bg-blue-500 text-white" : "text-foreground/90 hover:bg-black/5",
        className,
      )}
    >
      <span className="flex items-center">
        <Icon className="size-4" />
      </span>
      {label}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <ul className="list-none space-y-0.5">
          <li>
            <Link
              href="/products/new"
              onClick={onNavigate}
              className="flex items-center gap-2 rounded-md bg-foreground px-2 py-1.5 text-sm text-background"
            >
              <CirclePlus className="size-4" />
              New product
            </Link>
          </li>
        </ul>

        <SectionLabel>Store</SectionLabel>
        <ul className="list-none space-y-0.5">
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
                    <CollapsibleTrigger className="group rounded-md p-1.5 hover:bg-black/5">
                      <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
                      <span className="sr-only">Toggle {item.label}</span>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <ul className="list-none space-y-0.5 py-0.5 pl-6">
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
      </div>

      <div>
        <SectionLabel>General</SectionLabel>
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
              className="flex w-full cursor-not-allowed items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground/90 opacity-60"
            >
              <CircleHelp className="size-4" />
              Help
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
