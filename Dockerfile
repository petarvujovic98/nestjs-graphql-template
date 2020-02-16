FROM node:12-alpine AS builder
WORKDIR /template
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --force-lockfile
COPY . .
RUN yarn run build

FROM node:12-alpine AS template
WORKDIR /template
COPY --from=builder /template ./
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]