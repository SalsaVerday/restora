import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/platform";

export function Faq() {
  return (
    <Section id="faq" className="bg-sand/40">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          align="center"
        />
        <div className="mt-12">
          <Accordion items={[...faq]} />
        </div>
      </div>
    </Section>
  );
}
