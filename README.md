# Restora

A polished, original-branded clone of a digital physical-therapy / musculoskeletal (MSK) care marketing site — modeled structurally on the Sword Health `/platform` page, but with its own name, logo, colors, and copy so it's safe to deploy publicly.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4**.

> This is a demo/portfolio project. "Restora" is fictional and not affiliated with any real company.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — condensed hero, stats, pillars teaser |
| `/platform` | The main long-scroll product page (12 sections) |
| `/pricing` | Three-tier pricing + FAQ |
| `/about` | Mission, values, story |
| `/contact` | Contact / demo-request form → `POST /api/contact` |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier (with Tailwind class sorting)
```

## Project structure

```
src/
  app/                 # routes (App Router) + api/contact, sitemap.ts, robots.ts
  components/
    layout/            # Header, Footer
    sections/          # the /platform page sections (Hero, Pillars, …)
    ui/                # primitives (Button, Card, Section, Accordion, …)
  content/             # ALL marketing copy lives here (platform.ts, pricing.ts, testimonials.ts)
  lib/
    site.ts            # brand name, nav, CTAs — the single rebrand file
    cn.ts              # Tailwind className merge helper
```

### Editing content

Change copy, stats, testimonials, FAQ, and pricing in `src/content/*` — no component edits needed.

### Rebranding

1. Change `name`, `tagline`, `description`, nav, and CTAs in `src/lib/site.ts`.
2. Swap the color tokens in `src/app/globals.css` (`--color-brand-*`, `--color-accent-*`).
3. Update the logo glyph in `src/components/ui/Logo.tsx`.

## Deploying to Vercel

1. Push to GitHub:
   ```bash
   gh repo create restora --public --source=. --remote=origin --push
   ```
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, **zero config**.
3. Every push to `main` → production deploy. Every pull request → a preview URL.
4. (Optional) add a custom domain in the Vercel dashboard.

### Wiring up the contact form (optional)

`POST /api/contact` currently validates input and logs it server-side. To deliver
emails, add a provider such as [Resend](https://resend.com):

```bash
npm install resend
```

Set `RESEND_API_KEY` as a Vercel environment variable, then in
`src/app/api/contact/route.ts` replace the `console.log` with:

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "Restora <hello@yourdomain.com>",
  to: "you@yourdomain.com",
  subject: `New ${body.type} enquiry from ${firstName}`,
  text: JSON.stringify(body, null, 2),
});
```

## Maintenance

- **CI:** `.github/workflows/ci.yml` runs lint + typecheck + build on every PR, so a broken build never reaches Vercel.
- **Dependencies:** `.github/dependabot.yml` opens grouped weekly update PRs for npm and GitHub Actions. Review Next.js majors before merging.
- **Monitoring:** enable Vercel Analytics + Speed Insights in the dashboard; add Sentry for runtime error tracking if desired.
- **Performance/SEO/a11y:** run Lighthouse (or `npx @lhci/cli autorun`) periodically; the site targets 90+ across the board.
