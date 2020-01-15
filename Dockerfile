FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --force-lockfile
COPY . .
RUN yarn run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]