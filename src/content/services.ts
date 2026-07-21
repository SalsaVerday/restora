import {
  Activity,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  LineChart,
  MessagesSquare,
  Smartphone,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

/**
 * All copy for the /services page. Edit here — components read from this.
 *
 * NOTE: values wrapped in [brackets] are placeholders. Replace them with real,
 * verifiable numbers and claims before publishing.
 */

export const hero = {
  eyebrow: "Physical therapy + performance",
  title: "Rehab that doesn't stop at pain-free",
  subtitle:
    "Most rehab ends the moment the pain does — and leaves you weaker than before. Olson Performance bridges licensed physical therapy and high-level strength & conditioning, so you come back more resilient than the injury that sidelined you.",
  bullets: [
    "One coach for rehab and training",
    "Built for real strength, not just symptom relief",
    "In person or coached remotely",
  ],
};

export const trustedBy = {
  label: "Experience earned with athletes who can't afford to guess",
  logos: [
    "Collegiate athletes",
    "Pro competitors",
    "Special operations",
    "Tactical athletes",
    "Post-op recovery",
    "Weekend warriors",
  ],
};

export const stats = [
  { value: "[10]+ yrs", label: "Coaching rehab and performance" },
  { value: "[500]+", label: "Clients guided back to full strength" },
  { value: "[95]%", label: "Return to the activities they love" },
  { value: "1-on-1", label: "Every program built for one body — yours" },
];

export const pillars = {
  eyebrow: "What I do",
  title: "Three services, one continuum",
  lead: "Recovery and performance aren't separate goals — they're the same road. You can start anywhere on it.",
  items: [
    {
      icon: HeartPulse,
      title: "Physical therapy & rehab",
      body: "Hands-on, licensed care to resolve pain and restore movement — with a plan that treats the cause, not just the symptom.",
    },
    {
      icon: Dumbbell,
      title: "Strength & conditioning",
      body: "Coaching that builds real, durable strength and capacity — programmed with a clinician's understanding of how your body loads.",
    },
    {
      icon: TrendingUp,
      title: "Hybrid performance",
      body: "The bridge: a single plan that carries you from injured or limited all the way to stronger than you started.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first call to lasting strength",
  lead: "A clear path, whether you're rehabbing an injury or chasing a new level.",
  steps: [
    {
      icon: UserRound,
      title: "Book a consult",
      body: "We start with a conversation about your history, your pain or goals, and what a win looks like for you.",
    },
    {
      icon: ClipboardCheck,
      title: "Full assessment",
      body: "A thorough movement and strength assessment pinpoints what's limiting you — and what your body is ready for.",
    },
    {
      icon: Target,
      title: "Your program",
      body: "You get a personalized plan that blends rehab and training, mapped to your schedule and equipment.",
    },
    {
      icon: LineChart,
      title: "Coaching & progress",
      body: "We train together in person or check in remotely, adjusting the plan as you get stronger week over week.",
    },
  ],
};

export const technology = {
  eyebrow: "Coaching that follows you home",
  title: "In your corner between sessions",
  lead: "Your program lives in an app, so the coaching doesn't stop when you leave the gym.",
  features: [
    {
      icon: Smartphone,
      title: "Your program, always in your pocket",
      body: "Every session, set, and cue is laid out in a simple app — with demo videos so you're never guessing what to do or how to do it.",
      bullets: [
        "Clear day-by-day programming",
        "Video demos for every movement",
        "Log your lifts and track progress",
      ],
    },
    {
      icon: MessagesSquare,
      title: "Real coaching, not a chatbot",
      body: "Send a video of your lift and get personal feedback. Message directly when something flares up or a session doesn't feel right — a real coach who knows your history answers.",
      bullets: [
        "Form reviews from your own footage",
        "Direct messaging with your coach",
        "Weekly check-ins and plan adjustments",
      ],
    },
  ],
};

export const evidence = {
  eyebrow: "The approach",
  title: "Rehab and strength, on one continuum",
  lead: "Treating pain and building performance with the same lens is what keeps progress from stalling — and keeps injuries from coming back.",
  points: [
    "A licensed PT's eye on every rep, so training never re-aggravates the problem",
    "Progressive loading that rebuilds capacity, not just restores range of motion",
    "One coach across rehab and performance — no handoff, no lost context",
  ],
  chart: [
    { label: "Week 0", value: 30 },
    { label: "Week 4", value: 55 },
    { label: "Week 8", value: 78 },
    { label: "Week 12", value: 100 },
  ],
  chartCaption:
    "Representative capacity/strength trajectory over a 12-week hybrid program (illustrative).",
};

export const employers = {
  eyebrow: "For teams, gyms & units",
  title: "Raise the whole roster's ceiling",
  lead: "Bring clinician-informed strength & conditioning and return-to-activity support to your team, gym, or unit — programming that keeps people healthy and performing.",
  points: [
    {
      icon: Users,
      title: "Team programming",
      body: "Group and individualized plans that respect each athlete's history and load tolerance.",
    },
    {
      icon: HeartPulse,
      title: "Return-to-activity",
      body: "Bridge injured members back to full duty or competition without rushing or guessing.",
    },
    {
      icon: Activity,
      title: "Durability & resilience",
      body: "Reduce preventable injuries with movement screening and smart, progressive loading.",
    },
  ],
};

export const faq = [
  {
    question: "Do I need to be injured to work with you?",
    answer:
      "Not at all. Plenty of clients come simply to get stronger, move better, and stay durable. The physical-therapy background just means your training is built to keep you healthy while you do it.",
  },
  {
    question: "Is this in person or remote?",
    answer:
      "Both. You can train in person, be coached entirely remotely through the app, or do a hybrid of the two — whatever fits your goals and location.",
  },
  {
    question: "Do you take insurance?",
    answer:
      "Sessions are typically cash-based, and a superbill can be provided on request that you may submit to your insurer for possible out-of-network reimbursement. [Confirm your exact billing details here.]",
  },
  {
    question: "What happens in the first session?",
    answer:
      "We talk through your history and goals, then run a full movement and strength assessment. You'll leave with a clear picture of what's holding you back and the first steps of your plan.",
  },
  {
    question: "How is this different from a regular PT or a personal trainer?",
    answer:
      "Most people get one or the other — a clinician who stops at pain-free, or a trainer without clinical judgment. Here you get both in one coach, so rehab flows straight into building real performance.",
  },
];
