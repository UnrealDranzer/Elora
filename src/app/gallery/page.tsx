import { SiteWrapper } from '@/components/dental/site-wrapper';
import { BeforeAfterSection } from '@/components/dental/site/before-after-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smile Gallery & Case Studies | Dantved Clinic Airoli',
  description: 'View our smile gallery and see real before & after results of dental implants, veneers, and smile makeovers at Dantved Clinic in Navi Mumbai.',
  keywords: 'Smile Gallery Airoli, Dental Before After Photos, Veneers Results Navi Mumbai, Implant Case Studies',
  alternates: {
    canonical: 'https://dantvedclinic.com/gallery',
  },
  openGraph: {
    title: 'Smile Gallery & Case Studies | Dantved Clinic Airoli',
    description: 'View our smile gallery and see real before & after results of dental implants, veneers, and smile makeovers at Dantved Clinic in Navi Mumbai.',
    url: 'https://dantvedclinic.com/gallery',
    siteName: 'Dantved Clinic',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Smile Gallery & Case Studies',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smile Gallery & Case Studies | Dantved Clinic Airoli',
    description: 'View our smile gallery and see real before & after results of dental implants, veneers, and smile makeovers at Dantved Clinic in Navi Mumbai.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryPage() {
  return (
    <SiteWrapper>
      <div className="pt-12">
        <BeforeAfterSection />
      </div>
    </SiteWrapper>
  );
}
