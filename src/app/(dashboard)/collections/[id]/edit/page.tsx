"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Collection } from "@/lib/types";
import { CollectionForm, type CollectionFormValues } from "@/components/collections/collection-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: collections, isLoading } = useSWR<Collection[]>("/api/v1/seller/collections", (path: string) =>
    api.get<Collection[]>(path),
  );
  const collection = collections?.find((c) => c.id === id) ?? null;
  const notFound = !isLoading && !collection;

  useEffect(() => {
    if (notFound) {
      toast.error("Collection not found");
      router.replace("/collections");
    }
  }, [notFound, router]);

  async function handleSubmit(values: CollectionFormValues) {
    await api.put<Collection>(`/api/v1/seller/collections/${id}`, values);
    toast.success("Collection updated");
    router.push("/collections");
  }

  if (isLoading || notFound) return <Skeleton className="h-96 w-full" />;
  if (!collection) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit collection</h1>
      <CollectionForm initial={collection} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
