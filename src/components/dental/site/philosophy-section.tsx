import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const PhilosophySection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -20]);

  return (
    <section id="philosophy" ref={ref} className="py-28 sm:py-40">
      <div className="section-shell grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <motion.div style={{ y: y1 }} className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-float">
            <img
              src="/dr-siddharth.png"
              alt="Lead clinician Dr. Siddharth Vedpath at Dantved Clinic"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[3s] hover:scale-105"
              loading="lazy"
            />
            <div className="absolute right-6 top-6 rounded-full border border-white/50 bg-white/80 px-6 py-2.5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-md">
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">Founder</p>
              <p className="font-display text-xl">Dr. Siddharth</p>
            </div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-16 -left-8 z-20 w-[65%] overflow-hidden rounded-[2rem] border-[6px] border-[#F6F3EE] shadow-[0_30px_60px_rgba(26,26,26,0.15)] sm:-left-12"
          >
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80"
              alt="Serene clinic interior"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[3s] hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-16"
        >
          <SectionLabel index="03" title="Our Philosophy" />
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] tracking-tight">
            Dentistry as a <em className="font-light italic text-charcoal/90">slow craft</em>, not a clinical transaction.
          </h2>
          <p className="mt-8 text-lg leading-[1.8] text-muted-foreground sm:text-xl">
            Dantved began as a quiet rebellion against the cold dental waiting room — fluorescent lighting, brisk hands,
            and a transactional pace. We rebuilt the experience from scratch around softness, slowness, and absolute craft.
          </p>
          <blockquote className="mt-12 border-l-[3px] border-sage/60 pl-8">
            <p className="font-display text-[1.65rem] italic leading-[1.4] text-charcoal/90 sm:text-3xl">
              "We hand-sculpt every restoration the way a fine jeweler would — because your smile is a heirloom you wear every single day."
            </p>
            <footer className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground/80">
              — Dr. Siddharth Vedpath, BDS, MDS (Prosthodontics)
            </footer>
          </blockquote>
          <div className="mt-16 grid grid-cols-2 gap-10 border-t border-charcoal/10 pt-10">
            <div>
              <p className="font-display text-5xl sm:text-6xl text-charcoal">98%</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Patients return</p>
            </div>
            <div>
              <p className="font-display text-5xl sm:text-6xl text-charcoal">Top 1%</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">In the metro region</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
