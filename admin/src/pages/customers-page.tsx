import { useQuery } from '@tanstack/react-query';

import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

export const CustomersPage = () => {
  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => (await api.get('/admin/customers')).data.data.customers
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Customers</p>
        <h1 className="text-4xl font-bold">Customer base</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((customer: any) => (
          <Card key={customer.id} className="space-y-2 p-5">
            <p className="font-semibold">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-sm text-slate-500">{customer.email}</p>
            <p className="text-sm text-slate-500">{customer.orders.length} orders</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

