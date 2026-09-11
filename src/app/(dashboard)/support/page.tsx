"use client";

import Link from "next/link";
import useSWR from "swr";
import { api } from "@/lib/api";
import type { Paginated, Ticket } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { EmptyState } from "@/components/layout/empty-state";
import { TicketStatusBadge } from "@/components/support/ticket-status-badge";
import { LifeBuoy, Plus } from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 50;
// Ticket list doesn't need thread-view-grade freshness — a moderate poll
// keeps status/last-reply changes visible without hammering the API.
const POLL_INTERVAL_MS = 15000;

export default function SupportPage() {
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useSWR<Paginated<Ticket>>(
    `/api/v1/seller/support/tickets?page=${page}&limit=${PAGE_SIZE}`,
    (path: string) => api.get<Paginated<Ticket>>(path),
    { refreshInterval: POLL_INTERVAL_MS },
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support"
        description="Raise a ticket and chat with DMHQ support."
        action={
          <Button asChild>
            <Link href="/support/new">
              <Plus className="size-4" />
              New ticket
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
        <EmptyState
          icon={LifeBuoy}
          title="No support tickets yet"
          description="Need help with something? Raise a ticket and DMHQ support will get back to you here."
          action={
            <Button asChild variant="outline">
              <Link href="/support/new">New ticket</Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.items.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/support/${t.id}`} className="font-medium hover:underline">
                        {t.subject}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <TicketStatusBadge status={t.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(t.updated_at).toLocaleString()}
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
