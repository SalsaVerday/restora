import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Dumbbell, NotebookPen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PortalHome() {
  const profile = await requireProfile();
  if (profile.role === "coach") redirect("/portal/coach");

  const supabase = await createClient();
  const [{ data: programs }, { data: notes }] = await Promise.all([
    supabase
      .from("programs")
      .select("id, title, status, created_at")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("notes")
      .select("id, kind, title, created_at")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <Container className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-ink text-3xl font-semibold">
          Welcome back, {profile.fullName.split(" ")[0]}
        </h1>
        <p className="text-muted mt-1">
          Your programs and feedback from your coach, all in one place.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-ink flex items-center gap-2 text-xl font-semibold">
          <Dumbbell className="text-brand-600 size-5" /> Your programs
        </h2>
        {programs && programs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={`/portal/program/${p.id}`}
                className="hover:ring-brand-300 flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-black/5 transition"
              >
                <div>
                  <div className="text-ink font-semibold">{p.title}</div>
                  <div className="text-muted text-sm capitalize">
                    {p.status}
                  </div>
                </div>
                <ArrowRight className="text-brand-600 size-5" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            No program assigned yet. Your coach will add one soon.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-ink flex items-center gap-2 text-xl font-semibold">
          <NotebookPen className="text-brand-600 size-5" /> Latest feedback
        </h2>
        {notes && notes.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {notes.map((n) => (
              <li
                key={n.id}
                className="rounded-2xl bg-white p-5 ring-1 ring-black/5"
              >
                <span className="text-brand-600 text-xs font-semibold uppercase">
                  {n.kind}
                </span>
                <div className="text-ink font-medium">{n.title}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            No feedback yet.
          </p>
        )}
        <Link
          href="/portal/notes"
          className="text-brand-600 text-sm font-medium hover:underline"
        >
          View all feedback →
        </Link>
      </section>
    </Container>
  );
}
