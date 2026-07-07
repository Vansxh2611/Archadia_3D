import React from 'react';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Tag — Clickable filter pill with active/inactive state.
 * Used in portfolio filter bars, service category selectors, etc.
 */
export const Tag: React.FC<TagProps> = ({
  children,
  active = false,
  onClick,
  className = '',
}) => {
  const base =
    'inline-flex items-center gap-1.5 font-inter font-medium text-[0.7rem] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer select-none';

  const activeClasses =
    'bg-[#94753c] text-white border-[#94753c] shadow-[0_0_16px_rgba(148,117,60,0.25)]';

  const inactiveClasses =
    'bg-transparent text-[#4b5563] border-[rgba(0,0,0,0.12)] hover:border-[rgba(148,117,60,0.4)] hover:text-[#94753c]';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={[base, active ? activeClasses : inactiveClasses, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};

export default Tag;
