"use client";
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';

const tech = [
  { num: '01', title: '3D intraoral scanning', desc: 'Sub-millimetre digital impressions without messy moulds.' },
  { num: '02', title: 'AI-assisted diagnostics', desc: 'Early detection mapping for caries, gum health, and bone density.' },
  { num: '03', title: 'Digital smile design', desc: 'Preview your future smile in real time before treatment begins.' },
  { num: '04', title: 'Laser dentistry', desc: 'Gentle tissue sculpting with faster healing and minimal discomfort.' }
];

export const TechnologySection = () => (
  <section id="technology" className="border-y border-charcoal/5 bg-[#f3efe8] py-24 sm:py-32">
    <div className="section-shell">
      <div className="mb-14 max-w-2xl">
        <SectionLabel index="05" title="Technology" />
        <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
          Precision instruments, <em className="italic">invisible complexity.</em>
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tech.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-[1.75rem] border border-charcoal/6 bg-ivory/80 p-8 shadow-soft backdrop-blur"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-sage">{item.num}</p>
            <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

