import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { cn } from "@/lib/cn";
import { plans } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Restora is often free through your employer or health plan, available direct for $79/month, or custom-priced for organizations.",
};

export default function PricingPage() {
  return (
    <>
      <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
        <Container className="py-20 text-center sm:py-24">
          <SectionHeading
            eyebrow="Pricing"
            title="Care that fits your life — and your budget"
            lead="Most members pay nothing through their employer. Prefer to start on your own? Restora Direct has you covered."
            align="center"
          />
        </Container>
      </section>

      <Section className="pt-4">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex h-full flex-col gap-6 rounded-3xl p-8 ring-1",
                plan.featured
                  ? "bg-brand-600 ring-brand-600 text-white shadow-xl lg:-mt-4 lg:pb-12"
                  : "text-ink bg-white ring-black/5",
              )}
            >
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-lg font-semibold">
                    {plan.name}
                  </h2>
                  {plan.featured ? (
                    <span className="bg-accent-500 rounded-full px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.featured ? "text-brand-100" : "text-muted",
                    )}
                  >
                    {plan.cadence}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    plan.featured ? "text-brand-100" : "text-muted",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.featured ? "text-accent-300" : "text-brand-600",
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <Button
                  href={plan.cta.href}
                  variant={plan.featured ? "white" : "primary"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Faq />
      <FinalCta />
    </>
  );
}
