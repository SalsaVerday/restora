import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { FinalCta } from "@/components/sections/FinalCta";
import { stats } from "@/content/platform";

export const metadata: Metadata = {
  title: "About",
  description:
    "Restora is on a mission to free billions of people from pain by making clinically proven musculoskeletal care accessible from home.",
};

const values = [
  {
    title: "Evidence over hype",
    body: "We only make claims we can back with clinical outcomes. Research is in our DNA, not our marketing.",
  },
  {
    title: "Human + machine",
    body: "AI makes care scalable; licensed clinicians make it trustworthy. We refuse to choose between them.",
  },
  {
    title: "Access for all",
    body: "Pain doesn't wait for an appointment. We meet people where they are — at home, on their schedule.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Our mission"
              title="Free two billion people from pain"
              lead="Musculoskeletal pain is the leading cause of disability worldwide, yet quality care remains hard to reach. Restora exists to change that — combining the best clinicians with technology that scales their expertise to everyone."
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

      <Section id="careers" className="bg-sand/40">
        <SectionHeading
          eyebrow="What we believe"
          title="The principles behind the platform"
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

      <Section id="blog">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="The story"
            title="Built by clinicians and engineers"
            align="center"
            lead="Restora began with a simple question: what if the best physical therapy could reach anyone, anywhere? Today our care team and technologists work side by side to answer it — one recovery at a time."
          />
        </div>
      </Section>

      <FinalCta
        title="Join us on the mission"
        subtitle="Whether you're a member, a clinician, or an employer, there's a place for you here."
      />
    </>
  );
}
