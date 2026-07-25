import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Check,
  CreditCard,
  LayoutGrid,
  Link2,
  MessageCircle,
  Package,
  PackageSearch,
  Plane,
  Rocket,
  Share2,
  ShoppingBag,
  Sparkles,
  Store,
  Ticket,
  TrendingUp,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { HowItWorksIllustration } from "@/components/how-it-works-illustration";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "DMHQ — Seller operations platform for Instagram and WhatsApp sellers",
  description:
    "DMHQ is the seller operations platform for Instagram and WhatsApp sellers — orders, payments, and a ready-made storefront, so nothing gets lost in the DMs.",
};

const steps = [
  {
    number: "1",
    icon: Package,
    title: "Add a product",
    description: "List what you're selling and DMHQ gives you a ready-made storefront and checkout link for it. Customize it, don't build it.",
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
    icon: Store,
    title: "Your storefront",
    description:
      "Ready-made and search-friendly — so when someone Googles what you sell, they find you, not a competitor. Customize the name, photos, and palette. No design decisions, no blank canvas.",
  },
  {
    icon: Link2,
    title: "Checkout links",
    description: "One link per product. Drop it in a story, a bio, or straight into the DM that asked for it.",
  },
  {
    icon: CreditCard,
    title: "Payments built in",
    description: "Card, UPI, and wallet checkout that works on the first try — no payment gateway to wire up.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp notifications",
    description: "Customers get order and shipping updates on WhatsApp, out of the box.",
  },
  {
    icon: Package,
    title: "Order management",
    description: "Every order tracked from placed to shipped — so you're never scrolling back through DMs to remember what happened.",
  },
  {
    icon: LayoutGrid,
    title: "Seller dashboard",
    description: "Orders, products, and revenue — all in one place, built for your phone.",
  },
];

const beforeList = [
  "“Is this available?” — five times, unanswered",
  "A payment screenshot with no name attached",
  "“Order confirm hua?” sent two hours ago, still unread",
  "Half a notebook page, and you can't read your own handwriting anymore",
];

const afterList = [
  "Every order in one list — name, product, paid or not",
  "WhatsApp sends “Order confirmed” automatically",
  "One dashboard, not six open chats",
  "Nothing forgotten, nothing re-explained",
];

