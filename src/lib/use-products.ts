"use client";

import useSWR from "swr";
import { api } from "./api";
import type { Paginated, Product } from "./types";

// Fetches every product in one request (limit=500, the API's cap) — used
// for pickers like the navigation menu builder's "Product" link target,
// which need the full list rather than one page of it. The Products list
// page paginates properly on its own instead of using this hook.
export function useProducts() {
  const { data, isLoading, mutate } = useSWR<Paginated<Product>>(
    "/api/v1/seller/products?limit=500",
    (path: string) => api.get<Paginated<Product>>(path),
  );
  return { products: data?.items ?? [], isLoading, refresh: () => mutate() };
}
