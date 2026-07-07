import React from 'react';

type CardVariant = 'light' | 'dark' | 'glass';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  as?: React.ElementType;
}

const variantClasses: Record<CardVariant, string> = {
  light:
    'bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_10px_40px_rgba(0,0,0,0.04)]',
  dark:
    'bg-[rgba(10,10,10,0.6)] border border-[rgba(255,255,255,0.08)] shadow-[0_10px_40px_rgba(0,0,0,0.4)]',
  glass:
    'bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-[rgba(0,0,0,0.06)] shadow-[0_20px_50px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)]',
};

const hoverClasses: Record<CardVariant, string> = {
  light:
    'hover:-translate-y-2 hover:border-[rgba(148,117,60,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]',
  dark:
    'hover:-translate-y-2 hover:border-[rgba(148,117,60,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
  glass:
    'hover:-translate-y-2 hover:border-[rgba(148,117,60,0.25)] hover:bg-[rgba(255,255,255,0.95)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]',
};

/**
 * Card — Base card container with light/dark/glass variants and optional hover lift.
 * Use this instead of inline bg/border/shadow classes on card-like containers.
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'light',
  hover = false,
  className = '',
  as: Component = 'div',
}) => {
  const classes = [
    'rounded-2xl p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    variantClasses[variant],
    hover ? hoverClasses[variant] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return React.createElement(Component as string, { className: classes }, children);
};

export default Card;
