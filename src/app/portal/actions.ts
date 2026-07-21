"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * Return a short-lived signed URL for an exercise demo video. Requires an
 * authenticated session (coach or client). Demo videos are generic movement
 * clips — not patient data — so any signed-in user may play them.
 */
export async function getSignedVideoUrl(
  videoPath: string,
): Promise<string | null> {
  if (!videoPath) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("exercise-videos")
    .createSignedUrl(videoPath, 60 * 60);

  return error ? null : (data?.signedUrl ?? null);
}
