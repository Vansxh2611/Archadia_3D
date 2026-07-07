import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
};

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });
  const formVisible = useInView(formRef, { once: true, margin: '-60px' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm(initialForm);
  };

  const inputCls =
    'w-full bg-[#ffffff] border border-black/15 text-text-primary font-inter text-sm px-5 py-4 rounded-none placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/60 focus:bg-[#ffffff] transition-all duration-300';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <section id="contact" className="bg-bg-secondary section-padding">
      <div className="container-luxury">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-sora font-bold text-gold" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Start a Conversation
          </h2>
          <div className="mt-8 h-px bg-gradient-to-r from-gold/30 via-black/5 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 xl:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            {[
              { label: 'Email', value: 'studio@archadia3d.com', href: 'mailto:studio@archadia3d.com' },
              { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { label: 'Studio', value: 'Mumbai · Delhi-NCR · Bengaluru', href: undefined },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <span className="font-inter text-xs tracking-[0.25em] text-gold uppercase">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-sora font-medium text-text-primary text-lg hover:text-gold transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-sora font-medium text-text-primary text-lg">{item.value}</span>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <span className="font-inter text-xs tracking-[0.25em] text-gold uppercase">Social</span>
              <div className="flex flex-col gap-2">
                {['Instagram', 'Behance', 'LinkedIn'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="font-sora font-medium text-text-secondary hover:text-gold transition-colors duration-300 w-fit"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 40 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/40 mb-6 gold-glow">
                  <Send size={22} className="text-gold" />
                </div>
                <h3 className="font-sora font-bold text-gold text-2xl mb-3">Inquiry Sent</h3>
                <p className="font-inter text-text-secondary">
                  Thank you! We'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Name</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Company</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your company" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Phone</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="project-type" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Project Type</label>
                    <select id="project-type" name="projectType" value={form.projectType} onChange={handleChange} className={selectCls}>
                      <option value="" disabled>Select type</option>
                      <option value="arch-viz">Architectural Visualization</option>
                      <option value="interior">Interior Rendering</option>
                      <option value="animation">3D Animation</option>
                      <option value="vr">Virtual Experience</option>
                      <option value="consulting">Design Consulting</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Budget</label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={selectCls}>
                      <option value="" disabled>Select budget</option>
                      <option value="2-5l">₹2,50,000 – ₹5,00,000</option>
                      <option value="5-10l">₹5,00,000 – ₹10,00,000</option>
                      <option value="10-25l">₹10,00,000 – ₹25,00,000</option>
                      <option value="25l+">₹25,00,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-inter text-xs tracking-widest text-text-secondary uppercase">Message</label>
                  <textarea
                    id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell us about your project, vision, and timeline..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-md self-start"
                >
                  Send Inquiry
                  <span className="btn__icon-right"><Send size={15} /></span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
