"use client";
import { cn } from '@/lib/utils';
import { GalleryLightbox, type GalleryImage } from '@/components/dental/gallery-lightbox';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

/* ─── Gallery Data ─── */
const galleryImages: (GalleryImage & {
  objectPosition: string;
  gridClass: string;
  animVariant: 'fade' | 'slide' | 'scale';
})[] = [
  {
    src: '/clinic/exterior.jpg',
    alt: 'Dantved Clinic exterior — modern storefront with greenery',
    objectPosition: 'center 60%',
    gridClass: 'col-span-12 sm:col-span-6 lg:col-span-5 row-span-2',
    animVariant: 'fade',
  },
  {
    src: '/clinic/lounge.jpg',
    alt: 'Premium patient lounge with designer furniture',
    objectPosition: 'center center',
    gridClass: 'col-span-12 sm:col-span-6 lg:col-span-4 row-span-1',
    animVariant: 'slide',
  },
  {
    src: '/clinic/treatment-room.jpg',
    alt: 'Modern dental treatment room with advanced equipment',
    objectPosition: 'center 40%',
    gridClass: 'col-span-12 sm:col-span-6 lg:col-span-3 row-span-2',
    animVariant: 'scale',
  },
  {
    src: '/clinic/certificates.jpg',
    alt: 'Professional certifications and credentials display',
    objectPosition: 'center center',
    gridClass: 'col-span-12 sm:col-span-6 lg:col-span-4 row-span-1',
    animVariant: 'fade',
  },
  {
    src: '/clinic/interior-wide.jpg',
    alt: 'Dantved Clinic interior — lounge and treatment area with signature ceiling lamp',
    objectPosition: 'center 45%',
    gridClass: 'col-span-12 lg:col-span-8 row-span-1',
    animVariant: 'slide',
  },
];

/* ─── Animation Variants ─── */
const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

/* ─── Parallax Image Card ─── */
const GalleryCard = ({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Scroll parallax — subtle y-offset per card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 20 : 30, index % 2 === 0 ? -20 : -30]
  );

  return (
    <motion.div
      ref={cardRef}
      variants={variants[image.animVariant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-[28px] shadow-xl min-h-[240px] sm:min-h-[280px]',
        image.gridClass
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View full size: ${image.alt}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }}}
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-[-20px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index === 0 ? undefined : 'lazy'}
          priority={index === 0}
          onLoad={() => setLoaded(true)}
          style={{ objectPosition: image.objectPosition }}
          className={cn(
            "object-cover transition-all duration-[600ms] ease-out",
            "group-hover:scale-[1.02] group-hover:brightness-[1.03] group-hover:shadow-2xl",
            "contrast-[1.03] saturate-[1.05]",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      </motion.div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/5 rounded-[28px] z-10" />
    </motion.div>
  );
};

/* ─── Main Gallery Section ─── */
export const ClinicGallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 sm:py-32" aria-label="Clinic gallery">
        <div className="section-shell">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 sm:mb-20 max-w-2xl"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-sage/80 mb-5">
              Our Space
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] text-charcoal">
              Inside <em className="font-light italic text-charcoal/85">Dantved Clinic</em>
            </h2>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Every detail of our clinic has been thoughtfully designed to create a calm, private, and comfortable experience for every patient.
            </p>
          </motion.div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-6 auto-rows-[minmax(200px,_1fr)] sm:auto-rows-[minmax(240px,_1fr)] lg:auto-rows-[minmax(260px,_1fr)]">
            {galleryImages.map((image, i) => (
              <GalleryCard
                key={image.src}
                image={image}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
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
