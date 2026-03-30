import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export const OrderDetailsPage = () => {
  const { id = '' } = useParams();
  const { data } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: async () => (await api.get(`/admin/orders/${id}`)).data.data.order
  });

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Order details</p>
        <h1 className="text-4xl font-bold">{data.orderNumber}</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Card className="space-y-4 p-5">
          {data.items.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-slate-500">Qty {item.quantity}</p>
              </div>
              <p>{formatCurrency(Number(item.totalPrice))}</p>
            </div>
          ))}
        </Card>
        <Card className="space-y-3 p-5">
          <div className="flex justify-between">
            <span>Status</span>
            <span>{data.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment</span>
            <span>{data.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span>{formatCurrency(Number(data.total))}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer</span>
            <span>{data.customerName}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

