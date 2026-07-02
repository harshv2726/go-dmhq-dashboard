"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";
import type { Collection } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/media/image-uploader";

export interface CollectionFormValues {
  name: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

function toFormValues(c?: Collection): CollectionFormValues {
  return {
    name: c?.name ?? "",
    description: c?.description ?? "",
    image_url: c?.image_url ?? null,
    sort_order: c?.sort_order ?? 0,
  };
}

interface CollectionFormProps {
  initial?: Collection;
  onSubmit: (values: CollectionFormValues) => Promise<void>;
  submitLabel: string;
}

export function CollectionForm({ initial, onSubmit, submitLabel }: CollectionFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CollectionFormValues>(() => toFormValues(initial));
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof CollectionFormValues>(key: K, value: CollectionFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save collection");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Collection details</CardTitle>
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
              rows={3}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <ImageUploader
              urls={values.image_url ? [values.image_url] : []}
              onChange={(urls) => set("image_url", urls[0] ?? null)}
              max={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort order</Label>
            <Input
              id="sort_order"
              type="number"
              value={values.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/collections")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
