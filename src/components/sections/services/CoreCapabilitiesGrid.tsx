import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { coreCapabilities } from '../../../data/servicesPage';

export const CoreCapabilitiesGrid: React.FC = () => {
  return (
    <section className="page-section services-core-capabilities" aria-labelledby="capabilities-title">
      <div className="section-inner">
        <div className="section-panel">
          <div className="mb-16">
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              Core Capabilities
            </span>
            <h2 id="capabilities-title" className="font-sora font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              Specialized Expertise
            </h2>
            <div className="mt-6 h-px bg-gradient-to-r from-[#E6C383]/30 via-white/5 to-transparent" />
          </div>

          <div className="services-core-capabilities__grid">
            {coreCapabilities.map((cap, i) => (
              <Link
                key={cap.title}
                href={`/services/${cap.slug}`}
                className="block no-underline"
                prefetch={true}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="services-core-capabilities__card h-full"
                >
                  <span className="services-core-capabilities__subtitle">{cap.subtitle}</span>
                  <h3 className="services-core-capabilities__title">{cap.title}</h3>
                  <p className="services-core-capabilities__desc">{cap.desc}</p>
                  <div className="services-core-capabilities__indicator">
                    Explore Detail <span>➝</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
