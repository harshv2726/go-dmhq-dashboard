import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "What is DMHQ?",
  description:
    "DMHQ is the seller operations platform for Instagram and WhatsApp sellers — orders, payments, and a ready-made storefront, so nothing gets lost in the DMs.",
};

export default function AboutPage() {
  return (
    <div className="marketing-light flex min-h-svh flex-col bg-background text-foreground">
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
              We didn&apos;t build another storefront. We built the front desk.
            </h1>
            <p
              className="animate-fade-up max-w-2xl text-balance text-lg text-muted-foreground motion-reduce:animate-none"
              style={{ animationDelay: "100ms" }}
            >
              DMHQ is the seller operations platform for Instagram and WhatsApp sellers — orders, payments, and a
              ready-made storefront, so nothing gets lost in the DMs.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-border">
          <Reveal className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="text-muted-foreground">
              Every day, thousands of sellers across India run real businesses out of Instagram and WhatsApp. No
              shop board, no storefront to design, no &ldquo;Add to Cart&rdquo; button they had to build — just a
              DM that says &ldquo;is this available?&rdquo; and a seller who makes it happen.
            </p>
            <p className="mt-4 text-muted-foreground">
              That&apos;s not a small business. That&apos;s a business that already works. The audience is there.
              The trust is there. The sales happen, one message at a time.
            </p>
            <p className="mt-4 font-medium text-foreground">
              What&apos;s missing isn&apos;t a store. It&apos;s what happens <em>after</em> someone says yes.
            </p>
          </Reveal>
        </section>

        {/* The problem we saw */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">The problem we saw</h2>
              <p className="mt-4 text-muted-foreground">
                Ask any Instagram seller how they run their business, and you&apos;ll hear some version of the same
                thing: screenshots for payment proof, scrolling up to check who actually paid, a notebook somewhere
                with half the orders written down, and at least one customer who got missed because five others
                messaged at the same time.
              </p>
              <p className="mt-4 text-muted-foreground">
                It&apos;s not disorganization. It&apos;s a shop with no one at the front desk — every seller is the
                owner, the salesperson, and the record-keeper, all at once, all in the same chat.
              </p>
            </Reveal>
          </div>
        </section>

        {/* What DMHQ actually is */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                What DMHQ actually is
              </h2>
              <p className="mt-4 text-muted-foreground">DMHQ is the front desk your shop never had.</p>
              <p className="mt-4 text-muted-foreground">
                You get a ready-made storefront — you don&apos;t build it, you customize it. Add your products,
                pick your colors, and you&apos;re live at your own link in minutes. It isn&apos;t there for
                browsing so much as so Google can find you: customers who search for what you sell should land on
                a real page, not a dead end. Share it wherever your customers already are — Instagram, WhatsApp,
                wherever the conversation is happening. When someone buys, the order is created automatically, and
                you get notified on WhatsApp. No design decisions. No blank canvas. Just your existing shop,
                finally with someone keeping track.
              </p>
            </Reveal>
            <Reveal
              delayMs={100}
              className="mt-8 rounded-xl border border-border bg-card px-6 py-8 text-center sm:px-10"
            >
              <p className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                &ldquo;A waiter who never forgets an order. A traffic cop for your DMs, making sure orders move one
                at a time instead of colliding into chaos.&rdquo;
              </p>
            </Reveal>
            <Reveal delayMs={150} className="mt-8 text-center font-medium text-foreground">
              You already built the shop. We just make sure nothing falls through the cracks.
            </Reveal>
          </div>
        </section>

        {/* Why we didn't build another Shopify */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Why we didn&apos;t build &ldquo;another Shopify&rdquo;
              </h2>
              <p className="mt-4 text-muted-foreground">
                We looked closely at the tools already out there — and most of them ask sellers to do the same
                thing: design a store, learn a new dashboard, move your audience somewhere new.
              </p>
              <p className="mt-4 text-muted-foreground">
                But sellers don&apos;t need a new storefront. They need one that&apos;s already built, and someone
                at the front desk keeping things in order. So we kept DMHQ deliberately simple — one flat plan,
                zero commission on your sales, no unnecessary settings to configure. Just enough to keep orders
                moving, and nothing to slow you down.
              </p>
            </Reveal>
          </div>
        </section>

        {/* One plan */}
        <section className="border-t border-border">
          <Reveal className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              One plan. Whoever you are.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Just starting out? Get your first product live in minutes, no learning curve. Already have an
              audience? Stop losing orders in the chaos of a busy inbox. DMHQ works the same way at ten orders a
              week or ten thousand —{" "}
              <Link href="/#pricing" className="text-foreground underline underline-offset-2">
                the price doesn&apos;t change
              </Link>
              , and neither does the simplicity.
            </p>
          </Reveal>
        </section>

        {/* Why we're building this */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Why we&apos;re building this
              </h2>
              <p className="mt-4 text-muted-foreground">
                Most e-commerce tools were built for people opening a business for the first time — a blank
                canvas, a theme to pick, a brand to build from scratch. But that&apos;s not who most sellers on
                Instagram and WhatsApp are. They already have the business. They already have customers who trust
                them. What they never had was the boring, unglamorous infrastructure underneath — the receipt, the
                record, the &ldquo;who paid, what ships next.&rdquo;
              </p>
              <p className="mt-4 text-muted-foreground">
                DMHQ exists to be that infrastructure. Quietly. Without asking sellers to become something
                they&apos;re not.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary text-primary-foreground">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Post it. Link it. Ship it.
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              That&apos;s the whole idea. You already have customers walking in. We just gave them a front desk.
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
