"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { ApiError } from "@/lib/api";
import { useCollections } from "@/lib/use-collections";
import type { InventoryPolicy, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUploader } from "@/components/media/image-uploader";

interface OptionDraft {
  name: string;
  valuesText: string; // comma-separated; parsed into an array on submit/generate
}

interface VariantDraft {
  option1: string | null;
  option2: string | null;
  option3: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string;
  inventory_quantity: number;
  inventory_policy: InventoryPolicy;
}

export interface ProductFormValues {
  collection_id: string | null;
  name: string;
  description: string;
  images: { url: string; alt: string }[];
  seo_title: string;
  seo_description: string;
  // Simple-product path (no options)
  price: number;
  compare_price: number | null;
  sku: string;
  stock_qty: number;
  // Variable-product path
  hasVariants: boolean;
  options: OptionDraft[];
  variants: VariantDraft[];
}

function variantLabel(v: VariantDraft): string {
  return [v.option1, v.option2, v.option3].filter(Boolean).join(" / ") || "Default";
}

function parseValues(text: string): string[] {
  return Array.from(new Set(text.split(",").map((v) => v.trim()).filter(Boolean)));
}

function cartesianVariants(options: OptionDraft[], existing: VariantDraft[]): VariantDraft[] {
  const valueLists = options.map((o) => parseValues(o.valuesText));
  if (valueLists.some((values) => values.length === 0)) return [];

  let combos: (string | null)[][] = [[]];
  for (const values of valueLists) {
    combos = combos.flatMap((combo) => values.map((v) => [...combo, v]));
  }
  while (combos.length && combos[0].length < 3) {
    combos = combos.map((c) => [...c, null]);
  }
  for (const combo of combos) {
    while (combo.length < 3) combo.push(null);
  }

  const existingByKey = new Map(existing.map((v) => [`${v.option1}|${v.option2}|${v.option3}`, v]));
  return combos.map(([option1, option2, option3]) => {
    const key = `${option1}|${option2}|${option3}`;
    return (
      existingByKey.get(key) ?? {
        option1,
        option2,
        option3,
        price: 0,
        compare_at_price: null,
        sku: "",
        inventory_quantity: 0,
        inventory_policy: "deny",
      }
    );
  });
}

function toFormValues(p?: Product): ProductFormValues {
  const hasVariants = (p?.options.length ?? 0) > 0;
  const firstVariant = p?.variants[0];
  return {
    collection_id: p?.collection_id ?? null,
    name: p?.name ?? "",
    description: p?.description ?? "",
    images: p?.images ?? [],
    seo_title: p?.seo_title ?? "",
    seo_description: p?.seo_description ?? "",
    price: hasVariants ? 0 : (firstVariant?.price ?? 0),
    compare_price: hasVariants ? null : (firstVariant?.compare_at_price ?? null),
    sku: hasVariants ? "" : (firstVariant?.sku ?? ""),
    stock_qty: hasVariants ? 0 : (firstVariant?.inventory_quantity ?? 0),
    hasVariants,
    options: (p?.options ?? []).map((o) => ({ name: o.name, valuesText: o.values.join(", ") })),
    variants: (p?.variants ?? []).map((v) => ({
      option1: v.option1,
      option2: v.option2,
      option3: v.option3,
      price: v.price,
      compare_at_price: v.compare_at_price,
      sku: v.sku ?? "",
      inventory_quantity: v.inventory_quantity,
      inventory_policy: v.inventory_policy,
    })),
  };
}

// buildProductPayload converts the form's editing-friendly draft shape
// (comma-separated option values, a hasVariants toggle) into the API's
// createRequest shape.
export function buildProductPayload(values: ProductFormValues) {
  const base = {
    collection_id: values.collection_id,
    name: values.name,
    description: values.description,
    images: values.images,
    seo_title: values.seo_title,
    seo_description: values.seo_description,
  };

  if (!values.hasVariants) {
    return {
      ...base,
      price: values.price,
      compare_price: values.compare_price,
      sku: values.sku || null,
      stock_qty: values.stock_qty,
    };
  }

  return {
    ...base,
    options: values.options.map((o) => ({ name: o.name, values: parseValues(o.valuesText) })),
    variants: values.variants.map((v) => ({
      option1: v.option1,
      option2: v.option2,
      option3: v.option3,
      price: v.price,
      compare_at_price: v.compare_at_price,
      sku: v.sku || null,
      inventory_quantity: v.inventory_quantity,
      inventory_policy: v.inventory_policy,
    })),
  };
}

interface ProductFormProps {
  initial?: Product;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel: string;
}

