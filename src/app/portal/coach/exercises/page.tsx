import { Dumbbell } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ExerciseUploadForm } from "@/components/portal/ExerciseUploadForm";
import { requireCoach } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  await requireCoach();
  const supabase = await createClient();

  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, name, category, video_path, created_at")
    .order("created_at", { ascending: false });

  return (
    <Container className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-ink text-3xl font-semibold">
          Exercise library
        </h1>
        <p className="text-muted mt-1">
          Add movements once with a demo video, then reuse them across programs.
        </p>
      </div>

      <Card>
        <h2 className="font-display text-ink mb-4 text-lg font-semibold">
          Add an exercise
        </h2>
        <ExerciseUploadForm />
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-ink flex items-center gap-2 text-xl font-semibold">
          <Dumbbell className="text-brand-600 size-5" /> Library
        </h2>
        {exercises && exercises.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="rounded-2xl bg-white p-4 ring-1 ring-black/5"
              >
                <div className="text-ink font-semibold">{ex.name}</div>
                <div className="text-muted text-sm">
                  {ex.category === "pt"
                    ? "Physical therapy"
                    : "Strength & conditioning"}
                  {ex.video_path ? " · has video" : " · no video"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            No exercises yet — add your first above.
          </p>
        )}
      </section>
    </Container>
  );
}
