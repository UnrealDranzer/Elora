import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export const DashboardPage = () => {
  const { data: summary } = useQuery({
    queryKey: ['analytics-summary'],
    queryFn: async () => (await api.get('/admin/analytics/summary')).data.data
  });
  const { data: sales } = useQuery({
    queryKey: ['analytics-sales'],
    queryFn: async () => (await api.get('/admin/analytics/sales', { params: { range: '30d' } })).data.data.sales
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Dashboard</p>
        <h1 className="text-4xl font-bold">Business overview</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Revenue', formatCurrency(summary?.totalRevenue ?? 0)],
          ['Orders', summary?.totalOrders ?? 0],
          ['Units sold', summary?.unitsSold ?? 0],
          ['AOV', formatCurrency(summary?.averageOrderValue ?? 0)]
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="p-5">
          <p className="text-sm font-semibold">Sales trend</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sales ?? []}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#24356d" fill="#9aa9d6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold">Low stock</p>
          <div className="mt-4 space-y-3">
            {summary?.lowStockProducts?.slice(0, 6).map((product: any) => (
              <div key={product.id} className="rounded-xl bg-slate-50 p-3">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-slate-500">{product.availableStock} units left</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

