"use client";
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

/* ─── Renderer Abstraction (future-ready for Three.js swap) ─── */
type ShowcaseRendererProps = {
  modelType: 'image' | 'three';
  src: string;
  alt: string;
  rotateY: number;
  scale: number;
  glowIntensity: number;
  loaded: boolean;
  onLoad: () => void;
};

const ShowcaseRenderer = ({
  modelType,
  src,
  alt,
  rotateY,
  scale,
  glowIntensity,
  loaded,
  onLoad,
}: ShowcaseRendererProps) => {
  if (modelType === 'three') {
    // Future: render <Canvas> with Three.js model here
    return null;
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute rounded-full blur-[100px] transition-all duration-[2s]"
        style={{
          width: '70%',
          height: '70%',
          background: `radial-gradient(circle, rgba(183,165,139,${0.12 * glowIntensity}) 0%, rgba(139,152,127,${0.06 * glowIntensity}) 50%, transparent 80%)`,
        }}
      />
      {/* Tooth image with transforms */}
      <div
        className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] transition-transform duration-[1.5s] ease-out"
        style={{
          transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
          onLoad={onLoad}
          className={cn(
            "object-contain animate-float transition-opacity duration-700 ease-out drop-shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
            loaded ? "opacity-100" : "opacity-0"
          )}
          priority
        />
      </div>
    </div>
  );
};

/* ─── Storytelling Phases ─── */
const phases = [
  {
    tag: 'Precision',
    text: 'Sub-micron digital scanning captures every contour of your smile with absolute accuracy.',
  },
  {
    tag: 'Planning',
    text: 'AI-assisted diagnostics and 3D smile design let you preview your transformation before it begins.',
  },
  {
    tag: 'Beautiful Results',
    text: 'Artisanal craftsmanship meets science — creating smiles that look effortlessly natural.',
  },
];

/* ─── Main Component ─── */
export const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  // Pause animations when tab is inactive
  useEffect(() => {
    const handleVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotateY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [8, 0, -6]);
  const toothScale = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.92, 1, 0.96]);
  const glowIntensity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.5, 1.2, 0.8]);
  const toothY = useTransform(scrollYProgress, [0.6, 1], [0, -60]);

  // Phase progress for storytelling text
  const phase0Opacity = useTransform(scrollYProgress, [0.08, 0.18, 0.28, 0.35], [0, 1, 1, 0]);
  const phase1Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.48, 0.55], [0, 1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.48, 0.58, 0.72, 0.82], [0, 1, 1, 0.6]);

  const phaseOpacities = [phase0Opacity, phase1Opacity, phase2Opacity];

  // Use static values if reduced motion
  const finalRotateY = prefersReducedMotion ? 0 : rotateY;
  const finalScale = prefersReducedMotion ? 1 : toothScale;
  const finalGlow = prefersReducedMotion ? 1 : glowIntensity;
  const finalToothY = prefersReducedMotion ? 0 : toothY;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-44 lg:py-56 overflow-hidden"
      aria-label="Premium dental technology showcase"
    >
      {/* Soft radial ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(183,165,139,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell">
        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-sage/80 mb-5">
            The DANTVED Standard
          </p>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] text-charcoal">
            Precision Meets <em className="font-light italic text-charcoal/85">Artistry</em>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground">
            Every exceptional smile begins with careful planning, advanced technology, and meticulous craftsmanship.
          </p>
        </motion.div>

        {/* 3D Showcase + Storytelling */}
        <div className="relative flex flex-col items-center min-h-[50vh]">
          {/* Floating tooth */}
          <motion.div style={{ y: finalToothY }} className="relative z-10">
            <ShowcaseRenderer
              modelType="image"
              src="https://static.prod-images.emergentagent.com/jobs/36c9215e-a4b6-41d8-bff4-303e6e84e5cc/images/3fb0c93a7aa84b46db864593123c73d242f94e9d2913910d55e6cdc63282e6c2.png"
              alt="3D precision dental model — crystalline tooth sculpture"
              rotateY={typeof finalRotateY === 'number' ? finalRotateY : 0}
              scale={typeof finalScale === 'number' ? finalScale : 1}
              glowIntensity={typeof finalGlow === 'number' ? finalGlow : 1}
              loaded={imageLoaded}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Storytelling phases — scroll-driven text */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pointer-events-none z-20">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.tag}
                style={{ opacity: prefersReducedMotion ? 1 : phaseOpacities[i] }}
                className="absolute bottom-8 text-center max-w-sm px-4"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-sage font-semibold mb-2">
                  {phase.tag}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {phase.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Narrative transition bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 sm:mt-32 text-center"
        >
          <div className="mx-auto w-px h-16 bg-gradient-to-b from-transparent via-[#D4C3B3]/50 to-[#D4C3B3]/30" aria-hidden="true" />
          
          <div className="mt-8 max-w-lg mx-auto space-y-4">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              At DANTVED CLINIC, we combine digital precision with artistic expertise to create smiles that look natural, function beautifully, and last for years.
            </p>
            <p className="text-xs sm:text-sm text-charcoal/50 italic">
              Where technology meets craftsmanship
            </p>
          </div>

          <motion.div
            animate={tabVisible && !prefersReducedMotion ? { y: [0, 6, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 mx-auto"
          >
            <ArrowDown className="h-4 w-4 text-[#D4C3B3]/60 mx-auto" />
          </motion.div>

          <div className="mt-6 mx-auto w-24 h-px bg-[#D4C3B3]/25" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
};
