import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "API Reference",
  description: "Build a custom storefront against DMHQ's public API — no OAuth flow, no app review, one key.",
};

const quickstart = `// 1. Fetch the store — this also returns your api_key
const store = await fetch("https://api.dmhq.in/api/v1/stores/your-store").then((r) => r.json());
const { api_key } = store.data;

// 2. List products
const products = await fetch("https://api.dmhq.in/api/v1/stores/your-store/products").then((r) => r.json());

// 3. Create a cart and add an item
const cart = await fetch("https://api.dmhq.in/api/v1/stores/your-store/cart", { method: "POST" }).then((r) => r.json());
await fetch(\`https://api.dmhq.in/api/v1/stores/your-store/cart/\${cart.data.id}/items\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ product_id: products.data.items[0].id, variant_id: null, qty: 1 }),
});

// 4. Check out as a guest — this one needs your api_key
await fetch("https://api.dmhq.in/api/v1/stores/your-store/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-DMHQ-Api-Key": api_key },
  body: JSON.stringify({
    customer_name: "Jane Doe",
    customer_phone: "9876543210",
    address: { line1: "1 Main St", city: "Mumbai", state: "MH", pincode: "400001", country: "IN" },
    items: [{ product_id: products.data.items[0].id, variant_id: null, qty: 1 }],
  }),
});`;

interface Endpoint {
  method: string;
  path: string;
  desc: string;
  request?: string;
  response: string;
  keyRequired?: boolean;
}

interface Group {
  name: string;
  endpoints: Endpoint[];
}

const groups: Group[] = [
  {
    name: "Store",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/stores/{slug}",
        desc: "Store info, theme, and config — call this first to get your api_key.",
        response: "{ id, slug, name, tagline, theme_*, tax_rate_percent, customer_accounts_mode, api_key, storefront_live, ... }",
      },
    ],
  },
  {
    name: "Products",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/products",
        desc: "Paginated product list. Query: page, limit.",
        response: "{ items: Product[], page, limit, total, total_pages }",
      },
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/products/{productSlug}",
        desc: "A single product, with its options and variants.",
        response: "Product { id, name, slug, images, options, variants, price_min, price_max, total_inventory }",
      },
    ],
  },
  {
    name: "Collections",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/collections",
        desc: "Paginated collection list. Query: page, limit.",
        response: "{ items: Collection[], page, limit, total, total_pages }",
      },
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/collections/{collectionSlug}",
        desc: "A single collection and its products.",
        response: "Collection",
      },
    ],
  },
  {
    name: "Navigation & search",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/nav-menu",
        desc: "The store's navigation menu, with hrefs already resolved.",
        response: "PublicMenuItem[]",
      },
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/search",
        desc: "Search products. Query: q, category, min_price, max_price, sort, page, limit.",
        response: "{ items: Result[], page, limit, total, total_pages }",
      },
    ],
  },
  {
    name: "Cart",
    endpoints: [
      { method: "POST", path: "/api/v1/stores/{slug}/cart", desc: "Create a cart.", response: "CartView" },
      { method: "GET", path: "/api/v1/stores/{slug}/cart/{cartID}", desc: "Fetch a cart.", response: "CartView" },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/cart/{cartID}/items",
        desc: "Add an item.",
        request: "{ product_id, variant_id, qty }",
        response: "CartView",
      },
      {
        method: "PUT",
        path: "/api/v1/stores/{slug}/cart/{cartID}/items/{itemID}",
        desc: "Change an item's quantity (0 removes it).",
        request: "{ qty }",
        response: "CartView",
      },
      {
        method: "DELETE",
        path: "/api/v1/stores/{slug}/cart/{cartID}/items/{itemID}",
        desc: "Remove an item.",
        response: "CartView",
      },
      {
        method: "PUT",
        path: "/api/v1/stores/{slug}/cart/{cartID}/email",
        desc: "Attach an email to the cart.",
        request: "{ email }",
        response: "CartView",
      },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/cart/{cartID}/complete",
        desc: "Mark the cart as completed.",
        response: "null",
      },
    ],
  },
  {
    name: "Orders & payment",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/orders",
        desc: "Place an order (guest checkout unless the store requires customer accounts). Creates real inventory-decrementing orders.",
        request: "{ customer_name, customer_phone, customer_email?, address: {line1, line2?, city, state, pincode, country}, items: [{product_id, variant_id, qty}], notes? }",
        response: "{ order_id, total }",
        keyRequired: true,
      },
      {
        method: "GET",
        path: "/api/v1/stores/{slug}/orders/{orderID}",
        desc: "Look up an order by ID.",
        response: "Order",
        keyRequired: true,
      },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/payment/create",
        desc: "Create a Razorpay order for a placed order.",
        request: "{ order_id }",
        response: "{ razorpay_order_id, amount, currency, key_id }",
        keyRequired: true,
      },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/payment/verify",
        desc: "Verify a Razorpay payment signature and mark the order paid.",
        request: "{ order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature }",
        response: "{ order_id }",
        keyRequired: true,
      },
    ],
  },
  {
    name: "Customer auth",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/auth/otp/request",
        desc: "Send a one-time code by SMS to start a customer login.",
        request: "{ phone }",
        response: "null",
        keyRequired: true,
      },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/auth/otp/verify",
        desc: "Verify the code and sign the customer in.",
        request: "{ phone, code }",
        response: "{ access_token, refresh_token, customer_id, store_id }",
        keyRequired: true,
      },
      {
        method: "POST",
        path: "/api/v1/stores/{slug}/auth/refresh",
        desc: "Trade the refresh cookie for a fresh access token.",
        response: "{ access_token, refresh_token, customer_id, store_id }",
        keyRequired: true,
      },
    ],
  },
];

