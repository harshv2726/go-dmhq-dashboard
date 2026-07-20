"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

interface WelcomeScreenProps {
  storeName: string;
  onDone: () => void;
}

// Shown once, right after a store's first successful subscribe — before
// landing on /home. Auto-advances so it never becomes a place someone
// gets stuck; the button just lets an impatient user skip the wait.
export function WelcomeScreen({ storeName, onDone }: WelcomeScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <div
        className="animate-float absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/40 motion-reduce:hidden"
        style={{ animationDelay: "0ms", animationDuration: "5s" }}
      />
      <div
        className="animate-float absolute top-1/3 right-[28%] h-1.5 w-1.5 rounded-full bg-accent-foreground/30 motion-reduce:hidden"
        style={{ animationDelay: "800ms", animationDuration: "6s" }}
      />
      <div
        className="animate-float absolute bottom-[30%] left-[30%] h-1 w-1 rounded-full bg-primary/50 motion-reduce:hidden"
        style={{ animationDelay: "1400ms", animationDuration: "4.5s" }}
      />
      <div
        className="animate-float absolute right-1/4 bottom-1/4 h-2 w-2 rounded-full bg-accent-foreground/20 motion-reduce:hidden"
        style={{ animationDelay: "400ms", animationDuration: "5.5s" }}
      />

      <div className="relative flex flex-col items-center gap-6">
        <div className="animate-fade-up motion-reduce:animate-none">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl" />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
        </div>

        <div>
          <h1
            className="animate-fade-up font-heading text-2xl font-semibold tracking-tight motion-reduce:animate-none sm:text-3xl"
            style={{ animationDelay: "120ms" }}
          >
            Welcome to DMHQ, {storeName}
          </h1>
          <p
            className="animate-fade-up mt-2 text-muted-foreground motion-reduce:animate-none"
            style={{ animationDelay: "240ms" }}
          >
            You&apos;re all set — taking you to your dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="animate-fade-up text-sm text-muted-foreground underline-offset-4 hover:underline motion-reduce:animate-none"
          style={{ animationDelay: "360ms" }}
        >
          Go now
        </button>
      </div>
    </div>
  );
}
