import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLARS = [
  {
    number: '01',
    name: 'Vision',
    description: 'We see beyond blueprints — into the emotional truth of each space and structure.',
  },
  {
    number: '02',
    name: 'Precision',
    description: 'Every pixel, shadow, and material is intentionally placed with obsessive care.',
  },
  {
    number: '03',
    name: 'Innovation',
    description: 'Pushing the boundaries of what visualization can express and communicate.',
  },
];

export default function PhilosophySection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const headlineVisible = useInView(headlineRef, { once: true, margin: '-80px' });
  const pillarsVisible = useInView(pillarsRef, { once: true, margin: '-80px' });

  return (
    <section id="philosophy" className="relative bg-white section-padding overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[160px] opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #E6C383 0%, transparent 70%)' }}
      />

      <div className="container-luxury relative">
        <motion.div
          ref={headlineRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
            Our Philosophy
          </span>
          <h2
            className="font-sora font-bold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Every Structure Begins
            <br />
            <span className="gradient-gold">As A Story.</span>
          </h2>
          <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed max-w-2xl mx-auto">
            We translate imagination into immersive architectural experiences that inspire,
            communicate, and captivate audiences across India.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          ref={pillarsRef}
          className="grid md:grid-cols-3 gap-8 lg:gap-16"
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 40 }}
              animate={pillarsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="flex flex-col">
                <span
                  className="font-sora font-bold gradient-gold opacity-60 group-hover:opacity-100 transition-opacity duration-500 mb-4 leading-none"
                  style={{ fontSize: 'clamp(60px, 8vw, 80px)' }}
                >
                  {pillar.number}
                </span>
                <div className="w-full h-px bg-gradient-to-r from-[#E6C383]/40 to-transparent mb-6 group-hover:from-[#E6C383]/80 transition-colors duration-500" />
                <h3 className="font-sora font-bold text-white text-2xl mb-4">{pillar.name}</h3>
                <p className="font-inter text-[#B8B8B8] text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
