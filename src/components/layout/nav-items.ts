import { LayoutDashboard, Package, FolderOpen, ShoppingBag, Settings } from "lucide-react";

export const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/collections", label: "Collections", icon: FolderOpen },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;
