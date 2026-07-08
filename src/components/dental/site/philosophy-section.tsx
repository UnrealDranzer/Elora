"use client";
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import drSiddharthImg from '../../../../public/dr-siddharth.png';

export const PhilosophySection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="philosophy" ref={ref} className="py-28 sm:py-40">
      <div className="section-shell grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <motion.div style={{ y: y1 }} className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-float aspect-[4/5] w-full">
            <Image
              src={drSiddharthImg}
              alt="Dr. Siddharth Vaish — Prosthodontist & Implantologist at Dantved Clinic"
              className="object-cover transition-transform duration-[3s] hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
            />
            <div className="absolute right-6 top-6 rounded-full border border-white/50 bg-white/80 px-6 py-2.5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-md z-20">
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">Founder</p>
              <p className="font-display text-xl">Dr. Siddharth Vaish</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-8"
        >
          <SectionLabel index="05" title="Meet Our Specialist" />
          
          <p className="mt-8 text-lg leading-[1.8] text-muted-foreground sm:text-xl">
            At Dantved, dentistry is not rushed. It is thoughtful, precise and deeply patient-centric. Built on years of learning, clinical experience and a belief that every smile deserves honesty and care.
          </p>

          <div className="mt-10">
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">Dr. Siddharth Vaish</h2>
            <p className="mt-2 text-lg font-medium text-sage sm:text-xl">Prosthodontist & Implantologist</p>
            <div className="mt-6 h-px w-16 bg-sage/40"></div>
          </div>

          <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
            Focused on restoring function and aesthetics through advanced prosthodontic and implant treatments with precision, longevity and patient-centric care.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-charcoal/10 pt-10">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">B.D.S.</p>
                <p className="mt-1 text-xs text-muted-foreground">Babu Banarasi Das University, Lucknow</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">M.D.S. Prosthodontics</p>
                <p className="mt-1 text-xs text-muted-foreground">Bareilly International University</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Ex-Mentor</p>
                <p className="mt-1 text-xs text-muted-foreground">Kosmo Dental Academy, Hyderabad</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Ex-Consultant</p>
                <p className="mt-1 text-xs text-muted-foreground">Sree Implant Maxillofacial & Dental Hospital, Hyderabad</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
