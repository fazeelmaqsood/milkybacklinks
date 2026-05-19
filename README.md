# MilkyBacklinks

Digital PR and link-building platform — marketing site, lead capture, Stripe checkout, client dashboard, and admin panel.

## Stack

- Next.js 16, React 19, Tailwind 4
- Neon Postgres + Drizzle ORM
- Better Auth
- Stripe Checkout + webhooks
- Resend (transactional email)

## Local development

```bash
cp .env.example .env.local
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, Stripe, Resend
npm install
npm run db:push
npm run dev
```

## Deploy on Hostinger Node.js Web Apps

1. Import this repo from GitHub in hPanel → **Node.js Web Apps**
2. **Node.js 20+** · Install: `npm ci` · Build: `npm run build` · Start: `npm run start`
3. Set environment variables (see `.env.production.example`)
4. Attach domain `milkybacklinks.com` and enable SSL

See [DEPLOY-HOSTINGER.md](./DEPLOY-HOSTINGER.md) for full details (VPS and Node.js options).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:push` | Sync schema to Neon |
| `npm run promote-admin` | Promote user to admin by email |
