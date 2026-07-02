"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Collection } from "@/lib/types";
import { CollectionForm, type CollectionFormValues } from "@/components/collections/collection-form";

export default function NewCollectionPage() {
  const router = useRouter();

  async function handleSubmit(values: CollectionFormValues) {
    await api.post<Collection>("/api/v1/seller/collections", values);
    toast.success("Collection created");
    router.push("/collections");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">New collection</h1>
      <CollectionForm onSubmit={handleSubmit} submitLabel="Create collection" />
    </div>
  );
}
