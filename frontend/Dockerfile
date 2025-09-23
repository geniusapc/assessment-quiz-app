# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build static assets
RUN npm run build

# ---- Production Stage ----
FROM nginx:1.27-alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy build output from builder
COPY --from=builder /app/dist ./


# 👇 Add custom nginx config for SPA
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
