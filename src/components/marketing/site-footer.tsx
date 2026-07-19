import Link from "next/link";
import { ArrowRight } from "lucide-react";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "/about", label: "What is DMHQ" },
  { href: "/help", label: "Help Center" },
  { href: "/contact", label: "Community" },
];

const accountLinks = [
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Get started" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

function LinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground">
            {link.label}
            <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Public-site footer, shared across the marketing pages (landing, about,
// help, contact, privacy). Product/legal links use absolute paths
// (`/#section`, `/privacy`) rather than bare fragments so they work
// correctly from any page, not just when already on "/".
export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,color-mix(in_oklch,var(--primary),transparent_94%)_60%,color-mix(in_oklch,var(--primary),transparent_88%))]"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
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
            <LinkList links={productLinks} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <LinkList links={companyLinks} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Account</h3>
            <LinkList links={accountLinks} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DMHQ. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
