"use client";

import useSWR from "swr";
import { api } from "./api";
import type { Store } from "./types";

/** Fetches the logged-in seller's own store. mutate() after settings edits. */
export function useStore() {
  const { data, isLoading, mutate } = useSWR<Store>("/api/v1/seller/store", (path: string) => api.get<Store>(path));
  return { store: data ?? null, isLoading, refresh: () => mutate() };
}
