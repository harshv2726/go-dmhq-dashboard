"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { useStore } from "@/lib/use-store";
import type { DashboardStats } from "@/lib/types";
import { SectionCards } from "@/components/section-cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardHomePage() {
  const { store } = useStore();
  const { data: stats, isLoading } = useSWR<DashboardStats>("/api/v1/seller/dashboard/stats", (path: string) =>
    api.get<DashboardStats>(path),
  );

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: store?.currency ?? "INR" }).format(amount);
  }

  const skeleton = <Skeleton className="h-8 w-20" />;
  const items = [
    { label: "Pending orders", value: isLoading || !stats ? skeleton : stats.pending_orders },
    { label: "Total orders", value: isLoading || !stats ? skeleton : stats.total_orders },
    { label: "Products", value: isLoading || !stats ? skeleton : stats.total_products },
    { label: "Revenue", value: isLoading || !stats ? skeleton : formatCurrency(stats.total_revenue) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">A quick look at how your store is doing.</p>
      </div>
      <SectionCards items={items} />
    </div>
  );
}
