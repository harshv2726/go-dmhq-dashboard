import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Boxes,
  CreditCard,
  Link2,
  MessageCircle,
  Package,
  PackageSearch,
  Plane,
  Share2,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { HowItWorksIllustration } from "@/components/how-it-works-illustration";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

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

const aiCapabilities = [
  {
    icon: BarChart3,
    title: "Analytics that talk back",
    description: "Ask what's selling, what's slowing down, and why — in plain English, not a spreadsheet.",
  },
  {
    icon: PackageSearch,
    title: "Restock before you run out",
    description: "Flags what's about to sell out, based on how fast it's actually moving.",
  },
  {
    icon: Users,
    title: "Know your repeat buyers",
    description: "Surfaces who keeps coming back and who's gone quiet, so you know who to reach.",
  },
  {
    icon: Wand2,
    title: "Drafted replies, ready to send",
    description: "Common DM questions get a suggested answer — you just approve and send.",
  },
];

const storeTypes = [
  {
    icon: ShoppingBag,
    name: "Commerce",
    description: "Physical products for Instagram sellers",
    colorVar: "--chart-1",
  },
  { icon: Plane, name: "Travel", description: "Tour packages for local travel agents", colorVar: "--chart-2" },
  { icon: Ticket, name: "Event", description: "Tickets for local event organizers", colorVar: "--chart-3" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] opacity-60 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_10%,black,transparent)]"
            style={{
              backgroundImage: `radial-gradient(color-mix(in oklch, var(--foreground), transparent 88%) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="animate-float pointer-events-none absolute -top-16 left-[8%] -z-10 size-72 rounded-full bg-primary/15 blur-3xl motion-reduce:hidden"
            style={{ animationDuration: "9s" }}
          />
          <div
            aria-hidden
            className="animate-float pointer-events-none absolute top-10 right-[10%] -z-10 size-64 rounded-full bg-[color-mix(in_oklch,var(--chart-2),transparent_60%)] blur-3xl motion-reduce:hidden"
            style={{ animationDuration: "11s", animationDelay: "1.5s" }}
          />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
            <h1 className="animate-fade-up text-balance font-heading text-4xl font-semibold tracking-tight motion-reduce:animate-none sm:text-5xl">
              Getting customers was never your problem. Losing track of them was.
            </h1>
            <p
              className="animate-fade-up max-w-2xl text-balance text-lg text-muted-foreground motion-reduce:animate-none"
              style={{ animationDelay: "100ms" }}
            >
              Every &ldquo;is this available?&rdquo;, every payment screenshot, every &ldquo;I&apos;ll pay
              now&rdquo; — DMHQ keeps it straight. Who paid, who&apos;s next, what ships today. No spreadsheet,
              no scrolling back through old chats.
            </p>
            <div
              className="animate-fade-up flex flex-col gap-3 motion-reduce:animate-none sm:flex-row"
              style={{ animationDelay: "200ms" }}
            >
              <Button size="lg" className="px-6" asChild>
                <Link href="/register">Start selling free</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-6" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </div>
            <p
              className="animate-fade-up text-sm text-muted-foreground motion-reduce:animate-none"
              style={{ animationDelay: "300ms" }}
            >
              No website. No code. Store live at <span className="font-medium text-foreground">dmhq.in/you</span> in
              under 2 minutes.
            </p>
          </div>
        </section>

        {/* The problem, plainly */}
        <section className="border-t border-border">
          <Reveal className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              You already built the shop. It&apos;s just in your DMs.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Someone sends a screenshot. You scroll up to check if they actually paid. You reply to five
              people and forget the sixth. Nothing&apos;s written down anywhere.
            </p>
            <p className="mt-4 text-muted-foreground">
              That was never a sales problem — it&apos;s a tracking problem. Think of DMHQ as a control tower
              for your DMs: every order lands properly, nothing crashes, and you always know who&apos;s next.
            </p>
          </Reveal>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
              <p className="mt-2 text-muted-foreground">Post it. Link it. Ship it.</p>
            </Reveal>

            {/* Illustration: a checkout link opened on a phone, with the three
                steps fanned around it as floating cards that swap the phone's
                screen on hover (auto-cycling otherwise). Decorative — the
                numbered list below carries the actual content for anyone on
                a small screen or a screen reader. */}
            <Reveal delayMs={150}>
              <HowItWorksIllustration />
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16">
              {steps.map((step, i) => (
                <Reveal key={step.number} delayMs={i * 100} className="flex flex-col items-start gap-3">
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="mt-2 text-muted-foreground">
                A thin, focused toolkit — not a bloated e-commerce platform you&apos;ll never fully use.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delayMs={(i % 3) * 100}>
                  <div className="h-full rounded-xl border border-border bg-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <feature.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Store types */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Built for how you sell</h2>
              <p className="mt-2 text-muted-foreground">
                Whatever you&apos;re selling on social, there&apos;s a store type for it.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {storeTypes.map((type, i) => (
                <Reveal key={type.name} delayMs={i * 100}>
                  <div className="h-full rounded-xl border border-border bg-card p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div
                      className="mx-auto flex size-12 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklch, var(${type.colorVar}), transparent 85%)`,
                        color: `var(${type.colorVar})`,
                      }}
                    >
                      <type.icon className="size-6" />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold">{type.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AI, coming soon */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Sparkles className="size-3.5" />
                Coming soon
              </span>
              <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                An AI that actually runs your store
              </h2>
              <p className="mt-2 text-muted-foreground">
                We&apos;re building an assistant into DMHQ that reads your store&apos;s data so you don&apos;t have
                to — starting with analytics, and growing from there.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aiCapabilities.map((item, i) => (
                <Reveal key={item.title} delayMs={i * 100}>
                  <div className="h-full rounded-xl border border-dashed border-border bg-card/50 p-6">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-border">
          <Reveal className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Simple, honest pricing</h2>
            <p className="mt-2 text-muted-foreground">
              <span className="font-medium text-foreground">₹199/month</span> for the dashboard, or{" "}
              <span className="font-medium text-foreground">₹499/month</span> with a live storefront included. No
              setup fee, no contracts — cancel anytime.
            </p>
            <Button size="lg" className="mt-6 px-6" asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="relative isolate overflow-hidden border-t border-border bg-primary text-primary-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
            style={{
              backgroundImage: `radial-gradient(var(--primary-foreground) 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Your shop already has customers. It just needs a tower.
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              DMHQ keeps track of who ordered, who paid, and what ships next — so nothing gets lost in the
              DMs.
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
