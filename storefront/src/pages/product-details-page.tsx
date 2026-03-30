import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ProductCard } from '@/components/products/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { cartStore } from '@/store/cart-store';

import { api } from '@/lib/api';

export const ProductDetailsPage = () => {
  const { slug = '' } = useParams();
  const addItem = cartStore((state) => state.addItem);
  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await api.get(`/products/${slug}`)).data.data.product
  });

  if (isLoading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading product...</div>;
  }

  if (!data) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Product not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="grid gap-2 sm:grid-cols-2">
            {data.images.map((image: any) => (
              <img
                key={image.url}
                src={image.url}
                alt={image.altText ?? data.name}
                className="aspect-square h-full w-full object-cover"
              />
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <Badge>{data.category.name}</Badge>
          <div>
            <h1 className="font-display text-5xl">{data.name}</h1>
            <p className="mt-3 text-base text-muted-foreground">{data.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold">{formatCurrency(data.price)}</p>
            {data.compareAtPrice ? (
              <p className="text-base text-muted-foreground line-through">
                {formatCurrency(data.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-sm font-semibold">Ingredients</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.ingredients || 'Active beauty-grade blend.'}</p>
            <p className="mt-4 text-sm font-semibold">Benefits</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.benefits || 'Boosts hydration and radiance.'}</p>
            <p className="mt-4 text-sm font-semibold">How to use</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.howToUse || 'Apply on clean skin morning and night.'}</p>
          </div>
          <div className="hidden gap-3 md:flex">
            <Button className="flex-1" onClick={() => addItem({ productId: data.id, quantity: 1 })}>
              Add to bag
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => addItem({ productId: data.id, quantity: 1 })}>
              Buy now
            </Button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-display text-4xl">You may also love</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.relatedProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-20 z-20 md:hidden">
        <div className="mx-4 rounded-3xl bg-white/95 p-4 shadow-glow backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Ready to checkout</p>
              <p className="font-semibold">{formatCurrency(data.price)}</p>
            </div>
            <Button className="flex-1" onClick={() => addItem({ productId: data.id, quantity: 1 })}>
              Add to bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

