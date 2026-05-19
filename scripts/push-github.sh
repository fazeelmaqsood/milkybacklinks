#!/usr/bin/env bash
# Create github.com/fazeel-chaudhary/milkybacklinks and push main
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  echo "  gh auth login"
  echo "Then run this script again."
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Pushing to existing origin..."
  git push -u origin main
else
  gh repo create fazeel-chaudhary/milkybacklinks \
    --public \
    --description "MilkyBacklinks - Digital PR & link building platform" \
    --source=. \
    --remote=origin \
    --push
fi

echo ""
echo "Done: https://github.com/fazeel-chaudhary/milkybacklinks"
