"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Store } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ShippingFeeMode = Store["shipping_fee_mode"];

interface FormState {
  shipping_fee_mode: ShippingFeeMode;
  default_shipping_fee: string;
  free_shipping_above_amount: string;
  ship_all_india: boolean;
  restricted_states: string;
  delivery_estimate_text: string;
}

function toFormState(s: Store): FormState {
  return {
    shipping_fee_mode: s.shipping_fee_mode,
    default_shipping_fee: String(s.default_shipping_fee ?? 0),
    free_shipping_above_amount: s.free_shipping_above_amount ? String(s.free_shipping_above_amount) : "",
    ship_all_india: s.ship_all_india,
    restricted_states: s.restricted_states?.join(", ") ?? "",
    delivery_estimate_text: s.delivery_estimate_text ?? "",
  };
}

interface ShippingSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

export function ShippingSettingsForm({ initial, onSaved }: ShippingSettingsFormProps) {
  const [values, setValues] = useState<FormState>(() => toFormState(initial));
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put("/api/v1/seller/store", {
        shipping_fee_mode: values.shipping_fee_mode,
        default_shipping_fee: Number(values.default_shipping_fee) || 0,
        free_shipping_above_amount: Number(values.free_shipping_above_amount) || 0,
        ship_all_india: values.ship_all_india,
        restricted_states: values.restricted_states
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        delivery_estimate_text: values.delivery_estimate_text,
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
          <CardTitle>Shipping &amp; delivery</CardTitle>
          <CardDescription>Set your delivery fee and coverage area.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Shipping fee</Label>
            <RadioGroup
              value={values.shipping_fee_mode}
              onValueChange={(v) => set("shipping_fee_mode", v as ShippingFeeMode)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="flat" id="fee-flat" />
                <Label htmlFor="fee-flat" className="font-normal">
                  Flat rate
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="free" id="fee-free" />
                <Label htmlFor="fee-free" className="font-normal">
                  Free
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="free_above" id="fee-free-above" />
                <Label htmlFor="fee-free-above" className="font-normal">
                  Free above a threshold
                </Label>
              </div>
            </RadioGroup>
          </div>
          {values.shipping_fee_mode === "flat" && (
            <div className="space-y-2">
              <Label htmlFor="flat-shipping-fee">Flat rate (₹)</Label>
              <Input
                id="flat-shipping-fee"
                type="number"
                placeholder="e.g. 60"
                value={values.default_shipping_fee}
                onChange={(e) => set("default_shipping_fee", e.target.value)}
              />
            </div>
          )}
          {values.shipping_fee_mode === "free_above" && (
            <div className="space-y-2">
              <Label htmlFor="free-above-threshold">Free above (₹)</Label>
              <Input
                id="free-above-threshold"
                type="number"
                placeholder="e.g. 999"
                value={values.free_shipping_above_amount}
                onChange={(e) => set("free_shipping_above_amount", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2 border-t pt-4">
            <Label>Delivery coverage</Label>
            <RadioGroup
              value={values.ship_all_india ? "all_india" : "restricted"}
              onValueChange={(v) => set("ship_all_india", v === "all_india")}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all_india" id="scope-all-india" />
                <Label htmlFor="scope-all-india" className="font-normal">
                  Anywhere in India
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="restricted" id="scope-restricted" />
                <Label htmlFor="scope-restricted" className="font-normal">
                  Restrict to specific states
                </Label>
              </div>
            </RadioGroup>
          </div>
          {!values.ship_all_india && (
            <div className="space-y-2">
              <Label htmlFor="restricted-states">States you deliver to</Label>
              <Input
                id="restricted-states"
                placeholder="e.g. Maharashtra, Karnataka, Delhi"
                value={values.restricted_states}
                onChange={(e) => set("restricted_states", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2 border-t pt-4">
            <Label htmlFor="delivery-estimate">Delivery estimate text</Label>
            <Input
              id="delivery-estimate"
              placeholder="e.g. 5-7 days"
              value={values.delivery_estimate_text}
              onChange={(e) => set("delivery_estimate_text", e.target.value)}
            />
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
