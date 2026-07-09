"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/products/data-table";
import { columns } from "@/components/products/columns";

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
        <DataTable columns={columns} data={products} meta={{ onDelete: setToDelete }} />
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
