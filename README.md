# interruptd.app

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/dunsinagbs-projects/v0-app-with-visuals)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/ehkswhO6tiX)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/dunsinagbs-projects/v0-app-with-visuals](https://vercel.com/dunsinagbs-projects/v0-app-with-visuals)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/ehkswhO6tiX](https://v0.app/chat/ehkswhO6tiX)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## SaaS MVP (Auth + DB + Billing)

This repo now includes the core building blocks of a functional SaaS:

- **Authentication**: email/password via NextAuth (Credentials) + Prisma adapter
- **Database**: Prisma + SQLite (swap to Postgres later by changing `DATABASE_URL`)
- **Per-user data**: patterns/defaults are stored server-side (no longer in `localStorage`)
- **Subscriptions**: Free vs Pro entitlements (with optional Stripe Checkout + webhooks)

### Local setup

1. Copy env template:

```bash
cp .env.example .env
```

2. Set at minimum:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `http://localhost:3000`)
   - `DATABASE_URL` (SQLite default is fine)

3. Install deps and migrate DB:

```bash
pnpm install
pnpm prisma migrate dev
```

4. Run:

```bash
pnpm dev
```

Then visit:
- `/auth/signup` to create an account
- `/dashboard` (protected) to use the app

### Optional Stripe wiring

Set these env vars to enable real checkout:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PRO_MONTHLY`
- `STRIPE_PRICE_ID_PRO_YEARLY`

Webhook endpoint:
- `POST /api/billing/webhook`