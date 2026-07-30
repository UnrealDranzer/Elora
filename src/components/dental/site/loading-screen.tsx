"use client";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logoImg from '../../../../public/logo-dantved.png';

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
            Single unified splash — identical on all devices (mobile, tablet, desktop).
            Logo image is the primary brand element; text beneath reinforces the name.
            Fixed pixel dimensions prevent layout shift before the image paints.
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            {/* Logo — larger on all breakpoints */}
            <div className="relative w-[300px] h-[94px] sm:w-[400px] sm:h-[125px] lg:w-[480px] lg:h-[150px]">
              <Image
                src={logoImg}
                alt="DANTVED CLINIC"
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 480px"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Clinic name — visible immediately, same as old splash treatment */}
            <div className="text-center">
              <p className="font-display text-3xl tracking-[0.08em] text-charcoal sm:text-4xl">DANTVED</p>
              <p className="text-[0.6rem] uppercase tracking-[0.42em] text-muted-foreground">CLINIC</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
