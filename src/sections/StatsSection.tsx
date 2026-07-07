import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '../hooks';
import { STATS } from '../utils/data';

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-value font-sora">
        {count}
        <span className="text-[#E6C383]">{suffix}</span>
      </div>
      <div className="stat-label font-inter">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" className="page-section stats-section">
      <div className="section-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="section-panel stats-shell"
        >
          <div className="stats-eyebrow font-inter">By The Numbers</div>

          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
