import React from 'react';

const brands = ["MONOLITH", "LUMINA", "VERTEX", "STUDIO V", "AURA"];

// Duplicate list for seamless looping
const duplicatedBrands = [...brands, ...brands, ...brands];

const BrandMarquee: React.FC = () => {
  return (
    <section className="brand-marquee" aria-label="Client brands">
      <div className="brand-marquee__container">
        <div className="brand-marquee__track">
          {duplicatedBrands.map((brand, index) => (
            <React.Fragment key={`${brand}-${index}`}>
              <span className="brand-marquee__name">{brand}</span>
              <span className="brand-marquee__dot" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
