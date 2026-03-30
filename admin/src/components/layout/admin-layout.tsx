import { BarChart3, Boxes, LayoutGrid, Package, Percent, Settings, ShoppingCart, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/discounts', label: 'Discounts', icon: Percent },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/content', label: 'Content', icon: Settings }
];

export const AdminLayout = () => (
  <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
    <aside className="border-b border-border bg-primary px-4 py-6 text-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <p className="text-sm uppercase tracking-[0.2em] text-white/70">Elora Admin</p>
      <p className="mt-2 text-2xl font-bold">Operations</p>
      <nav className="mt-8 grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
    <main className="p-4 sm:p-6 lg:p-8">
      <Outlet />
    </main>
  </div>
);
