import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/platform";

export function StatBand() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.05}>
            <StatCard value={stat.value} label={stat.label} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
