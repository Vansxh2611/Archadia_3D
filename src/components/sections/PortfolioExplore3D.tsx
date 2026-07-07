import React, { useState } from 'react';

type ArchModel = {
  id: string;
  label: string;
  src: string;
  meta: string;
};

const archModels: ArchModel[] = [
  {
    id: "tower",
    label: "Skyline Tower",
    src: "/models/skyline-tower.glb",
    meta: "High-rise residential • Mumbai, India"
  },
  {
    id: "atrium",
    label: "Glass Atrium",
    src: "/models/glass-atrium.glb",
    meta: "Corporate lobby • Bengaluru, India"
  },
  {
    id: "lobby",
    label: "Minimal Lobby",
    src: "/models/minimal-lobby.glb",
    meta: "Boutique hotel lobby • Goa, India"
  },
  {
    id: "villas",
    label: "Terraced Villas",
    src: "/models/terraced-villas.glb",
    meta: "Stepped hillside community • Pune, India"
  },
  {
    id: "harbour",
    label: "Harbourfront Tower",
    src: "/models/harbourfront-tower.glb",
    meta: "Mixed-use waterfront tower • Kochi, India"
  },
  {
    id: "pavilion",
    label: "Parametric Pavilion",
    src: "/models/parametric-pavilion.glb",
    meta: "Sculptural cultural center • Delhi-NCR, India"
  }
];

export const PortfolioExplore3D: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModelId, setActiveModelId] = useState<ArchModel["id"]>("tower");
  const [hasError, setHasError] = useState(false);

  const activeModel = archModels.find(m => m.id === activeModelId) ?? archModels[0];

  return (
    <section className="portfolio-explore3d">
      <div className="container-luxury">
        <div className="portfolio-explore3d__header-text">
          <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
            Interactive
          </span>
          <h2 className="font-sora font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            Explore in <span className="gradient-gold">3D</span>
          </h2>
          <p className="font-inter text-[#B8B8B8] text-lg max-w-2xl mb-12 leading-relaxed">
            Interact with our architectural concepts in real time. Inspect façades, change angles, and experience spatial scale directly in your browser.
          </p>
        </div>

        {!isOpen ? (
          <button
            type="button"
            className="portfolio-explore3d__launch"
            onClick={() => setIsOpen(true)}
          >
            <div className="portfolio-explore3d__launch-content">
              <div className="portfolio-explore3d__launch-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="#050505" />
                </svg>
              </div>
              <div className="text-left">
                <div className="portfolio-explore3d__launch-title">
                  Launch Architectural Viewer
                </div>
                <div className="portfolio-explore3d__launch-sub">
                  Orbit, zoom, and explore every surface in detail.
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="portfolio-explore3d__card">
            <div className="portfolio-explore3d__header">
              <div className="portfolio-explore3d__model-tabs">
                {archModels.map(model => (
                  <button
                    key={model.id}
                    type="button"
                    className={
                      "pill-button pill-button--sm" +
                      (model.id === activeModelId ? " pill-button--active" : "")
                    }
                    onClick={() => {
                      setActiveModelId(model.id);
                      setHasError(false);
                    }}
                  >
                    {model.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="pill-button pill-button--sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close 3D viewer"
              >
                ✕ Close
              </button>
            </div>

            <div className="portfolio-explore3d__viewer-wrap">
              {hasError ? (
                <div className="portfolio-explore3d__error-fallback">
                  <p className="font-inter text-[#B8B8B8] text-sm">
                    3D viewer is not supported or failed to load in your browser. Please try on a modern desktop browser.
                  </p>
                </div>
              ) : (
                <model-viewer
                  src={activeModel.src}
                  alt={activeModel.label}
                  camera-controls
                  auto-rotate
                  interaction-prompt="auto"
                  exposure="1.1"
                  shadow-intensity="0.6"
                  style={{ width: "100%", height: "100%", background: "#0c0c0c" }}
                  onError={() => setHasError(true)}
                ></model-viewer>
              )}
            </div>

            <div className="portfolio-explore3d__hint flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>
                Drag to orbit • Scroll to zoom • Double-tap to focus
              </span>
              <span className="text-[#E6C383] font-semibold tracking-wider uppercase">
                {activeModel.meta}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
