'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CASE_METRICS } from '../utils/data';

export default function CaseStudySection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftVisible = useInView(leftRef, { once: true, margin: '-80px' });
  const rightVisible = useInView(rightRef, { once: true, margin: '-80px' });



  return (
    <section id="case-study" className="relative bg-bg-secondary section-padding overflow-hidden">
      {/* Gold ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] opacity-[0.08]"
        style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container-luxury relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -60 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden luxury-shadow">
              <img
                src="/obsidian_spire.png"
                alt="The Obsidian Spire case study architectural render"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '700px', objectFit: 'cover' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary/60 via-transparent to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -inset-3 border border-gold/20 rounded-3xl pointer-events-none" />
            <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-gold/60" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-gold/60" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 60 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6">
              Featured Case Study
            </span>

            <h2 className="font-sora font-bold text-gold leading-tight mb-6" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)' }}>
              The Obsidian Spire
            </h2>

            <p className="font-inter text-text-secondary text-lg leading-relaxed mb-12 max-w-lg">
              A futuristic mixed-use tower developed through advanced architectural visualization techniques.
              An icon of tomorrow's skyline, realized through our cinematic rendering pipeline.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {CASE_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="group relative bg-bg-primary border border-black/10 hover:border-gold/20 rounded-xl p-5 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="font-sora font-bold gradient-gold text-3xl mb-1">{metric.value}</div>
                  <div className="font-inter text-text-secondary text-sm tracking-wide">{metric.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="group self-start flex items-center gap-3 bg-gold text-white font-inter font-semibold text-sm tracking-wide px-8 py-4 hover:bg-gold/80 transition-all duration-300 focus:outline-none"
            >
              Explore Case Studies
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
