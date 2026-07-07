import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  // Breadcrumb schema JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://dantvedclinic.com${item.href}` : `https://dantvedclinic.com`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.label} className="flex items-center gap-2.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-charcoal transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal/70 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-sage/60" aria-hidden="true">/</span>}
            </div>
          );
        })}
      </nav>
    </>
  );
};
