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
import { cn } from "@/lib/utils";

interface ThemePreset {
  key: string;
  label: string;
  fit: string;
  background: string;
  text: string;
  accent: string;
  cta: string;
  subtle: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    key: "minimal",
    label: "Minimal / Premium",
    fit: "Works well for most product types",
    background: "#FFFFFF",
    text: "#1A1A1A",
    accent: "#2D2D2D",
    cta: "#000000",
    subtle: "#F5F5F5",
  },
  {
    key: "warm",
    label: "Warm / Trustworthy",
    fit: "Lifestyle, wellness, food brands",
    background: "#FDFBF7",
    text: "#2B2620",
    accent: "#C97C4F",
    cta: "#8B3A2B",
    subtle: "#EFE7DC",
  },
  {
    key: "bold",
    label: "Bold / Modern",
    fit: "Fashion, streetwear, gen-z audience",
    background: "#0F0F0F",
    text: "#FFFFFF",
    accent: "#FF3B30",
    cta: "#FF3B30",
    subtle: "#1E1E1E",
  },
  {
    key: "soft",
    label: "Soft / Feminine",
    fit: "Beauty, skincare",
    background: "#FFF8F5",
    text: "#3A2E2E",
    accent: "#E8A798",
    cta: "#D67D68",
    subtle: "#F5E6E0",
  },
];

interface FormState {
  name: string;
  tagline: string;
  description: string;
  logo_url: string | null;
  banner_url: string | null;
  theme_color: string;
  theme_background: string;
  theme_text: string;
  theme_cta_color: string;
  theme_subtle: string;
  theme_preset: string;
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
    theme_background: s.theme_background,
    theme_text: s.theme_text,
    theme_cta_color: s.theme_cta_color,
    theme_subtle: s.theme_subtle,
    theme_preset: s.theme_preset ?? "",
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

  // Manually editing any brand color after picking a preset means the
  // palette no longer matches it exactly, so drop back to "custom".
  function setColor<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value, theme_preset: "" }));
  }

  function applyPreset(preset: ThemePreset) {
    setValues((v) => ({
      ...v,
      theme_preset: preset.key,
      theme_background: preset.background,
      theme_text: preset.text,
      theme_color: preset.accent,
      theme_cta_color: preset.cta,
      theme_subtle: preset.subtle,
    }));
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
          <div className="space-y-3">
            <Label>Color palette</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-colors hover:border-ring",
                    values.theme_preset === preset.key && "border-ring ring-2 ring-ring/30",
                  )}
                >
                  <div className="mb-2 flex overflow-hidden rounded-md border">
                    {[preset.background, preset.accent, preset.cta, preset.subtle].map((c, i) => (
                      <span key={i} className="h-6 flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="text-sm font-medium">{preset.label}</p>
                  <p className="text-xs text-muted-foreground">{preset.fit}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="theme_background">Background</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_background"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_background}
                  onChange={(e) => setColor("theme_background", e.target.value)}
                />
                <Input value={values.theme_background} onChange={(e) => setColor("theme_background", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme_text">Text</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_text"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_text}
                  onChange={(e) => setColor("theme_text", e.target.value)}
                />
                <Input value={values.theme_text} onChange={(e) => setColor("theme_text", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme_color">Accent</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_color"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_color}
                  onChange={(e) => setColor("theme_color", e.target.value)}
                />
                <Input value={values.theme_color} onChange={(e) => setColor("theme_color", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme_cta_color">CTA (buttons)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_cta_color"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_cta_color}
                  onChange={(e) => setColor("theme_cta_color", e.target.value)}
                />
                <Input value={values.theme_cta_color} onChange={(e) => setColor("theme_cta_color", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme_subtle">Subtle</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="theme_subtle"
                  type="color"
                  className="h-9 w-14 p-1"
                  value={values.theme_subtle}
                  onChange={(e) => setColor("theme_subtle", e.target.value)}
                />
                <Input value={values.theme_subtle} onChange={(e) => setColor("theme_subtle", e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
