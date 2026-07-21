"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import {
  requestReset,
  type ForgotState,
} from "@/app/(auth)/forgot-password/actions";
import { Button } from "@/components/ui/Button";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<ForgotState, FormData>(
    requestReset,
    {},
  );

  if (state.done) {
    return (
      <p className="text-muted text-sm">
        If an account matches that username, a reset link is on its way to the
        email on file. Check your inbox.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-ink text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          placeholder="firstname.lastname"
          required
          className="text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-3 focus:outline-none"
        />
      </div>

      {state.error ? (
        <p className="text-accent-600 text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send reset link"
        )}
      </Button>
    </form>
  );
}
