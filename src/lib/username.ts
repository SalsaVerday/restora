import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Build the base `firstname.lastname` username from a full name:
 * lowercased, diacritics stripped, non-alphanumerics removed, first + last
 * name tokens only (middle names ignored).
 */
export function normalizeUsername(fullName: string): string {
  const clean = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // strip diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const tokens = fullName.trim().split(/\s+/).filter(Boolean);
  const first = clean(tokens[0] ?? "");
  const last = clean(tokens.length > 1 ? tokens[tokens.length - 1] : "");

  const base = last ? `${first}.${last}` : first;
  return base || "user";
}

/**
 * Return a unique username: the base, or the base with the smallest unused
 * ascending integer suffix (john.smith → john.smith1 → john.smith2 …).
 * Uses the provided (service-role) client to query existing usernames.
 */
export async function generateUniqueUsername(
  fullName: string,
  admin: SupabaseClient,
): Promise<string> {
  const base = normalizeUsername(fullName);

  const { data } = await admin
    .from("profiles")
    .select("username")
    .like("username", `${base}%`);

  const taken = new Set((data ?? []).map((r) => r.username as string));
  if (!taken.has(base)) return base;

  let n = 1;
  while (taken.has(`${base}${n}`)) n++;
  return `${base}${n}`;
}
