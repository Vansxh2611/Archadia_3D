export interface Service {
  title: string;
  desc: string;
}

export interface Work {
  title: string;
  category: string;
  client: string;
  image: string; // relative path or URL
}

export interface Stat {
  value: string;
  label: string;
}

export interface Step {
  number: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const services: Service[] = [
  {
    title: "Architecture",
    desc: "Structural integrity meets spatial poetry through high-fidelity visualizations."
  },
  {
    title: "Branding",
    desc: "Defining the visual vocabulary of premium spatial and real estate identities."
  },
  {
    title: "Digital",
    desc: "Immersive web and interactive environments for contemporary architecture."
  },
  {
    title: "Advertising",
    desc: "High-impact campaigns that command attention and drive conversion."
  },
  {
    title: "Interior",
    desc: "Curated interior atmospheres prioritizing light, texture, and void."
  },
  {
    title: "Consulting",
    desc: "Strategic guidance at the intersection of architecture, brand, and technology."
  }
];

export const selectedWorks: Work[] = [
  {
    title: "The Obsidian House",
    category: "Residential",
    client: "Lumo Estates",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Apex Tower",
    category: "Commercial",
    client: "Vertex Corp",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Void Geometry",
    category: "Concept",
    client: "Internal Research",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  }
];

export const stats: Stat[] = [
  { value: "250+", label: "Projects delivered across India" },
  { value: "12", label: "National Design Awards" },
  { value: "6", label: "Years of Precision" },
  { value: "100%", label: "Client Satisfaction" }
];

export const methodologySteps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    desc: "Defining the project scope, constraints, and core aesthetic."
  },
  {
    number: "02",
    title: "Blueprint",
    desc: "Structural and experiential layout planning across every surface."
  },
  {
    number: "03",
    title: "Modeling",
    desc: "Constructing high-fidelity 3D assets and spatial compositions."
  },
  {
    number: "04",
    title: "Lighting",
    desc: "Orchestrating dynamic illumination, shadow, and atmosphere."
  },
  {
    number: "05",
    title: "Delivery",
    desc: "Final render output, optimization, and platform integration."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Archadia 3D doesn’t just render our buildings; they capture the soul. Their understanding of light and negative space elevated our entire marketing campaign.",
    name: "Priya Sharma",
    title: "Director",
    company: "Lumina Homes"
  },
  {
    quote:
      "The precision and attention to materiality in their work is unmatched. They brought an architectural rigor to our digital presence that redefined our brand.",
    name: "Rohan Mehta",
    title: "CEO",
    company: "Vertex Realty"
  },
  {
    quote:
      "Working with Archadia is a masterclass in restraint. They know exactly when to add detail and when to let the void speak. Pure luxury.",
    name: "Ananya Sen",
    title: "Lead Architect",
    company: "Studio V"
  }
];

export const clientBrands: string[] = [
  "MONOLITH",
  "LUMINA",
  "VERTEX",
  "STUDIO V",
  "AURA"
];
