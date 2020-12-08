FROM node:14.15.1-buster-slim AS develop
WORKDIR /template
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --force-lockfile
RUN yarn add --force bcrypt --build-from-source
COPY . .
EXPOSE 3000
VOLUME [ "/template" ]
CMD ["yarn", "run", "start:dev"]
