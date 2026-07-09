"use client";

import useSWR from "swr";
import { api } from "./api";
import type { Collection, Paginated } from "./types";

// Fetches every collection in one request (limit=500 comfortably covers
// real-world store sizes) — used for pickers like the product form's
// "Collection" dropdown, which need the full list rather than one page of
// it. The Collections list page paginates properly on its own instead of
// using this hook.
export function useCollections() {
  const { data, isLoading, mutate } = useSWR<Paginated<Collection>>(
    "/api/v1/seller/collections?limit=500",
    (path: string) => api.get<Paginated<Collection>>(path),
  );
  return { collections: data?.items ?? [], isLoading, refresh: () => mutate() };
}
