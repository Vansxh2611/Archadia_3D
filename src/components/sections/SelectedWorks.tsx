import React from 'react';
import { selectedWorks } from '../../data/homeContent';

export const SelectedWorks: React.FC = () => {
  return (
    <section className="page-section selected-works-section" aria-labelledby="selected-works-title">
      <div className="section-inner">
        <div className="section-panel">
          <h2 id="selected-works-title" className="home-section__title">
            Selected Works
          </h2>
          <div className="selected-works__grid">
            {selectedWorks.map((work) => (
              <div key={work.title} className="selected-works__card">
                <figure className="selected-works__image-wrapper">
                  <img
                    src={work.image}
                    alt={`${work.title} - ${work.category} Architectural Design`}
                    className="selected-works__image"
                    loading="lazy"
                  />
                </figure>
                <div className="selected-works__info">
                  <span className="selected-works__category">{work.category}</span>
                  <h3 className="selected-works__work-title">{work.title}</h3>
                  <div className="selected-works__client">
                    Client: {work.client}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
