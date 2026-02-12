# ---------------------------------------
# Base image with pnpm + turbo
# ---------------------------------------
FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Install turbo globally
RUN pnpm install -g turbo

# ---------------------------------------
# Prune monorepo for 'bot'
# ---------------------------------------
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune bot --docker

# ---------------------------------------
# Installer (build dependencies + native modules)
# ---------------------------------------
FROM base AS installer
WORKDIR /app

# ADD git HERE (this fixes spawn git ENOENT)
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    gcc \
    g++ \
    node-gyp \
    libc6-dev \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Copy workspace package manifests
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install dependencies (will no longer fail)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy pruned source
COPY --from=pruner /app/out/full/ .
COPY scripts ./scripts

# Build shared packages and the bot
RUN --mount=type=cache,target=/app/.turbo \
    turbo build --filter=bot...

# ---------------------------------------
# Production runner image
# ---------------------------------------
FROM node:20-slim AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 botuser

# Copy built files
COPY --from=installer --chown=botuser:nodejs /app ./

USER botuser
WORKDIR /app/apps/bot

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]