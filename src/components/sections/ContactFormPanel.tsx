import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { FormField } from '../../design-system/FormField';
import { serviceTypes, hearAboutOptions } from '../../data/contactContent';
import { useUIStore } from '../../store/useUIStore';

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-().]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),
  company: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  projectDetails: z
    .string()
    .min(1, 'Please describe your project')
    .min(20, 'Please provide at least 20 characters of detail'),
  hearAbout: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Service / Hear-About Options ────────────────────────────────────────────

const serviceOptions = serviceTypes.map((s) => ({ label: s, value: s }));
const hearAboutSelectOptions = hearAboutOptions.map((o) => ({ label: o, value: o }));

// ─── Success State ────────────────────────────────────────────────────────────

const SuccessMessage: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center gap-5 py-12 text-center"
  >
    <div className="w-16 h-16 rounded-full bg-[rgba(148,117,60,0.1)] border border-[rgba(148,117,60,0.25)] flex items-center justify-center">
      <CheckCircle size={32} className="text-[#94753c]" />
    </div>
    <div>
      <h4 className="font-sora font-semibold text-lg text-[#000000] mb-2">
        Inquiry Sent Successfully
      </h4>
      <p className="font-inter text-sm text-[#4b5563] leading-relaxed max-w-xs mx-auto">
        Our studio team will get back to you within one business day.
      </p>
    </div>
    <button
      type="button"
      onClick={onReset}
      className="font-inter text-xs uppercase tracking-[0.15em] text-[#94753c] underline underline-offset-4 hover:text-[#7d612e] transition-colors"
    >
      Send another inquiry
    </button>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactFormPanel: React.FC = () => {
  const addToast = useUIStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      serviceType: '',
      projectDetails: '',
      hearAbout: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call — replace with your actual endpoint
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional error for demo. Remove in production.
          if (data.email.includes('test@error')) {
            reject(new Error('Simulated server error'));
          } else {
            resolve();
          }
        }, 1500);
      });

      console.log('Contact inquiry submitted:', data);
      addToast('Inquiry sent! We\'ll reply within 24 hours.', 'success');
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
      throw new Error('Submission failed'); // Re-throw so RHF marks as failed, not successful
    }
  };

  const handleReset = () => reset();

  // ── Render success state
  if (isSubmitSuccessful) {
    return (
      <div className="contact-card">
        <SuccessMessage onReset={handleReset} />
      </div>
    );
  }

  // ── Render form
  return (
    <div className="contact-card">
      <h3 className="contact-form__title">Send an Inquiry</h3>
      <p className="contact-form__subtitle">
        Tell us about your vision and we'll respond within one business day.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="contact-form__fields"
        noValidate
        aria-label="Contact inquiry form"
      >
        {/* Row 1: Name + Email */}
        <div className="contact-form__row contact-form__row--two-col">
          <FormField
            label="Full Name"
            required
            error={errors.fullName}
            placeholder="e.g. Aarav Mehta"
            registration={register('fullName')}
          />
          <FormField
            label="Email"
            required
            type="email"
            error={errors.email}
            placeholder="e.g. john@example.com"
            registration={register('email')}
          />
        </div>

        {/* Row 2: Phone + Company */}
        <div className="contact-form__row contact-form__row--two-col">
          <FormField
            label="Phone"
            type="tel"
            error={errors.phone}
            placeholder="+91 98765 43210"
            registration={register('phone')}
          />
          <FormField
            label="Company"
            error={errors.company}
            placeholder="Your organization"
            registration={register('company')}
          />
        </div>

        {/* Row 3: Service Type + How did you hear */}
        <div className="contact-form__row contact-form__row--two-col">
          <FormField
            label="Service Type"
            required
            as="select"
            error={errors.serviceType}
            options={serviceOptions}
            placeholder="Select Service Type"
            registration={register('serviceType')}
          />
          <FormField
            label="How did you hear about us?"
            as="select"
            error={errors.hearAbout}
            options={hearAboutSelectOptions}
            registration={register('hearAbout')}
          />
        </div>

        {/* Row 4: Project Details */}
        <FormField
          label="Project Details"
          required
          as="textarea"
          rows={6}
          error={errors.projectDetails}
          placeholder="Tell us about the project vision, dimensions, constraints, and timeline requirements..."
          registration={register('projectDetails')}
        />

        {/* Submit */}
        <div className="contact-form__submit-wrapper">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-md w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label={isSubmitting ? 'Submitting inquiry…' : 'Submit inquiry'}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                <span>Submitting…</span>
              </>
            ) : (
              <>
                Submit Inquiry
                <span className="btn__icon-right">
                  <Send size={14} />
                </span>
              </>
            )}
          </button>
        </div>

        {/* Inline server error fallback (shown if onSubmit throws) */}
        {errors.root && (
          <div
            role="alert"
            className="flex items-center gap-2 text-red-500 text-sm font-inter mt-2"
          >
            <AlertCircle size={14} />
            <span>{errors.root.message ?? 'Submission failed. Please try again.'}</span>
          </div>
        )}
      </form>
    </div>
  );
};
