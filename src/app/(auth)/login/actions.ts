"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type LoginState = { error?: string };

/**
 * Log in by username. Resolves the account email from the username (via the
 * service-role client, since the visitor isn't authenticated yet), then signs
 * in with the SSR client so the session cookie is set.
 */
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/portal") || "/portal";

  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  if (!profile?.email) {
    return { error: "Invalid username or password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password,
  });

  if (error) {
    return { error: "Invalid username or password." };
  }

  redirect(next.startsWith("/portal") ? next : "/portal");
}
