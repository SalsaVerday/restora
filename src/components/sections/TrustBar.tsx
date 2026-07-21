import { Container } from "@/components/ui/Container";
import { LogoCloud } from "@/components/ui/LogoCloud";
import { trustedBy } from "@/content/services";

export function TrustBar() {
  return (
    <div className="border-y border-black/5 bg-[var(--background)] py-10">
      <Container className="flex flex-col items-center gap-6">
        <p className="text-muted text-sm font-medium tracking-wider uppercase">
          {trustedBy.label}
        </p>
        <LogoCloud logos={[...trustedBy.logos]} />
      </Container>
    </div>
  );
}
