import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { technology } from "@/content/platform";

export function Technology() {
  return (
    <Section id="technology" className="bg-brand-900 text-white">
      <SectionHeading
        eyebrow={technology.eyebrow}
        title={<span className="text-white">{technology.title}</span>}
        lead={<span className="text-brand-100">{technology.lead}</span>}
      />
      <div className="mt-14 flex flex-col gap-6">
        {technology.features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.06}>
            <div className="grid items-center gap-8 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 lg:grid-cols-2">
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <span className="bg-accent-500 mb-5 inline-flex size-12 items-center justify-center rounded-2xl text-white">
                  <feature.icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-brand-100 mt-3 leading-relaxed">
                  {feature.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <Check className="text-accent-400 size-5 shrink-0" />
                      <span className="text-brand-50">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                aria-hidden
                className={`from-brand-500/40 to-brand-800 grid h-56 place-items-center rounded-2xl bg-gradient-to-br ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <feature.icon className="size-20 text-white/80" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
