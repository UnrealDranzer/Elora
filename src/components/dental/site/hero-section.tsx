import { MagneticAnchor } from '@/components/dental/magnetic-anchor';
import { siteConfig } from '@/lib/site-config';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const stats = [
  { value: '4.9', label: 'Google rating' },
  { value: '18+', label: 'Years craft' },
  { value: '9k+', label: 'Smiles composed' }
];

export const HeroSection = () => (
  <section className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 dot-grid lg:pt-32">
    <div className="section-shell grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-32 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 space-y-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground backdrop-blur-md shadow-sm">
          <span aria-hidden>✨</span> Premium Dental Studio
        </span>

        <h1 className="editorial-heading max-w-2xl leading-[1.05]">
          Where smiles meet <em className="font-light italic text-charcoal/90">artistry.</em>
        </h1>

        <p className="max-w-lg text-lg leading-[1.8] text-muted-foreground sm:text-[1.15rem]">
          A serene, spa-like dental studio where master clinicians sculpt painless, lifelong smiles using
          next-generation 3D imaging and artisanal restorative craft.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <MagneticAnchor>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="pill-btn-dark group w-full sm:w-auto overflow-hidden relative shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </a>
          </MagneticAnchor>
          <a href="#services" className="pill-btn-light w-full sm:w-auto transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
            Explore Treatments
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-8 border-t border-charcoal/10 pt-10">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-sage text-sage drop-shadow-sm" />
            ))}
          </div>
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[1.75rem] text-charcoal">{stat.value}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative flex items-center justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[560px] lg:h-[560px]"
          data-testid="hero-3d-tooth"
        >
          <div className="tooth-halo"></div>
          <div className="absolute inset-0 rounded-full border border-border animate-spin-slow opacity-50"></div>
          <div className="absolute inset-6 rounded-full border border-dashed border-sage/30 animate-spin-slow opacity-60" style={{ animationDirection: 'reverse' }}></div>
          <img
            alt="3D crystalline tooth"
            className="tooth-img absolute inset-0 w-full h-full object-contain animate-float z-20"
            loading="eager"
            src="https://static.prod-images.emergentagent.com/jobs/36c9215e-a4b6-41d8-bff4-303e6e84e5cc/images/3fb0c93a7aa84b46db864593123c73d242f94e9d2913910d55e6cdc63282e6c2.png"
          />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 -left-2 sm:-left-8 bg-ivory/90 backdrop-blur border border-border rounded-2xl px-4 py-3 shadow-sm z-10"
          >
            <p className="text-[10px] uppercase tracking-widest text-sage font-semibold">Precision</p>
            <p className="text-sm font-medium text-charcoal">0.02mm CAD/CAM</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 -right-2 sm:-right-6 bg-charcoal text-ivory rounded-2xl px-4 py-3 shadow-md z-10"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#D4C3B3] font-semibold">Comfort</p>
            <p className="text-sm font-medium">Painless protocol</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
