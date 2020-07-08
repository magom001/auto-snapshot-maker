FROM node:10-stretch AS builder
WORKDIR /usr/local/app/
COPY . .
RUN npm ci && npm run build

FROM node:alpine3.10
WORKDIR /usr/local/app/
COPY --from=builder /usr/local/app/dist ./dist
COPY package.json package-lock.json ./
COPY demo ./demo
RUN npm ci --production
CMD NODE_ENV=production node ./demo/index.js
