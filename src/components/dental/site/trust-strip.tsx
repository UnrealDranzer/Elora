/* Inline keyframes guarantee the animation runs on all browsers/devices
   regardless of Tailwind JIT compilation or OS reduced-motion settings. */
const marqueeStyle = `
@keyframes dv-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.dv-marquee {
  animation: dv-marquee 28s linear infinite;
  will-change: transform;
}
`;

const items = [
  'Pain-Free Dentistry',
  'Award-Winning Clinicians',
  'Studio-Grade Precision',
  'Lifetime Aftercare',
  'AI Assisted Diagnostics'
];

const TrustItem = ({ text }: { text: string }) => (
  <span className="flex shrink-0 items-center gap-6 font-display text-lg italic text-charcoal/80 sm:text-2xl font-light">
    {text}
    <span className="trust-divider text-lg not-italic opacity-60" aria-hidden>
      ✦
    </span>
  </span>
);

export const TrustStrip = () => (
  <section className="overflow-hidden border-y border-border/40 bg-warm/50 py-7">
    {/* Inject keyframes scoped to this component */}
    <style>{marqueeStyle}</style>

    <div className="relative flex w-full">
      {/* 6 copies → translateX(-50%) creates a perfect seamless loop */}
      <div
        className="dv-marquee flex w-max gap-6 whitespace-nowrap pl-6"
        aria-hidden="false"
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <TrustItem key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  </section>
);
