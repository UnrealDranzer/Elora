"use client";
import { ContactShadows, Environment, Float, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import type { Group } from 'three';
import * as THREE from 'three';

const ToothModel = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 0.25;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    if (!reducedMotion) window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 0.5) * 0.08;
    const rotY = Math.sin(t * 0.3) * 0.1;

    group.current.position.y = floatY + 0.1;
    
    // Smooth damp rotation
    const targetX = reducedMotion ? 0.2 : 0.2 + pointer.current.y * 0.4;
    const targetY = rotY + (reducedMotion ? 0 : pointer.current.x * 0.5);
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
  });

  const enamel = useMemo(
    () => ({
      color: '#ffffff',
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      ior: 1.5,
      thickness: 1.5,
      envMapIntensity: 1.5,
    }),
    []
  );

  const dentin = useMemo(
    () => ({
      color: '#fdfaf5',
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 0.4,
      envMapIntensity: 1.0,
    }),
    []
  );

  return (
    <group ref={group} scale={1.1} rotation={[0.2, -0.2, 0]}>
      {/* Crown Main Body */}
      <RoundedBox args={[1.1, 0.9, 1.1]} radius={0.35} smoothness={32} position={[0, 0.4, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...enamel} />
      </RoundedBox>
      
      {/* Cusps (4 bumps on top) */}
      <mesh position={[0.28, 0.85, 0.28]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      <mesh position={[-0.28, 0.85, 0.28]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      <mesh position={[0.28, 0.82, -0.28]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      <mesh position={[-0.28, 0.82, -0.28]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>

      {/* Roots (2 main roots) */}
      <mesh position={[0.22, -0.4, 0]} rotation={[0, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.25, 0.7, 16, 32]} />
        <meshPhysicalMaterial {...dentin} />
      </mesh>
      <mesh position={[-0.22, -0.4, 0]} rotation={[0, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.25, 0.7, 16, 32]} />
        <meshPhysicalMaterial {...dentin} />
      </mesh>
    </group>
  );
};

const Scene = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <>
    <ambientLight intensity={0.65} />
    <directionalLight position={[5, 8, 6]} intensity={1.25} castShadow shadow-mapSize={512} />
    <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#e8efe4" />
    <pointLight position={[0, 1.5, 4]} intensity={0.5} color="#fff9f0" />
    <Environment preset="apartment" />
    <Float speed={reducedMotion ? 0.4 : 0.9} rotationIntensity={0.08} floatIntensity={0.2}>
      <ToothModel reducedMotion={reducedMotion} />
    </Float>
    <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={12} blur={2.4} far={2} />
  </>
);

type HeroToothSceneProps = {
  className?: string;
};

export const HeroToothScene = ({ className }: HeroToothSceneProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.innerWidth < 768;
    setIsMobile(coarse || narrow);
    setReducedMotion(reduce || coarse || narrow);
  }, []);

  const dpr: [number, number] = isMobile ? [1, 1.15] : [1, 1.6];

  return (
    <div className={className} aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[72%] w-[78%] rotate-[-4deg] rounded-[2rem] bg-gradient-to-br from-[#ebe6de] to-[#d9d2c8] shadow-soft" />
        <div className="absolute h-[min(55vw,320px)] w-[min(55vw,320px)] rounded-full border border-charcoal/5 opacity-40" />
        <div className="absolute h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(168,178,154,0.22),transparent_68%)]" />
      </div>
      <p className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
        Precision
      </p>
      <Canvas
        className="relative z-[1]"
        shadows={!isMobile}
        dpr={dpr}
        camera={{ position: [0, 0.15, 4.4], fov: 40 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

