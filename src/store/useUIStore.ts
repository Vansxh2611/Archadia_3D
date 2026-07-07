import { create } from 'zustand';

// ─── Toast ──────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

// ─── Store Shape ─────────────────────────────────────────────────────────────

interface UIState {
  // Mobile Navigation
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  // Portfolio Filter (pre-wired for future PortfolioFilter component)
  activeFilter: string;
  setFilter: (category: string) => void;

  // Lightbox (pre-wired for future PortfolioLightbox)
  lightboxOpen: boolean;
  lightboxImage: string | null;
  openLightbox: (imageSrc: string) => void;
  closeLightbox: () => void;

  // 3D Building Viewer (pre-wired for future BuildingViewer drawer)
  viewerOpen: boolean;
  viewerModelPath: string | null;
  openViewer: (modelPath: string) => void;
  closeViewer: () => void;

  // Toast Notifications
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useUIStore = create<UIState>((set) => ({
  // ── Mobile Menu ──────────────────────────────────────────────────────────
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  // ── Portfolio Filter ─────────────────────────────────────────────────────
  activeFilter: 'All',
  setFilter: (category) => set({ activeFilter: category }),

  // ── Lightbox ─────────────────────────────────────────────────────────────
  lightboxOpen: false,
  lightboxImage: null,
  openLightbox: (imageSrc) => set({ lightboxOpen: true, lightboxImage: imageSrc }),
  closeLightbox: () => set({ lightboxOpen: false, lightboxImage: null }),

  // ── 3D Viewer ────────────────────────────────────────────────────────────
  viewerOpen: false,
  viewerModelPath: null,
  openViewer: (modelPath) => set({ viewerOpen: true, viewerModelPath: modelPath }),
  closeViewer: () => set({ viewerOpen: false, viewerModelPath: null }),

  // ── Toast Notifications ──────────────────────────────────────────────────
  toasts: [],
  addToast: (message, variant = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
