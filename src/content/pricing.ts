/**
 * Service packages. Prices in [brackets] are placeholders — set your real
 * rates before publishing.
 */
export const plans = [
  {
    name: "Assessment & consult",
    price: "$[149]",
    cadence: "one-time",
    description:
      "The starting point for everyone. A full movement and strength assessment plus a clear plan you can act on — with or without ongoing coaching.",
    features: [
      "60–90 minute in-person evaluation",
      "Movement & strength screening",
      "Personalized action plan",
      "Applied as credit toward a package",
    ],
    cta: { label: "Book an assessment", href: "/contact" },
    featured: false,
  },
  {
    name: "Hybrid coaching",
    price: "$[349]",
    cadence: "per month",
    description:
      "The core offering: rehab and strength & conditioning under one plan, with in-person sessions and app-based programming between them.",
    features: [
      "In-person sessions each month",
      "Custom app-based programming",
      "Form reviews from your video",
      "Direct messaging with your coach",
      "Weekly check-ins & adjustments",
    ],
    cta: { label: "Start hybrid coaching", href: "/contact" },
    featured: true,
  },
  {
    name: "Remote coaching",
    price: "$[199]",
    cadence: "per month",
    description:
      "Fully remote programming and coaching for clients anywhere — clinician-informed training delivered through the app.",
    features: [
      "Custom program built for you",
      "Video demos for every movement",
      "Form reviews & feedback",
      "Direct messaging with your coach",
      "Monthly progress reviews",
    ],
    cta: { label: "Start remote coaching", href: "/contact?type=remote" },
    featured: false,
  },
];
