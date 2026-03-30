import { useQuery } from '@tanstack/react-query';

import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

export const InventoryPage = () => {
  const { data } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => (await api.get('/admin/inventory')).data.data
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Inventory</p>
        <h1 className="text-4xl font-bold">Stock management</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.items?.map((product: any) => (
          <Card key={product.id} className="space-y-2 p-5">
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-slate-500">{product.category.name}</p>
            <div className="flex justify-between text-sm">
              <span>Available</span>
              <span>{product.availableStock}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Reserved</span>
              <span>{product.reservedQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Low stock threshold</span>
              <span>{product.lowStockThreshold}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

