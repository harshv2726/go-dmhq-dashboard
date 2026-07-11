"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_state: "Login expired — please try again.",
  no_code: "Google didn't return an authorization code.",
  exchange_failed: "Couldn't verify your Google account.",
  user_fetch_failed: "Couldn't read your Google profile.",
  token_failed: "Failed to start your session.",
};

// Lands here after auth.GoogleHandler.Callback redirects back with tokens
// in the query string (or an ?error=... code if the OAuth flow failed).
export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeOAuthLogin } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const error = searchParams.get("error");
    if (error) {
      toast.error(ERROR_MESSAGES[error] ?? "Google login failed");
      router.replace("/login");
      return;
    }

    const accessToken = searchParams.get("access_token");
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    completeOAuthLogin(accessToken).then((ok) => {
      if (ok) {
        router.replace("/");
      } else {
        toast.error("Failed to complete login");
        router.replace("/login");
      }
    });
  }, [searchParams, completeOAuthLogin, router]);

  return (
    <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">Logging in…</div>
  );
}
