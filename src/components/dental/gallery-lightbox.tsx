"use client";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type GalleryImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

export const GalleryLightbox = ({ images, initialIndex, onClose }: LightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const current = images[index];
  const total = images.length;

  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Focus trap + keyboard
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] m-0 h-full w-full max-h-full max-w-full border-none bg-transparent p-0 backdrop:bg-transparent"
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
      aria-label="Image gallery lightbox"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur transition hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-7 left-6 z-10 text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
          {index + 1} / {total}
        </div>

        {/* Navigation arrows */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 sm:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 sm:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[70vh] w-[90vw] max-w-4xl sm:h-[80vh]"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/40 tracking-wider">
          {current.alt}
        </p>
      </motion.div>
    </dialog>
  );
};
