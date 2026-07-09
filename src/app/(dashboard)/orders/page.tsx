"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { api } from "@/lib/api";
import type { Order, OrderStatus, Paginated } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/orders/status-badge";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";

const PAGE_SIZE = 50;

const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [page, setPage] = useState(1);
  const qs = status === "all" ? "" : `&status=${status}`;
  const { data: response, isLoading } = useSWR<Paginated<Order>>(
    `/api/v1/seller/orders?page=${page}&limit=${PAGE_SIZE}${qs}`,
    (path: string) => api.get<Paginated<Order>>(path),
  );

  function handleStatusChange(v: OrderStatus | "all") {
    setStatus(v);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track and fulfill customer orders."
        action={
          <Select value={status} onValueChange={(v) => handleStatusChange(v as OrderStatus | "all")}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : response.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Placed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.items.map((o) => (
                  <TableRow key={o.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-xs">
                      <Link href={`/orders/${o.id}`} className="hover:underline">
                        #{o.id.slice(0, 8)}
                      </Link>
                    </TableCell>
                    <TableCell>{o.items.length}</TableCell>
                    <TableCell>₹{o.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationControls
            page={response.page}
            totalPages={response.total_pages}
            total={response.total}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
