import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cartStore } from '@/store/cart-store';

export const Header = () => {
  const itemCount = cartStore((state) => state.cart.itemCount);

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-3xl font-semibold tracking-[0.12em]">
          ELORA
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/" className="text-muted-foreground transition hover:text-foreground">
            Home
          </NavLink>
          <NavLink to="/shop" className="text-muted-foreground transition hover:text-foreground">
            Shop
          </NavLink>
          <NavLink
            to="/track-order"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Track Order
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="outline" size="sm" className="rounded-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Cart
            </Button>
            {itemCount > 0 ? (
              <Badge className="absolute -right-2 -top-2 min-w-6 justify-center bg-primary text-primary-foreground">
                {itemCount}
              </Badge>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
};

