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
  title: "Platform",
  description:
    "See how Restora combines a licensed physical therapist, an AI motion coach, and clinically proven programs to beat musculoskeletal pain from home.",
};

export default function PlatformPage() {
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
