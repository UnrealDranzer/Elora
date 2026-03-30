# Deployment Guide

## Monorepo apps

- `storefront` -> deploy to Vercel for `www.elora.com`
- `admin` -> deploy to Vercel for `admin.elora.com`
- `backend` -> deploy to Render or Railway for `api.elora.com`
- `database` -> Neon PostgreSQL
- `media` -> Cloudinary
- `payments` -> Razorpay

## Local development

1. Install Node.js 20+ and PostgreSQL 15+.
2. Run `npm install` from the repo root.
3. Copy env files:
   - `backend/.env.example` -> `backend/.env`
   - `storefront/.env.example` -> `storefront/.env`
   - `admin/.env.example` -> `admin/.env`
4. Create the database and point `DATABASE_URL` to it.
5. Run:
   - `npm --workspace backend run prisma:generate`
   - `npm --workspace backend run prisma:migrate`
   - `npm --workspace backend run prisma:seed`
6. Start the apps:
   - `npm run dev:backend`
   - `npm run dev:storefront`
   - `npm run dev:admin`

## Backend deployment

### Render

1. Create a new Web Service from the `backend` directory.
2. Build command: `npm install && npm run build && npm run prisma:generate && npm run prisma:deploy`
3. Start command: `npm run start`
4. Add all backend environment variables.
5. Set health check path to `/health`.

### Railway

1. Create a service from `backend`.
2. Add environment variables.
3. Set build command to `npm install && npm run build && npm run prisma:generate && npm run prisma:deploy`.
4. Start with `npm run start`.

## Frontend deployment

### Vercel storefront

1. Import the repo.
2. Set root directory to `storefront`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_BASE_URL=https://api.elora.com/api/v1`

### Vercel admin

1. Import the repo again.
2. Set root directory to `admin`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_BASE_URL=https://api.elora.com/api/v1`

## Neon PostgreSQL

1. Create a Neon project and database.
2. Copy the pooled connection URL into `DATABASE_URL`.
3. Run Prisma migrations against Neon:
   - `npm --workspace backend run prisma:deploy`

## Cloudinary

1. Create a Cloudinary product environment.
2. Copy `cloud_name`, `api_key`, and `api_secret`.
3. Put them into backend env vars.
4. Use the admin upload endpoint to store banner and product images.

## Razorpay

1. Create a Razorpay account and generate `key_id` and `key_secret`.
2. Add them to backend env vars.
3. Use test mode locally and in staging.
4. Move to live keys only after end-to-end UAT on live payment rails.

## Production environment checklist

- Use distinct secrets per environment.
- Set `NODE_ENV=production`.
- Set `APP_URL`, `STORE_FRONTEND_URL`, `ADMIN_FRONTEND_URL`, and `CORS_ALLOWED_ORIGINS` to live domains.
- Set `COOKIE_DOMAIN=.elora.com` when using subdomains.
- Enforce HTTPS at the edge.
- Rotate JWT secrets before launch if any were shared during setup.

