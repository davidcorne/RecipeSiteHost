#!/usr/bin/env bash
set -e

site_location="/home/pi/Development/RecipeSiteHost/RecipeSite"

update_dependencies() {
    echo "Updating site dependencies"
    cd "$site_location" && npm ci --omit=dev
}

update_dependencies
ENVIRONMENT="production"
LOG_LEVEL="debug"
export ENVIRONMENT
export LOG_LEVEL
cd "$site_location" && node server.js
