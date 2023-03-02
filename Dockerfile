FROM node:18.12.1-alpine3.16 as build

WORKDIR /usr/app

COPY package.json ./
RUN yarn install

COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY src ./src

RUN yarn build

FROM node:18.12.1-alpine3.16 as run
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install --production

COPY --from=build /usr/app/dist ./dist

RUN mkdir "logs"

ENTRYPOINT ["yarn", "start:prod"]