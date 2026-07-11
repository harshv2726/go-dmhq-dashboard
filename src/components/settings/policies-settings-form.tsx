"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Store } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type RefundWindow = "no_returns" | "3_days" | "7_days" | "";

const REFUND_POLICY_TEMPLATES: Record<Exclude<RefundWindow, "">, string> = {
  no_returns:
    "All sales are final. We don't accept returns or exchanges, except for items that arrive damaged or defective — contact us within 48 hours of delivery for those.",
  "3_days":
    "You can request a return or exchange within 3 days of delivery. Items must be unused and in their original packaging. Contact us to start a return.",
  "7_days":
    "You can request a return or exchange within 7 days of delivery. Items must be unused and in their original packaging. Contact us to start a return.",
};

function generatePrivacyPolicyText(): string {
  return "We collect only the information needed to process your order — your name, delivery address, phone number, and payment details. We don't share this information with third parties except as required to fulfill your order (e.g. courier partners) or comply with the law.";
}

function generateTermsText(): string {
  return "By placing an order, you agree to pay the listed price plus any applicable shipping and taxes. We reserve the right to cancel orders due to stock availability or pricing errors. All disputes are subject to the jurisdiction of the seller's local courts.";
}

interface FormState {
  refund_policy: string;
  privacy_policy: string;
  terms_of_service: string;
}

function toFormState(s: Store): FormState {
  return {
    refund_policy: s.refund_policy ?? "",
    privacy_policy: s.privacy_policy ?? generatePrivacyPolicyText(),
    terms_of_service: s.terms_of_service ?? generateTermsText(),
  };
}

interface PoliciesSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

export function PoliciesSettingsForm({ initial, onSaved }: PoliciesSettingsFormProps) {
  const [values, setValues] = useState<FormState>(() => toFormState(initial));
  const [refundWindow, setRefundWindow] = useState<RefundWindow>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleRefundWindowChange(value: RefundWindow) {
    setRefundWindow(value);
    if (value !== "") set("refund_policy", REFUND_POLICY_TEMPLATES[value]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put("/api/v1/seller/store", {
        refund_policy: values.refund_policy,
        privacy_policy: values.privacy_policy,
        terms_of_service: values.terms_of_service,
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
          <CardTitle>Policies</CardTitle>
          <CardDescription>
            Pick a refund window to generate starting text, then edit any of these to match your business.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refund-window">Refund / return window</Label>
            <Select value={refundWindow} onValueChange={(v) => handleRefundWindowChange(v as RefundWindow)}>
              <SelectTrigger id="refund-window" className="w-full">
                <SelectValue placeholder="Select a window to generate text" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_returns">No returns</SelectItem>
                <SelectItem value="3_days">3 days</SelectItem>
                <SelectItem value="7_days">7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="refund-policy-text">Refund policy</Label>
              {refundWindow !== "" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => set("refund_policy", REFUND_POLICY_TEMPLATES[refundWindow as Exclude<RefundWindow, "">])}
                >
                  <RefreshCw />
                  Reset to template
                </Button>
              )}
            </div>
            <Textarea
              id="refund-policy-text"
              rows={3}
              value={values.refund_policy}
              onChange={(e) => set("refund_policy", e.target.value)}
            />
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="privacy-policy-text">Privacy policy</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => set("privacy_policy", generatePrivacyPolicyText())}
              >
                <RefreshCw />
                Reset to template
              </Button>
            </div>
            <Textarea
              id="privacy-policy-text"
              rows={3}
              value={values.privacy_policy}
              onChange={(e) => set("privacy_policy", e.target.value)}
            />
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="terms-text">Terms of service</Label>
              <Button type="button" variant="ghost" size="sm" onClick={() => set("terms_of_service", generateTermsText())}>
                <RefreshCw />
                Reset to template
              </Button>
            </div>
            <Textarea
              id="terms-text"
              rows={3}
              value={values.terms_of_service}
              onChange={(e) => set("terms_of_service", e.target.value)}
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
