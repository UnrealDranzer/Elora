# Local Database Setup

The codebase is ready, but this machine does not currently have a running PostgreSQL instance on `localhost:5432`.

## Option 1: Install PostgreSQL natively on Windows

1. Install PostgreSQL 15 or newer.
2. Create:
   - database: `elora`
   - username: `postgres`
   - password: `postgres`
3. Keep port `5432`.
4. Then run:

```bash
npm --workspace backend run prisma:deploy
npm --workspace backend run prisma:seed
```

## Option 2: Install Docker Desktop

1. Install Docker Desktop.
2. From the repo root run:

```bash
npm run db:up
npm run db:logs
```

3. Then apply Prisma:

```bash
npm --workspace backend run prisma:deploy
npm --workspace backend run prisma:seed
```

## Option 3: Use Neon instead of local PostgreSQL

1. Create a Neon database.
2. Replace `DATABASE_URL` in [backend/.env](/C:/Users/ADARSH/OneDrive/Documents/New%20project/backend/.env).
3. Then run:

```bash
npm --workspace backend run prisma:deploy
npm --workspace backend run prisma:seed
```

## After the database is ready

Run the apps:

```bash
npm run dev:backend
npm run dev:storefront
npm run dev:admin
```
