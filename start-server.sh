#!/usr/bin/env bash
set -e

# Need to get the nvm command
source /home/pi/.nvm/nvm.sh

site_location="/home/pi/Development/RecipeSiteHost/RecipeSite"

update_repository() {
    echo "Updating RecipeSite repo"
    cd "$site_location" && git pull https://github.com/davidcorne/RecipeSite.git main
}

update_dependencies() {
    echo "Updating site dependencies"
    nvm use 17
    cd "$site_location" && npm ci --omit=dev
}

run_server() {
    ENVIRONMENT="production"
    LOG_LEVEL="info"
    export ENVIRONMENT
    export LOG_LEVEL
    cd "$site_location" && node server.js
}

update_repository
update_dependencies
run_server
