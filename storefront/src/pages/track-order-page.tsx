import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export const TrackOrderPage = () => {
  const [params] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(params.get('orderNumber') ?? '');
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async (value: string) => {
    if (!value) return;
    const response = await api.get(`/orders/track/${value}`);
    setOrder(response.data.data.order);
  };

  useEffect(() => {
    if (orderNumber) {
      void fetchOrder(orderNumber);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Track order</p>
        <h1 className="font-display text-5xl">Stay updated on your delivery.</h1>
      </div>
      <Card className="flex gap-3 p-5">
        <Input value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} placeholder="ELR-XXXXXXXX" />
        <Button onClick={() => fetchOrder(orderNumber)}>Track</Button>
      </Card>
      {order ? (
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">{order.customerName}</p>
            </div>
            <p className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              {order.status.replace('_', ' ')}
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {order.statusLogs?.map((log: any) => (
              <div key={log.id} className="flex items-center justify-between">
                <span>{log.toStatus.replace('_', ' ')}</span>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
};

