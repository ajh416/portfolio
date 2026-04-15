FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .

ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY

RUN npm run build

# Assemble the deploy bundle in one place so CI can copy it out cleanly.
FROM alpine AS bundle
WORKDIR /bundle
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Belt-and-suspenders: also copy private/ directly in case file tracing
# does not pull the PDF into the standalone output.
COPY --from=builder /app/private ./private
