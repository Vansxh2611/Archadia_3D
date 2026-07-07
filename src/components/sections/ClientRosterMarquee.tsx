import React from 'react';

const clientNames = [
  "Zenith Architecture",
  "Core Hospitality",
  "Neo Real Estate",
  "Velocity Retail"
];

// Triplicating list for seamless looping without text clipping gaps
const looped = [...clientNames, ...clientNames, ...clientNames];

export const ClientRosterMarquee: React.FC = () => {
  return (
    <section className="client-roster" aria-label="Client roster marquee">
      <div className="client-roster__container">
        <div className="client-roster__track">
          {looped.map((name, index) => (
            <React.Fragment key={`${name}-${index}`}>
              <span className="client-roster__name">{name}</span>
              <span className="client-roster__dot" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
