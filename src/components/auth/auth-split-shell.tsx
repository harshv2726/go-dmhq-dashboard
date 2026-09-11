import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingPaths } from "@/components/auth/floating-paths";

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className={
          light
            ? "flex aspect-square size-7 items-center justify-center rounded-lg bg-primary-foreground text-primary"
            : "flex aspect-square size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        }
      >
        <span className="font-heading text-sm font-semibold">D</span>
      </div>
      <span className="font-heading text-lg font-semibold tracking-tight">DMHQ</span>
    </Link>
  );
}

interface AuthSplitShellProps {
  panelHeadline: string;
  panelSubhead?: string;
  panelSupporting?: string;
  children: React.ReactNode;
}

// Split-screen auth layout: a brand panel (headline + animated background
// paths) on the left for large screens, the real form on the right. The
// left panel is hidden below `lg` — BrandMark still renders inline above
// the form on mobile so the page never loses its identity.
export function AuthSplitShell({
  panelHeadline,
  panelSubhead,
  panelSupporting,
  children,
}: AuthSplitShellProps) {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <BrandMark light />

        <div className="relative z-10 mt-auto max-w-sm space-y-3">
          <p className="text-2xl leading-snug font-semibold text-balance">{panelHeadline}</p>
          {panelSubhead ? <p className="text-lg font-medium text-primary-foreground/90">{panelSubhead}</p> : null}
          {panelSupporting ? <p className="text-sm text-primary-foreground/70">{panelSupporting}</p> : null}
        </div>

        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col justify-center px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate -z-10 opacity-60"
        >
          <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <Button asChild className="absolute top-7 left-5" variant="ghost">
          <Link href="/">
            <ChevronLeft className="size-4" />
            Home
          </Link>
        </Button>

        <div className="mx-auto w-full space-y-6 sm:w-sm">
          <div className="lg:hidden">
            <BrandMark />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
