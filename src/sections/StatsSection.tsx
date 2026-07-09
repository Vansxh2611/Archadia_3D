import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../utils/data';
import AnimatedStatistic from '../components/layout/AnimatedStatistic';

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  return (
    <div className="stat-item">
      <div className="stat-value font-sora !p-0 !flex !justify-center">
        <AnimatedStatistic value={`${value}${suffix}`} delay={delay} />
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