const whoItsFor = [
  {
    icon: Rocket,
    title: "Just starting out?",
    description: "Get your first product live in minutes, no learning curve.",
  },
  {
    icon: TrendingUp,
    title: "Already have an audience?",
    description: "Stop losing orders in the chaos of a busy inbox.",
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
              You didn&apos;t lose the customer. You lost the message.
            </h1>
            <p
              className="animate-fade-up max-w-2xl text-balance text-lg text-muted-foreground motion-reduce:animate-none"
              style={{ animationDelay: "100ms" }}
            >
              Every &ldquo;is this available?&rdquo;, every payment screenshot, every &ldquo;I&apos;ll pay
              now&rdquo; — DMHQ keeps it all in order: who paid, who&apos;s next, what ships today. No
              spreadsheet, no scrolling through old chats.
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
              Your storefront&apos;s ready in under 2 minutes at{" "}
              <span className="font-medium text-foreground">dmhq.in/you</span> — just customize and go.
            </p>
          </div>
        </section>

        {/* Before / After */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Sound familiar?</h2>
            </Reveal>
            <div className="relative mt-10 grid gap-6 sm:grid-cols-2">
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background font-heading text-xs font-semibold text-muted-foreground shadow-sm sm:flex"
              >
                VS
              </div>
              <Reveal>
                <div className="h-full rounded-xl border border-destructive/20 bg-destructive/[0.03] p-6">
                  <h3 className="font-heading text-sm font-semibold text-muted-foreground">
                    Your DMs right now
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {beforeList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delayMs={100}>
                <div className="h-full rounded-xl border border-primary/25 bg-primary/[0.04] p-6">
                  <h3 className="font-heading text-sm font-semibold text-primary">Your DMs with DMHQ</h3>
                  <ul className="mt-4 space-y-3">
                    {afterList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <Reveal delayMs={150} className="mt-8 text-center text-sm text-muted-foreground">
              Same DMs. Same customers. Just nothing falls through anymore.
            </Reveal>
          </div>
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

        {/* Built for how you sell */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Built for how you sell</h2>
              <p className="mt-2 text-muted-foreground">
                Whatever you&apos;re selling in your DMs, DMHQ already gets it.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {storeTypes.map((type, i) => (
                <Reveal key={type.name} delayMs={i * 100} className="flex flex-col items-center text-center">
                  <div
                    className="flex size-16 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `color-mix(in oklch, var(${type.colorVar}), transparent 85%)`,
                      color: `var(${type.colorVar})`,
                    }}
                  >
                    <type.icon className="size-7" />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold">{type.name}</h3>
                  <p className="mt-1.5 max-w-48 text-sm text-muted-foreground">{type.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Whether you&apos;re just getting started, or you&apos;ve outgrown your notes app
              </h2>
            </Reveal>
            <div className="mt-12 grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
              {whoItsFor.map((item, i) => (
                <Reveal
                  key={item.title}
                  delayMs={i * 100}
                  className={`p-8 sm:p-10 ${i === 0 ? "border-b border-border sm:border-r sm:border-b-0" : ""}`}
                >
                  <item.icon className="size-8 text-primary" strokeWidth={1.5} />
                  <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="mt-2 text-muted-foreground">
                A thin, focused toolkit — not a bloated e-commerce platform you&apos;ll never fully use.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6">
              {features.map((feature, i) => {
                const isFlagship = i === 0;
                return (
                  <Reveal
                    key={feature.title}
                    delayMs={(i % 3) * 100}
                    className={
                      isFlagship
                        ? "sm:col-span-3 sm:row-span-2"
                        : i === 1 || i === 2
                          ? "sm:col-span-3"
                          : "sm:col-span-2"
                    }
                  >
                    <div
                      className={`relative h-full overflow-hidden rounded-xl border border-border bg-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${
                        isFlagship ? "flex flex-col justify-end p-8" : "p-6"
                      }`}
                    >
                      {isFlagship && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
                          style={{
                            backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: "18px 18px",
                          }}
                        />
                      )}
                      <div
                        className={`flex items-center justify-center rounded-lg bg-accent text-accent-foreground ${isFlagship ? "size-12" : "size-9"}`}
                      >
                        <feature.icon className={isFlagship ? "size-6" : "size-5"} />
                      </div>
                      <h3
                        className={`mt-4 font-heading font-semibold ${isFlagship ? "text-xl" : "text-base"}`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`mt-1.5 text-muted-foreground ${isFlagship ? "" : "text-sm"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
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
                Ask DMHQ. It answers.
              </h2>
              <p className="mt-2 text-muted-foreground">
                No dashboards to dig through. Ask &ldquo;how did I do this week?&rdquo; and get a report. Type a
                product description and DMHQ adds it for you. Ask &ldquo;what&apos;s low on stock?&rdquo; and get
                an answer — instantly, in plain language.
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
          <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                One plan. Whoever you are.
              </h2>
              <div className="mx-auto mt-4 max-w-xl space-y-2 text-muted-foreground">
                <p>Just starting out? Get your first product live in minutes, no learning curve.</p>
                <p>Already have an audience? Stop losing orders in the chaos of a busy inbox.</p>
              </div>
            </Reveal>
            <Reveal delayMs={100} className="mx-auto mt-10 max-w-sm">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="font-heading text-4xl font-semibold tracking-tight">
                  ₹999<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Everything included — storefront, checkout, payments, notifications. No transaction fees. No
                  hidden cuts on your sales.
                </p>
                <Button size="lg" className="mt-6 w-full" asChild>
                  <Link href="/register">Start selling free</Link>
                </Button>
                <p className="mt-4 text-xs text-muted-foreground">
                  No commission as you grow. Sell ₹10,000 or ₹10,00,000 a month — the price doesn&apos;t change.
                </p>
              </div>
            </Reveal>
          </div>
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
              Your shop already has customers. It just needed someone keeping track.
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
