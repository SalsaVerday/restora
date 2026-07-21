import Link from "next/link";
import { LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { signOut } from "@/app/portal/actions";
import type { Profile } from "@/db/schema";

export function PortalHeader({ profile }: { profile: Profile }) {
  const isCoach = profile.role === "coach";
  const nav = isCoach
    ? [
        { label: "Clients", href: "/portal/coach" },
        { label: "Exercise library", href: "/portal/coach/exercises" },
      ]
    : [
        { label: "My program", href: "/portal" },
        { label: "Feedback", href: "/portal/notes" },
      ];

  return (
    <header className="border-b border-black/5 bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav
            className="hidden items-center gap-6 sm:flex"
            aria-label="Portal"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink/80 hover:text-brand-600 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-muted hidden text-sm sm:inline">
            {profile.fullName}{" "}
            <span className="bg-brand-50 text-brand-600 rounded-full px-2 py-0.5 text-xs font-semibold">
              {isCoach ? "Coach" : "Client"}
            </span>
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-muted hover:text-brand-600 inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </Container>
    </header>
  );
}
