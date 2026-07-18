'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Home, Box, Play, Film, Layers, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import '../styles/services.css';
import { CoreCapabilitiesGrid } from '../components/sections/services/CoreCapabilitiesGrid';
import { ServicesPortfolioHighlights } from '../components/sections/services/ServicesPortfolioHighlights';
import { ServicesMethodology } from '../components/sections/services/ServicesMethodology';
import { ServicesStatsStrip } from '../components/sections/services/ServicesStatsStrip';
import { ServicesFAQ } from '../components/sections/services/ServicesFAQ';
import { ServicesInquiryBlock } from '../components/sections/services/ServicesInquiryBlock';

const SERVICES_DETAIL = [
  {
    id: 1,
    number: '01',
    icon: Building2,
    title: 'Architectural Visualization',
    subtitle: 'Exterior Renders & Masterplans',
    description:
      'We craft photo-realistic exterior renders that capture the true soul of a building before a single brick is laid. From intimate facades to vast urban masterplans, our work bridges imagination and reality.',
    features: ['Photo-realistic CGI', 'Aerial & drone perspectives', 'Day/twilight/night moods', 'Print & digital delivery'],
    image: '/hero_tower.png',
    slug: 'architectural-visualization',
  },
  {
    id: 2,
    number: '02',
    icon: Home,
    title: 'Interior Rendering',
    subtitle: 'Spatial Experience & Atmosphere',
    description:
      'Immersive interior visualizations that bring spatial concepts to vivid, emotional life. We obsess over light, material, and proportion to produce images that make spaces feel inhabited before they exist.',
    features: ['Material & finish accuracy', 'Lighting simulation', 'Furniture & props styling', 'Wide & detail shots'],
    image: '/portfolio_urban.png',
    slug: 'interior-rendering',
  },
  {
    id: 3,
    number: '03',
    icon: Box,
    title: 'Product Visualization',
    subtitle: '3D Product & Object Renders',
    description:
      'Precision-crafted 3D product renders that elevate your design story. From architectural hardware to bespoke furniture collections, we create imagery that sells.',
    features: ['360° turntable renders', 'In-situ lifestyle scenes', 'Material exploration', 'E-commerce ready assets'],
    image: '/portfolio_villa.png',
    slug: 'product-visualization',
  },
  {
    id: 4,
    number: '04',
    icon: Play,
    title: 'Virtual Experiences',
    subtitle: 'Interactive VR Walkthroughs',
    description:
      'Transport your clients into unbuilt spaces with our interactive VR walkthroughs. Powered by Unreal Engine, these real-time experiences close sales before construction begins.',
    features: ['Real-time Unreal Engine', 'Multi-platform deployment', 'Interactive material changes', 'Sales centre integration'],
    image: '/portfolio_museum.png',
    slug: 'virtual-experiences',
  },
  {
    id: 5,
    number: '05',
    icon: Film,
    title: '3D Animation',
    subtitle: 'Cinematic Fly-Through Films',
    description:
      'Cinematic fly-through animations that narrate architectural stories with motion and depth. Our films are crafted to broadcast quality, ready for marketing campaigns and award submissions.',
    features: ['Broadcast-quality 4K/8K', 'Original soundscaping', 'Colour grading', 'Social-ready cuts'],
    image: '/obsidian_spire.png',
    slug: '3d-animation',
  },
  {
    id: 6,
    number: '06',
    icon: Layers,
    title: 'Design Consulting',
    subtitle: 'Strategic Creative Direction',
    description:
      'Strategic visual consulting to align your creative direction with your project ambition. We help architecture firms define their visual language and maintain consistency across all deliverables.',
    features: ['Brand visual strategy', 'Style guide creation', 'Asset library management', 'Ongoing retainer support'],
    image: '/studio_image.png',
    slug: 'design-consulting',
  },
];

function ServiceBlock({ service, index }: { service: typeof SERVICES_DETAIL[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      id={`service-${index}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center"
    >
      {/* Image - alternates side */}
      <div className={`relative ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
        <div className="relative rounded-2xl overflow-hidden luxury-shadow">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '480px', objectFit: 'cover' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-transparent" />
        </div>
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E6C383]/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#E6C383]/50" />
        {/* Number watermark */}
        <div className="absolute bottom-6 left-6 font-sora font-bold text-7xl text-white/5 select-none leading-none">
          {service.number}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-[#E6C383]/10 rounded-xl">
            <Icon size={18} className="text-[#E6C383]" />
          </div>
          <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase">{service.subtitle}</span>
        </div>

        <h2 className="font-sora font-bold text-white mb-5" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
          {service.title}
        </h2>

        <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-8">
          {service.description}
        </p>

        <ul className="flex flex-col gap-3 mb-10">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <CheckCircle size={15} className="text-[#E6C383] flex-none" />
              <span className="font-inter text-[#B8B8B8] text-sm">{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href={`/services/${service.slug}`}
            className="btn btn-secondary btn-md"
            prefetch={true}
          >
            Explore Details
            <span className="btn__icon-right"><ArrowRight size={16} /></span>
          </Link>
          <Link
            href={`/contact?service=${service.slug}`}
            className="btn btn-primary btn-md"
          >
            Enquire About This Service
            <span className="btn__icon-right"><ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-white" ref={heroRef}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/3 right-1/4 w-[700px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="container-luxury relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">What We Do</span>
            <h1
              className="font-sora font-bold text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              Our{' '}
              <span className="gradient-gold">Services</span>
            </h1>
            <p className="font-inter text-[#B8B8B8] text-xl max-w-xl leading-relaxed">
              Comprehensive visualization solutions crafted for India's most ambitious architectural projects.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Core Capabilities Overview Grid */}
      <SectionReveal>
        <CoreCapabilitiesGrid />
      </SectionReveal>

      <SectionDivider />

      {/* Service Blocks */}
      <section className="section-padding">
        <div className="container-luxury flex flex-col gap-32">
          {SERVICES_DETAIL.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Portfolio Highlights */}
      <SectionReveal>
        <ServicesPortfolioHighlights />
      </SectionReveal>

      <SectionDivider />

      {/* Our Methodology */}
      <SectionReveal>
        <ServicesMethodology />
      </SectionReveal>

      <SectionDivider />

      {/* Stats Strip */}
      <SectionReveal>
        <ServicesStatsStrip />
      </SectionReveal>

      <SectionDivider />

      {/* Common Questions */}
      <SectionReveal>
        <ServicesFAQ />
      </SectionReveal>

      <SectionDivider />

      {/* Quick Inquiry Form Block */}
      <SectionReveal>
        <ServicesInquiryBlock />
      </SectionReveal>
    </main>
  );
}
