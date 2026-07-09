"use client";
import { MagneticAnchor } from '@/components/dental/magnetic-anchor';
import { siteConfig } from '@/lib/site-config';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const BookingSection = () => (
  <section id="booking" className="py-24 sm:py-32">
    <div className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-6 py-16 text-ivory sm:px-12 lg:px-16"
      >
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              className="pill-btn-light flex w-full items-center justify-center border-ivory/25 bg-transparent text-ivory hover:bg-white/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

