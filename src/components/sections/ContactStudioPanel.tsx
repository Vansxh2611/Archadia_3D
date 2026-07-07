import React from 'react';
import { studioInfo } from '../../data/contactContent';
import { ArrowRight } from 'lucide-react';

export const ContactStudioPanel: React.FC = () => {
  return (
    <div className="contact-card contact-card--studio">
      <div>
        <h3 className="contact-studio__title">{studioInfo.title}</h3>
        <p className="contact-value" style={{ opacity: 0.6 }}>
          archadia 3d cgi and motion studio.
        </p>
      </div>

      <div className="contact-studio__block">
        <span className="contact-label">Office</span>
        <div className="contact-value">
          {studioInfo.addressLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>

      <div className="contact-studio__block">
        <span className="contact-label">Phone</span>
        <div className="contact-value">
          <a href={`tel:${studioInfo.phoneLabel.replace(/\s+/g, '')}`}>
            {studioInfo.phoneLabel}
          </a>
        </div>
      </div>

      <div className="contact-studio__block">
        <span className="contact-label">Email</span>
        <div className="contact-value">
          <a href={`mailto:${studioInfo.emailLabel}`}>
            {studioInfo.emailLabel}
          </a>
        </div>
      </div>

      <div className="contact-studio__block">
        <span className="contact-label">Working Hours</span>
        <div className="contact-value">{studioInfo.workingHours}</div>
      </div>

      <div className="contact-studio__block">
        <span className="contact-label">Connect</span>
        <div className="contact-socials">
          {studioInfo.socials.map((social) => (
            <a key={social} href="#" className="contact-socials__link">
              {social}
            </a>
          ))}
        </div>
      </div>

      <div className="contact-studio-footer mt-4">
        <a
          href="https://maps.google.com/?q=Archadia+3D+Lower+Parel+Mumbai"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-sm"
        >
          Get Directions
          <span className="btn__icon-right"><ArrowRight size={14} /></span>
        </a>
      </div>

      <div className="contact-map-shell">
        <iframe
          className="contact-map-iframe"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6694301643685!2d72.82534577609825!3d18.990200995116766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cef71465e9eb%3A0xe54ef980590ed8!2sLower%20Parel%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1719140000000!5m2!1sen!2sin"
          title="Archadia 3D Studio Location"
        />
      </div>
    </div>
  );
};
