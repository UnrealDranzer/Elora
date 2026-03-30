import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export const ShopPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const query = useMemo(() => ({ search, sort }), [search, sort]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', query],
    queryFn: async () => (await api.get('/products', { params: query })).data.data
  });

  return (
    <div className="space-y-6">
      <Card className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Shop</p>
          <h1 className="font-display text-5xl">Build your ritual</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-11 rounded-2xl border border-border bg-white px-4 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to high</option>
            <option value="price_desc">Price: High to low</option>
            <option value="best_sellers">Best sellers</option>
          </select>
        </div>
      </Card>

      {isLoading ? <p className="text-sm text-muted-foreground">Loading products...</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.items?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data?.pagination?.page < data?.pagination?.totalPages ? (
        <div className="flex justify-center">
          <Button variant="outline">More products in production feed</Button>
        </div>
      ) : null}
    </div>
  );
};

