"use client";

import { useActionState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { inviteClient, type FormState } from "@/app/portal/coach/actions";
import { Button } from "@/components/ui/Button";

export function InviteClientForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    inviteClient,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="fullName"
          placeholder="Full name"
          required
          className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none"
        />
      </div>

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
            <Loader2 className="size-4 animate-spin" /> Inviting…
          </>
        ) : (
          <>
            <UserPlus className="size-4" /> Invite client
          </>
        )}
      </Button>
    </form>
  );
}
