FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN apk update

# Copy root package files
COPY package.json package-lock.json ./
COPY turbo.json ./

# Copy package files
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/prettier-config/package.json ./packages/prettier-config/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# Build the application
WORKDIR /app/apps/frontend
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

COPY --from=builder --chown=sveltekit:nodejs /app/apps/frontend/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/apps/frontend/package.json ./package.json
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules ./node_modules

USER sveltekit

EXPOSE 3000

CMD ["node", "build"]

