import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { services, getServicesByCategory } from '@/lib/services';
import { SiteWrapper } from '@/components/dental/site-wrapper';
import { Breadcrumbs } from '@/components/dental/ui/breadcrumbs';
import { FaqSection } from '@/components/dental/site/faq-section';
import { BookingSection } from '@/components/dental/site/booking-section';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return {};
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: `https://www.dantvedclinic.org/services/${slug}`,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `https://www.dantvedclinic.org/services/${slug}`,
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
      title: service.seo.title,
      description: service.seo.description,
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
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related services from the same category
  const allInCategory = getServicesByCategory()[service.category] || [];
  const relatedServices = allInCategory.filter(s => s.slug !== service.slug);

  // 1. WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": service.seo.title,
    "description": service.seo.description,
    "url": `https://www.dantvedclinic.org/services/${slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Dantved Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dantvedclinic.org/logo-dantved.png"
      }
    }
  };

  // 2. FAQ Schema
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

  // 3. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.dantvedclinic.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.dantvedclinic.org/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.dantvedclinic.org/services/${slug}`
      }
    ]
  };

  // 4. MedicalClinic/Dentist Schema
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Dantved Clinic",
    "image": "https://www.dantvedclinic.org/logo-dantved.png",
    "url": "https://www.dantvedclinic.org",
    "telephone": "+918143789587",
    "medicalSpecialty": "Dentistry",
    "availableService": {
      "@type": "MedicalTest",
      "name": service.title
    }
  };

  return (
    <SiteWrapper>
      <div className="section-shell pt-12 pb-24">
        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }} />

        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start mt-8">
          <div>
            <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sage mb-4">
              {service.category}
            </span>
            <h1 className="editorial-heading leading-[1.1] text-charcoal">
              {service.h1}
            </h1>
            <p className="mt-6 text-lg font-medium text-sage sm:text-xl">
              {service.heroDescription}
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
      
      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-warm/30 py-24">
          <div className="section-shell">
            <h2 className="text-3xl font-display text-charcoal text-center mb-12">More in {service.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((related) => (
                <a 
                  key={related.slug} 
                  href={`/services/${related.slug}`}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5">
                    <Image 
                      src={related.image} 
                      alt={related.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-charcoal mb-2">{related.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{related.navDescription}</p>
                  <span className="text-sage text-sm font-semibold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingSection />
    </SiteWrapper>
  );
}
