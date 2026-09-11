"use client";

import { use, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { TicketDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { TicketStatusBadge } from "@/components/support/ticket-status-badge";
import { ArrowLeft, Send } from "lucide-react";

// Short enough to feel like a live chat while a seller has the thread open,
// long enough not to hammer the API — see apps/dashboard's established
// SWR-polling convention (pending-access-request-banner.tsx) for the same
// tradeoff at a slower cadence.
const POLL_INTERVAL_MS = 3000;

export default function SupportTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);
  const threadEndRef = useRef<HTMLDivElement>(null);

  const { data: ticket, isLoading, mutate } = useSWR<TicketDetail>(
    `/api/v1/seller/support/tickets/${id}`,
    (path: string) => api.get<TicketDetail>(path),
    { refreshInterval: POLL_INTERVAL_MS },
  );

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: "end" });
  }, [ticket?.messages.length]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!reply.trim()) return;
    setIsSending(true);
    try {
      await api.post(`/api/v1/seller/support/tickets/${id}/messages`, { body: reply.trim() });
      setReply("");
      mutate();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  }

  if (isLoading || !ticket) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col space-y-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -mb-2">
        <Link href="/support">
          <ArrowLeft className="size-4" />
          Back to Support
        </Link>
      </Button>

      <PageHeader
        title={ticket.subject}
        description={<TicketStatusBadge status={ticket.status} />}
      />

      <div className="flex flex-1 flex-col overflow-y-auto rounded-md border p-4">
        <div className="flex flex-1 flex-col gap-4">
          {ticket.messages.map((m) => {
            const isSeller = m.sender_type === "seller";
            return (
              <div key={m.id} className={cn("flex flex-col gap-1", isSeller ? "items-end" : "items-start")}>
                <span className="text-xs text-muted-foreground">
                  {m.sender_name} · {new Date(m.created_at).toLocaleString()}
                </span>
                <div
                  className={cn(
                    "max-w-lg rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                    isSeller ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {m.body}
                </div>
              </div>
            );
          })}
          <div ref={threadEndRef} />
        </div>
      </div>

      <form onSubmit={handleSend} className="flex items-end gap-2">
        <Textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write a reply…"
          rows={2}
          className="flex-1 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
        />
        <Button type="submit" disabled={isSending || !reply.trim()}>
          <Send className="size-4" />
          Send
        </Button>
      </form>
    </div>
  );
}
