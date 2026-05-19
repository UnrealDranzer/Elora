import { SectionLabel } from '@/components/dental/ui/section-label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Baby,
  Gem,
  Sparkles,
  Stethoscope,
  Sun,
  Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  dark?: boolean;
  className?: string;
};

const services: Service[] = [
  {
    title: 'Dental Implants',
    description: 'Surgical-grade titanium roots paired with zirconia crowns sculpted by hand.',
    icon: Wrench,
    dark: true,
    className: 'lg:col-span-5 lg:row-span-2'
  },
  {
    title: 'Smile Design',
    description: 'Veneers, whitening, and contouring tailored to your facial geometry.',
    icon: Sparkles,
    className: 'lg:col-span-7'
  },
  {
    title: 'Invisalign',
    description: 'Clear aligners planned by AI-assisted 3D modeling for discreet correction.',
    icon: Gem,
    className: 'lg:col-span-7'
  },
  {
    title: 'Root Canal',
    description: 'Microscopic precision with spa-level comfort protocols and gentle anesthesia.',
    icon: Stethoscope,
    className: 'lg:col-span-5'
  },
  {
    title: 'Teeth Whitening',
    description: 'Gradual brightening rituals with enamel-safe lasers and post-care coaching.',
    icon: Sun,
    className: 'lg:col-span-5'
  },
  {
    title: 'Pediatric Dentistry',
    description: 'A calm, playful journey for little ones — built on trust, not fear.',
    icon: Baby,
    dark: true,
    className: 'lg:col-span-7'
  }
];

export const ServicesSection = () => (
  <section id="services" className="py-24 sm:py-32">
    <div className="section-shell">
      <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <SectionLabel index="02" title="Treatments" />
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] text-charcoal">
            A full studio of care,{' '}
            <em className="font-normal italic text-charcoal/80">without the clinical chill.</em>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          From your six-month polish to full-arch implants — every visit is slow, considered, and quietly luxurious.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.a
              href="#booking"
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'service-card group cursor-pointer shadow-soft transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                'hover:-translate-y-2 hover:shadow-float',
                service.dark 
                  ? 'bg-charcoal text-ivory hover:bg-[#A8B29A] hover:text-[#fdfaf5]' 
                  : 'bg-[#f0ebe3]/80 text-charcoal hover:bg-white',
                service.className
              )}
            >
              <Icon 
                className={cn(
                  'h-6 w-6 transition-transform duration-[600ms] group-hover:scale-110 group-hover:-rotate-3', 
                  service.dark ? 'text-ivory/80 group-hover:text-ivory' : 'text-charcoal/50 group-hover:text-sage'
                )} 
                strokeWidth={1.5} 
              />
              <div className="relative z-10 mt-12 sm:mt-16">
                <h3 className="font-display text-3xl tracking-tight sm:text-[2.25rem]">{service.title}</h3>
                <p className={cn(
                  'mt-3 max-w-sm text-sm leading-relaxed transition-colors duration-[600ms]', 
                  service.dark ? 'text-ivory/75 group-hover:text-ivory/90' : 'text-muted-foreground group-hover:text-charcoal/70'
                )}>
                  {service.description}
                </p>
              </div>
              <ArrowUpRight
                className={cn(
                  'absolute right-7 top-7 h-6 w-6 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110',
                  service.dark ? 'text-ivory/60 group-hover:text-ivory' : 'text-charcoal/35 group-hover:text-sage'
                )}
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>
);
