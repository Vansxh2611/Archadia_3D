export interface StudioPrinciple {
  title: string;
  desc: string;
}

export interface StudioJourneyItem {
  year: string;
  title: string;
  desc: string;
}

export interface StudioAward {
  year: string;
  title: string;
  subtitle: string;
}

export interface StudioStat {
  value: string;
  label: string;
}

export const studioPrinciples: StudioPrinciple[] = [
  {
    title: "Discipline Over Decoration",
    desc: "Every image is a study in structure, light, and narrative—not surface styling."
  },
  {
    title: "Research Before Render",
    desc: "Context, climate, and culture shape how we visualize each space."
  },
  {
    title: "Clients Are Collaborators",
    desc: "We design with you, not for you—inviting feedback at every milestone."
  }
];

export const studioJourney: StudioJourneyItem[] = [
  {
    year: "2012",
    title: "Founding",
    desc: "Archadia 3D begins as a one-room studio in Mumbai with a single workstation."
  },
  {
    year: "2015",
    title: "First Major Tower",
    desc: "Delivered our first large-scale tower visualization, setting a new bar for the region."
  },
  {
    year: "2018",
    title: "New Verticals",
    desc: "Expanded into hospitality and experiential design with cinematic lobbies and resorts."
  },
  {
    year: "2021",
    title: "Real-time Pipeline",
    desc: "Launched our Unreal Engine pipeline for real-time visualization and VR walkthroughs."
  },
  {
    year: "2024",
    title: "Pan-India Studio Network",
    desc: "Studios in Mumbai, Delhi-NCR, and Bengaluru serving developers across India."
  }
];

export const studioAwards: StudioAward[] = [
  {
    year: "2021",
    title: "Golden Pixel Award",
    subtitle: "Best Architectural Visualization Film, India Design Summit."
  },
  {
    year: "2022",
    title: "Indo-Global Design Merit",
    subtitle: "Recognition for innovation in architectural visualization."
  },
  {
    year: "2023",
    title: "ArchViz A+ Finalist",
    subtitle: "Shortlisted for outstanding use of real-time engines."
  }
];

export const studioStats: StudioStat[] = [
  { value: "3", label: "Studios Across India" },
  { value: "30+", label: "Artists & Technologists" },
  { value: "150+", label: "Projects Delivered" },
  { value: "12", label: "Years of Practice" }
];
