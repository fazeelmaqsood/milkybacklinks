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

echo ""
echo "Uploaded. Now SSH in and run setup:"
echo "  ssh $SSH_USER@$VPS_IP"
echo "  cd $APP_DIR && cp .env.production.example .env && nano .env"
echo "  bash scripts/vps-setup.sh"
echo ""
echo "Nginx + SSL:"
echo "  sudo cp deploy/nginx-milkybacklinks.conf /etc/nginx/sites-available/milkybacklinks"
echo "  sudo ln -sf /etc/nginx/sites-available/milkybacklinks /etc/nginx/sites-enabled/"
echo "  sudo nginx -t && sudo systemctl reload nginx"
echo "  sudo certbot --nginx -d milkybacklinks.com -d www.milkybacklinks.com"
