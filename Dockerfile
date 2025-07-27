# 1. Use official Node.js image as the base image
FROM node:18-alpine AS deps

# 2. Set working directory inside container
WORKDIR /app

# 3. Install dependencies (only package.json and lock file first for caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# 4. Copy all files and build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 5. Use official Node.js image for final runtime container
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy what's needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production

# 6. Expose Next.js default port
EXPOSE 3000

# 7. Start the Next.js app
CMD ["npm", "start"]
