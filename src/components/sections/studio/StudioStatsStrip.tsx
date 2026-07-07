import React from 'react';
import { motion } from 'framer-motion';
import { studioStats } from '../../../data/studioPage';
import '../../../styles/clients.css';

export const StudioStatsStrip: React.FC = () => {
  return (
    <section className="clients-stats" aria-label="Studio Statistics">
      <div className="container-luxury">
        <div className="clients-stats__grid">
          {studioStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="clients-stats__card"
            >
              <div className="clients-stats__value gradient-gold">
                {stat.value}
              </div>
              <p className="clients-stats__label">{stat.label}</p>
              <div className="clients-stats__card-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
