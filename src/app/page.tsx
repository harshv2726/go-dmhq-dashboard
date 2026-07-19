import type { Metadata } from "next";
import Link from "next/link";
import {
  Boxes,
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
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
              <p className="mt-2 text-muted-foreground">From DM to delivered, in three steps.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
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
        <section className="border-t border-border">
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
        <section className="border-t border-border">
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold tracking-tight text-foreground">DMHQ</span>
            <span>— Tap, buy, done.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link href="/register" className="hover:text-foreground">
              Get started
            </Link>
            <span>© {new Date().getFullYear()} DMHQ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
