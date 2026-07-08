import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import mapImg from '../../../assets/studio/map.jpg';

export const StudioHub: React.FC = () => {
  return (
    <section className="studio-section studio-hub" aria-labelledby="hub-title">
      <div className="studio-section__inner">
        <div className="studio-hub__grid">
          {/* Left Column: Map preview with rounded corners */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="studio-hub__map-wrap"
          >
            <img
              src={mapImg.src}
              alt="Archadia Design Hub Map in Mumbai, India"
              className="studio-hub__map-img"
            />
            <div className="studio-hub__map-overlay" />
          </motion.div>

          {/* Right Column: Address and directions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="studio-hub__content"
          >
            <span className="studio-hub__eyebrow">Visit the Studio</span>
            <h2 id="hub-title" className="studio-hub__name">Archadia Design Hub</h2>

            <div className="studio-hub__address-block">
              <p className="studio-hub__address-line">
                Unit 402, The Obsidian Tower,<br />
                Senapati Bapat Marg, Lower Parel,<br />
                Mumbai, Maharashtra 400013
              </p>
            </div>

            <div className="studio-hub__contact-info">
              <a href="mailto:mumbai@archadia3d.in" className="studio-hub__contact-item">
                <Mail size={16} className="text-[#E6C383]" />
                mumbai@archadia3d.in
              </a>
              <a href="tel:+91225557890" className="studio-hub__contact-item">
                <Phone size={16} className="text-[#E6C383]" />
                +91 (22) 555-7890
              </a>
              <span className="studio-hub__contact-item">
                <MapPin size={16} className="text-[#E6C383]" />
                Open Mon - Sat: 9:00 AM - 7:00 PM
              </span>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-md self-start"
            >
              Get Directions
              <span className="btn__icon-right"><ArrowRight size={16} /></span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
