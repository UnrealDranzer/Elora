import { LuxuryCursor } from '@/components/dental/luxury-cursor';
import { BeforeAfterSection } from '@/components/dental/site/before-after-section';
import { BookingSection } from '@/components/dental/site/booking-section';
import { FaqSection } from '@/components/dental/site/faq-section';
import { FloatingWhatsApp } from '@/components/dental/site/floating-whatsapp';
import { Footer } from '@/components/dental/site/footer';
import { HeroSection } from '@/components/dental/site/hero-section';
import { LoadingScreen } from '@/components/dental/site/loading-screen';
import { Navbar } from '@/components/dental/site/navbar';
import { PhilosophySection } from '@/components/dental/site/philosophy-section';
import { ScrollProgress } from '@/components/dental/site/scroll-progress';
import { ServicesSection } from '@/components/dental/site/services-section';
import { TechnologySection } from '@/components/dental/site/technology-section';
import { TestimonialsSection } from '@/components/dental/site/testimonials-section';
import { TrustStrip } from '@/components/dental/site/trust-strip';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const LuxuryDentalSite = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="dental-site relative overflow-x-hidden bg-ivory text-charcoal">
      <div className="grain-overlay" aria-hidden />
      <LoadingScreen />
      <ScrollProgress />
      <LuxuryCursor />
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <BeforeAfterSection />
        <PhilosophySection />
        <TechnologySection />
        <TestimonialsSection />
        <FaqSection />
        <BookingSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
