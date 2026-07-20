import {
  Bell,
  Boxes,
  ChartNoAxesColumn,
  Code2,
  CreditCard,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  Package,
  Percent,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store as StoreIcon,
  Truck,
  Users,
} from "lucide-react";

export const mainNavItems = [
  { href: "/home", label: "Home", icon: LayoutDashboard },
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
  {
    href: "/navigation",
    label: "Storefront",
    icon: StoreIcon,
    children: [{ href: "/navigation", label: "Navigation", icon: Menu }],
  },
  { href: "/customers", label: "Customers", icon: Users },
] as const;

// Rendered separately, pinned to the bottom of the desktop sidebar
// (matching Shopify's own admin layout).
export const settingsNavItem = { href: "/settings", label: "Settings", icon: Settings } as const;

// Settings is a dialog, not a route (see settings-dialog.tsx) — this is the
// single source of truth for its sections, shared with the command palette.
export const settingsSections = [
  { key: "general", label: "General & Brand", icon: StoreIcon },
  { key: "shipping", label: "Shipping & Delivery", icon: Truck },
  { key: "taxes", label: "Taxes", icon: Percent },
  { key: "policies", label: "Policies", icon: FileText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "analytics", label: "Analytics", icon: ChartNoAxesColumn },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "developer", label: "Developer", icon: Code2 },
  { key: "access-requests", label: "Access Requests", icon: ShieldCheck },
] as const;

export type SettingsSectionKey = (typeof settingsSections)[number]["key"];
