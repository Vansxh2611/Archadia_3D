import React from 'react';
import { services } from '../../data/homeContent';
import { Building, Palette, Globe, Megaphone, Layers, Compass } from 'lucide-react';

const ICON_MAP = [
  Building,
  Palette,
  Globe,
  Megaphone,
  Layers,
  Compass,
];

export const ServicesGrid: React.FC = () => {
  return (
    <section className="page-section services-grid-section" aria-labelledby="services-title">
      <div className="section-inner">
        <div className="section-panel">
          <h2 id="services-title" className="home-section__title">
            What We Do
          </h2>
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = ICON_MAP[index] || Compass;
              return (
                <div key={service.title} className="services-grid__card">
                  <div className="services-grid__icon" aria-hidden="true">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="services-grid__item-title">{service.title}</h3>
                  <p className="services-grid__item-desc">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
