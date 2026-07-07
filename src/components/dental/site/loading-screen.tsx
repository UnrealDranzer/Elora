"use client";
import { siteConfig } from '@/lib/site-config';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-display text-4xl tracking-[0.08em] text-charcoal">{siteConfig.name}</p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.42em] text-muted-foreground">{siteConfig.tagline}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

