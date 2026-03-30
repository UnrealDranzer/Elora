import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { authStore } from '@/store/auth-store';

import { api } from '@/lib/api';

export const AccountPage = () => {
  const user = authStore((state) => state.user)!;
  const logout = authStore((state) => state.logout);
  const { data } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => (await api.get('/orders/my-orders')).data.data.orders
  });

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Account</p>
          <h1 className="font-display text-5xl">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={() => void logout()}>
          Logout
        </Button>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-4xl">Recent orders</h2>
        <div className="space-y-4">
          {data?.map((order: any) => (
            <Card key={order.id} className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="font-semibold">{formatCurrency(order.total)}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{order.status}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
