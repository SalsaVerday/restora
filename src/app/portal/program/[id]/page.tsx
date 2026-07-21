import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { VideoPlayer } from "@/components/portal/VideoPlayer";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ItemRow = {
  id: string;
  day_label: string | null;
  sets: string | null;
  reps: string | null;
  tempo: string | null;
  rest: string | null;
  notes: string | null;
  exercises: {
    name: string;
    category: string;
    description: string | null;
    video_path: string | null;
  } | null;
};

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: program } = await supabase
    .from("programs")
    .select("id, title, notes, status")
    .eq("id", id)
    .single();

  if (!program) notFound();

  const { data: items } = await supabase
    .from("program_items")
    .select(
      "id, day_label, sets, reps, tempo, rest, notes, exercises(name, category, description, video_path)",
    )
    .eq("program_id", id)
    .order("position", { ascending: true });

  const rows = (items ?? []) as unknown as ItemRow[];

  return (
    <Container className="flex flex-col gap-8">
      <div>
        <Link
          href="/portal"
          className="text-muted hover:text-brand-600 mb-4 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" /> Back to portal
        </Link>
        <h1 className="font-display text-ink text-3xl font-semibold">
          {program.title}
        </h1>
        {program.notes ? (
          <p className="text-muted mt-2 max-w-2xl">{program.notes}</p>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
          No exercises in this program yet.
        </p>
      ) : (
        <ol className="flex flex-col gap-5">
          {rows.map((item) => (
            <li
              key={item.id}
              className="grid gap-5 rounded-3xl bg-white p-5 ring-1 ring-black/5 sm:grid-cols-[240px_1fr]"
            >
              <VideoPlayer videoPath={item.exercises?.video_path ?? null} />
              <div className="flex flex-col gap-3">
                <div>
                  {item.day_label ? (
                    <span className="text-brand-600 text-xs font-semibold uppercase">
                      {item.day_label}
                    </span>
                  ) : null}
                  <h3 className="font-display text-ink text-lg font-semibold">
                    {item.exercises?.name ?? "Exercise"}
                  </h3>
                  {item.exercises?.description ? (
                    <p className="text-muted mt-1 text-sm">
                      {item.exercises.description}
                    </p>
                  ) : null}
                </div>
                <dl className="flex flex-wrap gap-2 text-sm">
                  {[
                    ["Sets", item.sets],
                    ["Reps", item.reps],
                    ["Tempo", item.tempo],
                    ["Rest", item.rest],
                  ]
                    .filter(([, v]) => v)
                    .map(([label, v]) => (
                      <span
                        key={label}
                        className="bg-sand/70 text-ink rounded-full px-3 py-1"
                      >
                        <span className="text-muted">{label}:</span> {v}
                      </span>
                    ))}
                </dl>
                {item.notes ? (
                  <p className="text-ink bg-brand-50 rounded-xl p-3 text-sm">
                    {item.notes}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}
    </Container>
  );
}
