import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { StoreLayout } from '@/components/layout/store-layout';
import { AccountPage } from '@/pages/account-page';
import { CartPage } from '@/pages/cart-page';
import { CheckoutPage } from '@/pages/checkout-page';
import { HomePage } from '@/pages/home-page';
import { LoginPage } from '@/pages/login-page';
import { OrderSuccessPage } from '@/pages/order-success-page';
import { ProductDetailsPage } from '@/pages/product-details-page';
import { ShopPage } from '@/pages/shop-page';
import { TrackOrderPage } from '@/pages/track-order-page';
import { authStore } from '@/store/auth-store';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isReady = authStore((state) => state.isReady);
  const user = authStore((state) => state.user);

  if (!isReady) {
    return <div className="py-20 text-center text-sm text-muted-foreground">Loading account...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:slug" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
