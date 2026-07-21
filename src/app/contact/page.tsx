import type { Metadata } from "next";
import { Mail, MessageSquare, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Restora — whether you're a member getting started, an organization exploring a rollout, or need support.",
};

const highlights = [
  {
    icon: Mail,
    title: "Get started",
    body: "Tell us about your pain and we'll match you with a physical therapist.",
  },
  {
    icon: Building2,
    title: "For organizations",
    body: "Request a demo and see how Restora lowers MSK spend for your population.",
  },
  {
    icon: MessageSquare,
    title: "Support",
    body: "Already a member? We're here to help you get the most from your plan.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultType = type === "demo" ? "demo" : "general";

  return (
    <section className="from-brand-50 bg-gradient-to-b to-[var(--background)]">
      <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your pain-free plan"
            lead="Fill out the form and the right person on our team will get back to you within one business day."
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
