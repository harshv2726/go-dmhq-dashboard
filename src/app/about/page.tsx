import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "What is DMHQ?",
  description:
    "DMHQ is the operations layer for Instagram and WhatsApp sellers — orders, payments, inventory, and shipping, so you can stay focused on content and customers.",
};

const matters = [
  "Onboarding in under 2 minutes",
  "Store live with zero technical knowledge",
  "WhatsApp order notifications out of the box",
  "A payment link that works on the first try",
];

const doesntMatter = ["Fancy theme customization", "A complex, cluttered dashboard", "Feature bloat you'll never use"];

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent)]"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
            <h1 className="animate-fade-up text-balance font-heading text-4xl font-semibold tracking-tight motion-reduce:animate-none sm:text-5xl">
              What is DMHQ?
            </h1>
            <p
              className="animate-fade-up max-w-2xl text-balance text-lg text-muted-foreground motion-reduce:animate-none"
              style={{ animationDelay: "100ms" }}
            >
              A social commerce operating system for sellers who run their business through Instagram and WhatsApp —
              not a website builder, and not a full e-commerce platform.
            </p>
          </div>
        </section>

        {/* The problem */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Most social sellers run their business by hand
              </h2>
              <p className="mt-4 text-muted-foreground">
                Orders come in through DMs. Payment is a UPI screenshot you have to squint at and cross-check.
                Inventory lives in your head, or a notes app, until it doesn&apos;t. It works, until you have more
                than a handful of orders a day — then it&apos;s just chaos with good intentions.
              </p>
              <p className="mt-4 text-muted-foreground">
                DMHQ replaces that with a lightweight commerce system that needs no website: add a product, get a
                checkout link, share it wherever your customers already are.
              </p>
            </Reveal>
          </div>
        </section>

        {/* What DMHQ actually is */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                The operations layer behind your Instagram
              </h2>
              <p className="mt-4 text-muted-foreground">
                Instagram is where you find customers. DMHQ is where you run the business — orders, payments,
                inventory, and WhatsApp notifications — so you can stay focused on content and customers instead of
                admin.
              </p>
            </Reveal>
            <Reveal
              delayMs={100}
              className="mt-8 rounded-xl border border-border bg-card px-6 py-8 text-center sm:px-10"
            >
              <p className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                &ldquo;Instagram is where you find customers. DMHQ is where you run the business.&rdquo;
              </p>
            </Reveal>
          </div>
        </section>

        {/* What we believe */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">What we believe</h2>
              <p className="mt-2 text-muted-foreground">
                Our moat is speed of setup, not depth of features — so we&apos;re deliberate about what&apos;s in
                scope.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-semibold">What matters</h3>
                <ul className="mt-4 space-y-3">
                  {matters.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delayMs={100} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-semibold">What doesn&apos;t</h3>
                <ul className="mt-4 space-y-3">
                  {doesntMatter.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary text-primary-foreground">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Tap, buy, done — see it for yourself
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Set up a checkout link in under two minutes. No credit card, no code.
            </p>
            <Button size="lg" variant="secondary" className="mt-2 px-6" asChild>
              <Link href="/register">Start selling free</Link>
            </Button>
          </Reveal>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
