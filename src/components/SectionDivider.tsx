import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SectionDivider: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex justify-center w-full relative z-10" aria-hidden="true">
      <motion.div
        initial={{ width: 0 }}
        animate={isVisible ? { width: '100%', maxWidth: '240px' } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="section-divider"
      />
    </div>
  );
};
