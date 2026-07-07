import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'aside' | 'main';
};

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className,
  delay = 0,
  id,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Resolve dynamic Framer Motion tag
  const MotionComponent = motion[as] as any;

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionComponent
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </MotionComponent>
  );
};
