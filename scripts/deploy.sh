#!/bin/bash

# ============================================
# Deploy Script - Pull Code & Purge Cache
# ============================================

echo "🚀 Starting deployment..."
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to project directory
cd "$PROJECT_DIR"

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed!"
    exit 1
fi

echo ""

# Purge CloudFlare cache
"$SCRIPT_DIR/purge-cache.sh"

echo ""
echo "🎉 Deployment complete!"
echo "   Users will now see the latest version of your website."
