"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { Collection, MenuLinkType, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LinkTargetFieldProps {
  linkType: MenuLinkType;
  linkValue: string;
  collections: Collection[];
  products: Product[];
  onChange: (linkType: MenuLinkType, linkValue: string) => void;
  /** Extra classes for the value input — pass "bg-background" when this field sits on a tinted row (e.g. a dropdown-item pill). */
  inputClassName?: string;
}

export function LinkTargetField({
  linkType,
  linkValue,
  collections,
  products,
  onChange,
  inputClassName,
}: LinkTargetFieldProps) {
  return (
    <div className="flex flex-1 gap-2">
      <Select value={linkType} onValueChange={(v) => onChange(v as MenuLinkType, "")}>
        <SelectTrigger className={cn("w-36 shrink-0", inputClassName)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="url">Custom URL</SelectItem>
          <SelectItem value="collection">Collection</SelectItem>
          <SelectItem value="product">Product</SelectItem>
        </SelectContent>
      </Select>

      {linkType === "url" && (
        <Input
          value={linkValue}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="/stores/your-slug/products or https://…"
          className={cn("flex-1", inputClassName)}
        />
      )}

      {linkType === "collection" && (
        <Combobox
          items={collections}
          value={collections.find((c) => c.id === linkValue) ?? null}
          onValueChange={(item) => onChange("collection", (item as Collection | null)?.id ?? "")}
          itemToStringValue={(c: Collection) => c.name}
          itemToStringLabel={(c: Collection) => c.name}
        >
          <ComboboxInput placeholder="Search collections…" showClear className={cn("flex-1", inputClassName)} />
          <ComboboxContent>
            <ComboboxEmpty>No collections found.</ComboboxEmpty>
            <ComboboxList>
              {(c: Collection) => (
                <ComboboxItem key={c.id} value={c}>
                  {c.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}

      {linkType === "product" && (
        <Combobox
          items={products}
          value={products.find((p) => p.id === linkValue) ?? null}
          onValueChange={(item) => onChange("product", (item as Product | null)?.id ?? "")}
          itemToStringValue={(p: Product) => p.name}
          itemToStringLabel={(p: Product) => p.name}
        >
          <ComboboxInput placeholder="Search products…" showClear className={cn("flex-1", inputClassName)} />
          <ComboboxContent>
            <ComboboxEmpty>No products found.</ComboboxEmpty>
            <ComboboxList>
              {(p: Product) => (
                <ComboboxItem key={p.id} value={p}>
                  {p.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    </div>
  );
}
