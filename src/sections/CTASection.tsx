'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });



  return (
    <section id="cta" className="page-section cta-section">
      <div className="section-inner">
        <div className="section-panel overflow-hidden">
          {/* Radial gold glow inside the panel */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-[600px] h-[300px] blur-[140px] opacity-[0.1]"
              style={{ background: 'radial-gradient(ellipse, #E6C383 0%, transparent 65%)' }}
            />
          </div>

          {/* Grid pattern inside the panel */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative z-10">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-8 block">
                Ready To Begin
              </span>

              <h2
                className="font-sora font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                Let's Create Something
                <br />
                <span className="gradient-gold">Extraordinary.</span>
              </h2>

              <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                Tell us about your project and we'll bring it to life with precision, passion, and cinematic craft.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-primary btn-md"
                >
                  Start a Project
                  <span className="btn__icon-right"><ArrowRight size={16} /></span>
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-secondary btn-md"
                >
                  Schedule Consultation
                  <span className="btn__icon-right"><ArrowRight size={16} className="text-[#E6C383]" /></span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
