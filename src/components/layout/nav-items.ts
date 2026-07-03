import { LayoutDashboard, Package, FolderOpen, ShoppingBag, Settings } from "lucide-react";

export const mainNavItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/products", label: "Products", icon: Package },
  { href: "/collections", label: "Collections", icon: FolderOpen },
] as const;

// Rendered separately, pinned to the bottom of the desktop sidebar
// (matching Shopify's own admin layout).
export const settingsNavItem = { href: "/settings", label: "Settings", icon: Settings } as const;

// Flat list for the mobile bottom nav, which has no room for a separately
// pinned Settings item.
export const navItems = [...mainNavItems, settingsNavItem] as const;
