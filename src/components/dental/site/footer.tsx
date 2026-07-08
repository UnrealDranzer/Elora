import { siteConfig } from '@/lib/site-config';
import { Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import logoImg from '../../../../public/logo-dantved.png';

export const Footer = () => (
  <footer className="bg-charcoal pt-16 text-ivory">
    <div className="section-shell grid gap-12 pb-14 lg:grid-cols-4">
      <div className="lg:col-span-1">
        {/* Logo blended into dark background — mix-blend-lighten preserves gold */}
        <div className="inline-flex h-14 sm:h-16 lg:h-20 items-center relative w-36 sm:w-40 lg:w-48">
          <Image
            src={logoImg}
            alt="Dantved Clinic Logo"
            fill
            sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 200px"
            className="object-contain object-center mix-blend-lighten brightness-[1.2]"
          />
        </div>
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
          A quiet studio for slow, considered dentistry — sculpting smiles the way they should be made.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition hover:border-ivory/40 hover:text-ivory"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-ivory/45">Visit</p>
        <ul className="mt-5 space-y-3 text-sm text-ivory/75">
          <li className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory transition-colors"
            >
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </a>
          </li>
          <li className="flex gap-2">
            <Phone className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-ivory">
              {siteConfig.phone}
            </a>
          </li>
          <li className="flex gap-2">
            <Mail className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">
              {siteConfig.email}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-ivory/45">Hours</p>
        <ul className="mt-5 space-y-2 text-sm text-ivory/75">
          <li>Mon – Sat · {siteConfig.openingHours.weekdays}</li>
          <li>Sunday · {siteConfig.openingHours.sunday}</li>
        </ul>
        <p className="mt-5 flex items-center gap-2 text-xs text-ivory/55">
          <Clock className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
          Concierge replies within 1 hour
        </p>
      </div>

      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-ivory/45">Find us</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-ivory/10 shadow-md">
          <iframe
            title="Dantved Clinic location"
            src={siteConfig.mapEmbedUrl}
            className="h-44 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>

    <div className="border-t border-ivory/10 py-6">
      <div className="section-shell flex flex-col items-center justify-between gap-3 text-center text-[0.62rem] uppercase tracking-[0.28em] text-ivory/40 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Dantved Clinic. Crafted with care.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ivory/70">
            Privacy
          </a>
          <a href="#" className="hover:text-ivory/70">
            Terms
          </a>
          <a href="#" className="hover:text-ivory/70">
            Accessibility
          </a>
        </div>
      </div>
    </div>
  </footer>
);
