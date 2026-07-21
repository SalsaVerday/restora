import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatBand } from "@/components/sections/StatBand";
import { Pillars } from "@/components/sections/Pillars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Technology } from "@/components/sections/Technology";
import { Evidence } from "@/components/sections/Evidence";
import { Testimonials } from "@/components/sections/Testimonials";
import { Employers } from "@/components/sections/Employers";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Physical therapy, strength & conditioning, and hybrid performance coaching with Olson Performance — recover from injury and come back stronger, in person or remotely.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatBand />
      <Pillars />
      <HowItWorks />
      <Technology />
      <Evidence />
      <Testimonials />
      <Employers />
      <Faq />
      <FinalCta />
    </>
  );
}
