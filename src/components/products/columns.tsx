"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onDelete?: (row: TData) => void;
  }
}

function sortableHeader(label: string) {
  return function Header({ column }: { column: { toggleSorting: (desc?: boolean) => void; getIsSorted: () => false | "asc" | "desc" } }) {
    return (
      <Button variant="ghost" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "image",
    header: "",
    cell: ({ row }) => {
      const p = row.original;
      return p.images[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.images[0].url} alt="" className="h-10 w-10 rounded object-cover" />
      ) : (
        <div className="h-10 w-10 rounded bg-muted" />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: sortableHeader("Name"),
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="max-w-xs font-medium">
          <span className="block truncate" title={p.name}>
            {p.name}
          </span>
          {p.variants.length > 1 && <span className="text-xs text-muted-foreground">{p.variants.length} variants</span>}
        </div>
      );
    },
  },
  {
    id: "price",
    accessorFn: (p) => p.price_min,
    header: sortableHeader("Price"),
    cell: ({ row }) => {
      const p = row.original;
      return p.price_min === p.price_max
        ? `₹${p.price_min.toFixed(2)}`
        : `₹${p.price_min.toFixed(2)} – ₹${p.price_max.toFixed(2)}`;
    },
  },
  {
    id: "stock",
    accessorKey: "total_inventory",
    header: sortableHeader("Stock"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row, table }) => {
      const p = row.original;
      return (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/products/${p.id}/edit`} aria-label="Edit">
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => table.options.meta?.onDelete?.(p)} aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
