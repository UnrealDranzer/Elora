"use client";
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

type Review = {
  name: string;
  initials: string;
  date: string;
  text: string;
  link: string;
};

const reviews: Review[] = [
  {
    name: 'Sai Sudha Goddeti',
    initials: 'SG',
    date: '3 months ago',
    text: 'Extremely satisfied with the dental implant treatment by Dr. Siddharth. The entire process was painless, and the clinic is incredibly clean and modern. Dr. Siddharth explained everything patiently and made me feel very comfortable. Highly recommend DANTVED CLINIC!',
    link: 'https://maps.app.goo.gl/t2HwpYobmqvmnp8h9'
  },
  {
    name: 'Nagarjuna Ravi',
    initials: 'NR',
    date: '5 months ago',
    text: 'I visited DANTVED CLINIC for a smile makeover and veneers. The digital treatment planning was amazing—I could see the preview of my teeth before starting. The results are natural-looking and absolutely perfect. Exceptional care and premium environment.',
    link: 'https://maps.app.goo.gl/UZy4tAYpXhhyG9Xe7'
  },
  {
    name: 'Rajni Gupta',
    initials: 'RG',
    date: '1 month ago',
    text: 'Best dental clinic in Airoli. I was terrified of dental procedures, but their comforting ambiance, warm staff, and gentle, explanation-first approach completely put my anxiety at ease. The root canal treatment was smooth and painless.',
    link: 'https://maps.app.goo.gl/s37jUmAknzYxxfFj9'
  }
];

const GoogleIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.86-4.53-6.16-4.53z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export const TestimonialsSection = () => (
  <section id="reviews" className="py-24 sm:py-32">
    <div className="section-shell">

      {/* Header — reduced mb-14 → mb-8 so cards feel visually connected to the heading */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index="06" title="Reviews" />
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
            Voices from <em className="italic">our chair</em>
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

      {/* Review Cards */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.a
            href={review.link}
            target="_blank"
            rel="noopener noreferrer"
            key={`review-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="flex flex-col justify-between rounded-[22px] p-6 sm:p-8 bg-[#FAF8F4] border border-[#D4C3B3]/40 shadow-soft transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-float cursor-pointer hover:bg-white h-full group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-[#FAF8F4] font-display text-sm tracking-wider font-semibold">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-charcoal text-base leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#D4C3B3]/35 bg-white/60 px-3 py-1 shadow-sm">
                  <GoogleIcon />
                  <span className="text-[0.58rem] font-medium uppercase tracking-wider text-charcoal/70">Verified</span>
                </div>
              </div>

              <div className="flex gap-0.5 mb-4" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-charcoal/80">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Card footer — "View on Google" replaces the misleading "Read Full Review" */}
            <div className="mt-8 flex items-center justify-between border-t border-[#D4C3B3]/25 pt-4">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted-foreground group-hover:text-charcoal transition-colors duration-300">
                View on Google
              </span>
              <span className="text-muted-foreground opacity-60 text-xs">↗</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View All Reviews CTA — primary action below the grid */}
      <div className="mt-10 flex justify-center">
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn-light group inline-flex items-center gap-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
        >
          View All Reviews
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      </div>

    </div>
  </section>
);
