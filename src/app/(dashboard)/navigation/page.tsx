"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { Menu, Plus } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useCollections } from "@/lib/use-collections";
import { useProducts } from "@/lib/use-products";
import type { MenuItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { MenuItemRow } from "@/components/navigation/menu-item-row";

export default function NavigationPage() {
  const { data, isLoading } = useSWR<MenuItem[]>("/api/v1/seller/nav-menu", (path: string) =>
    api.get<MenuItem[]>(path),
  );
  const { collections } = useCollections();
  const { products } = useProducts();

  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data && items === null) setItems(data);
  }, [data, items]);

  function updateItem(index: number, next: MenuItem) {
    if (!items) return;
    const copy = [...items];
    copy[index] = next;
    setItems(copy);
  }

  function removeItem(index: number) {
    if (!items) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function moveItem(index: number, dir: -1 | 1) {
    if (!items) return;
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setItems(copy);
  }

  function addItem() {
    const item: MenuItem = {
      id: crypto.randomUUID(),
      store_id: "",
      label: "",
      link_type: "url",
      link_value: "",
      position: items?.length ?? 0,
      children: [],
    };
    setItems([...(items ?? []), item]);
  }

  async function handleSave() {
    if (!items) return;
    setIsSaving(true);
    try {
      const saved = await api.put<MenuItem[]>("/api/v1/seller/nav-menu", { items });
      setItems(saved);
      toast.success("Navigation menu saved");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save navigation menu");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Navigation"
        description="Choose the links and dropdowns shown in your storefront's header."
        action={
          <Button onClick={handleSave} disabled={isSaving || !items}>
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        }
      />

      {isLoading || items === null ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Menu}
          title="No navigation links yet"
          description="Without any links here, your storefront shows a default 'Shop All' link. Add links to collections, products, or custom URLs, and group items into dropdowns."
          action={
            <Button size="sm" onClick={addItem}>
              <Plus className="size-3.5" />
              Add nav item
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <MenuItemRow
              key={item.id}
              item={item}
              collections={collections}
              products={products}
              onChange={(next) => updateItem(i, next)}
              onRemove={() => removeItem(i)}
              onMoveUp={() => moveItem(i, -1)}
              onMoveDown={() => moveItem(i, 1)}
              isFirst={i === 0}
              isLast={i === items.length - 1}
            />
          ))}
          <Button variant="outline" onClick={addItem}>
            <Plus className="size-3.5" />
            Add nav item
          </Button>
        </div>
      )}
    </div>
  );
}
