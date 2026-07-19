"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Package, Send, Share2, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 3200;

const cards = [
  {
    icon: Package,
    label: "Step 1",
    title: "Add a product",
    blurb: "Get a checkout link — no website to build.",
    position: "absolute left-0 top-16 w-56 -rotate-6",
    floatDelay: "0ms",
  },
  {
    icon: Share2,
    label: "Step 2",
    title: "Share the link",
    blurb: "Drop it in your bio, a DM, or a status.",
    position: "absolute right-0 top-6 w-56 rotate-6",
    floatDelay: "1200ms",
  },
  {
    icon: ShoppingBag,
    label: "Step 3",
    title: "Get paid, ship it",
    blurb: "Order lands in your dashboard. You ship it.",
    position: "absolute bottom-0 right-6 w-56 -rotate-3",
    floatDelay: "2400ms",
  },
] as const;

// Cross-fades between three phone-screen states — one per step — either
// automatically on a loop or by hovering the fanned card for that step.
export function HowItWorksIllustration() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % cards.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  function hoverCard(i: number) {
    paused.current = true;
    setActive(i);
  }

  function releaseCard() {
    paused.current = false;
  }

  return (
    <div className="relative mx-auto mt-16 hidden h-95 max-w-3xl lg:block">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_50%_40%,color-mix(in_oklch,var(--primary),transparent_92%),transparent)]"
      />

      {/* Phone */}
      <div className="absolute left-1/2 top-0 w-55 -translate-x-1/2 rounded-[2.25rem] border-[6px] border-foreground bg-foreground shadow-xl">
        <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
        <div className="relative h-90 overflow-hidden rounded-[1.75rem] bg-card">
          <PhoneScreen visible={active === 0}>
            <p className="truncate text-[11px] text-muted-foreground">dmhq.in/priya</p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-2.5">
              <div className="size-12 shrink-0 rounded-lg bg-accent" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Handmade clay mug</p>
                <p className="text-xs text-muted-foreground">₹499</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-primary/40 py-2.5 text-xs font-medium text-primary">
              <Link2 className="size-3.5" />
              Checkout link ready
            </div>
          </PhoneScreen>

          <PhoneScreen visible={active === 1}>
            <p className="truncate text-[11px] text-muted-foreground">WhatsApp</p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-2.5">
              <div className="size-12 shrink-0 rounded-lg bg-accent" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Handmade clay mug</p>
                <p className="truncate text-[11px] text-muted-foreground">dmhq.in/priya/mug</p>
              </div>
            </div>
            <div className="mt-5 ml-8 flex items-center gap-1.5 rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
              <Send className="size-3" />
              <p className="text-[11px] leading-tight">Here&apos;s the link ✨</p>
            </div>
          </PhoneScreen>

          <PhoneScreen visible={active === 2}>
            <p className="truncate text-[11px] text-muted-foreground">dmhq.in/priya</p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-2.5">
              <div className="size-12 shrink-0 rounded-lg bg-accent" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Handmade clay mug</p>
                <p className="text-xs text-muted-foreground">₹499</p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-primary py-2.5 text-center text-xs font-medium text-primary-foreground">
              Pay ₹499
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-accent px-2.5 py-2.5">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </div>
              <p className="text-[11px] leading-tight text-accent-foreground">
                Order confirmed — notified on WhatsApp
              </p>
            </div>
          </PhoneScreen>
        </div>
      </div>

      {/* Fanned step cards. Rotation lives on the outer (positioned) div and
          the float animation on the inner one — animating `transform` on
          the same element as a static rotate class would overwrite it
          instead of composing with it. Hovering a card previews that
          step's phone screen and pauses the auto-advance loop. */}
      {cards.map((card, i) => (
        <div key={card.title} className={card.position} onMouseEnter={() => hoverCard(i)} onMouseLeave={releaseCard}>
          <div
            className={cn(
              "animate-float cursor-default rounded-xl border bg-card p-4 shadow-lg transition-shadow motion-reduce:animate-none",
              active === i ? "border-primary shadow-xl" : "border-border",
            )}
            style={{ animationDelay: card.floatDelay }}
          >
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <card.icon className="size-3.5" />
              </div>
              <span className="font-heading text-xs font-semibold text-muted-foreground">{card.label}</span>
            </div>
            <p className="mt-2 text-sm font-semibold">{card.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhoneScreen({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "absolute inset-0 px-4 pb-4 pt-9 transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {children}
    </div>
  );
}
