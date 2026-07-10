import { SiteWrapper } from '@/components/dental/site-wrapper';
import { PhilosophySection } from '@/components/dental/site/philosophy-section';
import { TrustStrip } from '@/components/dental/site/trust-strip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About DANTVED CLINIC | Best Dental Clinic in Airoli',
  description: 'Learn about DANTVED CLINIC, our experienced team led by Dr. Siddharth Vaish, and our commitment to painless, premium dental care in Airoli, Navi Mumbai.',
  keywords: 'About DANTVED CLINIC, Dr Siddharth Vaish, Dentist Airoli, Navi Mumbai Dental Studio, Prosthodontist Doctor',
  alternates: {
    canonical: 'https://www.dantvedclinic.org/about',
  },
  openGraph: {
    title: 'About DANTVED CLINIC | Best Dental Clinic in Airoli',
    description: 'Learn about DANTVED CLINIC, our experienced team led by Dr. Siddharth Vaish, and our commitment to painless, premium dental care in Airoli, Navi Mumbai.',
    url: 'https://www.dantvedclinic.org/about',
    siteName: 'DANTVED CLINIC',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'About DANTVED CLINIC',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DANTVED CLINIC | Best Dental Clinic in Airoli',
    description: 'Learn about DANTVED CLINIC, our experienced team led by Dr. Siddharth Vaish, and our commitment to painless, premium dental care in Airoli, Navi Mumbai.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <PhilosophySection />
        <TrustStrip />
      </div>
    </SiteWrapper>
  );
}
