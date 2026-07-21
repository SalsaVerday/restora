import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { LogoCloud } from "@/components/ui/LogoCloud";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/lib/site";
import { stats, pillars, trustedBy } from "@/content/services";

export default function HomePage() {
  return (
    <>
      {/* Condensed hero */}
      <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
        <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <Eyebrow>Physical therapy + performance</Eyebrow>
          <h1 className="font-display text-ink max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="text-muted max-w-xl text-lg leading-relaxed">
            {site.description}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button href={site.cta.primary.href} size="lg">
              {site.cta.primary.label}
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See services
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-10 w-full">
            <LogoCloud logos={[...trustedBy.logos]} />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section className="py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      {/* Pillars teaser */}
      <Section className="bg-sand/40">
        <SectionHeading
          eyebrow={pillars.eyebrow}
          title={pillars.title}
          lead={pillars.lead}
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.items.map((item) => (
            <Card key={item.title} className="h-full">
              <span className="bg-brand-50 text-brand-600 mb-5 inline-flex size-12 items-center justify-center rounded-2xl">
                <item.icon className="size-6" />
              </span>
              <h3 className="font-display text-ink text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-muted mt-2 leading-relaxed">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-2 font-medium"
          >
            See how it works
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
