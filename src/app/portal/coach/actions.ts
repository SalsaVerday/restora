"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireCoach } from "@/lib/auth";
import { generateUniqueUsername } from "@/lib/username";

const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type FormState = { error?: string; success?: string };

/** Invite a client by email; generates their firstname.lastname username. */
export async function inviteClient(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const coach = await requireCoach();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!fullName || !email) return { error: "Name and email are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Enter a valid email address." };

  const admin = createAdminClient();
  const username = await generateUniqueUsername(fullName, admin);

  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fullName,
      username,
      role: "client",
      coach_id: coach.id,
    },
    redirectTo: `${siteUrl()}/auth/confirm?next=/set-password`,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/portal/coach");
  return { success: `Invited ${fullName} — username: ${username}` };
}

/** Create an exercise in the library (video already uploaded to storage). */
export async function createExercise(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireCoach();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "strength");
  if (!name) return { error: "Exercise name is required." };

  const { error } = await supabase.from("exercises").insert({
    name,
    category,
    description: String(formData.get("description") ?? "") || null,
    video_path: String(formData.get("videoPath") ?? "") || null,
    default_sets: String(formData.get("defaultSets") ?? "") || null,
    default_reps: String(formData.get("defaultReps") ?? "") || null,
    created_by: user!.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/portal/coach/exercises");
  return { success: `Added “${name}” to the library.` };
}

/** Create a program for a client, then open its builder. */
export async function createProgram(formData: FormData) {
  const coach = await requireCoach();
  const supabase = await createClient();

  const clientId = String(formData.get("clientId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!clientId || !title) return;

  const { data, error } = await supabase
    .from("programs")
    .insert({
      client_id: clientId,
      coach_id: coach.id,
      title,
      notes: String(formData.get("notes") ?? "") || null,
    })
    .select("id")
    .single();

  if (error || !data) return;
  redirect(`/portal/coach/programs/${data.id}`);
}

/** Add an exercise prescription to a program. */
export async function addProgramItem(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireCoach();
  const supabase = await createClient();

  const programId = String(formData.get("programId") ?? "");
  const exerciseId = String(formData.get("exerciseId") ?? "");
  if (!programId || !exerciseId) return { error: "Pick an exercise to add." };

  const { count } = await supabase
    .from("program_items")
    .select("id", { count: "exact", head: true })
    .eq("program_id", programId);

  const { error } = await supabase.from("program_items").insert({
    program_id: programId,
    exercise_id: exerciseId,
    position: count ?? 0,
    day_label: String(formData.get("dayLabel") ?? "") || null,
    sets: String(formData.get("sets") ?? "") || null,
    reps: String(formData.get("reps") ?? "") || null,
    tempo: String(formData.get("tempo") ?? "") || null,
    rest: String(formData.get("rest") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (error) return { error: error.message };
  revalidatePath(`/portal/coach/programs/${programId}`);
  return { success: "Exercise added." };
}

export async function deleteProgramItem(formData: FormData) {
  await requireCoach();
  const supabase = await createClient();
  const itemId = String(formData.get("itemId") ?? "");
  const programId = String(formData.get("programId") ?? "");
  await supabase.from("program_items").delete().eq("id", itemId);
  revalidatePath(`/portal/coach/programs/${programId}`);
}

/** Write a consultation/guidance note for a client. */
export async function createNote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const coach = await requireCoach();
  const supabase = await createClient();

  const clientId = String(formData.get("clientId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const kind = String(formData.get("kind") ?? "consult");
  if (!clientId || !title || !body)
    return { error: "Title and body are required." };

  const { error } = await supabase.from("notes").insert({
    client_id: clientId,
    coach_id: coach.id,
    kind,
    title,
    body,
  });

  if (error) return { error: error.message };
  revalidatePath(`/portal/coach/clients/${clientId}`);
  return { success: "Note saved." };
}
