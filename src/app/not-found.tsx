import Link from 'next/link';
import { SiteWrapper } from '@/components/dental/site-wrapper';

export default function NotFound() {
  return (
    <SiteWrapper>
      <div className="section-shell flex min-h-[65vh] flex-col items-center justify-center text-center pt-16">
        <span className="inline-block rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground backdrop-blur-md shadow-sm">
          404 · Page Not Found
        </span>
        <h1 className="editorial-heading mt-8 leading-tight">
          Page not found.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
          The page you are looking for does not exist or has been moved to another address.
        </p>
        <Link href="/" className="pill-btn-dark mt-10 shadow-md hover:shadow-lg transition-all duration-300">
          Return to Studio
        </Link>
      </div>
    </SiteWrapper>
  );
}
