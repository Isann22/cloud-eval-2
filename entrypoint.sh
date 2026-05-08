#!/bin/sh
set -e

echo "Syncing database schema..."
./node_modules/.bin/prisma db push

echo "Starting server..."
exec bun --bun run /app/server/index.mjs
