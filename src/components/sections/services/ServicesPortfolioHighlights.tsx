'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { portfolioHighlights } from '../../../data/servicesPage';

export const ServicesPortfolioHighlights: React.FC = () => {
  return (
    <section className="page-section services-portfolio-highlights" aria-labelledby="highlights-title">
      <div className="section-inner">
        <div className="section-panel">
          <div className="mb-16">
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              Realized Work
            </span>
            <h2 id="highlights-title" className="font-sora font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              Portfolio Highlights
            </h2>
            <div className="mt-6 h-px bg-gradient-to-r from-[#E6C383]/30 via-white/5 to-transparent" />
          </div>

          <div className="services-portfolio-highlights__grid">
            {portfolioHighlights.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="services-portfolio-highlights__card"
              >
                <div className="services-portfolio-highlights__img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="services-portfolio-highlights__img"
                    loading="lazy"
                  />
                  <div className="services-portfolio-highlights__overlay" />
                </div>
                <div className="services-portfolio-highlights__content">
                  <span className="services-portfolio-highlights__meta">
                    {project.type} • {project.location}
                  </span>
                  <h3 className="services-portfolio-highlights__project-title">
                    {project.title}
                  </h3>
                  <Link href="/case-studies" className="btn btn-ghost btn-sm">
                    View Case Study <span className="btn__icon-right">➝</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
