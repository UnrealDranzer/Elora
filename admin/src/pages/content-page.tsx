import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export const ContentPage = () => {
  const { data, refetch } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => (await api.get('/admin/content/banners')).data.data.banners
  });
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    placement: 'HERO'
  });

  const createBanner = async () => {
    await api.post('/admin/content/banners', form);
    setForm({ title: '', imageUrl: '', placement: 'HERO' });
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Content</p>
        <h1 className="text-4xl font-bold">Banners & homepage content</h1>
      </div>
      <Card className="grid gap-4 p-5 md:grid-cols-4">
        <Input placeholder="Banner title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <Input placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
        <select className="h-10 rounded-xl border border-border bg-white px-3 text-sm" value={form.placement} onChange={(event) => setForm({ ...form, placement: event.target.value })}>
          <option value="HERO">Hero</option>
          <option value="PROMO">Promo</option>
          <option value="COLLECTION">Collection</option>
          <option value="FEATURED">Featured</option>
        </select>
        <Button onClick={createBanner}>Add banner</Button>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((banner: any) => (
          <Card key={banner.id} className="space-y-3 p-5">
            <p className="font-semibold">{banner.title}</p>
            <p className="text-sm text-slate-500">{banner.placement}</p>
            <p className="truncate text-xs text-slate-400">{banner.imageUrl}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
