"use client";
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { services, getServicesByCategory, ServiceCategory, ServiceDetail } from '@/lib/services';
import logoImg from '../../../../public/logo-dantved.png';

const links = [
  { label: 'Doctors', href: '/#philosophy' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' }
];

const groupedServices = getServicesByCategory();
const categories = Object.keys(groupedServices) as ServiceCategory[];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(true);
  const [hoveredService, setHoveredService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setIsCompactMode(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (open || desktopMenuOpen) ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, desktopMenuOpen]);

  // Handle ESC to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaMenuOpen(false);
        setDesktopMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[70] transition-colors duration-500',
        scrolled || megaMenuOpen || desktopMenuOpen ? 'bg-ivory/95 backdrop-blur-xl border-b border-charcoal/5 shadow-sm' : 'bg-transparent'
      )}
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <div className="section-shell relative">
        {/* TOP ROW: Toggle, Logo, CTA */}
        <motion.div 
          layout
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "grid grid-cols-[1fr_auto_1fr] items-center",
            isCompactMode ? "py-3 lg:py-4" : "pt-6 pb-4 lg:pt-8 lg:pb-6"
          )}
        >
          
          {/* Left: Mobile & Desktop Toggles */}
          <div className="flex items-center justify-start">
            {/* Mobile Toggle */}
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-white/60 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {/* Desktop Compact Toggle */}
            <AnimatePresence>
              {isCompactMode && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/10 bg-white/60 hover:bg-white transition-colors"
                  onClick={() => {
                    setDesktopMenuOpen((v) => !v);
                    setMegaMenuOpen(false);
                  }}
                  aria-label={desktopMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {desktopMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Center: Large Logo */}
          <div className="flex justify-center items-center">
            <motion.a 
              href="/" 
              layout
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative flex items-center shrink-0 transition-all duration-400",
                isCompactMode 
                  ? "w-[180px] h-[56px] sm:w-[200px] sm:h-[60px] lg:w-[240px] lg:h-[72px]" 
                  : "w-[200px] h-[64px] sm:w-[240px] sm:h-[72px] lg:w-[320px] lg:h-[100px]"
              )}
            >
              <Image
                src={logoImg}
                alt="Dantved Clinic Logo"
                fill
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 320px"
                className="object-contain object-center"
                priority
              />
            </motion.a>
          </div>

          {/* Right: CTA */}
          <div className="flex justify-end items-center">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className={cn("pill-btn-dark hidden sm:flex transition-all duration-400", isCompactMode && "scale-90 origin-right")}
            >
              Book an appointment
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* BOTTOM ROW: Desktop Navigation Links */}
        <AnimatePresence>
          {!isCompactMode && (
            <motion.nav 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:flex items-center justify-center gap-10 pb-6 lg:pb-8 overflow-hidden" 
              aria-label="Main Navigation"
            >
              <div 
                className="nav-link cursor-pointer flex items-center gap-1 group py-2"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                role="button"
                tabIndex={0}
                aria-expanded={megaMenuOpen}
                onKeyDown={(e) => { if (e.key === 'Enter') setMegaMenuOpen(!megaMenuOpen); }}
              >
                Treatments & Services
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", megaMenuOpen && "rotate-180")} />
              </div>

              {links.map((link) => (
                <a key={link.href} href={link.href} className="nav-link py-2" onClick={() => setMegaMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* DESKTOP MEGA MENU */}
        <AnimatePresence>
          {megaMenuOpen && !isCompactMode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-full mt-2 w-full bg-white rounded-[24px] shadow-2xl border border-charcoal/5 p-6 lg:p-8 hidden lg:block overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-8 xl:gap-10">
                {/* Left: Category Columns (Scrollable) */}
                <div className="col-span-8 overflow-y-auto custom-scrollbar pr-4 max-h-[calc(100vh-14rem)]">
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 items-start">
                    {categories.map(category => (
                      <div key={category} className="mb-6 xl:mb-8">
                        <h3 className="text-sage text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 flex items-center justify-between border-b border-charcoal/5 pb-2 sticky top-0 bg-white/95 backdrop-blur z-10 pt-1">
                          {category}
                          <span className="text-muted-foreground/60 tracking-normal lowercase">{groupedServices[category].length} treatments</span>
                        </h3>
                        <ul className="space-y-3 xl:space-y-4">
                          {groupedServices[category].map(service => (
                            <li 
                              key={service.slug} 
                              onMouseEnter={() => setHoveredService(service)}
                              className="group cursor-pointer"
                            >
                              <a href={`/services/${service.slug}`} className="block">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-charcoal group-hover:text-sage transition-colors">
                                    {service.title}
                                  </span>
                                  {service.isPopular && (
                                    <span className="text-[9px] bg-sage/10 text-sage px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 group-hover:translate-x-1 transition-transform duration-300">
                                  {service.navDescription}
                                </p>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Featured / Preview Card (Sticky) */}
                <div className="col-span-4 border-l border-charcoal/5 pl-8 xl:pl-10 h-full max-h-[calc(100vh-14rem)] sticky top-0">
                  <AnimatePresence mode="wait">
                    {hoveredService ? (
                      <motion.div
                        key={hoveredService.slug}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-warm/30 rounded-3xl p-5 h-full flex flex-col"
                      >
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5">
                          <Image 
                            src={hoveredService.image} 
                            alt={hoveredService.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <h4 className="text-xl font-display text-charcoal mb-2">{hoveredService.title}</h4>
                        <p className="text-sm text-muted-foreground flex-grow">{hoveredService.heroDescription}</p>
                        <a href={`/services/${hoveredService.slug}`} className="text-sage text-sm font-semibold flex items-center gap-2 mt-4 hover:gap-3 transition-all">
                          View Treatment <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-charcoal text-ivory rounded-3xl p-8 h-full flex flex-col justify-center items-start text-left relative overflow-hidden"
                      >
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ivory/5 rounded-full blur-2xl"></div>
                        
                        <h4 className="text-2xl font-display mb-4 relative z-10">Not sure which treatment you need?</h4>
                        <p className="text-sm text-ivory/70 mb-8 leading-relaxed relative z-10">
                          Schedule a comprehensive consultation. Our specialists will evaluate your oral health and create a personalized treatment plan.
                        </p>
                        <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" className="pill-btn bg-white text-charcoal w-fit relative z-10 hover:bg-ivory">
                          Book Consultation
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP COMPACT SLIDE-OVER MENU */}
      <AnimatePresence>
        {desktopMenuOpen && isCompactMode && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDesktopMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[60] hidden lg:block h-screen"
              style={{ top: '0' }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0.5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[420px] bg-ivory shadow-2xl z-[80] hidden lg:flex flex-col h-screen border-r border-charcoal/5"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-8 border-b border-charcoal/5 shrink-0">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Menu</span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-white hover:bg-charcoal hover:text-white transition-colors"
                  onClick={() => setDesktopMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-8 flex flex-col gap-8">
                
                {/* Services Accordion */}
                <div className="rounded-2xl bg-white border border-charcoal/5 overflow-hidden">
                  <button 
                    onClick={() => setDesktopServicesOpen(!desktopServicesOpen)}
                    className="w-full flex items-center justify-between p-6 text-sm uppercase tracking-[0.15em] text-foreground font-semibold hover:bg-warm/10 transition-colors"
                  >
                    Treatments & Services
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", desktopServicesOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {desktopServicesOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-ivory/50"
                      >
                        <div className="px-6 pb-6 pt-2 flex flex-col gap-6">
                          {categories.map(category => (
                            <div key={category}>
                              <h4 className="text-[10px] font-bold text-sage uppercase tracking-widest mb-3 border-b border-charcoal/5 pb-2">
                                {category}
                              </h4>
                              <div className="flex flex-col gap-3 pl-3 border-l-2 border-warm/50">
                                {groupedServices[category].map(service => (
                                  <a 
                                    key={service.slug} 
                                    href={`/services/${service.slug}`}
                                    onClick={() => setDesktopMenuOpen(false)}
                                    className="text-sm text-charcoal hover:text-sage transition-colors flex items-center gap-2 py-1"
                                  >
                                    {service.title}
                                    {service.isPopular && <span className="w-1.5 h-1.5 rounded-full bg-sage"></span>}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Links */}
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setDesktopMenuOpen(false)}
                      className="rounded-2xl p-6 text-sm uppercase tracking-[0.15em] text-foreground font-semibold hover:bg-white border border-transparent hover:border-charcoal/5 transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

              </div>
              
              {/* Drawer Footer */}
              <div className="p-8 border-t border-charcoal/5 shrink-0 bg-white">
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-btn-dark w-full justify-center"
                >
                  Book an appointment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-charcoal/5 bg-ivory/95 backdrop-blur-xl lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <nav className="section-shell flex flex-col gap-2 py-6" aria-label="Mobile Navigation">
              
              {/* Mobile Services Accordion */}
              <div className="rounded-2xl bg-white/50 border border-charcoal/5 overflow-hidden">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm uppercase tracking-[0.15em] text-foreground font-semibold"
                >
                  Treatments & Services
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", mobileServicesOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 flex flex-col gap-6">
                        {categories.map(category => (
                          <div key={category}>
                            <h4 className="text-[10px] font-bold text-sage uppercase tracking-widest mb-3 border-b border-charcoal/5 pb-1">
                              {category}
                            </h4>
                            <div className="flex flex-col gap-3 pl-2 border-l-2 border-warm">
                              {groupedServices[category].map(service => (
                                <a 
                                  key={service.slug} 
                                  href={`/services/${service.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-sm text-charcoal/80 flex items-center gap-2"
                                >
                                  {service.title}
                                  {service.isPopular && <span className="w-1.5 h-1.5 rounded-full bg-sage"></span>}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-5 py-4 text-sm uppercase tracking-[0.15em] text-foreground font-semibold hover:bg-white/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="pill-btn-dark mt-6 w-full justify-center"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
