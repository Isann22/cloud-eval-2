# ─── Stage 1: Build ───────────────────────────────────────────────────────────
# Use official Bun image — see https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-alpine AS build

WORKDIR /app

# Copy lockfile and package manifest first for better layer caching
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies needed for build)
# --frozen-lockfile: reproducible installs, fail if lockfile is out of date
# --ignore-scripts: skip postinstall scripts not needed in CI
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the rest of the source code
COPY . .

# Generate Prisma client (skipped by --ignore-scripts above)
RUN bun run db:generate

# Build with Nitro bun preset — optimizes output for bun runtime
ENV NITRO_PRESET=bun
RUN bun run build

# ─── Stage 2: Production ──────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Add CA certificates so TLS connections to RDS work inside Alpine container
RUN apk add --no-cache ca-certificates

# Only copy the self-contained Nitro output — no source code or node_modules
COPY --from=build /app/.output ./

# Set NODE_ENV production agar Vue Router dan dependency lain strip dev warnings
ENV NODE_ENV=production

# Run as non-root user for security
USER bun

EXPOSE 3000

# Use --bun flag to ensure all module resolution uses bun runtime (not Node.js)
ENTRYPOINT ["bun", "--bun", "run", "/app/server/index.mjs"]
