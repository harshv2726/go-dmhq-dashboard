"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Product, ProductVariant } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";

interface Row {
  productId: string;
  productName: string;
  variant: ProductVariant;
}

export default function InventoryPage() {
  const {
    data: products,
    isLoading,
    mutate,
  } = useSWR<Product[]>("/api/v1/seller/products", (path: string) => api.get<Product[]>(path));
  const [savingId, setSavingId] = useState<string | null>(null);

  const rows: Row[] = (products ?? []).flatMap((p) =>
    p.variants.map((v) => ({ productId: p.id, productName: p.name, variant: v })),
  );

  async function updateStock(row: Row, qty: number) {
    if (Number.isNaN(qty) || qty < 0) return;
    setSavingId(row.variant.id);
    try {
      await api.put(`/api/v1/seller/products/${row.productId}/variants/${row.variant.id}`, { inventory_quantity: qty });
      mutate(
        (current) =>
          current?.map((p) => {
            if (p.id !== row.productId) return p;
            const variants = p.variants.map((v) => (v.id === row.variant.id ? { ...v, inventory_quantity: qty } : v));
            return { ...p, variants, total_inventory: variants.reduce((sum, v) => sum + v.inventory_quantity, 0) };
          }),
        { revalidate: false },
      );
      toast.success("Stock updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update stock");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description="Manage stock across every product variant." />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.variant.id}>
                  <TableCell className="max-w-xs truncate font-medium" title={row.productName}>
                    {row.productName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.variant.title === "Default Title" ? "—" : row.variant.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.variant.sku ?? "—"}</TableCell>
                  <TableCell>₹{row.variant.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      key={row.variant.id}
                      type="number"
                      min={0}
                      className="w-24"
                      defaultValue={row.variant.inventory_quantity}
                      disabled={savingId === row.variant.id}
                      onBlur={(e) => {
                        const qty = Number(e.target.value);
                        if (qty !== row.variant.inventory_quantity) updateStock(row, qty);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
