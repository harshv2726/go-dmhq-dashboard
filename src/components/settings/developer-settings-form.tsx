"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Store } from "@/lib/types";

interface DeveloperSettingsFormProps {
  initial: Store;
  onSaved: () => void;
}

function mask(key: string): string {
  return `${"•".repeat(8)} ${key.slice(-4)}`;
}

export function DeveloperSettingsForm({ initial, onSaved }: DeveloperSettingsFormProps) {
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyKey() {
    await navigator.clipboard.writeText(initial.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function regenerate() {
    setRegenerating(true);
    try {
      await api.post("/api/v1/seller/store/api-key/regenerate");
      toast.success("API key regenerated — update any storefront using the old key.");
      onSaved();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to regenerate API key");
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Developer API key</CardTitle>
          <CardDescription>
            Lets a custom storefront (built by you or a developer you hire) call DMHQ&apos;s API directly. See the{" "}
            <Link href="/developers" target="_blank" className="text-foreground underline underline-offset-2">
              API reference
            </Link>{" "}
            for how to use it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <code className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
              {mask(initial.api_key)}
            </code>
            <Button type="button" variant="outline" size="icon" onClick={copyKey} aria-label="Copy API key">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={regenerating} className="w-fit">
                Regenerate key
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Regenerate your API key?</AlertDialogTitle>
                <AlertDialogDescription>
                  Any custom storefront still using the old key will start failing immediately — you&apos;ll need to
                  update it with the new one.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={regenerate}>Regenerate</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
