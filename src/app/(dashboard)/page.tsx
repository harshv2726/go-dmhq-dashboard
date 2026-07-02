"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useStore } from "@/lib/use-store";
import type { DashboardStats } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const statConfig = [
  { key: "pending_orders", label: "Pending orders", isCurrency: false },
  { key: "total_orders", label: "Total orders", isCurrency: false },
  { key: "total_products", label: "Products", isCurrency: false },
  { key: "total_revenue", label: "Revenue", isCurrency: true },
] as const;

export default function DashboardHomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { store } = useStore();

  useEffect(() => {
    api
      .get<DashboardStats>("/api/v1/seller/dashboard/stats")
      .then(setStats)
      .finally(() => setIsLoading(false));
  }, []);

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: store?.currency ?? "INR" }).format(amount);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">A quick look at how your store is doing.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statConfig.map((s) => (
          <Card key={s.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading || !stats ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-semibold">
                  {s.isCurrency ? formatCurrency(stats[s.key]) : stats[s.key]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
