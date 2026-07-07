"use client";
import { useEffect } from 'react';
import { SiteWrapper } from '@/components/dental/site-wrapper';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteWrapper>
      <div className="section-shell flex min-h-[65vh] flex-col items-center justify-center text-center pt-16">
        <span className="inline-block rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground backdrop-blur-md shadow-sm">
          System Error
        </span>
        <h1 className="editorial-heading mt-8 leading-tight">
          Something went wrong.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
          An unexpected error occurred. Please try reloading the page or return to the main lobby.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => reset()}
            className="pill-btn-dark shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <a
            href="/"
            className="pill-btn-light shadow-sm hover:shadow-md transition-all duration-300"
          >
            Return Home
          </a>
        </div>
      </div>
    </SiteWrapper>
  );
}
