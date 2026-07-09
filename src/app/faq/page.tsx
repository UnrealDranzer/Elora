import { SiteWrapper } from '@/components/dental/site-wrapper';
import { FaqSection } from '@/components/dental/site/faq-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental FAQs | Dantved Clinic Airoli',
  description: 'Find answers to common questions about dental implants, veneers, painless dentistry, and more at Dantved Clinic in Navi Mumbai.',
  keywords: 'Dental FAQs Navi Mumbai, Root Canal Questions, Denture Cleaning, Dental Implant Cost FAQs',
  alternates: {
    canonical: 'https://www.dantvedclinic.org/faq',
  },
  openGraph: {
    title: 'Dental FAQs | Dantved Clinic Airoli',
    description: 'Find answers to common questions about dental implants, veneers, painless dentistry, and more at Dantved Clinic in Navi Mumbai.',
    url: 'https://www.dantvedclinic.org/faq',
    siteName: 'Dantved Clinic',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Dantved Clinic FAQs',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental FAQs | Dantved Clinic Airoli',
    description: 'Find answers to common questions about dental implants, veneers, painless dentistry, and more at Dantved Clinic in Navi Mumbai.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FaqPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <FaqSection />
      </div>
    </SiteWrapper>
  );
}
