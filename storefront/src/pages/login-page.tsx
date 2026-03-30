import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authStore } from '@/store/auth-store';

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = authStore((state) => state.login);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(form);
      navigate('/account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Welcome back</p>
        <h1 className="mt-3 font-display text-5xl">Sign in to reorder faster.</h1>
        <div className="mt-8 space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Email</p>
            <Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Password</p>
            <Input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </Card>
      <Card className="bg-[linear-gradient(160deg,rgba(230,197,166,0.88),rgba(255,247,240,0.95))] p-8">
        <p className="font-display text-5xl">Your routine, remembered.</p>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          Access order history, saved details, and quick checkout for your next Elora restock.
        </p>
      </Card>
    </div>
  );
};

