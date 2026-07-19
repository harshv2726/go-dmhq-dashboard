import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DMHQ collects, uses, and protects data for sellers and their customers.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated July 2026</p>

          <div className="prose-p:text-muted-foreground mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p+p]:mt-3">
            <section>
              <h2>Overview</h2>
              <p>
                DMHQ (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides the software sellers use to run a store —
                including the seller dashboard and the storefronts it powers at dmhq.in/*. This policy covers both
                sides of that: data we collect from sellers who run a store on DMHQ, and data collected from
                customers who buy from those stores. It doesn&apos;t cover what an individual seller does with the
                data once they have it — for example, how they contact a customer directly outside the platform.
              </p>
            </section>

            <section>
              <h2>Information we collect</h2>
              <p>
                <strong className="text-foreground">Seller accounts.</strong> Name, email address, and password (or
                your Google account details if you sign in with Google), plus your store&apos;s name, URL slug, and
                any branding, policy, or shipping settings you configure.
              </p>
              <p>
                <strong className="text-foreground">Customers.</strong> When someone checks out on a store, we
                collect their name, phone number, shipping address, and optionally an email address. Returning
                customers can sign in with a one-time code sent by SMS to their phone — we store that phone number to
                match them to their past orders.
              </p>
              <p>
                <strong className="text-foreground">Orders and payments.</strong> Line items, prices, and order
                status for every order placed. Payments are processed by Razorpay — DMHQ never sees or stores full
                card numbers; Razorpay shares back only the payment status and a reference ID.
              </p>
            </section>

            <section>
              <h2>How we use it</h2>
              <p>
                To operate the store: creating orders, calculating shipping and tax, processing payments, and
                sending order and shipping updates by SMS or WhatsApp. To run the seller dashboard: authentication,
                showing a seller their own orders and revenue, and nothing beyond that seller&apos;s own store. We
                don&apos;t sell personal data to third parties.
              </p>
            </section>

            <section>
              <h2>Third-party services</h2>
              <p>
                We rely on a small number of processors to run DMHQ: Razorpay for payment processing, an SMS
                provider for one-time login codes and order notifications, and Google for optional sign-in. A seller
                may also independently connect their own Meta Pixel or Google Analytics to their store — if they do,
                that&apos;s the seller&apos;s own tracking configuration on their store, governed by their choices,
                not DMHQ&apos;s.
              </p>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                We use a small number of strictly-necessary cookies to keep you signed in — as a seller in the
                dashboard, and as a customer on a storefront after verifying a login code. We don&apos;t use
                advertising or cross-site tracking cookies ourselves.
              </p>
            </section>

            <section>
              <h2>Data retention</h2>
              <p>
                We keep account and order data for as long as the account is active, and for a reasonable period
                after to satisfy accounting, tax, and dispute-resolution obligations. Login codes expire and are
                deleted automatically shortly after use.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                You can ask us to access, correct, or delete the personal data we hold about you by emailing{" "}
                <a href="mailto:privacy@dmhq.in" className="text-foreground underline underline-offset-2">
                  privacy@dmhq.in
                </a>
                . For data held about you by a specific store you bought from, we may need to check with that
                seller before acting on the request.
              </p>
            </section>

            <section>
              <h2>Changes to this policy</h2>
              <p>
                If this policy changes in a material way, we&apos;ll update the date at the top of this page. We
                encourage checking back periodically.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Questions about this policy?{" "}
                <a href="mailto:privacy@dmhq.in" className="text-foreground underline underline-offset-2">
                  privacy@dmhq.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
