import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { adminAuthStore } from '@/store/auth-store';

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = adminAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 p-6">
      <Card className="w-full max-w-4xl overflow-hidden rounded-[2rem] border-slate-800 bg-slate-900 text-white lg:grid lg:grid-cols-2">
        <div className="space-y-5 p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Secure admin access</p>
          <h1 className="text-4xl font-bold">Elora control room</h1>
          <div className="space-y-4">
            <Input className="border-slate-700 bg-slate-950 text-white" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <Input className="border-slate-700 bg-slate-950 text-white" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </div>
        <div className="bg-[linear-gradient(160deg,rgba(59,74,132,0.95),rgba(23,29,52,1))] p-8 lg:p-10">
          <p className="text-3xl font-semibold">Revenue, stock, orders, and content in one place.</p>
          <p className="mt-4 text-sm text-slate-300">
            Built for fast merchandising decisions, secure admin workflows, and a cleaner launch
            path to production.
          </p>
        </div>
      </Card>
    </div>
  );
};

