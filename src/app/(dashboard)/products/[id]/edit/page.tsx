"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductForm, type ProductFormValues } from "@/components/products/product-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  // No GET /seller/products/{id} on the backend — list + find is fine at
  // this scale (early-stage sellers, not thousands of SKUs).
  const { data: products, isLoading } = useSWR<Product[]>("/api/v1/seller/products", (path: string) =>
    api.get<Product[]>(path),
  );
  const product = products?.find((p) => p.id === id) ?? null;
  const notFound = !isLoading && !product;

  useEffect(() => {
    if (notFound) {
      toast.error("Product not found");
      router.replace("/products");
    }
  }, [notFound, router]);

  async function handleSubmit(values: ProductFormValues) {
    await api.put<Product>(`/api/v1/seller/products/${id}`, values);
    toast.success("Product updated");
    router.push("/products");
  }

  if (isLoading || notFound) return <Skeleton className="h-96 w-full" />;
  if (!product) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit product</h1>
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
