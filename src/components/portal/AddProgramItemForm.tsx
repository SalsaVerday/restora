"use client";

import { useActionState } from "react";
import { Loader2, Plus } from "lucide-react";
import { addProgramItem, type FormState } from "@/app/portal/coach/actions";
import { Button } from "@/components/ui/Button";

const input =
  "text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none";

type Option = { id: string; name: string; category: string };

export function AddProgramItemForm({
  programId,
  exercises,
}: {
  programId: string;
  exercises: Option[];
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    addProgramItem,
    {},
  );

  if (exercises.length === 0) {
    return (
      <p className="text-muted text-sm">
        Add exercises to your{" "}
        <a href="/portal/coach/exercises" className="text-brand-600 underline">
          library
        </a>{" "}
        first, then prescribe them here.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="programId" value={programId} />
      <select name="exerciseId" required className={input} defaultValue="">
        <option value="" disabled>
          Choose an exercise…
        </option>
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name} ({ex.category === "pt" ? "PT" : "S&C"})
          </option>
        ))}
      </select>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input
          name="dayLabel"
          placeholder="Day (e.g. Day 1)"
          className={input}
        />
        <input name="sets" placeholder="Sets" className={input} />
        <input name="reps" placeholder="Reps" className={input} />
        <input name="tempo" placeholder="Tempo" className={input} />
        <input name="rest" placeholder="Rest" className={input} />
      </div>
      <input
        name="notes"
        placeholder="Coaching notes (optional)"
        className={input}
      />

      {state.error ? (
        <p className="text-accent-600 text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Adding…
          </>
        ) : (
          <>
            <Plus className="size-4" /> Add to program
          </>
        )}
      </Button>
    </form>
  );
}
