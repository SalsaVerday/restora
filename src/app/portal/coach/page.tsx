import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { InviteClientForm } from "@/components/portal/InviteClientForm";
import { requireCoach } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CoachHome() {
  const coach = await requireCoach();
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, username, full_name, email, created_at")
    .eq("coach_id", coach.id)
    .order("created_at", { ascending: false });

  return (
    <Container className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-ink text-3xl font-semibold">
          Clients
        </h1>
        <p className="text-muted mt-1">
          Invite clients, assign programs, and leave guidance.
        </p>
      </div>

      <Card>
        <h2 className="font-display text-ink mb-3 text-lg font-semibold">
          Invite a new client
        </h2>
        <p className="text-muted mb-4 text-sm">
          They&apos;ll get an email to set a password. Their username is
          generated as <code>firstname.lastname</code>.
        </p>
        <InviteClientForm />
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-ink flex items-center gap-2 text-xl font-semibold">
          <Users className="text-brand-600 size-5" /> Your clients
        </h2>
        {clients && clients.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {clients.map((c) => (
              <Link
                key={c.id}
                href={`/portal/coach/clients/${c.id}`}
                className="hover:ring-brand-300 flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-black/5 transition"
              >
                <div>
                  <div className="text-ink font-semibold">{c.full_name}</div>
                  <div className="text-muted text-sm">@{c.username}</div>
                </div>
                <ArrowRight className="text-brand-600 size-5" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            No clients yet — invite your first above.
          </p>
        )}
      </section>
    </Container>
  );
}
