import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<any>({
    name: '',
    sku: '',
    categoryId: '',
    price: 0,
    stockQuantity: 0,
    lowStockThreshold: 5,
    status: 'DRAFT'
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => (await api.get('/admin/categories')).data.data.categories
  });
  const { data: products } = useQuery({
    queryKey: ['admin-product-list'],
    queryFn: async () => (await api.get('/admin/products')).data.data.items
  });

  useEffect(() => {
    if (id && products) {
      const product = products.find((item: any) => item.id === id);
      if (product) {
        setForm({
          ...product,
          categoryId: product.categoryId ?? product.category?.id ?? ''
        });
      }
    }
  }, [id, products]);

  const save = async () => {
    if (id) {
      await api.patch(`/admin/products/${id}`, form);
    } else {
      await api.post('/admin/products', form);
    }
    navigate('/products');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Products</p>
        <h1 className="text-4xl font-bold">{id ? 'Edit product' : 'Add product'}</h1>
      </div>
      <Card className="grid gap-4 p-5 md:grid-cols-2">
        {[
          ['name', 'Product name'],
          ['sku', 'SKU'],
          ['price', 'Price'],
          ['stockQuantity', 'Initial stock'],
          ['lowStockThreshold', 'Low stock threshold']
        ].map(([key, label]) => (
          <div key={key}>
            <p className="mb-2 text-sm text-slate-500">{label}</p>
            <Input
              value={form[key]}
              onChange={(event) =>
                setForm({
                  ...form,
                  [key]: ['price', 'stockQuantity', 'lowStockThreshold'].includes(key)
                    ? Number(event.target.value)
                    : event.target.value
                })
              }
            />
          </div>
        ))}
        <div>
          <p className="mb-2 text-sm text-slate-500">Category</p>
          <select
            className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm"
            value={form.categoryId}
            onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
          >
            <option value="">Select category</option>
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-500">Status</p>
          <select
            className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </Card>
      <Button onClick={save}>{id ? 'Update product' : 'Create product'}</Button>
    </div>
  );
};

