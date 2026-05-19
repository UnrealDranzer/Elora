import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    quote:
      'I genuinely fell asleep during my appointment. The studio feels closer to a gallery than a clinic — Dr. Siddharth\'s work is unreal.',
    name: 'Amélie Larsen',
    role: 'Veneers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    featured: false
  },
  {
    quote:
      'Dantved rebuilt not just my smile but my confidence. The team explained every step — zero surprises and zero pain.',
    name: 'Theo Bianchi',
    role: 'Full-arch implants',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    featured: true
  },
  {
    quote:
      'From the welcome tea to the soft cashmere blankets — every detail telegraphs care. I recommend this to everyone I know.',
    name: 'Sara Okafor',
    role: 'Invisalign + whitening',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    featured: false
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>4.9 / 5 · Google &amp; RealSelf verified</span>
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.blockquote
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className={`flex flex-col justify-between rounded-[2.5rem] p-10 sm:p-12 transition-shadow duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-float ${
              review.featured
                ? 'bg-[#1A1A1A] text-ivory shadow-card lg:-translate-y-4 hover:bg-[#111111]'
                : 'border border-border/40 bg-[#fbf9f6] text-charcoal shadow-soft hover:bg-white'
            }`}
          >
            <div className="mb-8 flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${review.featured ? 'fill-sage text-sage' : 'fill-amber-400 text-amber-400'}`}
                />
              ))}
            </div>
            <p className={`font-display text-[1.75rem] leading-[1.3] sm:text-3xl lg:text-[2rem] ${review.featured ? 'font-light' : ''}`}>
              &ldquo;{review.quote}&rdquo;
            </p>
            <footer className="mt-12 flex items-center gap-4 border-t border-current/15 pt-8">
              <img 
                src={review.avatar} 
                alt="" 
                className={`h-14 w-14 rounded-full object-cover shadow-sm ${review.featured ? 'ring-2 ring-sage/30' : 'ring-2 ring-warm'}`} 
                loading="lazy" 
              />
              <div>
                <p className="text-base font-medium">{review.name}</p>
                <p className={`mt-0.5 text-[0.65rem] uppercase tracking-[0.25em] ${review.featured ? 'text-sage' : 'text-muted-foreground'}`}>
                  {review.role}
                </p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  </section>
);
