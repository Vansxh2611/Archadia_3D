export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  category: 'residential' | 'commercial' | 'conceptual';
  image: string;
  tall?: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  company: string;
  projectType: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CaseMetric {
  value: string;
  label: string;
}

export type FilterCategory = 'all' | 'residential' | 'commercial' | 'conceptual';
