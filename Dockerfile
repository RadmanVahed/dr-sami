# حذف syntax جهت جلوگیری از تلاش برای دانلود از اینترنت
# syntax=docker/dockerfile:1

FROM node:20-bookworm AS base

# 1. جایگزینی مخازن دبیان با مخازن اوبونتو (repo.abrha.net)
RUN echo "deb https://repo.abrha.net/debian bookworm main contrib non-free non-free-firmware" > /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian bookworm-updates main contrib non-free non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian bookworm-backports main contrib non-free non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian-security bookworm-security main contrib non-free non-free-firmware" >> /etc/apt/sources.list

# نصب پیش‌نیازها
RUN apt-get update -o Acquire::AllowInsecureRepositories=true -o Acquire::AllowDowngradeToInsecureRepositories=true && \
    apt-get install -y --allow-unauthenticated --no-install-recommends \
    python3 make g++ sqlite3 libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. تنظیم رجیستری NPM
# ENV npm_config_registry=https://mirror.abrha.net/repository/npm/
# اگر با SSL مشکل داشتی این خط را فعال کن:
# ENV npm_config_strict_ssl=false

ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NUXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

# نصب pnpm بدون نیاز به دانلود از اینترنت (از طریق npm)
RUN npm install -g pnpm@10.17.1

# -----------------------------------------------------------------------------
# Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --unsafe-perm

# -----------------------------------------------------------------------------
# Build
# -----------------------------------------------------------------------------
FROM deps AS build
COPY . .
RUN pnpm run build

# -----------------------------------------------------------------------------
# Production
# -----------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
COPY --from=build /app/.data ./.data
COPY --from=build /app/content ./content
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
