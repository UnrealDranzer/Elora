import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { OrderSummary } from '@/components/cart/order-summary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { authStore } from '@/store/auth-store';
import { cartStore } from '@/store/cart-store';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = cartStore();
  const user = authStore((state) => state.user);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [form, setForm] = useState({
    customerName: user ? `${user.firstName} ${user.lastName}` : '',
    customerEmail: user?.email ?? '',
    customerPhone: user?.phone ?? '',
    line1: '',
    line2: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const shipping = useMemo(() => (cart.subtotal - discount >= 999 ? 0 : 79), [cart.subtotal, discount]);
  const total = cart.subtotal - discount + shipping;

  const applyCoupon = async () => {
    if (!couponCode) return;
    const response = await api.post('/coupons/validate', {
      code: couponCode,
      subtotal: cart.subtotal,
      userId: user?.id
    });
    setDiscount(response.data.data.discountAmount);
    toast.success('Coupon applied.');
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const checkoutResponse = await api.post('/checkout/create', {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        shippingAddress: {
          line1: form.line1,
          line2: form.line2,
          landmark: form.landmark,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country
        },
        billingAddress: {
          line1: form.line1,
          line2: form.line2,
          landmark: form.landmark,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country
        },
        couponCode: couponCode || undefined,
        paymentMethod
      });

      const order = checkoutResponse.data.data.order;

      if (paymentMethod === 'COD') {
        const placed = await api.post('/checkout/place-order', { orderId: order.id });
        await fetchCart();
        navigate(`/order-success?orderNumber=${placed.data.data.order.orderNumber}`);
        return;
      }

      const paymentResponse = await api.post('/payments/razorpay/create-order', { orderId: order.id });
      const payment = paymentResponse.data.data.payment;

      const razorpay = new window.Razorpay({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency,
        order_id: payment.razorpayOrderId,
        name: 'Elora',
        description: 'Secure beauty checkout',
        handler: async (response: any) => {
          const verified = await api.post('/payments/razorpay/verify', {
            orderId: order.id,
            ...response
          });
          await fetchCart();
          navigate(`/order-success?orderNumber=${verified.data.data.order.orderNumber}`);
        },
        prefill: {
          name: form.customerName,
          email: form.customerEmail,
          contact: form.customerPhone
        },
        theme: {
          color: '#7e4e2e'
        }
      });

      razorpay.open();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Checkout</p>
          <h1 className="font-display text-5xl">Delivery details</h1>
        </div>
        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          {[
            ['customerName', 'Full name'],
            ['customerEmail', 'Email'],
            ['customerPhone', 'Phone'],
            ['line1', 'Address line 1'],
            ['line2', 'Address line 2'],
            ['landmark', 'Landmark'],
            ['city', 'City'],
            ['state', 'State'],
            ['postalCode', 'Postal code'],
            ['country', 'Country']
          ].map(([key, label]) => (
            <div key={key} className={key === 'line1' || key === 'line2' ? 'sm:col-span-2' : ''}>
              <p className="mb-2 text-sm text-muted-foreground">{label}</p>
              <Input
                value={(form as any)[key]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              />
            </div>
          ))}
        </Card>
        <Card className="space-y-4 p-5">
          <p className="text-sm font-semibold">Offers</p>
          <div className="flex gap-3">
            <Input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="Coupon code" />
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className={`rounded-2xl border p-4 text-left ${paymentMethod === 'RAZORPAY' ? 'border-primary bg-accent' : 'border-border bg-white'}`}
              onClick={() => setPaymentMethod('RAZORPAY')}
            >
              <p className="font-semibold">Razorpay</p>
              <p className="mt-1 text-sm text-muted-foreground">UPI, cards, wallets, net banking</p>
            </button>
            <button
              className={`rounded-2xl border p-4 text-left ${paymentMethod === 'COD' ? 'border-primary bg-accent' : 'border-border bg-white'}`}
              onClick={() => setPaymentMethod('COD')}
            >
              <p className="font-semibold">Cash on delivery</p>
              <p className="mt-1 text-sm text-muted-foreground">Available for select serviceable pincodes</p>
            </button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <OrderSummary
          subtotal={cart.subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
          ctaLabel={loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place order' : 'Pay securely'}
          onCtaClick={handleCheckout}
          disabled={loading || cart.items.length === 0}
        />
      </div>
    </div>
  );
};

