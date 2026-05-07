#!/bin/sh
set -e

echo "Running database migrations..."
bun run db:deploy

echo "Starting server..."
exec bun --bun run /app/server/index.mjs
