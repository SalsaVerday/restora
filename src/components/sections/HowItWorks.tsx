import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/content/services";

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        lead={howItWorks.lead}
      />
      <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <li className="relative flex h-full flex-col gap-4 rounded-3xl border border-black/5 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="bg-brand-600 inline-flex size-11 items-center justify-center rounded-2xl text-white">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-brand-200 text-4xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-ink text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
