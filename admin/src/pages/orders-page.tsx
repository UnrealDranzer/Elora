import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export const OrdersPage = () => {
  const { data } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => (await api.get('/admin/orders')).data.data
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Orders</p>
        <h1 className="text-4xl font-bold">Fulfillment queue</h1>
      </div>
      <Card className="overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((order: any) => (
              <tr key={order.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                <td className="px-4 py-3 text-slate-500">{order.customerName}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{order.paymentStatus}</td>
                <td className="px-4 py-3">{formatCurrency(Number(order.total))}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/orders/${order.id}`}>
                    <Button variant="outline">View</Button>
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

