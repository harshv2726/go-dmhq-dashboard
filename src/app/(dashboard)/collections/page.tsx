"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Layers, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Collection, Paginated } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { EmptyState } from "@/components/layout/empty-state";

const PAGE_SIZE = 50;

const statusOptions: { value: "all" | "active" | "inactive"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function CollectionsPage() {
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
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

  function handleStatusChange(v: "all" | "active" | "inactive") {
    setStatus(v);
    setPage(1);
  }

  const statusQs = status === "all" ? "" : `&status=${status}`;
  const searchQs = search ? `&search=${encodeURIComponent(search)}` : "";
  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<Paginated<Collection>>(
    `/api/v1/seller/collections?page=${page}&limit=${PAGE_SIZE}${statusQs}${searchQs}`,
    (path: string) => api.get<Paginated<Collection>>(path),
  );
  const [toDelete, setToDelete] = useState<Collection | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await api.del(`/api/v1/seller/collections/${toDelete.id}`);
      toast.success("Collection deleted");
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
      toast.error(err instanceof ApiError ? err.message : "Failed to delete collection");
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        description="Group products together."
        action={
          <Button asChild>
            <Link href="/collections/new">
              <Plus className="h-4 w-4" />
              New collection
            </Link>
          </Button>
        }
      />

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search collections…"
            className="w-64 pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => handleStatusChange(v as "all" | "active" | "inactive")}>
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
      </div>

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : response.items.length === 0 ? (
        search || status !== "all" ? (
          <EmptyState
            icon={Layers}
            title="No matching collections"
            description="Try a different search term or status filter."
          />
        ) : (
          <EmptyState
            icon={Layers}
            title="No collections yet"
            description="Group related products together to make them easier to browse."
            action={
              <Button asChild size="sm">
                <Link href="/collections/new">
                  <Plus className="h-4 w-4" />
                  New collection
                </Link>
              </Button>
            }
          />
        )
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.items.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      {c.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.image_url} alt="" className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant={c.is_active ? "default" : "secondary"}>
                        {c.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/collections/${c.id}/edit`} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setToDelete(c)} aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{toDelete?.name}&rdquo;. Products in it won&apos;t be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" size="sm" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
