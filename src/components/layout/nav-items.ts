import { LayoutDashboard, Package, FolderOpen, ShoppingBag, Settings, Users, Boxes, type LucideIcon } from "lucide-react";

export const mainNavItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  {
    href: "/products",
    label: "Products",
    icon: Package,
    children: [
      { href: "/collections", label: "Collections", icon: FolderOpen },
      { href: "/inventory", label: "Inventory", icon: Boxes },
    ],
  },
  { href: "/customers", label: "Customers", icon: Users },
] as const;

// Rendered separately, pinned to the bottom of the desktop sidebar
// (matching Shopify's own admin layout).
export const settingsNavItem = { href: "/settings", label: "Settings", icon: Settings } as const;

// Flat list (including nested children) for title lookups and the mobile
// bottom nav, which has no room for a nested/expandable structure.
type FlatNavItem = { href: string; label: string; icon: LucideIcon };

export const navItems: FlatNavItem[] = [
  ...mainNavItems.flatMap((item): FlatNavItem[] => ("children" in item ? [item, ...item.children] : [item])),
  settingsNavItem,
];
