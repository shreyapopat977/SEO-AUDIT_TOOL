# ── Stage 1: Build the React app ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the production-ready static files (goes into /app/dist)
RUN npm run build

# ── Stage 2: Serve with Nginx (tiny, fast web server) ─────────
FROM nginx:alpine

# Copy the built React files into nginx's serve folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx runs on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]