import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_STEPS } from '../utils/data';
import type { ProcessStep } from '../types';

function ProcessStepCard({
  step,
  index,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-8 lg:gap-12 items-start group"
    >
      {/* Number bubble + connector */}
      <div className="relative flex-none flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center bg-[#111111] border border-white/5 group-hover:border-[#E6C383]/30 rounded-2xl transition-all duration-500 z-10 relative group-hover:bg-[#111111] card-shadow">
          <span className="font-sora font-bold gradient-gold text-lg">{step.number}</span>
        </div>
        {/* Animated connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.5, ease: 'easeOut' }}
            className="w-px bg-gradient-to-b from-[#E6C383]/30 to-transparent origin-top"
            style={{ height: '80px', marginTop: '0px' }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${!isLast ? 'pb-16' : 'pb-0'}`}>
        <div className="pt-3">
          <h3 className="font-sora font-bold text-white text-xl mb-3 group-hover:text-[#E6C383] transition-colors duration-300">
            {step.title}
          </h3>
          <p className="font-inter text-[#B8B8B8] text-base leading-relaxed max-w-lg">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });

  return (
    <section id="process" className="bg-[#0E0E0E] section-padding">
      <div className="container-luxury">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
            Our Methodology
          </span>
          <h2
            className="font-sora font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            How We Work
          </h2>
          <div className="mt-8 h-px bg-gradient-to-r from-[#E6C383]/30 via-white/5 to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col">
          {PROCESS_STEPS.map((step: ProcessStep, i: number) => (
            <ProcessStepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
