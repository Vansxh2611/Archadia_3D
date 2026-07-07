import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesInquiryBlock: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'architectural',
    budgetRange: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry Submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      projectType: 'architectural',
      budgetRange: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="page-section services-inquiry-section" aria-labelledby="inquiry-title">
      <div className="section-inner">
        <div className="section-panel overflow-hidden">
          {/* Localized glow inside the panel */}
          <div className="services-inquiry__glow" />
          <div className="services-inquiry__grid relative z-10">
            {/* Left Column: Heading and info */}
            <div className="services-inquiry__info">
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
                Get in Touch
              </span>
              <h2 id="inquiry-title" className="font-sora font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}>
                Ready to Visualize <br className="hidden md:inline" />
                Your Project?
              </h2>
              <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-8 max-w-md">
                Let us help you present your architectural visions to developers, investors, and clients across India with maximum impact.
              </p>

              <ul className="services-inquiry__bullets">
                <li className="services-inquiry__bullet-item">
                  <CheckCircle2 size={18} className="text-[#E6C383] flex-shrink-0" />
                  <span className="font-inter text-[#B8B8B8] text-sm">98% on-time delivery on committed dates</span>
                </li>
                <li className="services-inquiry__bullet-item">
                  <CheckCircle2 size={18} className="text-[#E6C383] flex-shrink-0" />
                  <span className="font-inter text-[#B8B8B8] text-sm">Senior visualization team assigned to every project</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Mini Form */}
            <div className="services-inquiry__form-panel">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="services-inquiry__success-card"
                  >
                    <div className="services-inquiry__success-icon">✓</div>
                    <h3 className="font-sora font-semibold text-white text-xl mb-3">Inquiry Received</h3>
                    <p className="font-inter text-[#B8B8B8] text-sm leading-relaxed mb-6">
                      Thank you for reaching out. A senior visualization designer will review your drawings and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn btn-secondary btn-md w-full"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="services-inquiry__form"
                  >
                    <div className="services-inquiry__field-group">
                      <div className="services-inquiry__field">
                        <label htmlFor="inquiry-name" className="services-inquiry__label-tag">Name</label>
                        <input
                          type="text"
                          id="inquiry-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="services-inquiry__input"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="services-inquiry__field">
                        <label htmlFor="inquiry-email" className="services-inquiry__label-tag">Email</label>
                        <input
                          type="email"
                          id="inquiry-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="services-inquiry__input"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="services-inquiry__field-group">
                      <div className="services-inquiry__field">
                        <label htmlFor="inquiry-type" className="services-inquiry__label-tag">Project Type</label>
                        <select
                          id="inquiry-type"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="services-inquiry__select"
                        >
                          <option value="architectural">Architectural Renders</option>
                          <option value="interior">Interior Renders</option>
                          <option value="product">Product / Furniture</option>
                          <option value="animation">3D Animation Film</option>
                          <option value="vr">VR Walkthrough</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="services-inquiry__field">
                        <label htmlFor="inquiry-budget" className="services-inquiry__label-tag">Budget Range (Optional)</label>
                        <input
                          type="text"
                          id="inquiry-budget"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className="services-inquiry__input"
                          placeholder="e.g. ₹2L - ₹5L"
                        />
                      </div>
                    </div>

                    <div className="services-inquiry__field">
                      <label htmlFor="inquiry-message" className="services-inquiry__label-tag">Message</label>
                      <textarea
                        id="inquiry-message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="services-inquiry__textarea"
                        placeholder="Describe your design, scope, and timeline requirements..."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-md w-full">
                      Submit Inquiry
                      <span className="btn__icon-right"><ArrowRight size={16} /></span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
