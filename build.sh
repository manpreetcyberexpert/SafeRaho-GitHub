#!/usr/bin/env bash
set -e

echo "==> Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "==> Building frontend..."
BASE_PATH="/" PORT="3000" NODE_ENV="production" \
  pnpm --filter @workspace/digital-arrest-awareness run build

echo "==> Building API server..."
pnpm --filter @workspace/api-server run build

echo "==> Copying frontend into API server dist..."
mkdir -p artifacts/api-server/dist/public
cp -r artifacts/digital-arrest-awareness/dist/public/. artifacts/api-server/dist/public/

echo "==> Running database migrations..."
pnpm --filter @workspace/db run push --accept-data-loss || true

echo "==> Build complete!"
