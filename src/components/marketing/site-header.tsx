import Link from "next/link";
import { Button } from "@/components/ui/button";

// Public-site header, shared across the marketing pages (landing, about).
// Not to be confused with the authenticated dashboard's site-header.tsx.
export function MarketingHeader() {
  return (
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
  );
}
