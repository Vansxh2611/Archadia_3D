export interface Capability {
  title: string;
  subtitle: string;
  desc: string;
}

export interface HighlightProject {
  title: string;
  type: string;
  location: string;
  image: string;
}

export interface MethodologyStep {
  id: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  sublabel?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const coreCapabilities: Capability[] = [
  {
    title: "Architectural Visualization",
    subtitle: "Exterior Renders & Masterplans",
    desc: "Photo-realistic exterior imagery that frames towers, villas, and townships before a single brick is laid."
  },
  {
    title: "Interior Rendering",
    subtitle: "Spatial Experience & Atmosphere",
    desc: "Cinematic interior visuals focused on light, material, and emotion."
  },
  {
    title: "Product Visualization",
    subtitle: "Design Objects & Fixtures",
    desc: "High-end renders for furniture, lighting, and building products."
  },
  {
    title: "Virtual Experiences",
    subtitle: "Interactive VR Walkthroughs",
    desc: "Real-time Unreal Engine walkthroughs that let clients inhabit future spaces."
  },
  {
    title: "3D Animation",
    subtitle: "Cinematic Fly-through Films",
    desc: "Narrative films for launches, sales galleries, and competitions."
  },
  {
    title: "Design Consulting",
    subtitle: "Strategic Creative Direction",
    desc: "Visual strategy and asset systems for architecture and real estate brands."
  }
];

export const portfolioHighlights: HighlightProject[] = [
  {
    title: "The Horizon Pavilion",
    type: "Beachfront Residence",
    location: "Goa, India",
    image: "/portfolio_villa.png"
  },
  {
    title: "Serene Monolith",
    type: "Luxury High-Rise Lobby",
    location: "Mumbai, India",
    image: "/interior_render.png"
  },
  {
    title: "Velvet Dusk Suites",
    type: "Hospitality Tower",
    location: "Dubai Skyline",
    image: "/obsidian_spire.png"
  }
];

export const methodologySteps: MethodologyStep[] = [
  {
    id: "01",
    title: "Context & Discovery",
    summary: "Absorb the brief, brand, and site constraints.",
    detail: "We align on objectives, audiences, and architectural intent while collecting drawings, references, and timelines.",
    image: "/hero_tower.png"
  },
  {
    id: "02",
    title: "Concept Framing",
    summary: "Define the key shots and narrative beats.",
    detail: "We propose camera angles, mood, and storytelling frames that best express the project’s ambition.",
    image: "/portfolio_urban.png"
  },
  {
    id: "03",
    title: "Detail Development",
    summary: "Model refinement, materials, and lighting.",
    detail: "Every surface, fixture, and lighting setup is crafted to match design intent and local context.",
    image: "/portfolio_museum.png"
  },
  {
    id: "04",
    title: "Review & Iteration",
    summary: "Client reviews with precise feedback loops.",
    detail: "We share staged outputs, track comments, and refine until the visuals align with your internal approvals.",
    image: "/studio_image.png"
  },
  {
    id: "05",
    title: "Delivery & Launch",
    summary: "Final renders and campaign assets.",
    detail: "High-resolution images, films, and interactive files delivered, optimized for your media plan.",
    image: "/portfolio_tower.png"
  }
];

export const servicesStats: Stat[] = [
  { value: "250+", label: "Projects Delivered", sublabel: "Across India" },
  { value: "12", label: "Years in Practice", sublabel: "Visualization & design" },
  { value: "35+", label: "Active Clients", sublabel: "Developers & studios" },
  { value: "100%", label: "Deadline Reliability", sublabel: "On committed dates" }
];

export const servicesFAQ: FAQItem[] = [
  {
    question: "What do you need to start a project?",
    answer:
      "Architectural drawings (plans, elevations, sections), basic material references, and a short brief on target audience and usage of the visuals."
  },
  {
    question: "How long does a typical visualization take?",
    answer:
      "Most still-image projects take 7–14 working days depending on complexity and number of views. Films and VR experiences require more time."
  },
  {
    question: "Can you work with tight launch timelines?",
    answer:
      "Yes, we’re used to launch schedules. We’ll suggest a realistic timeline and phase deliveries so your marketing team always has something to work with."
  },
  {
    question: "Do you work with studios outside Mumbai / India?",
    answer:
      "Our focus is India, but we can collaborate remotely with teams across time zones when the brief is aligned and timelines are clear."
  }
];
