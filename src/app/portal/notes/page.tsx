import { Container } from "@/components/ui/Container";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const profile = await requireProfile();
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("notes")
    .select("id, kind, title, body, created_at")
    .eq("client_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <Container className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-ink text-3xl font-semibold">
          Feedback & guidance
        </h1>
        <p className="text-muted mt-1">
          Consultation feedback and PT guidance from your coach.
        </p>
      </div>

      {notes && notes.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {notes.map((n) => (
            <li
              key={n.id}
              className="rounded-3xl bg-white p-6 ring-1 ring-black/5"
            >
              <span className="text-brand-600 text-xs font-semibold uppercase">
                {n.kind === "consult" ? "Consultation" : "Guidance"}
              </span>
              <h2 className="font-display text-ink mt-1 text-lg font-semibold">
                {n.title}
              </h2>
              <p className="text-muted mt-2 whitespace-pre-wrap">{n.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
          No feedback yet.
        </p>
      )}
    </Container>
  );
}
