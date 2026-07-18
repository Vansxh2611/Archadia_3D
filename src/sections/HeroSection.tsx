'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="bg-grid-precision" />

      {/* Atmospheric Glowing Elements */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] ambient-glow--gold opacity-80" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] ambient-glow--white opacity-60" />

      {/* Oversized Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-sora font-extrabold text-[14vw] text-white/[0.015] tracking-[0.25em] z-0 leading-none text-center">
        ARCHADIA
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent z-1" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-1" />

      <div className="container-luxury relative z-10 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left */}
          <motion.div
            style={{ y: textY, opacity }}
            className="flex flex-col justify-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-inter text-xs font-semibold tracking-[0.3em] text-[#E6C383] mb-8 uppercase"
            >
              Architectural visualization studio based in Mumbai, India
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-sora font-bold leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(56px, 9vw, 108px)', letterSpacing: '-0.02em' }}
            >
              We Build
              <br />
              <span
                className="gradient-gold gold-text-glow"
                style={{ paddingLeft: 'clamp(16px, 4vw, 48px)', display: 'block', marginTop: '8px' }}
              >
                Worlds.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-12 max-w-[480px]"
            >
              We create cinematic 3D experiences for developers and brands across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="btn btn-primary btn-lg"
              >
                Start Your Project
                <span className="btn__icon-right"><ArrowRight size={16} /></span>
              </Link>
              <Link
                href="/portfolio"
                className="btn btn-secondary btn-lg"
              >
                View Portfolio
                <span className="btn__icon-right"><ArrowRight size={16} className="text-[#E6C383]" /></span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px]">
              {/* Gold glow behind image */}
              <div
                className="absolute inset-4 rounded-2xl opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, #E6C383 0%, transparent 70%)' }}
              />

              {/* Floating image */}
              <motion.div
                style={{ y: imgY }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden luxury-shadow">
                  <img
                    src="/hero_tower.png"
                    alt="ARCHADIA 3D architectural visualization hero render"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '620px', objectPosition: 'center top' }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                </div>

                {/* Frame border */}
                <div className="absolute -inset-[1px] rounded-2xl border border-[#E6C383]/20 pointer-events-none" />

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#E6C383]/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#E6C383]/50" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.2
                }}
                className="absolute -bottom-6 -left-6 glass-panel rounded-xl p-5 border border-[#E6C383]/15 shadow-xl select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E6C383] z-10" />
                    <div className="absolute w-5 h-5 rounded-full bg-[#E6C383]/30 animate-ping" />
                  </div>
                  <div>
                    <div className="font-sora font-bold text-[#E6C383] text-base leading-none mb-1">150+ Projects</div>
                    <div className="font-inter text-[10px] font-semibold tracking-[0.12em] uppercase text-white/70">
                      Delivered Across India
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-px h-20 bg-gradient-to-b from-[#E6C383]/25 to-transparent animate-pulse" />
        <ChevronDown size={14} className="text-[#E6C383]/30 animate-bounce" />
        <span className="font-inter text-[10px] tracking-[0.3em] text-[#B8B8B8]/30 uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
