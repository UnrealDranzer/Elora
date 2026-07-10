import { SiteWrapper } from '@/components/dental/site-wrapper';
import { ServicesSection } from '@/components/dental/site/services-section';
import { TechnologySection } from '@/components/dental/site/technology-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental Services & Treatments | DANTVED CLINIC Airoli',
  description: 'Explore our premium dental services including dental implants, smile designing, veneers, clear aligners, and full mouth rehabilitation in Navi Mumbai.',
  keywords: 'Dental Services Airoli, Dental Treatments Navi Mumbai, Cosmetic Dentistry Services, Complete Dental Studio',
  alternates: {
    canonical: 'https://www.dantvedclinic.org/services',
  },
  openGraph: {
    title: 'Dental Services & Treatments | DANTVED CLINIC Airoli',
    description: 'Explore our premium dental services including dental implants, smile designing, veneers, clear aligners, and full mouth rehabilitation in Navi Mumbai.',
    url: 'https://www.dantvedclinic.org/services',
    siteName: 'DANTVED CLINIC',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Dental Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Services & Treatments | DANTVED CLINIC Airoli',
    description: 'Explore our premium dental services including dental implants, smile designing, veneers, clear aligners, and full mouth rehabilitation in Navi Mumbai.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <ServicesSection />
        <TechnologySection />
      </div>
    </SiteWrapper>
  );
}
