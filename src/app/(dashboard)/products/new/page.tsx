"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductForm, buildProductPayload, type ProductFormValues } from "@/components/products/product-form";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(values: ProductFormValues) {
    await api.post<Product>("/api/v1/seller/products", buildProductPayload(values));
    toast.success("Product created");
    router.push("/products");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">New product</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  );
}
