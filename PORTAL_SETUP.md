# Portal setup (Supabase)

The client/coach portal needs a Supabase project. This is the one part I can't do
for you — it requires your account and secret keys. ~15 minutes end to end.

## 1. Create a Supabase project
1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Wait for it to finish provisioning.

## 2. Set environment variables
Copy the template and fill in values:

```bash
cp .env.local.example .env.local
```

From **Project Settings → API**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
and `SUPABASE_SERVICE_ROLE_KEY` (keep this secret — never commit it).
From **Project Settings → Database → Connection string (Direct / session)**: `DATABASE_URL`.
Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local dev.

Add the same variables in **Vercel → Project → Settings → Environment Variables** for production
(set `NEXT_PUBLIC_SITE_URL` to your real domain there).

## 3. Create the tables
```bash
npm run db:migrate   # applies drizzle/0000_*.sql to your Supabase Postgres
```
(Or `npm run db:push` to push the schema directly without a migration.)

## 4. Apply security policies, the trigger, and the storage bucket
Open **Supabase → SQL Editor**, paste the contents of [`src/db/policies.sql`](src/db/policies.sql),
and run it. This enables Row-Level Security on every table, creates the auto-profile
trigger, and creates the private `exercise-videos` bucket. Safe to re-run.

## 5. Seed the coach account (you)
1. **Supabase → Authentication → Users → Add user** — create your account with an email
   and password (check "Auto Confirm User").
2. **SQL Editor** — promote it to coach and set a username (replace the email):
   ```sql
   update public.profiles
   set role = 'coach',
       username = 'firstname.lastname',
       full_name = 'Your Name'
   where email = 'you@example.com';
   ```

## 6. Configure invite/reset email redirect
**Supabase → Authentication → URL Configuration → Redirect URLs**, add:
- `http://localhost:3000/auth/confirm`
- `https://YOUR-DOMAIN/auth/confirm`

The built-in email works for low volume; add **custom SMTP** (Auth → Emails) before real use.

## 7. Run it
```bash
npm run dev
```
- Visit `/login`, sign in with your coach `username` + password → you land on `/portal/coach`.
- Invite a client, add an exercise (with a demo video), build a program, write a note.
- The client accepts the emailed invite, sets a password, and sees their program + feedback.

## Security & compliance note
Built to best practice: RLS on every table, private video bucket with signed URLs,
service-role key server-only. **Before storing real patient PHI in production, move to a
BAA-eligible Supabase plan and sign the BAA.** Generic exercise-demo videos are not PHI.
