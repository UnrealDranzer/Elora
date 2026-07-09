"use client";
import { useState } from 'react';
import { SectionLabel } from '@/components/dental/ui/section-label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MotionLink = motion(Link);

type Service = {
  title: string;
  description: string;
  image: string;
  slug: string;
  dark?: boolean;
  className?: string;
};

const services: Service[] = [
  {
    title: 'Full Mouth Rehabilitation',
    description: 'Comprehensive care. Complete smile transformation.',
    image: '/treatments/full-mouth-rehabilitation.png',
    slug: 'full-mouth-rehabilitation',
    dark: true,
    className: 'lg:col-span-5 lg:row-span-2'
  },
  {
    title: 'Veneers',
    description: 'Ultra-thin. Natural looking. Transforming smiles beautifully.',
    image: '/treatments/veneers.png',
    slug: 'veneers',
    className: 'lg:col-span-7'
  },
  {
    title: 'Smile Designing',
    description: 'Enhancing smiles. Elevating confidence.',
    image: '/treatments/smile-designing.png',
    slug: 'smile-designing',
    className: 'lg:col-span-7'
  },
  {
    title: 'Dental Implants',
    description: 'Strong foundations. Confident smiles.',
    image: '/treatments/dental-implants.png',
    slug: 'dental-implants',
    className: 'lg:col-span-5'
  },
  {
    title: 'Clear Aligners',
    description: 'Invisible Custom Aligners. Designed for Everyday life',
    image: '/treatments/clear-aligners.png',
    slug: 'clear-aligners',
    dark: true,
    className: 'lg:col-span-7'
  }
];

const ServiceCardImage = ({ src, alt, dark }: { src: string; alt: string; dark?: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="treatment-card-image-wrapper">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          "treatment-card-image transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      <div className={cn(
        'treatment-card-image-gradient',
        dark
          ? 'from-charcoal via-charcoal/60 to-charcoal/0'
          : 'from-[#f0ebe3] via-[#f0ebe3]/60 to-[#f0ebe3]/0'
      )} />
    </div>
  );
};

export const ServicesSection = () => (
  <section id="services" className="py-24 sm:py-32">
    <div className="section-shell">
      <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <SectionLabel index="02" title="Treatments" />
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] text-charcoal">
            A Clinic full of care,{' '}
            <em className="font-normal italic text-charcoal/80">without the clinical fear</em>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          From your six-month polish to full-arch implants — every visit is slow, considered, and quietly luxurious.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {services.map((service, i) => {
          return (
            <MotionLink
              href={`/services/${service.slug}`}
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
              {/* Treatment Image — clean photo, no text */}
              <ServiceCardImage src={service.image} alt={service.title} dark={service.dark} />

              <div className="relative z-10 mt-auto">
                <h3 className="font-display text-3xl tracking-tight sm:text-[2.25rem]">{service.title}</h3>
                <p className={cn(
                  'mt-3 max-w-[16rem] text-sm leading-relaxed transition-colors duration-[600ms]', 
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
            </MotionLink>
          );
        })}
      </div>
    </div>
  </section>
);
