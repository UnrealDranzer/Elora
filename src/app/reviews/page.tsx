import { SiteWrapper } from '@/components/dental/site-wrapper';
import { TestimonialsSection } from '@/components/dental/site/testimonials-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Reviews | Dantved Clinic Airoli, Navi Mumbai',
  description: 'Read reviews and testimonials from our patients. See why Dantved Clinic is the most trusted choice for dental implants and aesthetic dentistry.',
  keywords: 'Dantved Clinic Reviews, Dentist Ratings Airoli, Patient Testimonials Navi Mumbai, Google Reviews Dantved',
  alternates: {
    canonical: 'https://www.dantvedclinic.org/reviews',
  },
  openGraph: {
    title: 'Patient Reviews | Dantved Clinic Airoli, Navi Mumbai',
    description: 'Read reviews and testimonials from our patients. See why Dantved Clinic is the most trusted choice for dental implants and aesthetic dentistry.',
    url: 'https://www.dantvedclinic.org/reviews',
    siteName: 'Dantved Clinic',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Patient Reviews',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Reviews | Dantved Clinic Airoli, Navi Mumbai',
    description: 'Read reviews and testimonials from our patients. See why Dantved Clinic is the most trusted choice for dental implants and aesthetic dentistry.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReviewsPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <TestimonialsSection />
      </div>
    </SiteWrapper>
  );
}
