import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { cartStore } from '@/store/cart-store';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    price: number;
    compareAtPrice?: number | null;
    availableStock: number;
    images: Array<{ url: string; altText?: string | null }>;
    isBestSeller?: boolean;
    isNewArrival?: boolean;
  };
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = cartStore((state) => state.addItem);

  return (
    <Card className="overflow-hidden">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[0.9] overflow-hidden bg-accent/50">
          {product.images[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].altText ?? product.name}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(188,145,109,0.45),_transparent_60%)]" />
          )}
          <div className="absolute left-3 top-3 flex gap-2">
            {product.isBestSeller ? <Badge>Best Seller</Badge> : null}
            {product.isNewArrival ? <Badge className="bg-white">New</Badge> : null}
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="font-display text-2xl">{product.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold">{formatCurrency(product.price)}</p>
          {product.compareAtPrice ? (
            <p className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
        <Button
          className="w-full"
          disabled={product.availableStock < 1}
          onClick={() => addItem({ productId: product.id, quantity: 1 })}
        >
          {product.availableStock > 0 ? 'Add to bag' : 'Sold out'}
        </Button>
      </div>
    </Card>
  );
};

