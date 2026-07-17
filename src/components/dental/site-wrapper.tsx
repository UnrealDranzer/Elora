"use client";

import { LuxuryCursor } from '@/components/dental/luxury-cursor';
import { FloatingWhatsApp } from '@/components/dental/site/floating-whatsapp';
import { Footer } from '@/components/dental/site/footer';
import { Navbar } from '@/components/dental/site/navbar';
import { ScrollProgress } from '@/components/dental/site/scroll-progress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="dental-site relative overflow-x-hidden bg-ivory text-charcoal">
      <div className="grain-overlay" aria-hidden />
      <ScrollProgress />
      <LuxuryCursor />
      <Navbar />
      <main className="pt-[var(--navbar-height-mobile)] lg:pt-[var(--navbar-height-desktop)] min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
