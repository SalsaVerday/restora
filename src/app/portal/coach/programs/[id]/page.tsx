import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AddProgramItemForm } from "@/components/portal/AddProgramItemForm";
import { requireCoach } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteProgramItem } from "@/app/portal/coach/actions";

export const dynamic = "force-dynamic";

type ItemRow = {
  id: string;
  day_label: string | null;
  sets: string | null;
  reps: string | null;
  notes: string | null;
  exercises: { name: string; category: string } | null;
};

export default async function ProgramBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coach = await requireCoach();
  const { id } = await params;
  const supabase = await createClient();

  const { data: program } = await supabase
    .from("programs")
    .select("id, title, notes, coach_id, client_id")
    .eq("id", id)
    .single();

  if (!program || program.coach_id !== coach.id) notFound();

  const [{ data: client }, { data: items }, { data: exercises }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name")
        .eq("id", program.client_id)
        .single(),
      supabase
        .from("program_items")
        .select("id, day_label, sets, reps, notes, exercises(name, category)")
        .eq("program_id", id)
        .order("position", { ascending: true }),
      supabase
        .from("exercises")
        .select("id, name, category")
        .order("name", { ascending: true }),
    ]);

  const rows = (items ?? []) as unknown as ItemRow[];

  return (
    <Container className="flex flex-col gap-8">
      <div>
        <Link
          href={`/portal/coach/clients/${program.client_id}`}
          className="text-muted hover:text-brand-600 mb-4 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" /> {client?.full_name ?? "Client"}
        </Link>
        <h1 className="font-display text-ink text-3xl font-semibold">
          {program.title}
        </h1>
      </div>

      <Card>
        <h2 className="font-display text-ink mb-4 text-lg font-semibold">
          Prescribe an exercise
        </h2>
        <AddProgramItemForm
          programId={program.id}
          exercises={exercises ?? []}
        />
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-ink text-xl font-semibold">
          Program exercises
        </h2>
        {rows.length > 0 ? (
          <ol className="flex flex-col gap-2">
            {rows.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5"
              >
                <div>
                  <div className="text-ink font-medium">
                    {item.exercises?.name ?? "Exercise"}
                    {item.day_label ? (
                      <span className="text-muted"> · {item.day_label}</span>
                    ) : null}
                  </div>
                  <div className="text-muted text-sm">
                    {[
                      item.sets && `${item.sets} sets`,
                      item.reps && `${item.reps} reps`,
                    ]
                      .filter(Boolean)
                      .join(" × ")}
                    {item.notes ? ` — ${item.notes}` : ""}
                  </div>
                </div>
                <form action={deleteProgramItem}>
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="programId" value={program.id} />
                  <button
                    type="submit"
                    aria-label="Remove exercise"
                    className="text-muted hover:text-accent-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            No exercises yet — prescribe your first above.
          </p>
        )}
      </section>
    </Container>
  );
}
