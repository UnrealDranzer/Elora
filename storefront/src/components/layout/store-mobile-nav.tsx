import { Home, Search, ShoppingBag, Sparkles, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/shop', label: 'Shop', icon: Sparkles },
  { to: '/track-order', label: 'Search', icon: Search },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/account', label: 'Account', icon: User }
];

export const MobileBottomNav = () => (
  <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
    <div className="mx-auto flex max-w-md items-center justify-between">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex min-w-[64px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs ${
                isActive ? 'bg-accent text-foreground' : 'text-muted-foreground'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </div>
  </nav>
);

