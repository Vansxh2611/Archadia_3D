import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Home, Box, Play, Film, Layers } from 'lucide-react';
import { SERVICES } from '../utils/data';
import type { ServiceItem } from '../types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  building: Building2,
  home: Home,
  box: Box,
  play: Play,
  film: Film,
  layers: Layers,
};

function ServiceCard({ service, delay }: { service: ServiceItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[service.icon] || Building2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#ffffff] border border-black/10 hover:border-gold/30 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/[0.02] overflow-hidden cursor-default"
    >
      {/* Hover background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Number */}
      <span className="absolute top-6 right-6 font-sora font-bold text-5xl text-black/[0.04] group-hover:text-gold/[0.08] transition-colors duration-500 leading-none select-none">
        {service.number}
      </span>

      {/* Icon */}
      <div className="relative w-12 h-12 flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-gold/10 rounded-xl group-hover:bg-gold/15 transition-colors duration-300" />
        <Icon size={22} className="text-gold relative z-10" />
      </div>

      <h3 className="font-sora font-semibold text-text-primary text-xl mb-3 group-hover:text-gold transition-colors duration-300">
        {service.title}
      </h3>
      <p className="font-inter text-text-secondary text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-gold/0 group-hover:text-gold/80 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
        <div className="w-4 h-px bg-current" />
        <span className="font-inter text-xs tracking-widest uppercase">Explore</span>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });

  return (
    <section id="services" className="page-section services-section">
      <div className="section-inner">
        <div className="section-panel">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4 block">What We Do</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-sora font-bold text-gold leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
                What We Create
              </h2>
              <p className="font-inter text-text-secondary text-lg max-w-md">
                Comprehensive visualization solutions for ambitious architectural projects.
              </p>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-gold/30 via-black/5 to-transparent" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
