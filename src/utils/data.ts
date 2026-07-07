import type { NavItem, StatItem, ServiceItem, PortfolioItem, TeamMember, Testimonial, ProcessStep, CaseMetric } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio', href: '/studio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
];

export const STATS: StatItem[] = [
  { value: 150, suffix: '+', label: 'Projects delivered across India' },
  { value: 35, suffix: '+', label: 'Clients in India' },
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Architectural Visualization',
    description: 'Photo-realistic exterior renders that capture the soul of a building before it is built.',
    icon: 'building',
  },
  {
    id: 2,
    number: '02',
    title: 'Interior Rendering',
    description: 'Immersive interior visualizations that bring spatial concepts to vivid, emotional life.',
    icon: 'home',
  },
  {
    id: 3,
    number: '03',
    title: 'Product Visualization',
    description: 'Precision-crafted 3D product renders that elevate your design story to new heights.',
    icon: 'box',
  },
  {
    id: 4,
    number: '04',
    title: 'Virtual Experiences',
    description: 'Interactive VR walkthroughs that transport clients into unbuilt spaces.',
    icon: 'play',
  },
  {
    id: 5,
    number: '05',
    title: '3D Animation',
    description: 'Cinematic fly-through animations that narrate architectural stories with motion and depth.',
    icon: 'film',
  },
  {
    id: 6,
    number: '06',
    title: 'Design Consulting',
    description: 'Strategic visual consulting to align creative direction with your project ambition.',
    icon: 'layers',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Luxury Tower',
    subtitle: 'Mixed-use residential landmark',
    category: 'residential',
    image: '/portfolio_tower.png',
    tall: true,
  },
  {
    id: 2,
    title: 'Urban Residence',
    subtitle: 'Premium urban apartment visualization',
    category: 'residential',
    image: '/portfolio_urban.png',
  },
  {
    id: 3,
    title: 'Coastal Villa',
    subtitle: 'Oceanfront luxury retreat',
    category: 'residential',
    image: '/portfolio_villa.png',
  },
  {
    id: 4,
    title: 'Business Hub',
    subtitle: 'Corporate tower complex',
    category: 'commercial',
    image: '/hero_tower.png',
    tall: true,
  },
  {
    id: 5,
    title: 'Museum Concept',
    subtitle: 'Cultural landmark concept design',
    category: 'conceptual',
    image: '/portfolio_museum.png',
  },
  {
    id: 6,
    title: 'Skyline District',
    subtitle: 'Urban master plan vision',
    category: 'conceptual',
    image: '/studio_image.png',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Marcus Vela',
    role: 'Founder & Creative Director',
    bio: 'Visionary architect turned visualization artist with 15 years shaping iconic projects across India.',
  },
  {
    id: 2,
    name: 'Aria Chen',
    role: 'Lead Visualization Artist',
    bio: 'Master of light and material, transforming geometry into breathtaking photorealistic worlds.',
  },
  {
    id: 3,
    name: 'Leon Krause',
    role: 'Technical Director',
    bio: 'Engineering real-time rendering pipelines that push the boundaries of what\'s computationally possible.',
  },
  {
    id: 4,
    name: 'Sofia Okafor',
    role: 'Project Manager',
    bio: 'Orchestrating complex creative workflows across India with precision and grace.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: 'Archadia transformed our tower concept into a visual masterpiece. Their work was instrumental in securing board approval on the very first presentation.',
    author: 'Vikram Oberoi',
    company: 'Oberoi Realty',
    projectType: 'Commercial Tower',
  },
  {
    id: 2,
    text: 'The cinematic quality of their renders elevated our brand to a completely different tier. We saw a 40% increase in off-plan sales within the first month.',
    author: 'Rajesh Sekhar',
    company: 'Prestige Group',
    projectType: 'Residential Complex',
  },
  {
    id: 3,
    text: 'Working with Archadia is like collaborating with artists who understand architecture at a molecular level. Truly exceptional vision and execution.',
    author: 'Kabir Verma',
    company: 'Verma & Associates',
    projectType: 'Luxury Villa',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We immerse ourselves in your vision, project brief, and goals to establish a deep creative foundation.',
  },
  {
    number: '02',
    title: 'Concept Development',
    description: 'Mood boards, lighting concepts, and camera perspectives to establish the visual direction.',
  },
  {
    number: '03',
    title: 'Visualization',
    description: 'Our artists transform concepts into photorealistic renders using industry-leading production pipelines.',
  },
  {
    number: '04',
    title: 'Refinement',
    description: 'Iterative feedback cycles ensure every detail aligns with your vision and brand standards.',
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Final assets delivered in all formats — print, digital, VR, and broadcast-ready.',
  },
];

export const CASE_METRICS: CaseMetric[] = [
  { value: '72', label: 'Floors' },
  { value: '420m', label: 'Height' },
  { value: '18', label: 'Months' },
  { value: '1', label: 'National Design Award' },
];

export const CLIENT_LOGOS: string[] = [
  'MERIDIAN GROUP',
  'KOVACS & SONS',
  'STELLARFORM',
  'OPUS REALTY',
  'VANTAGE CAPITAL',
  'AXIOM STUDIOS',
  'HELIX DEVELOP.',
  'PINNACLE ARCH.',
];
