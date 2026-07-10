"use client";
import { cn } from '@/lib/utils';
import { GalleryLightbox, type GalleryImage } from '@/components/dental/gallery-lightbox';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { ArrowRight } from 'lucide-react';

/* ─── Gallery Data ─── */
const galleryImages: GalleryImage[] = [
  {
    src: '/clinic/exterior.jpg',
    alt: 'DANTVED CLINIC exterior — modern storefront with greenery',
  },
  {
    src: '/clinic/treatment-room.jpg',
    alt: 'Modern dental treatment room with advanced equipment',
  },
  {
    src: '/clinic/lounge.jpg',
    alt: 'Premium patient lounge with designer furniture',
  },
  {
    src: '/clinic/certificates.jpg',
    alt: 'Professional certifications and credentials display',
  },
  {
    src: '/clinic/interior-wide.jpg',
    alt: 'DANTVED CLINIC interior — lounge and treatment area with signature ceiling lamp',
  },
];

/* ─── Main Gallery Section ─── */
export const ClinicGallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 sm:py-32" aria-label="Clinic gallery">
        <div className="section-shell">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-sage/80 mb-5">
                Our Space
              </p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] text-charcoal">
                Inside <em className="font-light italic text-charcoal/85">DANTVED CLINIC</em>
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Every detail of our clinic has been thoughtfully designed to create a calm, private, and comfortable experience for every patient. 
                Explore the spaces where precision dentistry meets modern design.
              </p>

              <div className="mt-10">
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-btn-dark"
                >
                  Book an Appointment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Image Columns (No Crop) */}
            <div className="columns-2 gap-4 sm:gap-6">
              {galleryImages.map((image, i) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 sm:mb-6 break-inside-avoid relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] shadow-xl group cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View full size: ${image.alt}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); }}}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    className={cn(
                      "w-full h-auto block transition-transform duration-[600ms] ease-out",
                      "group-hover:scale-[1.02] group-hover:brightness-[1.03]",
                      "contrast-[1.03] saturate-[1.05]"
                    )}
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/5 z-10 rounded-[2rem] sm:rounded-[3rem] pointer-events-none" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};
