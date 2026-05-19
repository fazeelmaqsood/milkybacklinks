# Hostinger Node.js Web Apps — deploy settings

Use these values when importing **fazeel-chaudhary/milkybacklinks** in hPanel.

| Setting | Value |
|---------|--------|
| Node.js version | 20 or 22 |
| Root directory | `/` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Output (if asked) | standalone — use start command above |

## Environment variables

Copy from `.env.production.example`. Required:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` = `https://milkybacklinks.com`
- `NEXT_PUBLIC_SITE_URL` = `https://milkybacklinks.com`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`, `FROM_EMAIL`, `ADMIN_EMAIL`

## After deploy

1. DNS: `A` record `@` and `www` → Hostinger app IP (or use Hostinger domain connect)
2. Stripe webhook: `https://milkybacklinks.com/api/webhooks/stripe`
3. `ADMIN_EMAIL=you@domain.com npm run promote-admin` (locally with production DATABASE_URL)
