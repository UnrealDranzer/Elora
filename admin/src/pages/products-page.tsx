import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export const ProductsPage = () => {
  const { data } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => (await api.get('/admin/products')).data.data
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Products</p>
          <h1 className="text-4xl font-bold">Catalog</h1>
        </div>
        <Link to="/products/new">
          <Button>Add product</Button>
        </Link>
      </div>
      <Card className="overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((product: any) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-slate-500">{product.category.name}</td>
                <td className="px-4 py-3">{formatCurrency(Number(product.price))}</td>
                <td className="px-4 py-3">{product.availableStock}</td>
                <td className="px-4 py-3">{product.status}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/products/${product.id}/edit`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

