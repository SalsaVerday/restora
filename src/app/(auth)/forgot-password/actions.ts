"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ForgotState = { done?: boolean; error?: string };

/**
 * Send a password-reset email for the account matching a username. Always
 * reports success (never reveals whether a username exists).
 */
export async function requestReset(
  _prev: ForgotState,
  formData: FormData,
): Promise<ForgotState> {
  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  if (!username) return { error: "Enter your username." };

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  if (profile?.email) {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: `${siteUrl}/auth/confirm?next=/set-password`,
    });
  }

  return { done: true };
}
