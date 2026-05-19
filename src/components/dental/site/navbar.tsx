import { MagneticAnchor } from '@/components/dental/magnetic-anchor';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#philosophy' },
  { label: 'Technology', href: '#technology' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' }
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
        scrolled ? 'border-b border-charcoal/5 bg-ivory/80 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
      )}
    >
      <div className="section-shell flex items-center justify-between gap-4">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-[0.04em] text-charcoal sm:text-[1.65rem]">
            {siteConfig.name}
          </span>
          <span className="text-[0.55rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
            {siteConfig.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticAnchor className="hidden sm:block">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="pill-btn-dark text-xs sm:text-sm"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </a>
          </MagneticAnchor>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-white/60 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-charcoal/5 bg-ivory/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="section-shell flex flex-col gap-1 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-foreground/80 transition hover:bg-warm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="pill-btn-dark mt-4 w-full"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
