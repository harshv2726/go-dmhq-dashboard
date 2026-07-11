"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Store } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AnalyticsSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

export function AnalyticsSettingsForm({ initial, onSaved }: AnalyticsSettingsFormProps) {
  const [ga4MeasurementId, setGa4MeasurementId] = useState(initial.ga4_measurement_id ?? "");
  const [metaPixelId, setMetaPixelId] = useState(initial.meta_pixel_id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put("/api/v1/seller/store", {
        ga4_measurement_id: ga4MeasurementId,
        meta_pixel_id: metaPixelId,
      });
      toast.success("Settings saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save settings");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Track storefront visits and conversions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ga4-measurement-id">Google Analytics 4 measurement ID</Label>
            <Input
              id="ga4-measurement-id"
              placeholder="G-XXXXXXXXXX"
              value={ga4MeasurementId}
              onChange={(e) => setGa4MeasurementId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta-pixel-id">Meta Pixel ID</Label>
            <Input
              id="meta-pixel-id"
              placeholder="e.g. 123456789012345"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Leave either blank to skip it. Both load automatically on your storefront once saved.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
