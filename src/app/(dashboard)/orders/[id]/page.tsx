"use client";

import { use, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Order, OrderStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/orders/status-badge";
import { PageHeader } from "@/components/layout/page-header";

const statuses: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const {
    data: order,
    isLoading,
    mutate,
  } = useSWR<Order>(`/api/v1/seller/orders/${id}`, (path: string) => api.get<Order>(path));
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(status: OrderStatus) {
    if (!order) return;
    setIsUpdating(true);
    try {
      await api.put(`/api/v1/seller/orders/${id}/status`, { status });
      mutate({ ...order, status }, { revalidate: false });
      toast.success(`Order marked as ${status}`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  }

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (!order) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Order #${order.id.slice(0, 8)}`}
        description={`Placed ${new Date(order.created_at).toLocaleString()}`}
        action={<OrderStatusBadge status={order.status} />}
      />

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {item.name}
                    {item.variant_label && <span className="text-muted-foreground"> ({item.variant_label})</span>}
                  </TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell className="text-right">₹{item.subtotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="ml-auto max-w-52 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹{order.shipping_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{order.tax_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fulfillment</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Select value={order.status} onValueChange={(v) => updateStatus(v as OrderStatus)} disabled={isUpdating}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {order.notes && <p className="text-sm text-muted-foreground">Note: {order.notes}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
