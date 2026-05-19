# Deploy MilkyBacklinks on Hostinger

This app is a **Next.js 16** full-stack site (API routes, auth, Stripe webhooks). You need **Hostinger Node.js Web Apps** (Business/Cloud) or a **VPS** — not plain PHP shared hosting.

---

## Before you deploy

- [ ] Domain pointed to Hostinger (A record or nameservers)
- [ ] Code pushed to **GitHub** (private repo is fine)
- [ ] Neon `DATABASE_URL` (production branch recommended)
- [ ] `npm run db:push` already run against that database
- [ ] Stripe **live** keys + production webhook
- [ ] Resend domain verified + `FROM_EMAIL` on your domain
- [ ] Replace `https://yourdomain.com` below with your real domain

---

## Option A — Hostinger Node.js Web Apps (recommended)

Available on **Business Web Hosting** and **Cloud** plans with Node.js support.

### 1. Push code to GitHub

```bash
git add .
git commit -m "Prepare for Hostinger deployment"
git push origin main
```

### 2. Create the app in hPanel

1. Log in to **hPanel** → **Websites** → your site  
2. Open **Node.js Web Apps** (or **Advanced** → **Node.js**)  
3. **Create application** → **Import from GitHub**  
4. Authorize GitHub and select the `blinking` repository  
5. Branch: `main`

### 3. Build settings

| Setting | Value |
|---------|--------|
| **Node.js version** | `20` or `22` |
| **Root directory** | `/` (project root) |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |

Hostinger sets `PORT` automatically; `package.json` uses it.

### 4. Environment variables (hPanel → Environment)

Add every variable below (no quotes in hPanel unless the UI requires them):

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<same as local or new openssl rand -base64 32>
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

RESEND_API_KEY=re_...
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=you@yourdomain.com

NODE_ENV=production
```

Optional:

```env
NEXT_PUBLIC_SUPPORT_EMAIL=hello@yourdomain.com
```

### 5. Deploy

Click **Deploy** / **Rebuild**. First build can take 3–5 minutes.

### 6. Connect your domain

In the Node.js app settings, attach your domain (e.g. `milkybacklinks.com` and `www`). Enable **SSL** (Let’s Encrypt) in hPanel.

### 7. Stripe webhook (production)

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**  
2. **Add endpoint**: `https://yourdomain.com/api/webhooks/stripe`  
3. Event: `checkout.session.completed`  
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET` in Hostinger env → **redeploy**

Do **not** use `stripe listen` in production.

### 8. Admin user on production DB

From your computer (with production `DATABASE_URL` in env, one time):

```bash
ADMIN_EMAIL=you@yourdomain.com npm run promote-admin
```

Or sign up at `https://yourdomain.com/login` then promote via Neon SQL (see `scripts/promote-admin.ts`).

---

## Option B — Hostinger VPS (manual)

Use if you have a **VPS** (Ubuntu), not shared hosting.

### 1. Server setup (SSH)

```bash
# Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# PM2
sudo npm install -g pm2
```

### 2. Clone and build

```bash
sudo mkdir -p /var/www/blinking
sudo chown $USER:$USER /var/www/blinking
cd /var/www/blinking
git clone https://github.com/YOUR_USER/blinking.git .
cp .env.example .env
nano .env   # paste all production env vars
npm ci
npm run build
```

### 3. Start with PM2

```bash
PORT=3000 pm2 start npm --name blinking -- start
pm2 save
pm2 startup
```

### 4. Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. Updates

```bash
cd /var/www/blinking
git pull
npm ci
npm run build
pm2 restart blinking
```

---

## Production checklist

| Test | URL |
|------|-----|
| Home loads | `/` |
| Login / signup | `/login` |
| Get started form | `/get-started` |
| Stripe checkout (live test mode first) | form → pay |
| Webhook creates campaign | Stripe → webhook logs 200 |
| Client dashboard | `/dashboard` |
| Admin | `/admin` |
| Emails | form submit + payment |

---

## Common issues

| Problem | Fix |
|---------|-----|
| Build fails on Hostinger | Check Node 20+, run `npm run build` locally first |
| 502 / app not starting | Verify start command `npm run start`, check logs in hPanel |
| Auth cookies not working | `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` must match live URL exactly (https) |
| Stripe webhook fails | URL must be public HTTPS; check `STRIPE_WEBHOOK_SECRET` |
| Emails not sent | Verify domain in Resend; `FROM_EMAIL` must use that domain |
| “No campaign” after pay | Webhook URL wrong or secret mismatch |

---

## What stays on external services

| Service | Role |
|---------|------|
| **Neon** | Postgres database (not on Hostinger) |
| **Stripe** | Payments |
| **Resend** | Email |

Hostinger only runs the Next.js app.
