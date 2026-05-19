#!/usr/bin/env bash
# Run ON the VPS after code is in /var/www/milkybacklinks
set -euo pipefail

export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

APP_DIR="/var/www/milkybacklinks"
cd "$APP_DIR"

if [ ! -f .env ]; then
  echo "ERROR: Create $APP_DIR/.env first (copy from .env.production.example)"
  exit 1
fi

mkdir -p logs

echo "==> Node $(node -v)"
echo "==> Installing dependencies..."
npm ci

echo "==> Building..."
npm run build

echo "==> Copying static assets for standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "==> Starting with PM2..."
pm2 delete milkybacklinks 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "Done. App listens on port 3001."
echo "pm2 logs milkybacklinks"
