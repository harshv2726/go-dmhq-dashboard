"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { Boxes, Search } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Paginated, Product, ProductVariant } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { EmptyState } from "@/components/layout/empty-state";

// Paginated at the product level (not variant level — there's no dedicated
// variant-listing endpoint), so a "page" here is every variant belonging to
// one page of products rather than a fixed row count.
const PRODUCTS_PER_PAGE = 25;

interface Row {
  productId: string;
  productName: string;
  variant: ProductVariant;
}

const stockOptions: { value: "all" | "in_stock" | "low_stock" | "out_of_stock"; label: string }[] = [
  { value: "all", label: "All stock" },
  { value: "in_stock", label: "In stock" },
  { value: "low_stock", label: "Low stock" },
  { value: "out_of_stock", label: "Out of stock" },
];

export default function InventoryPage() {
  const [stock, setStock] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  function handleStockChange(v: "all" | "in_stock" | "low_stock" | "out_of_stock") {
    setStock(v);
    setPage(1);
  }

  const stockQs = stock === "all" ? "" : `&stock=${stock}`;
  const searchQs = search ? `&search=${encodeURIComponent(search)}` : "";
  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<Paginated<Product>>(
    `/api/v1/seller/products?page=${page}&limit=${PRODUCTS_PER_PAGE}${stockQs}${searchQs}`,
    (path: string) => api.get<Paginated<Product>>(path),
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  const rows: Row[] = (response?.items ?? []).flatMap((p) =>
    p.variants.map((v) => ({ productId: p.id, productName: p.name, variant: v })),
  );

  async function updateStock(row: Row, qty: number) {
    if (Number.isNaN(qty) || qty < 0) return;
    setSavingId(row.variant.id);
    try {
      await api.put(`/api/v1/seller/products/${row.productId}/variants/${row.variant.id}`, { inventory_quantity: qty });
      mutate(
        (current) =>
          current && {
            ...current,
            items: current.items.map((p) => {
              if (p.id !== row.productId) return p;
              const variants = p.variants.map((v) => (v.id === row.variant.id ? { ...v, inventory_quantity: qty } : v));
              return { ...p, variants, total_inventory: variants.reduce((sum, v) => sum + v.inventory_quantity, 0) };
            }),
          },
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

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search product, SKU…"
            className="w-64 pl-8"
          />
        </div>
        <Select value={stock} onValueChange={(v) => handleStockChange(v as typeof stock)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stockOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        search || stock !== "all" ? (
          <EmptyState
            icon={Boxes}
            title="No matching inventory"
            description="Try a different search term or stock filter."
          />
        ) : (
          <EmptyState
            icon={Boxes}
            title="No products yet"
            description="Stock levels for every variant will show up here once you add products."
          />
        )
      ) : (
        <>
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
