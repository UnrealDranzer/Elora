import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '@/components/layout/admin-layout';
import { AnalyticsPage } from '@/pages/analytics-page';
import { ContentPage } from '@/pages/content-page';
import { CustomersPage } from '@/pages/customers-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { DiscountsPage } from '@/pages/discounts-page';
import { InventoryPage } from '@/pages/inventory-page';
import { LoginPage } from '@/pages/login-page';
import { OrderDetailsPage } from '@/pages/order-details-page';
import { OrdersPage } from '@/pages/orders-page';
import { ProductFormPage } from '@/pages/product-form-page';
import { ProductsPage } from '@/pages/products-page';
import { adminAuthStore } from '@/store/auth-store';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isReady = adminAuthStore((state) => state.isReady);
  const user = adminAuthStore((state) => state.user);

  if (!isReady) {
    return <div className="p-12 text-center text-sm text-slate-500">Loading admin session...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export const AdminRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id/edit" element={<ProductFormPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/discounts" element={<DiscountsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/content" element={<ContentPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

