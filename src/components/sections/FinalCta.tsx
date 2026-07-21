import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCta({
  title = "Ready to come back stronger?",
  subtitle = "Rehab an injury or chase a new level — it starts with a consult. Takes two minutes to reach out.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-brand-900 relative overflow-hidden py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="bg-accent-500/20 pointer-events-none absolute bottom-0 -left-24 size-80 rounded-full blur-3xl"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-brand-100 max-w-xl text-lg">{subtitle}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href={site.cta.primary.href} variant="white" size="lg">
            {site.cta.primary.label}
          </Button>
          <Button
            href={site.cta.secondary.href}
            size="lg"
            className="bg-white/10 text-white hover:bg-white/20"
          >
            {site.cta.secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
