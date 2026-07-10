import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, ContactShadows, Html } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// Props definition
interface FloatingModelCanvasProps {
  className?: string;
  modelPath?: string;
}

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
    console.warn('Model loading failed, rendering 3D fallback building model:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Beautiful fallback abstract building model (Technical geometric structural boxes)
const FallbackBuildingModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.1;
      groupRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central tower structure (nested cubes representing architectural blocks) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.5, 1.2]} />
        <meshStandardMaterial
          color="#E6C383"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Side wings */}
      <mesh position={[-1.0, -0.4, 0]}>
        <boxGeometry args={[0.8, 1.6, 0.8]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[1.0, -0.6, 0.2]}>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Decorative vertical blueprint grids */}
      <mesh position={[0, -1.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color="#E6C383" wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Main 3D Model Sculpture component
const BuildingModel: React.FC<{ modelPath: string; isHovered: boolean; isDesktop: boolean; shouldReduce: boolean }> = ({
  modelPath,
  isHovered,
  isDesktop,
  shouldReduce,
}) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);

  // Set up materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.2;
          child.material.metalness = 0.8;
          if (child.name.toLowerCase().includes('gold') || child.name.toLowerCase().includes('glass')) {
            child.material.color.set('#E6C383');
            child.material.roughness = 0.05;
            child.material.metalness = 0.95;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (shouldReduce) return;

    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // 1. Organic float (bobbing)
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.12;

      // 2. Slow base rotation
      const rotationSpeed = isHovered ? 0.2 : 0.08;
      targetRotationY.current += delta * rotationSpeed;

      // 3. Mouse pointer tilt tracking
      if (isDesktop) {
        const mouseX = state.pointer.x * 0.3;
        const mouseY = state.pointer.y * 0.2;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.08);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY.current + mouseX, 0.08);
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY.current, 0.08);
      }
    }
  });

  return <primitive ref={groupRef} object={scene} scale={0.9} />;
};

// Loading Spinner overlay
const LoadingSpinner: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-3 border border-black/10 rounded-xl min-w-[140px]">
        <div className="w-5 h-5 rounded-full border border-dashed border-gold animate-spin" />
        <span className="font-mono text-[9px] text-text-secondary tracking-widest uppercase">Loading 3D...</span>
      </div>
    </Html>
  );
};

export const FloatingModelCanvas: React.FC<FloatingModelCanvasProps> = ({
  className = '',
  modelPath = '/models/floating-building.glb',
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
        camera={{ position: [0, 0.8, 4.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting Rig */}
          <ambientLight intensity={0.4} />

          {/* Main Key overhead */}
          <directionalLight
            position={[2, 6, 3]}
            intensity={1.5}
            color="#ffffff"
            castShadow
          />

          {/* Gold Rim light */}
          <directionalLight
            position={[-4, 1, -4]}
            intensity={1.7}
            color="#E6C383"
          />

          {/* Sub Fill */}
          <directionalLight
            position={[0, -2, 2]}
            intensity={0.6}
            color="#BACEDD"
          />

          <Center>
            <ModelErrorBoundary fallback={<FallbackBuildingModel />}>
              <BuildingModel
                modelPath={modelPath}
                isHovered={isHovered}
                isDesktop={isDesktop}
                shouldReduce={!!shouldReduce}
              />
            </ModelErrorBoundary>
          </Center>

          {/* Ground Soft Shadows */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.65}
            scale={12}
            blur={2.4}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingModelCanvas;
