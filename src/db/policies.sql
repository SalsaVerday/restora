-- ============================================================================
-- Olson Performance portal — RLS policies, foreign keys, trigger, storage.
-- Apply AFTER running the Drizzle migration (which creates the tables/enums).
-- Run in the Supabase SQL Editor (or psql) against your project.
-- Safe to re-run: guarded with IF NOT EXISTS / DROP ... IF EXISTS.
-- ============================================================================

-- 1) Foreign keys the Drizzle schema can't express (auth schema + self-ref) ---
alter table public.profiles
  drop constraint if exists profiles_id_fkey;
alter table public.profiles
  add constraint profiles_id_fkey
  foreign key (id) references auth.users (id) on delete cascade;

alter table public.profiles
  drop constraint if exists profiles_coach_id_fkey;
alter table public.profiles
  add constraint profiles_coach_id_fkey
  foreign key (coach_id) references public.profiles (id) on delete set null;

-- 2) Helper: is the current user a coach? SECURITY DEFINER avoids RLS
--    recursion when used inside policies on the profiles table itself. --------
create or replace function public.is_coach()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'coach'
  );
$$;

-- 3) Enable RLS on every table ----------------------------------------------
alter table public.profiles       enable row level security;
alter table public.exercises      enable row level security;
alter table public.programs       enable row level security;
alter table public.program_items  enable row level security;
alter table public.notes          enable row level security;

-- 4) profiles ---------------------------------------------------------------
drop policy if exists profiles_select_self_or_coach on public.profiles;
create policy profiles_select_self_or_coach on public.profiles
  for select using (
    id = auth.uid()
    or coach_id = auth.uid()
    or public.is_coach()
  );

drop policy if exists profiles_update_self_or_coach on public.profiles;
create policy profiles_update_self_or_coach on public.profiles
  for update using (id = auth.uid() or public.is_coach());

-- 5) exercises: coach CRUD, clients read-only -------------------------------
drop policy if exists exercises_select_all_authed on public.exercises;
create policy exercises_select_all_authed on public.exercises
  for select using (auth.uid() is not null);

drop policy if exists exercises_write_coach on public.exercises;
create policy exercises_write_coach on public.exercises
  for all using (public.is_coach()) with check (public.is_coach());

-- 6) programs: client reads own, coach CRUD own -----------------------------
drop policy if exists programs_select on public.programs;
create policy programs_select on public.programs
  for select using (client_id = auth.uid() or coach_id = auth.uid());

drop policy if exists programs_write_coach on public.programs;
create policy programs_write_coach on public.programs
  for all using (coach_id = auth.uid() and public.is_coach())
  with check (coach_id = auth.uid() and public.is_coach());

-- 7) program_items: inherit access from the parent program ------------------
drop policy if exists program_items_select on public.program_items;
create policy program_items_select on public.program_items
  for select using (
    exists (
      select 1 from public.programs pr
      where pr.id = program_id
        and (pr.client_id = auth.uid() or pr.coach_id = auth.uid())
    )
  );

drop policy if exists program_items_write_coach on public.program_items;
create policy program_items_write_coach on public.program_items
  for all using (
    exists (
      select 1 from public.programs pr
      where pr.id = program_id and pr.coach_id = auth.uid()
    ) and public.is_coach()
  ) with check (
    exists (
      select 1 from public.programs pr
      where pr.id = program_id and pr.coach_id = auth.uid()
    ) and public.is_coach()
  );

-- 8) notes: client reads own, coach CRUD own --------------------------------
drop policy if exists notes_select on public.notes;
create policy notes_select on public.notes
  for select using (client_id = auth.uid() or coach_id = auth.uid());

drop policy if exists notes_write_coach on public.notes;
create policy notes_write_coach on public.notes
  for all using (coach_id = auth.uid() and public.is_coach())
  with check (coach_id = auth.uid() and public.is_coach());

-- 9) Auto-create a profile when an auth user is created ---------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, username, full_name, email, coach_id)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'client'),
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    nullif(new.raw_user_meta_data ->> 'coach_id', '')::uuid
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 10) Storage: private bucket for exercise demo videos ----------------------
insert into storage.buckets (id, name, public)
values ('exercise-videos', 'exercise-videos', false)
on conflict (id) do nothing;

-- Only the coach may read/write objects in the bucket. Client playback is
-- served via short-lived signed URLs generated server-side (service role),
-- so clients need no direct storage policy.
drop policy if exists exercise_videos_coach_all on storage.objects;
create policy exercise_videos_coach_all on storage.objects
  for all using (bucket_id = 'exercise-videos' and public.is_coach())
  with check (bucket_id = 'exercise-videos' and public.is_coach());
