# حذف syntax جهت جلوگیری از تلاش برای دانلود از اینترنت
# syntax=docker/dockerfile:1

FROM node:20-bookworm AS base

# جایگزینی مخازن دبیان با مخزن داخلی (repo.abrha.net)
RUN echo "deb https://repo.abrha.net/debian bookworm main contrib non-free non-free-firmware" > /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian bookworm-updates main contrib non-free non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian bookworm-backports main contrib non-free non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb https://repo.abrha.net/debian-security bookworm-security main contrib non-free non-free-firmware" >> /etc/apt/sources.list

# وابستگی‌های زمان اجرا برای better-sqlite3 و sharp (libvips)
RUN apt-get update -o Acquire::AllowInsecureRepositories=true -o Acquire::AllowDowngradeToInsecureRepositories=true && \
    apt-get install -y --allow-unauthenticated --no-install-recommends \
    libsqlite3-0 libvips42 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NUXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

# -----------------------------------------------------------------------------
# Build base (ابزارهای کامپایل native modules)
# -----------------------------------------------------------------------------
FROM base AS build-base

RUN apt-get update -o Acquire::AllowInsecureRepositories=true -o Acquire::AllowDowngradeToInsecureRepositories=true && \
    apt-get install -y --allow-unauthenticated --no-install-recommends \
    python3 make g++ libsqlite3-dev libvips-dev && \
    rm -rf /var/lib/apt/lists/*

# -----------------------------------------------------------------------------
# Dependencies
# -----------------------------------------------------------------------------
FROM build-base AS deps

COPY package.json pnpm-lock.yaml .npmrc ./
COPY scripts/fix-sharp.js ./scripts/fix-sharp.js

# Build sharp from source for older CPUs (x86-64-v1) that cannot use prebuilt binaries.
ENV npm_config_build_from_source=true
ENV SHARP_FORCE_GLOBAL_LIBVIPS=1
RUN pnpm install --frozen-lockfile --unsafe-perm && \
    pnpm rebuild sharp

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
