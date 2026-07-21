import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { FinalCta } from "@/components/sections/FinalCta";
import { stats } from "@/content/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Olson Performance & Physical Therapy blends licensed physical therapy with high-level strength & conditioning — experience forged with elite athletes and special-operations military.",
};

const values = [
  {
    title: "Rehab is only half the job",
    body: "Getting out of pain isn't the finish line. The goal is leaving stronger and more resilient than before the injury.",
  },
  {
    title: "One coach, no handoffs",
    body: "You shouldn't have to graduate from a PT to a trainer who doesn't know your history. Here it's the same person, start to finish.",
  },
  {
    title: "Earn it under load",
    body: "Real durability is built with progressive strength work — coached with a clinician's judgment so it holds up in the real world.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="About Olson Performance"
              title="A physical therapist who trains, and a coach who rehabs"
              lead="Olson Performance & Physical Therapy exists to close the gap between recovery and real strength. The work is grounded in years of physical therapy practice and coaching alongside high-level athletes and special-operations military — people who simply cannot afford a comeback that only gets them halfway back."
            />
          </div>
        </Container>
      </section>

      <Section className="py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section className="bg-sand/40">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="The background"
            title="Forged where the margin for error is zero"
          />
          <div className="text-muted mt-6 flex flex-col gap-4 text-lg leading-relaxed">
            <p>
              Coach Olson is a licensed physical therapist{" "}
              <span className="text-ink font-medium">
                [add credentials — e.g. PT, DPT, CSCS]
              </span>{" "}
              who has spent <span className="text-ink font-medium">[X]</span>{" "}
              years working with collegiate and professional athletes and
              special-operations military.
            </p>
            <p>
              <span className="text-ink font-medium">
                [Replace this paragraph with your real story:
              </span>{" "}
              where you trained, the settings and teams you&apos;ve worked in,
              the kinds of injuries and athletes you specialize in, and why you
              built a practice that refuses to separate rehab from performance.
              Keep every claim accurate and verifiable.
              <span className="text-ink font-medium">]</span>
            </p>
            <p>
              Long-term, the focus is physical therapy — but the belief that
              drives the whole practice is simple: rehab and strength belong
              together, and you deserve a coach who can do both.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What I believe"
          title="The principles behind the coaching"
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="h-full">
              <h3 className="font-display text-ink text-xl font-semibold">
                {v.title}
              </h3>
              <p className="text-muted mt-2 leading-relaxed">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Let's build your comeback"
        subtitle="Whether you're rehabbing an injury or chasing a new level, it starts with a conversation."
      />
    </>
  );
}
