"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";
import { useCollections } from "@/lib/use-collections";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "@/components/media/image-uploader";

export interface ProductFormValues {
  collection_id: string | null;
  name: string;
  description: string;
  price: number;
  compare_price: number | null;
  sku: string;
  stock_qty: number;
  images: { url: string; alt: string }[];
  seo_title: string;
  seo_description: string;
}

function toFormValues(p?: Product): ProductFormValues {
  return {
    collection_id: p?.collection_id ?? null,
    name: p?.name ?? "",
    description: p?.description ?? "",
    price: p?.price ?? 0,
    compare_price: p?.compare_price ?? null,
    sku: p?.sku ?? "",
    stock_qty: p?.stock_qty ?? 0,
    images: p?.images ?? [],
    seo_title: p?.seo_title ?? "",
    seo_description: p?.seo_description ?? "",
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || values.price <= 0) {
      toast.error("Name and a price greater than 0 are required");
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
            <Textarea
              id="description"
              rows={4}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
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
          <CardTitle>Pricing & inventory</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
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
