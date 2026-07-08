import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PortfolioApproach: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="portfolio-approach">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="portfolio-approach__header"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-accent uppercase mb-4 block">
            Our Approach
          </span>
          <h2 className="font-sora font-bold text-text-primary mb-6" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            The Art of <span className="gradient-gold">Translation</span>
          </h2>
          <p className="font-inter text-text-secondary text-lg max-w-2xl mb-12 leading-relaxed">
            Every pixel, shadow, and angle is designed to tell a story. We collaborate closely with developers and architects to transform flat blueprints into high-fidelity emotional narratives that connect with buyers instantly.
          </p>
        </motion.div>

        <div className="portfolio-approach__grid">
          {/* Left Column: Stacked Collage */}
          <div className="portfolio-approach__collage-col">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="portfolio-approach__img-wrap portfolio-approach__img-wrap--top"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                alt="Architectural study facade render"
                className="portfolio-approach__image"
                loading="lazy"
              />
              <div className="portfolio-approach__overlay" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="portfolio-approach__img-wrap portfolio-approach__img-wrap--bottom"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                alt="Interior detail material render"
                className="portfolio-approach__image"
                loading="lazy"
              />
              <div className="portfolio-approach__overlay" />
            </motion.div>
          </div>

          {/* Right Column: Tall Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="portfolio-approach__hero-col"
          >
            <div className="portfolio-approach__img-wrap portfolio-approach__img-wrap--hero">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                alt="Tower commercial exterior render"
                className="portfolio-approach__image"
                loading="lazy"
              />
              <div className="portfolio-approach__overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
