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
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-ivory/60">Private consultation</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
              Begin your smile composition.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/75">
              Reserve through our concierge desk or message us on WhatsApp. Same-week visits for new patients across
              Bengaluru.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <MagneticAnchor className="w-full">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="pill-btn-dark flex w-full items-center justify-center bg-ivory text-charcoal hover:bg-ivory/90"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticAnchor>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
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
