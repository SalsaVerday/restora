export const plans = [
  {
    name: "Through your employer",
    price: "$0",
    cadence: "for eligible members",
    description:
      "If your employer or health plan partners with Restora, the full program is available at no cost to you.",
    features: [
      "Licensed physical therapist",
      "Motion-sensor kit included",
      "Unlimited sessions",
      "Behavioral health support",
      "In-app messaging with your care team",
    ],
    cta: { label: "Check eligibility", href: "/contact" },
    featured: false,
  },
  {
    name: "Restora Direct",
    price: "$79",
    cadence: "per month",
    description:
      "Full access to the platform, billed monthly. Cancel anytime. Kit deposit refundable on return.",
    features: [
      "Everything in the member plan",
      "Dedicated PT match in 48 hours",
      "Personalized 12-week program",
      "Progress reviews every week",
      "HSA / FSA eligible",
    ],
    cta: { label: "Start now", href: "/contact" },
    featured: true,
  },
  {
    name: "For organizations",
    price: "Custom",
    cadence: "volume pricing",
    description:
      "Deploy Restora across your population with eligibility, SSO, reporting, and a success team.",
    features: [
      "Outcomes & utilization reporting",
      "SSO and eligibility integration",
      "Launch communications handled",
      "Dedicated account manager",
      "BAA and security review",
    ],
    cta: { label: "Talk to sales", href: "/contact?type=demo" },
    featured: false,
  },
];
