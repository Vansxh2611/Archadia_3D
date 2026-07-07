import React from 'react';
import { motion } from 'framer-motion';
import { studioPrinciples } from '../../../data/studioPage';

export const StudioPrinciples: React.FC = () => {
  return (
    <section className="studio-section studio-principles" aria-labelledby="principles-title">
      <div className="studio-section__inner">
        <div>
          <span className="studio-section__label">What We Stand For</span>
          <h2 id="principles-title" className="studio-section__title">Brand Principles</h2>
          <div className="studio-section__divider" />
        </div>

        <div className="studio-principles__grid">
          {studioPrinciples.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="studio-principles__card"
            >
              <span className="studio-principles__card-num">Principle 0{i + 1}</span>
              <h3 className="studio-principles__card-title">{principle.title}</h3>
              <p className="studio-principles__card-desc">{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
