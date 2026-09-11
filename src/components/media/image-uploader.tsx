"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { UploadResult } from "@/lib/types";

interface ImageUploaderProps {
  urls: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  /** "wide" fits a banner-shaped tile (e.g. store banner); "square" (default)
   * suits product/collection images. */
  aspect?: "square" | "wide";
  /** "contain" avoids cropping — use for logos, which are often non-square
   * or have transparent padding. Defaults to "cover" (fills the tile),
   * which suits photographic product/collection/banner images. */
  fit?: "cover" | "contain";
}

/** Grid of uploaded image thumbnails plus an "add" tile. Set max=1 for a
 * single-image field (collection/store logo/banner). */
export function ImageUploader({
  urls,
  onChange,
  max = 6,
  aspect = "square",
  fit = "cover",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const remaining = max - urls.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) {
      toast.error(`You can upload up to ${max} image${max === 1 ? "" : "s"}`);
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await Promise.all(
        toUpload.map((file) => api.upload<UploadResult>("/api/v1/seller/media", file)),
      );
      onChange([...urls, ...uploaded.map((u) => u.url)]);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  const tileSize = aspect === "wide" ? "h-20 w-full max-w-72" : "h-20 w-20";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div key={url} className={cn("group relative overflow-hidden rounded-md border bg-muted/30", tileSize)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- uploaded
            images come from a dynamic backend host, not a build-time-known
            domain, so next/image's remotePatterns config doesn't fit. */}
            <img src={url} alt="" className={cn("h-full w-full", fit === "cover" ? "object-cover" : "object-contain")} />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {urls.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-md border border-dashed text-muted-foreground hover:border-foreground/50 hover:text-foreground disabled:opacity-50",
              tileSize,
            )}
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <span className="text-[10px]">Add</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        multiple={max > 1}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
