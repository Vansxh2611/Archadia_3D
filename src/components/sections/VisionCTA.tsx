import React from 'react';
import { ArrowRight } from 'lucide-react';

export const VisionCTA: React.FC = () => {
  return (
    <section className="page-section vision-section" aria-labelledby="cta-heading">
      <div className="section-inner">
        <div className="vision-cta-panel">
          <div className="vision-cta__content">
            <h2 id="cta-heading" className="vision-cta__title">
              Have a Vision? Let’s Build It.
            </h2>
            <p className="vision-cta__desc">
              Partner with our visualization studio to transform architectural blueprints into striking digital realities.
            </p>
            <button type="button" className="btn btn-primary btn-md">
              Schedule a Consultation
              <span className="btn__icon-right"><ArrowRight size={16} /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
