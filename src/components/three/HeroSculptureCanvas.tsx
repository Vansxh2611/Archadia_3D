import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Html } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// Props definition
interface HeroSculptureCanvasProps {
  className?: string;
  modelPath?: string;
}

// Simple Error Boundary to render abstract 3D geometry if model fails to load
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
    console.warn('Model loading failed, rendering 3D fallback sculpture:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Beautiful fallback abstract sculpture (Technical / Architectural wireframe)
const FallbackSculpture: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.2;
      coreRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Dodecahedron Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#E6C383"
          wireframe
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Architectural Outer Frame */}
      <mesh>
        <octahedronGeometry args={[2.0, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Axis Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 64]} />
        <meshBasicMaterial color="#E6C383" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.01, 8, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Main 3D Model Sculpture component
const SculptureModel: React.FC<{ modelPath: string; isHovered: boolean; isDesktop: boolean; shouldReduce: boolean }> = ({
  modelPath,
  isHovered,
  isDesktop,
  shouldReduce,
}) => {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);

  // Set up textures/materials to match the dark luxury gold theme
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Apply luxury materials
        if (child.material) {
          child.material.roughness = 0.15;
          child.material.metalness = 0.85;
          if (child.name.toLowerCase().includes('gold') || child.name.toLowerCase().includes('accent')) {
            child.material.color.set('#E6C383');
          }
        }
      }
    });
  }, [scene]);

  const targetScale = isHovered && !shouldReduce ? 1.03 : 1.0;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Lerp scale for hover effect
      const currentScale = meshRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.set(nextScale, nextScale, nextScale);

      if (shouldReduce) return;

      const t = state.clock.getElapsedTime();

      // 1. Slow idle float (bobbing)
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.06;

      // 2. Slow base rotation
      const baseRotationSpeed = isHovered ? 0.28 : 0.14;
      targetRotationY.current += delta * baseRotationSpeed;

      // 3. Mouse position tilt on desktop
      if (isDesktop) {
        const mouseX = state.pointer.x * 0.25;
        const mouseY = state.pointer.y * 0.15;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY.current + mouseX, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY.current, 0.1);
      }
    }
  });

  return <primitive ref={meshRef} object={scene} />;
};

// Loading Indicator
const LoadingSpinner: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3.5 border border-black/10 rounded-xl min-w-[160px]">
        <div className="w-5 h-5 rounded-full border border-dashed border-gold animate-spin" />
        <span className="font-mono text-[9px] text-text-secondary tracking-widest uppercase">Loading 3D...</span>
      </div>
    </Html>
  );
};

export const HeroSculptureCanvas: React.FC<HeroSculptureCanvasProps> = ({
  className = '',
  modelPath = '/models/hero-sculpture.glb',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDesktop = () => {
      const isLg = window.innerWidth >= 1024;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(isLg && !hasTouch);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div
      className={`relative select-none outline-none ${className}`}
      onPointerOver={() => isDesktop && setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.8, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Subtle Ambient base */}
          <ambientLight intensity={0.5} />
          
          {/* Key Spotlight (warm gold) */}
          <directionalLight
            position={[4, 5, 2]}
            intensity={1.8}
            color="#FFF4DE"
            castShadow
          />

          {/* Cooler Rim light (architectural cyan/white) */}
          <directionalLight
            position={[-4, 2, -3]}
            intensity={1.2}
            color="#E2F0FD"
          />

          {/* Accent bottom-up amber wash */}
          <pointLight
            position={[0, -2.5, 1]}
            intensity={0.8}
            color="#E6C383"
          />

          <Center>
            <ModelErrorBoundary fallback={<FallbackSculpture />}>
              <SculptureModel
                modelPath={modelPath}
                isHovered={isHovered}
                isDesktop={isDesktop}
                shouldReduce={!!shouldReduce}
              />
            </ModelErrorBoundary>
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroSculptureCanvas;
