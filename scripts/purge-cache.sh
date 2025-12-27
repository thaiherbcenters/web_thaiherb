#!/bin/bash

# ============================================
# CloudFlare Cache Purge Script
# ============================================

# CloudFlare Credentials
CF_API_TOKEN="7lWwMU0OP20MEia85gSXMAspil4qvn26eDiyZWYc"
CF_ZONE_ID="e35627f216b5f2a25bc05a371a1a09db"

echo "🗑️  Purging CloudFlare cache..."

# Purge all cache
RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')

# Check if successful
if echo "$RESPONSE" | grep -q '"success": true'; then
    echo "✅ CloudFlare cache purged successfully!"
else
    echo "❌ Failed to purge cache:"
    echo "$RESPONSE"
fi
