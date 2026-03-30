# Testing Checklist

## Backend

- Auth register/login/refresh/logout works for customers.
- Admin login/refresh/logout works only for admin users.
- Public product listing, product details, featured products, collections, and content APIs return expected data.
- Cart works for guest and authenticated users.
- Coupon validation rejects expired or invalid coupons.
- Checkout creates pending orders with server-side totals.
- Razorpay order creation uses backend totals only.
- Razorpay verification marks orders paid only after backend signature verification.
- COD flow finalizes orders without trusting frontend totals.
- Low stock and inventory update flows create inventory logs.
- Order status changes create status logs and audit logs.

## Storefront

- Home loads banners, featured products, and collections.
- Shop search and sorting update product results.
- Product page add-to-cart works on mobile and desktop.
- Cart quantity changes and item removal sync with backend.
- Checkout validates address and payment method.
- Order success page receives the correct order number.
- Track order works with a valid order number.
- Login and account order history work.

## Admin

- Admin guard blocks unauthenticated routes.
- Dashboard summary loads.
- Product creation and editing work.
- Inventory list shows available and reserved stock.
- Orders list and detail pages load.
- Discounts page creates a coupon.
- Content page creates a banner.
- Analytics page loads revenue and top products.

