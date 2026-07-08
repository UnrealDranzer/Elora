import type { Metadata } from 'next';
import { LuxuryDentalSite } from '@/components/dental/luxury-dental-site';

export const metadata: Metadata = {
  title: 'Dantved Clinic | Best Dental Clinic in Airoli, Navi Mumbai',
  description: 'Dantved Clinic provides dental implants, smile designing, clear aligners, veneers, dentures, full mouth rehabilitation, cosmetic dentistry and painless dental treatments in Airoli, Navi Mumbai.',
  keywords: 'Dental Clinic Navi Mumbai, Dentist Airoli, Dental Implants Navi Mumbai, Smile Designing, Cosmetic Dentistry, Dental Veneers, Clear Aligners, Dentures, Root Canal, Teeth Whitening, Painless Dentist, Full Mouth Rehabilitation, Best Prosthodontist, Dr Siddharth Vaish, Dental Implant Specialist, Smile Makeover, Emergency Dentist, Family Dentist, Dental Care Airoli, Dentist Near Me',
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
        "name": "Do I need an appointment before visiting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Appointments are recommended to reduce waiting time and ensure adequate consultation. We accommodate walk-ins, whenever possible, subject to availability."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I visit the dentist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A routine dental examination every six months helps detect problems early and maintain good oral health."
        }
      },
      {
        "@type": "Question",
        "name": "Do you treat dental emergencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We provide emergency dental care for severe toothaches, broken teeth, swelling, infections and lost crowns."
        }
      },
      {
        "@type": "Question",
        "name": "Is the clinic equipped with modern technology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We use modern diagnostic and treatment equipment while following strict sterilization and infection control protocols."
        }
      },
      {
        "@type": "Question",
        "name": "Which is better: tooth extraction or root canal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whenever possible, we prefer preserving your natural tooth through root canal treatment. Extraction is considered only when the tooth cannot be saved."
        }
      },
      {
        "@type": "Question",
        "name": "What are dental implants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dental implants are titanium fixtures placed in the jawbone to replace missing tooth roots. They provide a strong foundation for crowns, bridges, or dentures. A clinical examination and imaging help determine bone quality and treatment suitability."
        }
      },
      {
        "@type": "Question",
        "name": "What is a smile makeover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A smile makeover combines treatments such as veneers, whitening, crowns, orthodontics, or gum contouring to improve your smile's appearance."
        }
      },
      {
        "@type": "Question",
        "name": "How do you ensure patient safety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We follow strict sterilization protocols using medical-grade sterilization equipment, disposable materials where appropriate, and internationally accepted infection control practices."
        }
      },
      {
        "@type": "Question",
        "name": "What if I have doctor anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer aromatherapy, a calm environment, noise-cancelling comfort, weighted cushions, and step-by-step walk-through of the procedure to help your nervous system settle."
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
