import type { Metadata } from "next";
import { HeartPulse, Dumbbell, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a consult",
  description:
    "Book a consult with Olson Performance & Physical Therapy — rehab, strength & conditioning, hybrid performance, or remote coaching.",
};

const highlights = [
  {
    icon: HeartPulse,
    title: "Rehab & return from injury",
    body: "Resolve the pain and rebuild — with a plan that gets you all the way back, not just to pain-free.",
  },
  {
    icon: Dumbbell,
    title: "Strength & performance",
    body: "Train for real, durable strength, coached with a clinician's eye so you stay healthy doing it.",
  },
  {
    icon: Smartphone,
    title: "Remote coaching",
    body: "Not local? Get fully remote programming and coaching delivered through the app.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultType =
    type === "remote" ? "remote" : type === "consult" ? "hybrid" : "rehab";

  return (
    <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
      <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Book a consult"
            title="Let's build your comeback"
            lead="Tell me a bit about your goals or your injury and I'll get back to you within one business day to set up your consult."
          />
          <ul className="flex flex-col gap-6">
            {highlights.map((h) => (
              <li key={h.title} className="flex gap-4">
                <span className="bg-brand-600 inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-white">
                  <h.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-ink font-semibold">
                    {h.title}
                  </h3>
                  <p className="text-muted text-sm">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-muted text-sm">
            Prefer email? Reach us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brand-600 font-medium hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <ContactForm defaultType={defaultType} />
        </div>
      </Container>
    </section>
  );
}
