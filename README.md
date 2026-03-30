# Elora Commerce Platform

Production-oriented monorepo for the Elora beauty brand storefront, admin console, and backend API.

## Apps

- `backend` - Express + Prisma + PostgreSQL API
- `storefront` - customer-facing React storefront
- `admin` - Shopify-inspired React admin console

## Quick start

1. Install dependencies from the repo root:

```bash
npm install
```

2. Copy env files:

```bash
cp backend/.env.example backend/.env
cp storefront/.env.example storefront/.env
cp admin/.env.example admin/.env
```

3. Start PostgreSQL locally:

```bash
npm run db:up
```

4. Run Prisma:

```bash
npm --workspace backend run prisma:generate
npm --workspace backend run prisma:deploy
npm --workspace backend run prisma:seed
```

5. Start each app:

```bash
npm run dev:backend
npm run dev:storefront
npm run dev:admin
```

Detailed setup and deployment guidance lives in [docs/deployment.md](/C:/Users/ADARSH/OneDrive/Documents/New%20project/docs/deployment.md).
