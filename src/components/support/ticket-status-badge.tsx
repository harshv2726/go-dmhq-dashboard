import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/types";

const styles: Record<TicketStatus, string> = {
  open: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  resolved: "bg-green-100 text-green-800 hover:bg-green-100",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge variant="secondary" className={cn("capitalize", styles[status])}>
      {status}
    </Badge>
  );
}
