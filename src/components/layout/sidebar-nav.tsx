"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, type LucideIcon } from "lucide-react";
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
  icon?: LucideIcon;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 rounded-[6px] p-1.5 text-sm transition-colors",
        active ? "bg-[#eaeaea]" : "hover:bg-[#eaeaea]",
        className,
      )}
    >
      {Icon && (
        <span className="flex items-center">
          <Icon className="size-3.5" />
        </span>
      )}
      {label}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="list-none space-y-0.5">
        {mainNavItems.map((item) => {
          if (!("children" in item)) {
            return (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} icon={item.icon} active={isActiveHref(pathname, item.href)} onNavigate={onNavigate} />
              </li>
            );
          }

          return (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} icon={item.icon} active={isActiveHref(pathname, item.href)} onNavigate={onNavigate} />
              <ul className="ml-1.75 list-none space-y-0.5 border-l border-[#e5e5e5] py-0.5 pl-3.25">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavLink href={child.href} label={child.label} active={isActiveHref(pathname, child.href)} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
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
            className="flex w-full cursor-not-allowed items-center gap-2 rounded-[6px] p-1.5 text-left text-sm opacity-60"
          >
            <CircleHelp className="size-3.5" />
            Help
          </button>
        </li>
      </ul>
    </div>
  );
}
