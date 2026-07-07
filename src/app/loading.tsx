import { siteConfig } from '@/lib/site-config';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f6f3ee]">
      <div className="text-center animate-pulse">
        <p className="font-display text-4xl tracking-[0.08em] text-charcoal">{siteConfig.name}</p>
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.42em] text-muted-foreground">{siteConfig.tagline}</p>
      </div>
    </div>
  );
}
