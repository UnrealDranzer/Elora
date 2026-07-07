"use client";

import Lenis from 'lenis';
import { useEffect } from 'react';

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (!prefersReduced && !isCoarse) {
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.1
      });

      lenis.on('scroll', () => {
        // ScrollTrigger sync handled in sections via framer/GSAP refresh
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return <>{children}</>;
}
