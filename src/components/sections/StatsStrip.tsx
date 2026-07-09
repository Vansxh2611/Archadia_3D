import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../../data/homeContent';
import { AnimatedStatistic } from '../layout/AnimatedStatistic';
import '../../styles/clients.css';

export const StatsStrip: React.FC = () => {
  return (
    <section className="clients-stats" aria-label="Key Performance Indicators">
      <div className="container-luxury">
        <div className="clients-stats__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="clients-stats__card"
            >
              <div className="clients-stats__value gradient-gold !p-0 !flex !justify-center">
                <AnimatedStatistic value={stat.value} delay={i * 0.08} />
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
