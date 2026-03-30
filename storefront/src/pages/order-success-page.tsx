import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="mx-auto max-w-2xl py-12">
      <Card className="space-y-5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Order confirmed</p>
        <h1 className="font-display text-5xl">Thank you for shopping with Elora.</h1>
        <p className="text-sm text-muted-foreground">
          Your order <span className="font-semibold text-foreground">{orderNumber}</span> is confirmed and will be prepared shortly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={`/track-order?orderNumber=${orderNumber}`}>
            <Button>Track order</Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">Continue shopping</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

