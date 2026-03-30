import { Outlet } from 'react-router-dom';

import { Footer } from './store-footer';
import { Header } from './store-header';
import { MobileBottomNav } from './store-mobile-nav';

export const StoreLayout = () => (
  <div className="min-h-screen">
    <Header />
    <main className="page-shell">
      <Outlet />
    </main>
    <Footer />
    <MobileBottomNav />
  </div>
);

