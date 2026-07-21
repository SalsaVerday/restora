"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[var(--background)]/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-brand-600 text-sm font-medium transition-colors",
                  active ? "text-brand-600" : "text-ink/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href={site.cta.secondary.href} variant="ghost" size="sm">
            {site.cta.secondary.label}
          </Button>
          <Button href={site.cta.primary.href} size="sm">
            {site.cta.primary.label}
          </Button>
        </div>

        <button
          type="button"
          className="text-ink inline-flex size-10 items-center justify-center rounded-lg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-black/5 bg-[var(--background)] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-ink rounded-lg px-3 py-3 text-base font-medium hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                href={site.cta.secondary.href}
                variant="secondary"
                size="lg"
              >
                {site.cta.secondary.label}
              </Button>
              <Button href={site.cta.primary.href} size="lg">
                {site.cta.primary.label}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
