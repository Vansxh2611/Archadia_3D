import React from 'react';
import { testimonials } from '../../data/homeContent';

export const Testimonials: React.FC = () => {
  return (
    <section className="page-section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-inner">
        <div className="section-panel">
          <h2 id="testimonials-title" className="home-section__title">
            Testimonials
          </h2>
          <div className="testimonials__grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <blockquote className="testimonial-card__quote">
                  {t.quote}
                </blockquote>
                <div className="testimonial-card__author">
                  <span className="testimonial-card__name">{t.name}</span>
                  <span className="testimonial-card__role">
                    {t.title}, {t.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
