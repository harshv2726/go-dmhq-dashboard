"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { Store } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationsSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

export function NotificationsSettingsForm({ initial, onSaved }: NotificationsSettingsFormProps) {
  const [whatsappNotificationsEnabled, setWhatsappNotificationsEnabled] = useState(
    initial.whatsapp_notifications_enabled,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put("/api/v1/seller/store", {
        whatsapp_notifications_enabled: whatsappNotificationsEnabled,
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
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Order alerts sent to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="whatsapp-notifications" className="font-normal">
              WhatsApp order notifications
            </Label>
            <Switch
              id="whatsapp-notifications"
              checked={whatsappNotificationsEnabled}
              onCheckedChange={setWhatsappNotificationsEnabled}
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
