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

interface FormState {
  tax_inclusive: boolean;
  tax_rate_percent: string;
}

function toFormState(s: Store): FormState {
  return {
    tax_inclusive: s.tax_inclusive,
    tax_rate_percent: String(s.tax_rate_percent ?? 0),
  };
}

interface TaxSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

export function TaxSettingsForm({ initial, onSaved }: TaxSettingsFormProps) {
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
        tax_inclusive: values.tax_inclusive,
        tax_rate_percent: Number(values.tax_rate_percent) || 0,
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
          <CardTitle>Taxes</CardTitle>
          <CardDescription>How GST is shown to buyers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={values.tax_inclusive ? "inclusive" : "exclusive"}
            onValueChange={(v) => set("tax_inclusive", v === "inclusive")}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="inclusive" id="tax-inclusive" />
              <Label htmlFor="tax-inclusive" className="font-normal">
                Prices include tax
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="exclusive" id="tax-exclusive" />
              <Label htmlFor="tax-exclusive" className="font-normal">
                Add GST at checkout
              </Label>
            </div>
          </RadioGroup>
          {!values.tax_inclusive && (
            <div className="space-y-2">
              <Label htmlFor="gst-percent">GST rate (%)</Label>
              <Input
                id="gst-percent"
                type="number"
                placeholder="e.g. 18"
                value={values.tax_rate_percent}
                onChange={(e) => set("tax_rate_percent", e.target.value)}
              />
            </div>
          )}
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
