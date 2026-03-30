import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

type OrderSummaryProps = {
  subtotal: number;
  discount?: number;
  shipping?: number;
  total?: number;
  ctaLabel?: string;
  onCtaClick?: () => void;
  disabled?: boolean;
};

export const OrderSummary = ({
  subtotal,
  discount = 0,
  shipping = 0,
  total = subtotal - discount + shipping,
  ctaLabel,
  onCtaClick,
  disabled
}: OrderSummaryProps) => (
  <Card className="space-y-4 p-5">
    <p className="font-display text-3xl">Order Summary</p>
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Discount</span>
        <span>- {formatCurrency(discount)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span>{shipping ? formatCurrency(shipping) : 'Free'}</span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
    {ctaLabel ? (
      <Button className="w-full" disabled={disabled} onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    ) : null}
  </Card>
);
