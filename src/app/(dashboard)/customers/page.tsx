"use client";

import { useState } from "react";
import useSWR from "swr";
import { api } from "@/lib/api";
import { useStore } from "@/lib/use-store";
import type { Customer, Paginated } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";

const PAGE_SIZE = 50;

export default function CustomersPage() {
  const { store } = useStore();
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useSWR<Paginated<Customer>>(
    `/api/v1/seller/customers?page=${page}&limit=${PAGE_SIZE}`,
    (path: string) => api.get<Paginated<Customer>>(path),
  );

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: store?.currency ?? "INR" }).format(amount);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Everyone who has ordered from your store." />

      {isLoading || !response ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : response.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No customers yet — they&apos;ll show up here after their first order.</p>
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
