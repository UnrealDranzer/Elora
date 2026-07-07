import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { servicesData } from '@/lib/services-data';
import { SiteWrapper } from '@/components/dental/site-wrapper';
import { Breadcrumbs } from '@/components/dental/ui/breadcrumbs';
import { FaqSection } from '@/components/dental/site/faq-section';
import { BookingSection } from '@/components/dental/site/booking-section';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  
  if (!service) {
    return {};
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://dantvedclinic.com/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://dantvedclinic.com/services/${slug}`,
      siteName: 'Dantved Clinic',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": service.metaTitle,
    "description": service.metaDescription,
    "url": `https://dantvedclinic.com/services/${slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Dantved Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dantvedclinic.com/logo-dantved.png"
      }
    }
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <SiteWrapper>
      <div className="section-shell pt-12 pb-24">
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start mt-8">
          <div>
            <h1 className="editorial-heading leading-[1.1] text-charcoal">
              {service.h1}
            </h1>
            <p className="mt-6 text-lg font-medium text-sage sm:text-xl">
              {service.description}
            </p>
            <div className="mt-6 h-px w-16 bg-sage/40"></div>
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
              {service.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#booking"
                className="pill-btn-dark group shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
              >
                <span>Reserve a Consultation</span>
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] shadow-float aspect-[4/3] w-full bg-warm/30">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[3s] hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
      
      <FaqSection faqs={service.faqs} />
      <BookingSection />
    </SiteWrapper>
  );
}
