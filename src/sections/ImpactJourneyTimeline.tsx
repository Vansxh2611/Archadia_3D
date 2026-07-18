import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

// Types for Journey step data
interface JourneyStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'concept',
    number: '01',
    title: 'Concept',
    subtitle: 'Narrative & Creative Vision',
    description: 'Defining the architectural narrative, site context, mood boards, and emotional direction to align with the core design intent.',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    subtitle: 'Form, Materials & Composition',
    description: 'Translating strategy into forms, structural layouts, and material palettes. Setting up physical attributes, glass, slate, and gold assets.',
  },
  {
    id: 'visualization',
    number: '03',
    title: 'Visualization',
    subtitle: 'Cinematic Imagery & Renderings',
    description: 'Crafting cinematic imagery, atmospheric wash, and high-fidelity CGI movements that bring blueprints to life with detailed lighting rigs.',
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Delivery',
    subtitle: 'Asset Handover & Stakeholder Pitch',
    description: 'Delivering final rendering outputs optimized for high-end pitches, digital sales, stakeholder alignments, and spatial presentations.',
  },
];

export const ImpactJourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Set up scroll tracking relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth out progress updates using Framer Motion springs
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 85,
  });

  // Map progress [0, 1] to gold spine height
  const pathHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-white py-32 overflow-hidden border-t border-black/[0.03]"
    >
      {/* Background blueprint details */}
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />

      <div className="container-luxury relative z-10 w-full">
        {/* HEADER: Section Intro */}
        <div className="max-w-[680px] flex flex-col items-center mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.05] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#E6C383]" />
            <span className="font-inter text-[10px] font-semibold tracking-[0.2em] text-[#E6C383] uppercase">
              Workflow Pipeline
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.15 }}
            className="font-sora font-extrabold text-3xl md:text-5xl mb-6 text-white leading-tight"
          >
            From Concept to <span className="gradient-gold gold-text-glow">Cinematic</span> Delivery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-inter text-[#B8B8B8] text-sm md:text-base leading-relaxed"
          >
            Our systematic timeline transforms early architectural drafts and drawing scripts into photorealistic, emotional 3D worlds.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative mt-20 max-w-[1000px] mx-auto">
          {/* Base Spine Line (Subtle track) */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-black/[0.04] -translate-x-1/2 pointer-events-none" />

          {/* Filled Gold Progress Spine Line */}
          <motion.div
            style={{ height: pathHeight }}
            className="absolute left-8 lg:left-1/2 top-0 w-[2px] bg-[#E6C383] -translate-x-1/2 origin-top pointer-events-none shadow-[0_0_10px_#E6C383] z-0"
          />

          {/* TIMELINE STEPS LIST */}
          <div className="space-y-16 lg:space-y-24">
            {JOURNEY_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col lg:flex-row ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  } items-start lg:items-center w-full`}
                >
                  {/* Timeline node marker indicator */}
                  <div className="absolute left-8 lg:left-1/2 w-6 h-6 rounded-full bg-white border border-black/10 -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.45, delay: 0.15 }}
                      className="w-2.5 h-2.5 rounded-full bg-[#E6C383] shadow-[0_0_6px_#E6C383]"
                    />
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`w-full lg:w-[calc(50%-32px)] pl-16 lg:pl-0 ${
                      isEven ? 'lg:pr-10 lg:text-right' : 'lg:pl-10 lg:text-left'
                    } flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}
                  >
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 24 }
                      }
                      whileInView={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
                      className="w-full max-w-[460px] border border-black/[0.08] bg-white/[0.65] backdrop-blur-md hover:border-[#E6C383]/25 transition-all duration-500 rounded-2xl p-6 md:p-8 flex flex-col gap-3 group relative overflow-hidden"
                    >
                      {/* Step card overlay lines */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(to_bottom_right,transparent_80%,rgba(148,117,60,0.02))] z-0" />

                      <span className="font-mono text-[10px] font-semibold text-[#E6C383]/70 tracking-[0.2em] uppercase z-10">
                        {step.number} — {step.subtitle}
                      </span>
                      
                      <h3 className="font-sora font-extrabold text-xl md:text-2xl text-white group-hover:text-[#E6C383] transition-colors duration-300 z-10">
                        {step.title}
                      </h3>

                      <p className="font-inter text-xs md:text-sm text-[#B8B8B8]/80 leading-relaxed z-10">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty balancing spacer */}
                  <div className="hidden lg:block lg:w-[calc(50%-32px)]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactJourneyTimeline;
