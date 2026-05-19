# MilkyBacklinks — Deployment Guide

## Quick Start (Local Dev)

```bash
cp .env.example .env.local
# Fill in DATABASE_URL + BETTER_AUTH_SECRET at minimum
npm run dev
```

---

## 1. Neon Database Setup

1. Go to https://console.neon.tech and create a project
2. Copy the **Connection string** (postgresql://...)
3. Add to `.env.local` as `DATABASE_URL=...`
4. Run migrations:

```bash
npm run db:push
# OR for production migrations:
npm run db:generate && npm run db:migrate
```

---

## 2. Better Auth Setup

```bash
# Generate a secure secret
openssl rand -base64 32
```

Set in `.env.local`:
```
BETTER_AUTH_SECRET=<generated-secret>
BETTER_AUTH_URL=http://localhost:3000  # production: https://yourdomain.com
```

---

## 3. Stripe Setup

1. Create account at https://stripe.com
2. Go to Dashboard → Developers → API Keys
3. Copy **Secret key** → `STRIPE_SECRET_KEY`
4. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Create the product:
- Products → Add product
- Name: `Digital PR Starter Campaign`
- Price: `$500` → One time
- Copy the **Price ID** (starts with `price_`) → `STRIPE_PRICE_ID`

### Webhook (local testing):
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the webhook signing secret → STRIPE_WEBHOOK_SECRET
```

### Webhook (production):
- Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Event: `checkout.session.completed`
- Copy signing secret → `STRIPE_WEBHOOK_SECRET`

---

## 4. Resend Email Setup

1. Create account at https://resend.com
2. Verify your sending domain
3. Create an API key → `RESEND_API_KEY`
4. Set `FROM_EMAIL=noreply@yourdomain.com` (must be verified)
5. Set `ADMIN_EMAIL=you@yourdomain.com`

---

## 5. Vercel Deployment

```bash
# Push to GitHub first
git add .
git commit -m "Initial platform build"
git push origin main
```

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables from `.env.example`
4. Deploy

Production environment variables to add in Vercel:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` = `https://yourdomain.com`
- `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `ADMIN_EMAIL`

---

## 6. Create First Admin User

### Option A: Script
```bash
ADMIN_EMAIL=you@domain.com ADMIN_PASSWORD=SecurePass123 npm run create-admin
```

### Option B: Manual SQL (after registering normally at /login)

1. Register at `/login` → Sign up with your email
2. Note your user ID from the database
3. Run in Neon SQL editor:

```sql
INSERT INTO profiles (id, user_id, full_name, email, role, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,
  '<your-user-id>',
  'Admin',
  'you@domain.com',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();
```

---

## 7. Testing Checklist

| Test | How |
|------|-----|
| Homepage loads | Visit `/` |
| Pricing shows $500 | Visit `/pricing` |
| Form validates | Visit `/get-started`, submit empty |
| Lead saves to DB | Submit form, check Neon `leads` table |
| Stripe checkout opens | Complete form with valid data |
| Stripe webhook fires locally | `stripe listen --forward-to localhost:3000/api/webhooks/stripe` |
| Payment creates campaign | Check `campaigns` table after payment |
| Client can login | Login at `/login` |
| Client sees only own data | Dashboard should only show their campaign |
| Admin login works | Login with admin account, visit `/admin` |
| Admin can update campaigns | `/admin/campaigns` → edit a campaign |
| Admin can add backlinks | `/admin/backlinks` → add backlink |
| Admin can create reports | `/admin/reports` → create report |
| Client sees backlinks/reports | Login as client, check dashboard |
| Unauthorized access blocked | Visit `/admin` without login |

---

## 8. Drizzle Commands

```bash
# Push schema to DB (development)
npm run db:push

# Generate SQL migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (visual DB browser)
npm run db:studio
```

---

## Known Limitations

- No email verification (disabled in Better Auth config for simplicity)
- No password reset flow (can be added via Better Auth plugins)
- Admin user must be created manually via script or SQL
- Clients must log in manually after payment (no auto-login after Stripe)
- Campaign is linked to profile/client manually by admin (or via webhook)

## Suggested Next Improvements

- Add email verification on signup
- Add password reset flow
- Auto-link campaign to client account after Stripe payment (match by email)
- Add client registration page
- Add Stripe Customer Portal for payment management
- Add campaign file attachments
- Add email notification when campaign stage changes
- Add domain analytics integration (Ahrefs/Moz API)