export default function DevelopersPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">API Reference</h1>
            <p className="mt-3 text-muted-foreground">
              Every DMHQ storefront — including our own — runs on this same public API. Build your own with Next.js,
              React, or anything that can make an HTTP request. No OAuth flow, no app review, no scopes to request —
              just one key.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <h2 className="font-heading text-lg font-semibold">Authentication</h2>
            <div className="mt-4 space-y-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <p>
                Fetching a store (<code className="rounded bg-muted px-1 py-0.5 text-foreground">GET /stores/{"{slug}"}</code>)
                returns an <code className="rounded bg-muted px-1 py-0.5 text-foreground">api_key</code> for that store.
                It&apos;s <strong className="text-foreground">not a secret</strong> — anyone browsing the storefront can
                already see it in their network tab, the same way they can see product prices. Its job is coarse abuse
                control and attribution, not access control: send it as{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-foreground">X-DMHQ-Api-Key</code> on the handful of
                endpoints below marked &ldquo;key required&rdquo; (the ones that create real orders/payments or send an
                SMS) and you&apos;re set.
              </p>
              <p>
                You can also see (and regenerate) your store&apos;s key from the dashboard under Settings →
                Developer. Regenerating immediately breaks any integration still using the old value.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <h2 className="font-heading text-lg font-semibold">Quickstart</h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-5 text-xs leading-relaxed">
              <code>{quickstart}</code>
            </pre>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <h2 className="font-heading text-lg font-semibold">Endpoints</h2>
            <div className="mt-4 space-y-8">
              {groups.map((group) => (
                <div key={group.name}>
                  <h3 className="text-sm font-semibold text-foreground">{group.name}</h3>
                  <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
                    {group.endpoints.map((ep) => (
                      <div key={ep.method + ep.path} className="p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                            {ep.method}
                          </code>
                          <code className="font-mono text-sm">{ep.path}</code>
                          {ep.keyRequired && (
                            <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning-foreground">
                              key required
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{ep.desc}</p>
                        {ep.request && (
                          <p className="mt-2 font-mono text-xs text-muted-foreground">
                            <span className="text-foreground">request:</span> {ep.request}
                          </p>
                        )}
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          <span className="text-foreground">response:</span> {ep.response}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={100} className="mt-12">
            <p className="text-sm text-muted-foreground">
              Questions or found something undocumented?{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
