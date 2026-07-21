import { Check, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { hero } from "@/content/services";

export function Hero() {
  return (
    <section className="from-brand-50 relative overflow-hidden bg-gradient-to-b to-[var(--background)]">
      <div
        aria-hidden
        className="bg-accent-300/30 pointer-events-none absolute -top-32 -right-32 size-96 rounded-full blur-3xl"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="font-display text-ink text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="text-muted max-w-xl text-lg leading-relaxed">
            {hero.subtitle}
          </p>
          <ul className="flex flex-col gap-2.5">
            {hero.bullets.map((b) => (
              <li key={b} className="text-ink flex items-center gap-2.5">
                <span className="bg-brand-600 flex size-5 items-center justify-center rounded-full text-white">
                  <Check className="size-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={site.cta.primary.href} size="lg">
              {site.cta.primary.label}
            </Button>
            <Button
              href={site.cta.secondary.href}
              variant="secondary"
              size="lg"
            >
              <Play className="size-4" />
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>

        <HeroMock />
      </Container>
    </section>
  );
}

/** Original inline mock of the in-session app UI — no external image assets. */
function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-accent-500 size-2.5 rounded-full" />
            <span className="text-muted text-sm font-medium">Live session</span>
          </div>
          <span className="bg-brand-50 text-brand-600 rounded-full px-3 py-1 text-xs font-semibold">
            Set 2 of 3
          </span>
        </div>

        <div className="from-brand-600 to-brand-800 mt-4 grid h-44 place-items-center rounded-2xl bg-gradient-to-br">
          <div className="text-center text-white">
            <div className="font-display text-5xl font-bold">12</div>
            <div className="text-brand-100 text-sm">reps · great form</div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <MetricRow label="Range of motion" value={92} />
          <MetricRow label="Control" value={78} />
        </div>

        <div className="bg-brand-50 mt-4 flex items-center gap-3 rounded-2xl p-3">
          <div className="bg-brand-600 size-9 shrink-0 rounded-full" />
          <p className="text-ink text-sm">
            <span className="font-semibold">Coach:</span> Nice depth — keep your
            knee tracking over your toes.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-ink font-semibold">{value}%</span>
      </div>
      <div className="bg-sand h-2 rounded-full">
        <div
          className="bg-accent-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
