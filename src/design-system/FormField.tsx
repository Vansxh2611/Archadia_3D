import React, { useId } from 'react';
import type { FieldError } from 'react-hook-form';

type FieldType = 'input' | 'textarea' | 'select';

interface FormFieldProps {
  /** Field label text (shown above the input) */
  label: string;
  /** Whether this field is required (appends * to label) */
  required?: boolean;
  /** RHF FieldError object — shows inline error below field */
  error?: FieldError;
  /** Input type (for input fields) */
  type?: React.HTMLInputTypeAttribute;
  /** Controlled or uncontrolled field registration props from RHF */
  registration?: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    React.SelectHTMLAttributes<HTMLSelectElement>;
  /** textarea or select */
  as?: FieldType;
  /** Placeholder text */
  placeholder?: string;
  /** Number of rows for textarea */
  rows?: number;
  /** Select options — only used when as="select" */
  options?: { label: string; value: string }[];
  className?: string;
}

const baseInputClasses = [
  'w-full bg-white border border-[rgba(0,0,0,0.1)] text-[#000000]',
  'px-4 py-3.5 text-[0.9rem] rounded-md font-inter',
  'transition-all duration-200 ease-out',
  'placeholder:text-[rgba(0,0,0,0.35)]',
  'focus:outline-none focus:border-[#94753c] focus:ring-1 focus:ring-[rgba(148,117,60,0.25)]',
].join(' ');

const errorInputClasses = 'border-red-500 ring-1 ring-[rgba(239,68,68,0.2)]';

/**
 * FormField — Reusable accessible field wrapper for React Hook Form.
 * Handles label, input/textarea/select rendering, and inline error display.
 * Pass `registration` from RHF's register() directly.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  type = 'text',
  registration,
  as = 'input',
  placeholder,
  rows = 5,
  options = [],
  className = '',
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  const sharedProps = {
    id,
    placeholder,
    'aria-describedby': error ? errorId : undefined,
    'aria-invalid': !!error,
    ...registration,
    className: [baseInputClasses, error ? errorInputClasses : '', className]
      .filter(Boolean)
      .join(' '),
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="font-inter text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[#4b5563]"
      >
        {label}
        {required && (
          <span className="text-[#94753c] ml-0.5" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>

      {/* Field */}
      {as === 'textarea' ? (
        <textarea rows={rows} {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === 'select' ? (
        <select {...(sharedProps as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...(sharedProps as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {/* Inline error */}
      {error && (
        <p id={errorId} role="alert" className="text-red-500 text-[0.72rem] font-inter mt-0.5">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
