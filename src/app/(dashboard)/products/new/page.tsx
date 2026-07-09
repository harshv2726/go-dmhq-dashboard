"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductForm, buildProductPayload, type ProductFormValues } from "@/components/products/product-form";
import { PageHeader } from "@/components/layout/page-header";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(values: ProductFormValues) {
    await api.post<Product>("/api/v1/seller/products", buildProductPayload(values));
    toast.success("Product created");
    router.push("/products");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="New product" />
      <ProductForm onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  );
}
