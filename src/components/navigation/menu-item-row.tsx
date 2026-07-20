"use client";

import { ChevronDown, ChevronUp, CornerDownRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LinkTargetField } from "@/components/navigation/link-target-field";
import type { Collection, MenuChild, MenuItem, MenuLinkType, Product } from "@/lib/types";

interface MenuItemRowProps {
  item: MenuItem;
  collections: Collection[];
  products: Product[];
  onChange: (next: MenuItem) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function MenuItemRow({
  item,
  collections,
  products,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: MenuItemRowProps) {
  function updateChild(index: number, next: MenuChild) {
    const children = [...item.children];
    children[index] = next;
    onChange({ ...item, children });
  }

  function removeChild(index: number) {
    onChange({ ...item, children: item.children.filter((_, i) => i !== index) });
  }

  function moveChild(index: number, dir: -1 | 1) {
    const children = [...item.children];
    const target = index + dir;
    if (target < 0 || target >= children.length) return;
    [children[index], children[target]] = [children[target], children[index]];
    onChange({ ...item, children });
  }

  function addChild() {
    const child: MenuChild = {
      id: crypto.randomUUID(),
      menu_item_id: item.id,
      label: "",
      link_type: "url",
      link_value: "",
      position: item.children.length,
    };
    onChange({ ...item, children: [...item.children, child] });
  }

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <Button variant="ghost" size="icon-sm" disabled={isFirst} onClick={onMoveUp} aria-label="Move up">
              <ChevronUp className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" disabled={isLast} onClick={onMoveDown} aria-label="Move down">
              <ChevronDown className="size-3.5" />
            </Button>
          </div>
          <Input
            value={item.label}
            onChange={(e) => onChange({ ...item, label: e.target.value })}
            placeholder="Nav label, e.g. Shop"
            className="w-44"
          />
          <LinkTargetField
            linkType={item.link_type}
            linkValue={item.link_value}
            collections={collections}
            products={products}
            onChange={(link_type: MenuLinkType, link_value: string) => onChange({ ...item, link_type, link_value })}
          />
          <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove nav item">
            <Trash2 className="size-4" />
          </Button>
        </div>

        {item.children.length > 0 && (
          <div className="ml-9 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Dropdown items</p>
            {item.children.map((child, i) => (
              <div
                key={child.id}
                data-slot="menu-child-row"
                className="flex items-center gap-2 rounded-md bg-muted/40 py-1.5 pl-2 pr-1.5"
              >
                <CornerDownRight className="size-3.5 shrink-0 text-muted-foreground" />
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === 0}
                    onClick={() => moveChild(i, -1)}
                    aria-label="Move up"
                  >
                    <ChevronUp className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === item.children.length - 1}
                    onClick={() => moveChild(i, 1)}
                    aria-label="Move down"
                  >
                    <ChevronDown className="size-3.5" />
                  </Button>
                </div>
                <Input
                  value={child.label}
                  onChange={(e) => updateChild(i, { ...child, label: e.target.value })}
                  placeholder="Dropdown item label"
                  className="w-40 bg-background"
                />
                <LinkTargetField
                  linkType={child.link_type}
                  linkValue={child.link_value}
                  collections={collections}
                  products={products}
                  onChange={(link_type: MenuLinkType, link_value: string) =>
                    updateChild(i, { ...child, link_type, link_value })
                  }
                  inputClassName="bg-background"
                />
                <Button variant="ghost" size="icon" onClick={() => removeChild(i)} aria-label="Remove dropdown item">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="ml-9">
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={addChild}>
            <Plus className="size-3.5" />
            Add dropdown item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
