import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { OrderSummary } from '@/components/cart/order-summary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { cartStore } from '@/store/cart-store';

export const CartPage = () => {
  const { cart, updateItem, removeItem } = cartStore();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Cart</p>
          <h1 className="font-display text-5xl">Your beauty bag</h1>
        </div>
        {cart.items.length === 0 ? (
          <Card className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">Your cart is empty. Start with our best sellers.</p>
            <Link to="/shop">
              <Button>Continue shopping</Button>
            </Link>
          </Card>
        ) : (
          cart.items.map((item) => (
            <Card key={item.id} className="flex gap-4 p-4">
              <div className="h-24 w-20 overflow-hidden rounded-2xl bg-accent/60">
                {item.product.primaryImage ? (
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.unitPrice)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button className="px-3 py-2" onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm">{item.quantity}</span>
                    <button className="px-3 py-2" onClick={() => updateItem(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.lineTotal)}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <OrderSummary
        subtotal={cart.subtotal}
        ctaLabel="Proceed to checkout"
        onCtaClick={() => {
          window.location.href = '/checkout';
        }}
        disabled={cart.items.length === 0}
      />
    </div>
  );
};

