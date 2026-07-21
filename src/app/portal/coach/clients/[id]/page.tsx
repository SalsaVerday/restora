import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NoteForm } from "@/components/portal/NoteForm";
import { requireCoach } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createProgram } from "@/app/portal/coach/actions";

export const dynamic = "force-dynamic";

const input =
  "text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none";

export default async function CoachClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coach = await requireCoach();
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("profiles")
    .select("id, username, full_name, email, coach_id")
    .eq("id", id)
    .single();

  if (!client || client.coach_id !== coach.id) notFound();

  const [{ data: programs }, { data: notes }] = await Promise.all([
    supabase
      .from("programs")
      .select("id, title, status, created_at")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("notes")
      .select("id, kind, title, created_at")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <Container className="flex flex-col gap-10">
      <div>
        <Link
          href="/portal/coach"
          className="text-muted hover:text-brand-600 mb-4 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" /> All clients
        </Link>
        <h1 className="font-display text-ink text-3xl font-semibold">
          {client.full_name}
        </h1>
        <p className="text-muted mt-1">
          @{client.username} · {client.email}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-ink mb-4 text-lg font-semibold">
            New program
          </h2>
          <form action={createProgram} className="flex flex-col gap-3">
            <input type="hidden" name="clientId" value={client.id} />
            <input
              name="title"
              placeholder="Program title"
              required
              className={input}
            />
            <textarea
              name="notes"
              placeholder="Overview (optional)"
              rows={2}
              className={input}
            />
            <Button type="submit" className="w-full sm:w-auto">
              Create & add exercises
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-2">
            {programs && programs.length > 0 ? (
              programs.map((p) => (
                <Link
                  key={p.id}
                  href={`/portal/coach/programs/${p.id}`}
                  className="hover:ring-brand-300 bg-sand/50 flex items-center justify-between rounded-xl px-4 py-3 text-sm ring-1 ring-transparent transition"
                >
                  <span className="text-ink font-medium">{p.title}</span>
                  <ArrowRight className="text-brand-600 size-4" />
                </Link>
              ))
            ) : (
              <p className="text-muted text-sm">No programs yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-ink mb-4 text-lg font-semibold">
            Feedback & guidance
          </h2>
          <NoteForm clientId={client.id} />
          <div className="mt-6 flex flex-col gap-2">
            {notes && notes.length > 0 ? (
              notes.map((n) => (
                <div
                  key={n.id}
                  className="bg-sand/50 rounded-xl px-4 py-3 text-sm"
                >
                  <span className="text-brand-600 text-xs font-semibold uppercase">
                    {n.kind}
                  </span>
                  <div className="text-ink font-medium">{n.title}</div>
                </div>
              ))
            ) : (
              <p className="text-muted text-sm">No notes yet.</p>
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
