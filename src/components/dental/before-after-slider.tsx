"use client";
import { cn } from '@/lib/utils';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import beforeImg from '../../../public/before-after/before.jpg';
import afterImg from '../../../public/before-after/after.jpg';

type BeforeAfterSliderProps = {
  className?: string;
};

export const BeforeAfterSlider = ({ className }: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(54);
  const dragging = useRef(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-[3/2] w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-card shadow-float touch-none select-none group',
        className
      )}
      onPointerMove={(e) => dragging.current && updatePosition(e.clientX)}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      {/* Before Image */}
      <div
        className="absolute inset-0"
        aria-label="Before treatment"
      >
        <Image 
          src={beforeImg} 
          alt="Before dental treatment"
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, 576px"
          onLoad={() => setBeforeLoaded(true)}
          style={{ objectPosition: 'center 42%' }}
          className={cn(
            "h-full w-full object-cover transition-all duration-[2s] group-hover:scale-105 ease-out",
            beforeLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-label="After treatment"
      >
         <Image 
          src={afterImg} 
          alt="After dental treatment"
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, 576px"
          onLoad={() => setAfterLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-[2s] group-hover:scale-105 ease-out",
            afterLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-between bg-gradient-to-t from-black/50 to-transparent p-8 text-[0.7rem] uppercase tracking-[0.35em] text-white">
        <span className="drop-shadow-md">Before</span>
        <span className="drop-shadow-md">After</span>
      </div>

      <button
        type="button"
        className="absolute inset-y-0 z-30 w-14 -translate-x-1/2 cursor-ew-resize focus:outline-none"
        style={{ left: `${position}%` }}
        onPointerDown={() => {
          dragging.current = true;
        }}
        aria-label="Drag to compare"
      >
        {/* Premium Handle */}
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-300 hover:scale-110">
          <span className="flex gap-1.5">
            <span className="h-4 w-0.5 rounded-full bg-white" />
            <span className="h-4 w-0.5 rounded-full bg-white" />
          </span>
        </span>
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
      </button>
    </div>
  );
};
