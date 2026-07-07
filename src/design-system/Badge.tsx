import React from 'react';

type BadgeVariant = 'gold' | 'outline' | 'subtle' | 'dark';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-[rgba(148,117,60,0.12)] text-[#94753c] border border-[rgba(148,117,60,0.25)]',
  outline: 'bg-transparent text-[#94753c] border border-[rgba(148,117,60,0.4)]',
  subtle: 'bg-[rgba(0,0,0,0.04)] text-[#4b5563] border border-[rgba(0,0,0,0.08)]',
  dark: 'bg-[rgba(255,255,255,0.06)] text-white border border-[rgba(255,255,255,0.12)]',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[0.65rem] px-2.5 py-0.5 tracking-[0.18em]',
  md: 'text-[0.7rem] px-3 py-1 tracking-[0.2em]',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center font-inter font-semibold uppercase rounded-sm',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;
