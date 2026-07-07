import { MessageCircle } from 'lucide-react';

import { siteConfig } from '@/lib/site-config';

export const FloatingWhatsApp = () => (
  <a
    href={siteConfig.whatsappUrl}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-float transition hover:scale-105 hover:bg-charcoal/90 sm:bottom-8 sm:right-8"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);

