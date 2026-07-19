"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SUPPORT_EMAIL = "support@dmhq.app";

// There's no support-ticket backend to submit to, so this opens the
// visitor's own mail client with the message pre-filled — a real, working
// outcome rather than a form that pretends to save somewhere.
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `Message from ${name || "DMHQ site"}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="contact-name">Name</FieldLabel>
        <Input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-email">Email</FieldLabel>
        <Input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-message">Message</FieldLabel>
        <Textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
        />
      </Field>
      <Button type="submit" className="self-start px-6">
        Send message
      </Button>
      <p className="text-xs text-muted-foreground">
        This opens your email app with the message ready to send to {SUPPORT_EMAIL}.
      </p>
    </form>
  );
}
