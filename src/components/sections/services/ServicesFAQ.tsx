import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { servicesFAQ } from '../../../data/servicesPage';

export const ServicesFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="page-section services-faq" aria-labelledby="faq-title">
      <div className="section-inner">
        <div className="section-panel">
          <div className="mb-16 text-center">
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              F.A.Q.
            </span>
            <h2 id="faq-title" className="font-sora font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              Common Questions
            </h2>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#E6C383]/30 to-transparent max-w-xl mx-auto" />
          </div>

          <div className="services-faq__list">
            {servicesFAQ.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={faq.question}
                  className={`services-faq__item ${isOpen ? 'services-faq__item--open' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(i)}
                    className="services-faq__question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="services-faq__question-text">{faq.question}</span>
                    <span className="services-faq__icon-wrap">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="services-faq__answer-wrap"
                      >
                        <p className="services-faq__answer-text">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
