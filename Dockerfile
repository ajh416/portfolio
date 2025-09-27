FROM node:20-slim AS builder
WORKDIR /app

ENV TAILWIND_DISABLE_OXIDE=1
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 ca-certificates git && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install
RUN npm ci --include=optional

COPY . .

RUN npm run build
