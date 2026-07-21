/**
 * Central brand & site configuration.
 *
 * Rename the practice, tweak nav, or change CTA labels here — every component
 * reads from this file, so a rebrand is a one-file edit.
 */

export const site = {
  name: "Olson Performance & Physical Therapy",
  shortName: "Olson Performance",
  tagline: "Rehab that doesn't stop at pain-free",
  description:
    "Olson Performance & Physical Therapy blends licensed physical therapy with high-level strength & conditioning — so you don't just recover, you come back stronger. Train in person or remotely.",
  url: "https://olsonperformance.example.com",
  email: "hello@olsonperformance.example.com",
  // Primary call-to-action used across the site.
  cta: {
    primary: { label: "Book a consult", href: "/contact" },
    secondary: { label: "Free intro call", href: "/contact?type=consult" },
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Physical therapy & rehab", href: "/services#services" },
          { label: "Strength & conditioning", href: "/services#services" },
          { label: "Hybrid performance", href: "/services#services" },
          { label: "Remote coaching", href: "/services#remote" },
        ],
      },
      {
        title: "Practice",
        links: [
          { label: "About", href: "/about" },
          { label: "Pricing", href: "/pricing" },
          { label: "How it works", href: "/services#how-it-works" },
          { label: "FAQ", href: "/services#faq" },
        ],
      },
      {
        title: "Get started",
        links: [
          { label: "Book a consult", href: "/contact" },
          { label: "Free intro call", href: "/contact?type=consult" },
          { label: "For teams & units", href: "/services#teams" },
          { label: "Contact", href: "/contact" },
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
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
} as const;

export type Site = typeof site;
