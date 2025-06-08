# ---------- install deps ---------
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY TypeFlick-site/pnpm-lock.yaml .
COPY TypeFlick-site/package.json .
RUN pnpm install --frozen-lockfile

# ---------- dev runtime ----------
FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY TypeFlick-site/. .
EXPOSE 3000
CMD ["pnpm","dev"]
