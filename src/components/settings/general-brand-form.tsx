"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Store } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageUploader } from "@/components/media/image-uploader";

interface FormState {
  name: string;
  tagline: string;
  description: string;
  logo_url: string | null;
  banner_url: string | null;
  theme_color: string;
  font_family: string;
  instagram_url: string;
  whatsapp_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  timezone: string;
  currency: string;
}

function toFormState(s: Store): FormState {
  return {
    name: s.name,
    tagline: s.tagline ?? "",
    description: s.description ?? "",
    logo_url: s.logo_url,
    banner_url: s.banner_url,
    theme_color: s.theme_color,
    font_family: s.font_family ?? "",
    instagram_url: s.instagram_url ?? "",
    whatsapp_number: s.whatsapp_number ?? "",
    address_line1: s.address_line1 ?? "",
    address_line2: s.address_line2 ?? "",
    city: s.city ?? "",
    state: s.state ?? "",
    pincode: s.pincode ?? "",
    country: s.country ?? "",
    timezone: s.timezone,
    currency: s.currency,
  };
}

interface GeneralBrandFormProps {
  initial: Store;
  onSaved: () => void;
}

export function GeneralBrandForm({ initial, onSaved }: GeneralBrandFormProps) {
  const [values, setValues] = useState<FormState>(() => toFormState(initial));
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put("/api/v1/seller/store", values);
      toast.success("Store settings saved");
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
          <CardTitle>General</CardTitle>
          <CardDescription>Business details shown to customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store name</Label>
            <Input id="name" required value={values.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" value={values.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address_line1">Address line 1</Label>
              <Input
                id="address_line1"
                value={values.address_line1}
                onChange={(e) => set("address_line1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line2">Address line 2</Label>
              <Input
                id="address_line2"
                value={values.address_line2}
                onChange={(e) => set("address_line2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={values.city} onChange={(e) => set("city", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" value={values.state} onChange={(e) => set("state", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" value={values.pincode} onChange={(e) => set("pincode", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={values.country} onChange={(e) => set("country", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" value={values.timezone} onChange={(e) => set("timezone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                maxLength={3}
                value={values.currency}
                onChange={(e) => set("currency", e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand</CardTitle>
          <CardDescription>Logo, banner, colors, and contact links.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Logo</Label>
              <ImageUploader
                urls={values.logo_url ? [values.logo_url] : []}
                onChange={(urls) => set("logo_url", urls[0] ?? null)}
                max={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Banner</Label>
              <ImageUploader
                urls={values.banner_url ? [values.banner_url] : []}
                onChange={(urls) => set("banner_url", urls[0] ?? null)}
                max={1}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="theme_color">Theme color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_color"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_color}
                  onChange={(e) => set("theme_color", e.target.value)}
                />
                <Input value={values.theme_color} onChange={(e) => set("theme_color", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font_family">Font family</Label>
              <Input id="font_family" value={values.font_family} onChange={(e) => set("font_family", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={values.instagram_url}
                onChange={(e) => set("instagram_url", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">WhatsApp number</Label>
              <Input
                id="whatsapp_number"
                value={values.whatsapp_number}
                onChange={(e) => set("whatsapp_number", e.target.value)}
              />
            </div>
          </div>
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
