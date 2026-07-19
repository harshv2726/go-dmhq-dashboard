import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Answers to common questions about setting up and running a store on DMHQ.",
};

const sellerFaqs = [
  {
    q: "How do I set up a store?",
    a: "Create an account and pick a store name — DMHQ generates your store URL (dmhq.app/your-store) automatically. You can start adding products immediately; there's no theme or website to build first.",
  },
  {
    q: "How do checkout links work?",
    a: "Every product gets its own shareable link the moment you add it. Post it in your Instagram bio, send it in a DM, or drop it in a WhatsApp status — anyone who opens it can check out directly, no app or account required on their end.",
  },
  {
    q: "How do I get paid?",
    a: "Payments run through Razorpay and support cards, UPI, and wallets. DMHQ never sees full card numbers — Razorpay handles that and reports back a payment status.",
  },
  {
    q: "How does shipping and tax work?",
    a: "Set up shipping zones and rates (or a flat fallback fee) and a tax rate in your dashboard settings, and DMHQ calculates both automatically at checkout based on the customer's address.",
  },
  {
    q: "Can I customize my storefront's navigation?",
    a: "Yes — the Navigation section of your dashboard lets you build a menu linking to collections, products, or any URL, which shows up on your storefront immediately.",
  },
];

const customerFaqs = [
  {
    q: "Do I need an account to buy something?",
    a: "No — checkout works as a guest by default. Some stores may require an account, in which case you'll verify your phone number with a one-time code.",
  },
  {
    q: "How do I check my order status?",
    a: "You'll get updates by WhatsApp or SMS as your order is confirmed and shipped. You can also sign in on the store (with the phone number you checked out with) to see your order history.",
  },
  {
    q: "I have an issue with an order — who do I contact?",
    a: "Reach out to the store you bought from directly — they handle their own orders, shipping, and returns. If you can't get a response, contact us and we'll help.",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Help Center</h1>
            <p className="mt-3 text-muted-foreground">
              Common questions from sellers running a store and customers buying from one. Can&apos;t find your
              answer?{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <h2 className="font-heading text-lg font-semibold">For sellers</h2>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {sellerFaqs.map((item) => (
                <div key={item.q} className="p-5">
                  <h3 className="text-sm font-semibold">{item.q}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <h2 className="font-heading text-lg font-semibold">For customers</h2>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {customerFaqs.map((item) => (
                <div key={item.q} className="p-5">
                  <h3 className="text-sm font-semibold">{item.q}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
