import { useQuery } from '@tanstack/react-query';

import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export const AnalyticsPage = () => {
  const { data: revenue } = useQuery({
    queryKey: ['revenue'],
    queryFn: async () => (await api.get('/admin/analytics/revenue', { params: { range: '90d' } })).data.data
  });
  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => (await api.get('/admin/analytics/top-products', { params: { range: '30d' } })).data.data.products
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Analytics</p>
        <h1 className="text-4xl font-bold">Performance insights</h1>
      </div>
      <Card className="grid gap-4 p-5 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-2 text-2xl font-semibold">{formatCurrency(revenue?.totalRevenue ?? 0)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Orders</p>
          <p className="mt-2 text-2xl font-semibold">{revenue?.totalOrders ?? 0}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">New customers</p>
          <p className="mt-2 text-2xl font-semibold">{revenue?.newCustomers ?? 0}</p>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {topProducts?.map((product: any) => (
          <Card key={`${product.productId}-${product.productName}`} className="space-y-2 p-5">
            <p className="font-semibold">{product.productName}</p>
            <p className="text-sm text-slate-500">{product._sum.quantity} units sold</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

