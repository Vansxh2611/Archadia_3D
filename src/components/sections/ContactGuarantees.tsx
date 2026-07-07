import React from 'react';
import { guarantees } from '../../data/contactContent';
import { Clock, ShieldCheck, Handshake } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  clock: Clock,
  shield: ShieldCheck,
  handshake: Handshake,
};

export const ContactGuarantees: React.FC = () => {
  return (
    <div className="contact-guarantees">
      <div className="contact-guarantees__grid">
        {guarantees.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || ShieldCheck;
          return (
            <div key={item.title} className="contact-guarantees__card">
              <div className="contact-guarantees__icon-box" aria-hidden="true">
                <IconComponent size={18} />
              </div>
              <div className="contact-guarantees__content">
                <h4 className="contact-guarantees__title">{item.title}</h4>
                <p className="contact-guarantees__desc">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
