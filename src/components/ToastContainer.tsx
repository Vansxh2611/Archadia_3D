'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';
import type { ToastVariant } from '../store/useUIStore';

const variantConfig: Record<
  ToastVariant,
  { icon: React.ReactNode; bg: string; border: string; text: string }
> = {
  success: {
    icon: <CheckCircle size={16} />,
    bg: 'bg-[rgba(148,117,60,0.08)]',
    border: 'border-[rgba(148,117,60,0.3)]',
    text: 'text-[#94753c]',
  },
  error: {
    icon: <AlertCircle size={16} />,
    bg: 'bg-[rgba(239,68,68,0.06)]',
    border: 'border-[rgba(239,68,68,0.25)]',
    text: 'text-red-500',
  },
  info: {
    icon: <Info size={16} />,
    bg: 'bg-[rgba(0,0,0,0.04)]',
    border: 'border-[rgba(0,0,0,0.1)]',
    text: 'text-[#4b5563]',
  },
};

/**
 * ToastContainer — renders Zustand toasts at bottom-right of screen.
 * Mount once in App.tsx.
 */
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = variantConfig[toast.variant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              className={[
                'pointer-events-auto flex items-start gap-3 px-4 py-3.5',
                'rounded-xl border backdrop-blur-xl shadow-lg',
                'max-w-[320px] font-inter text-sm',
                config.bg,
                config.border,
                config.text,
              ].join(' ')}
            >
              <span className="mt-0.5 shrink-0" aria-hidden="true">
                {config.icon}
              </span>
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
