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
    <div className="relative flex w-full">
      <div className="flex w-max animate-trust-scroll gap-6 whitespace-nowrap pl-6 motion-reduce:animate-none hover:pause-animation">
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <TrustItem key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  </section>
);

