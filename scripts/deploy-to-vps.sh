#!/usr/bin/env bash
# Run FROM your Mac — uploads project to Hostinger VPS
# Usage: ./scripts/deploy-to-vps.sh [ssh_user]
# Example: ./scripts/deploy-to-vps.sh root

set -euo pipefail

VPS_IP="${VPS_IP:-72.62.100.12}"
SSH_USER="${1:-root}"
APP_DIR="/var/www/milkybacklinks"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Deploying to $SSH_USER@$VPS_IP:$APP_DIR"

rsync -avz --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env.local \
  --exclude .env \
  "$ROOT/" "$SSH_USER@$VPS_IP:$APP_DIR/"

if [ "${SKIP_BUILD:-0}" != "1" ]; then
  echo ""
  echo "==> Building and restarting on VPS..."
  ssh "$SSH_USER@$VPS_IP" "cd $APP_DIR && bash scripts/vps-setup.sh"
fi

echo ""
echo "Deployed. App should respond on port 3001 (nginx proxies :80)."
echo ""
echo "First-time only:"
echo "  ssh $SSH_USER@$VPS_IP"
echo "  cd $APP_DIR && cp .env.production.example .env && nano .env"
echo "  sudo cp deploy/nginx-milkybacklinks.conf /etc/nginx/sites-available/milkybacklinks"
echo "  sudo ln -sf /etc/nginx/sites-available/milkybacklinks /etc/nginx/sites-enabled/"
echo "  sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "After DNS A record points to $VPS_IP:"
echo "  sudo certbot --nginx -d milkybacklinks.com -d www.milkybacklinks.com"