export function ProductForm({ initial, onSubmit, submitLabel }: ProductFormProps) {
  const router = useRouter();
  const { collections } = useCollections();
  const [values, setValues] = useState<ProductFormValues>(() => toFormValues(initial));
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function toggleHasVariants(on: boolean) {
    setValues((v) => ({
      ...v,
      hasVariants: on,
      options: on && v.options.length === 0 ? [{ name: "", valuesText: "" }] : v.options,
    }));
  }

  function addOption() {
    if (values.options.length >= 3) return;
    set("options", [...values.options, { name: "", valuesText: "" }]);
  }

  function updateOption(index: number, patch: Partial<OptionDraft>) {
    set(
      "options",
      values.options.map((o, i) => (i === index ? { ...o, ...patch } : o)),
    );
  }

  function removeOption(index: number) {
    set(
      "options",
      values.options.filter((_, i) => i !== index),
    );
  }

  function generateVariants() {
    const cleanOptions = values.options.filter((o) => o.name.trim() && parseValues(o.valuesText).length > 0);
    if (cleanOptions.length === 0) {
      toast.error("Add at least one option with a name and values first");
      return;
    }
    const generated = cartesianVariants(cleanOptions, values.variants);
    set("options", cleanOptions);
    set("variants", generated);
  }

  function updateVariant(index: number, patch: Partial<VariantDraft>) {
    set(
      "variants",
      values.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    );
  }

  function removeVariant(index: number) {
    set(
      "variants",
      values.variants.filter((_, i) => i !== index),
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (values.hasVariants) {
      if (values.variants.length === 0) {
        toast.error("Generate at least one variant, or turn off multiple options");
        return;
      }
      if (values.variants.some((v) => v.price <= 0)) {
        toast.error("Every variant needs a price greater than 0");
        return;
      }
    } else if (values.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required value={values.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              id="description"
              value={values.description}
              onChange={(html) => set("description", html)}
              placeholder="Describe your product…"
            />
          </div>
          <div className="space-y-2">
            <Label>Images</Label>
            <ImageUploader
              urls={values.images.map((i) => i.url)}
              onChange={(urls) => set("images", urls.map((url) => ({ url, alt: values.name })))}
            />
          </div>
          <div className="space-y-2">
            <Label>Collection</Label>
            <Select
              value={values.collection_id ?? "none"}
              onValueChange={(v) => set("collection_id", v === "none" ? null : v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="No collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No collection</SelectItem>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={values.hasVariants}
              onChange={(e) => toggleHasVariants(e.target.checked)}
            />
            This product has multiple options, like size or color
          </label>
        </CardHeader>
        <CardContent className="space-y-4">
          {!values.hasVariants ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step="0.01"
                  required
                  value={values.price}
                  onChange={(e) => set("price", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_price">Compare-at price</Label>
                <Input
                  id="compare_price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={values.compare_price ?? ""}
                  onChange={(e) => set("compare_price", e.target.value === "" ? null : Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" value={values.sku} onChange={(e) => set("sku", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock_qty">Stock quantity</Label>
                <Input
                  id="stock_qty"
                  type="number"
                  min={0}
                  value={values.stock_qty}
                  onChange={(e) => set("stock_qty", Number(e.target.value))}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {values.options.map((option, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="w-40 space-y-2">
                      <Label>Option name</Label>
                      <Input
                        placeholder="Size"
                        value={option.name}
                        onChange={(e) => updateOption(i, { name: e.target.value })}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Values (comma separated)</Label>
                      <Input
                        placeholder="S, M, L"
                        value={option.valuesText}
                        onChange={(e) => updateOption(i, { valuesText: e.target.value })}
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(i)} aria-label="Remove option">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  {values.options.length < 3 && (
                    <Button type="button" variant="outline" size="sm" onClick={addOption}>
                      <Plus className="h-4 w-4" />
                      Add option
                    </Button>
                  )}
                  <Button type="button" variant="secondary" size="sm" onClick={generateVariants}>
                    Generate variants
                  </Button>
                </div>
              </div>

              {values.variants.length > 0 && (
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Compare-at</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>If out of stock</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {values.variants.map((v, i) => (
                        <TableRow key={`${v.option1}-${v.option2}-${v.option3}`}>
                          <TableCell className="font-medium">{variantLabel(v)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={0}
                              step="0.01"
                              className="w-24"
                              value={v.price}
                              onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={0}
                              step="0.01"
                              className="w-24"
                              value={v.compare_at_price ?? ""}
                              onChange={(e) =>
                                updateVariant(i, { compare_at_price: e.target.value === "" ? null : Number(e.target.value) })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-28"
                              value={v.sku}
                              onChange={(e) => updateVariant(i, { sku: e.target.value })}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={0}
                              className="w-20"
                              value={v.inventory_quantity}
                              onChange={(e) => updateVariant(i, { inventory_quantity: Number(e.target.value) })}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={v.inventory_policy}
                              onValueChange={(policy) => updateVariant(i, { inventory_policy: policy as InventoryPolicy })}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deny">Stop selling</SelectItem>
                                <SelectItem value="continue">Keep selling</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(i)} aria-label="Remove variant">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search engine listing</CardTitle>
          <CardDescription>Optional — shown in search results.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO title</Label>
            <Input id="seo_title" value={values.seo_title} onChange={(e) => set("seo_title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO description</Label>
            <Textarea
              id="seo_description"
              rows={2}
              value={values.seo_description}
              onChange={(e) => set("seo_description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/products")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
