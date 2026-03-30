import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Truck } from 'lucide-react';

import { ProductCard } from '@/components/products/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

export const HomePage = () => {
  const { data: banners } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => (await api.get('/content/banners')).data.data.banners
  });
  const { data: featured } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => (await api.get('/products/featured')).data.data.products
  });
  const { data: collections } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => (await api.get('/collections')).data.data.collections
  });

  const heroBanner = banners?.[0];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,rgba(126,78,46,0.94),rgba(214,176,139,0.88))] p-7 text-white">
          <Badge className="bg-white/15 text-white">Premium Beauty Rituals</Badge>
          <h1 className="mt-6 max-w-md font-display text-5xl leading-tight sm:text-6xl">
            Glow-worthy skincare designed for busy lives.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            Elora delivers high-performance formulas, soft textures, and a polished mobile-first
            shopping experience that makes reordering effortless.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Shop best sellers
              </Button>
            </Link>
            <Link to="/track-order">
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white">
                Track an order
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="overflow-hidden p-0">
          <div className="aspect-[0.88] bg-[radial-gradient(circle_at_top,_rgba(226,185,141,0.6),_transparent_45%),linear-gradient(180deg,_rgba(255,247,239,1),_rgba(248,241,233,1))]">
            {heroBanner?.imageUrl ? (
              <img
                src={heroBanner.imageUrl}
                alt={heroBanner.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Elora edit</p>
                <p className="mt-2 font-display text-4xl">Fresh drops, luminous skin.</p>
              </div>
            )}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Sparkles, label: 'Clinically-minded formulas' },
          { icon: Truck, label: 'Fast dispatch across India' },
          { icon: ShieldCheck, label: 'Secure checkout with Razorpay' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="flex items-center gap-4 p-5">
              <div className="rounded-2xl bg-accent p-3">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">{item.label}</p>
            </Card>
          );
        })}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Best of Elora</p>
            <h2 className="font-display text-4xl">Featured essentials</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured?.slice(0, 8).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {collections?.slice(0, 3).map((collection: any) => (
          <Card key={collection.id} className="overflow-hidden p-0">
            <div className="aspect-[1.15] bg-accent/50">
              {collection.bannerImageUrl ? (
                <img src={collection.bannerImageUrl} alt={collection.name} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="space-y-2 p-5">
              <p className="font-display text-3xl">{collection.name}</p>
              <p className="text-sm text-muted-foreground">{collection.description}</p>
              <Link to={`/shop?collection=${collection.slug}`}>
                <Button variant="outline">Explore collection</Button>
              </Link>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};

