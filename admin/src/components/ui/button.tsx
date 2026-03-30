import * as React from 'react';

import { cn } from '@/lib/utils';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }
>(({ className, variant = 'default', ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition disabled:opacity-50',
      variant === 'default'
        ? 'bg-primary text-primary-foreground hover:opacity-90'
        : 'border border-border bg-white hover:bg-muted',
      className
    )}
    {...props}
  />
));

Button.displayName = 'Button';

