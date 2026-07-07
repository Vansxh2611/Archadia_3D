import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { methodologySteps } from '../../../data/servicesPage';

export const ServicesMethodology: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section className="page-section services-methodology" aria-labelledby="methodology-title">
      <div className="section-inner">
        <div className="section-panel">
          <div className="mb-16">
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              Our Process
            </span>
            <h2 id="methodology-title" className="font-sora font-bold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              Our Methodology
            </h2>
            <p className="font-inter text-[#B8B8B8] text-lg max-w-2xl leading-relaxed">
              A collaborative, structured workflow designed to translate architectural visions into cinematic digital realities.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-[#E6C383]/30 via-white/5 to-transparent" />
          </div>

          <div className="services-methodology__container">
            {/* Left Side: Accordion list */}
            <div className="services-methodology__accordion">
              {methodologySteps.map((step, idx) => {
                const isOpen = activeStepIndex === idx;

                return (
                  <div
                    key={step.id}
                    className={`services-methodology__step ${isOpen ? 'services-methodology__step--active' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <div className="services-methodology__step-header">
                      <span className="services-methodology__step-num">{step.id}</span>
                      <div className="services-methodology__step-title-wrap">
                        <h3 className="services-methodology__step-title">{step.title}</h3>
                        <p className="services-methodology__step-summary">{step.summary}</p>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                          className="services-methodology__step-body"
                        >
                          <p className="services-methodology__step-detail">{step.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Side: Active Step Image display */}
            <div className="services-methodology__image-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="services-methodology__image-wrap"
                >
                  <img
                    src={methodologySteps[activeStepIndex].image}
                    alt={methodologySteps[activeStepIndex].title}
                    className="services-methodology__image"
                  />
                  <div className="services-methodology__image-overlay" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
