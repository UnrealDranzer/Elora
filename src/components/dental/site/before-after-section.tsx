import { BeforeAfterSlider } from '@/components/dental/before-after-slider';
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';

export const BeforeAfterSection = () => (
  <section id="results" className="bg-warm/50 py-24 sm:py-32">
    <div className="section-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SectionLabel index="04" title="Transformations" />
        <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
          Subtle refinements, <em className="italic">visibly natural.</em>
        </h2>
        <p className="mt-5 max-w-md text-muted-foreground">
          Drag to explore tone, alignment, and proportion — composed to look effortlessly like you, only more luminous.
        </p>
      </motion.div>
      <BeforeAfterSlider />
    </div>
  </section>
);
