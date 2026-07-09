import { SiteWrapper } from '@/components/dental/site-wrapper';
import { BookingSection } from '@/components/dental/site/booking-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Dantved Clinic | Book Appointment in Airoli',
  description: 'Contact Dantved Clinic in Airoli, Navi Mumbai. Book an appointment for premium dental care, implants, and cosmetic dentistry.',
  keywords: 'Book Dental Appointment Airoli, Contact Dentist Navi Mumbai, Dantved Clinic Address, Dental Emergency Airoli',
  alternates: {
    canonical: 'https://www.dantvedclinic.org/contact',
  },
  openGraph: {
    title: 'Contact Dantved Clinic | Book Appointment in Airoli',
    description: 'Contact Dantved Clinic in Airoli, Navi Mumbai. Book an appointment for premium dental care, implants, and cosmetic dentistry.',
    url: 'https://www.dantvedclinic.org/contact',
    siteName: 'Dantved Clinic',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Contact Dantved Clinic',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dantved Clinic | Book Appointment in Airoli',
    description: 'Contact Dantved Clinic in Airoli, Navi Mumbai. Book an appointment for premium dental care, implants, and cosmetic dentistry.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <BookingSection />
      </div>
    </SiteWrapper>
  );
}
