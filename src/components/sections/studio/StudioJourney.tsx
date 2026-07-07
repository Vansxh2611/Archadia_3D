import React from 'react';
import { motion } from 'framer-motion';
import { studioJourney } from '../../../data/studioPage';

export const StudioJourney: React.FC = () => {
  return (
    <section className="studio-section studio-journey" aria-labelledby="journey-title">
      <div className="studio-section__inner">
        <div>
          <span className="studio-section__label">A Decade of Craft</span>
          <h2 id="journey-title" className="studio-section__title">Our Journey</h2>
          <div className="studio-section__divider" />
        </div>

        <div className="studio-journey__timeline-wrap">
          {/* Vertical line */}
          <div className="studio-journey__line" />

          <ol className="studio-journey__list">
            {studioJourney.map((item, i) => (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="studio-journey__item"
              >
                {/* Year dot node */}
                <div className="studio-journey__dot-wrap">
                  <div className="studio-journey__dot" />
                </div>

                <div className="studio-journey__content">
                  <span className="studio-journey__year">{item.year}</span>
                  <h3 className="studio-journey__item-title">{item.title}</h3>
                  <p className="studio-journey__item-desc">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
