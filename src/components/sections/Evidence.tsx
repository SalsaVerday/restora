import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { evidence } from "@/content/platform";

export function Evidence() {
  const max = Math.max(...evidence.chart.map((d) => d.value));
  return (
    <Section id="evidence">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={evidence.eyebrow}
            title={evidence.title}
            lead={evidence.lead}
          />
          <ul className="mt-8 flex flex-col gap-4">
            {evidence.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="bg-brand-600 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white">
                  <Check className="size-4" />
                </span>
                <span className="text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="bg-white">
          <p className="text-muted text-sm font-medium">
            Pain score (lower is better)
          </p>
          <div className="mt-6 flex h-56 items-end justify-between gap-4">
            {evidence.chart.map((d) => (
              <div
                key={d.label}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="from-brand-600 to-brand-400 w-full rounded-t-lg bg-gradient-to-t"
                    style={{ height: `${(d.value / max) * 100}%` }}
                  >
                    <span className="sr-only">
                      {d.label}: {d.value}
                    </span>
                  </div>
                </div>
                <span className="text-muted text-xs font-medium">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted mt-5 text-xs leading-relaxed">
            {evidence.chartCaption}
          </p>
        </Card>
      </div>
    </Section>
  );
}
