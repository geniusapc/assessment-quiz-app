# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Build Stage ----
FROM base AS builder

RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Non-root user
RUN addgroup -S app && adduser -S app -G app
USER app


CMD ["node", "dist/server.js"]
