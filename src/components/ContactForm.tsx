"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  defaultType = "general",
}: {
  defaultType?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok)
        throw new Error((await res.json()).error ?? "Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-50 flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
        <CheckCircle2 className="text-brand-600 size-12" />
        <h2 className="font-display text-ink text-2xl font-semibold">
          Thanks — we&apos;ll be in touch
        </h2>
        <p className="text-muted max-w-sm">
          A member of our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <Field label="Company (optional)" name="company" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-ink text-sm font-medium">
          What can we help with?
        </label>
        <select
          id="type"
          name="type"
          defaultValue={defaultType}
          className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-3 focus:outline-none"
        >
          <option value="general">Getting started as a member</option>
          <option value="demo">A demo for my organization</option>
          <option value="support">Support with my account</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-ink text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-3 focus:outline-none"
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>

      {status === "error" ? (
        <p className="text-accent-600 text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-ink text-sm font-medium">
        {label}
        {required ? <span className="text-accent-500"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-3 focus:outline-none"
      />
    </div>
  );
}
