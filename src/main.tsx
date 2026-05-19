import Lenis from 'lenis';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppRouter } from './routes/AppRouter';
import './index.css';

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
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
