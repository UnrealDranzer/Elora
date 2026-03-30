import { Router } from 'express';

import { adminAuthRouter } from '@/modules/adminAuth/adminAuth.routes.js';
import { analyticsRouter } from '@/modules/analytics/analytics.routes.js';
import { authRouter } from '@/modules/auth/auth.routes.js';
import { cartRouter } from '@/modules/cart/cart.routes.js';
import {
  adminCategoriesRouter,
  categoriesRouter
} from '@/modules/categories/categories.routes.js';
import { checkoutRouter } from '@/modules/checkout/checkout.routes.js';
import {
  adminCollectionsRouter,
  collectionsRouter
} from '@/modules/collections/collections.routes.js';
import { adminContentRouter, contentRouter } from '@/modules/content/content.routes.js';
import { adminCouponsRouter, couponsRouter } from '@/modules/coupons/coupons.routes.js';
import { customersRouter } from '@/modules/customers/customers.routes.js';
import { inventoryRouter } from '@/modules/inventory/inventory.routes.js';
import { adminOrdersRouter, ordersRouter } from '@/modules/orders/orders.routes.js';
import { paymentsRouter } from '@/modules/payments/payments.routes.js';
import { adminProductsRouter, productsRouter } from '@/modules/products/products.routes.js';
import { uploadsRouter } from '@/modules/uploads/uploads.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/collections', collectionsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/coupons', couponsRouter);
apiRouter.use('/checkout', checkoutRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/payments', paymentsRouter);
apiRouter.use('/content', contentRouter);

apiRouter.use('/admin/auth', adminAuthRouter);
apiRouter.use('/admin/products', adminProductsRouter);
apiRouter.use('/admin/categories', adminCategoriesRouter);
apiRouter.use('/admin/collections', adminCollectionsRouter);
apiRouter.use('/admin/inventory', inventoryRouter);
apiRouter.use('/admin/orders', adminOrdersRouter);
apiRouter.use('/admin/customers', customersRouter);
apiRouter.use('/admin/coupons', adminCouponsRouter);
apiRouter.use('/admin/content', adminContentRouter);
apiRouter.use('/admin/analytics', analyticsRouter);
apiRouter.use('/admin/uploads', uploadsRouter);
