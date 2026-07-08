import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OUTCOMES = [
  { value: '340%', label: 'ROAS' },
  { value: '12M+', label: 'Views Generated' },
  { value: '4x', label: 'Sales Efficiency' },
  { value: '98%', label: 'Visual Accuracy' },
];

export const PortfolioOutcome: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="portfolio-outcome">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="portfolio-outcome__header"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-accent uppercase mb-4 block">
            The Impact
          </span>
          <h2 className="font-sora font-bold text-text-primary mb-6" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            The <span className="gradient-gold">Outcome</span>
          </h2>
          <p className="font-inter text-text-secondary text-lg max-w-2xl mb-12 leading-relaxed">
            Visualizations that do more than showcase architecture — they deliver concrete results, accelerate pre-sales timelines, and elevate brand equity.
          </p>
        </motion.div>

        <div className="portfolio-outcome__grid">
          {OUTCOMES.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="portfolio-outcome__card"
            >
              <div className="portfolio-outcome__card-glow" />
              <div className="portfolio-outcome__value">{stat.value}</div>
              <div className="portfolio-outcome__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
