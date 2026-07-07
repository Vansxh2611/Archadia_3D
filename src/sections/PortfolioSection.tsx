import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../utils/data';
import type { FilterCategory, PortfolioItem } from '../types';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Conceptual', value: 'conceptual' },
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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer card-shadow ${
        item.tall ? 'row-span-2' : ''
      }`}
      style={{ minHeight: item.tall ? '500px' : '280px' }}
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
      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />

      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 rounded-2xl transition-colors duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <motion.div
          className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400"
        >
          <span className="inline-block font-inter text-[10px] tracking-[0.3em] text-gold uppercase mb-2 opacity-80">
            {item.category}
          </span>
          <h3 className="font-sora font-bold text-white text-xl mb-1">{item.title}</h3>
          <p className="font-inter text-[#B8B8B8] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {item.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/0 group-hover:border-gold/60 transition-colors duration-500" />
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });

  const filtered = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="page-section portfolio-section">
      <div className="section-inner">
        <div className="section-panel">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4 block">Our Work</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-sora font-bold text-gold leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
                Selected Works
              </h2>
              <p className="font-inter text-text-secondary text-lg max-w-sm">
                A curated collection of visionary architectural projects.
              </p>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-gold/30 via-black/5 to-transparent" />
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
