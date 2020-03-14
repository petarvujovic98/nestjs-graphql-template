FROM node:12-buster-slim AS builder
WORKDIR /template
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --force-lockfile
RUN yarn add --force bcrypt --build-from-source
COPY . .
RUN yarn run build

FROM node:12-buster-slim AS template
WORKDIR /template
COPY --from=builder /template/dist ./dist
COPY --from=builder /template/package.json ./
COPY --from=builder /template/yarn.lock ./
RUN yarn --force-lockfile --production
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]