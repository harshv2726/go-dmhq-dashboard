"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Search, Users } from "lucide-react";
import { api } from "@/lib/api";
import { useStore } from "@/lib/use-store";
import type { Customer, Paginated } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { EmptyState } from "@/components/layout/empty-state";

const PAGE_SIZE = 50;

export default function CustomersPage() {
  const { store } = useStore();
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

  const searchQs = search ? `&search=${encodeURIComponent(search)}` : "";
  const { data: response, isLoading } = useSWR<Paginated<Customer>>(
    `/api/v1/seller/customers?page=${page}&limit=${PAGE_SIZE}${searchQs}`,
    (path: string) => api.get<Paginated<Customer>>(path),
  );

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: store?.currency ?? "INR" }).format(amount);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Everyone who has ordered from your store." />

      <div className="relative w-64">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name, email, phone…"
          className="pl-8"
        />
      </div>

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : response.items.length === 0 ? (
        search ? (
          <EmptyState
            icon={Users}
            title="No matching customers"
            description="Try a different search term."
          />
        ) : (
          <EmptyState
            icon={Users}
            title="No customers yet"
            description="They'll show up here after their first order."
          />
        )
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total spent</TableHead>
                  <TableHead>Customer since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.items.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div>{c.phone}</div>
                      {c.email && <div className="text-xs">{c.email}</div>}
                    </TableCell>
                    <TableCell>{c.order_count}</TableCell>
                    <TableCell>{formatCurrency(c.total_spent)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
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
