"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    mutate,
  } = useSWR<Product[]>("/api/v1/seller/products", (path: string) => api.get<Product[]>(path));
  const [toDelete, setToDelete] = useState<Product | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await api.del(`/api/v1/seller/products/${toDelete.id}`);
      toast.success("Product deleted");
      mutate((current) => current?.filter((x) => x.id !== toDelete.id), { revalidate: false });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete product");
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage what you sell.</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="h-4 w-4" />
            New product
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet. Create your first one.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].url} alt="" className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs font-medium">
                    <span className="block truncate" title={p.name}>
                      {p.name}
                    </span>
                    {p.variants.length > 1 && (
                      <span className="text-xs text-muted-foreground">{p.variants.length} variants</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.price_min === p.price_max ? `₹${p.price_min.toFixed(2)}` : `₹${p.price_min.toFixed(2)} – ₹${p.price_max.toFixed(2)}`}
                  </TableCell>
                  <TableCell>{p.total_inventory}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "active" ? "default" : "secondary"} className="capitalize">
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/products/${p.id}/edit`} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setToDelete(p)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              This will permanently delete &ldquo;{toDelete?.name}&rdquo;. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
