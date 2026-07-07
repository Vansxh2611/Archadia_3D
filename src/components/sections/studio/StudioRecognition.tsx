import React from 'react';
import { motion } from 'framer-motion';
import { studioAwards } from '../../../data/studioPage';

export const StudioRecognition: React.FC = () => {
  return (
    <section className="studio-section studio-recognition" aria-labelledby="recognition-title">
      <div className="studio-section__inner">
        <div>
          <span className="studio-section__label">Industry Awards</span>
          <h2 id="recognition-title" className="studio-section__title">Recognition</h2>
          <div className="studio-section__divider" />
        </div>

        <div className="studio-recognition__grid">
          {studioAwards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="studio-recognition__card"
            >
              <span className="studio-recognition__year">{award.year}</span>
              <h3 className="studio-recognition__award-title">{award.title}</h3>
              <p className="studio-recognition__subtitle">{award.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
