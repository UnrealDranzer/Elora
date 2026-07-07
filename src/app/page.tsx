import type { Metadata } from 'next';
import { LuxuryDentalSite } from '@/components/dental/luxury-dental-site';

export const metadata: Metadata = {
  title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
  description: 'Dantved Clinic provides dental implants, smile designing, crowns & bridges, veneers, dentures, full mouth rehabilitation, cosmetic dentistry and painless dental treatments in Airoli, Navi Mumbai.',
  keywords: 'Dental Clinic Navi Mumbai, Dentist Airoli, Dental Implants Navi Mumbai, Smile Designing, Cosmetic Dentistry, Dental Veneers, Crowns and Bridges, Dentures, Root Canal, Teeth Whitening, Painless Dentist, Full Mouth Rehabilitation, Best Prosthodontist, Dr Siddharth Vaish, Dental Implant Specialist, Smile Makeover, Emergency Dentist, Family Dentist, Dental Care Airoli, Dentist Near Me',
  alternates: {
    canonical: 'https://dantvedclinic.com',
  },
  openGraph: {
    title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
    description: 'Dantved Clinic provides dental implants, smile designing, crowns & bridges, veneers, dentures, full mouth rehabilitation, cosmetic dentistry and painless dental treatments in Airoli, Navi Mumbai.',
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness", "Organization"],
    "name": "Dantved Clinic",
    "image": "https://static.prod-images.emergentagent.com/jobs/3ddental/hero-img.png",
    "@id": "https://dantvedclinic.com",
    "url": "https://dantvedclinic.com",
    "telephone": "+918143789587",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 18, Bhoomi Colossa, Sector-19, Airoli",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400708",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.160597,
      "longitude": 72.992139
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "21:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dr.siddharth_vaish/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is treatment painless?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We use gentle anesthesia, noise-cancelling comfort, and paced visits so you remain calm throughout every procedure."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can I get an appointment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Same-week consultations are often available for new patients. Virtual assessments can begin within 24 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Do you treat children?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our pediatric suite is designed for trust-first experiences with playful, unhurried care."
        }
      },
      {
        "@type": "Question",
        "name": "What if I have dental anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer aromatherapy, weighted blankets, sedation options, and step-by-step explanations to help your nervous system settle."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LuxuryDentalSite />
    </>
  );
}
