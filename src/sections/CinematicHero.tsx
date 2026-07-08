'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Type definitions for component states
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse coordinates mapped to motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 30, stiffness: 80, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Spotlight position relative style strings (disabled by user request)
  // const spotlightX = useTransform(mouseXSpring, (x) => `${x}px`);
  // const spotlightY = useTransform(mouseYSpring, (y) => `${y}px`);

  // Parallax transform calculations (gentle opposite displacement)
  const gridParallaxX = useTransform(mouseXSpring, (x) => isDesktop && !shouldReduceMotion ? (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.015 : 0);
  const gridParallaxY = useTransform(mouseYSpring, (y) => isDesktop && !shouldReduceMotion ? (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.015 : 0);

  const rightParallaxX = useTransform(mouseXSpring, (x) => isDesktop && !shouldReduceMotion ? (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.025 : 0);
  const rightParallaxY = useTransform(mouseYSpring, (y) => isDesktop && !shouldReduceMotion ? (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.025 : 0);

  // Check screen dimensions and update mouse tracking availability
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(isLg && !hasTouch);

      // Default spring coordinates to center of viewport initially
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mouseX, mouseY]);

  // Track cursor coordinates on hover (only on desktop non-touch devices)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    if (!isDesktop || typeof window === 'undefined') return;
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  };

  // Pre-generate and memoize atmospheric particles config to prevent layout thrash
  const particles = useMemo<Particle[]>(() => {
    const count = isDesktop ? 22 : 10;
    const items: Particle[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100, // percentage left
        y: Math.random() * 100, // percentage top
        size: Math.random() * 2.5 + 1, // 1px to 3.5px
        duration: Math.random() * 8 + 6, // 6s to 14s
        delay: Math.random() * 3, // delay up to 3s
        opacity: Math.random() * 0.25 + 0.08, // subtle opacity
      });
    }
    return items;
  }, [isDesktop]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-start lg:items-center overflow-x-hidden overflow-y-visible bg-bg-primary select-none"
    >


      {/* LAYER 2: Blueprint grid lines & Parallax Layer (z-0) */}
      <motion.div
        style={{
          x: gridParallaxX,
          y: gridParallaxY,
        }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        {/* Precision CSS structural grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(158, 126, 71, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(158, 126, 71, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
          }}
        />

        {/* Decorative blueprint technical drawing symbols */}
        <div className="absolute top-[20%] right-[45%] w-32 h-32 rounded-full border border-[#6A665E]/12 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-dashed border-[#6A665E]/8" />
          <div className="absolute h-full w-px bg-[#6A665E]/6 rotate-45" />
          <div className="absolute h-full w-px bg-[#6A665E]/6 -rotate-45" />
        </div>

        <div className="absolute bottom-[25%] left-[48%] w-48 h-48 rounded-full border border-[#6A665E]/10 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-[#6A665E]/8" />
          <div className="absolute w-full h-px bg-[#6A665E]/6" />
          <div className="absolute h-full w-px bg-[#6A665E]/6" />
        </div>

        {/* Geometric crosshairs in viewport corners */}
        <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-[#6A665E]/20" />
        <div className="absolute top-10 right-10 w-6 h-6 border-t border-r border-[#6A665E]/20" />
        <div className="absolute bottom-10 left-10 w-6 h-6 border-b border-l border-[#6A665E]/20" />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-[#6A665E]/20" />
      </motion.div>

      {/* LAYER 3: Memoized drifting dust particles (z-0) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: `${particle.y}vh`,
              opacity: particle.opacity,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                  y: [`${particle.y}vh`, `${particle.y - 18}vh`, `${particle.y}vh`],
                  opacity: [particle.opacity, particle.opacity * 1.8, particle.opacity * 0.4, particle.opacity],
                }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: '#E6C383',
              borderRadius: '50%',
              filter: 'blur(0.5px)',
            }}
            className="absolute will-change-transform"
          />
        ))}
      </div>

      {/* LAYER 4: Interactive cursor spotlight mask (z-0) - TURNED OFF BY USER REQUEST */}
      {/* {isDesktop && (
        <motion.div
          style={{
            left: spotlightX,
            top: spotlightY,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute z-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,195,131,0.06)_0%,transparent_65%)] pointer-events-none blur-[10px] will-change-transform"
        />
      )} */}

      {/* LAYER 5: Hero Content & Grid (z-10) */}
      <div className="container-luxury relative z-10 w-full pt-32 pb-16 lg:pt-28">
        {/* Floating Camera Drift Wrapper - disables during reduced motion */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                y: [0, -6, 4, 0],
                rotateZ: [0, -0.2, 0.2, 0],
              }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-16 items-center will-change-transform"
        >
          {/* Left Column Content Section */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Pill Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.05] mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-inter text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                Archadia 3D — Architectural Visualization
              </span>
            </motion.div>

            {/* Cinematic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-sora font-extrabold leading-[0.95] mb-8 text-text-primary"
              style={{ fontSize: 'clamp(40px, 7.5vw, 80px)', letterSpacing: '-0.03em' }}
            >
              Cinematic
              <br />
              <span className="gradient-gold gold-text-glow">Architectural</span> Realities.
            </motion.h1>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-inter text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-[500px]"
            >
              We craft emotional visual narratives, turning drawing scripts and blueprints into photorealistic, breathtaking digital worlds for India's finest architectural works.
            </motion.p>

            {/* CTA Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/contact" className="btn btn-primary btn-lg group">
                Start Your Project
                <span className="btn__icon-right transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-lg group">
                View Portfolio
                <span className="btn__icon-right transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} className="text-gold" />
                </span>
              </Link>
            </motion.div>

            {/* Visual Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 gap-8 border-t border-black/[0.08] pt-8 max-w-[480px]"
            >
              <div>
                <div className="font-sora font-semibold text-text-primary text-xl md:text-2xl mb-1 flex items-center gap-2">
                  <span className="text-gold">500+</span>
                </div>
                <p className="font-inter text-[10px] font-semibold tracking-wider text-text-secondary/70 uppercase">
                  Visualized Spaces
                </p>
              </div>
              <div>
                <div className="font-sora font-semibold text-text-primary text-xl md:text-2xl mb-1 flex items-center gap-2">
                  <span className="text-gold">97%</span>
                </div>
                <p className="font-inter text-[10px] font-semibold tracking-wider text-text-secondary/70 uppercase">
                  Client Retention
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Blueprint Card */}
          <motion.div
            style={{
              x: rightParallaxX,
              y: rightParallaxY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end will-change-transform"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-black/[0.06] bg-bg-secondary/45 p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between group">
              {/* Technical Drawing Blueprint Overlays inside the card */}
              <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(148,117,60,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Decorative interior crosshairs and line metrics */}
              <div className="absolute inset-4 border border-dashed border-black/[0.08] pointer-events-none rounded-xl" />
              <div className="absolute top-[40%] left-0 w-full h-px bg-black/[0.04]" />
              <div className="absolute left-[35%] top-0 h-full w-px bg-black/[0.04]" />

              {/* Floating Blueprint Header Metadata */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="font-mono text-[9px] text-text-secondary/50 uppercase tracking-widest leading-relaxed">
                  Ref: ACC-HD-009 //
                  <br />
                  Projection: Ortho_Proj_3D
                </div>
                <div className="px-2.5 py-1 rounded bg-gold/10 border border-gold/20 font-mono text-[9px] text-gold uppercase tracking-wider">
                  Drafting v1.0
                </div>
              </div>

              {/* Central Vector Circle Indicator */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative w-44 h-44 rounded-full border border-black/[0.08] flex items-center justify-center">
                  {/* Rotating border accent */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-gold/30"
                  />
                  {/* Concentric inner circles */}
                  <div className="w-32 h-32 rounded-full border border-black/[0.04] flex items-center justify-center" />
                  <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-gold/10 to-transparent border border-gold/20 flex items-center justify-center shadow-[0_0_24px_rgba(148,117,60,0.05)]">
                    <span className="font-sora font-semibold text-gold text-sm tracking-wider">3D</span>
                  </div>
                </div>
                <div className="mt-6 font-sora font-semibold text-text-primary/90 text-sm tracking-[0.2em] uppercase text-center ml-[0.2em]">
                  Archviz Blueprint
                </div>
              </div>

              {/* Bottom Strip Technical Details */}
              <div className="relative z-10 border-t border-black/[0.08] pt-4 flex justify-between items-center">
                <span className="font-mono text-[9px] text-text-secondary/40 uppercase tracking-widest">
                  Scale: N.T.S.
                </span>
                <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-semibold">
                  Concept → Reality
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient static chevron indicator at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center bg-white/40 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 border-r border-b border-gold/60 rotate-45 translate-y-[-1px]" />
        </motion.div>
      </div>
    </section>
  );
}
