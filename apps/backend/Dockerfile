FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app

# Required for sharp
RUN apk add --no-cache \
  libc6-compat \
  build-base \
  vips-dev \
  python3

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build Strapi admin
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=1337
ENV TZ=UTC

# Non-root user (recommended)
RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

# Copy node_modules (already pruned by npm ci)
COPY --from=builder --chown=strapi:strapi /app/node_modules ./node_modules

# Copy built app
COPY --from=builder --chown=strapi:strapi /app/dist ./dist
COPY --from=builder --chown=strapi:strapi /app/public ./public
COPY --from=builder --chown=strapi:strapi /app/package.json ./package.json
COPY --from=builder --chown=strapi:strapi /app/config ./config
COPY --from=builder --chown=strapi:strapi /app/database ./database
COPY --from=builder --chown=strapi:strapi /app/src ./src

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]