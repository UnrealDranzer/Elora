import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../index.css';
import { SmoothScrolling } from '@/components/smooth-scrolling';
import { AnalyticsReadiness } from '@/components/dental/analytics-readiness';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dantvedclinic.com'),
  title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
  description: 'Dantved Clinic provides dental implants, smile designing, clear aligners, veneers, dentures, full mouth rehabilitation, cosmetic dentistry and painless dental treatments in Airoli, Navi Mumbai.',
  keywords: 'Dental Clinic Navi Mumbai, Dentist Airoli, Dental Implants Navi Mumbai, Smile Designing, Cosmetic Dentistry, Dental Veneers, Clear Aligners, Dentures, Root Canal, Teeth Whitening, Painless Dentist, Full Mouth Rehabilitation, Best Prosthodontist, Dr Siddharth Vaish, Dental Implant Specialist, Smile Makeover, Emergency Dentist, Family Dentist, Dental Care Airoli, Dentist Near Me',
  authors: [{ name: 'Dantved Clinic' }],
  creator: 'Dantved Clinic',
  publisher: 'Dantved Clinic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://dantvedclinic.com',
  },
  openGraph: {
    title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
    description: 'Dantved Clinic provides dental implants, smile designing, clear aligners, veneers, dentures, full mouth rehabilitation, cosmetic dentistry and painless dental treatments in Airoli, Navi Mumbai.',
    url: 'https://dantvedclinic.com',
    siteName: 'Dantved Clinic',
    images: [
      {
        url: 'https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Dantved Clinic - Premium Dental Care',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
    description: 'Premium dental implant and aesthetic clinic in Navi Mumbai. Spa-level comfort and advanced cosmetic dentistry.',
    images: ['https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="theme-color" content="#F6F3EE" />
      </head>
      <body>
        <AnalyticsReadiness />
        <div 
          className="fixed pointer-events-none select-none z-0 opacity-[0.025] top-1/2 right-[-8%] -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] mix-blend-soft-light blur-[0.5px]"
          style={{
            backgroundImage: 'url(/favicon.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
