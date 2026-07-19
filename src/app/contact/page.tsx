import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { MarketingHeader } from "@/components/marketing/site-header";
import { MarketingFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Questions, feedback, or just want to say hi — reach the DMHQ team.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
            <p className="mt-3 text-muted-foreground">
              Questions, feedback, or just want to say hi — we read every message.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="mt-10">
            <ContactForm />
          </Reveal>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
