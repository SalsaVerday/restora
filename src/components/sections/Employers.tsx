import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { employers } from "@/content/services";

export function Employers() {
  return (
    <Section id="teams">
      <div className="bg-brand-600 rounded-[2.5rem] px-6 py-14 text-white sm:px-12">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={
              <span className="text-accent-300">{employers.eyebrow}</span>
            }
            title={<span className="text-white">{employers.title}</span>}
            lead={<span className="text-brand-100">{employers.lead}</span>}
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {employers.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <p.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="text-brand-100 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href={site.cta.secondary.href} variant="white" size="lg">
            {site.cta.secondary.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
