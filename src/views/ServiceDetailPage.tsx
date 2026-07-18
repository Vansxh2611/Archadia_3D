'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Box, 
  Play, 
  Film, 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { ServiceDetail } from '../data/serviceDetails';
import { SectionDivider } from '../components/SectionDivider';
import { SectionReveal } from '../components/layout/SectionReveal';

// Map icon strings to their Lucide Component counterparts
const iconMap: Record<string, React.ComponentType<any>> = {
  Building2,
  Home,
  Box,
  Play,
  Film,
  Layers
};

export default function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const Icon = iconMap[service.iconName] || Building2;

  return (
    <main className="bg-white min-h-screen text-black">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-precision opacity-40" />
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="container-luxury relative z-10 pt-36">
          {/* Breadcrumb & Back navigation */}
          <div className="mb-8 flex items-center">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 font-inter text-xs tracking-wider text-[#94753c] hover:text-[#ab8a4c] transition-colors uppercase group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#E6C383]/10 rounded-xl">
                <Icon size={18} className="text-[#E6C383]" />
              </div>
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase">{service.subtitle}</span>
            </div>

            <h1
              className="font-sora font-bold text-black leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
            >
              {service.title}
            </h1>
            
            <p className="font-inter text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Overview & Key Features (Split Layout) */}
      <SectionReveal>
        <section className="section-padding py-20">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
              {/* Left Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="mb-8">
                  <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-3 block">
                    Overview
                  </span>
                  <h2 className="font-sora font-bold text-[#94753c] text-3xl mb-6">
                    Domain Excellence
                  </h2>
                  <p className="font-inter text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
                    {service.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="font-sora font-semibold text-black text-xl mb-5">Key Offerings</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-3 bg-gray-50/75 border border-gray-100 p-4 rounded-xl"
                      >
                        <CheckCircle size={16} className="text-[#E6C383] mt-0.5 flex-none" />
                        <span className="font-inter text-gray-700 text-sm leading-normal">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Media/Image card */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden luxury-shadow border border-gray-100">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-auto object-cover rounded-2xl"
                    style={{ maxHeight: '520px', objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                </div>
                {/* Decorative corners */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#E6C383]/60" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#E6C383]/60" />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* Production Workflow & Technical Specs (Grid) */}
      <SectionReveal>
        <section className="section-padding py-20 bg-gray-50/50">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-3 gap-12 xl:gap-16">
              
              {/* Production Process (Takes 2 Columns) */}
              <div className="lg:col-span-2">
                <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-3 block">
                  Methodology
                </span>
                <h2 className="font-sora font-bold text-[#94753c] text-3xl mb-10">
                  Production Pipeline
                </h2>

                <div className="flex flex-col gap-8 relative pl-6 border-l border-gray-200">
                  {service.process.map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                      className="relative"
                    >
                      {/* Node indicator */}
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#E6C383]" />
                      <div className="flex gap-4 items-start">
                        <span className="font-sora font-bold text-[#E6C383] text-xl leading-none">
                          {step.step}
                        </span>
                        <div>
                          <h3 className="font-sora font-semibold text-black text-lg mb-2">
                            {step.title}
                          </h3>
                          <p className="font-inter text-gray-600 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications (Takes 1 Column) */}
              <div className="lg:col-span-1">
                <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-between border border-[#E6C383]/20 bg-white">
                  <div>
                    <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-3 block">
                      Execution
                    </span>
                    <h2 className="font-sora font-bold text-[#94753c] text-2xl mb-8">
                      Technical Specs
                    </h2>
                    
                    <div className="flex flex-col gap-6">
                      {service.specs.map((spec, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="border-b border-gray-100 pb-4"
                        >
                          <span className="font-inter text-[10px] tracking-wider text-[#94753c] uppercase block mb-1">
                            {spec.label}
                          </span>
                          <span className="font-inter text-black text-sm font-medium">
                            {spec.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 bg-[#E6C383]/5 border border-[#E6C383]/15 rounded-xl p-4 flex gap-3 items-center">
                    <Settings size={20} className="text-[#94753c] flex-none" />
                    <span className="font-inter text-gray-600 text-xs leading-normal">
                      Custom pipelines and custom resolution outputs can be tailored upon inquiry.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* Strategic Benefits Section */}
      <SectionReveal>
        <section className="section-padding py-20">
          <div className="container-luxury">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-3 block">
                Business Impact
              </span>
              <h2 className="font-sora font-bold text-[#94753c] text-3xl">
                Strategic Value Add
              </h2>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#E6C383]/30 to-transparent" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {service.benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-colors duration-300 flex flex-col gap-4"
                >
                  <span className="text-2xl font-bold font-sora text-[#E6C383]/40">0{i+1}</span>
                  <h3 className="font-sora font-semibold text-black text-lg">
                    {benefit.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* visual gallery */}
      <SectionReveal>
        <section className="section-padding py-20 bg-gray-50/30">
          <div className="container-luxury">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-3 block">
                  Visual Showcase
                </span>
                <h2 className="font-sora font-bold text-[#94753c] text-3xl">
                  Related Work
                </h2>
              </div>
              <Link 
                href="/portfolio" 
                className="font-inter text-xs tracking-wider text-black hover:text-[#94753c] transition-colors uppercase flex items-center gap-2 group"
              >
                View Full Portfolio
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {service.gallery.map((img, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 group cursor-pointer luxury-shadow bg-white"
                >
                  <img
                    src={img}
                    alt={`${service.title} showcase ${i+1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* Inquiry Block */}
      <SectionReveal>
        <section className="section-padding py-24 bg-white relative overflow-hidden">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
          />
          <div className="container-luxury text-center relative z-10">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
                Work With Us
              </span>
              <h2 className="font-sora font-bold text-black text-3xl sm:text-4xl mb-6">
                Ready to Bring Your Projects to Life?
              </h2>
              <p className="font-inter text-gray-600 text-base sm:text-lg mb-10 leading-relaxed">
                Partner with Archadia 3D to craft premium visuals that validate designs and accelerate project sales velocity across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  Inquire About This Service
                  <span className="btn__icon-right"><ArrowRight size={16} /></span>
                </Link>
                <Link
                  href="/services"
                  className="btn btn-secondary btn-lg w-full sm:w-auto"
                >
                  All Capabilities
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
