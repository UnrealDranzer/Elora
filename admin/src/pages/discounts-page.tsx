import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export const DiscountsPage = () => {
  const { data, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => (await api.get('/admin/coupons')).data.data.coupons
  });
  const [form, setForm] = useState({
    code: '',
    type: 'PERCENTAGE',
    value: 10,
    minOrderValue: 0
  });

  const createCoupon = async () => {
    await api.post('/admin/coupons', form);
    setForm({ code: '', type: 'PERCENTAGE', value: 10, minOrderValue: 0 });
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Discounts</p>
        <h1 className="text-4xl font-bold">Coupons</h1>
      </div>
      <Card className="grid gap-4 p-5 md:grid-cols-4">
        <Input placeholder="Code" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
        <select className="h-10 rounded-xl border border-border bg-white px-3 text-sm" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
          <option value="PERCENTAGE">Percentage</option>
          <option value="FIXED">Fixed</option>
        </select>
        <Input value={form.value} onChange={(event) => setForm({ ...form, value: Number(event.target.value) })} />
        <Button onClick={createCoupon}>Create coupon</Button>
      </Card>
      <Card className="overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((coupon: any) => (
              <tr key={coupon.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{coupon.code}</td>
                <td className="px-4 py-3">{coupon.type}</td>
                <td className="px-4 py-3">{coupon.value}</td>
                <td className="px-4 py-3">{coupon.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

