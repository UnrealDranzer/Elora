"use client";
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import review1 from '../../../../public/reviews/review-1.png';
import review2 from '../../../../public/reviews/review-2.png';
import review3 from '../../../../public/reviews/review-3.png';

const reviews = [
  {
    image: review1,
    name: 'Sai Sudha Goddeti',
    alt: 'Google review by Sai Sudha Goddeti'
  },
  {
    image: review2,
    name: 'Nagarjuna Ravi',
    alt: 'Google review by Nagarjuna Ravi'
  },
  {
    image: review3,
    name: 'Rajni Gupta',
    alt: 'Google review by Rajni Gupta'
  }
];

export const TestimonialsSection = () => (
  <section id="reviews" className="py-24 sm:py-32">
    <div className="section-shell">
      <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index="06" title="Reviews" />
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
            Voices from <em className="italic">our chair.</em>
          </h2>
        </div>
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-charcoal transition-colors duration-300"
        >
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>4.9 / 5 · Google verified</span>
        </a>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={`review-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="flex flex-col justify-center rounded-[1.25rem] p-4 bg-[#FAF8F4] border border-[#D4C3B3]/40 shadow-soft transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-float cursor-pointer hover:bg-white h-full"
          >
            <div className="overflow-hidden rounded-[0.75rem] border border-[#D4C3B3]/25 bg-white p-2 flex items-center justify-center h-full min-h-[300px] relative w-full aspect-[4/3]">
              <Image
                src={review.image}
                alt={review.alt}
                placeholder="blur"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-contain p-2"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);
