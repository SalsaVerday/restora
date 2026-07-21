/**
 * Central brand & site configuration.
 *
 * Rename the product, tweak nav, or change CTA labels here — every component
 * reads from this file, so a rebrand is a one-file edit.
 */

export const site = {
  name: "Restora",
  tagline: "Care for pain, wherever you are",
  description:
    "Restora pairs you with a licensed physical therapist and an AI motion coach to deliver a clinically proven, personalized plan to beat musculoskeletal pain — all from home.",
  url: "https://restora.example.com",
  email: "hello@restora.example.com",
  // Primary call-to-action used across the site.
  cta: {
    primary: { label: "Get started", href: "/contact" },
    secondary: { label: "Request a demo", href: "/contact?type=demo" },
  },
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    columns: [
      {
        title: "Platform",
        links: [
          { label: "How it works", href: "/platform#how-it-works" },
          { label: "The technology", href: "/platform#technology" },
          { label: "Clinical evidence", href: "/platform#evidence" },
          { label: "For employers", href: "/platform#employers" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/about#careers" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "FAQ", href: "/platform#faq" },
          { label: "Blog", href: "/about#blog" },
          { label: "Support", href: "/contact" },
          { label: "Status", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/legal/privacy" },
          { label: "Terms", href: "/legal/terms" },
          { label: "Accessibility", href: "/legal/accessibility" },
        ],
      },
    ],
    social: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
} as const;

export type Site = typeof site;
