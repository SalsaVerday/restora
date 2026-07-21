"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { createNote, type FormState } from "@/app/portal/coach/actions";
import { Button } from "@/components/ui/Button";

const input =
  "text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none";

export function NoteForm({ clientId }: { clientId: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    createNote,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="clientId" value={clientId} />
      <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
        <input name="title" placeholder="Title" required className={input} />
        <select name="kind" defaultValue="consult" className={input}>
          <option value="consult">Consultation feedback</option>
          <option value="guidance">PT guidance</option>
        </select>
      </div>
      <textarea
        name="body"
        placeholder="Write your feedback or guidance…"
        rows={4}
        required
        className={input}
      />

      {state.error ? (
        <p className="text-accent-600 text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-brand-600 text-sm">{state.success}</p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Saving…
          </>
        ) : (
          "Save note"
        )}
      </Button>
    </form>
  );
}
