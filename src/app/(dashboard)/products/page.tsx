"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Paginated, Product } from "@/lib/types";
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
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";

const PAGE_SIZE = 50;

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<Paginated<Product>>(`/api/v1/seller/products?page=${page}&limit=${PAGE_SIZE}`, (path: string) =>
    api.get<Paginated<Product>>(path),
  );
  const [toDelete, setToDelete] = useState<Product | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await api.del(`/api/v1/seller/products/${toDelete.id}`);
      toast.success("Product deleted");
      mutate(
        (current) =>
          current && {
            ...current,
            items: current.items.filter((x) => x.id !== toDelete.id),
            total: current.total - 1,
          },
        { revalidate: false },
      );
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete product");
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage what you sell."
        action={
          <Button asChild>
            <Link href="/products/new">
              <Plus className="h-4 w-4" />
              New product
            </Link>
          </Button>
        }
      />

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : response.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet. Create your first one.</p>
      ) : (
        <>
          <DataTable columns={columns} data={response.items} meta={{ onDelete: setToDelete }} />
          <PaginationControls
            page={response.page}
            totalPages={response.total_pages}
            total={response.total}
            onPageChange={setPage}
          />
        </>
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
