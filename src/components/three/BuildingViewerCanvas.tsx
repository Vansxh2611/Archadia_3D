import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Html } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// Props definition
interface BuildingViewerCanvasProps {
  className?: string;
  modelPath?: string;
}

interface Hotspot {
  position: [number, number, number];
  title: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    position: [0.6, 1.2, 0.4],
    title: 'Sky Garden',
    description: 'Biophilic community terrace suspended on the 24th floor featuring sky lounge seating.',
  },
  {
    position: [-0.8, -0.6, 0.5],
    title: 'Grand Lobby',
    description: 'Double-height entrance clad in obsidian slate and golden architectural mesh.',
  },
  {
    position: [0.1, 0.3, -0.7],
    title: 'Penthouse Suites',
    description: 'Premium residences with 360-degree views, infinity decks, and smart control nodes.',
  },
];

// Simple Error Boundary to render abstract 3D architecture geometry if model fails to load
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('Model loading failed, rendering 3D fallback building detailed model:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Beautiful fallback detailed structural building model
const FallbackDetailedBuilding: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Tall central skyscraper block */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 3.2, 1.4]} />
        <meshStandardMaterial
          color="#E6C383"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Stacked architectural plates / slabs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, -1.3 + i * 0.55, 0]}>
          <boxGeometry args={[1.7, 0.05, 1.7]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}

      {/* Side structured block */}
      <mesh position={[0.9, -0.6, -0.3]}>
        <boxGeometry args={[0.6, 2.0, 0.6]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Front cantilever slab */}
      <mesh position={[-0.4, 0.6, 0.8]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#E6C383" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Main 3D Model Building detailed component
const DetailedBuilding: React.FC<{ modelPath: string; shouldReduce: boolean }> = ({
  modelPath,
  shouldReduce,
}) => {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);

  // Set up materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.18;
          child.material.metalness = 0.82;
          if (child.name.toLowerCase().includes('glass')) {
            child.material.transparent = true;
            child.material.opacity = 0.5;
            child.material.roughness = 0.02;
          }
          if (child.name.toLowerCase().includes('gold') || child.name.toLowerCase().includes('highlight')) {
            child.material.color.set('#E6C383');
          }
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    // If not reduced motion, slowly rotate the building very subtly
    if (!shouldReduce && meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={1.0} />;
};

// Interactive Hotspot marker component
const HotspotMarker: React.FC<{ hotspot: Hotspot }> = ({ hotspot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Click outside listener to close hotspot tooltip
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <Html position={hotspot.position} center>
      <div className="relative" ref={cardRef}>
        {/* Clickable indicator dot */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-5.5 h-5.5 rounded-full bg-black/70 border border-[#E6C383] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-[0_0_12px_rgba(230,195,131,0.45)] group z-20"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#E6C383] group-hover:scale-125 transition-transform" />
          <div className="absolute w-5.5 h-5.5 rounded-full border border-[#E6C383]/45 animate-ping pointer-events-none" />
        </button>

        {/* Info card popup overlay */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0E0E0E]/95 border border-[#E6C383]/30 p-4 rounded-xl min-w-[220px] max-w-[260px] backdrop-blur-md text-left z-30 shadow-2xl transition-all duration-300">
            <h4 className="font-sora font-semibold text-[10.5px] text-[#E6C383] tracking-[0.1em] mb-1.5 uppercase">
              {hotspot.title}
            </h4>
            <p className="font-inter text-[9.5px] text-[#B8B8B8] leading-relaxed">
              {hotspot.description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
};

// Loading Spinner overlay
const LoadingSpinner: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-4 border border-black/10 rounded-xl min-w-[150px]">
        <div className="w-5 h-5 rounded-full border border-dashed border-gold animate-spin" />
        <span className="font-mono text-[9px] text-text-secondary tracking-widest uppercase">Loading 3D...</span>
      </div>
    </Html>
  );
};

export const BuildingViewerCanvas: React.FC<BuildingViewerCanvasProps> = ({
  className = '',
  modelPath = '/models/building-detailed.glb',
}) => {
  const shouldReduce = useReducedMotion();

  return (
    <div className={`relative select-none outline-none ${className}`}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [3, 2, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting Rig */}
          <ambientLight intensity={0.35} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={1.8}
            color="#FFF6E6"
            castShadow
          />

          <directionalLight
            position={[-5, 4, -4]}
            intensity={1.1}
            color="#DCE9F5"
          />

          <Center>
            <ModelErrorBoundary fallback={<FallbackDetailedBuilding />}>
              <DetailedBuilding
                modelPath={modelPath}
                shouldReduce={!!shouldReduce}
              />
            </ModelErrorBoundary>
          </Center>

          {/* Interactive Info Hotspots */}
          {HOTSPOTS.map((hotspot, idx) => (
            <HotspotMarker key={idx} hotspot={hotspot} />
          ))}

          {/* Orbit Controls (smooth damping, limited zoom and angles) */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6} // Avoid looking directly from bottom
            maxPolarAngle={Math.PI / 1.9} // Avoid looking directly from top
            enableZoom={true}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BuildingViewerCanvas;
