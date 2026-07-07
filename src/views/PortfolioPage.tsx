'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PORTFOLIO_ITEMS } from '../utils/data';
import type { FilterCategory, PortfolioItem } from '../types';

import { PortfolioApproach } from '../components/sections/PortfolioApproach';
import { PortfolioOutcome } from '../components/sections/PortfolioOutcome';
import { PortfolioExplore3D } from '../components/sections/PortfolioExplore3D';
import '../styles/portfolio.css';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Conceptual', value: 'conceptual' },
];

// Extended portfolio items for the dedicated page
const EXTENDED_PORTFOLIO: PortfolioItem[] = [
  ...PORTFOLIO_ITEMS,
  {
    id: 7,
    title: 'Meridian Plaza',
    subtitle: 'Mixed-use downtown development',
    category: 'commercial',
    image: '/hero_tower.png',
    tall: false,
  },
  {
    id: 8,
    title: 'Serene Heights',
    subtitle: 'Mountain retreat residential',
    category: 'residential',
    image: '/portfolio_villa.png',
    tall: false,
  },
  {
    id: 9,
    title: 'Vantage Tower',
    subtitle: 'Landmark commercial skyscraper',
    category: 'conceptual',
    image: '/obsidian_spire.png',
    tall: true,
  },
];

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer card-shadow ${item.tall ? 'row-span-2' : ''
        }`}
      style={{ minHeight: item.tall ? '500px' : '300px' }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />

      {/* Hover gold overlay */}
      <div className="absolute inset-0 bg-[#E6C383]/0 group-hover:bg-[#E6C383]/08 transition-colors duration-500" />

      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-[#E6C383]/0 group-hover:border-[#E6C383]/40 rounded-2xl transition-colors duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
          <span className="inline-block font-inter text-[10px] tracking-[0.3em] text-[#E6C383] uppercase mb-2 opacity-80">
            {item.category}
          </span>
          <h3 className="font-sora font-bold text-white text-xl mb-1">{item.title}</h3>
          <p className="font-inter text-[#B8B8B8] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* View icon on hover */}
      <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-[#E6C383]/0 group-hover:border-[#E6C383]/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
        <ExternalLink size={14} className="text-[#E6C383]" />
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#E6C383]/0 group-hover:border-[#E6C383]/60 transition-colors duration-500" />
    </motion.div>
  );
}

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filtered =
    activeFilter === 'all'
      ? EXTENDED_PORTFOLIO
      : EXTENDED_PORTFOLIO.filter((item) => item.category === activeFilter);

  const counts = {
    all: EXTENDED_PORTFOLIO.length,
    residential: EXTENDED_PORTFOLIO.filter((i) => i.category === 'residential').length,
    commercial: EXTENDED_PORTFOLIO.filter((i) => i.category === 'commercial').length,
    conceptual: EXTENDED_PORTFOLIO.filter((i) => i.category === 'conceptual').length,
  };

  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/2 left-1/3 w-[800px] h-[500px] rounded-full opacity-[0.06] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="container-luxury relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">Our Work</span>
            <h1
              className="font-sora font-bold text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              Selected{' '}
              <span className="gradient-gold">Works</span>
            </h1>
            <p className="font-inter text-[#B8B8B8] text-xl max-w-xl leading-relaxed">
              A curated collection of our most visionary architectural visualization projects from across India.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Stats Bar */}
      <SectionReveal as="section" className="clients-stats">
        <div className="container-luxury">
          <div className="clients-stats__grid">
            {[
              { value: '180+', label: 'Projects Completed' },
              { value: '35+', label: 'Clients in India' },
              { value: '12+', label: 'Years Experience' },
              { value: '98%', label: 'Retention Rate' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="clients-stats__card"
              >
                <div className="clients-stats__value gradient-gold">{stat.value}</div>
                <p className="clients-stats__label">{stat.label}</p>
                <div className="clients-stats__card-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Portfolio Grid */}
      <SectionReveal as="section" className="section-padding">
        <div className="container-luxury">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={
                  "pill-button" +
                  (activeFilter === f.value ? " pill-button--active" : "")
                }
              >
                <span>{f.label}</span>
                <span className="pill-button__count">
                  {counts[f.value as keyof typeof counts]}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Added Sections */}
      <SectionReveal>
        <PortfolioApproach />
      </SectionReveal>

      <SectionDivider />

      <SectionReveal>
        <PortfolioOutcome />
      </SectionReveal>

      <SectionDivider />

      <SectionReveal>
        <PortfolioExplore3D />
      </SectionReveal>

      <SectionDivider />

      {/* CTA */}
      <SectionReveal as="section" className="relative bg-[#0E0E0E] py-28 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[600px] h-[350px] blur-[160px] opacity-[0.09]"
            style={{ background: 'radial-gradient(ellipse, #E6C383 0%, transparent 65%)' }}
          />
        </div>
        <div className="container-luxury relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">Your Project</span>
            <h2 className="font-sora font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Ready to be our next{' '}
              <span className="gradient-gold">masterpiece?</span>
            </h2>
            <p className="font-inter text-[#B8B8B8] text-lg mb-10 max-w-lg mx-auto">
              Every project in this portfolio started with a single conversation. Let's start yours.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary btn-md"
            >
              Start Your Project
              <span className="btn__icon-right"><ArrowRight size={16} /></span>
            </Link>
          </motion.div>
        </div>
      </SectionReveal>
    </main>
  );
}
