import React, { useState } from 'react';
import { methodologySteps } from '../../data/homeContent';

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="page-section methodology-section" aria-labelledby="methodology-title">
      <div className="section-inner">
        <div className="section-panel">
          <h2 id="methodology-title" className="home-section__title">
            Our Methodology
          </h2>
          <p className="methodology__subtitle">
            A rigorous, architectural approach to digital creation.
          </p>
          <div className="methodology__steps" role="list">
            {methodologySteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.number}
                  className={`methodology__step ${isActive ? 'methodology__step--active' : ''}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  role="listitem"
                  tabIndex={0}
                  aria-current={isActive ? 'step' : undefined}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(index);
                    }
                  }}
                >
                  <div className="methodology__step-header">
                    <span className="methodology__number">{step.number}</span>
                    <h3 className="methodology__step-title">{step.title}</h3>
                  </div>
                  <p className="methodology__step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
