import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section className="bg-sand/40">
      <SectionHeading
        eyebrow="Client stories"
        title="Real recoveries, real strength"
        align="center"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <Card className="flex h-full flex-col gap-5">
              <Quote className="text-accent-400 size-8" aria-hidden />
              <blockquote className="text-ink text-lg leading-relaxed">
                “{t.quote}”
              </blockquote>
              <div className="mt-auto flex items-center gap-3">
                <div
                  className="bg-brand-100 size-10 rounded-full"
                  aria-hidden
                />
                <div>
                  <div className="text-ink font-semibold">{t.name}</div>
                  <div className="text-muted text-sm">{t.role}</div>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
