import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/content/platform";

export function Pillars() {
  return (
    <Section className="bg-sand/40">
      <SectionHeading
        eyebrow={pillars.eyebrow}
        title={pillars.title}
        lead={pillars.lead}
        align="center"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <Card className="h-full">
              <span className="bg-brand-50 text-brand-600 mb-5 inline-flex size-12 items-center justify-center rounded-2xl">
                <item.icon className="size-6" />
              </span>
              <h3 className="font-display text-ink text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-muted mt-2 leading-relaxed">{item.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
