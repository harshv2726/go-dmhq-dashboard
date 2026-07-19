import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  CreditCard,
  Link2,
  MessageCircle,
  Package,
  Plane,
  Share2,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "DMHQ — Your Instagram and WhatsApp are your storefront",
  description:
    "Turn Instagram DMs into real orders. Add a product, share the checkout link, get paid — no website, no code, store live in under 2 minutes.",
};

const steps = [
  {
    number: "1",
    icon: Package,
    title: "Add a product",
    description: "List what you're selling and DMHQ generates a checkout link for it — no website to build.",
  },
  {
    number: "2",
    icon: Share2,
    title: "Share the link",
    description: "Drop it in your Instagram bio, a DM, or a WhatsApp status. Wherever your followers already are.",
  },
  {
    number: "3",
    icon: ShoppingBag,
    title: "Get paid, ship it",
    description: "Customer pays, the order lands in your dashboard automatically. You just pack and ship.",
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: "Seller dashboard",
    description: "Orders, products, and revenue in one place — built for a phone screen, not a boardroom.",
  },
  {
    icon: Link2,
    title: "Checkout links",
    description: "Every product gets its own shareable link. No storefront setup, no theme to configure.",
  },
  {
    icon: CreditCard,
    title: "Payments built in",
    description: "Card, UPI, and wallet checkout that works on the first try — no payment gateway to wire up.",
  },
  {
    icon: Boxes,
    title: "Inventory tracking",
    description: "Stock updates automatically as orders come in, so you stop counting by hand.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp notifications",
    description: "Customers get order and shipping updates on WhatsApp, out of the box.",
  },
  {
    icon: Package,
    title: "Order management",
    description: "Every order tracked from placed to shipped, with status your customer can see too.",
  },
];

const storeTypes = [
  { icon: ShoppingBag, name: "Commerce", description: "Physical products for Instagram sellers" },
  { icon: Plane, name: "Travel", description: "Tour packages for local travel agents" },
  { icon: Ticket, name: "Event", description: "Tickets for local event organizers" },
];

export default function LandingPage() {
  const [Step1Icon, Step2Icon, Step3Icon] = steps.map((s) => s.icon);

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-heading text-sm font-semibold">D</span>
            </div>
            <span className="font-heading text-lg font-semibold tracking-tight">DMHQ</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent)]"
          />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
            <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Instagram and WhatsApp are your storefront. We handle the rest.
            </h1>
            <p className="max-w-2xl text-balance text-lg text-muted-foreground">
              DMHQ is the operations layer for Instagram sellers — orders, payments, inventory, and WhatsApp
              notifications — so you can stay focused on content and customers, not code.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="px-6" asChild>
                <Link href="/register">Start selling free</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-6" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No website. No code. Store live at <span className="font-medium text-foreground">dmhq.app/you</span> in
              under 2 minutes.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
              <p className="mt-2 text-muted-foreground">From DM to delivered, in three steps.</p>
            </div>

            {/* Illustration: a checkout link opened on a phone, with the three
                steps fanned around it as floating cards. Decorative — the
                numbered list below carries the actual content for anyone on
                a small screen or a screen reader. */}
            <div className="relative mx-auto mt-16 hidden h-[380px] max-w-3xl lg:block">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_50%_40%,color-mix(in_oklch,var(--primary),transparent_92%),transparent)]"
              />

              {/* Phone */}
              <div className="absolute left-1/2 top-0 w-[220px] -translate-x-1/2 rounded-[2.25rem] border-[6px] border-foreground bg-foreground shadow-xl">
                <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
                <div className="h-[360px] overflow-hidden rounded-[1.75rem] bg-card px-4 pb-4 pt-9">
                  <p className="truncate text-[11px] text-muted-foreground">dmhq.app/priya</p>
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
                </div>
              </div>

              {/* Fanned step cards */}
              <div className="absolute left-0 top-16 w-56 -rotate-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Step1Icon className="size-3.5" />
                  </div>
                  <span className="font-heading text-xs font-semibold text-muted-foreground">Step 1</span>
                </div>
                <p className="mt-2 text-sm font-semibold">{steps[0].title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Get a checkout link — no website to build.</p>
              </div>

              <div className="absolute right-0 top-6 w-56 rotate-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Step2Icon className="size-3.5" />
                  </div>
                  <span className="font-heading text-xs font-semibold text-muted-foreground">Step 2</span>
                </div>
                <p className="mt-2 text-sm font-semibold">{steps[1].title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Drop it in your bio, a DM, or a status.</p>
              </div>

              <div className="absolute bottom-0 right-6 w-56 -rotate-3 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Step3Icon className="size-3.5" />
                  </div>
                  <span className="font-heading text-xs font-semibold text-muted-foreground">Step 3</span>
                </div>
                <p className="mt-2 text-sm font-semibold">{steps[2].title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Order lands in your dashboard. You ship it.</p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <step.icon className="size-5" />
                    </div>
                    <span className="font-heading text-sm font-semibold text-muted-foreground">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="mt-2 text-muted-foreground">
                A thin, focused toolkit — not a bloated e-commerce platform you&apos;ll never fully use.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store types */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Built for how you sell</h2>
              <p className="mt-2 text-muted-foreground">
                Whatever you&apos;re selling on social, there&apos;s a store type for it.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {storeTypes.map((type) => (
                <div key={type.name} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <type.icon className="size-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-border">
          <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Simple, honest pricing</h2>
            <p className="mt-2 text-muted-foreground">
              Plans from <span className="font-medium text-foreground">₹199–₹499/month</span>, plus a small fee per
              sale. No setup cost, no long-term contract.
            </p>
            <Button size="lg" className="mt-6 px-6" asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to turn your DMs into orders?
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Your followers are ready to buy. Give them a link instead of a comment thread.
            </p>
            <Button size="lg" variant="secondary" className="mt-2 px-6" asChild>
              <Link href="/register">Start selling free</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,color-mix(in_oklch,var(--primary),transparent_94%)_60%,color-mix(in_oklch,var(--primary),transparent_88%))]"
        />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-heading text-sm font-semibold">D</span>
                </div>
                <span className="font-heading text-lg font-semibold tracking-tight">DMHQ</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Tap, buy, done. The operations layer for Instagram and WhatsApp sellers.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                {[
                  { href: "#how-it-works", label: "How it works" },
                  { href: "#features", label: "Features" },
                  { href: "#pricing", label: "Pricing" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground">
                      {link.label}
                      <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Account</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                {[
                  { href: "/login", label: "Log in" },
                  { href: "/register", label: "Get started" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground">
                      {link.label}
                      <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} DMHQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
