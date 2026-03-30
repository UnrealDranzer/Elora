# Security Hardening Checklist

## Implemented in code

- Zod validation on request bodies, params, and query strings.
- Prisma-only database access with no raw SQL interpolation.
- bcrypt password hashing.
- Access token plus refresh token rotation.
- HTTP-only secure cookies for refresh and guest cart tokens.
- Role-based route protection for admin endpoints.
- Helmet, CORS allowlist, and rate limiting.
- Backend-only Razorpay signature verification.
- Transaction-safe stock reservation and order finalization flow.
- Audit logs for admin mutations.
- File upload size/type restrictions plus binary signature checks.

## Add before production launch

- Add WAF and bot protection in front of the API.
- Add secret rotation runbooks for JWT, Razorpay, and Cloudinary credentials.
- Add centralized logging with alerting on auth failures and payment verification errors.
- Add background cleanup job for long-expired pending orders.
- Add webhook ingestion for Razorpay payment reconciliation.
- Add SAST, dependency scanning, and container or build image scanning in CI.
- Add backup verification drills for Neon/Postgres.
- Add CSP headers at the frontend edge tuned for Razorpay and Cloudinary.
- Add abuse monitoring on auth, coupon validation, checkout, and uploads.
