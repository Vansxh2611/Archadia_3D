import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, CLIENT_LOGOS } from '../utils/data';

export default function ClientsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });
  const logosVisible = useInView(logosRef, { once: true, margin: '-60px' });
  const testVisible = useInView(testRef, { once: true, margin: '-60px' });

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActiveIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIdx(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section id="clients" className="bg-white section-padding">
      <div className="container-luxury">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
            Who We Work With
          </span>
          <h2 className="font-sora font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Trusted By Visionaries
          </h2>
        </motion.div>

        {/* Logo Wall */}
        <motion.div
          ref={logosRef}
          initial={{ opacity: 0 }}
          animate={logosVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden mb-24"
        >
          {CLIENT_LOGOS.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              animate={logosVisible ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              className="group bg-white hover:bg-neutral-50 flex items-center justify-center p-8 transition-colors duration-300"
            >
              <span className="font-sora font-bold text-[#B8B8B8]/40 group-hover:text-[#E6C383]/60 text-xs tracking-[0.2em] text-center transition-colors duration-300">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          ref={testRef}
          initial={{ opacity: 0, y: 40 }}
          animate={testVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8 lg:px-16"
              >
                {/* Giant quotation mark */}
                <div
                  className="font-sora font-bold gradient-gold leading-none select-none mb-6"
                  style={{ fontSize: '120px', lineHeight: 0.8 }}
                >
                  "
                </div>

                <p className="font-sora font-light text-white leading-relaxed mb-10" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
                  {TESTIMONIALS[activeIdx].text}
                </p>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-[#E6C383]/50 mb-4" />
                  <span className="font-sora font-semibold text-white text-base">
                    {TESTIMONIALS[activeIdx].author}
                  </span>
                  <span className="font-inter text-[#B8B8B8] text-sm">
                    {TESTIMONIALS[activeIdx].company}
                  </span>
                  <span className="font-inter text-[#E6C383]/70 text-xs tracking-widest uppercase mt-1">
                    {TESTIMONIALS[activeIdx].projectType}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={prev}
              className="btn-circle"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    i === activeIdx
                      ? 'w-6 h-2 bg-[#E6C383]'
                      : 'w-2 h-2 bg-black/10 hover:bg-black/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="btn-circle"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
