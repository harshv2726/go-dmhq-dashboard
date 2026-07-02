"use client";

import useSWR from "swr";
import { api } from "./api";
import type { Collection } from "./types";

export function useCollections() {
  const { data, isLoading, mutate } = useSWR<Collection[]>("/api/v1/seller/collections", (path: string) =>
    api.get<Collection[]>(path),
  );
  return { collections: data ?? [], isLoading, refresh: () => mutate() };
}
