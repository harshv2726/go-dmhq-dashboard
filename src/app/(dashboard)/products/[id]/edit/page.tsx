"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductForm, buildProductPayload, type ProductFormValues } from "@/components/products/product-form";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: product, isLoading } = useSWR<Product>(`/api/v1/seller/products/${id}`, (path: string) =>
    api.get<Product>(path),
  );
  const notFound = !isLoading && !product;

  useEffect(() => {
    if (notFound) {
      toast.error("Product not found");
      router.replace("/products");
    }
  }, [notFound, router]);

  async function handleSubmit(values: ProductFormValues) {
    await api.put<Product>(`/api/v1/seller/products/${id}`, buildProductPayload(values));
    toast.success("Product updated");
    router.push("/products");
  }

  if (isLoading || notFound) return <Skeleton className="h-96 w-full" />;
  if (!product) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Edit product" />
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
