import {
  Activity,
  Brain,
  GraduationCap,
  HeartPulse,
  LineChart,
  MessageSquareHeart,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";

/** All copy for the /platform page. Edit here — components read from this. */

export const hero = {
  eyebrow: "The Restora platform",
  title: "Care for pain, wherever you are",
  subtitle:
    "Restora pairs you with a licensed physical therapist and an AI motion coach that watches every rep — for a clinically proven plan that fits your body and your schedule.",
  bullets: [
    "No copays, no waiting rooms",
    "A real PT in your corner",
    "Results in the first weeks",
  ],
};

export const trustedBy = {
  label: "Trusted by leading employers and health plans",
  logos: [
    "Northwind",
    "Meridian Health",
    "Volt Labs",
    "Cedar & Co",
    "Aperture",
    "Brightline",
  ],
};

export const stats = [
  { value: "68%", label: "Average reduction in pain after 12 weeks" },
  { value: "2B", label: "People we're on a mission to free from pain" },
  { value: "4.9/5", label: "Average member satisfaction rating" },
  { value: "50%", label: "Fewer surgeries recommended vs. usual care" },
];

export const pillars = {
  eyebrow: "A complete model of care",
  title: "Three pillars, one connected plan",
  lead: "Musculoskeletal pain is rarely just physical. Restora treats the whole picture in a single program.",
  items: [
    {
      icon: Activity,
      title: "Therapeutic exercise",
      body: "Personalized movement sessions with real-time form feedback from motion sensors — so every rep counts.",
    },
    {
      icon: GraduationCap,
      title: "Education",
      body: "Bite-sized lessons that help you understand your body, your pain, and how to prevent it coming back.",
    },
    {
      icon: Brain,
      title: "Behavioral health",
      body: "Guided CBT techniques to break the pain-stress cycle, build resilience, and stick with your plan.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first session to lasting relief",
  lead: "Getting started takes minutes. Your plan adapts every week.",
  steps: [
    {
      icon: UserRound,
      title: "Match with your PT",
      body: "Tell us about your pain and goals. We pair you with a licensed physical therapist who designs your program.",
    },
    {
      icon: Smartphone,
      title: "Unbox your kit",
      body: "Your Restora kit arrives with a tablet and wearable motion sensors — no equipment or gym required.",
    },
    {
      icon: HeartPulse,
      title: "Move with feedback",
      body: "Exercise at home while the Digital Coach tracks your motion and corrects your form in real time.",
    },
    {
      icon: LineChart,
      title: "Track your progress",
      body: "Your PT reviews your data, celebrates wins, and adjusts your plan as you get stronger.",
    },
  ],
};

export const technology = {
  eyebrow: "The technology",
  title: "An AI coach that sees every rep",
  lead: "Restora's Digital Coach digitizes movement and turns it into guidance you can feel.",
  features: [
    {
      icon: Smartphone,
      title: "Motion capture, no camera required",
      body: "Lightweight wearable sensors map your movement in 3D, so the platform understands exactly how you move — accurately, privately, anywhere in your home.",
      bullets: [
        "Real-time biofeedback on range and control",
        "Works in any room, day or night",
        "Setup in under two minutes",
      ],
    },
    {
      icon: MessageSquareHeart,
      title: "Guidance that adapts to you",
      body: "The AI coach flags compensations and cues corrections mid-session, while your PT sees the same data to fine-tune your plan between visits.",
      bullets: [
        "Instant form corrections as you move",
        "Weekly plan updates from your PT",
        "A single thread to message your care team",
      ],
    },
  ],
};

export const evidence = {
  eyebrow: "Clinical evidence",
  title: "Proven in peer-reviewed research",
  lead: "Restora's programs are built on published clinical outcomes — not marketing claims.",
  points: [
    "Multiple peer-reviewed studies across acute and chronic MSK conditions",
    "Outcomes measured with validated pain and function scales",
    "Care delivered by licensed clinicians, backed by an FDA-listed motion device class",
  ],
  chart: [
    { label: "Week 0", value: 100 },
    { label: "Week 4", value: 74 },
    { label: "Week 8", value: 52 },
    { label: "Week 12", value: 32 },
  ],
  chartCaption:
    "Representative pain-score trajectory over a 12-week program (illustrative).",
};

export const employers = {
  eyebrow: "For employers & health plans",
  title: "Lower MSK spend. Healthier people.",
  lead: "MSK is one of the largest drivers of medical cost. Restora reduces unnecessary imaging, injections, and surgery while giving your population care they actually use.",
  points: [
    {
      icon: ShieldCheck,
      title: "Measurable ROI",
      body: "Report on engagement, pain reduction, and avoided procedures with a dedicated success team.",
    },
    {
      icon: HeartPulse,
      title: "High engagement",
      body: "A concierge onboarding and a human PT keep completion rates far above self-guided apps.",
    },
    {
      icon: LineChart,
      title: "Fast to launch",
      body: "Go live in weeks with eligibility, SSO, and communications handled for you.",
    },
  ],
};

export const faq = [
  {
    question: "How much does Restora cost me?",
    answer:
      "If your employer or health plan offers Restora, the program is typically available at no cost to you, including the kit. Otherwise you can subscribe directly — see the Pricing page for details.",
  },
  {
    question: "Do I need any equipment or a gym?",
    answer:
      "No. Everything you need arrives in your Restora kit: a tablet and wearable motion sensors. Sessions are designed for a small space at home.",
  },
  {
    question: "Is there a real physical therapist involved?",
    answer:
      "Yes. Every member is matched with a licensed physical therapist who designs your plan, reviews your progress, and is reachable through the app.",
  },
  {
    question: "What kinds of pain can Restora help with?",
    answer:
      "Restora supports a wide range of musculoskeletal conditions — back, neck, shoulder, hip, knee, and more — across both acute and chronic pain.",
  },
  {
    question: "How much time does it take each week?",
    answer:
      "Most members spend around 15–20 minutes per session, a few times a week, on a schedule that flexes around your life.",
  },
];
